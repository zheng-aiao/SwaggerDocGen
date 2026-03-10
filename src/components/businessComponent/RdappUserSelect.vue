<template>
  <div
    class="selectPersonInput"
    :class="[{ disabled: props.readonly }]"
    :data-placeholder="!newValue.length && props.placeholder"
    @click="selectMembers"
  >
    <RdappTag
      v-for="user in newValue"
      :key="user.id"
      :closable="user.hasOwnProperty('disabled') ? !user.disabled : !props.readonly"
      @close="deleteUser(user)"
    >
      {{ user.name }}
    </RdappTag>
    <RdappButton
      v-if="newValue.length && !props.readonly"
      class="clear"
      type="close"
      icon-btn
      @click="emit('input', []), emit('change')"
    ></RdappButton>
  </div>
</template>

<script setup>
  import service from 'src/service'
  import { dispatchController } from '@rdapp/one-click-dispatch'
  import { Message } from 'element-ui'
  import { ref, onMounted, watch } from 'vue'

  const props = defineProps({
    value: { type: [Array, String], default: () => [] },
    readonly: { type: Boolean, default: false },
    maxLength: { type: Number, default: 5 },
    fixedValue: { type: Array, default: () => [] },
    placeholder: { type: String, default: '请选择人员' },
    needsStringConversion: { type: Boolean, default: false }
  })

  const emit = defineEmits(['input', 'change'])
  const newValue = ref([])

  onMounted(() => {
    if (props.value) getValueData()
  })

  watch(
    () => props.value,
    () => {
      getValueData()
    },
    { immediate: false }
  )

  const getValueData = async (data = props.value) => {
    const ids = props.value
      ? Array.isArray(props.value)
        ? props.value
        : props.value.split(',')
      : []
    if (!ids.length) {
      newValue.value = []
      return
    }

    const { records = [], hasError } = await service.orgsBiz.searchContacts(ids)
    if (hasError) {
      newValue.value = []
      console.log('回显用户数据获取错误')
      return false
    }

    newValue.value = [...new Map(records.map((item) => [item.id, item])).values()]
  }

  /**
   * @description: 选择人员
   */
  const selectMembers = () => {
    if (props.readonly) return

    dispatchController.selectMembers({
      title: '添加组织架构',
      data: { memberList: newValue.value || [] },
      config: {
        onlyNeedMember: true
      },
      onSelect(type, data) {
        if (type !== 'confirm' || !data.memberList.length) return
        const maxMember = props.maxLength - props.fixedValue.length
        let userList = data.memberList.map((e) => e.id)
        if (props.maxLength && data.memberList.length > maxMember) {
          Message.warning(`最多只能选择${maxMember}个成员`)
          userList = data.memberList.slice(0, maxMember).map((e) => e.id)
        }
        if (props.needsStringConversion) {
          userList = userList.join(',')
        }
        emit('input', userList, data.memberList)
        emit('change')
      }
    })
  }

  const toSpliced = (array, start, deleteCount, ...items) => {
    return [...array.slice(0, start), ...items, ...array.slice(start + deleteCount)]
  }

  /**
   * @description: 删除人员
   * @param {Object} user - 人员信息
   */
  const deleteUser = (user) => {
    let ids = props.value ? props.value : []
    if (!Array.isArray(props.value)) {
      ids = props.value.split(',')
    }
    const index = ids.findIndex((person) => person === user.id)
    const result = [...ids]
    const arr = toSpliced(result, index, 1)
    emit('input', props.needsStringConversion ? arr.join(',') : arr)
    emit('change')
  }
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;

  .selectPersonInput {
    position: relative;
    border-radius: 8px;
    background: rgba(var(--color), 0.1);
    border: 1px solid rgba(var(--color), 0.2);
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 5px 15px;
    flex: 1;
    min-height: 38px;
    max-height: 80px;
    height: fit-content;
    overflow-y: auto;
    cursor: pointer;
    line-height: 1;

    @include lightTheme {
      background: rgba(var(--color), 0.1);
      border: 1px solid rgba(var(--color), 0.3);
    }

    @include darkTheme {
      background: rgba(var(--color), 0.2);
      border: 1px solid rgba(var(--color), 0.2);
    }

    @include before {
      content: attr(data-placeholder);
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--textColor-2);
    }

    &.disabled {
      border: 1px solid rgba(var(--color), 0.1);
      background-color: rgba(var(--color), 0.1);
      cursor: not-allowed;
    }

    .clear {
      position: absolute;
      right: 15px;
      top: 10px;

      @include hover {
        @include baseTransition;
        color: var(--textColor-2);
      }
    }
    .el-tag {
      padding: 0.1rem 0.75rem;
    }
  }
</style>
