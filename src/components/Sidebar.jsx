import { useState, useEffect } from 'react';
import { Link, useLocation} from 'react-router-dom'
// 이미지 모음
import UserIcon from '../assets/images/kspo_logo.svg?react'
import Icon1 from '../assets/images/sidebar/ico_file.svg?react'
import Icon1Active from '../assets/images/sidebar/ico_file_active.svg?react'
import Icon2 from '../assets/images/sidebar/ico_star.svg?react'
import Icon2Active from '../assets/images/sidebar/ico_star_active.svg?react'
import Icon3 from '../assets/images/sidebar/ico_user.svg?react'
import Icon3Active from '../assets/images/sidebar/ico_user_active.svg?react'
import Icon4 from '../assets/images/sidebar/ico_time.svg?react'
import Icon4Active from '../assets/images/sidebar/ico_time_active.svg?react'
import Arrow from '../assets/images/icon/ico_arrow.svg?react'
import ArrowActive from '../assets/images/icon/ico_arrow_active.svg?react'
import { allowIdList, fetchCommonData } from '../constants/common';

// 메뉴 데이터 모음


const Sidebar = () => {
  // 아코디언 메뉴의 상태 관리
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation(); // 현재 경로 가져오기
  const [menuData,setMenuData ]= useState([
    {
      title: '시나리오 관리',
      path: '/ksponcoadministrator/menu1',
      icon: {
        default: Icon1,
        active: Icon1Active,
      },
      subMenu: [
        { title: '메인 시나리오 관리', path: '/ksponcoadministrator/scenarioManagement/mainScenarioManagement',state:{type:'big'} },
        { title: 'FAQ 관리', path: '/ksponcoadministrator/scenarioManagement/faqManagement',state:{type:'FAQ'}  },
      ],
    },
    {
      title: '만족도 관리',
      path: '/ksponcoadministrator/menu1',
      icon: {
        default: Icon2,
        active: Icon2Active,
      },
      subMenu: [
        {title:'챗봇 이용자 만족도 조회', path:'/ksponcoadministrator/satisfactionManagement/satisfactionManagement'},
        {title:'챗봇 이용 현황', path:'/ksponcoadministrator/satisfactionManagement/consultationConnectionCount'}
      ]
    },
    // {
    //   title: '만족도 관리',
    //   path: '/ksponcoadministrator/satisfactionManagement/satisfactionManagement',
    //   icon: {
    //     default: Icon2,
    //     active: Icon2Active,
    //   },
    // },
    {
      title: '관리자 관리',
      path: '/ksponcoadministrator/adminManagement/adminManagement', // 하위 메뉴가 없음
      icon: {
        default: Icon3,
        active: Icon3Active,
      },
    },
    {
      title: '이력 관리',
      path: '/ksponcoadministrator/menu1',
      icon: {
        default: Icon4,
        active: Icon4Active,
      },
      subMenu: [
        { title: '메인시나리오 수정이력 조회', path: '/ksponcoadministrator/historyManagement/mainScenarioHistory',state:{type:'big'} },
        { title: 'FAQ 수정이력 조회', path: '/ksponcoadministrator/historyManagement/faqModificationHistory',state:{type:'FAQ'} },
        { title: '로그인 이력 조회', path: '/ksponcoadministrator/historyManagement/loginHistory' },
      ],
    },
    // {
    //   title: '이력 관리',
    //   path: '/ksponcoadministrator/menu1',
    //   icon: {
    //     default: Icon4,
    //     active: Icon4Active,
    //   },
    //   subMenu: [
    //     { title: '메인시나리오 수정이력 조회', path: '/ksponcoadministrator/historyManagement/mainScenarioHistory' },
    //     { title: 'FAQ 수정이력 조회', path: '/ksponcoadministrator/historyManagement/faqModificationHistory' },
    //     { title: '로그인 이력 조회', path: '/ksponcoadministrator/historyManagement/loginHistory' },
    //   ],
    // },
  ]);
  // 현재 활성화된 메뉴의 인덱스를 찾아 설정
  useEffect(() => {
    const activeMenuIndex = menuData.findIndex((menu) => {
      // 상위 메뉴의 path가 현재 경로를 포함하는 경우
      if (location.pathname.startsWith(menu.path)) {
        return true;
      }

      // 하위 메뉴가 있고, 하위 메뉴의 path가 현재 경로와 일치하는 경우
      if (
        menu.subMenu &&
        menu.subMenu.some((subMenu) => location.pathname.startsWith(subMenu.path))
      ) {
        return true;
      }
      return false;
    });
    const makeMenu= async ()=>{
      const { company, id } = await fetchCommonData();
      if(allowIdList.indexOf(id)===-1){
        setMenuData([
          {
            title: '시나리오 관리',
            path: '/ksponcoadministrator/menu1',
            icon: {
              default: Icon1,
              active: Icon1Active,
            },
            subMenu: [
              { title: '메인 시나리오 관리', path: '/ksponcoadministrator/scenarioManagement/mainScenarioManagement',state:{type:'big'} },
              { title: 'FAQ 관리', path: '/ksponcoadministrator/scenarioManagement/faqManagement',state:{type:'FAQ'}  },
            ],
          },
          {
            title: '만족도 관리',
            path: '/ksponcoadministrator/menu1',
            icon: {
              default: Icon2,
              active: Icon2Active,
            },
            subMenu: [
              {title:'챗봇 이용자 만족도 조회', path:'/ksponcoadministrator/satisfactionManagement/satisfactionManagement'},
              {title:'챗봇 이용 현황', path:'/ksponcoadministrator/satisfactionManagement/consultationConnectionCount'}
            ]
          },

          // {
          //   title: '만족도 관리',
          //   path: '/ksponcoadministrator/satisfactionManagement/satisfactionManagement',
          //   icon: {
          //     default: Icon2,
          //     active: Icon2Active,
          //   },
          // },
          {
            title: '이력 관리',
            path: '/ksponcoadministrator/menu1',
            icon: {
              default: Icon4,
              active: Icon4Active,
            },
            subMenu: [
              { title: '메인시나리오 수정이력 조회', path: '/ksponcoadministrator/historyManagement/mainScenarioHistory',state:{type:'big'} },
              { title: 'FAQ 수정이력 조회', path: '/ksponcoadministrator/historyManagement/faqModificationHistory',state:{type:'FAQ'} },
            ],
          },
        
        ]);
      }
    }
    makeMenu();

    // 활성화된 메뉴를 찾아 openMenu로 설정 (없다면 null)
    setOpenMenu(activeMenuIndex !== -1 ? activeMenuIndex : null);
  }, [location.pathname]); // location.pathname이 변경될 때마다 실행


  // 메뉴 열림/닫힘 상태 토글 함수
  const toggleMenu = (menuIndex) => {
    setOpenMenu((prevMenu) => (prevMenu === menuIndex ? null : menuIndex));
  };

  return (
    <div className="w-[220px] h-[100vh] fixed top-0 left-0 bg-primary-color">
      <h1 className="w-full h-[48px] flex items-center justify-center py-[10px] px-[22px] border-b border-gray1">
        <Link to={"/ksponcoadministrator/scenarioManagement/mainScenarioManagement"} state={{type:'big'}}>
          <UserIcon />
        </Link>
      </h1>
      {/* 동적 메뉴 렌더링 */}
      <div className="py-[10px]">
        {menuData?menuData.map((menu, index) => {
          const isMenuActive = location.pathname.startsWith(menu.path); // 상위 메뉴 활성화 여부
          const isSubMenuActive =
            menu.subMenu &&
            menu.subMenu.some((subMenu) =>
              location.pathname.startsWith(subMenu.path)
            ); // 하위 메뉴 활성화 여부

          const isOpened = openMenu === index; // 현재 메뉴가 열려 있는 상태인지 확인

          return (
            <div key={index}>
              {/* Link 또는 Button을 사용하여 경로 이동 처리 */}
              <Link
                to={menu.subMenu ? "#" : menu.path} 
                state={menu.state?menu.state:{}}// 하위 메뉴가 없으면 바로 경로로 이동
                className={`w-full flex items-center justify-between px-[20px] py-[14px] text-[16px] font-medium ${
                  isOpened || isMenuActive || isSubMenuActive
                    ? "text-white"
                    : "text-gray2"
                }`}
                onClick={(event) => {
                  if (menu.subMenu) {
                    event.preventDefault(); // 하위 메뉴가 있을 경우 경로 변경 방지
                    toggleMenu(index); // 아코디언 열림/닫힘 처리
                  }
                }}
              >
                <div className="flex items-center gap-[4px]">
                  {/* 아이콘 표시 */}
                  {isOpened || isMenuActive || isSubMenuActive ? (
                    <menu.icon.active className="w-[16px] h-[16px]" />
                  ) : (
                    <menu.icon.default className="w-[16px] h-[16px]" />
                  )}
                  {menu.title}
                </div>
                {/* 하위 메뉴 토글 아이콘 */}
                {menu.subMenu && (
                  <span className="flex items-center">
                    {isOpened ? (
                      <ArrowActive className="w-[16px] h-[16px]" />
                    ) : (
                      <Arrow className="w-[16px] h-[16px]" />
                    )}
                  </span>
                )}
              </Link>

              {/* 하위 메뉴 */}
              {menu.subMenu && (
                <ul
                  className={`transition-max-height duration-300 ease-in-out overflow-hidden bg-primary-color-light ${
                    isOpened
                      ? "max-h-[500px] py-[10px]"
                      : "max-h-0 py-0"
                  }`}
                >
                  {menu.subMenu.map((subMenu, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={subMenu.path}
                        state={subMenu.state?subMenu.state:{}}
                        className={`block py-[11px] pl-[40px] pr-[10px] text-[15px] ${
                          location.pathname.startsWith(subMenu.path)
                            ? "text-white" // 하위 메뉴 활성화 스타일
                            : "text-gray2"
                        }`}
                      >
                        {subMenu.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }):(<></>)}
      </div>
    </div>
  );

}
export default Sidebar