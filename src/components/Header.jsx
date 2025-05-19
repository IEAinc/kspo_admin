import { Link } from 'react-router-dom'
// 이미지 모음
import UserIcon from '../assets/images/icon/ico_userImage.svg?react'
const Header = () => {
  return (
    <header className="w-[calc(100%-220px)] h-[48px] flex items-center fixed top-0 left-[220px] py-[15px] px-[24px] border-b border-br-gray bg-white">
      <div className="w-full flex items-center justify-end gap-[28px]">
        <p className="flex items-center gap-[4px] text-[16px] text-gray font-medium">
          <UserIcon />
          홍길동님 접속 중
        </p>
        <ul className="flex items-center">
          <li>
            <button type="button" className="text-[16px] text-gray font-medium">정보수정</button>
          </li>
          <li className="relative pl-[16px] before:content-[''] before:w-[1px] before:h-[10px] before:bg-br-gray2 before:absolute before:left-[8px] before:top-1/2 before:transform before:-translate-y-1/2">
            <button type="button" className="text-[16px] text-gray font-medium">로그아웃</button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
