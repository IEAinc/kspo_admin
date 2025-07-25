import React, {useState,useEffect} from "react";
// 사용한 컴포넌트 모음
import Box from '../../common/boxs/Box.jsx'
import Btn from '../../common/forms/Btn.jsx'
import Input from '../../common/forms/Input.jsx'
import Select from '../../common/forms/Select.jsx'
import CustomDatePicker from '../../common/forms/CustomDatepicker.jsx'
import { API_ENDPOINTS,api } from "../../../constants/api.js";
import { fetchCommonData } from "../../../constants/common.js";
import Cookies from "js-cookie";
const SearchWrap = ({onSearch}) => {
  
  // 검색조건}
  // (select) > 센터명
  const [selectCenterOptions,setSelectCenterOptions] = useState([
    {value:null, label:'전체'},

  ]);
  const [selectedCenter, setSelectedCenter] = useState(selectCenterOptions[0]);
  const handleCenterChange = (selectedOption) => { 
     Cookies.set('admincompany', selectedOption?.value === '전체' ? null : selectedOption.value, { 
          path: '/', 
          sameSite: 'Strict' 
        });
    setSelectedCenter(selectedOption); // 선택된 옵션을 직접 값으로 받음
  };

  // (select) > 만족도 점수
  const selectSatisfactionOptions = [
    {value:null, label:'전체'},
    {value:'1', label:'1'},
    {value:'2', label:'2'},
    {value:'3', label:'3'},
    {value:'4', label:'4'},
    {value:'5', label:'5'},
  ];
  const [selectSatisfactionScore, setSelectSatisfactionScore] = useState(selectSatisfactionOptions[0]);
  const handleDialogChange = (selectedOption) => {
    setSelectSatisfactionScore(selectedOption);
  }
  const onSearchClick=()=>{
   
    onSearch(selectedCenter.value,selectSatisfactionScore.value,searchContent,dateRange[0],dateRange[1]);
  }
  useEffect(() => {
    const fetchCenterOptions = async () => {
      try {
        const response = await api.post(API_ENDPOINTS.SatisCompany);
        const companies = response.data; // ['1', '2'] 형식의 데이터
        
        // 옵션 배열 생성
        const options = [
          { value: null, label: '전체' },
          ...companies.map(company => ({
            value: company,
            label: company
          }))
        ];
        
        setSelectCenterOptions(options);
        // 회사 초기값 세팅
        const { company, id } = await fetchCommonData();
        let initCompany=company;
        let cookieCompany=Cookies.get("admincompany")
        if(cookieCompany!==undefined)initCompany=cookieCompany;
        if(cookieCompany==='null')initCompany=null;
        if(companies.indexOf(initCompany)>-1){
          setSelectedCenter( { value: initCompany, label: initCompany===null?"전체":initCompany })
          Cookies.set('admincompany', initCompany, { 
            path: '/', 
            sameSite: 'Strict' 
          }); 
        }
       

      } catch (error) {
        console.error('센터명 옵션을 불러오는데 실패했습니다:', error);
      }
    };
    const preprocess= async ()=>{
      // 날자 세팅
      let now= new Date();
      let before_month=new Date();
      before_month.setMonth(before_month.getMonth()-1)
      setDateRange([before_month,now])
          //대화명 세팅
        await  fetchCenterOptions();
 
         
    }

    preprocess();
  }, []);
  // (input) > 검색 키워드
  const [searchContent, setSearchContent] = useState('')
  const handlerChange = (e) => {
    const value = e.target.value;
    setSearchContent(value)
  }
  const resetSearch=()=>{
    //센터명
    setSelectedCenter(selectCenterOptions[0]);
    //내용
    setSearchContent('');
    //날짜
    setDateRange([null,null])
    //점수
    setSelectSatisfactionScore(selectSatisfactionOptions[0])

  }
  // 날자 관련
   const [dateRange, setDateRange] = useState([null,null]); 
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
            minWidth="86px"
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