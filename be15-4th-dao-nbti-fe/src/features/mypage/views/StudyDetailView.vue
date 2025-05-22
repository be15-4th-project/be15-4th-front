<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import BigModal from '@/components/common/BigModal.vue'

const route = useRoute()
const studyId = route.params.id
const loading = ref(false)
const categoryIcons = {
  '언어 이해': new URL('@/assets/images/language_comprehension.png', import.meta.url).href,
  '시사 상식': new URL('@/assets/images/common_sense.png', import.meta.url).href,
  '지각 추론': new URL('@/assets/images/perceptual_reasoning.png', import.meta.url).href,
  '공간 지각력': new URL('@/assets/images/spatial_perception.png', import.meta.url).href,
  '작업 기억': new URL('@/assets/images/work_memory.png', import.meta.url).href,
  '처리 속도': new URL('@/assets/images/processing_speed.png', import.meta.url).href
}

const detail = ref({
  studyId: studyId,
  topCategoryName: '언어 이해',
  correctCount: 2,
  totalCount: 3,
  solvedAt: '2025-05-10T13:10:00',
  problems: [
    {
      problemId: 1,
      correct: true,
      imageUrl: '/images/problem1.png',
      content: '',
      solvedAt: '2025-05-10T13:01:00',
      userAnswer: 'A',
      correctAnswer: 'A'
    },
    {
      problemId: 2,
      correct: false,
      imageUrl: '/images/problem2.png',
      content: '다음 중 올바른 맞춤법을 고르시오.',
      solvedAt: '2025-05-10T13:02:00',
      userAnswer: 'C',
      correctAnswer: 'B'
    },
    {
      problemId: 3,
      correct: true,
      imageUrl: '/images/problem3.png',
      content: '',
      solvedAt: '2025-05-10T13:03:00',
      userAnswer: 'D',
      correctAnswer: 'D'
    }
  ]
})

const objectionVisible = ref(false)
const selectedProblem = ref(null)
const objectionReason = ref('')

function openObjection(problem) {
  selectedProblem.value = problem
  objectionReason.value = ''
  objectionVisible.value = true
}

function submitObjection() {
  console.log('제출된 이의제기:', {
    problemId: selectedProblem.value.problemId,
    reason: objectionReason.value
  })
  objectionVisible.value = false
}

</script>

<template>
  <main>
    <section class="section">
      <h2 class="section-title">학습 상세 내역</h2>

      <div class="top-bar">
        <router-link to="/mypage/study" class="back-button">← 학습 내역 목록으로</router-link>
        <div class="field-title">학습일: {{ detail?.solvedAt?.slice(0, 10) }}</div>
      </div>

      <div v-if="loading">불러오는 중...</div>
      <div v-else class="card">
        <div class="summary-box">
          <div class="category"><img :src="categoryIcons[detail.topCategoryName]" alt="" class="category-icon" /><strong>분야:</strong> {{ detail.topCategoryName }}</div>
          <div><strong>정답:</strong> {{ detail.correctCount }} / {{ detail.totalCount }}문항</div>
        </div>

        <ul class="problem-list" style="list-style: none; padding: 0;">
          <li v-for="(problem, idx) in detail.problems" :key="problem.problemId" class="problem-item">
            <div class="problem-header">
              <div class="problem-title">문제 {{ idx + 1 }}</div>
              <button class="objection-button" @click="openObjection(problem)">
                <img src="@/assets/images/objection.svg" alt="이의제기 아이콘" class="objection-icon" />
              </button>
            </div>
            <div class="problem-content">
              <img :src="problem.imageUrl" alt="문제 이미지" class="question-image" />
              <div class="problem-meta">
                <p v-if="problem.content" class="problem-text">{{ problem.content }}</p>
                <div class="answer-meta">
                  <span><strong>풀이 일시:</strong> {{ problem.solvedAt }}</span>
                  <span><strong>제출:</strong> {{ problem.userAnswer }}</span>
                  <span><strong>정답:</strong> {{ problem.correctAnswer }}</span>
                </div>
                <div :class="['answer-result', problem.correct ? 'correct' : 'wrong']">
                  {{ problem.correct ? '정답입니다' : '오답입니다' }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

        <BigModal
            :visible="objectionVisible"
            confirm-visible
            confirm-text="제출"
            @cancel="objectionVisible = false"
            @confirm="submitObjection"
        >
          <template #default>
            <div style="text-align: left">
              <h3 style="font-size: 1.1rem; margin-bottom: 1rem">문제 이의제기</h3>
              <img :src="selectedProblem?.imageUrl" alt="문제 이미지" style="width: 100px; margin-bottom: 1rem" />
              <textarea
                  v-model="objectionReason"
                  rows="5"
                  style="width: 100%; resize: none; padding: 8px"
                  placeholder="이 문제에 대해 이의가 있다면 사유를 작성해주세요."
              ></textarea>
            </div>
          </template>
        </BigModal>
  </main>
</template>


<style scoped>
.section {
  margin-bottom: 80px;
}
.section-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ddd;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.back-button {
  background: #3b82f6;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: background 0.2s ease;
}
.back-button:hover {
  background: #1e3a8a;
}
.field-title {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}
.card {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}
.summary-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 500;
}
.problem-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.problem-item {
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  border-radius: 12px;
  background: #f9fafb;
}
.problem-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.problem-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: #1e293b;
}
.problem-content {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.question-image {
  width: 140px;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.problem-meta {
  flex: 1;
  font-size: 0.95rem;
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.problem-text {
  font-weight: 500;
}
.answer-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  color: #444;
}
.answer-result {
  font-weight: 600;
  margin-top: 0.5rem;
}
.answer-result.correct {
  color: #10b981;
}
.answer-result.wrong {
  color: #ef4444;
}
.objection-button {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 0.95rem;
}
.objection-button:hover {
  color: #1e3a8a;
  text-decoration: underline;
}
.category {
  display: flex;
  align-items: center;
  gap: 10px;
}
.category-icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
}
</style>
