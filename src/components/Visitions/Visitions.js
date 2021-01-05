import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchVisitions, fetchVisition, deleteVisition, hideAlert } from '../../redux/visitions';

import Notification from './../Notifications/Notification';
import Pagination from '../Paginations/Pagination';

class Visitions extends Component {
  static propTypes = {
    visitions: PropTypes.array.isRequired,
    pager: PropTypes.object,
    isSuccess: PropTypes.any,
    isError: PropTypes.any,
    fetchVisitions: PropTypes.func.isRequired,
    fetchVisition: PropTypes.func.isRequired,
    deleteVisition: PropTypes.func.isRequired,
    hideAlert: PropTypes.func
  };

  componentDidMount() {
    this.props.fetchVisitions()
  }

  handlePaginateLink = (e, link) => {
    e.preventDefault();
    
    this.props.fetchVisitions(link);
  }

  handleEdit = (e, id) => {
    e.preventDefault();

    this.props.fetchVisition(id);

    this.props.history.push(`/visitions/edit/${id}`)
  }

  handleDelete = (e, id) => {
    e.preventDefault();

    if(window.confirm(`Are you sure to delete this visitions (ID: ${id}) ?`)) {
      this.props.deleteVisition(id)
    }
  }
  
  render() {
    const { visitions, pager, isSuccess, isError } = this.props;

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
                <i className="fa fa-align-justify"></i> Visitions <small className="text-muted">example</small>
                <Link to="/visitions/new" className="btn btn-primary btn-sm float-right">
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
                {/* #========== Spinner ==========# */}

                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col" className="text-center">#</th>
                      <th scope="col" className="text-center">ครั้งที่</th>
                      <th scope="col" className="text-center">วันที่</th>
                      <th scope="col">ชื่อ-สกุล</th>
                      <th scope="col" className="text-center">อายุ</th>
                      {/* <th scope="col">บุคลากร</th> */}
                      <th scope="col" className="text-center">Barthel</th>
                      {/* <th scope="col">Impairment</th>
                      <th scope="col">Complication</th>
                      <th scope="col">ได้รับการ Rehab</th> */}
                      <th scope="col" className="text-center">สถานะ</th>
                      <th scope="col" className="text-center">File</th>
                      <th scope="col" className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitions.map((visit, index) => (
                      <tr key={visit.id+visit.visit_date}>
                        <td className="text-center">{index+1}</td>
                        <td className="text-center">{visit.visit_count}</td>
                        <td className="text-center">{visit.visit_date}</td>
                        <td>{visit.pname + visit.fname + ' ' + visit.lname}</td>
                        <td className="text-center">{visit.age_y}</td>
                        {/* <td>{visit.visitors}</td> */}
                        <td className="text-center">{visit.barthel_score}</td>
                        {/* <td>{visit.impairment}</td> */}
                        {/* <td>{visit.complication}</td> */}
                        {/* <td>{visit.isRehab}</td> */}
                        <td className="text-center">{visit.visit_status}</td>
                        <td className="text-center"><i className="material-icons">attachment</i></td>
                        <td className="text-center">
                          <Link
                            to={`/visitions/edit/${visit.id}`}
                            className="btn btn-warning btn-sm mr-1"
                            onClick={e => this.handleEdit(e, visit.id)}
                          >
                            <i className="fa fa-edit"></i>
                          </Link>
                          <Link 
                            to={`/visitions/delete/${visit.id}`}
                            className="btn btn-danger btn-sm"
                            onClick={e => this.handleDelete(e, visit.id)}
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
  visitions: state.visition.visitions,
  pager: state.visition.pager,
  isSuccess: state.visition.success,
  isError: state.visition.errors
});

export default connect(
  mapStateToProps,
  { fetchVisitions, fetchVisition, deleteVisition, hideAlert }
)(Visitions);
