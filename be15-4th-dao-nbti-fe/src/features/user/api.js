import api from "@/api/axios.js";

export function loginUser(data) {
    return api.post('/user/login', data);
}

export function refreshUserToken() {
    return api.post(`/user/refresh`);
}

export function logoutUser() {
    return api.post(`/user/logout`);
}

export function id_check(accountId) {
    return api.get(`/user/id-duplicate?accountId=${accountId}`,);
}

export function signup(userInfo) {
    return api.post(`/user/signup`,userInfo);
}

