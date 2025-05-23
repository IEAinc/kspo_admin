import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// 컴포넌트 모음
import Btn from '../../components/common/forms/Btn'
import Checkbox from '../../components/common/forms/Checkbox'
import Input from '../../components/common/forms/Input'
// 이미지 모음
import Logo from '../../assets/images/kspo_logo_color.svg?react';
import CustomAlert from '../../components/common/modals/CustomAlert'
import { API_ENDPOINTS ,api} from '../../constants/api'
const mockUserDB = {
  userID : 'admin',
  userPassword : 'admin123'
}
const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [errorUserId, setErrorUserId] = useState('')
  const [errorUserPassword, setErrorUserPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
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
    useEffect(()=>{
      let localChk=localStorage.getItem('rememberMe')
      if(localChk){
        setIsChecked(true);
        setUserId(localStorage.getItem('userId')?localStorage.getItem('userId'):'')
      }
    },[])
  const handleIdChange = (e) => {
    setUserId(e.target.value)
   
    if (!e.target.value) {
      setErrorUserId('아이디를 입력해주세요.')
    } else {
      setErrorUserId('')
    }
    return e.target.value;
  }
  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value)
    if (!e.target.value) {
      setErrorUserPassword('비밀번호를 입력해주세요.')
    } else {
      setErrorUserPassword('')
    }
  }

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked); // 새로운 체크 상태로 업데이트
  };

  // 로그인 버튼 클릭 시
  const handleLogin = async () => {
    if(!userId || !userPassword) {
      if (!userId) setErrorUserId('아이디를 입력해주세요.');
      if (!userPassword) setErrorUserPassword('비밀번호를 입력해주세요.');
      return;
    }
    

  
      try{
        const response = await api.post(API_ENDPOINTS.LOGIN, {
                id:userId,
                password:userPassword
              });
        setLoginSuccess(true);
        // 로그인 아이디 기억하기
        
        localStorage.setItem('rememberMe', isChecked);
        if(isChecked){
          localStorage.setItem('userId', userId);
        }else{
          localStorage.removeItem('userId');
        }
        
        navigate('/scenarioManagement/mainScenarioManagement',{state:{
          type:"big"
        }});
      }catch(e){
        if(e.status===401){
          setAlertState({
            isOpen: true,
            title: '경고',
            message:  (
              <>
                <div>아이디 또는 비밀번호가 잘못되었습니다.</div>
                <div>확인 버튼을 눌러 다시 입력하세요.</div>
              </>
            ),
            iconMode: 'warn',
            confirmButton: true,
            cancelButton: false,
            onConfirm: () => setAlertState({ isOpen: false }),
            onCancel: () => setAlertState({ isOpen: false })
          });
        }else if(e.status===403){
          setAlertState({
            isOpen: true,
            title: '경고',
            message:  (
              <>
                <div>접근이 제한된 네트워크입니다.</div>
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
      
  
      setLoginSuccess(false);
    
  }

  return (
    <div className="w-full h-[100vh] relative flex items-center justify-center bg-primary-blue-light">
      <div className="w-full min-h-[575px] max-w-[600px] mx-auto py-[80px] px-[100px] bg-white border border-br-gray rounded-[8px]">
        <div className="flex flex-col items-center justify-center gap-[12px]">
          <Logo />
          <h2 className="font-bold text-center text-[40px]">통합 관리자 로그인</h2>
        </div>
        <div className="flex flex-col gap-[16px] mt-[40px]">
          <Input
            labelName="아이디"
            name="userId"
            placeholder="아이디 입력"
            value={userId}
            onChange={handleIdChange}
            required
            error={errorUserId}
            options={{
              isColumn: true,
            }}
          />
          <Input
            labelName="비밀번호"
            type="password"
            name="userPassword"
            placeholder="비밀번호 입력"
            value={userPassword}
            onChange={handlePasswordChange}
            required
            error={errorUserPassword}
            options={{
              isColumn: true,
            }}
          />
        </div>
        <div className="mt-[20px]">
          <Checkbox
            checked={isChecked} // 상태 값 전달
            onChange={handleCheckboxChange} // 상태 변경 함수 전달
            checkedMessage="아이디 기억하기"
          />
        </div>
        <div className='flex justify-center mt-[40px]'>
          <Btn
            type='button'
            size='lg'
            colorMode={true}
            isFull={true}
            onClick={handleLogin}
          >
            로그인
          </Btn>
        </div>
      </div>
      <CustomAlert {...alertState} />
    </div>
  )
}
export default Login