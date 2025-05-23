export const testRoutes = [
    {
        path: '/test',
        name: 'TestStart',
        component: () => import('@/features/test/views/TestView.vue')
    }
]