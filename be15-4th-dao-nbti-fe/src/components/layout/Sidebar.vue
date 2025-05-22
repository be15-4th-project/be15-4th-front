<template>
</template>

<script setup>

import GeneralSidebar from "@/components/layout/sidebar/GeneralSidebar.vue";
import AdminSidebar from "@/components/layout/sidebar/AdminSidebar.vue";
import {useAuthStore} from "@/stores/auth.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const auth = useAuthStore()
const { isAuthenticated, userRole } = storeToRefs(auth)

const isUser = computed(() => isAuthenticated.value && userRole.value === 'USER')
const isAdmin = computed(() => isAuthenticated.value && userRole.value === 'ADMIN')

</script>



<style scoped>

</style>