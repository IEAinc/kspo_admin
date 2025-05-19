// 사용하는 이미지 모음
import Reset from '../../../assets/images/icon/ico_reset.svg?react'
import Excel from '../../../assets/images/icon/ico_excel.svg?react'
import SearchWhite from '../../../assets/images/icon/ico_search_color.svg?react'
import PlusWhite from '../../../assets/images/icon/ico_plus_color.svg?react'

const Btn = ({type = 'button', size, isFull,textColor, colorMode = false,  iconMode = '', minWidth, children, onClick,}) => {
  // 1. 사이즈 모음
  // 버튼 높이
  const sizeMap = {
    xxs: 'h-[28px] text-[14px]', // Extra Small
    xs: 'h-[32px]', // Extra Small
    sm: 'h-[36px]', // Small
    nm: 'h-[48px]', // Normal Medium
    md: 'h-[52px]', // Medium
    lg: 'h-[60px] text-[18px] font-bold', // Large
  };
  const height = sizeMap[size] || sizeMap.sm;
  // 버튼 패딩
  const paddingMap = {
    xxs: 'px-[8px] py-[5px]', // Extra Small
    xs: 'h-[32px] px-[8px] py-[8px]', // Extra Small
    sm: 'h-[36px] p-[10px]', // Small
    nm: 'h-[48px]', // Normal Medium
    md: 'h-[52px]', // Medium
    lg: 'h-[60px] text-[18px] font-bold',// Large
  }
  const padding = paddingMap[size] || paddingMap.sm;

  // 2-1. 글자색상 : textColor
  const color = textColor
    ? `${textColor}` // textColor가 있다면 우선적으로 사용
    : colorMode
      ? 'text-white' // colorMode가 true면 text-white
      : 'text-gray'; // 기본은 text-gray

  // 2-2. 배경색 : colorMode
  const bgColor = colorMode ? 'bg-primary-blue hover:bg-primary-blue-dark text-white font-medium border-primary-blue' : 'bg-white text-gray1 font-medium border-br-color hover:bg-black hover:bg-opacity-25'

  // 3. 버튼 너비 padding || full
  const width = isFull ? 'w-full' : `w-auto ${padding}`
  const minWidthSize = minWidth ? `${minWidth}` : ''

  // 4. 아이콘 로직: React 컴포넌트를 직접 불러오기
  let IconComponent = null;
  if (iconMode === 'reset') {
    IconComponent = Reset; // Reset SVG 컴포넌트
  } else if (iconMode === 'excel') {
    IconComponent = Excel; // Excel SVG 컴포넌트
  } else if (iconMode === 'search') {
    IconComponent = SearchWhite; // Search SVG 컴포넌트
  } else if (iconMode === 'plus') {
    IconComponent = PlusWhite;
  }

  return (
    <button
      type={type}
      className={`
        flex
        items-center
        justify-center
        rounded
        border
        ${color}
        ${width}
        ${height} 
        ${bgColor}
        transition-colors duration-200
      `}
      style={{ minWidth: minWidthSize }}
      onClick={onClick}
    >
      {/* 아이콘이 있으면 React 컴포넌트로 렌더링 */}
      {IconComponent && <IconComponent className="mr-[2px]" />}
      {children}
    </button>
  )
}
export default Btn