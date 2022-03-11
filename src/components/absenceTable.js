import React, { useState,useEffect } from 'react';
import Members from '../api/json_files/members.json'

const PageData = ({ absenceData, loading  }) => {
    const [order,setOrder] =  useState("ASC");
    const [data,setData] =  useState(absenceData);
    useEffect(() => {
        setData(absenceData);
    }, [absenceData])
    if (absenceData.length === 0) {
        return <h2>Empty...</h2>;
      }
    if (loading) {
        return <h2>Loading...</h2>;
    }
  
  const styles = {
    table :{
        fontFamily: 'arial',
        width: '100%',
      },
      th :{
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '8px',
        width:'20%',
      },
      td :{
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '8px',
      },
  }
 
  const MemberName = (memberUserId) => {
    const findMemberName=Members.payload.filter((memberId) => memberId.userId === memberUserId);
    return findMemberName[0].name;
}
  const diffStartEndDates = (startDate, endDate) => {
    const startDateAbsence = new Date(startDate);
    const endDateAbsence = new Date(endDate);
    const absencePeriod=parseInt((endDateAbsence - startDateAbsence) / (1000 * 60 * 60 * 24), 10);
    return  absencePeriod === 0?1:absencePeriod;
}
const checkStatus = (confirmedStatus, rejectedStatus) => {
    return confirmedStatus == null?rejectedStatus==null?"Requested":"Rejected":"Confirmed";
}

const sorting= (col) =>{
    if(order ==="ASC"){
        const sorted=[...absenceData].sort((a,b)=>
        a[col].toLowerCase() > b[col].toLowerCase()?1:-1
        );
        setData(sorted);
        setOrder("DSC");
    }
    if(order ==="DSC"){
        const sorted=[...absenceData].sort((a,b)=>
        a[col].toLowerCase() < b[col].toLowerCase()?1:-1
        );
        setData(sorted);
        setOrder("ASC");
    }
};
  return (
    <div className='container' style={{listStyle: "none"}}>
        <table style={styles.table} className='table table-bordered'>
            <thead>
            <tr>
                <th style={styles.th}>Member Name</th>
                <th style={styles.th} onClick={()=>sorting("type")}>Type Of Absence</th>
                <th style={styles.th} onClick={()=>sorting("startDate")}>Start Date</th>
                <th style={styles.th} onClick={()=>sorting("endDate")}>End Date</th>
                <th style={styles.th}>Period</th>
                <th style={styles.th}>Member Note</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Admitter Note</th>
            </tr>
            </thead>
            <tbody>
        {data.map(post => (
            <tr style={styles.id} key={post.id}>
                <td style={styles.td}>
                    {MemberName(post.userId)}
                </td>
                <td style={styles.td}>
                    {post.type}
                </td>
                <td style={styles.td}>
                    {post.startDate}
                </td>
                <td style={styles.td}>
                    {post.endDate}
                </td>
                <td style={styles.td}>
                    {diffStartEndDates(post.startDate, post.endDate)}     
                </td>
                <td style={styles.td}>
                    {post.memberNote}
                </td>
                <td style={styles.td}>
                    {checkStatus(post.confirmedAt, post.rejectedAt)}
                </td>
                <td style={styles.td}>
                    {post.admitterNote}
                </td>
            </tr>
      ))}
      </tbody>  
  </table>
    </div>
  );
};

export default PageData;