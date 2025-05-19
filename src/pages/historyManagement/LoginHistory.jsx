import React, {useEffect, useState} from 'react';

// 사용하는 컴포넌트 모음
import SearchWrap from '../../components/searchWraps/historyManagement/loginHistory/SearchWrap.jsx'
import Box from '../../components/common/boxs/Box'
import AgGrid from '../../components/common/grids/AgGrid';

import Btn from "../../components/common/forms/Btn.jsx";
const LoginHistory = () => {

  /* AgGrid */
  const [gridData, setGridData] = useState([]);
  const [gridColumns, setGridColumns] = useState([]);
  const [gridCount, setGridCount] = useState(0);

  useEffect(() => {
    /* 그리드 데이터 */
    let grid_data = [
      {
        id: 'faq_modification_history_001',
        centerName: '올림픽공원스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_002',
        centerName: '탄천스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_003',
        centerName: '탄천스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_004',
        centerName: '올림픽공원스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_005',
        centerName: '탄천스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_006',
        centerName: '탄천스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_007',
        centerName: '올림픽공원스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_008',
        centerName: '탄천스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_009',
        centerName: '탄천스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_010',
        centerName: '올림픽공원스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_011',
        centerName: '탄천스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_012',
        centerName: '탄천스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_013',
        centerName: '올림픽공원스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_014',
        centerName: '탄천스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_015',
        centerName: '탄천스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_016',
        centerName: '올림픽공원스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_017',
        centerName: '탄천스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
      {
        id: 'faq_modification_history_018',
        centerName: '탄천스포츠센터',
        userID: 'opsc_mgr',
        logTime: '2025-04-22 9:12',
        logInfo: 'login',
        allowedIP: '210.97.70.57',
      },
    ];
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
      { headerName: "센터명", flex:1,field: "centerName", cellClass: 'text-center'},
      { headerName: "접속 아이디", flex:1,field: "userID", cellClass: 'text-center'},
      { headerName: "로그시간", flex:1,field: "logTime", cellClass: 'text-center'},
      { headerName: "로그정보", flex:1,field: "logInfo", cellClass: 'text-center'},
      { headerName: "접속IP", flex:1,field: "allowedIP", cellClass: 'text-center'},
    ];
    setGridData(grid_data);
    setGridColumns(grid_columns);
    setGridCount(grid_data.length);
  },[])

  return (
    <div>
      <div className="w-full mb-[16px]">
        <SearchWrap />
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