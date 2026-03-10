<template>
  <div class="set-control-attribute">
    <el-empty v-if="!params.id"></el-empty>
    <span v-else>
      <RdappFormBuilder
        ref="formBuilder"
        v-model="params"
        :formItems="attributeList"
        :readonly="readonly"
      >
      </RdappFormBuilder>
    </span>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'
  import controlListJson from '/public/staticData/universalControl/controlMenu.json'
  import { VALIDATE_RULES } from '@/utils/validateRules.js'
  import service from 'src/service'

  const controlList = controlListJson.controlList

  const props = defineProps({
    value: {
      type: Object,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['input'])

  const params = computed({
    get: () =>
      new Proxy(
        { ...props.value }, // 防止对象引用改变单向数据流
        {
          get: (...rest) => Reflect.get(...rest),
          // 当给深层度的对象赋值时, 触发父组件更新
          set: (target, key, value) => {
            emit('input', { ...target, [key]: value })
            return true
          }
        }
      ),
    // computed set只能赋值整个对象的时候触发
    set: (val) => {
      emit('input', val)
    }
  })
  const searchDict = async (value, cb) => {
    const query = {
      pageNum: 1,
      pageSize: 10,
      order: 'serviceType,dictName asc',
      orCondition: [
        { type: 2, key: 'dictName', value: value },
        { type: 2, key: 'dictType', value: value }
      ]
    }
    const { list } = await service.srmAbsBiz.getDictTypePage({ query: JSON.stringify(query) })
    cb(list.map((e) => ({ value: e.dictType })))
  }
  const searchResource = async (value, cb) => {
    const query = {
      pageNum: 1,
      pageSize: 10,
      order: 'id asc',
      andCondition: [{ type: 1, key: 'parentId', value: '-1' }],
      orCondition: [
        { type: 2, key: 'name', value: value },
        { type: 2, key: 'source', value: value },
        { type: 2, key: 'id', value: value }
      ]
    }
    const { list } = await service.srmAbsBiz.getResourceClassifyPage({
      query: JSON.stringify(query)
    })
    cb(list.map((e) => ({ value: e.source })))
  }
  const propMapFn = { searchDict, searchResource }

  const attributeList = computed(() => {
    // 获取当前控件的类型
    const controlType = props.value.type
    // 在controlList中找到类型一致的控件
    const control = controlList.find((c) => c.type === controlType)
    if (!control || !Array.isArray(control.attribute)) return []

    // 将原先控件属性的默认值填充到一个属性数组中
    return control.attribute.map((e) => {
      const data = {
        label: e.label,
        prop: e.fieId,
        type: e.props.type || e.type,
        id: e.id
      }
      Object.keys(e.props).forEach((key) => {
        if (key === 'default') {
          return
        }
        if (key === 'fetch-suggestions') {
          data[key] = propMapFn[e.props[key]]
          return
        }
        data[key] = e.props[key]
      })
      return data
    })
  })
</script>
<style lang="scss">
  .el-checkbox {
    margin-right: 1.2rem;
  }
</style>
