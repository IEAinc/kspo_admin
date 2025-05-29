import React, { useState,useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
// 사용한 컴포넌트 모음
import Box from '../../components/common/boxs/Box'
import Btn from '../../components/common/forms/Btn'
import Input from '../../components/common/forms/Input'
import Textarea from '../../components/common/forms/Textarea.jsx'
import Select from "../../components/common/forms/Select.jsx";
import { API_ENDPOINTS } from '../../constants/api'
import { api } from '../../constants/api';
const DetailCardMainScenarioManagement = () => {
  const navigate = useNavigate();
  //  파라미터 받아오기
  const location=useLocation();
  // 초기데이터 불러오기
 
  // 초기 값 설정
  useEffect( ()=>{
    const loadData = async () => {
      //수정시 초기 데이터 설정
      const response = await api.post(API_ENDPOINTS.Detail, {
        id:location.state.id
      });
      let data=response.data
      setCenterName(data.company);
      setDialogName(data.name);
      setText(data.answer);
      setQuestion(data.main_question)

      if(data.btn_type){
        btnList[0].btnType=data.btn_type;
        btnList[0].btnName=data.btn_name.split("**")[0];
        btnList[0].btnDetail=data.btn_name.split("**")[1]?data.btn_name.split("**")[1]:null;
      }
      for(let i=0;i<=7;i++){
        if(data["btn_type"+i]){
          btnList[i].btnType=data["btn_type"+i];
          btnList[i].btnName=data["btn_name"+i].split("**")[0];
          btnList[i].btnDetail=data["btn_name"+i].split("**")[1]?data["btn_name"+i].split("**")[1]:null;
        }
      }
    };
    
    loadData();
    
  
  },[])
  // 버튼 클릭 핸들러
  const goBack = () => {
    navigate('/ksponcoadministrator/scenarioManagement/mainScenarioManagement',{state:{
      type:location.state.type
    }}); // 히스토리 스택에서 한 단계 뒤로 이동
  };
  const handleEditClick = () => {
    if(location.state.type==='FAQ'){
      navigate(`/ksponcoadministrator/scenarioManagement/faqManagement/detail/edit`,{
        state:{
         id:location.state.id,
         type:location.state.type,
         mode:'update'
       }
       }); // 경로로 이동
    }else{
      navigate(`/ksponcoadministrator/scenarioManagement/mainScenarioManagement/detail/edit`,{
        state:{
         id:location.state.id,
         type:location.state.type,
         mode:'update'
       }
       }); // 경로로 이동
    };
    }
   
//

  // 센터명
  const [centerName, setCenterName] = useState("");
  // 대화명
  const [dialogName, setDialogName] = useState("");
// 대표 질문
  const [dialogQuestion, setQuestion] = useState("");


  /* 답변 내용 */
  const [text, setText] = useState("");
  // 버튼 항목 리스트
  const [btnList, setBtnList] = useState([
    {
      name: '버튼1',
      btnType:null,
      btnName:null,
      btnDetail:null
    },
    {
      name: '버튼2',
      btnType:null,
      btnName:null,
      btnDetail:null
    },
    {
      name: '버튼3',
      btnType:null,
      btnName:null,
      btnDetail:null
    },
    {
      name: '버튼4',
      btnType:null,
      btnName:null,
      btnDetail:null
    },
    {
      name: '버튼5',
      btnType:null,
      btnName:null,
      btnDetail:null
    },
    {
      name: '버튼6',
      btnType:null,
      btnName:null,
      btnDetail:null
    },
    {
      name: '버튼7',
      btnType:null,
      btnName:null,
      btnDetail:null
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
            {centerName}
          </div>
        </div>
        {/* 대화명 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          대화명
        </div>
        <div className="p-4 col-span-7 border-b border-tb-br-color">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
           {dialogName}
          </div>
        </div>
        {/* 대표 질문*/}
        {
          location.state.type==='FAQ'?<>
          <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          대표 질문
        
        </div>
        <div className="p-4 col-span-7 border-b border-tb-br-color">
          <div className="flex items-center h-full gap-2 text-black text-[14px] font-normal">
           {dialogQuestion}
          </div>
        </div>
          </>:<></>
         }
        {/* 답변 내용 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          답변 내용
        </div>
        <div className="py-[6px] px-[8px] col-span-7 border-b border-tb-br-color text-[14px] text-black font-normal whitespace-pre-line">
          {text}
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
                            className={`col-span-2 p-[15px] flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r ${borderClass} border-tb-br-color break-all`}
                          >
                            {item.name}
                          </div>

                          {/* 두 번째 컬럼: Select */}
                          <div
                            className={`col-span-3 px-[8px] py-[6px] flex items-center justify-start text-[14px] font-medium text-black bg-white border-r ${borderClass} border-tb-br-color break-all`}
                          >
                            {item.btnType}
                          </div>

                          {/* 세 번째 컬럼: Input */}
                          <div
                            className={`col-span-3 px-[8px] py-[6px] flex items-center justify-start text-[14px] font-medium text-black bg-white border-r ${borderClass} border-tb-br-color break-all`}
                          >
                            {item.btnName}
                          </div>

                          {/* 네 번째 컬럼: Detail Input */}
                          <div
                            className={`col-span-4 px-[8px] py-[6px]] flex items-center justify-start text-[14px] font-medium text-black bg-white ${borderClass} border-tb-br-color break-all`}
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