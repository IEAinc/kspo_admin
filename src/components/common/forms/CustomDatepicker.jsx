import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// 한국어 로케일 import
import { ko } from "date-fns/locale";

// 사용한 컴포넌트 모음
import TabRadioWrap from '../forms/TabRadioWrap.jsx';
// 사용한 이미지 모음
import CalendarIcon from '../../../assets/images/icon/ico_calendar.svg?react';

const CustomDatePicker = ({rangeOptions = [], options={},setDateRange,dateRange=[null,null]}) => {
  const {
    widthSize = 'full', // widthSize 추가 (기본값은 full)
    labelSize = 'full'
  } = options
  // 2. widthSize에 따라 Tailwind CSS 스타일 매핑
  // [인풋 사이즈]
  const widthClassMap = {
    lg: 'lg:w-[150px] w-full', // Large
    md: 'lg:w-[140px] w-full', // Medium
    sm: 'lg:w-[75px] w-full', // Small
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

  // 날짜 변경 처리: 무결성(logical integrity) 유지
  const handleStartDateChange = (date) => {
    // 시작 날짜가 종료 날짜를 초과하지 않도록 설정
    if (!endDate || date <= endDate) {
      setDateRange([date, endDate]);
    } else {
      // 시작 날짜가 종료 날짜보다 크다면 종료 날짜를 null 처리
      setDateRange([date, null]);
    }
  };

  const handleEndDateChange = (date) => {
    // 종료 날짜가 시작 날짜를 초과하도록 설정
    if (!startDate || date >= startDate) {
      setDateRange([startDate, date]);
    }
  };

  return (
    <div className={`
      flex
      flex-row
      flex-wrap
      w-full
      ${rangeOptions.length > 0 ? 'lg:w-full items-start' : 'lg:w-auto items-center'}
      lg:flex-row
    `}>
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
      <div className="flex gap-[12px] flex-wrap w-[calc(100%-50px)]">
        {/* 시작 날짜 선택 */}
        <div className={`${widthClass} relative  md:w-[calc(50%-18px)] sm:w-[calc(50%-18px)] w-full`}>
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={handleStartDateChange} // 시작 날짜 변경
            selectsStart
            startDate={startDate}
            endDate={endDate}
            maxDate={endDate} // 시작 날짜는 종료 날짜 이하만 가능
            isClearable
            showYearDropdown
            showMonthDropdown
            scrollableYearDropdown
            locale={ko} // 한국어 설정 추가
            placeholderText="시작 날짜"
            dateFormat="yyyy-MM-dd"
            autoComplete="off" // 자동 완성 방지
            renderCustomHeader={({
                                   date,
                                   changeYear,
                                   changeMonth,
                                   decreaseMonth,
                                   increaseMonth,
                                   prevMonthButtonDisabled,
                                   nextMonthButtonDisabled,
                                 }) => (
              <div
                className="flex items-center justify-between mb-2 px-2"
              >
                {/* 이전 달 버튼 */}
                <button
                  type="button"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className="text-gray-500 hover:text-black"
                >
                  {"<"}
                </button>

                {/* 연도 선택 */}
                <div>
                  <select
                    value={date.getFullYear()}
                    onChange={({ target: { value } }) => changeYear(parseInt(value))}
                    className="border border-gray-300 rounded px-2 py-[4px]"
                  >
                    {Array.from({ length: 20 }, (_, i) => {
                      const year = new Date().getFullYear() - 10 + i; // 현재 연도 기준 ±10년
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  <span className="mr-[8px] ml-[2px]">년</span>
                  {/* 월 선택 */}
                  <select
                    value={date.getMonth()}
                    onChange={({ target: { value } }) => changeMonth(parseInt(value))}
                    className="border border-gray-300 rounded px-2 py-[4px]"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>
                        {new Date(0, i).toLocaleString("default", { month: "long" })} {/* 월 이름 */}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 다음 달 버튼 */}
                <button
                  type="button"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className="text-gray-500 hover:text-black"
                >
                  {">"}
                </button>
              </div>
            )}
            className={`
            w-full
            h-[36px]
            rounded-[4px]
            text-[14px]
            text-black
            font-normal
            border
            border-br-gray
            border-solid
            p-[10px]
            focus:ring-blue-500
            focus:outline-none
            focus:ring-1 
          `}
          />
          <CalendarIcon className="absolute right-[9px] top-1/2 transform -translate-y-1/2 w-[16px] h-[16px] z-[0] pointer-events-none" />
        </div>
        ~
        {/* 종료 날짜 선택 */}
        <div className={`${widthClass} relative  md:w-[calc(50%-18px)] sm:w-[calc(50%-18px)] w-full`}>
          <DatePicker
            id="endDate"
            selected={endDate}
            onChange={handleEndDateChange} // 종료 날짜 변경
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate} // 종료 날짜는 시작 날짜 이상만 가능
            isClearable
            showYearDropdown
            showMonthDropdown
            scrollableYearDropdown
            locale={ko} // 한국어 설정 추가
            placeholderText="종료 날짜"
            dateFormat="yyyy-MM-dd"
            autoComplete="off" // 자동 완성 방지
            renderCustomHeader={({
                                   date,
                                   changeYear,
                                   changeMonth,
                                   decreaseMonth,
                                   increaseMonth,
                                   prevMonthButtonDisabled,
                                   nextMonthButtonDisabled,
                                 }) => (
              <div
                className="flex items-center justify-between mb-2 px-2"
              >
                {/* 이전 달 버튼 */}
                <button
                  type="button"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className="text-gray-500 hover:text-black"
                >
                  {"<"}
                </button>
                <div>
                  {/* 연도 선택 */}
                  <select
                    value={date.getFullYear()}
                    onChange={({ target: { value } }) => changeYear(parseInt(value))}
                    className="border border-gray-300 rounded  px-2 py-[4px]"
                  >
                    {Array.from({ length: 20 }, (_, i) => {
                      const year = new Date().getFullYear() - 10 + i; // 현재 연도 기준 ±10년
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  <span className="mr-[8px] ml-[2px]">년</span>
                  {/* 월 선택 */}
                  <select
                    value={date.getMonth()}
                    onChange={({ target: { value } }) => changeMonth(parseInt(value))}
                    className="border border-gray-300 rounded  px-2 py-[4px]"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>
                        {new Date(0, i).toLocaleString("default", { month: "long" })} {/* 월 이름 */}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 다음 달 버튼 */}
                <button
                  type="button"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className="text-gray-500 hover:text-black"
                >
                  {">"}
                </button>
              </div>
            )}
            className={`
            w-full
            h-[36px]
            rounded-[4px]
            text-[14px]
            text-black
            font-normal
            border
            border-br-gray
            border-solid
            p-[10px]
            focus:ring-blue-500
            focus:outline-none
            focus:ring-1 
          `}
          />
          <CalendarIcon className="absolute right-[9px] top-1/2 transform -translate-y-1/2 w-[16px] h-[16px] z-[0] pointer-events-none" />
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
    </div>
  );
};

export default CustomDatePicker;