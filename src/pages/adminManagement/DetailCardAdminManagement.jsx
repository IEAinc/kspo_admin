import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import CustomAlert from "../../components/common/modals/CustomAlert";
import { api,API_ENDPOINTS } from '../../constants/api';
// 사용한 컴포넌트 모음
import Box from '../../components/common/boxs/Box'
import Btn from '../../components/common/forms/Btn'
import Select from '../../components/common/forms/Select'
import Input from '../../components/common/forms/Input'
import { useLocation } from "react-router-dom";

const DetailCardAdminManagement = () => {
  const location=useLocation();
  const navigate = useNavigate();
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
  // 버튼 클릭 핸들러
  const goBack = () => {
    navigate('/ksponcoadministrator/adminManagement/adminManagement'); // 히스토리 스택에서 한 단계 뒤로 이동
  };
  // 권한있는 id확인
    const chkAuth=async ()=>{
      const response = await api.post(API_ENDPOINTS.GETID);
      let allowIdList=['Admin','IEA_Admin']
      let myId=response.data
      if(allowIdList.indexOf(myId)==-1){
        setAlertState({
          isOpen: true,
          title: '접근 제한',
          message:  (
            <>
                <div>해당 페이지에 접근하실 수 없습니다.</div>
  
                <div>필요시, 접근 권한을 확인해주세요.</div>
              
            </>
          ),
          iconMode: 'warn',
          confirmButton: true,
          cancelButton: false,
          onConfirm: () => {
            setAlertState({ isOpen: false });
            navigate('/ksponcoadministrator/scenarioManagement/mainScenarioManagement',{state:{
              type:"big"
            }});
          },
          onCancel: () => setAlertState({ isOpen: false })
        });
      }else{
        fetchCenterOptions();
        if(location.state.mode==='update'){
          // 데이터 한개 불러오기기
          callDetail();
        }
      }
    }
    const fetchCenterOptions = async () => {
      try {
        const response = await api.post(API_ENDPOINTS.SELECTION_VALUES);
        const companies = response.data.companies; // ['1', '2'] 형식의 데이터
        
        // 옵션 배열 생성
        const options = [
          { value: null, label: '전체' },
          ...companies.map(company => ({
            value: company,
            label: company
          }))
        ];
        
        setSelectCenterOptions(options);
      } catch (error) {
        console.error('센터명 옵션을 불러오는데 실패했습니다:', error);
      }
    };

   
    const callDetail= async ()=>{
      const response = await api.post(API_ENDPOINTS.AdminLIST, {
        chkId:location.state.id
     });
      // 데잍터 넣기
     const data=response.data[0];
     let json={
      ...inputJson,
      name:data.name,
      id:data.id,
      chkId:true,
      password:'',
      email:data.email.split("@")[0],
      tel1:data.phone.split("-")[0],
      tel2:data.phone.split("-")[1],
      tel3:data.phone.split("-")[2],
      ip:data.ip,
      mode:'update'
    }
     setInputJson(JSON.parse(JSON.stringify(json)))
    
    setSelectedCenter( {value:data.company, label:data.company})
    setSelectedEmail( {value:data.email.split("@")[1], label:data.email.split("@")[1]})
    }
  useEffect(() => {
      
     
      chkAuth()
      
    }, []);
  // 초기화
  const [inputJson,setInputJson]=useState({
    name:null,
    id:null,
    chkId:false,
    password:null,
    chkPassword:null,
    email:null,
    tel1:null,
    tel2:null,
    tel3:null,
    ip:null,
    mode:'register'
  });
  // (select) > 센터명
  const [selectCenterOptions,setSelectCenterOptions] =useState([]);
  const [selectedCenter, setSelectedCenter] = useState( {value:null, label:'전체'});
  const handleCenterChange = (selectedOption) => {
    setSelectedCenter(selectedOption); // 선택된 옵션을 직접 값으로 받음
  };
  // (select) > 이메일
  const selectEmailOptions = [
    {value:null, label:'전체'},
    {value:'naver.com', label:'naver.com'},
    {value:'daum.net', label:'daum.net'},
    {value:'hanmail.net', label:'hanmail.net'},
    {value:'google.com', label:'google.com'},
  ];
  const [selectedEmail, setSelectedEmail] = useState(selectEmailOptions[0]);
  const handleEmailChange = (selectedOption) => {
    setSelectedEmail(selectedOption); // 선택된 옵션을 직접 값으로 받음
  };
  // 아이피체크
  function isValidIPv4(ip) {
    const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
    return ipv4Regex.test(ip);
  }
  
  // 이메일 체크
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  //수정 및 생성
  const handleEdit=async ()=>{

    
      //등록 모드
      // 센터명 검증
      if(selectedCenter.value === null){
        alert("센터명을 선택하세요");
        return;
      }
      //이름 검증
      if(inputJson.name === null||inputJson.name.replaceAll(" ","")===''){
        alert("이름을 입력하세요");
        return;
      }
      // 아이디 검증 체크
      if(!inputJson.chkId ){
        alert("아이디 중복 확인을 하세요");
        return;
      }

      // 비밀번호 규칙 확인
      if(location.state.mode==='register' || (location.state.mode==='update'&&inputJson.password!=null && inputJson.password!='' )){
        inputJson.mode='register'
        if(!isValidPassword(inputJson.password)){
          alert("비밀번호 규칙에 맞게 작성해주세요")
          return;
        }

        // 비밀번호 확인 체크
        if(inputJson.password!==inputJson.chkPassword){
          setAlertState({
            isOpen: true,
            title: '경고',
            message:  (
              <>
                <div>비밀번호가 일치하지 않습니다.</div>
                <div>다시 입력하세요.</div>
              </>
            ),
            iconMode: 'warn',
            confirmButton: true,
            cancelButton: false,
            onConfirm: () => setAlertState({ isOpen: false }),
            onCancel: () => setAlertState({ isOpen: false })
          });
          return;
        }
      }else{
        inputJson.mode='update'
      }
      // 이메일 체크 (이메일과 선택값)
      //이름 검증
      if(!isValidEmail(inputJson.email+"@"+selectedEmail.value)){
        setAlertState({
          isOpen: true,
          title: '경고',
          message:  (
            <>
              <div>유효하지 않은 이메일 형식입니다.</div>
              <div>다시 입력하세요.</div>
            </>
          ),
          iconMode: 'warn',
          confirmButton: true,
          cancelButton: false,
          onConfirm: () => setAlertState({ isOpen: false }),
          onCancel: () => setAlertState({ isOpen: false })
        });
        return;
      }
      
      // 연락처 3개 다 있는지 확인
      if(!(inputJson.tel1!=null&&inputJson.tel1!=''&&inputJson.tel2!=null&&inputJson.tel2!=''&&inputJson.tel3!=null&&inputJson.tel3!='')){
        alert("연락처를 입력하세요");
        return;
      }
      // 아이피 확인
      if(!isValidIPv4(inputJson.ip)){
        alert("잘못된 IP 형식입니다");
        return;
      }
      // 저장 로직
      inputJson.email=inputJson.email+"@"+selectedEmail.value;
      inputJson.phone=inputJson.tel1+"-"+inputJson.tel2+"-"+inputJson.tel3;
      inputJson.company=selectedCenter.value;
      
 
      let response = await api.post(location.state.mode==='register'?API_ENDPOINTS.AdminInsert:API_ENDPOINTS.AdminUpdate, inputJson);
      setAlertState({
        isOpen: true,
        title: location.state.mode==='register'?'등록 완료':'수정 완료',
        message:  (
          <>
            <div>{location.state.mode==='register'?'새로운 관리자 계정이 정상적으로 등록되었습니다.':'관리자 계정 정보가 정상적으로 수정되었습니다.'}</div>
          </>
        ),
        iconMode: 'warn',
        confirmButton: true,
        cancelButton: false,
        onConfirm: () => navigate('/ksponcoadministrator/adminManagement/adminManagement'),
        onCancel: () => setAlertState({ isOpen: false })
      });
    
  }
  const chkId=async ()=>{
    const response = await api.post(API_ENDPOINTS.AdminLIST, {
      chkId:inputJson.id
   });
   
    inputJson.chkId=response.data.length===0;
    if(inputJson.id==null||inputJson.id.replaceAll(" ","").length==0){
      return;
    }
    if(inputJson.chkId){
      setAlertState({
        isOpen: true,
        title: '등록 완료',
        message:  (
          <>
            <div>사용 가능한 아이디 입니다.</div>
          </>
        ),
        iconMode: 'success',
        confirmButton: true,
        cancelButton: false,
        onConfirm: () => setAlertState({ isOpen: false }),
        onCancel: () => setAlertState({ isOpen: false })
      });
    }else{
      setAlertState({
        isOpen: true,
        title: '경고',
        message:  (
          <>
            <div>이미 사용중인 아이디입니다.</div>
            <div>다른 아이디를 입력하세요</div>
          </>
        ),
        iconMode: 'warn',
        confirmButton: true,
        cancelButton: false,
        onConfirm: () => setAlertState({ isOpen: false }),
        onCancel: () => setAlertState({ isOpen: false })
      });

    }
  }
  const sanitizeAndLimit=(input, maxLength)=> {
    // 숫자 아닌 것 제거
    const onlyNumbers = input.replace(/\D/g, '');
    // 글자 수 제한
    return onlyNumbers.slice(0, maxLength);
  }
  function isValidPassword(password) {
    if (password.length < 8) return false;
  
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
    // 조건 몇 개를 만족하는지 계산
    const count = [hasUpper, hasLower, hasDigit, hasSpecial].filter(Boolean).length;
  
    return count >= 2;
  }

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
          <div className="w-full max-w-[321px]">
            <Select
              value={selectedCenter} // 현재 선택된 값
              options={selectCenterOptions} // 옵션 리스트
              uiOptions={{
                widthSize:'full',
              }}
              onChange={handleCenterChange} // 변경 핸들러
            />
          </div>
        </div>
        {/* 성함 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          성함
          <span className="text-point-color">*</span>
        </div>
        <div className="px-[8px] py-[6px] col-span-7 border-b border-tb-br-color">
          <div className="w-full max-w-[321px]">
            <Input
              id='dialogName'
              placeholder=''
              value={inputJson.name}
              onInput={(e)=>setInputJson({...inputJson,name:e.target.value.replaceAll(" ","")})}
              options={{
                isNormal:true
              }}
            />
          </div>
        </div>
        {/* 아이디 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          아이디
          <span className="text-point-color">*</span>
        </div>
        <div className="px-[8px] py-[6px] col-span-7 border-b border-tb-br-color">
          <div className="w-full max-w-[321px] flex items-center gap-[4px]">
            <Input
              id='dialogName'
              // placeholder=''
              value={inputJson.id}
              readonly={inputJson.chkId}
              onInput={(e)=>setInputJson({...inputJson,id:e.target.value.replaceAll(" ","")})}
              options={{
                isNormal:true,
                fixedFull:true
              }}
            />
            <Btn
              size="sm"
              colorMode={true}
              minWidth="78px"
              onClick={chkId}
            >
              중복확인
            </Btn>
          </div>
        </div>
        {/* 비밀번호 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          비밀번호
          <span className="text-point-color">*</span>
        </div>
        <div className="px-[8px] py-[6px] col-span-7 border-b border-tb-br-color">
          <div className="w-full max-w-[321px]">
            <Input
              id='dialogName'
              placeholder=''
              type='password'
              value={inputJson.password}
              onInput={(e)=>setInputJson({...inputJson,password:e.target.value.replaceAll(" ","")})}
              onChange={(e)=>{setInputJson({...inputJson,password:e.target.value.replaceAll(" ","")})}}
              options={{
                isNormal:true
              }}
            />
          </div>
        </div>
        {/* 비밀번호 확인 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          비밀번호 확인
          <span className="text-point-color">*</span>
        </div>
        <div className="px-[8px] py-[6px] col-span-7 border-b border-tb-br-color">
          <div className="w-full max-w-[321px]">
            <Input
              id='dialogName'
              placeholder=''
              type='password'
              value={inputJson.chkPassword}
              onInput={(e)=>setInputJson({...inputJson,chkPassword:e.target.value.replaceAll(" ","")})}
              options={{
                isNormal:true
              }}
            />
          </div>
        </div>
        {/* 이메일 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          이메일
          <span className="text-point-color">*</span>
        </div>
        <div className="px-[8px] py-[6px] col-span-7 border-b border-tb-br-color">
          <div className="w-full max-w-[321px] flex justify-between items-center gap-[4px]">
            <div className="w-[calc(50%-5px)]">
              <Input
                id='dialogName'
                // placeholder=''
                value={inputJson.email}
                onInput={(e)=>setInputJson({...inputJson,email:e.target.value.replaceAll(" ","")})}
                options={{
                  isNormal:true,
                  widthSize:'full',
                }}
              />
            </div>
            <span className="inline-block">
              @
            </span>
            <div className="w-[calc(50%-5px)]">
              <Select
                value={selectedEmail} // 현재 선택된 값
                options={selectEmailOptions} // 옵션 리스트
                uiOptions={{
                  widthSize:'full',
                }}
                onChange={handleEmailChange} // 변경 핸들러
              />
            </div>
          </div>
        </div>
        {/* 연락처 */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-b border-tb-br-color">
          연락처
          <span className="text-point-color">*</span>
        </div>
        <div className="px-[8px] py-[6px] col-span-7 border-b border-tb-br-color">
          <div className="w-full max-w-[321px] flex items-center gap-[4px]">
            <Input
              id='dialogName'
              // placeholder=''
              value={inputJson.tel1}
              onInput={(e)=>setInputJson({...inputJson,tel1:sanitizeAndLimit(e.target.value.replaceAll(" ",""),3)})}
              options={{
                isNormal:true
              }}
            />
            -
            <Input
              id='dialogName'
              // placeholder=''
              value={inputJson.tel2}
              onInput={(e)=>setInputJson({...inputJson,tel2:sanitizeAndLimit(e.target.value.replaceAll(" ",""),4)})}
              options={{
                isNormal:true
              }}
            />
            -
            <Input
              id='dialogName'
              // placeholder=''
              value={inputJson.tel3}
              onInput={(e)=>setInputJson({...inputJson,tel3:sanitizeAndLimit(e.target.value.replaceAll(" ",""),4)})}
              options={{
                isNormal:true
              }}
            />
          </div>
        </div>
        {/* 허용IP */}
        <div className="flex items-center justify-center text-[14px] font-bold text-gray1 bg-tb-bg-color border-r border-tb-br-color">
          허용IP
          <span className="text-point-color">*</span>
        </div>
        <div className="px-[8px] py-[6px] col-span-7 border-tb-br-color">
          <div className="w-full max-w-[321px]">
            <Input
              id='dialogName'
              placeholder=''
              value={inputJson.ip}
              onInput={(e)=>setInputJson({...inputJson,ip:e.target.value.replaceAll(" ","")})}
              options={{
                isNormal:true
              }}
            />
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex items-center justify-end mt-[8px] gap-[8px]">
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
          onClick={handleEdit}
        >
          {location.state.mode==='register'?'등록':'수정 완료'}
        </Btn>
        <CustomAlert {...alertState} />
      </div>
    </Box>
  )
}
export default DetailCardAdminManagement;