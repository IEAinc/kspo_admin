import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
// 사용하는 컴포넌트 모음
import SearchWrap from '../../components/searchWraps/satisfactionMangement/SearchWrap'
import Box from '../../components/common/boxs/Box'
import Btn from '../../components/common/forms/Btn'
import AgGrid from "../../components/common/grids/AgGrid.jsx";
import { API_ENDPOINTS ,api} from '../../constants/api'
// 얼럿
import CustomAlert from "../../components/common/modals/CustomAlert";
import { fetchCommonData } from '../../constants/common.js';
import Cookies from "js-cookie";
const SatisfactionManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
  /* AgGrid */
  const [gridData, setGridData] = useState([]);
  const [gridColumns, setGridColumns] = useState([]);
  const [gridCount, setGridCount] = useState(0);
  const handleRowClick = (id) => {
    const basePath = location.pathname; // 현재 경로 가져오기
    navigate(`/ksponcoadministrator/satisfactionManagement/satisfactionManagement/detail`,{state:{id:id}}); // 동적 경로 생성
  }
  
   // 날짜 포맷
    const timeFormat=(timestamp)=>{
      const date = new Date(timestamp);
  
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const hh = String(date.getHours()).padStart(2, '0');
      const mi = String(date.getMinutes()).padStart(2, '0');
      const ss = String(date.getSeconds()).padStart(2, '0');
  
      const formatted = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
      return formatted;
    }
    // 날짜 포맷
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
  const fetchListData = async (company = null, point = null, searchText = null,startDate= null,endDate= null) => {
    try {
      
      const response = await api.post(API_ENDPOINTS.SatisList, {
        company: company || null,
        startDate: startDate?dayFormat(startDate) : null,
        endDate: endDate?dayFormat(endDate) : null,
        point: point || null,
        searchText: searchText || null
      });
      const { data } = response;
      
      // API 응답 데이터를 그리드 데이터 형식에 맞게 변환
      const grid_data = data.map(item => ({
        ...item,
        id: item.id,
        company: item.company,
        name: item.name,
        answer: item.answer,
        created: timeFormat(item.created),
        point:item.point,
        ip:item.ip,
      }));

      /* 그리드 헤더 설정 */
      let grid_columns = [
        {headerName:'날짜',flex:1,field:'created',cellClass: 'text-center'},
        { headerName: "센터명", flex:1,field: "company", cellClass: 'text-center'},
        { headerName: "사용자 질문",flex:1, field: "name", cellClass: 'text-left'},
        { headerName: "답변 내용",flex:1, field: "answer", cellClass: 'text-left' },
        { headerName: "점수",width: 80,suppressSizeToFit: true ,field: "point", cellClass: 'text-center' },
        { headerName: "피드백",width: 140,suppressSizeToFit: true , field: "comment", cellClass: 'text-center',hide:true },
        { headerName: "IP",width: 140,suppressSizeToFit: true , field: "ip", cellClass: 'text-center' },
           {
          headerName: "상세보기",
          field: 'id',
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

  useEffect(() => {
  
    const preProcess=async ()=>{
     
      fetchListData()
    }
    preProcess();
  },[])

  // 최종 반환
  return (
    <div>
      <div className="w-full mb-[16px]">
        <SearchWrap 
          onSearch={fetchListData}
        />
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
      <CustomAlert {...alertState} />
    </div>

  );
}
export default SatisfactionManagement;