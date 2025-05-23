import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// 사용한 컴포넌트 모음
import Box from '../../components/common/boxs/Box'
import Btn from '../../components/common/forms/Btn'
import Input from '../../components/common/forms/Input'
import Textarea from '../../components/common/forms/Textarea.jsx'
import Select from "../../components/common/forms/Select.jsx";
import { API_ENDPOINTS ,api} from '../../constants/api'
const DetailCardSatisfactionManagement = () => {
  const navigate = useNavigate();
  const location= useLocation();
  const [detailData, setDetailData] = useState({});
  // 버튼 클릭 핸들러
  const goBack = () => {
    navigate('/satisfactionManagement/satisfactionManagement'); // 히스토리 스택에서 한 단계 뒤로 이동
  };
  // 날짜 포맷
  const timeFormat=(timestamp)=>{
    const date = new Date(timestamp);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    const formatted = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
    return formatted;
  }
  useEffect(()=>{
    const loadData= async ()=>{
      try {
        
        const response = await api.post(API_ENDPOINTS.SatisDetail, {
         id:location.state.id
        });
        response.data.created=timeFormat(response.data.created)
        setDetailData(response.data)
      }catch(e){
        console.log(e)
      }
    }
    loadData();
  },[])

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
            {detailData.created}
          </div>
        </div>
        {/* 센터명 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          센터명
        </div>
        <div className="p-4 col-span-7 border-b border-tb-br-color">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
          {detailData.company}
          </div>
        </div>
        {/* 질문 내용*/}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
        질문 내용
        </div>
        <div className="p-4 col-span-7 border-b border-tb-br-color">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
          {detailData.name}
          </div>
        </div>
        {/* 답변 내용*/}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          답변 내용
        </div>
        <div className="py-[6px] px-[8px] col-span-7 border-b border-tb-br-color">
          <div className="min-h-[132px] col-span-7 text-[14px] text-black font-normal whitespace-pre-line">
          {detailData.answer}
          </div>
        </div>
        {/* 점수 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          점수
        </div>
        <div className="p-4 col-span-7 border-b border-tb-br-color">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
          {detailData.point}
          </div>
        </div>
        {/* 피드백 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          피드백
        </div>
        <div className="py-[6px] px-[8px] col-span-7 border-b border-tb-br-color">
          <div className="min-h-[132px] col-span-7 text-[14px] text-black font-normal whitespace-pre-line">
          {detailData.comment}
          </div>
        </div>
        {/* IP */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-tb-br-color">
          IP
        </div>
        <div className="p-4 col-span-7 border-tb-br-color">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
          {detailData.ip}
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