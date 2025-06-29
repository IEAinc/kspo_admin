import React, {useState} from "react";
// 사용한 컴포넌트 모음
import Box from '../../../common/boxs/Box.jsx'
import Btn from '../../../common/forms/Btn.jsx'
import Input from '../../../common/forms/Input.jsx'
import Select from '../../../common/forms/Select.jsx'
import CustomDatePicker from '../../../common/forms/CustomDatepicker.jsx'

const SearchWrap = () => {
  // 검색조건
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

  // (select) > 만족도 점수
  const selectSatisfactionOptions = [
    {value:'whole', label:'전체'},
    {value:'option1', label:'옵션1'},
    {value:'option2', label:'옵션2'},
  ];
  const [selectSatisfactionScore, setSelectSatisfactionScore] = useState(selectSatisfactionOptions[0]);
  const handleDialogChange = (selectedOption) => {
    setSelectSatisfactionScore(selectedOption);
  }

  // (input) > 검색 키워드
  const [searchContent, setSearchContent] = useState('')
  const handlerChange = (e) => {
    const value = e.target.value;
    setSearchContent(value)
  }
  return (
    <Box padding={{ px: 16, py: 16 }}>
      <div className="
        flex
        flex-col
        lg:justify-between
        lg:flex-row
      ">
        <div className="
          flex
          flex-col
          gap-1
          lg:items-start
        ">
          <div className="
            flex
            flex-wrap
            items-center
            gap-[20px]
            md:flex-row
            lg:flex-1
            lg:flex-row
            lg:gap-[40px]
            lg:mt-[0]"
          >
            <CustomDatePicker
              options={{
                widthSize:'md',
                labelSize: 'sm',
              }}
            />
            <Select
              value={selectedCenter} // 현재 선택된 값
              options={selectCenterOptions} // 옵션 리스트
              width='160px'
              label='센터명'
              uiOptions={{
                widthSize:'md',
                labelSize: 'sm',
              }}
              onChange={handleCenterChange} // 변경 핸들러
            />
            <Select
              value={selectSatisfactionScore}
              options={selectSatisfactionOptions}
              width='160px'
              label='만족도 점수'
              uiOptions={{
                widthSize:'md',
                labelSize: 'lg',
              }}
              onChange={handleDialogChange} // 변경 핸들러
            />
            <Input
              labelName="검색 키워드"
              type="text"
              name="searchContent"
              placeholder="질문/답변 키워드"
              value={searchContent}
              onChange={handlerChange}
              options={{
                isNormal: true,
                widthSize: 'md2',
                labelSize: 'lg',
              }}
            />
          </div>

        </div>

        <div className="
          w-full
          flex
          items-center
          justify-end
          gap-[8px]
          mt-[10px]
          lg:w-auto
          lg:mt-[0]
          lg:justify-end
        ">
          <Btn
            size="sm"
            minWidth="81px"
            iconMode="reset"
          >
            초기화
          </Btn>
          <Btn
            size="sm"
            minWidth="80px"
            iconMode="search"
            colorMode={true}
          >
            검색
          </Btn>
        </div>
      </div>
    </Box>
  )
}
export default SearchWrap