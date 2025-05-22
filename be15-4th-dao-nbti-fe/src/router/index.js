import { createRouter, createWebHistory } from 'vue-router'
import mainRoutes from '@/features/main/router.js'
import LayoutDefault from "@/components/layout/LayoutDefault.vue";
import { adminRoutes } from "@/features/admin/router.js";
import {userRoutes} from "@/features/user/router.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        //...
        //나중에 다른 기능과 관련된 routes들을 추가하면 된다.
        {
            path: '/',
            component: LayoutDefault,
            children: [
                ...mainRoutes,
                ...adminRoutes,
                ...userRoutes,
            ]
        },

    ]
})

export default router