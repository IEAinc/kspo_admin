import axios from 'axios';

// API Base URL
export const API_BASE_URL = window.location.origin.split(":")[0]+":"+window.location.origin.split(":")[1]+":8080";


// 서버에서 쿠키로 전달된 CSRF 토큰 읽기
function getCsrfTokenFromCookie() {
  const name = 'XSRF-TOKEN=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-XSRF-TOKEN': getCsrfTokenFromCookie()
  },
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
});

api.interceptors.request.use((config) => {
  const csrfToken = getCsrfTokenFromCookie();

  if (csrfToken) {
    config.headers['X-XSRF-TOKEN'] = csrfToken;
    //config.headers['X-CSRF-TOKEN'] = csrfToken; // 스프링이 두 헤더를 모두 체크하도록
  }
  return config;
}, (error) => Promise.reject(error));

// API Endpoints
// API Endpoints
export const API_ENDPOINTS = {
  SELECTION_VALUES: '/admin/selection-values',
  LIST: '/admin/list',
  Detail: '/admin/detail',
  Delete: '/admin/delete',
  Register: '/admin/insert',
  Update: '/admin/update',
  AdminCompanies: '/admin/admin-companies',
  AdminLIST: '/admin/admin-list',
  AdminInsert:'/admin/admin-insert',
  AdminUpdate:'/admin/admin-update',
  AdminDelete:'/admin/admin-delete',
  SatisList:'/admin/chat-eval/list',
  SatisDetail:'/admin/chat-eval/detail',
  SatisCompany:'/admin/chat-eval/company-list',
  LOGIN:'/admin/login',
  GETID:'/admin/get-userId',
  LOGOUT:'/admin/logout',
  LogLIst:'/admin/login-log/list',
  LogCompany:'/admin/login-log/company-list',
  TEST:'/admin/test'
};
