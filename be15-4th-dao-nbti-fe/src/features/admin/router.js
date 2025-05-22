export const adminRoutes = [
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/features/admin/views/UserListView.vue')
    },
    {
        path: '/admin/manage-user',
        name: 'manage-user',
        component: () => import('@/features/admin/views/UserListView.vue')
    },
    {
        path: '/admin/problems',
        name: 'manage-problem',
        component: () => import('@/features/admin/views/ProblemSearchView.vue'),
    },
    {
        path: '/admin/problems/:problemId',
        name: 'problem-details',
        component: () => import('@/features/admin/views/ProblemDetailsView.vue')
    },
    {
        path: '/admin/problems/new',
        name: 'create-problem',
        component: () => import('@/features/admin/views/ProblemCreateView.vue')
    }


    // path: '/admin',
        // component: () => import('@/features/admin/components/AdminLayout.vue'),
        // children: [
            // {
            //     path: '',
            //     name: '회원 관리',
            //     component: () => import('@/features/admin/views/UserListView.vue'),
            // },
    //         {
    //             path: 'manage-user',
    //             name: '회원 관리',
    //             component: () => import('@/features/admin/pages/ManageUserPage.vue'),
    //         },
    //         {
    //             path: 'manage-user-test',
    //             name: '검사 결과',
    //             component: () => import('@/features/admin/pages/ManageUserTestPage.vue'),
    //         },
    //         {
    //             path: 'manage-user-study',
    //             name: '학습 결과',
    //             component: () => import('@/features/admin/pages/ManageUserStudyPage.vue'),
    //         },

    //         {
    //             path: 'manage-objection',
    //             name: '이의 제기 관리',
    //             component: () => import('@/features/admin/pages/ManageObjectionPage.vue'),
    //         },
];
