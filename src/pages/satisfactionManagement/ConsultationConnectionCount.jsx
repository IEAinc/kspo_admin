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
  const fetchChartData = async (startDate, endDate) => {
    // 실제로는 API 호출이 여기 들어갈 것
    return [
      {
        date: "6/20",
        userCount: 250,
      },

    ];
  };
  
  const chartData = [
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

  ];

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
  const handleRowClick = (id) => {
    const basePath = location.pathname; // 현재 경로 가져오기
    navigate(`/ksponcoadministrator/satisfactionManagement/satisfactionManagement/detail`,{state:{id:id}}); // 동적 경로 생성
  }
  
 // 날짜 포맷
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
  // 날짜 포맷
  const dayFormat=(date)=>{
     
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const hh = String(date.getHours()).padStart(2, '0');
      const mi = String(date.getMinutes()).padStart(2, '0');
      const ss = String(date.getSeconds()).padStart(2, '0');
  
      const formatted = `${yyyy}-${mm}-${dd}`;
      return formatted;
    }
  // AG grid
  /* 그리드 데이터 */

  // const fetchListData = async (company = null, point = null, searchText = null,startDate= null,endDate= null) => {
  //   try {
  //
  //     const response = await api.post(API_ENDPOINTS.SatisList, {
  //       company: company || null,
  //       startDate: startDate?dayFormat(startDate) : null,
  //       endDate: endDate?dayFormat(endDate) : null,
  //       point: point || null,
  //       searchText: searchText || null
  //     });
  //     const { data } = response;
  //
  //     // API 응답 데이터를 그리드 데이터 형식에 맞게 변환
  //     const grid_data = data.map(item => ({
  //       ...item,
  //       id: item.id,
  //       company: item.company,
  //       name: item.name,
  //       answer: item.answer,
  //       created: timeFormat(item.created),
  //       point:item.point,
  //       ip:item.ip,
  //     }));
  //
  //     /* 그리드 헤더 설정 */
  //     let grid_columns = [
  //       {headerName:'날짜',flex:1,field:'created',cellClass: 'text-center'},
  //       { headerName: "센터명", flex:1,field: "company", cellClass: 'text-center'},
  //       { headerName: "사용자 질문",flex:1, field: "name", cellClass: 'text-left'},
  //       { headerName: "답변 내용",flex:1, field: "answer", cellClass: 'text-left' },
  //       { headerName: "점수",width: 80,suppressSizeToFit: true ,field: "point", cellClass: 'text-center' },
  //       { headerName: "IP",width: 140,suppressSizeToFit: true , field: "ip", cellClass: 'text-center' },
  //          {
  //         headerName: "상세보기",
  //         field: 'id',
  //         width: 100,
  //         suppressSizeToFit: true,
  //         cellClass: 'flex-center',
  //         cellRenderer: (params) => {
  //           return (
  //             <Btn size="xxs" onClick={() => handleRowClick(params.data.id)}>
  //               상세보기
  //             </Btn>
  //           );
  //         },
  //
  //       },
  //       { headerName: "피드백",width: 140,suppressSizeToFit: true , field: "comment", cellClass: 'text-center',hide:true },
  //
  //          ];
  //     setGridData(grid_data);
  //     setGridColumns(grid_columns);
  //     setGridCount(grid_data.length);
  //   } catch (error) {
  //     console.error('데이터를 불러오는데 실패했습니다:', error);
  //   }
  // };

  useEffect(() => {
    let grid_data = [
      {id:'main_s_1',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_2',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_3',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_4',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_5',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_6',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_7',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_8',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_9',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_10',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_11',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_12',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_13',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_14',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_15',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_16',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_17',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_18',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_19',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_20',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
      {id:'main_s_21',date: '2025-06-27', centerName:'올림픽스포츠센터',userCount:50, questionCount:40,},
    ];

    /* 그리드 헤더 설정 */
    let grid_columns = [
      { headerName: "NO", field: "number",cellClass: 'text-center',width: 80 ,suppressSizeToFit: true, valueGetter: (params) => params.node.rowIndex + 1,},
      { headerName: "날짜", flex:1,field: "date", cellClass: 'text-center'},
      { headerName: "센터명", flex:1,field: "centerName", cellClass: 'text-center'},
      { headerName: "사용자수",flex:1, field: "userCount", cellClass: 'text-center'},
      { headerName: "질문 횟수",flex:1, field: "questionCount", cellClass: 'text-center'},
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
      {/* 검색 필터링 */}
      <div className="flex items-stretch gap-[18px] w-full mb-[16px]">
        {/* 일별 방문자 */}
        <div className="flex justify-between flex-col w-[25%] py-[20px] px-[20px] rounded-[20px] bg-white br-[#EEF4FF] border-2 relative overflow-hidden">
          <div className="flex justify-between items-start gap-2 mb-[8px] ">
            <p className="text-[24px] font-bold text-black ]">일별 방문자 </p>
          </div>
          <div className="flex justify-between items-end gap-2">
            <p className="text-[50px] font-medium text-black leading-none">1200</p>
            <UserCount style={{ width: '80px',position:'relative',bottom:'-20px' }} />
          </div>
        </div>
        {/* 질문 개수 */}
        <div className="flex justify-between flex-col w-[25%] py-[20px] px-[20px] rounded-[20px] bg-white br-[#EEF4FF] border-2 relative overflow-hidden">
          <div className="flex justify-between items-start gap-2 mb-[8px] ">
            <p className="text-[24px] font-bold text-black ]">질문 개수</p>
          </div>
          <div className="flex justify-between items-end gap-2">
            <p className="text-[50px] font-medium text-black leading-none">1200</p>
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