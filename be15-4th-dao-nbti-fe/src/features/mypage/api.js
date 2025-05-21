import api from '@/api/axios'

// 검사 결과 목록 조회 API
export const fetchTestResultList = (params = {}) => {
    return api.get('/test-result/list', { params })
}

// 검사 결과 상세 조회 API
export const fetchTestDetail = (id) => api.get(`/test-result/${id}`)

// 학습 결과 목록 조회 API
export const fetchStudyResults = () => api.get('/mypage/studies')

// 학습 결과 상세 조회 API
export const fetchStudyDetail = (id) => api.get(`/mypage/studies/${id}`)
/*
export const fetchObjections = () => api.get('/mypage/objections')
export const fetchObjectionDetail = (id) => api.get(`/mypage/objections/${id}`)
export const fetchUserInfo = () => api.get('/user/info')
*/
