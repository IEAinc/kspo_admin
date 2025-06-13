import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Breadcrumb from '../components/Breadcrumb'
import { useEffect } from 'react'
import { api,API_ENDPOINTS } from '../constants/api'

export default function Layout() {
  const location = useLocation();
  const navigator= useNavigate()
  const chkAuth=async ()=>{
    // 아이디 가져오기로 토큰 검사
    try{
      const response = await api.post(API_ENDPOINTS.GETID)
      const ip = (await api.post(API_ENDPOINTS.GETIP)).data.data;
      console.log(ip);
    }catch(response){

      if(response.status!==200){
        try{
          await api.get(API_ENDPOINTS.LOGOUT)
          navigator("/ksponcoadministrator/login")

        }catch(response){
          navigator("/ksponcoadministrator/login")
        }
      
      }
    }
   
   
  }

  useEffect(() => {
    chkAuth()
  }, [location]);
  return (
    <div className="">
      {/* 헤더 */}
      <Header/>
      {/* 사이드바 */}
      <Sidebar/>
      {/* 콘텐츠 */}
      <div className="mt-[48px] ml-[220px] p-[32px] bg-primary-blue-light" style={{minHeight: 'calc(100vh - 48px)', overflowY: 'auto'}}>
        {/* 브레드크럼 추가 */}
        <div className="mb-4">
          <Breadcrumb />
        </div>

        {/* 하위 콘텐츠 */}
        <Outlet/>
      </div>
    </div>
  )
}