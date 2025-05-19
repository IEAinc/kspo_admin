import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
// 사용하는 컴포넌트 모음
import SearchWrap from '../../components/searchWraps/adminManagement/SearchWrap'
import Box from '../../components/common/boxs/Box'
import AgGrid from '../../components/common/grids/AgGrid'

const AdminManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* AgGrid */
  const [gridData, setGridData] = useState([]);
  const [gridColumns, setGridColumns] = useState([]);
  const [gridCount, setGridCount] = useState(0);
  // 등록 버튼 클릭 시 실행될 함수
  const handleRegisterClick = () => {
    navigate(`/adminManagement/adminManagement/register`);
  };
  // 데이터 삭제
  const handleDataUpdate = (updatedRows) => {
    setGridData(updatedRows);
  };

  useEffect(() => {
    /* 그리드 데이터 */
    let grid_data = [
      {id:'faq_s_1',centerName: '올림픽공원스포츠센터1', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_2',centerName: '올림픽공원스포츠센터2', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_3',centerName: '올림픽공원스포츠센터3', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_4',centerName: '올림픽공원스포츠센터4', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_5',centerName: '올림픽공원스포츠센터5', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_6',centerName: '올림픽공원스포츠센터6', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_7',centerName: '올림픽공원스포츠센터7', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_8',centerName: '올림픽공원스포츠센터8', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_9',centerName: '올림픽공원스포츠센터9', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_10',centerName: '올림픽공원스포츠센터10', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_11',centerName: '올림픽공원스포츠센터11', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_12',centerName: '올림픽공원스포츠센터12', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_13',centerName: '올림픽공원스포츠센터13', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_14',centerName: '올림픽공원스포츠센터14', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_15',centerName: '올림픽공원스포츠센터15', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_16',centerName: '올림픽공원스포츠센터16', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_17',centerName: '올림픽공원스포츠센터17', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_18',centerName: '올림픽공원스포츠센터18', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_19',centerName: '올림픽공원스포츠센터19', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_20',centerName: '올림픽공원스포츠센터20', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {id:'faq_s_21',centerName: '올림픽공원스포츠센터21', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
    ];

    /* 그리드 헤더 설정 */
    let grid_columns = [
      { headerName: "센터명", flex:1,field: "centerName", cellClass: 'text-center'},
      { headerName: "성함",  flex:1,field: "name", cellClass: 'text-center'},
      { headerName: "아이디", flex:1, field: "userID", cellClass: 'text-center' },
      { headerName: "이메일", flex:1, field: 'email', cellClass: 'text-center'},
      { headerName: "연락처", flex:1, field: "tel", cellClass: 'text-center' },
      { headerName: "최종로그인",  flex:1,field: "lastLogin", cellClass: 'text-center' },
      { headerName: "허용 IP",  flex:1,field: "allowedIP", cellClass: 'text-center'},
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
          rowDeselection={true}
          rowData={gridData}
          columnDefs={gridColumns}
          height={463}
          indicator={{
            excel: true,
            edit: true,
            register: true,
            delete: true,
          }}
          isCheckboxMode={true}
          onDataUpdate={handleDataUpdate} // 삭제 후 데이터 갱신
          onRegisterClick={handleRegisterClick}
          sortable={true}
        />
      </Box>
    </div>
  );
}
export default AdminManagement