import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { api,API_ENDPOINTS } from '../../constants/api';
// 사용하는 컴포넌트 모음
import SearchWrap from '../../components/searchWraps/scenarioManagement/mainScenarioManagement/SearchWrap'
import Box from '../../components/common/boxs/Box'
import Btn from '../../components/common/forms/Btn'
import AgGrid from '../../components/common/grids/AgGrid'

// 얼럿
import CustomAlert from "../../components/common/modals/CustomAlert";

const MainScenarioManagement = () => {
  //모달 관련련
  const [modalText, setModalText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state)
  // 모달 임시추가
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
 
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
  useEffect(()=>{
    fetchListData()
  },[location.pathname])
  // Alert 닫기 함수
  const hideAlert = () => {
    setAlertState({
      ...alertState,
      isOpen: false
    });
  };
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
  const [searchText, setSearchText] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  // 등록 버튼 클릭 시 실행될 함수
  const handleRegisterClick = () => {
    if(location.state.type==='FAQ'){
      navigate(`/scenarioManagement/faqManagement/detail/register`, {state:{
        type:location.state.type,
        mode:'register'
      }});
    }else{
      navigate(`/scenarioManagement/mainScenarioManagement/detail/register`, {state:{
        type:location.state.type,
        mode:'register'
      }});
    }
   
  };
  // 상세보기
  const handleRowClick = (id) => {
    const basePath = location.pathname; // 현재 경로 가져오기
    if(location.state.type==='FAQ'){
      navigate(`/scenarioManagement/faqManagement/detail`, {state:{
        type:location.state.type,
        id:id
      }});
    }else{
      navigate(`/scenarioManagement/mainScenarioManagement/detail`, {state:{
        type:location.state.type,
        id:id
      }});
    }
  }
  //수정  함수
  const onEditClick = (gridApi) => {
    const selectedRows = gridApi.getSelectedRows();
    
    if (selectedRows.length > 1) {
      setAlertState({
        isOpen: true,
        title: '경고',
        message:  (
          <>
            <div>수정은 한 개의 {location.state.type==='FAQ'?'FAQ':'시나리오'}만 선택 가능합니다.</div>
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
      if(location.state.type==='FAQ'){
        navigate(`/scenarioManagement/faqManagement/detail/edit`,{
          state:{
           id:selectedRow.id,
           type:location.state.type,
           mode:'update'
         }
         });
      }else{
        navigate(`/scenarioManagement/mainScenarioManagement/detail/edit`,{
          state:{
           id:selectedRow.id,
           type:location.state.type,
           mode:'update'
         }
         });
      }
      
    }else{
      setAlertState({
        isOpen: true,
        title: '경고',
        message:  (
          <>
            <div>수정할 {location.state.type==='FAQ'?'FAQ':'시나리오'}를 선택하세요.</div>
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
  
  // 데이터 삭제
  // API 엔드포인트 상수


  const handleDataUpdate = (updatedData,gridApi) => {
    const selectedRows = gridApi.getSelectedRows();
    
    if (selectedRows.length > 0) {
      setAlertState({
        isOpen: true,
        title: '확인',
        message:  (
          <>
            <div>선택한 {location.state.type==='FAQ'?'FAQ':'시나리오'}를 삭제하시겠습니까?</div>
            <div>이 작업은 되돌릴 수 없습니다.</div>
          </>
        ),
        iconMode: 'cancel',
        confirmButton: true,
        cancelButton: true,
        onConfirm: async () =>{
          let idList=[]
          console.log('dfdsfd')
          selectedRows.map(e=>{
            idList.push(e.id)
          })
          console.log('dfdsfd1')
          const response = await api.post(API_ENDPOINTS.Delete, {
            id:idList
          });
          setAlertState({ isOpen: false });
          setGridData(updatedData)
        },
        onCancel: () => setAlertState({ isOpen: false })
      });
    } else{
      setAlertState({
        isOpen: true,
        title: '경고',
        message:  (
          <>
            <div>삭제할 {location.state.type==='FAQ'?'FAQ':'시나리오'}를 선택하세요.</div>
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



  const fetchListData = async (company = null, name = null, searchText = null) => {
    try {
      const response = await api.post(API_ENDPOINTS.LIST, {
        big: location.state.type,
        company: company || null,
        name: name || null,
        searchText: searchText || null
      });
      const { data } = response;
      
      // API 응답 데이터를 그리드 데이터 형식에 맞게 변환
      const grid_data = data.map(item => ({
        id: item.id,
        company: item.company,
        name: item.name,
        answer: item.answer,
        detail: item.id,
        main_question:item.main_question
      }));

      /* 그리드 헤더 설정 */
      const grid_columns = [
        { headerName: "센터명", flex:1,field: "company", cellClass: 'text-center'},
        { headerName: "대화명",flex:1, field: "name", cellClass: 'text-left'},
        ...(location.state.type==='FAQ'?[{headerName: "대표질문",flex:1, field: "main_question", cellClass: 'text-left'}]:[]),
        { headerName: "답변 내용",flex:1, field: "answer", cellClass: 'text-left' },
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
        <SearchWrap 
          onSearch={fetchListData}
        
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
      <button onClick={handleOpen} className="btn">
        모달 열기
      </button>
      <CustomAlert
        title={alertState.title}
        iconMode={alertState.iconMode}
        message={alertState.message}
        onClose={hideAlert}
        isOpen={alertState.isOpen}
        confirmButton={alertState.confirmButton}
        cancelButton={alertState.cancelButton}
        onConfirm={alertState.onConfirm}
        onCancel={alertState.onCancel}
      />
    </div>
  );
}
export default MainScenarioManagement;