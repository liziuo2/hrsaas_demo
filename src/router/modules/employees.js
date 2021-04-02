import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      meta: {
        title: '员工',
        icon: 'people'
      },
      component: () => import('@/views/employees/index.vue')
    }
  ]
}
