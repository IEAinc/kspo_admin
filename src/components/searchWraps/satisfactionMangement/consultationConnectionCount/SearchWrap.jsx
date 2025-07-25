import React, {useEffect, useState} from "react";
// 사용한 컴포넌트 모음
import Box from '../../../common/boxs/Box.jsx'
import Btn from '../../../common/forms/Btn.jsx'
import Select from '../../../common/forms/Select.jsx'
import CustomDatePicker from '../../../common/forms/CustomDatepicker.jsx'
import { api, API_ENDPOINTS } from "../../../../constants/api.js";
import { fetchCommonData } from "../../../../constants/common.js";
import Cookies from "js-cookie";
const SearchWrap = ({onSearch}) => {
  // 검색조건
  // (select) > 센터명
  const [selectCenterOptions,setSelectCenterOptions] =useState([
    {value:null, label:'전체'},

  ]);
  const [selectedCenter, setSelectedCenter] = useState(selectCenterOptions[0]);
  const handleCenterChange = (selectedOption) => {
    setSelectedCenter(selectedOption); // 선택된 옵션을 직접 값으로 받음
  };
  // 날짜 관련
  const [dateRange, setDateRange] = useState([null,null]);
  const preProcess=async ()=>{
    // company 선택 리스트 가져오기
      const response = await api.post(API_ENDPOINTS.SELECTION_VALUES,{});
      setSelectCenterOptions([{value:null, label:'전체'},...response.data.companies.map((e)=>{
        return {
          value:e, label:e,
        }
      })]);
      // 초기 데이터 용 company 구하기기
      const { company, id } = await fetchCommonData();
      let initCompany=company;
      let cookieCompany=Cookies.get("admincompany")
      console.log(cookieCompany)
      if(cookieCompany!==undefined)initCompany=cookieCompany;
      if(cookieCompany==='null')initCompany=null;
      if(initCompany===null){
        setSelectedCenter({value:initCompany, label:"전체"})
      }else{
        setSelectedCenter({value:initCompany, label:initCompany})
      }
    
      // 날자 세팅
      let now= new Date();
      let before_month=new Date();
      before_month.setMonth(before_month.getMonth()-1)
      setDateRange([before_month,now])
      onSearch(initCompany,before_month,now); 
     
   

  }
  useEffect(()=>{
    preProcess()
  },[])

  // 초기화
  const resetSearch=()=>{
    //센터명
    setSelectedCenter(selectCenterOptions[0]);
    //날짜
    setDateRange([null,null]);
  }
  const onSearchClick=(event)=>{

    onSearch(selectedCenter.value,dateRange[0],dateRange[1])
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
            onClick={onSearchClick}
          >
            검색
          </Btn>
        </div>
      </div>
    </Box>
  )
}
export default SearchWrap