<template>
  <div class="wh-full flex-col bg-[url(@/assets/images/login_bg.png)] bg-cover">
    <div
      class="m-auto max-w-700 min-w-345 f-c-c rounded-8 bg-opacity-20 bg-cover p-12 card-shadow auto-bg"
      style="background-color: white"
    >
      <div class="hidden w-380 px-20 py-35 md:block">
        <img src="@/assets/images/login_banner.png" class="w-full" alt="login_banner">
      </div>

      <div class="w-320 flex-col px-20 py-32">
        <h2 class="f-c-c text-24 text-#6a6a6a font-normal">
          <img src="@/assets/images/logo.png" class="mr-12 h-50">
          {{ title }}
        </h2>
        <n-input
          v-model:value="loginInfo.userName"
          autofocus
          class="mt-32 h-40 items-center"
          placeholder="请输入用户名"
          :maxlength="20"
        >
          <template #prefix>
            <i class="i-fe:user mr-12 opacity-20" />
          </template>
        </n-input>
        <n-input
          v-model:value="loginInfo.password"
          class="mt-20 h-40 items-center"
          type="password"
          show-password-on="mousedown"
          placeholder="请输入密码"
          :maxlength="20"
          @keydown.enter="handleLogin()"
        >
          <template #prefix>
            <i class="i-fe:lock mr-12 opacity-20" />
          </template>
        </n-input>

        <div class="mt-40 flex items-center">
          <n-button
            class="h-40 flex-1 rounded-5 text-16"
            type="primary"
            ghost
            @click="quickLogin()"
          >
            一键体验
          </n-button>

          <n-button
            class="ml-32 h-40 flex-1 rounded-5 text-16"
            type="primary"
            :loading="loading"
            @click="handleLogin()"
          >
            登录
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store'
import { lStorage } from '@/utils'
import { useStorage } from '@vueuse/core'
import api from './api'

const authStore = useAuthStore()

const router = useRouter()

const route = useRoute()

const title = import.meta.env.VITE_TITLE

/**
 * 定义登录信息，包括用户名和密码
 */
const loginInfo = ref({
  userName: '',
  password: '',
})

/**
 * 从本地存储中获取登录信息
 */
const localLoginInfo = lStorage.get('loginInfo')
if (localLoginInfo) {
  loginInfo.value.userName = localLoginInfo.userName || ''
  loginInfo.value.password = localLoginInfo.password || ''
}

/**
 * 一键登录函数，设置用户名和密码为admin，然后调用handleLogin函数
 */
function quickLogin() {
  loginInfo.value.userName = 'Super'
  loginInfo.value.password = '123456'
  handleLogin(true)
}

/**
 * 是否记住登录信息，从本地存储中获取
 */
const isRemember = useStorage('isRemember', true)
/**
 * 定义加载状态
 */
const loading = ref(false)

/**
 * 处理登录函数
 * @param {boolean} isQuick - 是否为一键登录
 */
async function handleLogin(isQuick) {
  const { userName, password } = loginInfo.value

  if (!userName || !password)
    return $message.warning('请输入用户名和密码')

  try {
    loading.value = true

    $message.loading('正在验证，请稍后...', { key: 'login' })

    const { data } = await api.login({ userName, password: password.toString(), isQuick })

    if (isRemember.value) {
      lStorage.set('loginInfo', { userName, password })
    }
    else {
      lStorage.remove('loginInfo')
    }

    onLoginSuccess(data)
  }
  catch (error) {
    $message.destroy('login')
    console.error(error)
  }

  loading.value = false
}

/**
 * 登录成功处理函数
 * @param {object} data - 登录成功返回的数据
 */
async function onLoginSuccess(data = {}) {
  authStore.setToken(data)

  $message.loading('登录中...', { key: 'login' })

  try {
    $message.success('登录成功', { key: 'login' })

    if (route.query.redirect) {
      const path = route.query.redirect

      delete route.query.redirect

      router.push({ path, query: route.query })
    }
    else {
      router.push('/')
    }
  }
  catch (error) {
    console.error(error)

    $message.destroy('login')
  }
}
</script>
