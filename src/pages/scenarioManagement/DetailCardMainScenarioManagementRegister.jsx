import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
// 사용한 컴포넌트 모음
import Box from '../../components/common/boxs/Box'
import Btn from '../../components/common/forms/Btn'
import Input from '../../components/common/forms/Input'
import Textarea from '../../components/common/forms/Textarea.jsx'
import Select from "../../components/common/forms/Select.jsx";

import { API_ENDPOINTS } from '../../constants/api'
import { api } from '../../constants/api';
// 얼럿
import CustomAlert from "../../components/common/modals/CustomAlert";
import { allowIdList, fetchCommonData } from '../../constants/common.js'
const DetailCardMainScenarioManagementRegister = () => {
  
   const navigate = useNavigate();
  //  파라미터 받아오기
  const location=useLocation();
   const [userCompany, setUserCompany] = useState("");
   const [userId, setUserId] = useState("");

  // 초기데이터 불러오기
 
  // 초기 값 설정
  useEffect( ()=>{
    const loadData = async (company,id) => {
      //수정시 초기 데이터 설정
      const response = await api.post(API_ENDPOINTS.Detail, {
        id:location.state.id
      });
      let data=response.data
         // 유저 company 가져와서 검증증
      

      if(data.company!==company&&allowIdList.indexOf(id)===-1){
        location.state.type==='FAQ'?navigate('/ksponcoadministrator/scenarioManagement/faqManagement', {state:{
          type:location.state.type,
          
        }}):navigate('/ksponcoadministrator/scenarioManagement/mainScenarioManagement', {state:{
          type:location.state.type,
          
        }})
      }
    

      setSelectedCenter({value:data.company,label:data.company})
      setDialogName(data.name);
      setQuestion(data.main_question)
      setText(data.answer);
           btnList[0].selectedValue= data.btn_type?{ value: data.btn_type, label: data.btn_type }:{ value: null, label: '없음22' };
        if(data.btn_name){
        btnList[0].inputValue=data.btn_name.split("**")[0];
          btnList[0].detailValue=data.btn_name.split("**")[1]?data.btn_name.split("**")[1]:null;
        }
      for(let i=1;i<=7;i++){
  
          btnList[i].selectedValue= data["btn_type"+i]?{ value: data["btn_type"+i], label: data["btn_type"+i] }:{ value: null, label: '없음' };
          if(data["btn_name"+i]){
            btnList[i].inputValue=data["btn_name"+i].split("**")[0];
            btnList[i].detailValue=data["btn_name"+i].split("**")[1]?data["btn_name"+i].split("**")[1]:null;
          }
      }
      console.log(btnList)
    };
    const preProcess=async ()=>{
      const { company, id } = await fetchCommonData();
      setUserCompany(company);
      setUserId(id)
      // 수정 일때만
      if(location.state.mode==='update'){
         loadData(company,id);
      }
      fetchCenterOptions(company,id)
    }
    preProcess();
      
  
  },[])
// CustomAlert 상태 관리
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '',
    type: 'info',
    message: '',
    iconMode: 'warn',
    confirmButton: true,
    cancelButton: true,
    onConfirm: () => {},
    onCancel: () => {}
  });

  // Alert 닫기 함수
  const hideAlert = () => {
    setAlertState({
      ...alertState,
      isOpen: false
    });
  };
  /* 버튼 구성 (select) */
  // 버튼 공통 option
  const commonSelectOptions = [
    { value: null, label: '없음' },
    { value: '웹링크', label: '웹링크' },
    { value: '대화연결', label: '대화연결' },
    { value: '지도', label: '지도' },
    { value: '전화걸기', label: '전화걸기' },

  ];
  
  // 버튼 항목 리스트
  const [btnList, setBtnList] = useState([
    {
      name: '버튼1',
      isSelect: true,
      selectedValue: commonSelectOptions[0],
      isInput: true,
      inputValue: null,
      isDetailInput: true,
      detailValue: null,
    },
    {
      name: '버튼2',
      isSelect: true,
      selectedValue: commonSelectOptions[0],
      isInput: true,
      inputValue: null,
      isDetailInput: true,
      detailValue: null,
    },
    {
      name: '버튼2',
      isSelect: true,
      selectedValue: commonSelectOptions[0],
      isInput: true,
      inputValue: null,
      isDetailInput: true,
      detailValue: null,
    },
    {
      name: '버튼3',
      isSelect: true,
      selectedValue: commonSelectOptions[0],
      isInput: true,
      inputValue: null,
      isDetailInput: true,
      detailValue: null,
    },
    {
      name: '버튼4',
      isSelect: true,
      selectedValue: commonSelectOptions[0],
      isInput: true,
      inputValue: null,
      isDetailInput: true,
      detailValue: null,
    },
    {
      name: '버튼5',
      isSelect: true,
      selectedValue: commonSelectOptions[0],
      isInput: true,
      inputValue: null,
      isDetailInput: true,
      detailValue: null,
    },
    {
      name: '버튼6',
      isSelect: true,
      selectedValue: commonSelectOptions[0],
      isInput: true,
      inputValue: null,
      isDetailInput: true,
      detailValue: null,
    },
    {
      name: '버튼7',
      isSelect: true,
      selectedValue: commonSelectOptions[0],
      isInput: true,
      inputValue: null,
      isDetailInput: true,
      detailValue: null,
    },
  ]);
  const handleSelectChange = (value, index) => {
    // Select 값 변경 핸들러
    const updatedBtnList = [...btnList];
    updatedBtnList[index].selectedValue = value;
    setBtnList(updatedBtnList);
  };
  const handleInputChange = (e, index) => {
    const updatedBtnList = [...btnList];
    updatedBtnList[index].inputValue = e.target.value; // 입력 값 갱신
    setBtnList(updatedBtnList);
  };

  const handleDetailInputChange = (e, index) => {
    const updatedBtnList = [...btnList];
    updatedBtnList[index].detailValue = e.target.value; // 세부 입력 값 갱신
    setBtnList(updatedBtnList);
  };
  //

  // 센터명
  const [centerName, setCenterName] = useState("");
  // 대화명
  const [dialogName, setDialogName] = useState("");
  // 대표 질문
  const [dialogQuestion, setQuestion] = useState("");


  /* 답변 내용 */
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);

    // 예시: 최소 글자 유효성 검사
    if (value.length < 5) {
      setError("최소 5자 이상 입력해주세요.");
    } else {
      setError("");
    }
  };
  const handleRegister=async (e)=>{
      if (text.length < 5) {
        setError("최소 5자 이상 입력해주세요.");
        return;
      } else {
        setError("");
      }
      let data={
        big:location.state.type,
        id:location.state.id,
        company:selectedCenter.value,
        main_question:dialogQuestion,
        name:dialogName,
        answer:text,
      }
      data["btn_type"]=btnList[0].selectedValue.value
      data["btn_name"]='';
      if((btnList[0].inputValue&&btnList[0].inputValue.trim()!=='')||(btnList[0].detailValue&&btnList[0].detailValue.trim()!=='')){
        if(btnList[0].inputValue&&btnList[0].inputValue.trim()!='') data["btn_name"]+=btnList[0].inputValue.trim();
        data["btn_name"]+="**";
        if(btnList[0].detailValue&&btnList[0].detailValue.trim()!='') data["btn_name"]+=btnList[0].detailValue.trim();
       }else{
        data["btn_name"]=null;
       }
      for(let i=1;i<=7;i++){
        data["btn_type"+i]=btnList[i].selectedValue.value
        data["btn_name"+i]='';
       if((btnList[i].inputValue&&btnList[i].inputValue.trim()!=='')||(btnList[i].detailValue&&btnList[i].detailValue.trim()!=='')){
        if(btnList[i].inputValue&&btnList[i].inputValue.trim()!='') data["btn_name"+i]+=btnList[i].inputValue.trim();
        data["btn_name"+i]+="**";
        if(btnList[i].detailValue&&btnList[i].detailValue.trim()!='') data["btn_name"+i]+=btnList[i].detailValue.trim();
       }else{
        data["btn_name"+i]=null;
       }
      }
      const response = await api.post(location.state.mode==="register"?API_ENDPOINTS.Register:API_ENDPOINTS.Update,data);
      setAlertState({
        isOpen: true,
        title: location.state.mode==="register"?'등록 완료':'수정 완료',
        message:  (
          <>
            {location.state.mode==="register"?location.state.type==='FAQ'+'가 정상적으로 등록되었습니다.'?'FAQ':'시나리오'+'가 정상적으로 등록되었습니다.':location.state.type==='FAQ'?'FAQ'+'가 정상적으로 수정되었습니다.':'시나리오'+'가 정상적으로 수정되었습니다.'}
          </>
        ),
        iconMode: 'complete',
        confirmButton: true,
        cancelButton: false,
        onConfirm: () =>location.state.type==='FAQ'?navigate('/ksponcoadministrator/scenarioManagement/faqManagement', {state:{
          type:location.state.type,
          
        }}):navigate('/ksponcoadministrator/scenarioManagement/mainScenarioManagement', {state:{
          type:location.state.type,
          
        }}),
        onCancel: () => setAlertState({ isOpen: false })
      });
  }
  const handleSubBtn=()=>{
    if(location.state.mode==="register"){
      location.state.type==='FAQ'?navigate('/ksponcoadministrator/scenarioManagement/faqManagement', {state:{
        type:location.state.type,
        
      }}):navigate('/ksponcoadministrator/scenarioManagement/mainScenarioManagement', {state:{
        type:location.state.type,
        
      }})
      return;
    }else{
      setAlertState({
        isOpen: true,
        title: '취소 확인',
        message:  (
          <>         
            <div>수정 중인 내용이 사라집니다.</div>
            <div>취소하시겠습니까?</div>
          </>
        ),
        iconMode: 'warn',
        confirmButton: true,
        cancelButton: true,
        onConfirm: () => location.state.type==='FAQ'?navigate('/ksponcoadministrator/scenarioManagement/faqManagement', {state:{
          type:location.state.type,
          
        }}):navigate('/ksponcoadministrator/scenarioManagement/mainScenarioManagement', {state:{
          type:location.state.type,
          
        }}),
        onCancel: () => setAlertState({ isOpen: false })
      });

    }

  }
  const [selectedCenter, setSelectedCenter] = useState({value:null, label:'전체'});
  const handleCenterChange = (selectedOption) => {
    setSelectedCenter(selectedOption); // 선택된 옵션을 직접 값으로 받음
  };
  const [selectCenterOptions,setSelectCenterOptions] =useState([]);
 const fetchCenterOptions = async (cp,id) => {
      try {
        
        const response = await api.post(API_ENDPOINTS.SELECTION_VALUES);
        const companies = response.data.companies; // ['1', '2'] 형식의 데이터

        
        // 옵션 배열 생성
        const options = [
        
          ...companies.filter(company=>cp===company||allowIdList.indexOf(id)>-1).map(company => {
            return  {
              value: company,
              label: company
            };
          
        })
        ];
        if(location.state.mode==="register")setSelectedCenter(options[0]);
   
        
        setSelectCenterOptions(options);
      } catch (error) {
        console.error('센터명 옵션을 불러오는데 실패했습니다:', error);
      }
    };


  return (
    <Box padding={{ px: 16, py: 16 }}>
      {/* 카드 (필터 영역) */}
      <div className="grid grid-cols-8 border border-tb-br-color rounded-[4px]">
        {/* 센터명 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          센터명
          <span className="text-point-color">*</span>
        </div>
        <div className="px-[8px] py-[6px] col-span-7 border-b border-tb-br-color">
        
            <Select
              value={selectedCenter} // 현재 선택된 값
              options={selectCenterOptions} // 옵션 리스트
              uiOptions={{
                widthSize: 'full',
                noTransformed: true
              }}
              onChange={handleCenterChange} // 변경 핸들러
            />
       
        </div>
        {/* 대화명 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          대화명
          <span className="text-point-color">*</span>
        </div>
        <div className="py-[6px] px-[8px] col-span-7 border-b border-tb-br-color">
          <Input
            name="dialogName"
            value={dialogName}
            required
            onChange={(e) => setDialogName(e.target.value)} // 이벤트를 받아서 상태 업데이트
            options={{
              isNormal: true,
              widthSize: 'full',
              noTransformed: true
            }}
          />
        </div>
         {/* 대표 질문*/}
        
          <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          대표 질문
          <span className="text-point-color">*</span>
        </div>
        <div className="py-[6px] px-[8px] col-span-7 border-b border-tb-br-color">
          <Input
            name="dialogQuestion"
            value={dialogQuestion}
            required
            onChange={(e) => setQuestion(e.target.value)} // 이벤트를 받아서 상태 업데이트
            options={{
              isNormal: true,
              widthSize: 'full',
              noTransformed: true
            }}
          />
        </div>
         
        {/* 답변 내용 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          답변 내용
          <span className="text-point-color">*</span>
        </div>
        <div className="py-[6px] px-[8px] col-span-7 border-b border-tb-br-color">
          <Textarea
            name="memo"
            value={text}
            onChange={handleChange}
            placeholder="여기에 내용을 입력하세요"
            error={error}
            autoResize={true}
            rows={20}
          />
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
                            {item.isSelect ? (
                              <Select
                                key={index}
                                value={item.selectedValue} // 선택된 값
                                options={commonSelectOptions}
                                uiOptions={{
                                  widthSize:'full',
                                  noTransformed: true
                                }}
                                onChange={(value) => handleSelectChange(value, index)} // Select 변경 핸들러}
                              />
                            ) : (
                              item.type // Select가 없으면 타입 텍스트 출력
                            )}
                          </div>

                          {/* 세 번째 컬럼: Input */}
                          <div
                            className={`col-span-3 px-[8px] py-[6px] flex items-center justify-start text-[14px] font-medium text-black bg-white border-r ${borderClass} border-tb-br-color`}
                          >
                            {item.isInput ? (
                              <Input
                                id={`input-${index}`} // 고유 id
                                placeholder={item.placeholder || ''} // 플레이스홀더
                                value={item.inputValue || ''} // 인풋 값
                                onChange={(e) => handleInputChange(e, index)} // Input 변경 핸들러
                                options={{ isNormal: true, widthSize:'full', noTransformed: true }}
                              />
                            ) : (
                              item.btnName // Input이 없으면 텍스트 출력
                            )}
                          </div>

                          {/* 네 번째 컬럼: Detail Input */}
                          <div
                            className={`col-span-4 px-[8px] py-[6px]] flex items-center justify-start text-[14px] font-medium text-black bg-white ${borderClass} border-tb-br-color`}
                          >
                            {item.isDetailInput ? (
                              <Input
                                id={`detail-input-${index}`} // 고유 id
                                placeholder={item.placeholder || ''}
                                value={item.detailValue || ''}
                                onChange={(e) => handleDetailInputChange(e, index)} // Detail Input 핸들러
                                options={{ isNormal: true, widthSize:'full',noTransformed:true }}
                              />
                            ) : (
                              item.btnDetail // Detail Input이 없으면 텍스트 출력
                            )}
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
          onClick={handleSubBtn}
        >
          {location.state.mode==="register"?'목록':'취소'}
        </Btn>
        <Btn
          size="sm"
          minWidth="80px"
          colorMode={true}
          onClick={handleRegister}
        >
          {location.state.mode==='update'?"수정 완료":"등록"}
        </Btn>
              <CustomAlert
          title={alertState.title}
          iconMode={alertState.iconMode}
          message={alertState.message}
          onClose={hideAlert}
          isOpen={alertState.isOpen}
          confirmButton={alertState.confirmButton}
          cancelButton={alertState.cancelButton}
          onConfirm={alertState.onConfirm}
          onCancel={alertState.onCancel}
        />
      </div>
    </Box>
   
  )
}
export default DetailCardMainScenarioManagementRegister;