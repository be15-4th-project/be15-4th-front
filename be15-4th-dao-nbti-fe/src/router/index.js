import { createRouter, createWebHistory } from 'vue-router'
import mainRoutes from '@/features/main/router.js'
import LayoutDefault from "@/components/layout/LayoutDefault.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: LayoutDefault,
            children: [
                ...mainRoutes,
            ]
        }
    ]
})

export default router