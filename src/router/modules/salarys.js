import Layout from '@/layout'

export default {
  path: '/salarys',
  component: Layout,
  children: [
    {
      path: '',
      name: 'salarys',
      meta: {
        title: '工资',
        icon: 'money'
      },
      component: () => import('@/views/salarys/index.vue')
    }
  ]
}
