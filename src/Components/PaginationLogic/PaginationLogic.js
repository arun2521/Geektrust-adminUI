import React from "react";
import "../MainRoot/MainRoot.css";

export default function PaginationLogic({
  currentPage,
  totalPages,
  onPageChange,
  isSearching,
}) {
  const getPageNumbers = (totalPages) => {
    const pageNumbers = [];
    for (let currPage = 1; currPage <= totalPages; currPage++) {
      pageNumbers.push(currPage);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers(totalPages);

  return (
    <div className="pagination-container">
      <div className="pagination-pages">
        <span>
          Page {totalPages < 1 ? 0 : currentPage} of {totalPages}
        </span>
      </div>
      <div className="pagination-buttons">
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
          {"<<"}
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {pageNumbers.map(
          (pageNumber) =>
            (!isSearching || currentPage === pageNumber) && (
              <button key={pageNumber} onClick={() => onPageChange(pageNumber)}>
                {pageNumber}
              </button>
            )
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
