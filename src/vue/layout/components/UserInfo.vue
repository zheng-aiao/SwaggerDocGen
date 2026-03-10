<!--
 * @Author: zhengxiaoying zhengxiaoying@genew.com
 * @Date: 2025-08-01 11:09:48
 * @LastEditors: zhengxiaoying zhengxiaoying@genew.com
 * @LastEditTime: 2025-10-16 14:45:01
 * @FilePath: \srm-web\src\vue\layout\components\UserInfo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="user-info">
    <img v-if="getCurrentUser.photoPath" :src="getCurrentUser.photoPath" alt="头像" />
    <RdappButton v-else class="img" type="avatar" icon-btn></RdappButton>
    <div
      class="user-name"
      :style="{ color: isNavigate ? `rgb(var(--white))` : `var(--textColor-2)` }"
    >
      {{ getCurrentUser.displayName || getCurrentUser.name || 'Administrator' }}
    </div>
    <RdappButton class="login-out" type="logout" icon-btn @click="logout()"></RdappButton>
  </div>
</template>

<script setup>
  import { computed, onMounted, watch } from 'vue'
  import webSSO from '@rdapp/web-sso'
  import { openConfirmModel } from '@/biz/confirmModel'
  import { incrementZIndex } from '@/utils/publicMethod.js'
  import { useStore } from '@/hooks'

  const store = useStore()
  const handleZIndex = incrementZIndex({ selector: '.q-dialog.home-login-out' })
  const isNavigate = computed(() => store.getters['system/isNavigateRouter'])
  // 当前用户信息
  const getCurrentUser = computed(() => store.getters.getCurrentUser)
  const logout = async (
    title = '退出登录',
    content = '确定退出登录吗?',
    isClose = true,
    isCloseIcon = true
  ) => {
    handleZIndex()
    const result = await openConfirmModel({
      title: title,
      content: content,
      contentClass: 'home-login-out',
      isClose: isClose,
      isCloseIcon: isCloseIcon
    })
    result && webSSO.Logout()
  }

  watch(
    () => store.getters.isUserOut,
    () => {
      if (store.getters.isUserOut !== 0) {
        logout('提示', '该账号被操作登出，请重新登录?', false, false)
      }
    },
    { immediate: true }
  )
</script>

<style scoped lang="scss">
  @use '@/assets/scss/rules' as *;

  .user-info {
    display: flex;
    align-items: center;
    gap: pxToRem(8);
    margin-left: pxToRem(15);

    .user-name {
      @include fontStyle(5);
      margin-right: pxToRem(8);
    }

    img {
      width: pxToRem(32);
      height: pxToRem(32);
      border-radius: 50%;
    }
    .img > ::v-deep span {
      width: pxToRem(32);
      height: pxToRem(32);
      border-radius: 50%;
      color: rgba(var(--color), 1);
      font-size: 1.75rem;
      line-height: pxToRem(40);
      background: rgba(var(--color), 0.3);
      border: 1px solid rgba(var(--color), 1);
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: normal;
    }
    .login-out {
      font-size: pxToRem(24);
    }
    .login-out > ::v-deep span {
      cursor: pointer;
      font-size: pxToRem(24);
      color: colorValue(color, 1);
      transition: color var(--duration);

      @include hover {
        color: colorValue(color, 1);
      }
    }
  }
</style>
