import { api, API_ENDPOINTS } from "./api";

export const allowIdList=['Asdmin','IEA_Admin'];

async function fetchUserCompany() {
const res = await   api.post(API_ENDPOINTS.GETCompany);
return res.data;
}

async function fetchUserId() {
const res = await  api.post(API_ENDPOINTS.GETID);
return res.data;
}

// ✅ 여기에 한 번에 호출하는 함수 추가
export async function fetchCommonData() {
try {
    const [company, id] = await Promise.all([
        fetchUserCompany(),
        fetchUserId()
    ]);

    return { company, id };
} catch (err) {
    console.error('공통 데이터 호출 실패:', err);
    throw err;
}
}
