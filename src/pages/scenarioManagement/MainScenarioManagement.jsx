import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
// 사용하는 컴포넌트 모음
import SearchWrap from '../../components/searchWraps/scenarioManagement/mainScenarioManagement/SearchWrap'
import Box from '../../components/common/boxs/Box'
import Btn from '../../components/common/forms/Btn'
import AgGrid from '../../components/common/grids/AgGrid'
// 얼럿
import CustomAlert from "../../components/common/modals/CustomAlert";
const MainScenarioManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 모달 임시추가
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  // 확인 버튼 클릭 동작
  const handleConfirm = () => {
    console.log("확인 버튼 동작 실행");
    setIsModalOpen(false); // 모달 닫기
  };

  // 취소 버튼 클릭 동작
  const handleCancel = () => {
    console.log("취소 버튼 동작 실행");
    setIsModalOpen(false); // 모달 닫기
  };

  /* AgGrid */
  const [gridData, setGridData] = useState([]);
  const [gridColumns, setGridColumns] = useState([]);
  const [gridCount, setGridCount] = useState(0);
  // 등록 버튼 클릭 시 실행될 함수
  const handleRegisterClick = () => {
    navigate(`/scenarioManagement/mainScenarioManagement/detail/register`);
  };
  // 상세보기
  const handleRowClick = (id) => {
    const basePath = location.pathname; // 현재 경로 가져오기
    navigate(`${basePath}/detail/${String(id)}`); // 동적 경로 생성
  }

  useEffect(() => {
    /* 그리드 데이터 */
    let grid_data = [
      {id:'main_s_1',centerName: '올림픽공원스포츠센터1', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_2',centerName: '올림픽공원스포츠센터2', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_3',centerName: '올림픽공원스포츠센터3', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_4',centerName: '올림픽공원스포츠센터4', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_5',centerName: '올림픽공원스포츠센터5', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_6',centerName: '올림픽공원스포츠센터6', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_7',centerName: '올림픽공원스포츠센터7', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_8',centerName: '올림픽공원스포츠센터8', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_9',centerName: '올림픽공원스포츠센터9', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_10',centerName: '올림픽공원스포츠센터10', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_11',centerName: '올림픽공원스포츠센터11', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_12',centerName: '올림픽공원스포츠센터12', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_13',centerName: '올림픽공원스포츠센터13', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_14',centerName: '올림픽공원스포츠센터14', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_15',centerName: '올림픽공원스포츠센터15', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_16',centerName: '올림픽공원스포츠센터16', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_17',centerName: '올림픽공원스포츠센터17', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_18',centerName: '올림픽공원스포츠센터18', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_19',centerName: '올림픽공원스포츠센터19', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_20',centerName: '올림픽공원스포츠센터20', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
      {id:'main_s_21',centerName: '올림픽공원스포츠센터21', dialogName:'홍길동', dialogAnswer:'opsc_mgr', detail:'kim@kspo.or.kr'},
    ];

    /* 그리드 헤더 설정 */
    let grid_columns = [
      { headerName: '',headerCheckboxSelection: true, checkboxSelection: true, width: 50,cellClass: 'custom-checkbox',suppressSizeToFit: true }, // 체크박스용 컬럼
      { headerName: "센터명", flex:1,field: "centerName", cellClass: 'text-center'},
      { headerName: "대화명",flex:1, field: "dialogName", cellClass: 'text-left'},
      { headerName: "답변 내용",flex:1, field: "dialogAnswer", cellClass: 'text-left' },
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
            edit: true,
            register: true,
            delete: true,
          }}
          onRegisterClick={handleRegisterClick}
          sortable={true}
        />
      </Box>
      <button onClick={handleOpen} className="btn">
        모달 열기
      </button>
      <CustomAlert
        title="알림"
        iconMode="warn"
        message={
          <>
            아이디 또는 비밀번호가 잘못되었습니다.<br/>
            확인 버튼을 눌러 다시 입력하세요.
          </>
        }
        onClose={handleClose} // 닫기 로직 전달
        isOpen={isModalOpen} // 현재 상태 전달
        confirmButton={true}
        cancelButton={true}
        onConfirm={handleConfirm}    // 확인 버튼 클릭 동작
        onCancel={handleCancel}
      />
    </div>
  );
}
export default MainScenarioManagement;