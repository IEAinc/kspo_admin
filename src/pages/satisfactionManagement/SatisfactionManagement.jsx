import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
// 사용하는 컴포넌트 모음
import SearchWrap from '../../components/searchWraps/satisfactionMangement/SearchWrap'
import Box from '../../components/common/boxs/Box'
import Btn from '../../components/common/forms/Btn'
import AgGrid from "../../components/common/grids/AgGrid.jsx";

const SatisfactionManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  /* AgGrid */
  const [gridData, setGridData] = useState([]);
  const [gridColumns, setGridColumns] = useState([]);
  const [gridCount, setGridCount] = useState(0);
  const handleRowClick = (id) => {
    const basePath = location.pathname; // 현재 경로 가져오기
    navigate(`${basePath}/detail/${String(id)}`); // 동적 경로 생성
  }
  useEffect(() => {
    /* 그리드 데이터 */
    let grid_data = [
      {id:'main_s_1',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터1', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_2',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터2', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_3',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터3', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_4',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터4', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_5',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터5', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_6',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터6', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_7',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터7', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_8',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터8', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_9',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터9', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_10',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터10', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_11',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터11', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_12',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터12', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_13',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터13', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_14',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터14', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_15',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터15', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_16',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터16', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_17',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터17', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_18',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터18', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_19',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터19', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_20',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터20', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
      {id:'main_s_21',date:'2025-04-21 15:11:00',centerName: '올림픽공원스포츠센터21', userQuestion:'홍길동', dialogAnswer:'opsc_mgr',score:4,ipAddress:'121.133.89.66', detail:'kim@kspo.or.kr'},
    ];

    /* 그리드 헤더 설정 */
    let grid_columns = [
      {headerName:'날짜',flex:1,field:'date',cellClass: 'text-center'},
      { headerName: "센터명", flex:1,field: "centerName", cellClass: 'text-center'},
      { headerName: "사용자 질문",flex:1, field: "userQuestion", cellClass: 'text-left'},
      { headerName: "답변 내용",flex:1, field: "dialogAnswer", cellClass: 'text-left' },
      { headerName: "점수",width: 80,suppressSizeToFit: true ,field: "score", cellClass: 'text-center' },
      { headerName: "IP",width: 140,suppressSizeToFit: true , field: "ipAddress", cellClass: 'text-center' },
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
  },[])

  // 최종 반환
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

  );
}
export default SatisfactionManagement;