<script setup>
import { ref, computed } from 'vue'

const objectionList = ref([
  {
    objectionId: 101,
    categoryName: '언어 이해',
    createdAt: '2025-05-12T10:22:00',
    reason: '문제에 명확한 정답이 없다고 생각합니다.',
    status: 'PENDING'
  },
  {
    objectionId: 102,
    categoryName: '지각 추론',
    createdAt: '2025-04-28T10:45:00',
    reason: '정답이 명확하지 않습니다.',
    status: 'ACCEPTED'
  },
  {
    objectionId: 103,
    categoryName: '작업 기억',
    createdAt: '2025-04-10T08:22:00',
    reason: '문제 이미지가 깨져 있습니다.',
    status: 'REJECTED'
  }
])

const filter = ref('')

const statusLabel = {
  PENDING: '접수됨',
  ACCEPTED: '수용됨',
  REJECTED: '반려됨'
}

const statusColor = {
  PENDING: '#93c5fd',
  ACCEPTED: '#86efac',
  REJECTED: '#fca5a5'
}

const filteredList = computed(() => {
  return filter.value
      ? objectionList.value.filter(o => o.status === filter.value)
      : objectionList.value
})
</script>

<template>
  <main class="content">
    <section class="section">
      <h2 class="section-title">이의제기 내역 조회</h2>

      <div class="filter-row">
        <label for="status">상태</label>
        <select v-model="filter" id="status">
          <option value="">전체</option>
          <option value="PENDING">접수됨</option>
          <option value="ACCEPTED">수용됨</option>
          <option value="REJECTED">반려됨</option>
        </select>
      </div>

      <table class="objection-table">
        <thead>
        <tr>
          <th>분야</th>
          <th>사유</th>
          <th>상태</th>
          <th>제출 일시</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in filteredList" :key="item.objectionId">
          <td>{{ item.categoryName }}</td>
          <td>{{ item.reason }}</td>
          <td>
              <span
                  class="status-pill"
                  :style="{ backgroundColor: statusColor[item.status] }"
              >
                {{ statusLabel[item.status] }}
              </span>
          </td>
          <td>{{ item.createdAt.replace('T', ' ').slice(0, 16) }}</td>
          <td>
            <button class="detail-button">상세 보기</button>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<style scoped>
.section {
  margin-bottom: 80px;
}
.section-title {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
  padding-bottom: 0.5rem;
}
.filter-row {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
}
.filter-row label {
  font-size: 0.95rem;
}
.filter-row select {
  padding: 0.4rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
}
.objection-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}
.objection-table th {
  background: #f3f4f6;
  text-align: left;
  padding: 0.75rem;
  font-size: 0.95rem;
  color: #374151;
}
.objection-table td {
  padding: 0.75rem;
  border-top: 1px solid #eee;
  font-size: 0.95rem;
}
.status-pill {
  display: inline-block;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #1e293b;
}
.detail-button {
  background: #3b82f6;
  color: #fff;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}
.detail-button:hover {
  background: #1e40af;
}
</style>
