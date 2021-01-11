import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';

import { fetchItemsWithPagination } from '../../redux/items';
import { fetchItemTypes } from '../../redux/itemTypes';

import Pagination from '../../components/Paginations/Pagination';

class List extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    pager: PropTypes.object,
    isSuccess: PropTypes.object,
    isError: PropTypes.any,
    itemTypes: PropTypes.array.isRequired,
    fetchItemsWithPagination: PropTypes.func.isRequired,
    fetchItemTypes: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchItemsWithPagination();
    this.props.fetchItemTypes();
  }

  handlePaginateLink = (e, link) => {
    e.preventDefault();
    
    this.props.fetchItemsWithPagination(link);
  }

  handleEdit = (e, id) => {
    e.preventDefault();
    /** Fetch item data to edit */
    this.props.fetchItem(id);
    /** Redirect to items edit view */
    this.props.history.push(`/items/edit/${id}`)
  }

  handleDelete = (e, id) => {
    e.preventDefault();

    if(window.confirm(`Are you sure to delete this items (ID: ${id}) ?`)) {
      //TODO: To do delete item
      // this.props.deleteItem(id)
    }
  }

  render() {
    const { items, pager, isSuccess, isError, itemTypes } = this.props;
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Items <small className="text-muted">example</small>
                <Link to="/items/new" className="btn btn-primary btn-sm float-right">
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

                <div className="form-group">
                  <select className="form-control">
                    <option value="">-- กรุณาเลือก --</option>
                    {itemTypes && itemTypes.map(type => (
                      <option value={type.id} key={type.id}>{type.name}</option>
                    ))}
                  </select>  
                </div>

                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '5%' }}>รหัส</th>
                      <th scope="col">รายการวัสดุ</th>
                      <th scope="col" style={{ width: '8%' }}>หน่วย</th>
                      <th scope="col" style={{ width: '8%' }}>ราคา</th>
                      <th scope="col" style={{ width: '8%' }}>คงเหลือ</th>
                      <th scope="col" style={{ width: '15%' }}>กลุ่ม</th>
                      <th scope="col" style={{ width: '15%' }}>ประเภท</th>
                      <th scope="col" style={{ textAlign: 'center', width: '10%' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    { items && items.map(item => (
                      <tr key={item.id}>
                        <td>{ item.id }</td>
                        <td>{ item.name }</td>
                        <td>{ item.unit }</td>
                        <td>{ item.cost }</td>
                        <td>{ item.balance }</td>
                        <td>{ item.item_group.group_name }</td>
                        <td>{ item.item_type.name }</td>
                        <td style={{ textAlign: "center" }}>
                          <Link
                            to={`/items/edit/${item.id}`}
                            className="btn btn-warning btn-sm mr-1"
                            onClick={e => this.handleEdit(e, item.id)}
                          >
                            <i className="fa fa-edit"></i>
                          </Link>
                          <Link 
                            to={`/items/delete/${item.id}`}
                            className="btn btn-danger btn-sm"
                            onClick={e => this.handleDelete(e, item.id)}
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
  items: state.item.items,
  pager: state.item.pager,
  isSuccess: state.item.success,
  isError: state.item.errors,
  itemTypes: state.itemType.itemTypes
});

export default connect(
  mapStateToProps, {
    fetchItemsWithPagination,
    fetchItemTypes
  }
)(List);
