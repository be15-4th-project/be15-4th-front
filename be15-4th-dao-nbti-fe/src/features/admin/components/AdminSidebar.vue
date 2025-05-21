<script setup>
import { computed } from 'vue'

// 부모 컴포넌트에서 activeMenu를 prop으로 받음
const props = defineProps({
  activeMenu: String,
})

// 문제 관리 또는 이의 제기 관리가 활성화 상태인지 계산
const isProblemOrObjectionActive = computed(() => {
  return props.activeMenu === '문제 관리' || props.activeMenu === '이의 제기 관리'
})
</script>

<template>
  <aside class="sidebar">
    <h3>서비스 관리</h3>

    <RouterLink to="/admin/manage-user" :class="{ active: activeMenu === '회원 관리' }">회원 관리</RouterLink>

    <ul v-if="!isProblemOrObjectionActive">
      <li>
        <RouterLink to="/admin/manage-user" :class="{ active: activeMenu === '회원 관리' }">회원</RouterLink>
      </li>
      <li>
        <RouterLink to="/admin/manage-user-test" :class="{ active: activeMenu === '검사 결과' }">검사 결과</RouterLink>
      </li>
      <li>
        <RouterLink to="/admin/manage-user-study" :class="{ active: activeMenu === '학습 결과' }">학습 결과</RouterLink>
      </li>
    </ul>

    <RouterLink to="/admin/manage-problem" :class="{ active: activeMenu === '문제 관리' }">문제 관리</RouterLink>
    <RouterLink to="/admin/manage-objection" :class="{ active: activeMenu === '이의 제기 관리' }">이의 제기 관리</RouterLink>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 300px;
  background: #ffffff;
  border-right: 1px solid #ddd;
  padding: 2rem 1rem;
  height: 100vh;
  box-sizing: border-box;
  position: sticky;
  top: 0;
}
.sidebar h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
.sidebar a {
  display: block;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
}
.sidebar a:hover,
.sidebar a.active {
  background: #e9f0ff;
  color: #007bff;
  font-weight: 500;
}

.sidebar ul {
  list-style: none;
  margin: 0;
  padding-left: 16px;
}

.sidebar li {
  margin: 0;
  padding-left: 40px;
}
</style>
