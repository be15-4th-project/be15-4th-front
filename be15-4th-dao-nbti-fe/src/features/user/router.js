import LoginView from "@/features/user/views/LoginView.vue";
import SignupView from "@/features/user/views/SignupView.vue";


export const userRoutes = [
    {
        path: '/login',
        name: 'LoginView',
        component: LoginView
    },
    {
        path: '/signup',
        name: 'SignupView',
        component: SignupView
    }
]