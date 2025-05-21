<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchTestResultList } from '@/features/mypage/api.js'
import ResultCard from '@/features/mypage/components/ResultCard.vue'
import RadarChart from '@/features/mypage/components/RadarChart.vue'
import LineChart from '@/features/mypage/components/LineChart.vue'

const resultList = ref([])
const loading = ref(false)

const year = ref('')
const month = ref('')
const sort = ref('desc')
const yearOptions = [2025, 2024]

// 차트용 mock 데이터 (실제 연동 전까지 사용)
const radarLabels = ['언어 이해', '시사 상식', '지각 추론', '공간 지각력', '작업 기억', '처리 속도']
const radarScores = [6, 5, 1, 6, 4, 5]
const lineLabels = ['03-01', '03-10', '03-20', '04-01', '04-10', '04-20', '05-01', '05-10']
const lineScores = [24, 26, 30, 25, 16, 18, 21, 33]

const fetchData = async () => {
  loading.value = true
  try {
    const params = {}
    if (year.value) params.year = year.value
    if (month.value) params.month = month.value
    const res = await fetchTestResultList(params)
    resultList.value = res.data.data.content || []
  } catch (e) {
    console.error('결과 불러오기 실패', e)
  } finally {
    loading.value = false
  }
}

const sortedList = computed(() => {
  return [...resultList.value].sort((a, b) => {
    return sort.value === 'desc'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
  })
})

onMounted(fetchData)
</script>

<template>
  <main class="content">
    <!-- 현재 결과 -->
    <section class="section">
      <h2 class="section-title">최근 검사 결과</h2>
      <div class="card">
        <div class="chart-row">
          <RadarChart :labels="radarLabels" :data="radarScores" />
          <LineChart :labels="lineLabels" :data="lineScores" />
        </div>
        <div class="grid">
          <div class="grid-item" v-for="(label, index) in radarLabels" :key="label">
            <div class="score-header">
              <div class="category-title">{{ label }}</div>
              <div class="score-num">{{ radarScores[index] }}점</div>
            </div>
            <div class="score-bar">
              <div class="bar" :style="{ width: (radarScores[index] / 6 * 100) + '%' }"></div>
            </div>
            <div class="category-content">{{ label }} 설명 내용</div>
          </div>
        </div>
        <div class="ai-summary-card">
          <p><strong>AI 분석 결과:</strong></p>
          <p>지각 추론 부문은 우수하나 작업 기억과 처리 속도에서 보와가 필요합니다.</p>
          <p>추천 학습: 숫자 외우기 및 기호 찾기 훈련을 꿔준히 해보세요.</p>
        </div>
      </div>
    </section>

    <!-- 검사 결과 목록 -->
    <section class="section">
      <h2 class="section-title">검사 결과 목록</h2>
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

      <div v-if="loading">불러오는 중...</div>
      <div v-else-if="resultList.length === 0">검사 결과가 없습니다.</div>
      <div v-else>
        <ResultCard
            v-for="item in sortedList"
            :key="item.testResultId"
            :testResultId="item.testResultId"
            :createdAt="item.createdAt"
            :highestCategory="item.highestCategory"
            :lowestCategory="item.lowestCategory"
            :totalScore="item.totalScore"
        />
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
.card {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  margin-bottom: 3rem;
}
.chart-row {
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
  justify-content: center;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  gap: 1.8rem;
  margin-bottom: 2rem;
}
.grid-item {
  background: #f9fafb;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
}
.score-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}
.category-title {
  font-weight: 600;
  color: #1e3a8a;
}
.score-num {
  color: #3b82f6;
  font-weight: 500;
}
.score-bar {
  height: 10px;
  background: #f1f5f9;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}
.score-bar .bar {
  height: 100%;
  background: linear-gradient(to right, #3b82f6, #93c5fd);
}
.category-content {
  font-size: 0.92rem;
  color: #555;
}
.ai-summary-card {
  background: #f0f4ff;
  padding: 1.8rem;
  border-radius: 16px;
  border: 1px solid #dbeafe;
  font-size: 0.95rem;
  line-height: 1.6;
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
</style>