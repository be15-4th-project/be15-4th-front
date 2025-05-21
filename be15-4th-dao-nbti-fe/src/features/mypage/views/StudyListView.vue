<script setup>
import { ref, computed } from 'vue'
import {fetchTestResultList} from "@/features/mypage/api.js";

const studyList = ref([
  {
    studyId: 1,
    topCategoryName: '언어 이해',
    correctCount: 6,
    totalCount: 6,
    solvedAt: '2025-05-18T10:30:00'
  },
  {
    studyId: 2,
    topCategoryName: '지각 추론',
    correctCount: 4,
    totalCount: 6,
    solvedAt: '2025-04-28T09:10:00'
  },
  {
    studyId: 3,
    topCategoryName: '작업 기억',
    correctCount: 5,
    totalCount: 6,
    solvedAt: '2025-04-10T15:45:00'
  }
])

const loading = ref(false)
const year = ref('')
const month = ref('')
const sort = ref('desc')
const yearOptions = [2025, 2024]

const categoryIcons = {
  '언어 이해': new URL('@/assets/images/language_comprehension.png', import.meta.url).href,
  '시사 상식': new URL('@/assets/images/common_sense.png', import.meta.url).href,
  '지각 추론': new URL('@/assets/images/perceptual_reasoning.png', import.meta.url).href,
  '공간 지각력': new URL('@/assets/images/spatial_perception.png', import.meta.url).href,
  '작업 기억': new URL('@/assets/images/work_memory.png', import.meta.url).href,
  '처리 속도': new URL('@/assets/images/processing_speed.png', import.meta.url).href
}

const fetchData = async () => {
  loading.value = true
  try {
    const params = {}
    if (year.value) params.year = year.value
    if (month.value) params.month = month.value
    const res = await fetchTestResultList(params)
    studyList.value = res.data.data.content || []
  } catch (e) {
    console.error('결과 불러오기 실패', e)
  } finally {
    loading.value = false
  }
}

const sortedList = computed(() => {
  return [...studyList.value].sort((a, b) => {
    return sort.value === 'desc'
        ? new Date(b.solvedAt) - new Date(a.solvedAt)
        : new Date(a.solvedAt) - new Date(b.solvedAt)
  })
})
</script>

<template>
  <main class="content">
    <section class="section">
      <h2 class="section-title">학습 내역 조회</h2>

      <!-- 필터 바 -->
      <div class="filter-bar" role="search">
        <label for="year">년도</label>
        <select v-model="year" id="year">
          <option value="">전체</option>
          <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}년</option>
        </select>

        <label for="month">월</label>
        <select v-model="month" id="month">
          <option value="">전체</option>
          <option v-for="m in 12" :key="m" :value="m">{{ m }}월</option>
        </select>

        <label for="sort">정렬</label>
        <select v-model="sort" id="sort">
          <option value="desc">최신순</option>
          <option value="asc">과거순</option>
        </select>

        <button @click="fetchData">검색</button>
      </div>

      <!-- 리스트 -->
      <div v-if="loading">불러오는 중...</div>
      <div v-else-if="sortedList.length === 0">학습 내역이 없습니다.</div>
      <div v-else class="study-list">
        <article class="study-item" v-for="item in sortedList" :key="item.studyId">
          <div class="study-item-inner">
            <img :src="categoryIcons[item.topCategoryName]" alt="" class="category-icon" />
            <div class="study-content">
              <div class="study-meta">
                <div class="study-title">{{ item.topCategoryName }}</div>
                <span>정답 {{ item.correctCount }} / {{ item.totalCount }}문항</span>
              </div>
              <div class="study-btn">
                <span class="date">{{ item.solvedAt.slice(0, 10) }}</span>
                <router-link
                    :to="`/mypage/test/${testResultId}`"
                    class="btn-detail"
                    :aria-label="`${formattedDate} 검사 상세 보기`"
                >상세 보기
                </router-link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.section {
  margin-bottom: 80px;
}
.section-title {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ddd;
}
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
  align-items: center;
}
.filter-bar label {
  font-size: 0.95rem;
}
.filter-bar select {
  padding: 0.4rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
}
.filter-bar button {
  padding: 0.45rem 1.2rem;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.study-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.study-item {
  background: #ffffff;
  padding: 1.2rem 1.5rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}
.study-item-inner {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.study-content {
  display: flex;
  justify-content: space-between;
  flex: 1;
}
.study-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.study-meta {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.9rem;
  color: #555;
}
.study-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.9rem;
  color: #555;
  gap: 20px;
}
.study-meta .date {
  color: #888;
}
.category-icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.btn-detail {
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  text-align: center;
  transition: background 0.2s;
}

.btn-detail:hover {
  background: #1e40af;
}
</style>