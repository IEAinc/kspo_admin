import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
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
  /* 1. 상단 */
  // 센터명
  const [centerName, setCenterName] = useState("");
  // id
  const [userId, setUserId] = useState("");
  // 수정유형
  const [editType, setEditType] = useState("");
  // 수정일시
  const [editDate, setEditDate] = useState("");
  /* 2-1. 수정전 */
  /* 센터명 */
  const [beforeCenterName, setBeforeCenterName] = useState("");
  /* 대화명 */
  const [beforeDialogName, setBeforeDialogName] = useState("");
  /* 답변내용 */
  const [beforeDialogAnswer, setBeforeDialogAnswer] = useState("");
  /* 버튼구성 */
  const [beforeButtons, setBeforeButtons] = useState([]);
  /* 2-1. 수정후 */
  /* 센터명 */
  const [afterCenterName, setAfterCenterName] = useState("");
  /* 대화명 */
  const [afterDialogName, setAfterDialogName] = useState("");
  /* 답변내용 */
  const [afterDialogAnswer, setAfterDialogAnswer] = useState("");
  /* 버튼구성 */
  const [afterButtons, setAfterButtons] = useState([]);
  //대표 질문
  const [beforeMainAnswer,setBeforeMainAnswer]=useState(""); 
  const [afterMainAnswer,setAfterMainAnswer]=useState(""); 
  /*----------------------------*/
  const extractBtnListFromItem = (data) => {
    const btnList = [];

    for (let i = 1; i <= 7; i++) {
      const isPlain = i === 1 && data.hasOwnProperty('btn_type') && !data.hasOwnProperty('btn_type1');

      const btnTypeKey = isPlain ? 'btn_type' : `btn_type${i}`;
      const btnNameKey = isPlain ? 'btn_name' : `btn_name${i}`;

      const rawBtnName = data[btnNameKey] || '';
      const [btnName, btnDetail] = rawBtnName.split('**');

      btnList.push({
        name: `버튼${i}`,
        btnType: data[btnTypeKey] || null,
        btnName: btnName || null,
        btnDetail: btnDetail || null,
      });
    }

    return btnList;
  };



  useEffect(()=>{
   
    const loadData = async () => {
      //수정시 초기 데이터 설정
      const response = await api.post(API_ENDPOINTS.ScenarioHistoryDetail, {
        id:location.state.id
      });
      let data=response.data.data
      if(response.data.data.length>1){
      setCenterName(data[1].company);
      setUserId(data[1].creater);
      setEditType(data[1].change_type);
      setEditDate(format(parseISO(data[1].created), 'yyyy-MM-dd HH:mm:ss'))
      setAfterCenterName(data[1].company)
      setAfterDialogName(data[1].name)
      setAfterDialogAnswer(data[1].answer)
      setAfterButtons(extractBtnListFromItem(data[1]));
      setAfterMainAnswer(data[1].main_question)
      
      setBeforeCenterName(data[0].company)
      setBeforeDialogName(data[0].name)
      setBeforeDialogAnswer(data[0].answer)
      setBeforeMainAnswer(data[0].main_question)
      setBeforeButtons(extractBtnListFromItem(data[0]));
      }else{
        setCenterName(data[0].company);
        setUserId(data[0].creater);
        setEditType(data[0].change_type);
        setEditDate(format(parseISO(data[0].created), 'yyyy-MM-dd HH:mm:ss'))
        setAfterCenterName(data[0].company)
        setAfterDialogName(data[0].name)
        setAfterDialogAnswer(data[0].answer)
        setAfterMainAnswer(data[0].main_question)
        setAfterButtons(extractBtnListFromItem(data[0]));
        setBeforeButtons(extractBtnListFromItem({}));
      }
      
    };
    loadData();
  },[location.pathname])

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
            {centerName}
          </div>
        </div>
        {/* 수정자명 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-l border-b border-tb-br-color">
          수정자명
        </div>
        <div className="p-4 col-span-3 border-b border-tb-br-color ">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
          {userId}
          </div>
        </div>
        {/* 수정유형 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-tb-br-color">
          수정유형
        </div>
        <div className="p-4 col-span-3 border-tb-br-color">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
          {editType}
          </div>
        </div>
        {/* 수정일시 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-l border-tb-br-color">
          수정일시
        </div>
        <div className="p-4 col-span-3 border-tb-br-color ">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
          {editDate}
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
            <div className="col-span-1 flex items-center justify-center text-[14px] min-h-[54px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
              센터명
            </div>
            <div className="p-4 col-span-3 border-b border-tb-br-color">
              <div className="flex items-center h-full text-black text-[14px] font-normal">
              {beforeCenterName}
              </div>
            </div>
            {/* 대화명 */}
            <div className="col-span-1 flex items-center justify-center text-[14px] min-h-[54px]  font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
              대화명
            </div>
            <div className="p-4 col-span-3 border-b border-tb-br-color">
              <div className="flex items-center h-full text-black text-[14px] font-normal">
              {beforeDialogName}
              </div>
            </div>
             {/* 대표 질문 */}
           {  location.state.type==='FAQ'?<> <div className="col-span-1 flex items-center justify-center text-[14px] min-h-[54px]  font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
            대표 질문
            </div>
            <div className="p-4 col-span-3 border-b border-tb-br-color">
              <div className="flex items-center h-full text-black text-[14px] font-normal">
              {beforeMainAnswer}
              </div>
            </div></>:<></>}
            {/* 답변 내용 */}
            <div className="col-span-1 flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color ">
              답변 내용
            </div>
            
            <div className="p-4 col-span-3 border-b border-tb-br-color">
              <div className="flex items-start h-full min-h-[132px] text-black text-[14px] font-normal whitespace-pre-line">
              {beforeDialogAnswer}
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
                      {beforeButtons.length > 0 && beforeButtons.map((item, index) => {
                        const isLast = index === beforeButtons.length - 1;
                        const borderClass = isLast ? '' : 'border-b';

                        return (
                          <React.Fragment key={index}>
                            <div className={`col-span-2 py-[15px] px-[8px] flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r ${borderClass} border-tb-br-color`}>
                              {item.name}
                            </div>
                            <div className={`col-span-3 p-[15px] flex items-center justify-start text-[14px] font-medium text-black bg-white border-r ${borderClass} border-tb-br-color`}>
                              {item.btnType}
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
            <div className="col-span-1 flex items-center justify-center text-[14px] min-h-[54px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
              센터명
            </div>
            <div className="p-4 col-span-3 border-b border-tb-br-color">
              <div className="flex items-center h-full text-black text-[14px] font-normal">
              {afterCenterName}
              </div>
            </div>
            {/* 대화명 */}
            <div className="col-span-1 flex items-center justify-center text-[14px] min-h-[54px]  font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
              대화명
            </div>
            <div className="p-4 col-span-3 border-b border-tb-br-color">
              <div className="flex items-center h-full text-black text-[14px] font-normal">
              {afterDialogName}
              </div>
            </div>
             {/* 대표 질문 */}
           {  location.state.type==='FAQ'?<><div className="col-span-1 flex items-center justify-center text-[14px] min-h-[54px]  font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
            대표 질문
            </div>
            <div className="p-4 col-span-3 border-b border-tb-br-color">
              <div className="flex items-center h-full text-black text-[14px] font-normal">
              {afterMainAnswer}
              </div>
            </div></>:<></>}
            {/* 답변 내용 */}
            <div className="col-span-1 flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
              답변 내용
            </div>
            <div className="p-4 col-span-3 border-b border-tb-br-color">
              <div className="flex items-start h-full min-h-[132px] text-black text-[14px] font-normal whitespace-pre-line">
              {afterDialogAnswer}
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
                      {afterButtons.length > 0 && afterButtons.map((item, index) => {
                        const isLast = index === afterButtons.length - 1;
                        const borderClass = afterButtons.length > 0 && isLast ? '' : 'border-b';

                        return (
                          <React.Fragment key={index}>
                            <div className={`col-span-2 py-[15px] px-[8px] flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r ${borderClass} border-tb-br-color`}>
                              {item.name}
                            </div>
                            <div className={`col-span-3 p-[15px] flex items-center justify-start text-[14px] font-medium text-black bg-white border-r ${borderClass} border-tb-br-color`}>
                              {item.btnType}
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