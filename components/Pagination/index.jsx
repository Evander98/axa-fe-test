import React from "react";
import Button from "../Button";

const Pagination = ({paging, isNext}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <Button
        label="Prev Page"
        onClick={() => paging.setCurrentPage(paging.currentPage - 1)}
        disabled={paging.currentPage === 1}
      />
      <p>{paging.currentPage}</p>
      <Button
        label="Next Page"
        onClick={() => paging.setCurrentPage(paging.currentPage + 1)}
        disabled={!isNext}
      />
    </div>
  );
};

export default Pagination;
