import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Breadcrumb from '../components/Breadcrumb'

export default function Layout() {
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