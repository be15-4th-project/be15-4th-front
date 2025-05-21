<template>
  <div class="header">
    <div class="container">
      <div class="text-wrapper">두뇌 트레이닝</div>
    </div>
    <div class="navbar">
      <div class="link">검사</div>
      <div class="link">학습</div>
      <div class="link">로그인</div>
      <div class="link">회원가입</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style>
:root {
  --inter-bold-font-family: "Inter", sans-serif;
  --inter-bold-font-size: 24px;
  --inter-bold-font-weight: 700;

  --semantic-link-font-family: "Noto Sans KR", sans-serif;
  --semantic-link-font-size: 16px;
  --semantic-link-font-weight: 400;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: #ffffff;
  border-bottom: 1px solid #dddddd;
}

.header .container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header .text-wrapper {
  color: #007bff;
  font-family: var(--inter-bold-font-family);
  font-size: var(--inter-bold-font-size);
  font-weight: var(--inter-bold-font-weight);
  white-space: nowrap;
}

.header .navbar {
  display: flex;
  gap: 16px;
}

.header .link {
  color: #333333;
  font-family: var(--semantic-link-font-family);
  font-size: var(--semantic-link-font-size);
  font-weight: var(--semantic-link-font-weight);
  cursor: pointer;
  white-space: nowrap;
}
</style>
