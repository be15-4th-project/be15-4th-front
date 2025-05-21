<script setup>
// import BigModal from '@/components/common/BigModal.vue'
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

const selectedObjection = ref(null)
const modalVisible = ref(false)

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
                  class="status"
                  :class="item.status.toLowerCase()"
              >
                {{ statusLabel[item.status] }}
              </span>
          </td>
          <td>{{ item.createdAt.replace('T', ' ').slice(0, 16) }}</td>
          <td>
            <button class="detail-button" @click="selectedObjection = item; modalVisible = true">상세 보기</button>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </main>
<!--  <BigModal
      :visible="modalVisible"
      @cancel="modalVisible = false"
  >
    <template #default>
      <div class="modal-detail">
        <div class="modal-header">
          <h3>제출한 이의제기 내용</h3>
          <span class="status" :class="selectedObjection?.status.toLowerCase()">
            {{ statusLabel[selectedObjection?.status] }}
          </span>
        </div>
        <div class="modal-meta">
          <div><strong>분야</strong> {{ selectedObjection?.categoryName }}</div>
          <div><strong>제출일시</strong> {{ selectedObjection?.createdAt.replace('T', ' ').slice(0, 16) }}</div>
        </div>
        <div class="modal-reason">
          <p class="label">이의제기 사유</p>
          <p class="value">{{ selectedObjection?.reason }}</p>
        </div>
        <div class="modal-confirm">
          <button class="detail-button" @click="modalVisible = false">확인했어요</button>
        </div>
      </div>
    </template>
  </BigModal>-->
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
.status {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 500;
  display: inline-block;
}

.status.pending {
  background: #e0f3ff;
  color: var(--color-main, #3b82f6);
}

.status.accepted {
  background: #e8f5e9;
  color: var(--color-success, #2e7d32);
}

.status.rejected {
  background: #fdecea;
  color: var(--color-error, #d32f2f);
}

.status.processing {
  background: #fff3cd;
  color: var(--color-warning, #ff9800);
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
.modal-detail {
  text-align: left;
  font-size: 0.95rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-meta {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  background: #f5f7fa;
  padding: 0.75rem 1rem;
  border-radius: 8px;
}
.modal-reason {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1rem;
}
.modal-reason .label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.modal-reason .value {
  line-height: 1.6;
  white-space: pre-wrap;
}
.modal-confirm {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
</style>
