import React, {useState} from 'react';
// 사용하는 컴포넌트 모음
import Pagination from './Pagination';
import PageSizeSelector from './PageSizeSelector';

const Grid = ({
                headers,
                rows,
                isWidth,
                selectBoxWidth,
                onPageChange,
                onCurrentRowsChange,
              }) => {
  /*  1.pagination 관련 설정 */
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [pageSize, setPageSize] = useState(10); // 페이지당 데이터 수

  // 현재 페이지에 해당하는 데이터를 계산
  const startIndex = (currentPage - 1) * pageSize;
  const currentRows = rows.slice(startIndex, startIndex + pageSize);

  // 페이지 변경 시 상위 컴포넌트로 알림
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  // 데이터 변경 시 상위 컴포넌트로 알림
  const handleRowsChange = () => {
    if (onCurrentRowsChange) {
      onCurrentRowsChange(currentRows); // 현재 페이지 행 데이터 전달
    }
  };

  // 페이지나 데이터 변경 시 알림
  // React.useEffect(() => {
  //   handleRowsChange();
  // }, [currentRows]);


  return (
    <div className="w-full">
      <div className="w-full rounded-md border border-tb-br-color overflow-auto">
        <table className="w-full min-w-[1200px]">
          {/* 헤더 */}
          <thead className="border-b tb-br-color">
          <tr>
            {headers.map((header, index) => (
              <TableHeaderCell key={index} label={header.label} index={index} />
            ))}
          </tr>
          </thead>

          {/* 본문 */}
          <tbody>
          {currentRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t tb-br-color">
              {headers.map((header, colIndex) => (
                <TableRowCell
                  key={colIndex}
                  index={colIndex}
                  content={
                    header.render
                      ? header.render(
                        row[header.key], // value (key에 해당하는 데이터, 여기선 undefined)
                        row,             // 현재 행 데이터
                        rowIndex,        // 현재 페이지의 행 번호
                        currentPage,     // 현재 페이지 번호
                        pageSize         // 페이지당 데이터 수
                      )
                      : row[header.key]
                  }
                  align={header.align}
                  color={
                    typeof header.color === 'function'
                      ? header.color(row[header.key])
                      : header.color
                  }
                />
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      {/* Pagination & PageSize Options */}
      <div className="mt-[12px] flex items-center justify-center relative">
        <Pagination
          currentPage={currentPage}
          totalItems={rows.length}
          pageSize={pageSize}
          onPageChange={handlePageChange} // 페이지 변경 시 호출
        />
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <PageSizeSelector
            pageSize={pageSize}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1); // 페이지 크기가 변하면 첫 페이지로 이동
            }}
            isWidth={isWidth}
            width={selectBoxWidth}
          />
        </div>
      </div>
    </div>
  );
};

// 테이블 헤더 셀 컴포넌트
const TableHeaderCell = ({ label, index }) => {
  return (
    <th
      className={`p-[10px] bg-tb-bg-color ${
        index !== 0 ? 'border-l border-l-tb-br-color' : '' // 첫 번째 셀에는 border-l을 제외
      }`}
    >
      <div className="flex items-center justify-center text-[14px] text-center text-gray1 font-bold">
        {label}
      </div>
    </th>
  );
};

// 테이블 본문 셀 컴포넌트
const TableRowCell = ({ content, align = 'center', color = '', index }) => {
  const justifyClass = align === 'center' ? 'justify-center' : align === 'left' ? 'justify-start' : 'justify-end';
  const colorClass = color || 'text-black'; // 기본값 black

  return (
    <td
      className={`py-[9px] px-[8px] bg-white ${index !== 0 ? 'border-l border-l-tb-br-color' : ''}`}
    >
      <div
        className={`flex items-center ${justifyClass} text-[14px] ${colorClass} font-normal`}
      >
        {content}
      </div>
    </td>
  );
};

export default Grid;