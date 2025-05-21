<script setup>
import Header from "@/components/layout/Header.vue";
import AdminSidebar from "@/features/admin/components/AdminSidebar.vue";
import {ref} from "vue";

const sidebarVisible = ref(true);
</script>

<template>
<Header></Header>
  <main class="main-content" >
    <AdminSidebar v-if="sidebarVisible"/>
    <RouterView/>
  </main>
</template>

<style scoped>

</style>