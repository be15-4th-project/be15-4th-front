<template>
<!-- 우선 둘 중에 하나만 가지고 작업하기! -->
  <GeneralSidebar/>
<!--  <AdminSidebar/>-->

<!-- Login 구현 완료 후 Pinia에 Token, Role 저장되면 사용할 코드 -->
<!--  <GeneralSidebar v-if="isUser" />-->
<!--  <AdminSidebar v-else-if="isAdmin" />-->
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