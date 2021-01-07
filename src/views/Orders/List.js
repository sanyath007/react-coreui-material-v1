import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import { fetchOrders } from '../../redux/orders';
import Pagination from '../../components/Paginations/Pagination';

class List extends Component {
  static propTypes = {
    orders: PropTypes.array.isRequired,
    pager: PropTypes.object,
    isSuccess: PropTypes.object,
    isError: PropTypes.any,
    fetchOrders: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchOrders();
  }

  handlePaginateLink = (e, link) => {
    e.preventDefault();
    
    this.props.fetchItems(link);
  }

  handleEdit = (e, id) => {
    e.preventDefault();

    // this.props.fetchItem(id);

    // this.props.history.push(`/items/edit/${id}`)
  }

  handleDelete = (e, id) => {
    e.preventDefault();

    if(window.confirm(`Are you sure to delete this items (ID: ${id}) ?`)) {
      // this.props.deletePatient(id)
    }
  }

  render() {
    const { orders, pager, isSuccess, isError } = this.props;
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> รายการเบิกวัสดุ <small className="text-muted">example</small>
                <Link to="/orders/new" className="btn btn-primary btn-sm float-right">
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

                {/* <div className="form-group">
                  <select className="form-control">
                    <option value="">-- กรุณาเลือก --</option>
                    {itemTypes && itemTypes.map(type => (
                      <option value={type.id} key={type.id}>{type.name}</option>
                    ))}
                  </select>  
                </div> */}

                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '5%' }}>รหัส</th>
                      <th scope="col" style={{ width: '10%' }}>เลขที่เบิก</th>
                      <th scope="col">รายการวัสดุ</th>
                      <th scope="col" style={{ width: '10%' }}>วันที่</th>
                      <th scope="col" style={{ width: '8%' }}>เวลา</th>
                      <th scope="col" style={{ width: '8%' }}>จน.ที่เบิก</th>
                      <th scope="col" style={{ textAlign: 'center', width: '10%' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    { orders && orders.map(order => (
                      <tr key={order.id}>
                        <td>{ order.id }</td>
                        <td>{ order.order_no }</td>
                        <td>{ order.order_date }</td>
                        <td>{ order.order_date }</td>
                        <td>{ order.cost }</td>
                        <td>{ order.balance }</td>
                        <td style={{ textAlign: "center" }}>
                          <Link
                            to={`/orders/edit/${order.id}`}
                            className="btn btn-warning btn-sm mr-1"
                            onClick={e => this.handleEdit(e, order.id)}
                          >
                            <i className="fa fa-edit"></i>
                          </Link>
                          <Link 
                            to={`/orders/delete/${order.id}`}
                            className="btn btn-danger btn-sm"
                            onClick={e => this.handleDelete(e, order.id)}
                          >
                            <i className="fa fa-trash-o"></i>
                          </Link> 
                        </td>
                      </tr>
                    )) }
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
  orders: state.order.orders,
  pager: state.item.pager,
  isSuccess: state.item.success,
  isError: state.item.errors
});

export default connect(
  mapStateToProps, {
    fetchOrders
  }
)(List);
