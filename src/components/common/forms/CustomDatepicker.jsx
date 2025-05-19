import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// 사용한 컴포넌트 모음
import TabRadioWrap from '../forms/TabRadioWrap.jsx';
// 사용한 이미지 모음
import CalendarIcon from '../../../assets/images/icon/ico_calendar.svg?react';

const CustomDatePicker = ({rangeOptions = [], options={}}) => {
  const {
    widthSize = 'full', // widthSize 추가 (기본값은 full)
    labelSize = 'full'
  } = options
  // 2. widthSize에 따라 Tailwind CSS 스타일 매핑
  // [인풋 사이즈]
  const widthClassMap = {
    lg: 'lg:w-[300px] w-full', // Large
    md: 'lg:w-[228px] w-full', // Medium
    sm: 'lg:w-[150px] w-full', // Small
    full: 'w-full' // Full Width
  };
  const widthClass = widthClassMap[widthSize] || 'w-full'; // 기본값은 full

  // [라벨 사이즈]
  const labelClassMap = {
    lg: 'min-w-[74px]', // Large
    md: 'min-w-[62px]', // Medium
    sm: 'min-w-[50px]', // Small
    full: 'w-full' // Full Width
  };
  const labelClass = labelClassMap[labelSize] || 'sm'; // 기본값은 full

  // 시작 날짜와 종료 날짜 상태
  const [dateRange, setDateRange] = useState([null,null]); // Default 시작 날짜
  const [startDate, endDate] = dateRange; // Default 종료 날짜
  const [selectedRange, setSelectedRange] = useState(""); // 라디오 버튼 선택 값
  // const [rangeOptions, setRangeOptions] = useState(["오늘", "1주", "15일", "1개월", "3개월", "6개월", "1년"]); // 기본 옵션

  // 라디오 버튼 날짜 값을 설정하는 함수
  const handleRangeSelection = (range) => {
    const now = new Date();
    let newStartDate = null;
    let newEndDate = now;

    switch (range) {
      case "오늘":
        newStartDate = now;
        break;

      case "1주":
        newStartDate = new Date(now.setDate(now.getDate() - 7));
        newEndDate = new Date();
        break;

      case "15일":
        newStartDate = new Date(now.setDate(now.getDate() - 15));
        newEndDate = new Date();
        break;

      case "1개월":
        newStartDate = new Date(now.setMonth(now.getMonth() - 1));
        newEndDate = new Date();
        break;

      case "3개월":
        newStartDate = new Date(now.setMonth(now.getMonth() - 3));
        newEndDate = new Date();
        break;

      case "6개월":
        newStartDate = new Date(now.setMonth(now.getMonth() - 6));
        newEndDate = new Date();
        break;

      case "1년":
        newStartDate = new Date(now.setFullYear(now.getFullYear() - 1));
        newEndDate = new Date();
        break;

      default:
        break;
    }
    // Range 업데이트
    setDateRange([newStartDate, newEndDate]);
    setSelectedRange(range); // 현재 선택된 옵션 표시
  };

  // 사용자 정의로 날짜를 선택했을 때 라디오 버튼 선택을 초기화
  // Datepicker가 변경될 때 데이터 갱신
  const handleDateChange = (update) => {
    setDateRange(update);
    setSelectedRange(""); // 사용자가 직접 날짜를 선택하면 라디오 버튼 선택 해제
  };

  return (
    <div className={`
      flex
      flex-row
      items-center
      flex-wrap
      gap-[12px]
      w-full
      ${rangeOptions.length > 0 ? 'lg:w-full' : 'lg:w-auto'}
      lg:flex-row
    `}>
      <div className="relative w-full lg:w-auto flex items-center">
        <label
        className={`
          text-[14px]
          text-black
          font-bold
          ${labelClass}
        `}
        >
          기간
        </label>
        <div className={`${widthClass} w-full relative`}>
          <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          isClearable // Clear 버튼 활성화
          dateFormat="yyyy-MM-dd"
          placeholderText="시작 날짜 선택"
          className={`
            w-full
            h-[36px]
            rounded-[4px]
            text-[14px]
            text-black
            font-normal
            border
            border-br-gray
            p-[10px]
          `}
          />
          <CalendarIcon className='absolute right-[9px] top-1/2 transform -translate-y-1/2 w-[16px] h-[16px] z-[0] pointer-events-none'/>
        </div>
      </div>
      {/* TabRadioWrap 조건부 렌더링 */}
      {rangeOptions.length > 0 && (
        <TabRadioWrap
          options={rangeOptions} // 라디오 옵션 전달
          selectedValue={selectedRange} // 현재 선택된 값 전달
          onChange={handleRangeSelection} // 클릭 시 동작 전달
        />
      )}

    </div>
  );
};

export default CustomDatePicker;