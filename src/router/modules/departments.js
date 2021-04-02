import Layout from '@/layout'

export default {
  path: '/departments',
  component: Layout,
  children: [
    {
      path: '',
      name: 'departments',
      meta: {
        title: '组织架构',
        icon: 'tree'
      },
      component: () => import('@/views/departments/index.vue')
    }
  ]
}
