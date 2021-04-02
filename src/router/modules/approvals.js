import Layout from '@/layout'

export default {
  path: '/approvals',
  component: Layout,
  children: [
    {
      path: '',
      name: 'approvals',
      meta: {
        title: '审批',
        icon: 'tree-table'
      },
      component: () => import('@/views/approvals/index.vue')
    }
  ]
}
