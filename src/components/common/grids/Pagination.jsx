import First from '../../../assets/images/icon/ico_arrow_first.svg?react';
import Prev from '../../../assets/images/icon/ico_arrow_prev.svg?react';
import Next from '../../../assets/images/icon/ico_arrow_next.svg?react';
import Last from '../../../assets/images/icon/ico_arrow_last.svg?react';

const Pagination = ({ currentPage, totalItems, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  // 페이지 변경 핸들러
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page); // 부모에게 페이지 변경 요청 전달
    }
  };

  // 페이지 번호 계산 로직 (중간에 `...` 포함)
  const getPageNumbers = () => {
    const maxVisiblePages = 7; // 최대 보여줄 페이지 수
    const pages = [];

    // 1. 전체 페이지가 maxVisiblePages 이하일 경우 모두 표시
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 2. 현재 페이지 기준으로 범위를 조정
      const leftBoundary = Math.max(2, currentPage - 2);
      const rightBoundary = Math.min(totalPages - 1, currentPage + 2);

      pages.push(1); // 항상 첫 번째 페이지는 표시

      // 왼쪽에 `...` 추가
      if (leftBoundary > 2) {
        pages.push('left-ellipsis');
      }

      // 현재 페이지 기준 중간 페이지들 추가
      for (let i = leftBoundary; i <= rightBoundary; i++) {
        pages.push(i);
      }

      // 오른쪽에 `...` 추가
      if (rightBoundary < totalPages - 1) {
        pages.push('right-ellipsis');
      }

      pages.push(totalPages); // 마지막 페이지는 항상 표시
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center">
      {/* 처음으로 이동 */}
      <button
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
        className={`flex`}
      >
        <First className="w-[28px] h-[28px]" />
        <span className="sr-only">처음으로</span>
      </button>

      {/* 이전 페이지 */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex mr-[8px]`}
      >
        <Prev className="w-[28px] h-[28px]" />
        <span className="sr-only">이전으로</span>
      </button>

      {/* 페이지 번호 */}
      {pageNumbers.map((page, index) =>
        page === 'left-ellipsis' || page === 'right-ellipsis' ? (
          <span
            key={page + index} // 고유 key 설정 (key 충돌 방지)
            className="min-w-[28px] h-[28px] flex justify-center items-center text-center text-[14px] font-medium text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={page} // 숫자 페이지의 경우 page 자체를 key로 사용
            onClick={() => handlePageClick(page)}
            className={`min-w-[28px] h-[28px] flex justify-center items-center text-center text-[14px] font-medium ${
              currentPage === page
                ? 'bg-primary-blue text-white rounded-[4px]'
                : 'text-black border-black'
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* 다음 페이지 */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex ml-[8px]`}
      >
        <Next className="w-[28px] h-[28px]" />
        <span className="sr-only">다음으로</span>
      </button>

      {/* 마지막으로 이동 */}
      <button
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
        className={`flex`}
      >
        <Last className="w-[28px] h-[28px]" />
        <span className="sr-only">끝으로</span>
      </button>
    </div>
  );
};

export default Pagination;