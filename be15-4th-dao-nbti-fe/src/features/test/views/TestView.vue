<script setup>
import {ref, onMounted, watchEffect, computed} from 'vue'
import {getProblems} from "@/features/test/api.js";
import {useAuthStore} from "@/stores/auth.js";

const authStore = useAuthStore()

// 문제 담기
const problems = ref([]);
// 현재 문제 index
const currentProblemIndex = ref(0);
// 전체 문제 수
const totalProblems = computed(() => problems.value.length);

// 문제 진행률을 표시하기 위한 것
const percentage = ref(0);
const time = ref(0);
const timerDisplay = ref('0');
let interval;

const userAnswer = ref('');
const guestId = ref(null);

// 문제를 가져오는 api
async function fetchProblems() {
    try {
        const res = await getProblems();

        problems.value = res.data.data.problemList;
        guestId.value = res.data.data.guestId;

        console.log(problems.value);
        console.log(guestId.value);

        currentProblemIndex.value = 0;

        startTimer();
    } catch (e) {
        console.error('문제 불러오기 실패:', e)
    }
}

// 문제를 채점하는 api

// 타이머 시작하기
function startTimer() {
    if (interval) clearInterval(interval)

    const current = problems.value[currentProblemIndex.value]
    time.value = current?.timeLimit ?? 60
    timerDisplay.value = time.value.toString()

    interval = setInterval(() => {
        if (time.value <= 0) {
            clearInterval(interval)
            timerDisplay.value = '0'

            goToNextProblem()
        } else {
            time.value--
            timerDisplay.value = time.value.toString()
        }
    }, 1000)
}

// 다음 문제로 넘어가기
function goToNextProblem() {
    if (currentProblemIndex.value < totalProblems.value - 1) {
        currentProblemIndex.value++
        userAnswer.value = ''
        startTimer()
    } else {
        console.log('검사 종료!')
    }
}

watchEffect(() => {
    percentage.value =
        totalProblems.value > 0
            ? ((currentProblemIndex.value + 1) / totalProblems.value) * 100
            : 0
})

onMounted(fetchProblems);
</script>

<template>
    <div class="timer">{{ timerDisplay }}</div>

    <div class="container" v-if="problems.length > 0">
        <div class="progress-container">
            <div class="progress-bar" :style="{ width: percentage + '%' }"></div>
        </div>

        <div class="image-area">
            <img :src="problems[currentProblemIndex].contentImageUrl" alt="문제 이미지" width="300" />
        </div>

        <div class="answer-input">
            정답 :
            <input type="text" v-model="userAnswer" />
        </div>

        <div class="button-group">
            <button class="btn" @click="goToNextProblem">다음</button>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 900px;
    margin: 3rem auto;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    padding: 3rem 4rem;
    text-align: center;
    position: relative;
}

.progress-container {
    width: 100%;
    height: 6px;
    background-color: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 2rem;
}

.progress-bar {
    height: 100%;
    background-color: #3b82f6;
    transition: width 0.3s ease;
}

.question-subtitle {
    font-size: 1rem;
    color: #666;
    margin-bottom: 2.5rem;
}

.image-area {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
}

.answer-input {
    margin-top: 1.5rem;
}

.answer-input input {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    width: 100px;
    text-align: center;
}

.button-group {
    margin-top: 2rem;
    display: flex;
    gap: 1.5rem;
    justify-content: center;
}

.btn {
    background: #3b82f6;
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s ease;
}

.btn:hover {
    background: #1e3a8a;
}

.timer {
    position: absolute;
    margin: 10px;
    right: 2rem;
    background: #eee;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    z-index: 10;
}
</style>