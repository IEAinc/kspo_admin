import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
// 사용하는 컴포넌트 모음
import SearchWrap from '../../components/searchWraps/adminManagement/SearchWrap'
import Box from '../../components/common/boxs/Box'
import AgGrid from '../../components/common/grids/AgGrid'
import CustomAlert from "../../components/common/modals/CustomAlert";
import { api,API_ENDPOINTS } from '../../constants/api';
import { id } from 'date-fns/locale';
const AdminManagement = () => {
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
  //수정  함수
  const onEditClick = (gridApi) => {
    const selectedRows = gridApi.getSelectedRows();
    
    if (selectedRows.length > 1) {
      setAlertState({
        isOpen: true,
        title: '경고',
        message:  (
          <>
            <div>수정은 한 개의 관리자 계정만 선택 가능합니다</div>
            <div>확인 버튼을 눌러 다시 선택하세요.</div>
          </>
        ),
        iconMode: 'warn',
        confirmButton: true,
        cancelButton: false,
        onConfirm: () => setAlertState({ isOpen: false }),
        onCancel: () => setAlertState({ isOpen: false })
      });
    } else if (selectedRows.length === 1) {
      const selectedRow = selectedRows[0];
      const basePath = location.pathname;
      navigate(`/ksponcoadministrator/adminManagement/adminManagement/register`,{state:{mode:"update",id:selectedRow.id}});
    }else{
      setAlertState({
        isOpen: true,
        title: '경고',
        message:  (
          <>
            <div>수정할 관리자 계정를 선택하세요.</div>
            <div>확인 버튼을 눌러 다시 선택하세요.</div>
          </>
        ),
        iconMode: 'warn',
        confirmButton: true,
        cancelButton: false,
        onConfirm: () => setAlertState({ isOpen: false }),
        onCancel: () => setAlertState({ isOpen: false })
      });
    }
  }
  // 등록 버튼 클릭 시 실행될 함수
  const handleRegisterClick = () => {
    navigate(`/ksponcoadministrator/adminManagement/adminManagement/register`,{state:{mode:"register"}});
  };
  // 데이터 삭제
  const handleDataUpdate = (updatedRows,gridApi) => {
    const selectedRows = gridApi.getSelectedRows();
        
        if (selectedRows.length > 0) {
          setAlertState({
            isOpen: true,
            title: '확인',
            message:  (
              <>
                <div>선택한 관리자 계정를 삭제하시겠습니까?</div>

                <div>이 작업은 되돌릴 수 없습니다.</div>
              </>
            ),
            iconMode: 'cancel',
            confirmButton: true,
            cancelButton: true,
            onConfirm: async () =>{
              let idList=[]
              selectedRows.map(e=>{
                idList.push(e.id)
              })
              const response = await api.post(API_ENDPOINTS.AdminDelete, {
                id:idList
              });
              setAlertState({ isOpen: false });
              setGridData(updatedRows)
            },
            onCancel: () => setAlertState({ isOpen: false })
          });
        } else{
          setAlertState({
            isOpen: true,
            title: '경고',
            message:  (
              <>
                  <div>삭제할 관리자 계정를 선택하세요</div>

                  <div>확인 버튼을 눌러 다시 선택하세요.</div>
                
              </>
            ),
            iconMode: 'warn',
            confirmButton: true,
            cancelButton: false,
            onConfirm: () => setAlertState({ isOpen: false }),
            onCancel: () => setAlertState({ isOpen: false })
          });
        }
    
  };
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

  // 검색 버튼 클릭 시 실행될 함수
  const handleSearchClick = async (company = null, name = null) => {
     const response = await api.post(API_ENDPOINTS.AdminLIST, {
            company,name
          });
          const { data } = response;
          
          // API 응답 데이터를 그리드 데이터 형식에 맞게 변환
          const grid_data = data.map(item => ({
            company: item.company,
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            tel: item.tel,
            ip: item.ip,
            updated: timeFormat(item.updated),
          }));
          setGridData(grid_data);
          setGridCount(grid_data.length);
  };
  // 권한있는 id확인
  const chkId=async ()=>{
    const response = await api.get(API_ENDPOINTS.GETID);

    let allowIdList=['Admin','IEA_Admin']
    let myId=response.data
    if(allowIdList.indexOf(myId)==-1){
      setAlertState({
        isOpen: true,
        title: '접근 제한',
        message:  (
          <>
              <div>해당 페이지에 접근하실 수 없습니다.</div>

              <div>필요시, 접근 권한을 확인해주세요.</div>
            
          </>
        ),
        iconMode: 'warn',
        confirmButton: true,
        cancelButton: false,
        onConfirm: () => {
          setAlertState({ isOpen: false });
          navigate('/ksponcoadministrator/scenarioManagement/mainScenarioManagement',{state:{
            type:"big"
          }});
        },
        onCancel: () => setAlertState({ isOpen: false })
      });
    }else{
       /* 그리드 데이터 */
    handleSearchClick()
    /* 그리드 헤더 설정 */
    let grid_columns = [
      { headerName: "센터명", flex:1,field: "company", cellClass: 'text-center'},
      { headerName: "성함",  flex:1,field: "name", cellClass: 'text-center'},
      { headerName: "아이디", flex:1, field: "id", cellClass: 'text-center' },
      { headerName: "이메일", flex:1, field: 'email', cellClass: 'text-center'},
      { headerName: "연락처", flex:1, field: "phone", cellClass: 'text-center' },
      { headerName: "최종로그인",  flex:1,field: "updated", cellClass: 'text-center' },
      { headerName: "허용 IP",  flex:1,field: "ip", cellClass: 'text-center'},
    ];
 
    setGridColumns(grid_columns);
    }
  }

  useEffect(() => {
   
    chkId();

    
    
  },[])

  // 최종 반환
  return (
    <div>
      <div className="w-full mb-[16px]">
        <SearchWrap 
          onSearchClick={handleSearchClick}
        />
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
          onEditClick={onEditClick}
          sortable={true}
        />
      </Box>
      <CustomAlert {...alertState} />
    </div>
  );
}
export default AdminManagement