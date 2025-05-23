import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
// 이미지 모음
import UserIcon from '../assets/images/icon/ico_userImage.svg?react'
import { useEffect, useState } from 'react';
import { api ,API_ENDPOINTS} from '../constants/api';
const Header = () => {
  const navigate=useNavigate();
  const [username, setUsername] = useState('');
  useEffect(() => {
    const cookieValue = Cookies.get('username');
    if (cookieValue) {
      setUsername(cookieValue);
    }
  }, []);
  const logOut=async ()=>{
    await api.get(API_ENDPOINTS.LOGOUT)
    navigate("/login")
  }
  return (
    <header className="w-[calc(100%-220px)] h-[48px] flex items-center fixed top-0 left-[220px] py-[15px] px-[24px] border-b border-br-gray bg-white">
      <div className="w-full flex items-center justify-end gap-[28px]">
        <p className="flex items-center gap-[4px] text-[16px] text-gray font-medium">
          <UserIcon />
          {username}님 접속 중
        </p>
        <ul className="flex items-center">
          <li>
            <button type="button" className="text-[16px] text-gray font-medium">정보수정</button>
          </li>
          <li className="relative pl-[16px] before:content-[''] before:w-[1px] before:h-[10px] before:bg-br-gray2 before:absolute before:left-[8px] before:top-1/2 before:transform before:-translate-y-1/2">
            <button type="button" className="text-[16px] text-gray font-medium" onClick={logOut}>로그아웃</button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
