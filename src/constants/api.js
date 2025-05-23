import axios from 'axios';


// API Base URL
export const API_BASE_URL = window.location.origin.split(":")[0]+":"+window.location.origin.split(":")[1]+":80";

// Create axios instance with default settings
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true 
});

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
  LOGOUT:'/admin/logout'
};
