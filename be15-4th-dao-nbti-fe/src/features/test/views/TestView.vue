<script setup>
// 총 문제 수 (이 부분은 맛보기 인지 정식 검사인지에 따라서 달라질 예정)
const totalProblems = 18;
// 현재 문제 번호
const currentProblem = 1;

// 진행 바 설정
const progressBar = document.getElementById("progressBar");
const percentage = (currentProblem / totalProblems) * 100;

// 타이머 설정 (나중에 이 부분은 시간에 맞게 가져올 예정임)
let time = 5;
const timer = document.getElementById("timer");

const interval = setInterval(() => {
    if (time <= 0) {
        clearInterval(interval);
        timer.textContent = "0";
    } else {
        time--;
        timer.textContent = time;
    }
}, 1000);

// 정답은 숫자만 입력 가능하므로, 숫자만 입력 가능하도록 필터링 넣었음
const input = document.getElementById("userAnswer");
input.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});
</script>

<template>
    <div class="timer" id="timer">5</div>

    <div class="container">
        <!-- 진행 바 -->
        <div class="progress-container">
            <div class="progress-bar" id="progressBar"></div>
        </div>

        <!-- 지시문 -->
        <!-- 문제 번호가 들어가는 부분 -->
        <div class="question-subtitle"><strong>1. </strong> 아래 전개도로 만들 수 있는 상자를 고르세요.</div>

        <!-- 문제 이미지 들어 갈 부분-->
        <div class="image-area">
            <img src="" alt="문제 이미지" width="300" />
        </div>

        <!-- 정답 입력 -->
        <div class="answer-input">
            정답 :
            <input type="text" id="userAnswer"/>
        </div>

        <!-- 버튼 -->
        <div class="button-group">
            <!-- 시간 제한이 있는 문제이기 때문에 이전 버튼은 없앰-->
            <button class="btn">다음</button>
            <!-- 마지막 번호라면 끝내기 버튼이 나올 수 있게 설정하기 -->
            <!--        <button class="btn">끝내기</button>-->
        </div>
    </div>
</template>

<style scoped>
template {
    margin: 0;
    font-family: 'Pretendard', sans-serif;
    background: #f8f9fa;
    color: #333;
}

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