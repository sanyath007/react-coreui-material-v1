import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader, Table } from 'reactstrap';

import { fetchIcd10s } from '../../redux/icd10';
import Pagination from '../Paginations/Pagination';

class ModalICD10s extends Component {
  static propType = {
    patients: PropTypes.array.isRequired,
    pager: PropTypes.object.isRequired,
    fetchIcd10s: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.fetchIcd10s();
  }

  handlePaginateLink = (e, link) => {
    e.preventDefault();

    this.props.fetchIcd10s(link);
  }

  render() {
    const { modal, toggle, className, icd10s, pager, onModalSelected } = this.props;

    return (
      <Modal
        isOpen={modal}
        toggle={toggle}
        size="lg"
        id="modal-icd10s"
        className={className}
      >
        <ModalHeader toggle={toggle}>เลือกผู้ป่วย</ModalHeader>
        <ModalBody>
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>ICD10</th>
                <th>Description</th>
                <th>Remark</th>
                <th>เลือก</th>
              </tr>
            </thead>
            <tbody>
              { icd10s && icd10s.map((icd10, index) => {
                return (
                  <tr key={icd10.code}>
                    <td>{index + 1}</td>
                    <td>{icd10.code}</td>
                    <td>{icd10.name}</td>
                    <td>{icd10.tname}</td>
                    <td>
                      <button className="btn btn-success" onClick={(e) => onModalSelected(e, icd10)}>
                        เลือก
                      </button>
                    </td>
                  </tr>
                )
              })}
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
  icd10s: state.icd10.icd10s,
  pager: state.icd10.pager,
});

export default connect(
  mapStateToProps,
  { fetchIcd10s }
)(ModalICD10s);
