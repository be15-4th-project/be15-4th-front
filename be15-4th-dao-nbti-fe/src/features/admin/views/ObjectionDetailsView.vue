<!-- ObjectionDetailModal.vue -->
<script setup>
import BigModal from "@/components/common/BigModal.vue";

const props = defineProps({
  visible: Boolean,
  objection: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['close', 'approve', 'reject', 'updateInfo', 'goToProblem'])

function handleClose() {
  emit('close')
}

function handleApprove() {
  emit('approve', objection.objectionId)
}

function handleReject() {
  emit('reject', objection.objectionId)
}

function updateInfo(event) {
  emit('updateInfo', event.target.value)
}

function onGoToProblem() {
  emit('goToProblem', objection.problemId)
}

const formatDateTimeWithWeekday = (datetimeStr) => {
  const [datePart, timePart] = datetimeStr.split('T'); // ['2025-05-20', '10:18:00']
  const date = new Date(datePart);
  const weekdays = '일월화수목금토';
  const day = weekdays[date.getDay()];
  return `${datePart} (${day}) ${timePart}`;
};
</script>

<template>
  <BigModal :visible="visible" @cancel="handleClose" :confirm-visible="false">
    <template #default>
      <h2 style="margin-bottom: 1.5rem;">이의 제기 상세</h2>

      <div style="text-align: left;">
        <div class="form-group">
          <label>회원 아이디</label>
          <input type="text" :value="objection.accountId" disabled />
        </div>

        <div class="form-group">
          <label>문제 ID</label>
          <div style="display: flex; gap: 0.5rem;">
            <input type="text" :value="objection.problemId" disabled />
            <button class="btn" @click="onGoToProblem">문제 확인</button>
          </div>
        </div>

        <div class="form-group">
          <label>제출 일시</label>
          <input type="text" :value="formatDateTimeWithWeekday(objection.createdAt)" disabled />
        </div>

        <div class="form-group">
          <label>상세 내용</label>
          <textarea :value="objection.content" disabled />
        </div>

        <div class="form-group">
          <label>처리 정보</label>
          <textarea
              v-model="objection.response"
              placeholder="답변 내용을 입력하세요"
          />
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1rem;">
          <button class="btn" @click="handleApprove">승인</button>
          <button class="btn secondary" @click="handleReject">반려</button>
        </div>
      </div>
    </template>
  </BigModal>
</template>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.form-group label {
  font-weight: 500;
  margin-bottom: 0.25rem;
}
.form-group input,
.form-group textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}
textarea {
  min-height: 100px;
}
.btn {
  padding: 0.5rem 1rem;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.btn.secondary {
  background: #6c757d;
}
</style>
