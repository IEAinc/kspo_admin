import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';

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
    navigate(`${basePath}/detail/${String(id)}`); // 동적 경로 생성
  }

  useEffect(() => {
    /* 그리드 데이터 */
    let grid_data = [
      {
        id: 'faq_modification_history_001',
        centerName: '올림픽공원스포츠센터',
        dialogName: '강습별로 시간과 비용',
        dialogAnswer: 'Q. 강습별로 시간과 비용이 다 다른가요?',
        type: '등록',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_002',
        centerName: '탄천스포츠센터',
        dialogName: '프로그램 종류',

        dialogAnswer: 'Q. 프로그램은 어떤 종류의 강습이 있나요?',
        type: '수정',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_003',
        centerName: '탄천스포츠센터',
        dialogName: '프로그램 종류',
        dialogAnswer: 'Q. 프로그램은 어떤 종류의 강습이 있나요?',
        type: '삭제',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_004',
        centerName: '올림픽공원스포츠센터',
        dialogName: '강습별로 시간과 비용',
        dialogAnswer: 'Q. 강습별로 시간과 비용이 다 다른가요?',
        type: '등록',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_005',
        centerName: '탄천스포츠센터',
        dialogName: '프로그램 종류',
        dialogAnswer: 'Q. 프로그램은 어떤 종류의 강습이 있나요?',
        type: '수정',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_006',
        centerName: '탄천스포츠센터',
        dialogName: '프로그램 종류',
        dialogAnswer: 'Q. 프로그램은 어떤 종류의 강습이 있나요?',
        type: '삭제',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_007',
        centerName: '올림픽공원스포츠센터',
        dialogName: '강습별로 시간과 비용',
        dialogAnswer: 'Q. 강습별로 시간과 비용이 다 다른가요?',
        type: '등록',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_008',
        centerName: '탄천스포츠센터',
        dialogName: '프로그램 종류',
        dialogAnswer: 'Q. 프로그램은 어떤 종류의 강습이 있나요?',
        type: '수정',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_009',
        centerName: '탄천스포츠센터',
        dialogName: '프로그램 종류',
        dialogAnswer: 'Q. 프로그램은 어떤 종류의 강습이 있나요?',
        type: '삭제',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_010',
        centerName: '올림픽공원스포츠센터',
        dialogName: '강습별로 시간과 비용',
        dialogAnswer: 'Q. 강습별로 시간과 비용이 다 다른가요?',
        type: '등록',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_011',
        centerName: '탄천스포츠센터',
        dialogName: '프로그램 종류',
        dialogAnswer: 'Q. 프로그램은 어떤 종류의 강습이 있나요?',
        type: '수정',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_012',
        centerName: '탄천스포츠센터',
        dialogName: '프로그램 종류',
        dialogAnswer: 'Q. 프로그램은 어떤 종류의 강습이 있나요?',
        type: '삭제',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_013',
        centerName: '올림픽공원스포츠센터',
        dialogName: '강습별로 시간과 비용',
        dialogAnswer: 'Q. 강습별로 시간과 비용이 다 다른가요?',
        type: '등록',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_014',
        centerName: '탄천스포츠센터',
        dialogName: '프로그램 종류',
        dialogAnswer: 'Q. 프로그램은 어떤 종류의 강습이 있나요?',
        type: '수정',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_015',
        centerName: '탄천스포츠센터',
        dialogName: '프로그램 종류',
        dialogAnswer: 'Q. 프로그램은 어떤 종류의 강습이 있나요?',
        type: '삭제',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_016',
        centerName: '올림픽공원스포츠센터',
        dialogName: '강습별로 시간과 비용',
        dialogAnswer: 'Q. 강습별로 시간과 비용이 다 다른가요?',
        type: '등록',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_017',
        centerName: '탄천스포츠센터',
        dialogName: '프로그램 종류',
        dialogAnswer: 'Q. 프로그램은 어떤 종류의 강습이 있나요?',
        type: '수정',
        details: '',
        colorMode: false,
      },
      {
        id: 'faq_modification_history_018',
        centerName: '탄천스포츠센터',
        dialogName: '프로그램 종류',
        dialogAnswer: 'Q. 프로그램은 어떤 종류의 강습이 있나요?',
        type: '삭제',
        details: '',
        colorMode: false,
      },
    ]
    /* 그리드 헤더 설정 */
    let grid_columns = [
      { headerName: "NO", field: "number",cellClass: 'text-center',width: 80 ,suppressSizeToFit: true, valueGetter: (params) => params.node.rowIndex + 1,},
      { headerName: "센터명", flex:1,field: "centerName", cellClass: 'text-center'},
      { headerName: "대화명",flex:1, field: "dialogName", cellClass: 'text-left'},
      { headerName: "답변 내용",flex:1, field: "dialogAnswer", cellClass: 'text-left' },
      {
        headerName: "답변유형",
        width: 120,
        field: "type",
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
export default MainScenarioHistory;