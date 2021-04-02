import Layout from '@/layout'

export default {
  path: '/social',
  component: Layout,
  children: [
    {
      path: '',
      name: 'social',
      meta: {
        title: '社保',
        icon: 'table'
      },
      component: () => import('@/views/social/index.vue')
    }
  ]
}
