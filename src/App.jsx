import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react'
import './App.css'
// 페이지 경로
import Layout from './layout/Layout'
// 로그인
import Login from './pages/auth/Login'
// 시나리오 관리
import MainScenarioManagement from './pages/scenarioManagement/MainScenarioManagement' // 메인시나리오 관리
import DetailCardMainScenarioManagementRegister from './pages/scenarioManagement/DetailCardMainScenarioManagementRegister' // 메인시나리오 관리 > 등록
import DetailCardMainScenarioManagementEdit from './pages/scenarioManagement/DetailCardMainScenarioManagementEdit' // 메인시나리오 관리 > 수정
import DetailCardMainScenarioManagement from './pages/scenarioManagement/DetailCardMainScenarioManagement' // 메인시나리오 관리 > 상세
import FaqManagement from './pages/scenarioManagement/FaqManagement' // 메인시나리오 관리
import DetailCardFaqManagementRegister from './pages/scenarioManagement/DetailCardFaqManagementRegister'
import DetailCardFaqManagement from './pages/scenarioManagement/DetailCardFaqManagementRegister.jsx' // FAQ 관리 > 상세
// 만족도 관리
import SatisfactionManagement from './pages/satisfactionManagement/SatisfactionManagement'
import DetailCardSatisfactionManagement from './pages/satisfactionManagement/DetailCardSatisfactionManagement'
// 관리자 관리
import AdminManagement from './pages/adminManagement/AdminManagement'
import DetailCardAdminManagement from './pages/adminManagement/DetailCardAdminManagement'
// 이력 관리
import MainScenarioHistory from './pages/historyManagement/MainScenarioHistory'
import DetailCardMainScenarioHistory from './pages/historyManagement/DetailCardMainScenarioHistory'
import FaqModificationHistory from './pages/historyManagement/FaqModificationHistory'
import DetailCardFaqModificationHistory from './pages/historyManagement/DetailCardFaqModificationHistory'
import LoginHistory from './pages/historyManagement/LoginHistory'
import ChatMain from './pages/userPage/chatMain.jsx';
import ChatWindow from './pages/userPage/window.jsx';
import ErrorPage from './pages/error/ErrorPage.jsx';

function App() {
  function removeKoreanCookies() {
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      const [rawName, ...rawValue] = cookie.split("=");
      const name = rawName.trim();
      const value = rawValue.join("=")?.trim();

      
      // 한글 포함 여부 검사 (정규식)
      const hasKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(name) || /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value);
  
      if (hasKorean) {
        // 쿠키 삭제 (경로와 도메인에 따라 조정 가능)
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; `;
       
      }
    });
  }
  useEffect(() => {
    removeKoreanCookies();
  }, []);
  let pagList=['olparksports','olparkswim','olparktennis','olparksoccer','ilsansports','bundangsports']
  return (
    <Routes>
      {/* 사용자 페이지 */}
      {pagList.map(e=>{
        return <Route path={`/sports/`+e} element={<ChatMain/>}/>
      }
      )}
  
      {/*  윈도우 페이지 */}
      {pagList.map(e=>{
        return <Route path={`/sports/`+e+`/window`} element={<ChatWindow/>}/>
      }
      )}
      <Route path='/' element={<ChatMain/>}/>
      {/* 관리자 페이지 */}

      <Route path="/ksponcoadministrator/login" element={<Login />} />

      {/* 에러 관리 */}
      <Route path="/*" element={<ErrorPage />} />
      <Route
        path="/ksponcoadministrator"
        element={<Layout />}
      >
        {/* 시나리오 관리 */}
        <Route path="scenarioManagement/mainScenarioManagement" element={<MainScenarioManagement />} />{/* 메인시나리오 관리 */}
        <Route path="scenarioManagement/mainScenarioManagement/register" element={<DetailCardMainScenarioManagementRegister />} /> {/* 메인시나리오 관리 > 상세보기 > 등록 */}
        <Route path="scenarioManagement/mainScenarioManagement/detail/edit" element={<DetailCardMainScenarioManagementRegister />} /> {/* 메인시나리오 관리 > 상세보기 > 수정 */}
        <Route path="scenarioManagement/mainScenarioManagement/detail" element={<DetailCardMainScenarioManagement />} /> {/* 메인시나리오 관리 > 상세보기 */}
        <Route path="scenarioManagement/faqManagement" element={<MainScenarioManagement />} />
        <Route path="scenarioManagement/faqManagement/register" element={<DetailCardMainScenarioManagementRegister />} /> {/* 메인시나리오 관리 > 상세보기 > 등록 */}
        <Route path="scenarioManagement/faqManagement/detail/edit" element={<DetailCardMainScenarioManagementRegister />} /> {/* 메인시나리오 관리 > 상세보기 > 수정 */}
        <Route path="scenarioManagement/faqManagement/detail" element={<DetailCardMainScenarioManagement />} />

        {/* 만족도 관리 */}
        <Route path="satisfactionManagement/satisfactionManagement" element={<SatisfactionManagement />} />
        <Route path="satisfactionManagement/satisfactionManagement/detail" element={<DetailCardSatisfactionManagement />} />

        {/* 관리자 관리 */}
        <Route path="adminManagement/adminManagement" element={<AdminManagement />} />
        <Route path="adminManagement/adminManagement/register" element={<DetailCardAdminManagement />} />

        {/* 이력 관리 */}
        <Route path="historyManagement/mainScenarioHistory" element={<MainScenarioHistory />} />
        <Route path="historyManagement/mainScenarioHistory/detail" element={<DetailCardMainScenarioHistory />} />
        <Route path="historyManagement/faqModificationHistory" element={<MainScenarioHistory />} />
        <Route path="historyManagement/faqModificationHistory/detail" element={<DetailCardMainScenarioHistory />} />
        <Route path="historyManagement/loginHistory" element={<LoginHistory />} />
      </Route>
    </Routes>
  )
}

export default App
