import React, {useState,useEffect} from "react";
// 사용한 컴포넌트 모음
import Box from '../../../common/boxs/Box.jsx'
import Btn from '../../../common/forms/Btn.jsx'
import Input from '../../../common/forms/Input.jsx'
import Select from '../../../common/forms/Select.jsx'
import CustomDatePicker from '../../../common/forms/CustomDatepicker.jsx'
import { api,API_ENDPOINTS } from "../../../../constants/api.js";
import { fetchCommonData } from "../../../../constants/common.js";
import Cookies from "js-cookie";
const SearchWrap = ({onSearch}) => {
  // 검색조건
  // (select) > 센터명
  const [selectCenterOptions, setSelectCenterOptions] = useState([
     { value: null, label: '전체' }
   ]);
  const [selectedCenter, setSelectedCenter] = useState(selectCenterOptions[0]);
  const handleCenterChange = (selectedOption) => {
    setSelectedCenter(selectedOption); // 선택된 옵션을 직접 값으로 받음
    Cookies.set('admincompany', selectedOption.value, { 
      path: '/', 
      sameSite: 'Strict' 
    });
  };
   const [dateRange, setDateRange] = useState([null,null]); 
  // (input) > 내용
  const [searchContent, setSearchContent] = useState('')
  const customOptions = ['오늘', '1주', '15일', '1개월','3개월','6개월','1년']; // 원하는 옵션만 선택
  const resetSearch=()=>{
    //센터명
    setSelectedCenter(selectCenterOptions[0]);
    //내용
    setSearchContent('');
    //날짜
    setDateRange([null,null])

  }
  const onSearchClick=()=>{
    onSearch(selectedCenter.value,searchContent,dateRange[0],dateRange[1]);
  }
  useEffect(() => {
    const fetchCenterOptions = async () => {
      try {
        const response = await api.post(API_ENDPOINTS.LogCompany);
        const companies = response.data; // ['1', '2'] 형식의 데이터
        
        // 옵션 배열 생성
        const options = [
          { value: null, label: '전체' },
          ...companies.map(company => ({
            value: company,
            label: company
          }))
        ];
        // 회사 초기값 세팅
        const { company, id } = await fetchCommonData();
        let initCompany=company;
        let cookieCompany=Cookies.get("admincompany")
        if(cookieCompany!==undefined)initCompany=cookieCompany;
        if(cookieCompany==='null')initCompany=null;
        if(companies.indexOf(initCompany)>-1){
          setSelectedCenter( { value: initCompany, label: initCompany })
          Cookies.set('admincompany', initCompany, { 
            path: '/', 
            sameSite: 'Strict' 
          });
          onSearchClick(initCompany)
        }else{
          onSearchClick()
        }
        setSelectCenterOptions(options);
      } catch (error) {
        console.error('센터명 옵션을 불러오는데 실패했습니다:', error);
      }
    };

    fetchCenterOptions();
  }, []); 
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
            mb-[10px]
            md:flex-row
            lg:flex-1
            lg:flex-row
            lg:gap-[40px]
            lg:mt-[0]"
          >
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
            <Input
              labelName="내용"
              type="text"
              name="searchContent"
              placeholder="이름/아이디 검색"
              value={searchContent}
              onChange={handlerChange}
              options={{
                isNormal: true,
                widthSize:'lg',
                labelSize: 'sm',
              }}
            />
          </div>
          <CustomDatePicker
            rangeOptions={customOptions}
            dateRange={dateRange}
              setDateRange={setDateRange}
            options={{
              widthSize:'md',
              labelSize: 'sm',
            }}
          />
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
            minWidth="80px"
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