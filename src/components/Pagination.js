import React from 'react';

const Pagination = ({ rowPerPage, totalPosts, pageLength }) => {
  const pageNumbers = [];

  const styles = {
    pagination  :{
      color: 'black',
      padding: '8px 16px',
      textDecoration: 'none',
      listStyle: "none",
    },
      a:{
      color: 'black',
      float: 'left',
      padding: '8px 16px',
      textDecoration: 'none',
      listStyle:'none',
      }
  }

  for (let i = 1; i <= Math.ceil(totalPosts / rowPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
      <div className='pagination' style={styles.pagination}>
        {pageNumbers.map(number => (
          <li key={number}  className='page-item'>
            <a onClick={() => pageLength(number)} href='#'  style={styles.a} className='page-link'>
              {number}
            </a>
          </li>
        ))}
    </div>
  );
};

export default Pagination;