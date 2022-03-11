import React, { useState, useEffect } from 'react';
import './App.css';
import Absences from './api/json_files/absences.json'
import PageData from './components/absenceTable';
import Pagination from './components/Pagination';


const App=()=> {
  const [absencesDetails,setAbsencesDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalLength, setTotalLength] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setAbsencesDetails(Absences.payload);
      setTotalLength(Absences.payload.length);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * rowPerPage;
  const indexOfFirstPost = indexOfLastPost - rowPerPage;
  const currentTableRow = absencesDetails.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container mt-5'>
      <PageData absenceData={currentTableRow} loading={loading} />
      <Pagination
        rowPerPage={rowPerPage}
        totalPosts={absencesDetails.length}
        pageLength={paginate} />
      <p>Total Number Of Absences- {totalLength}</p>
    </div>
  );
};
export default App;
