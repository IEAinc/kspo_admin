import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// 사용한 컴포넌트 모음
import Box from '../../components/common/boxs/Box'
import Btn from '../../components/common/forms/Btn'
import { API_ENDPOINTS,api } from '../../constants/api'
const DetailMainScenarioHistory = () => {
  const navigate = useNavigate();
  const location=useLocation();
  // 버튼 클릭 핸들러
  const goBack = () => {
    navigate(location.state.type==='FAQ'?`/ksponcoadministrator/faqModificationHistory/mainScenarioHistory`:`/ksponcoadministrator/historyManagement/mainScenarioHistory`, {state:{
      type:location.state.type,
    }});
  };
  const [fixData,setFixData]=useState([{
    main_question:"1",
    name:"1",
    answer:"1",
  },{
    main_question:"2",
    name:"2",
    answer:"2",
  }])
  useEffect(()=>{
const loadData = async () => {
      //수정시 초기 데이터 설정
      const response = await api.post(API_ENDPOINTS.ScenarioHistoryDetail, {
        id:location.state.id
      });
      let data=response.data
      console.log(data)


      if(data.btn_type){
        btnList[0].btnType=data.btn_type;
      }
      if(data.btn_name){
        btnList[0].btnName=data.btn_name.split("**")[0];
        btnList[0].btnDetail=data.btn_name.split("**")[1]?data.btn_name.split("**")[1]:null;
      }
      for(let i=0;i<=7;i++){
        if(data["btn_type"+i]){
          btnList[i].btnType=data["btn_type"+i];
        }
        if(data["btn_name"+i]){
          btnList[i].btnName=data["btn_name"+i].split("**")[0];
          btnList[i].btnDetail=data["btn_name"+i].split("**")[1]?data["btn_name"+i].split("**")[1]:null;
        }
      }
    };
    
    loadData();
  },[location.pathname])

  // 버튼 항목 리스트
  const btnList = [
    {
      name: '버튼1',
      type: '웹링크',
      btnName: '버튼명',
      btnDetail: '버튼상세',
    },
    {
      name: '버튼2',
      type: '웹링크',
      btnName: '버튼명',
      btnDetail: '버튼상세',
    },
    {
      name: '버튼3',
      type: '웹링크',
      btnName: '버튼명',
      btnDetail: '버튼상세',
    },
    {
      name: '버튼4',
      type: '웹링크',
      btnName: '버튼명',
      btnDetail: '버튼상세',
    },
    {
      name: '버튼5',
      type: '웹링크',
      btnName: '버튼명',
      btnDetail: '버튼상세',
    },
    {
      name: '버튼6',
      type: '웹링크',
      btnName: '버튼명',
      btnDetail: '버튼상세',
    },
    {
      name: '버튼7',
      type: '대화연결',
      btnName: '버튼명',
      btnDetail: '버튼상세',
    }
  ]
  const btnList2 = [
    {
      name: '버튼1',
      type: '웹링크',
      btnName: '버튼명',
      btnDetail: '버튼상세',
    },
    {
      name: '버튼2',
      type: '웹링크',
      btnName: '버튼명',
      btnDetail: '버튼상세',
    },
    {
      name: '버튼3',
      type: '웹링크',
      btnName: '버튼명',
      btnDetail: '버튼상세',
    },
    {
      name: '버튼4',
      type: '웹링크',
      btnName: '버튼명',
      btnDetail: '버튼상세',
    },
    {
      name: '버튼5',
      type: '웹링크',
      btnName: '버튼명',
      btnDetail: '버튼상세',
    },
    {
      name: '버튼6',
      type: '웹링크',
      btnName: '버튼명',
      btnDetail: '버튼상세',
    },
    {
      name: '버튼7',
      type: '대화연결',
      btnName: '버튼명',
      btnDetail: '버튼상세',
    }
  ]

  return (
    <Box padding={{ px: 16, py: 16 }}>
      {/* 카드 (필터 영역) */}
      <div className="grid grid-cols-8 border border-tb-br-color rounded-[4px]">
        {/* 센터명 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          센터명
        </div>
        <div className="p-4 col-span-3 border-b border-tb-br-color">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
            {fixData[1].comapny}
          </div>
        </div>
        {/* 수정자명 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-l border-b border-tb-br-color">
          아이디
        </div>
        <div className="p-4 col-span-3 border-b border-tb-br-color ">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
          {fixData[1].creater}
          </div>
        </div>
        {/* 수정유형 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-tb-br-color">
          수정유형
        </div>
        <div className="p-4 col-span-3 border-tb-br-color">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
          {fixData[1].change_type}
          </div>
        </div>
        {/* 수정일시 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-l border-tb-br-color">
          수정일시
        </div>
        <div className="p-4 col-span-3 border-tb-br-color ">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
          {fixData[1].created}
          </div>
        </div>


      </div>

      <div className="grid grid-cols-8 border border-tb-br-color rounded-[4px] mt-[8px]">
        <div className=" col-span-8 p-4 border-b border-tb-br-color bg-tb-bg-color text-[14px] text-gray1 font-bold flex items-center justify-center">
          수정내역 상세정보
        </div>
        {/* 수정 전 */}
        <div className="col-span-4 p-[8px] border-r border-tb-br-color">
          <p className="text-[16px] text-gray1 font-bold mb-[8px]">수정 전</p>
          {/* 수정전 그리드 */}
          <div className="grid grid-cols-4 border border-tb-br-color rounded-[4px]">
            {/* 센터명 */}
            <div className="col-span-1 flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
              센터명
            </div>
            <div className="p-4 col-span-3 border-b border-tb-br-color">
              <div className="flex items-center h-full text-black text-[14px] font-normal">
              {fixData[0].company}
              </div>
            </div>
            {/* 대화명 */}
            <div className="col-span-1 flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
              대화명
            </div>
            <div className="p-4 col-span-3 border-b border-tb-br-color">
              <div className="flex items-center h-full text-black text-[14px] font-normal">
              {fixData[0].name}
              </div>
            </div>
            {/* 답변 내용 */}
            <div className="col-span-1 flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
              답변 내용
            </div>
            <div className="p-4 col-span-3 border-b border-tb-br-color">
              <div className="flex items-start h-full min-h-[132px] text-black text-[14px] font-normal">
              {fixData[0].answer}
              </div>
            </div>
            {/* 버튼 구성 */}
            <div className="col-span-1 flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-tb-br-color">
              버튼 구성
            </div>
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
                    <div className="grid grid-cols-12">
                      {btnList.map((item, index) => {
                        const isLast = index === btnList.length - 1;
                        const borderClass = isLast ? '' : 'border-b';

                        return (
                          <React.Fragment key={index}>
                            <div className={`col-span-2 p-[15px] flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r ${borderClass} border-tb-br-color`}>
                              {item.name}
                            </div>
                            <div className={`col-span-3 p-[15px] flex items-center justify-start text-[14px] font-medium text-black bg-white border-r ${borderClass} border-tb-br-color`}>
                              {item.type}
                            </div>
                            <div className={`col-span-3 p-[15px] flex items-center justify-start text-[14px] font-medium text-black bg-white border-r ${borderClass} border-tb-br-color`}>
                              {item.btnName}
                            </div>
                            <div className={`col-span-4 p-[15px] flex items-center justify-start text-[14px] font-medium text-black bg-white ${borderClass} border-tb-br-color`}>
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
        {/* 수정 후 */}
        <div className="col-span-4 p-[8px] ">
          <p className="text-[16px] text-gray1 font-bold mb-[8px]">수정 후</p>
          {/* 수정 후 그리드 */}
          <div className="grid grid-cols-4 border border-tb-br-color rounded-[4px]">
            {/* 센터명 */}
            <div className="col-span-1 flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
              센터명
            </div>
            <div className="p-4 col-span-3 border-b border-tb-br-color">
              <div className="flex items-center h-full text-black text-[14px] font-normal">
              {fixData[1].company}
              </div>
            </div>
            {/* 대화명 */}
            <div className="col-span-1 flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
              대화명
            </div>
            <div className="p-4 col-span-3 border-b border-tb-br-color">
              <div className="flex items-center h-full text-black text-[14px] font-normal">
              {fixData[1].name}
              </div>
            </div>
            {/* 답변 내용 */}
            <div className="col-span-1 flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
              답변 내용
            </div>
            <div className="p-4 col-span-3 border-b border-tb-br-color">
              <div className="flex items-start h-full min-h-[132px] text-black text-[14px] font-normal">
              {fixData[1].answer}
              </div>
            </div>
            {/* 버튼 구성 */}
            <div className="col-span-1 flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-tb-br-color">
              버튼 구성
            </div>
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
                    <div className="grid grid-cols-12">
                      {btnList2.map((item, index) => {
                        const isLast = index === btnList.length - 1;
                        const borderClass = isLast ? '' : 'border-b';

                        return (
                          <React.Fragment key={index}>
                            <div className={`col-span-2 p-[15px] flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r ${borderClass} border-tb-br-color`}>
                              {item.name}
                            </div>
                            <div className={`col-span-3 p-[15px] flex items-center justify-start text-[14px] font-medium text-black bg-white border-r ${borderClass} border-tb-br-color`}>
                              {item.type}
                            </div>
                            <div className={`col-span-3 p-[15px] flex items-center justify-start text-[14px] font-medium text-black bg-white border-r ${borderClass} border-tb-br-color`}>
                              {item.btnName}
                            </div>
                            <div className={`col-span-4 p-[15px] flex items-center justify-start text-[14px] font-medium text-black bg-white ${borderClass} border-tb-br-color`}>
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
      </div>

      {/* 버튼 */}
      <div className="flex items-center justify-end mt-[8px]">
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
export default DetailMainScenarioHistory;