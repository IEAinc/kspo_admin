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


  useEffect(() => {
    /* 그리드 데이터 */
    let grid_data = [
      {centerName: '올림픽공원스포츠센터1', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터2', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터3', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터4', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터5', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터6', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터7', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터8', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터9', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터10', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터11', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터12', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터13', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터14', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터15', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터16', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터17', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터18', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터19', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터20', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
      {centerName: '올림픽공원스포츠센터21', name:'홍길동', userID:'opsc_mgr', email:'kim@kspo.or.kr',tel:'010-2222-3333',lastLogin:'2025-04-22 9:12',allowedIP:'192.168.1.1'},
    ];

    /* 그리드 헤더 설정 */
    let grid_columns = [
      { headerName: '',headerCheckboxSelection: true, checkboxSelection: true, width: 50,cellClass: 'custom-checkbox',suppressSizeToFit: true }, // 체크박스용 컬럼
      { headerName: "센터명", field: "centerName", cellClass: 'text-center'},
      { headerName: "성함", field: "name", cellClass: 'text-center'},
      { headerName: "아이디", field: "userID", cellClass: 'text-center' },
      { headerName: "이메일", field: 'email', cellClass: 'text-center'},
      { headerName: "연락처", field: "tel", cellClass: 'text-center' },
      { headerName: "최종로그인", field: "lastLogin", cellClass: 'text-center' },
      { headerName: "허용 IP", field: "allowedIP", cellClass: 'text-center'},
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
    </div>
  );
}
export default AdminManagement