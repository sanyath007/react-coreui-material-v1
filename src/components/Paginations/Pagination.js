import React from 'react';
import { range } from 'lodash'

const Pagination = ({pager, onPaginateLink}) => {
  const setPageItemClass = (link) => link ? "page-item" : "page-item disabled";
  const setCurrentPageClass = (currentPage, page) => page === currentPage ? "page-item active" : "page-item";

  const { current_page, last_page} = pager;
  let startPage, endPage;
  if (last_page <= 10) { // less than 10 total pages so show all
    startPage = 1;
    endPage = last_page;
  } else { // more than 10 total pages so calculate start and end pages
    if (current_page <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (current_page + 4 >= last_page) {
      startPage = last_page - 9;
      endPage = last_page;
    } else {
      startPage = current_page - 5;
      endPage = current_page + 4;
    }
  }
  
  let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

  return (
    <nav aria-label="..." className="float-right">
      <ul className="pagination">
        <li className={setPageItemClass(pager.prev_page_url)}>
          <a className="page-link" href="#" onClick={e => onPaginateLink(e, pager.prev_page_url)}>Previous</a>
        </li>

        { pages.map((page, index) => (
          <li className={setCurrentPageClass(current_page, page)} aria-current="page" key={index}>
            <a 
              className="page-link" 
              href="#"
              onClick={e => onPaginateLink(e, `${pager.path}?page=${page}`)}
            >
                {page} <span className="sr-only">(current)</span>
            </a>
          </li>                    
        ))}

        <li className={setPageItemClass(pager.next_page_url)}>
          <a 
            href="#"
            className="page-link"
            onClick={e => onPaginateLink(e, pager.next_page_url)}>Next</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
