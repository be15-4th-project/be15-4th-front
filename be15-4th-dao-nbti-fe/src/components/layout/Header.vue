<template>
  <div class="header">
    <div class="container">
      <div class="text-wrapper">두뇌 트레이닝</div>
    </div>
    <div class="navbar">
      <RouterLink to ="/" class="link">검사</RouterLink>
      <RouterLink to="/" class="link">학습</RouterLink>
      <template v-if="authStore.isAuthenticated">
        <RouterLink to ="/" class="div">마이페이지</RouterLink>
        <RouterLink to ="/" class="div">로그아웃</RouterLink>
      </template>
     <template v-else>
       <RouterLink to ="/" class="link">로그인</RouterLink>
       <RouterLink to ="/" class="div">회원가입</RouterLink>
     </template>
    </div>
  </div>
</template>

<script setup>
import {useAuthStore} from "@/stores/auth.js";
import {useRouter} from "vue-router";

const router = useRouter()
const authStore = useAuthStore()

</script>

<style>
.header {
  align-items: center;
  background-color: #ffffff;
  justify-content: space-between; /* 핵심 */
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: #dddddd;
  display: flex;
  gap: 601.86px;
  padding: 16px 32px 17px;
  position: relative;
}

.header .container {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  position: relative;
}

.header .text-wrapper {
  color: #007bff;
  font-size: 22.5px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.header .navbar {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 16px;
  margin-right: -8.86px;
  padding: 0px 0px 0px 16px;
  position: relative;
}

.header .link {
  color: #333333;

  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.header .div {
  color: #333333;
  margin-top: -1.00px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}
</style>
