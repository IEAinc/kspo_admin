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
import { allowIdList, fetchCommonData } from '../../constants/common';
import Cookies from 'js-cookie';

const MainScenarioManagement = () => {
  //모달 관련련
  const [modalText, setModalText] = useState("");
 
  const navigate = useNavigate();
  const location = useLocation();
  // 모달 임시추가
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const [userCompany, setUserCompany] = useState("");
    const [userId, setUserId] = useState("");
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
    setIsModalOpen(false); // 모달 닫기
  };

  // 취소 버튼 클릭 동작
  const handleCancel = () => {
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
      navigate(`/ksponcoadministrator/scenarioManagement/faqManagement/register`, {state:{
        type:location.state.type,
        mode:'register'
      }});
    }else{
      navigate(`/ksponcoadministrator/scenarioManagement/mainScenarioManagement/register`, {state:{
        type:location.state.type,
        mode:'register'
      }});
    }
   
  };
  // 상세보기
  const handleRowClick = (id) => {
    const basePath = location.pathname; // 현재 경로 가져오기
    if(location.state.type==='FAQ'){
      navigate(`/ksponcoadministrator/scenarioManagement/faqManagement/detail`, {state:{
        type:location.state.type,
        id:id
      }});
    }else{
      navigate(`/ksponcoadministrator/scenarioManagement/mainScenarioManagement/detail`, {state:{
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
        navigate(`/ksponcoadministrator/scenarioManagement/faqManagement/detail/edit`,{
          state:{
           id:selectedRow.id,
           type:location.state.type,
           mode:'update'
         }
         });
      }else{
        navigate(`/ksponcoadministrator/scenarioManagement/mainScenarioManagement/detail/edit`,{
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
    let stop=false;
    console.log(allowIdList.indexOf(userId))
    // 회사명 검색후 금지지
     if(allowIdList.indexOf(userId)===-1){
      selectedRows.map((e)=>{
        if(e.company!==userCompany)stop=true;
          
      })
     }
     console.log("stop",stop)
     if(stop){
      setAlertState({
        isOpen: true,
        title: '경고',
        message:  (
          <>
            <div>선택한 항목 중 다른 센터의 {location.state.type==='FAQ'?'FAQ':'메인 시나리오'}가 포함되어 있습니다.</div>
            <div>본인 센터의 {location.state.type==='FAQ'?'FAQ':'시나리오'}만 선택해 주세요.</div>
          </>
        ),
        iconMode: 'warn',
        confirmButton: true,
        cancelButton: false,
        onConfirm: () => setAlertState({ isOpen: false }),
        onCancel: () => setAlertState({ isOpen: false })
      });
      return;
     }

    
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
          let companyList=[];
          selectedRows.map(e=>{
            idList.push(e.id);
            companyList.push(e.company);
          })
          const response = await api.post(API_ENDPOINTS.Delete, {
            id:idList,
            company:companyList,
            big:location.state.type,
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
  
      const response = await api.post(API_ENDPOINTS.LIST, {
        big: location.state.type,
        company: company || null,
        name: name || null,
        searchText: searchText || null
      });
      const { data } = response;
      
      // API 응답 데이터를 그리드 데이터 형식에 맞게 변환
      const grid_data = data.map(item => {
        let data={
          ...item,
          id: item.id,
          company: item.company,
          name: item.name,
          answer: item.answer,
          detail: item.id,
          main_question:item.main_question
        };
        //버튼  데이터 추가
        data.btn_detail=data.btn_name?.split("**")[1]?data.btn_name.split("**")[1]:null
        data.btn_name=data.btn_name?.split("**")[0]
        for(let i=0;i<=7;i++){
          data["btn_detail"+i]=data["btn_name"+i]?.split("**")[1]?data["btn_name"+i]?.split("**")[1]:null
          data["btn_name"+i]=data["btn_name"+i]?.split("**")[0]
        }
        
        return data
    });
    console.log(grid_data)
      /* 그리드 헤더 설정 */
      const grid_columns = [
        { headerName: "센터명", flex:1,field: "company", cellClass: 'text-center'},
        { headerName: "대화명",flex:1, field: "name", cellClass: 'text-left'},
        {headerName: "대표질문",flex:1, field: "main_question", cellClass: 'text-left',hide:location.state.type!=='FAQ'},
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
      //버튼 그리트 추가가
      grid_columns.push( { headerName: "버튼1 유형", flex:1,field: "btn_type", cellClass: 'text-center',hide:true});
      grid_columns.push( { headerName: "버튼1 명", flex:1,field: "btn_name", cellClass: 'text-center',hide:true});
      grid_columns.push( { headerName: "버튼1 상세", flex:1,field: "btn_detail", cellClass: 'text-center',hide:true});
      for(let i=0;i<=7;i++){
        grid_columns.push( { headerName: "버튼"+ (i+1) +" 유형", flex:1,field: "btn_type"+i, cellClass: 'text-center',hide:true});
        grid_columns.push( { headerName: "버튼"+ (i+1) +" 명", flex:1,field: "btn_name"+i, cellClass: 'text-center',hide:true});
        grid_columns.push( { headerName: "버튼"+ (i+1) +" 상세", flex:1,field: "btn_detail+i", cellClass: 'text-center',hide:true});
      }
      
      setGridData(grid_data);
      setGridColumns(grid_columns);
      setGridCount(grid_data.length);
   
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