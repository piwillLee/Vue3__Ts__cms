import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue')
      // children: [
      //   {
      //     path: '/main/analysis/overview',
      //     component: () =>
      //       import('../views/main/analysis/overview/overview.vue')
      //   }
      // ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      // 输入地址有误 404
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/NotFound.vue')
    }
  ]
})

// 导航守卫
// 参数: to 跳转到的位置 from 从哪里跳转过来
// 返回值：返回值决定导航的路径，不返回或者返回undefined时默认跳转
router.beforeEach((to) => {
  // 只有登录成功(有token时)，才能进入到main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    return '/login'
  }

  // 如果是进入到main
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
