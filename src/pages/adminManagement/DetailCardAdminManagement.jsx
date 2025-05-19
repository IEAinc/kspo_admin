import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
// 사용한 컴포넌트 모음
import Box from '../../components/common/boxs/Box'
import Btn from '../../components/common/forms/Btn'
import Select from '../../components/common/forms/Select'
import Input from '../../components/common/forms/Input'
const DetailCardAdminManagement = () => {
  const navigate = useNavigate();
  // 버튼 클릭 핸들러
  const goBack = () => {
    navigate(-1); // 히스토리 스택에서 한 단계 뒤로 이동
  };
  // 초기화

  // (select) > 센터명
  const selectCenterOptions = [
    {value:'whole', label:'전체'},
    {value:'option1', label:'옵션1'},
    {value:'option2', label:'옵션2'},
  ];
  const [selectedCenter, setSelectedCenter] = useState(selectCenterOptions[0]);
  const handleCenterChange = (selectedOption) => {
    setSelectedCenter(selectedOption); // 선택된 옵션을 직접 값으로 받음
  };
  // (select) > 이메일
  const selectEmailOptions = [
    {value:'whole', label:'전체'},
    {value:'option1', label:'옵션1'},
    {value:'option2', label:'옵션2'},
  ];
  const [selectedEmail, setSelectedEmail] = useState(selectEmailOptions[0]);
  const handleEmailChange = (selectedOption) => {
    setSelectedEmail(selectedOption); // 선택된 옵션을 직접 값으로 받음
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
              value=''
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
              value=''
              options={{
                isNormal:true,
                fixedFull:true
              }}
            />
            <Btn
              size="sm"
              colorMode={true}
              minWidth="78px"
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
              value=''
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
              value=''
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
                value=''
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
              value=''
              options={{
                isNormal:true
              }}
            />
            -
            <Input
              id='dialogName'
              // placeholder=''
              value=''
              options={{
                isNormal:true
              }}
            />
            -
            <Input
              id='dialogName'
              // placeholder=''
              value=''
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
              value=''
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
        >
          등록
        </Btn>
      </div>
    </Box>
  )
}
export default DetailCardAdminManagement;