import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchRegistrations, fetchRegistration, deleteRegistration, hideAlert } from '../../redux/registrations';

import Notification from './../Notifications/Notification';
import Pagination from '../Paginations/Pagination';

class Registrations extends Component {
  static propTypes = {
    registrations: PropTypes.array.isRequired,
    pager: PropTypes.object,
    isSuccess: PropTypes.any,
    isError: PropTypes.any,
    fetchRegistrations: PropTypes.func.isRequired,
    fetchRegistration: PropTypes.func.isRequired,
    deleteRegistration: PropTypes.func.isRequired,
    hideAlert: PropTypes.func,
  };

  componentDidMount() {
    this.props.fetchRegistrations()
  }

  handlePaginateLink = (e, link) => {
    e.preventDefault();
    
    this.props.fetchPatients(link);
  }

  handleEdit = (e, id) => {
    e.preventDefault();

    this.props.fetchRegistration(id);

    this.props.history.push(`/registrations/edit/${id}`)
  }

  handleDelete = (e, id) => {
    e.preventDefault();

    if(window.confirm(`Are you sure to delete this registration (ID: ${id}) ?`)) {
      this.props.deleteRegistration(id)
    }
  }
  
  render() {
    const { registrations, pager, isSuccess, isError } = this.props;
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" sm="6">

            { isSuccess && isSuccess.status && (
              <Notification
                type={ 'success' }
                message={ isSuccess.message }
                toggle={() => this.props.hideAlert()} />
            )}
            
            { isError && (
              <Notification
                type={ 'danger' }
                message={ isError.message }
                toggle={() => this.props.hideAlert()} />
            )}

            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> 
                Registrations <small className="text-muted">example</small>
                <Link to="/registrations/new" className="btn btn-primary btn-sm float-right">
                  <i className="fa fa-user-plus"></i> เพิ่ม
                </Link>
              </CardHeader>
              <CardBody>
                {/* #========== Spinner ==========# */}
                <div className="sk-three-bounce">
                  <div className="sk-child sk-bounce1"></div>
                  <div className="sk-child sk-bounce2"></div>
                  <div className="sk-child sk-bounce3"></div>
                </div>

                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">ชื่อ-สกุล</th>
                      <th scope="col">อายุ</th>
                      {/* <th scope="col">เลขบัตรประชาชน</th> */}
                      {/* <th scope="col">เบอร์ติดต่อผู้ป่วย</th> */}
                      <th scope="col">วินิจฉัยโรค</th>
                      {/* <th scope="col">วันที่เริ่มวินิจฉัย</th> */}
                      <th scope="col">รพ.แม่ข่าย (D/C)</th>
                      {/* <th scope="col">วันที่ D/C</th> */}
                      <th scope="col">PCU (รับดูแล)</th>
                      {/* <th scope="col">วันที่รับ Case</th> */}
                      <th scope="col" className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map(regis => (
                      <tr key={regis.id+regis.pid}>
                        <td>{regis.id}</td>
                        <td>{regis.pname + regis.fname + ' ' + regis.lname}</td>
                        <td>{regis.age_y}</td>
                        {/* <td>{regis.cid}</td>
                        <td>{regis.tel}</td> */}
                        <td>{regis.dx}</td>
                        {/* <td>{regis.dxDate}</td> */}
                        <td>{regis.dch_hosp}</td>
                        {/* <td>{regis.dchDate}</td> */}
                        <td>{regis.pcu}</td>
                        {/* <td>{regis.regDate}</td> */}
                        <td className="text-center">
                          <Link
                            to={`/registrations/edit/${regis.id}`}
                            className="btn btn-warning btn-sm mr-1"
                            onClick={e => this.handleEdit(e, regis.id)}
                          >
                            <i className="fa fa-edit"></i>
                          </Link>
                          <Link 
                            to={`/registrations/delete/${regis.id}`}
                            className="btn btn-danger btn-sm"
                            onClick={e => this.handleDelete(e, regis.id)}
                          >
                            <i className="fa fa-trash-o"></i>
                          </Link> 
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                
                { pager && (
                  <Pagination pager={pager} onPaginateLink={this.handlePaginateLink} />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  registrations: state.registration.registrations,
  pager: state.registration.pager,
  isSuccess: state.registration.success,
  isError: state.registration.errors
});

export default connect(
  mapStateToProps,
  { fetchRegistrations, fetchRegistration, deleteRegistration, hideAlert }
)(Registrations);
