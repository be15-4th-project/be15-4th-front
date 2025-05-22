// src/features/mypage/api.js
import api from '@/api/axios.js'

/**
 * 검사 결과 목록 조회
 */
export function fetchTestResultList(params = {}) {
    return api.get('/test-result/list', { params })
}

/**
 * 검사 결과 상세 조회
 */
export function fetchTestDetail(testResultId) {
    return api.get(`/test-result/${testResultId}`)
}

/**
 * 학습 내역 조회
 */
export function fetchStudyResults(params = {}) {
    return api.get('/mypage/studies', { params })
}

// 학습 결과 상세 조회 API
export const fetchStudyDetail = (id) => api.get(`/mypage/studies/${id}`)

// 이의 제기 목록 조회 API
export const fetchObjections = () => api.get('/mypage/objections')

//회원 정보 조회 API
export const fetchUserInfo = () => api.get('/user/info')

// export const fetchObjectionDetail = (id) => api.get(`/mypage/objections/${id}`)


