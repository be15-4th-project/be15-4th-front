<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  pageSize: { type: Number, default: 10 },
  totalItems: { type: Number, required: true }
})

const emit = defineEmits(['update:currentPage'])

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize))

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page)
  }
}
</script>

<template>
  <div v-if="totalPages > 1" class="pagination">
    <button :disabled="props.currentPage === 1" @click="goToPage(props.currentPage - 1)">이전</button>

    <button
        v-for="page in totalPages"
        :key="page"
        :class="{ active: props.currentPage === page }"
        @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <button :disabled="props.currentPage === totalPages" @click="goToPage(props.currentPage + 1)">다음</button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.pagination button {
  border: 1px solid #ddd;
  background: #fff;
  color: #333;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.pagination button.active {
  background-color: var(--color-main);
  color: white;
  font-weight: 600;
  border-color: var(--color-main);
}

.pagination button:disabled {
  background-color: #f3f4f6;
  color: #ccc;
  cursor: not-allowed;
}
</style>
