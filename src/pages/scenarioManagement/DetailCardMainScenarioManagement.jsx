import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// 사용한 컴포넌트 모음
import Box from '../../components/common/boxs/Box'
import Btn from '../../components/common/forms/Btn'
import Input from '../../components/common/forms/Input'
import Textarea from '../../components/common/forms/Textarea.jsx'
import Select from "../../components/common/forms/Select.jsx";
const DetailCardMainScenarioManagement = () => {
  const navigate = useNavigate();
  // 버튼 클릭 핸들러
  const goBack = () => {
    navigate(-1); // 히스토리 스택에서 한 단계 뒤로 이동
  };
  const handleEditClick = () => {
    navigate("scenarioManagement/mainScenarioManagement/detail/edit:id"); // 경로로 이동
  };

  // 버튼 항목 리스트
  const [btnList, setBtnList] = useState([
    {
      name: '버튼f1',
      btnType:'웹링크',
      btnName:'약도 및 대중교통',
      btnDetail:'올림픽공원스포츠센터'
    },
    {
      name: '버튼2',
      btnType:'웹링크',
      btnName:'약도 및 대중교통',
      btnDetail:'올림픽공원스포츠센터'
    },
    {
      name: '버튼3',
      btnType:'웹링크',
      btnName:'약도 및 대중교통',
      btnDetail:'올림픽공원스포츠센터'
    },
    {
      name: '버튼4',
      btnType:'웹링크',
      btnName:'약도 및 대중교통',
      btnDetail:'올림픽공원스포츠센터'
    },
    {
      name: '버튼5',
      btnType:'웹링크',
      btnName:'약도 및 대중교통',
      btnDetail:'올림픽공원스포츠센터'
    },
    {
      name: '버튼6',
      btnType:'웹링크',
      btnName:'약도 및 대중교통',
      btnDetail:'올림픽공원스포츠센터'
    },
    {
      name: '버튼7',
      btnType:'웹링크',
      btnName:'약도 및 대중교통',
      btnDetail:'올림픽공원스포츠센터'
    },
  ]);

  return (
    <Box padding={{ px: 16, py: 16 }}>
      {/* 카드 (필터 영역) */}
      <div className="grid grid-cols-8 border border-tb-br-color rounded-[4px]">
        {/* 센터명 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          센터명
        </div>
        <div className="p-4 col-span-7 border-b border-tb-br-color">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
            올림픽공원스포츠센터
          </div>
        </div>
        {/* 대화명 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          대화명
        </div>
        <div className="p-4 col-span-7 border-b border-tb-br-color">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
            차량 안내
          </div>
        </div>
        {/* 답변 내용 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          답변 내용
        </div>
        <div className="py-[6px] px-[8px] col-span-7 border-b border-tb-br-color text-[14px] text-black font-normal whitespace-pre-line">
          {`◼ 월 회원 1인 1차량에 한하여 등록 가능합니다.
둘
셋
넷
다섯
여섯
일곱
여덟
아홉
열
하나
둘
셋
넷
다섯
여섯
일곱
여덟
아홉
열`}
        </div>

        {/* 버튼 구성 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r  border-tb-br-color">
          버튼 구성
        </div>
        <div className="col-span-7  border-tb-br-color">
          <div className="px-[8px] py-[6px] col-span-3 border-tb-br-color">
            <div className="flex items-center h-full text-black text-[14px] font-normal">
              {/* 버튼 구성 항목 */}
              <div className="w-full grid grid-cols-12 border border-tb-br-color rounded-[4px]">
                {/* 구분 */}
                <div className="col-span-2 p-[15px] flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
                  구분
                </div>
                {/* 버튼 유형 */}
                <div className="col-span-3 p-[15px] flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
                  버튼유형
                </div>
                {/* 버튼명 */}
                <div className="col-span-3 p-[15px] flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
                  버튼명
                </div>
                {/* 버튼상세 */}
                <div className="col-span-4 p-[15px] flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
                  버튼상세
                </div>

                {/* 렌더링 되는 곳 */}
                <div className="col-span-12">
                  {/* 버튼 목록 렌더링 */}
                  <div className="grid grid-cols-12">
                    {btnList.map((item, index) => {
                      const isLast = index === btnList.length - 1; // 마지막인지 확인
                      const borderClass = isLast ? '' : 'border-b'; // 마지막 요소는 border 제거

                      return (
                        <React.Fragment key={index}>
                          {/* 첫 번째 컬럼: 버튼 이름 */}
                          <div
                            className={`col-span-2 p-[15px] flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r ${borderClass} border-tb-br-color`}
                          >
                            {item.name}
                          </div>

                          {/* 두 번째 컬럼: Select */}
                          <div
                            className={`col-span-3 px-[8px] py-[6px] flex items-center justify-start text-[14px] font-medium text-black bg-white border-r ${borderClass} border-tb-br-color`}
                          >
                            {item.btnType}
                          </div>

                          {/* 세 번째 컬럼: Input */}
                          <div
                            className={`col-span-3 px-[8px] py-[6px] flex items-center justify-start text-[14px] font-medium text-black bg-white border-r ${borderClass} border-tb-br-color`}
                          >
                            {item.btnName}
                          </div>

                          {/* 네 번째 컬럼: Detail Input */}
                          <div
                            className={`col-span-4 px-[8px] py-[6px]] flex items-center justify-start text-[14px] font-medium text-black bg-white ${borderClass} border-tb-br-color`}
                          >
                            {item.btnDetail}
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
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
        <Btn
          size="sm"
          minWidth="80px"
          colorMode={true}
          onClick={handleEditClick}
        >
          수정
        </Btn>
      </div>
    </Box>
  )
}
export default DetailCardMainScenarioManagement;