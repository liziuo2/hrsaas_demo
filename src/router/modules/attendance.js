import Layout from '@/layout'

export default {
  path: '/attendance',
  component: Layout,
  children: [
    {
      path: '',
      name: 'attendance',
      meta: {
        title: '考勤',
        icon: 'skill'
      },
      component: () => import('@/views/attendance/index.vue')
    }
  ]
}
