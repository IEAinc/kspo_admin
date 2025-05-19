// 사용한 컴포넌트 모음
import Btn from '../forms/Btn';
// 사용한 이미지 모음
import WarnIcon from '../../../assets/images/icon/ico_exclamation.svg?react';
import CompleteIcon from '../../../assets/images/icon/ico_complete.svg?react';
import CancelIcon from '../../../assets/images/icon/ico_cancel.svg?react';
import React from "react";
const CustomAlert = ({
                       title='경고',
                       iconMode='warn',
                       message='',
                       onClose,
                       isOpen = true,
                       confirmButton = false, // 확인 버튼 설정
                       cancelButton = false,  // 취소 버튼 설정
                       onConfirm,
                       onCancel
                     }) => {
  // 1. 아이콘 로직: React 컴포넌트를 직접 불러오기
  let IconComponent = null;
  if (iconMode === 'warn') {
    IconComponent = WarnIcon; // Reset SVG 컴포넌트
  } else if (iconMode === 'complete') {
    IconComponent = CompleteIcon; // Excel SVG 컴포넌트
  } else if (iconMode === 'cancel') {
    IconComponent = CancelIcon; // Search SVG 컴포넌트
  }

  // 2. 모달 상태에 따른 클래스 처리
  const modalVisibility = isOpen ? 'opacity-100 visible' : 'opacity-0 invisible';

  // 3. 배경 클릭 핸들러: 외부 클릭으로 모달 닫기
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose(); // isOpen 상태를 false로 업데이트
    }
  };

  return (
    <div
    className={`
      fixed
      top-0
      left-0
      w-full
      min-h-[100vh]
      bg-black
      bg-opacity-[0.25]
      z-[100002]
      ${modalVisibility}
    `}
    onClick={handleBackgroundClick}
    >
      <div className={`
        w-full
        max-w-[400px]
        rounded-[8px]
        py-[24px]
        px-[28px]
        bg-white
        absolute
        left-1/2
        top-1/2
        transform
        translate-x-[-50%]
        translate-y-[-50%]
      `}>
        <div className="flex items-center gap-[3px] mb-[16px]">
          {IconComponent && <IconComponent className="mr-[2px] w-[16px] h-[16px]" />}
          <span className="text-[20px] font-bold text-black">{title}</span>
        </div>
        <div className="text-[16px] font-medium text-gray1">
          {message}
        </div>
        {(confirmButton || cancelButton) && (
          <div className="flex items-center justify-end gap-[8px] mt-[20px]">
            {/* 확인 버튼 렌더링 */}
            {confirmButton && (
              <Btn
                size="sm"
                minWidth="80px"
                colorMode={confirmButton.colorMode || true}
                onClick={() => {
                  if (onConfirm) {
                    onConfirm(); // 상위 컴포넌트의 기능 실행
                  }
                }}
              >
                {confirmButton.text || '확인'}
              </Btn>
            )}
            {/* 취소 버튼 렌더링 */}
            {cancelButton && (
              <Btn
                size="sm"
                minWidth="80px"
                colorMode={cancelButton.colorMode || false}
                onClick={() => {
                  if (onCancel) {
                    onCancel(); // 상위 컴포넌트의 기능 실행
                  } else if (onClose) {
                    onClose(); // 취소는 기본적으로 모달 닫기
                  }
                }}
              >
                {cancelButton.text || '취소'}
              </Btn>
            )}

          </div>
        )}
      </div>
    </div>
  )
}
export default CustomAlert