import React, {useState} from "react";
// 사용한 컴포넌트 모음
import Box from '../../../common/boxs/Box.jsx'
import Btn from '../../../common/forms/Btn.jsx'
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
  // 날짜 관련
  const [dateRange, setDateRange] = useState([null,null]);

  // 초기화
  const resetSearch=()=>{
    //센터명
    setSelectedCenter(selectCenterOptions[0]);
    //날짜
    setDateRange([null,null]);
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
                dateRange={dateRange}
                setDateRange={setDateRange}
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
            onClick={resetSearch}
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