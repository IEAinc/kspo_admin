import React, {useState, useRef, useEffect} from 'react';
// 사용하는 컴포넌트 모음
import Pagination from '../grids/Pagination.jsx'
import PageSizeSelector from "./PageSizeSelector.jsx";
import Btn from "../forms/Btn.jsx";
// Aggrid
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);// Register all community features
provideGlobalGridOptions({ theme: "legacy"});// Mark all grids as using legacy themes
// 엑셀 다운로드
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AgGrid = (props) => {
  const gridRef = useRef(null);
  const [gridApi, setGridApi] = useState(null);

  const defaultColDef = {
    flex: props.cellFlex ? 1 : false,
    sortable: !!props.sortable,
    filter: !!props.filter,
    resizable: !!props.resizable,
  }

  /* pagination 관련 설정 */
  const [pageSize, setPageSize] = useState(10); // 페이지당 데이터 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 (index 1 기반)
  const [displayData, setDisplayData] = useState([]); // 현재 페이지에 표시할 데이터
  
  // 상위 데이터의 총 개수
  const totalItems = props.rowData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // 데이터를 슬라이싱하고 페이지 상태 조정
  useEffect(() => {
    const calculatedTotalPages = Math.ceil(props.rowData.length / pageSize);

    if (currentPage > calculatedTotalPages && totalItems > 0) {
      if (currentPage !== calculatedTotalPages) { // 현재 페이지를 한 번만 업데이트
        setCurrentPage(calculatedTotalPages);
      }
    } else {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setDisplayData(props.rowData.slice(startIndex, endIndex));
    }
  }, [props.rowData, pageSize, currentPage, totalItems]);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // 현재 페이지를 유효 범위 내로 업데이트
    }
  };
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize); // 페이지 크기 업데이트
    setCurrentPage(1); // 페이지 크기 변경 시 첫 페이지로 이동
  };
  // 선택된 row 수정하기
  const handleEditSelectedRows=()=>{
    props.onEditClick(gridApi)
  }

  /* 선택된 row 삭제하기 */
  const handleDeleteSelectedRows = () => {
    if (!gridApi) {
      console.warn("Grid가 초기화되지 않았습니다.");
      return;
    }

    const selectedRows = gridApi.getSelectedRows();
    console.log("선택한 행들:", selectedRows);

    // if (!selectedRows || selectedRows.length === 0) {
    //   alert("삭제할 행을 선택해주세요.");
    //   return;
    // }

    // 고유 ID를 기준으로 데이터 필터링
    const updatedData = props.rowData.filter(
      (row) => !selectedRows.some((selected) => selected.id === row.id) // ID 기준으로 매칭
    );

    console.log("업데이트된 데이터:", updatedData);

    if (props.onDataUpdate) {
      props.onDataUpdate(updatedData,gridApi); // 부모로 데이터 전달
    } else {
      console.error("onDataUpdate prop이 전달되지 않았습니다.");
    }
  };

  /* 엑셀 내보내기 */
  const exportToExcel = (rowData, columnData) => {
    if (!rowData || rowData.length === 0) {
      alert('엑셀로 내보낼 데이터가 없습니다.');
      return;
    }

    // 1. 엑셀 헤더 (headerName) 추출
    const headers = columnData.map(col => col.headerName);

    // 2. 각 row에서 field 값 추출해 headerName 기준으로 정리
    const exportData = rowData.map((row, rowIndex) => {
      const newRow = {};
      columnData.forEach((col, colIndex) => {
        let value;
        // valueGetter가 있는 경우 계산해서 넣기
        if (typeof col.valueGetter === 'function') {
          value = col.valueGetter({
            data: row,
            node: { rowIndex },
            context: {
              currentPage: 1, // 필요시 실제 페이지 정보로 수정
              pageSize: rowData.length, // 필요시 실제 pageSize로 수정
            }
          });
        } else {
          value = row[col.field];
        }

        newRow[col.headerName] = value;
      });
      return newRow;
    });

    // 3. 워크시트 생성
    const worksheet = XLSX.utils.json_to_sheet(exportData, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // 4. 저장
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(blob, 'export.xlsx');
  };
  return (
    <div className="grid-box w-full">
      {
        props.indicator ?
          <div className="grid-indicator">
            <div className="total-count">
              {props.indicator.gridCount ? <p>총 {props.indicator.gridCount} 건</p> : null}
            </div>
            <div className="flex items-center justify-end gap-[6px] mb-[8px]">
              {
                props.indicator.excel ?
                  <Btn
                    size="xs"
                    minWidth="80px"
                    iconMode="excel"
                    onClick={() => exportToExcel(props.rowData,props.columnDefs)}
                  >
                    다운로드
                  </Btn>
                  :
                  null
              }
              {
                props.indicator.register ?
                  <Btn
                    size="xs"
                    colorMode={true}
                    iconMode="plus"
                    onClick={props.onRegisterClick}
                  >
                    등록
                  </Btn>
                  :
                  null
              }
              {
                props.indicator.edit ?
                  <Btn
                    size="xs"
                    onClick={handleEditSelectedRows}
                  >
                    수정
                  </Btn>
                  :
                  null
              }
              {
                props.indicator.delete ?
                  <Btn
                    size="xs"
                    textColor='text-point-color'
                    onClick={handleDeleteSelectedRows}
                  >
                    삭제
                  </Btn>
                  :
                  null
              }
            </div>
          </div>
          :
          null
      }
      <div className="ag-theme-alpine w-full" style={{ height: props.height }}>
        <AgGridReact
          ref={gridRef}
          rowData={displayData}
          columnDefs={props.columnDefs}
          headerHeight={40}
          defaultColDef={defaultColDef}
          suppressMovableColumns={true} // 셀 이동 비활성화
          context={{
            currentPage: currentPage, // 현재 페이지
            pageSize: pageSize,       // 한 페이지당 데이터 크기
          }}
          // 아래 두 옵션으로 체크박스 활성화
          rowSelection={{
            mode: props.isCheckboxMode ? 'multiRow' : 'single',
            enableSelectionWithoutKeys: true,
          }}
          onGridReady={(params) => {
            gridRef.current = params.api;
            setGridApi(params.api); // API를 상태로 저장
            console.log(gridRef.current,'gridRef.current')
            // 체크박스 컬럼 아이디 찾기
            const checkboxColumn = params.columnApi.getAllColumns().find(col => col.getColDef().checkboxSelection);
            if (checkboxColumn) {
              // 너비 50으로 고정
              params.columnApi.setColumnWidth(checkboxColumn.getId(), 50);
              params.columnApi.setColumnPinned(checkboxColumn.getId(), 'left'); // 고정도 가능
            }

            // 나머지 컬럼 자동 조정
            const allColumns = params.columnApi.getAllColumns();
            const autoSizeColumnIds = allColumns
              .filter(col => !col.getColDef().checkboxSelection)
              .map(col => col.getId());

            params.columnApi.autoSizeColumns(autoSizeColumnIds);

          }}
          onFirstDataRendered={(params) => {
            // 체크박스 컬럼을 제외한 나머지 컬럼 아이디 구하기
            const allColumns = params.columnApi.getAllColumns();
            console.log(allColumns,'allColumns')
            const autoSizeColumnIds = allColumns
              .filter(col => !col.getColDef().checkboxSelection)
              .map(col => col.getId());
            // 체크박스 컬럼 제외한 컬럼만 자동 사이즈 조정
            params.columnApi.autoSizeColumns(autoSizeColumnIds);
          }}
          onGridSizeChanged={(params) => {
            setTimeout(function() {
              params.api.sizeColumnsToFit(); // 컨테이너 크기 변경 시 컬럼 크기 재조정
            },0);
          }}
        />
      </div>
      {/* 사용자 정의 Pagination 컴포넌트 */}
      <div className="mt-[12px] flex items-center justify-center relative">
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <PageSizeSelector
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
            width="60px"
          />
        </div>
      </div>
    </div>
  );
}

export default AgGrid;