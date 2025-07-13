import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
// 사용하는 컴포넌트 모음
import SearchWrap from '../../components/searchWraps/satisfactionMangement/consultationConnectionCount/searchWrap'
import Box from '../../components/common/boxs/Box'
import Btn from '../../components/common/forms/Btn'
import AgGrid from '../../components/common/grids/AgGrid'
import AgChart from '../../components/common/charts/AgChart'
import { API_ENDPOINTS ,api} from '../../constants/api'
// 얼럿
import CustomAlert from "../../components/common/modals/CustomAlert";
import { fetchCommonData } from '../../constants/common.js';
import Cookies from "js-cookie";
// 사용하는 이미지 모음
import UserCount from '../../assets/images/icon/ico_userC.svg?react';
import Question from '../../assets/images/icon/ico_question.svg?react';
// 아이콘
import { GrAnalytics } from "react-icons/gr";
const ConsultationConnectionCount = () => {
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
  /* AgChart */
  // 가상의 데이터 호출 함수
  const fetchChartData = async (initCompany = null,startDate=null,endDate=null) => {
    // 실제로는 API 호출이 여기 들어갈 것
    // 그리드
    const gridData = (await api.post(API_ENDPOINTS.GridChatHistory,{company:initCompany,endDate:dayFormat(endDate)||null,startDate:dayFormat(startDate)||null})).data.data;
    setGridData(gridData);
    setGridCount(gridData.length);
    // 상단 전체 
    const allData = (await api.post(API_ENDPOINTS.AllChatHistory,{company:initCompany,endDate:dayFormat(endDate)||null,startDate:dayFormat(startDate)||null})).data.data;
    setCountAll([allData.user_count,allData.usage_count])
    // 상단 그래프
    const graphData = (await api.post(API_ENDPOINTS.DateChatHistory,{company:initCompany,endDate:dayFormat(endDate)||null,startDate:dayFormat(startDate)||null})).data.data;
    await setChartData([...graphData.map(e=>{
      return {date: e.created.split("-")[1]+"-"+e.created.split("-")[2],
        userCount: e.user_count}
    })])
   
  };
  
  const [chartData,setChartData] = useState([
    {
      date: "6/20",
      userCount: 250,
    },
    {
      date: "6/21",
      userCount: 250,
    },
    {
      date: "6/22",
      userCount: 250,
    },
    {
      date: "6/23",
      userCount: 250,
    },
    {
      date: "6/24",
      userCount: 250,
    },
    {
      date: "6/25",
      userCount: 250,
    },
    {
      date: "6/26",
      userCount: 250,
    },
    {
      date: "6/27",
      userCount: 250,
    },

  ]);
  const [countAll,setCountAll]=useState([0,0]);

  // 시리즈 설정 - 필요에 따라 동적으로 변경 가능
  const chartSeries = [
    {
      type: "line",
      xKey: "date",
      yKey: "userCount",
      yName: "사용자수",
      stroke: "#4D7CFE",
      marker: {
        enabled: true,
        fill: "#4D7CFE"
      },
    },
  ];

  /* AgGrid */
  const [gridData, setGridData] = useState([]);
  const [gridColumns, setGridColumns] = useState([]);
  const [gridCount, setGridCount] = useState(0);
  const dayFormat=(date)=>{
     if(date===null)return null;
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
   
    
    /* 그리드 헤더 설정 */
    let grid_columns = [
      { headerName: "NO", field: "number",cellClass: 'text-center',width: 80 ,suppressSizeToFit: true, valueGetter: (params) => params.node.rowIndex + 1,},
      { headerName: "날짜", flex:1,field: "created", cellClass: 'text-center'},
      { headerName: "센터명", flex:1,field: "company", cellClass: 'text-center'},
      { headerName: "사용자수",flex:1, field: "user_count", cellClass: 'text-center'},
      { headerName: "질문 횟수",flex:1, field: "usage_count", cellClass: 'text-center'},
    ];
    setGridColumns(grid_columns);
    
  },[])

  // 최종 반환
  return (
    <div>
      <div className="w-full mb-[16px]">
        <SearchWrap onSearch={fetchChartData} />
      </div>
      {/* 검색 필터링 */}
      <div className="flex items-stretch gap-[18px] w-full mb-[16px]">
        {/* 일별 방문자 */}
        <div className="flex justify-between flex-col w-[25%] py-[20px] px-[20px] rounded-[20px] bg-white br-[#EEF4FF] border-2 relative overflow-hidden">
          <div className="flex justify-between items-start gap-2 mb-[8px] ">
            <p className="text-[24px] font-bold text-black ]">일별 방문자 </p>
          </div>
          <div className="flex justify-between items-end gap-2">
            <p className="text-[50px] font-medium text-black leading-none">{countAll[0]}</p>
            <UserCount style={{ width: '80px',position:'relative',bottom:'-20px' }} />
          </div>
        </div>
        {/* 질문 개수 */}
        <div className="flex justify-between flex-col w-[25%] py-[20px] px-[20px] rounded-[20px] bg-white br-[#EEF4FF] border-2 relative overflow-hidden">
          <div className="flex justify-between items-start gap-2 mb-[8px] ">
            <p className="text-[24px] font-bold text-black ]">질문 개수</p>
          </div>
          <div className="flex justify-between items-end gap-2">
            <p className="text-[50px] font-medium text-black leading-none">{countAll[1]}</p>
            <Question style={{ width: '80px',position:'relative',bottom:'-20px'}} />
          </div>
        </div>
        {/* 차트 */}
        <div className="w-[50%] py-[20px] px-[20px] rounded-[20px] bg-white br-[#EEF4FF] border-2">
          <div className="flex font-bold text-[24px] mb-[4px]">사용자 추이</div>
          {/* 차트 컴포넌트 */}
          <AgChart
              data={chartData}
              series={chartSeries}
              legendOptions={{
                enabled: true,
                position: "bottom",
                alignment: "start"
              }}
              additionalOptions={{
                // 추가 설정
                padding: {
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20
                }
              }}
          />

        </div>
      </div>
      <Box>
        <AgGrid
          rowDeselection={true}
          rowData={gridData}
          columnDefs={gridColumns}
          height={463}
          sortable={true}
        />
      </Box>
      <CustomAlert {...alertState} />
    </div>

  );
}
export default ConsultationConnectionCount;