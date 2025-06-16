import React, {useEffect, useState} from 'react';

// 사용하는 컴포넌트 모음
import SearchWrap from '../../components/searchWraps/historyManagement/loginHistory/SearchWrap.jsx'
import Box from '../../components/common/boxs/Box'
import AgGrid from '../../components/common/grids/AgGrid';

import Btn from "../../components/common/forms/Btn.jsx";
import { API_ENDPOINTS ,api} from '../../constants/api'
const LoginHistory = () => {

  /* AgGrid */
  const [gridData, setGridData] = useState([]);
  const [gridColumns, setGridColumns] = useState([]);
  const [gridCount, setGridCount] = useState(0);
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
  useEffect(() => {
  
  
  },[])
  const fetchListData = async (company = null, searchText = null,startDate= null,endDate= null) => {
    try {
      const response = await api.post(API_ENDPOINTS.LogLIst, {
        company: company || null,
        startDate: startDate?dayFormat(startDate) : null,
        endDate: endDate?dayFormat(endDate) : null,
        searchText: searchText || null
      });
      const { data } = response;
      
      // API 응답 데이터를 그리드 데이터 형식에 맞게 변환
      const grid_data = data.map(item => ({
        company: item.company,
        id: item.id,
        created:timeFormat(item.created),
        type: item.type,
        ip: item.ip,
      
      }));

      
      /* 그리드 헤더 설정 */
    let grid_columns = [
      { headerName: "NO", field: "number",cellClass: 'text-center',width: 80 ,suppressSizeToFit: true,   valueGetter: (params) => {
          // 커스텀 pagination 값을 가져오기
          const currentPage = params.context.currentPage; // 현재 페이지 번호 (1-Based Index)
          const pageSize = params.context.pageSize; // 페이지당 데이터 수
          const rowIndex = params.node.rowIndex; // 페이지 내의 인덱스 값 (0-Based Index)

          // 페이지 기반의 번호 계산
          return (currentPage - 1) * pageSize + rowIndex + 1;
        },
      },
      { headerName: "센터명", flex:1,field: "company", cellClass: 'text-center'},
      { headerName: "접속 아이디", flex:1,field: "id", cellClass: 'text-center'},
      { headerName: "로그시간", flex:1,field: "created", cellClass: 'text-center'},
      { headerName: "로그정보", flex:1,field: "type", cellClass: 'text-center'},
      { headerName: "접속IP", flex:1,field: "ip", cellClass: 'text-center'},
    ];

      setGridData(grid_data);
      setGridColumns(grid_columns);
      setGridCount(grid_data.length);
    } catch (error) {
      console.error('데이터를 불러오는데 실패했습니다:', error);
    }
  };

  return (
    <div>
      <div className="w-full mb-[16px]">
        <SearchWrap   onSearch={fetchListData} />
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
  )
}
export default LoginHistory