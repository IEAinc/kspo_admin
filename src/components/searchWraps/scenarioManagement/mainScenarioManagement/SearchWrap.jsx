import React, {useState, useEffect} from "react";
import { api } from '@/constants/api';
import { API_BASE_URL, API_ENDPOINTS } from '@/constants/api.js';
// 사용한 컴포넌트 모음
import Box from '../../../common/boxs/Box.jsx'
import Btn from '../../../common/forms/Btn.jsx'
import Input from '../../../common/forms/Input.jsx'
import Select from '../../../common/forms/Select.jsx'
import { useLocation } from "react-router-dom";
import { fetchCommonData } from "../../../../constants/common.js";
import Cookies from 'js-cookie';
   
const SearchWrap = ({ onSearch}) => {
  const [selectCenterOptions, setSelectCenterOptions] = useState([
    { value: null, label: '전체' }
  ]);
  const [selectDialogOptions, setSelectDialogOptions] = useState([
    { value: null, label: '전체' }
  ]);
  const [selectedCenter, setSelectedCenter] = useState( { value: null, label: '전체' });
  const [selectDialog, setSelectDialog] = useState( { value: null, label: '전체' });
  const [searchText, setSearchText] = useState(null);
  const location=useLocation();
  const resetSearch=()=>{
    setSelectedCenter(null);
    setSelectDialog(null);
    setSearchText('');
  }
  // Select 컴포넌트의 onChange 핸들러
  const handleCenterChange = (selectedOption) => {
    Cookies.set('admincompany', selectedOption?.value === '전체' ? null : selectedOption.value, { 
      path: '/', 
      sameSite: 'Strict' 
    });
    setSelectedCenter(selectedOption?.value === '전체' ? null : selectedOption);
    fetchSelectionValues(selectedOption?.value === '전체' ? null : selectedOption.value);
  };

  const handleDialogChange = (selectedOption) => {
    setSelectDialog(selectedOption?.value === '전체' ? null : selectedOption);
    Cookies.set('adminName', selectedOption?.value === '전체' ? null : selectedOption.value, { 
      path: '/', 
      sameSite: 'Strict' 
    });
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchSelectionValues = async (company = null,isFirst=false) => {
    try {
      const response = await api.post(API_ENDPOINTS.SELECTION_VALUES,{
        big: location.state.type,
        company: company || null
      });
      const { companies, names } = response.data;

      // 센터명 옵션 설정
      const centerOptions = [
        { value: null, label: '전체' },
        ...companies.map(company => ({
          value: company,
          label: company
        }))
      ];
      setSelectCenterOptions(centerOptions);

      // 대화명 옵션 설정
      const dialogOptions = [
        { value: null, label: '전체' },
        ...names.map(answer => ({
          value: answer,
          label: answer
        }))
      ];
      setSelectDialogOptions(dialogOptions);
      if(isFirst){
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
        }else{
          fetchSelectionValues(null,false)
          initCompany=null;
          setSelectedCenter( { value: initCompany, label: '전체' })
        }
        let cookieName=Cookies.get("adminName")
        if(names.indexOf(cookieName)>-1){
          if(cookieName!==undefined)setSelectDialog({ value: cookieName, label: cookieName });
          if(cookieName===null)setSelectDialog({ value: null, label: "전체" });
        }else{
          cookieName=null;
          setSelectDialog( { value: cookieName, label: '전체' })
        }
        //대화명 세팅
        onSearch(initCompany,cookieName)
      }else{
     
        if(names.indexOf(selectDialog)===-1){
          setSelectDialog({ value: null, label: "전체" })
        }
      }

    } catch (err) {
      setError('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
      console.error('데이터를 불러오는데 실패했습니다:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const preprocess= async ()=>{
      const { company, id } = await fetchCommonData();
      let initCompany=company;
      let cookieCompany=Cookies.get("admincompany")
      if(cookieCompany!==undefined)initCompany=cookieCompany;
      if(cookieCompany==='null')initCompany=null;
      fetchSelectionValues(initCompany,true);
     
    }
    resetSearch()
    preprocess()
  }, [location.pathname]);


  // (input) > 검색 키워드
  const handlerChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
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
            <Select
              value={selectedCenter} // 현재 선택된 값
              options={selectCenterOptions} // 옵션 리스트
              isWidth={true}
              width='160px'
              label='센터명'
              uiOptions={{
                widthSize:'md',
                labelSize: 'sm',
              }}
              onChange={handleCenterChange} // 변경 핸들러
            />
            <Select
              value={selectDialog}
              options={selectDialogOptions}
              width='160px'
              label='대화명'
              uiOptions={{
                widthSize:'md',
                labelSize: 'sm',
              }}
              onChange={handleDialogChange} // 변경 핸들러
            />
            <Input
              labelName="검색 키워드"
              type="text"
              name="searchText"
              placeholder="대화명/답변 내용 키워드"
              value={searchText}
              onChange={handlerChange}
              options={{
                isNormal: true,
                widthSize: 'mg2',
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
          <Btn size="sm" onClick={() => {
            // 검색 이벤트 핸들러 호출
            onSearch(selectedCenter?.value === '전체' ? null : selectedCenter?.value,selectDialog?.value === '전체' ? null : selectDialog?.value,searchText || null);
          
          }}>
            검색
          </Btn>
        </div>
      </div>
    </Box>
  )
}
export default SearchWrap