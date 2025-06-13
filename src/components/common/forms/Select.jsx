import { useState, useRef, useEffect } from 'react';
import SelectArrow from '../../../assets/images/icon/ico_select_arrow.svg?react';

const Select = ({ label, size, value, onChange, options, openDirection = "bottom", uiOptions={} }) => {
  const {
    widthSize = 'full', // widthSize 추가 (기본값은 full)
    labelSize = 'full',
    fixedFull = false,
    noTransformed  = false
  } = uiOptions;

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null); // 드롭다운 감지용 ref

  // 1. 사이즈
  const sizeMap = {
    xs: 'h-[32px] py-[7px] px-[10px]',
    sm: 'h-[36px] py-[9px] px-[10px]',
  };
  const height = sizeMap[size] || sizeMap.sm;

  // [인풋 사이즈]
  const widthClassMap = {
    lg: 'lg:w-[300px]', // Large
    md: 'lg:w-[180px]', // Medium
    sm: 'lg:w-[150px]', // Small
    full: 'w-full' // Full Width
  };
  const widthClass = widthClassMap[widthSize] || 'w-full'; // 기본값은 full

  // [라벨 사이즈]
  const labelClassMap = {
    lg: 'min-w-[74px]', // Large
    md: 'lg:min-w-[62px]', // Medium
    sm: 'lg:min-w-[50px]', // Small
    full: 'w-full' // Full Width
  };
  const labelClass = labelClassMap[labelSize] || 'sm'; // 기본값은 full


  // 현재 선택된 옵션 찾기
  const currentOption = options.find(option => option.value === value?.value) || {};
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={`
        flex
        items-center
        justify-start
        w-full
        ${noTransformed && widthSize === 'full' ? 'md:w-full lg:w-full' : 'md:w-[calc(50%-10px)]'}
        ${fixedFull ? 'lg:w-full' : (label && widthSize === 'full' ? 'lg:w-full' : 'lg:w-auto')}
      `}
    >
      {label && (
        <label
          className={`
          text-[14px] font-bold text-black min-w-[50px] 
          ${labelClass}
        `}
        >
          {label}
        </label>
      )}
      <div ref={ref} className={`relative w-full`}>
        {/* 셀렉트 버튼 */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)} // 드롭다운 열고 닫기
          className={`
          w-full
          ${widthClass === 'full' ? 'lg:w-full bg-primary-blue': `${widthClass}`}
          ${height}
          flex
          justify-between
          items-center
          gap-[4px]
          border
          border-br-gray
          rounded-[4px]
          focus:outline-none
          focus:ring-1
          focus:ring-blue-500
          border-solid
    
          `}
        >
          <span className="text-[14px] text-black font-normal overflow-hidden whitespace-nowrap">
            {currentOption.label || '선택하세요'} {/* 선택된 옵션의 텍스트 */}
          </span>
          <SelectArrow />
        </button>

        {/* 드롭다운 목록 */}
        {isOpen && (
          <ul
            className={`absolute w-full border border-gray-200 rounded bg-white shadow-md z-50 overflow-y-auto max-h-[500px] ${
              openDirection === "top" ? "bottom-full mb-1" : "top-full mt-1"
            }`}
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={`p-2 cursor-pointer ${
                  value === option.value ? "bg-[#E0ECE9]" : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  onChange(option); // 선택된 옵션의 value 전달
                  setIsOpen(false); // 드롭다운 닫기
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;