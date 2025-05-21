<script setup>
import { computed } from 'vue'

// 부모 컴포넌트에서 activeMenu를 prop으로 받음
const props = defineProps({
  activeMenu: String,
})
</script>

<template>
  <aside class="sidebar">
    <h3>마이페이지</h3>

    <RouterLink to="/mypage/test-result" :class="{ active: activeMenu === '검사 결과 및 통계' }">
      검사 결과 및 통계
    </RouterLink>

    <RouterLink to="/mypage/study-result" :class="{ active: activeMenu === '학습 결과 내역' }">
      학습 결과 내역
    </RouterLink>

    <RouterLink to="/mypage/objection" :class="{ active: activeMenu === '이의제기 내역' }">
      이의제기 내역
    </RouterLink>

    <RouterLink to="/mypage/profile" :class="{ active: activeMenu === '개인정보 수정' }">
      개인정보 수정
    </RouterLink>
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
</style>
