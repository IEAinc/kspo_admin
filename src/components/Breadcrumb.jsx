import { useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation(); // 현재 경로 가져오기
  const pathnames = location.pathname.split("/").filter((x) => x); // 경로를 배열로 분리 (빈 값 제거)


  // 경로명과 한글 매핑
  const routeNames = {
    scenarioManagement: "시나리오 관리",
    mainScenarioManagement: "메인 시나리오 관리",
    faqManagement: "FAQ 관리",
    satisfactionManagement: "만족도 관리",
    adminManagement: "관리자 관리",
    historyManagement: "이력 관리",
    mainScenarioHistory: "메인시나리오 수정이력 조회",
    faqModificationHistory: "FAQ 수정이력 조회",
    loginHistory: "로그인 이력 조회",
  };


  // 마지막 경로 가져오기
  let lastPathname = ''
  if(pathnames.length === 3) {
    lastPathname = `${routeNames[pathnames[pathnames.length - 1]]}`; // 경로 배열의 마지막 값
  } else {
    if(pathnames.length === 4 && pathnames[3] === 'register') {
      lastPathname = `${routeNames[pathnames[pathnames.length - 2]]} > 등록`
    }else if(pathnames.length === 5 && pathnames[4] === 'edit') {
      lastPathname = `${routeNames[pathnames[pathnames.length - 3]]} > 수정`
    }else {
      lastPathname = `${routeNames[pathnames[pathnames.length - 2]]} > 상세보기`
    }
  }

  return (
    <nav className="flex">
      {lastPathname && ( // 마지막 경로가 있는 경우에만 표시
        <ol className="flex">
          <li className="text-[24px] font-bold text-black">
            {routeNames[lastPathname] || lastPathname}
          </li>
        </ol>
      )}
    </nav>
  );
};

export default Breadcrumb;