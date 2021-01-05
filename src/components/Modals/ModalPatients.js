import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader, Table } from 'reactstrap';

import { fetchPatients } from '../../redux/patients';
import Pagination from '../Paginations/Pagination';

class ModalPatients extends Component {
  static propType = {
    patients: PropTypes.array.isRequired,
    pager: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.fetchPatients();
  }

  handlePaginateLink = (e, link) => {
    e.preventDefault();

    console.log(link)
    this.props.fetchPatients(link);
  }

  render() {
    const { modal, toggle, className, patients, pager, onModalSelected } = this.props;

    return (
      <Modal
        isOpen={modal}
        toggle={toggle}
        size="lg"
        id="modal-patients"
        className={className}
      >
        <ModalHeader toggle={toggle}>เลือกผู้ป่วย</ModalHeader>
        <ModalBody>
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>PID</th>
                <th>CID</th>
                <th>ชื่อ-สกุล</th>
                <th>อายุ</th>
                <th>เลือก</th>
              </tr>
            </thead>
            <tbody>
              { patients && patients.map(patient => (
                <tr key={patient.id+patient.hn}>
                  <td>{patient.id}</td>
                  <td>{patient.pid}</td>
                  <td>{patient.cid}</td>
                  <td>{patient.pname + patient.fname + ' ' + patient.lname}</td>
                  <td>{patient.age_y}</td>
                  <td>
                    <button className="btn btn-success" onClick={(e) => onModalSelected(e, patient)}>
                      เลือก
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
  
          { pager && (
            <Pagination pager={pager} onPaginateLink={this.handlePaginateLink} />
          )}
        </ModalBody>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  patients: state.patient.patients,
  pager: state.patient.pager,
});

export default connect(
  mapStateToProps,
  { fetchPatients }
)(ModalPatients);
