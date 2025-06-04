import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { API_ENDPOINTS ,api} from '../../constants/api'
// 사용하는 컴포넌트 모음
import SearchWrap from '../../components/searchWraps/historyManagement/mainScenarioHistory/SearchWrap';
import Box from '../../components/common/boxs/Box';
import Btn from '../../components/common/forms/Btn';
import AgGrid from '../../components/common/grids/AgGrid';
const MainScenarioHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* AgGrid */
  const [gridData, setGridData] = useState([]);
  const [gridColumns, setGridColumns] = useState([]);
  const [gridCount, setGridCount] = useState(0);
  // 상세보기


  const handleRowClick = (id) => {
    const basePath = location.pathname; // 현재 경로 가져오기
    if(location.state.type==='FAQ'){
      navigate(`/ksponcoadministrator/historyManagement/mainScenarioHistory/detail`, {state:{
        type:location.state.type,
        id:id
      }});
    }else{
      navigate(`/ksponcoadministrator/historyManagement/faqModificationHistory/detail`, {state:{
        type:location.state.type,
        id:id
      }});
    }
  }
  useEffect(() => {
    
      fetchListData()
  
    },[location.pathname])
  const dayFormat=(date)=>{
  
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    const formatted = `${yyyy}-${mm}-${dd}`;
    return formatted;
  }
  const fetchListData = async (company = null, name = null, change_type=null,searchText = null,startDate= null,endDate= null) => {
    try {
      const response = await api.post(API_ENDPOINTS.ScenarioHistory, {
        big: location.state.type,
        company: company || null,
        name: name || null,
        searchText: searchText || null,
        startDate: startDate?dayFormat(startDate) : null,
        endDate: endDate?dayFormat(endDate) : null,
        change_type:change_type||null
      });
      console.log(response.data)
      const { data } = response.data;
      
      // API 응답 데이터를 그리드 데이터 형식에 맞게 변환
      const grid_data = data.map(item => ({
        id: item.id,
        company: item.company,
        name: item.name,
        answer: item.answer,
        detail: item.id,
        change_type:item.change_type
      }));

      /* 그리드 헤더 설정 */
      let grid_columns = [
        { headerName: "NO", field: "number",cellClass: 'text-center',width: 80 ,suppressSizeToFit: true, valueGetter: (params) => params.node.rowIndex + 1,},
        { headerName: "센터명", flex:1,field: "company", cellClass: 'text-center'},
        { headerName: "대화명",flex:1, field: "name", cellClass: 'text-left'},
        { headerName: "답변 내용",flex:1, field: "answer", cellClass: 'text-left' },
        {
          headerName: "답변유형",
          width: 120,
          field: "change_type",
          suppressSizeToFit: true,
          cellClass: 'text-center',
          cellClassRules: {
            'text-primary-blue': (params) => params.value === '등록',
            'text-point-color': (params) => params.value === '삭제',
            'text-black': (params) => params.value !== '등록' && params.value !== '삭제'
          }
        },
        {
          headerName: "상세보기",
          field: 'detail',
          width: 100,
          suppressSizeToFit: true,
          cellClass: 'flex-center',
          cellRenderer: (params) => {
            return (
              <Btn size="xxs" onClick={() => handleRowClick(params.data.id)}>
                상세보기
              </Btn>
            );
          },
        },
      ];
      setGridData(grid_data);
      setGridColumns(grid_columns);
      setGridCount(grid_data.length);
    } catch (error) {
      console.error('데이터를 불러오는데 실패했습니다:', error);
    }
  };
  // 최종 반환
  return (
    <div>
      <div className="w-full mb-[16px]">
        <SearchWrap onSearch={fetchListData}/>
      </div>
      <Box>
        <AgGrid
          rowData={gridData}
          columnDefs={gridColumns}
          height={463}
          indicator={{
            excel: true,
          }}
          sortable={true}
        />
      </Box>
    </div>

  );
}
export default MainScenarioHistory;