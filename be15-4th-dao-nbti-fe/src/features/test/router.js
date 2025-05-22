export const testRoutes = [
    {
        path: '/test',
        name: 'Test',
        component: () => import('@/features/test/views/TestView.vue')
    }
]