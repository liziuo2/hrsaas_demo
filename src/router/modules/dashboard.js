import Layout from '@/layout'

export default {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        title: '首页',
        icon: 'dashboard'
      },
      component: () => import('@/views/dashboard/index.vue')
    }
  ]
}
