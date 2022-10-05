import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";
import classes from "./paginator.module.scss";

type paginatorProps = { currentPage: number }

const Paginator: React.FC<paginatorProps> = ({ currentPage }) => {
  const dispatch = useDispatch();
  return (
    <>
      <ReactPaginate
        className={classes.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
        pageRangeDisplayed={3}
        pageCount={3}
        previousLabel="<"

        forcePage={currentPage - 1}
      />
    </>
  );
};

export default Paginator;
