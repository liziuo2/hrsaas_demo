import Layout from '@/layout'

export default {
  path: '/permission',
  component: Layout,
  children: [
    {
      path: '',
      name: 'permission',
      meta: {
        title: '权限管理',
        icon: 'lock'
      },
      component: () => import('@/views/permission/index.vue')
    }
  ]
}
