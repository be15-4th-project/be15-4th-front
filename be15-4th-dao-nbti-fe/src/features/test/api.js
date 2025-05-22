import api from "@/api/axios.js";

/* 1. 회원의 포인트를 가져오기 */
export function getUserPoints() {
    return api.get('/user/points');
}
