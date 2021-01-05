import React from 'react';
import PropTypes from 'prop-types';

const DataTable = ({ visitions }) => (
  <table className="table mb-0">
    <thead className="bg-light">
      <tr>
        <th scope="col" className="border-0">
          #
        </th>
        <th scope="col" className="border-0">
          ครั้งที่
        </th>
        <th scope="col" className="border-0">
          วันที่
        </th>
        <th scope="col" className="border-0">
          ชื่อ-สกุล
        </th>
        <th scope="col" className="border-0">
          อายุ
        </th>
        <th scope="col" className="border-0">
          บุคลากร
        </th>
        <th scope="col" className="border-0">
          Barthel Score
        </th>
        <th scope="col" className="border-0">
          Impairment
        </th>
        <th scope="col" className="border-0">
          Complication
        </th>
        <th scope="col" className="border-0">
          ได้รับการ Rehab
        </th>
        <th scope="col" className="border-0">
          สถานะ
        </th>
        <th scope="col" className="border-0">
          File
        </th>
        <th scope="col" className="border-0">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      {visitions.map(visit => (
        <tr key={visit.id}>
          <td>{visit.id}</td>
          <td>{visit.visitCount}</td>
          <td>{visit.visitDate}</td>
          <td>{visit.name}</td>
          <td>{visit.age}</td>
          <td>{visit.visitors}</td>
          <td>{visit.barthelScore}</td>
          <td>{visit.impairment}</td>
          <td>{visit.complication}</td>
          <td>{visit.isRehab}</td>
          <td>{visit.visitStatus}</td>
          <td className="text-center"><i className="material-icons">attachment</i></td>
          <td className="text-center">
            <i className="material-icons">edit</i>
            <i className="material-icons">delete</i>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default DataTable;
