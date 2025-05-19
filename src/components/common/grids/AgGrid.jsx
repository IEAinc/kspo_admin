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

  // 상위 데이터의 총 개수 자동 계산

// 상위 데이터의 총 개수
  const totalItems = props.rowData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // 데이터를 슬라이싱하고 페이지 상태 조정
  useEffect(() => {
    // 현재 페이지가 유효 범위를 벗어나면 마지막 유효 페이지로 이동
    if (currentPage > totalPages && totalItems > 0) {
      setCurrentPage(totalPages);
    } else {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setDisplayData(props.rowData.slice(startIndex, endIndex));
    }
  }, [props.rowData, pageSize, currentPage, totalPages]);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // 현재 페이지를 유효 범위 내로 업데이트
    }
  };
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize); // 페이지 크기 업데이트
    setCurrentPage(1); // 페이지 크기 변경 시 첫 페이지로 이동
  };

  const handleDeleteSelectedRows = () => {
    if (!gridRef.current || !gridRef.current.api) {
      console.warn("Grid 초기화가 안 되었습니다.");
      return;
    }

    const selectedRows = gridRef.current.api.getSelectedRows();
    console.log("선택한 행들:", selectedRows);

    if (!selectedRows || selectedRows.length === 0) {
      alert("삭제할 행을 선택해주세요.");
      return;
    }

    const updatedData = props.rowData.filter(
      (row) => !selectedRows.includes(row)
    );
    console.log("업데이트된 데이터:", updatedData);

    if (props.onDataUpdate) {
      console.log("onDataUpdate 호출 중...");
      props.onDataUpdate(updatedData); // 부모로 데이터 전달
    } else {
      console.error("onDataUpdate prop이 전달되지 않음");
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
          rowSelection="multiple" // 다중 행 선택 가능
          onGridReady={(params) => {
            gridRef.current = params.api;
            params.api.sizeColumnsToFit(); // 컨테이너 폭에 맞춰 열 크기 조정
          }}
          onFirstDataRendered={(params) => {
            params.api.sizeColumnsToFit(); // 컬럼 기본 폭 맞추기
            const allColumnIds = params.columnApi.getAllColumns().map(col => col.getId());
            params.columnApi.autoSizeColumns(allColumnIds); // 데이터 기반 컬럼 자동 너비
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