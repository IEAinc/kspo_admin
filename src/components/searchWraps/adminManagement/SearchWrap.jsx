import React, {useState, useEffect} from "react";
// 사용한 컴포넌트 모음
import Box from '../../common/boxs/Box.jsx'
import Btn from '../../common/forms/Btn.jsx'
import Input from '../../common/forms/Input.jsx'
import Select from '../../common/forms/Select.jsx'
import { api, API_ENDPOINTS } from '../../../constants/api'

const SearchWrap = ({onSearchClick}) => {
 
  // 검색조건
  // (select) > 센터명
  const [selectCenterOptions, setSelectCenterOptions] = useState([
    { value: null, label: '전체' }
  ]);
  const [selectedCenter, setSelectedCenter] = useState( { value: null, label: '전체' });
  const resetSearch=()=>{
    setSelectedCenter( null);
    setSearchContent('');
  }
  // 센터명 옵션 불러오기
  useEffect(() => {
    const fetchCenterOptions = async () => {
      try {
        const response = await api.post(API_ENDPOINTS.AdminCompanies);
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
      } catch (error) {
        console.error('센터명 옵션을 불러오는데 실패했습니다:', error);
      }
    };

    fetchCenterOptions();
  }, []);
  const handleCenterChange = (selectedOption) => {
    console.log(selectedOption)
    setSelectedCenter(selectedOption);
  };
  
  // (input) > 내용
  const [searchContent, setSearchContent] = useState(null)

  const handleSearchClick = () => {
    // 검색 로직
    onSearchClick(selectedCenter?.value,searchContent?searchContent:null)
    console.log('검색:', selectedCenter, searchContent);
    // 여기서 부모 컴포넌트로 검색 조건을 전달할 수 있습니다
  };

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
              value={selectedCenter}
              options={selectCenterOptions}
              width='160px'
              label='센터명'
              uiOptions={{
                widthSize:'md',
                labelSize: 'sm',
              }}
              onChange={(selectedOption) => handleCenterChange(selectedOption)}
            />
            <Input
              labelName="검색 키워드"
              type="text"
              name="searchContent"
              placeholder="이름/아이디 검색"
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
              options={{
                isNormal: true,
                widthSize: 'lg',
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
            onClick={handleSearchClick}
          >
            검색
          </Btn>
        </div>
      </div>
    </Box>
  )
}
export default SearchWrap