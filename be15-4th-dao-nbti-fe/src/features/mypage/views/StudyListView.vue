<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Pagination from '@/features/mypage/components/Pagination.vue'

// --- 1. 더미 데이터 생성 함수 ---
function makeDummy(count) {
  return Array.from({ length: count }, (_, i) => ({
    studyId:         100 + i,
    topCategoryName: ['언어 이해','지각 추론','작업 기억'][i % 3],
    correctCount:    (i % 6) + 1,
    totalCount:      6,
    solvedAt:        `2025-05-${String((i % 28) + 1).padStart(2,'0')}T0${(i%12)}:00:00`
  }))
}

// --- 2. 상태 정의 ---
const studyList   = ref([])
const loading     = ref(false)

const year        = ref('')
const month       = ref('')
const sort        = ref('desc')
const yearOptions = [2025, 2024]

// 카테고리 아이콘 (실제 경로에 맞게 조정하세요)
const categoryIcons = {
  '언어 이해': new URL('@/assets/images/language_comprehension.png', import.meta.url).href,
  '지각 추론': new URL('@/assets/images/perceptual_reasoning.png', import.meta.url).href,
  '작업 기억': new URL('@/assets/images/work_memory.png', import.meta.url).href,
}

// --- 3. 페이지네이션 상태 ---
const currentPage = ref(1)
const pageSize    = ref(10)

// --- 4. 정렬된 리스트 (client-side) ---
const sortedList = computed(() =>
    [...studyList.value].sort((a, b) =>
        sort.value === 'desc'
            ? new Date(b.solvedAt) - new Date(a.solvedAt)
            : new Date(a.solvedAt) - new Date(b.solvedAt)
    )
)

// --- 5. 페이징된 리스트 ---
const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return sortedList.value.slice(start, start + pageSize.value)
})

// --- 6. totalItems를 computed로 변경 ---
const totalItems = computed(() => sortedList.value.length)

// --- 7. 페이지 변경 핸들러 ---
function onPageChange(page) {
  currentPage.value = page
}

// --- 8. fetchData: 더미 재설정용 ---
function fetchData() {
  loading.value = true
  setTimeout(() => {
    studyList.value = makeDummy(20)
    loading.value = false
  }, 200)
}

// --- 9. 초기 더미 세팅 ---
onMounted(() => {
  studyList.value = makeDummy(20)
})
</script>


<template>
  <main>
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

        <label for="sort">분야</label>
        <select v-model="sort" id="sort">
          <option value="desc">전체</option>
          <option value="asc">언어 이해</option>
          <option value="asc">시사 상식</option>
        </select>

        <button @click="fetchData">검색</button>
      </div>

      <!-- 리스트 -->
      <div v-if="loading">불러오는 중...</div>
      <div v-else-if="paginatedList.length === 0">학습 내역이 없습니다.</div>
      <div v-else class="study-list">
        <article class="study-item" v-for="item in paginatedList" :key="item.studyId">
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
                    :to="`/mypage/study/${item.studyId}`"
                    class="btn-detail"
                    :aria-label="`${formattedDate} 검사 상세 보기`"
                >상세 보기
                </router-link>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- 페이지네이션 -->
      <Pagination
          v-if="totalItems > pageSize"
          :currentPage="currentPage"
          :pageSize="pageSize"
          :totalItems="totalItems"
          @update:currentPage="onPageChange"
      />
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