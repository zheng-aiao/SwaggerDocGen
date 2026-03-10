<template>
  <div class="descTable">
    <RdappDialog
      v-model="visible"
      v-bind="$attrs"
      :readonly="true"
      :title="descData.title"
      @input="close"
      @confirm="confirm"
      @hide="hideModel"
      v-on="$listeners"
    >
      <TableViewComponent
        :columnItem="tableColumn"
        :tableData="tableData"
        :tableHeader="descData.tableHeader"
        :cellStyleFun="descData.cellStyleFun"
        :cellHeaderStyleFun="descData.cellHeaderStyleFun"
      >
      </TableViewComponent>
    </RdappDialog>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed, watch, nextTick } from 'vue'

  import RdappDialog from '@/components/basicComponent/RdappDialog.vue'
  import TableViewComponent from '../../views/preventDanger/dualPreventionMechanism/riskAnalysisUnit/component/TableViewComponent.vue'

  const props = defineProps({
    /*
    方式一：
    {
      title: '风险程度（R）分级标准',
      tableHeader: '风险程度（R=L*S）分级标准',
      column: ['序号', '风险值', '风险程度（等级）'],
      content: [
        ['1', 'R=L×S=17～25', '关键风险（I级)，需要立即停止作业'],
        ['2', 'R=L×S=11～16', '重要风险（II级），需要消减的风险'],
        ['3', 'R=L×S=5～10', '中度风险（III级），需要特别控制的风险'],
        ['4', 'R=L×S=1～4', '低度风险（IV级)，需要关注的风险']
      ]
    }
    方式二： 指定columnItem，data数组 均为 对象数组
    {
      title: '风险程度（R）分级标准',
      tableHeader: '风险程度（R=L*S）分级标准',
      column: [
          { label: '序号', prop: 'column1' },
          { label: '风险值', prop: 'column2' },
          { label: '风险级别', prop: 'column3' }
        ],
      data: [
          { column1: 1, column2: 'D>= 180', column3: '一级' },
          { column1: 2, column2: '80<=D<180', column3: '二级' },
          { column1: 3, column2: '50<=D<90', column3: '三级' },
          { column1: 4, column2: 'D<50', column3: '四级' }
      ],
    }
     */
    descData: {
      type: Object,
      default: () => {}
    }
  })

  const tableColumn = computed(() => {
    return (
      props.descData?.column.map((item, i) => {
        const isObj = Object.keys(item).includes('prop')
        return isObj
          ? item
          : {
              label: item,
              prop: `column${i}`
            }
      }) || []
    )
  })

  const tableData = computed(() => {
    return (
      props.descData?.content.map((arrayItem) => {
        if (Array.isArray(arrayItem)) {
          let newItem = {}
          arrayItem.forEach((item, i) => {
            newItem[`column${i}`] = item
          })
          return newItem
        } else {
          return arrayItem
        }
      }) || []
    )
  })

  const emit = defineEmits(['update:showPopup', 'handleConfirm', 'handleClose'])

  const hideModel = () => {
    emit('update:showPopup', false)
  }

  const visible = ref(false)

  nextTick(() => {
    visible.value = true
  })
  const confirm = () => {
    visible.value = false

    const timer = setTimeout(() => {
      emit('handleConfirm')
      clearTimeout(timer)
    }, 320)
  }

  const close = () => {
    visible.value = false
    const timer = setTimeout(() => {
      emit('handleClose')
      clearTimeout(timer)
    }, 320)
  }
</script>
<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;
</style>
