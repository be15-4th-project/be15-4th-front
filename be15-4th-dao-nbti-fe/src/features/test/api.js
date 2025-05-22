import api from "@/api/axios.js";

/* 1. 회원의 포인트를 가져오기 */
export function getUserPoints() {
    return api.get('/user/points');
}

/* 2. 문제 가져오기 */
export function getProblems() {
    return api.get('/test/problems');
}

/* 3. 문제 채점하기 */
export function submitAnswers(payload) {
    return api.post(`/test-result`, payload );
}
