<script setup>
import {ref, computed, onMounted, watch} from 'vue'
import api from "@/api/axios.js";
import { useRouter, useRoute } from "vue-router";
import SmallModal from "@/components/common/SmallModal.vue";

const router = useRouter()
const route = useRoute()

const isEditMode = ref(false)
const parentCategories = ref([]);
const categories = ref([]);
const problem = ref({})
const showDeleteModal = ref(false)  // 삭제 모달 상태 추가

const fetchCategories = async () => {
  const response = await api.get('/admin/categories')
  parentCategories.value = response.data.data.parentCategories;
  categories.value = response.data.data.childCategories;
}

const findParentCategoryId = (categoryId) => {
  const child = categories.value.find((c) => c.categoryId === categoryId)
  return child?.parentCategoryId || ''
}

const filteredCategories = computed(() => {
  if (!problem.value.parentCategory) return []
  return categories.value.filter(
      (child) => child.parentCategoryId === problem.value.parentCategory
  );
});

const fetchProblem = async () => {
  const problemId = route.params.problemId;
  const res = await api.get(`/admin/problems/${problemId}`)
  const data = res.data.data.problem
  problem.value = {
    ...data,
    parentCategory: findParentCategoryId(data.categoryId) // 매핑!
  }
}

onMounted(async () => {
  await fetchCategories();
  await fetchProblem();
});

watch(() => problem.value.parentCategory, () => {
  problem.value.categoryId = ''
});

function startEdit() {
  isEditMode.value = true
}

// 삭제 버튼 눌렀을 때 모달 열기
function onDeleteClick() {
  showDeleteModal.value = true
}

// 모달 확인 눌렀을 때 실제 삭제 처리
const onConfirmDelete = async () => {
  showDeleteModal.value = false
  try {
    await api.delete(`/admin/problems/${problem.value.problemId}`)
    alert('삭제가 완료되었습니다.')
    router.push('/admin/problems')  // 목록 페이지 등으로 이동
  } catch (error) {
    alert('삭제 중 오류가 발생했습니다.')
  }
}

// 모달 취소 눌렀을 때 닫기
const onCancelDelete = () => {
  showDeleteModal.value = false
}
</script>

<template>
  <main class="content">
    <section class="section">
      <template v-if="!isEditMode">
        <h2>문제 상세 조회</h2>
      </template>
      <template v-else>
        <h2>문제 상세 조회 - 수정</h2>
      </template>

      <div class="card">
        <!-- 상단 버튼 -->
        <div class="flex">
          <div class="top-btn-group">
            <template v-if="!isEditMode">
            <button class="btn" @click="startEdit">수정하기</button>
            <button class="btn" @click="onDeleteClick">삭제</button>
            <button class="btn">목록으로</button>
            </template>
            <template v-else>
              <button class="btn">수정 완료</button>
              <button class="btn" @click="onDeleteClick">삭제</button>
              <button class="btn">취소</button>
            </template>
          </div>
        </div>

        <!-- 폼 -->
        <form>
          <div class="form-group" style="margin-bottom:1.5rem;">
            <label for="problem-id">문제 번호</label>
            <input type="text" id="problem-id" :value="problem.problemId" readonly>
          </div>

          <!-- 상위/하위 분야를 가로 배치 -->
          <div class="form-row">
            <div class="form-group">
              <label for="category-parent">상위 분야</label>
              <select id="category-parent" :disabled="!isEditMode" v-model="problem.parentCategory">
                <option key="" value ="">선택</option>
                <option v-for="parent in parentCategories" :key="parent.categoryId" :value="parent.categoryId">{{ parent.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="category-child">하위 분야</label>
              <select id="category-child" :disabled="!isEditMode" v-model="problem.categoryId">
                <option key="" value ="">선택</option>
                <option v-for="child in filteredCategories" :key="child.categoryId" :value="child.categoryId">{{ child.name }}</option>
              </select>
            </div>
          </div>

          <!-- 난이도/답안 유형 가로 배치 -->
          <div class="form-row">
            <div class="form-group">
              <label for="difficulty">난이도</label>
              <select id="difficulty" :disabled="!isEditMode" v-model="problem.level">
                <option value="">선택</option>
                <option value="1">레벨 1</option>
                <option value="2">레벨 2</option>
                <option value="3">레벨 3</option>
              </select>
            </div>
            <div class="form-group">
              <label for="answer-type">답안 유형</label>
              <select id="answer-type" :disabled="!isEditMode" v-model="problem.answerTypeId">
                <option value="">선택</option>
                <option value="1">선다형</option>
                <option value="2">단답형</option>
                <option value="3">다답형</option>
              </select>
            </div>
          </div>

          <!-- 본문 이미지 업로드 -->
          <div class="form-group" style="margin-bottom:1.5rem;">
            <label for="image-upload">본문 이미지</label>
            <input type="file" id="image-upload" accept="image/*" :disabled="!isEditMode">
          </div>

          <div class="preview-box">
            <img :src="problem.contentImageUrl" alt="이미지 없음"/>
          </div>

          <div class="form-group">
            <label for="correct-answer">정답</label>
            <input type="text" id="correct-answer" v-model="problem.correctAnswer" :readonly="!isEditMode">
          </div>
        </form>
      </div>
    </section>

    <SmallModal
        :visible="showDeleteModal"
        message="정말 삭제하시겠습니까?"
        :confirmVisible="true"
        confirmText="삭제"
        @confirm="onConfirmDelete"
        @cancel="onCancelDelete"
    />

  </main>
</template>

<style scoped>
.top-btn-group {
  display: flex;
  gap: 12px;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.flex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1.5rem;
  margin-left: 20rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  background: #007bff;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.form-group label {
  font-weight: 500;
}

.form-group input[type="text"],
.form-group select,
.form-group input[type="file"] {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.preview-box {
  width: 200px;
  height: 180px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  margin-bottom: 1rem;
}
</style>
