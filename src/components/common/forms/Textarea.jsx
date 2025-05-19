import React from 'react';

const Textarea = ({
                    label = "",
                    value = "",
                    onChange,
                    placeholder = "내용을 입력하세요",
                    name = "",
                    error = "",
                    disabled = false,
                    maxLength = 1000,
                    rows = 4, // 기본 줄 수
                    autoResize = false, // 자동 크기 조절 여부
                  }) => {
  // 텍스트 크기 자동 조절
  const handleInput = (e) => {
    if (autoResize) {
      e.target.style.height = "auto"; // 높이 초기화
      e.target.style.height = `${e.target.scrollHeight}px`; // 새로운 높이 설정
    }
    if (onChange) onChange(e); // 부모로 전달된 onChange 실행
  };

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="text-[14px] text-black font-bold text-left lg:text-center"
        >
          {label}
        </label>
      )}

      {/* Textarea Field */}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={handleInput}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        rows={rows}
        className={`
          w-full
          p-[10px]
          border
          border-br-gray
          rounded-[4px]
          text-black
          font-regular
          text-[14px]
          resize-none
          focus:outline-none
          focus:ring-1
          focus:ring-blue-500
          ${
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          }
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
        style={{ overflowY: "hidden" }} // 자동 리사이징 시 스크롤 제거
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-[12px] text-left mt-1">{error}</p>}
    </div>
  );
};

export default Textarea;