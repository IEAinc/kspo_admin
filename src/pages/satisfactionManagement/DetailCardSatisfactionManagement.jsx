import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// 사용한 컴포넌트 모음
import Box from '../../components/common/boxs/Box'
import Btn from '../../components/common/forms/Btn'
import Input from '../../components/common/forms/Input'
import Textarea from '../../components/common/forms/Textarea.jsx'
import Select from "../../components/common/forms/Select.jsx";
const DetailCardSatisfactionManagement = () => {
  const navigate = useNavigate();
  // 버튼 클릭 핸들러
  const goBack = () => {
    navigate(-1); // 히스토리 스택에서 한 단계 뒤로 이동
  };

  return (
    <Box padding={{ px: 16, py: 16 }}>
      {/* 카드 (필터 영역) */}
      <div className="grid grid-cols-8 border border-tb-br-color rounded-[4px]">
        {/* 날짜 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          날짜
        </div>
        <div className="p-4 col-span-7 border-b border-tb-br-color">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
            2025-04-21 18:11:00
          </div>
        </div>
        {/* 센터명 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          센터명
        </div>
        <div className="p-4 col-span-7 border-b border-tb-br-color">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
            올림픽공원스포츠센터
          </div>
        </div>
        {/* 질문 내용 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          질문 내용
        </div>
        <div className="py-[6px] px-[8px] col-span-7 border-b border-tb-br-color">
          <div className="min-h-[132px] col-span-7 text-[14px] text-black font-normal whitespace-pre-line">
            {`◼ 월 회원 1인 1차량에 \n한하여 등록 가능합니다.`}
          </div>
        </div>
        {/* 점수 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          점수
        </div>
        <div className="p-4 col-span-7 border-b border-tb-br-color">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
            4
          </div>
        </div>
        {/* 피드백 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          피드백
        </div>
        <div className="py-[6px] px-[8px] col-span-7 border-b border-tb-br-color">
          <div className="min-h-[132px] col-span-7 text-[14px] text-black font-normal whitespace-pre-line">
            {`피드백 내용`}
          </div>
        </div>
        {/* IP */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-tb-br-color">
          IP
        </div>
        <div className="p-4 col-span-7 border-tb-br-color">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
            121.133.89.66
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex items-center justify-end gap-[8px] mt-[8px]">
        <Btn
          size="sm"
          minWidth="80px"
          onClick={goBack}
        >
          목록
        </Btn>
      </div>
    </Box>
  )
}
export default DetailCardSatisfactionManagement;