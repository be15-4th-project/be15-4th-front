<script setup>
import { computed } from 'vue'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

const props = defineProps({
  testResultId: { type: Number, required: true },
  createdAt: { type: String, required: true },
  highestCategory: { type: String, required: true },
  lowestCategory: { type: String, required: true },
  totalScore: { type: Number, required: true }
})

const formattedDate = computed(() =>
    format(new Date(props.createdAt), 'yyyy년 M월 d일', { locale: ko })
)
</script>

<template>
  <article class="result-card">
    <div class="card-left">
      <div class="tags">
        <span class="badge badge-strong">강점: {{ highestCategory }}</span>
        <span class="badge badge-weak">약점: {{ lowestCategory }}</span>
      </div>
      <div class="score">총점: {{ totalScore }}점</div>
    </div>
    <div class="card-right">
      <time class="datetime" :datetime="createdAt">{{ formattedDate }}</time>
      <router-link
          :to="`/mypage/test/${testResultId}`"
          class="btn-detail"
          :aria-label="`${formattedDate} 검사 상세 보기`"
      >
        상세 보기
      </router-link>
    </div>
  </article>
</template>

<style scoped>
.result-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem 2rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.2s ease;
}
.result-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.card-left {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.tags {
  display: flex;
  gap: 0.5rem;
}
.badge {
  padding: 0.3rem 0.7rem;
  font-size: 0.85rem;
  border-radius: 999px;
  font-weight: 500;
}
.badge-strong {
  background-color: #e0f2fe;
  color: #2563eb;
}
.badge-weak {
  background-color: #fef2f2;
  color: #d32f2f;
}
.score {
  font-size: 1rem;
  font-weight: 500;
  color: #111;
}
.card-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.datetime {
  font-size: 0.85rem;
  color: #888;
}
.btn-detail {
  background: #3b82f6;
  color: #fff;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-decoration: none;
  white-space: nowrap;
}
.btn-detail:hover {
  background: #1e3a8a;
}
</style>
