import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchItems } from '../../redux/items';

import Pagination from '../../components/Paginations/Pagination';

class Items extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    pager: PropTypes.object,
    isSuccess: PropTypes.object,
    isError: PropTypes.any,
    fetchItems: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchItems();
  }

  handlePaginateLink = (e, link) => {
    e.preventDefault();
    
    this.props.fetchItems(link);
  }

  handleEdit = (e, id) => {
    e.preventDefault();

    this.props.fetchItem(id);

    this.props.history.push(`/items/edit/${id}`)
  }

  handleDelete = (e, id) => {
    e.preventDefault();

    if(window.confirm(`Are you sure to delete this items (ID: ${id}) ?`)) {
      // this.props.deletePatient(id)
    }
  }

  render() {
    const { items, pager, isSuccess, isError } = this.props;
    
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

                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Unit</th>
                      <th scope="col">Cost</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    { items && items.map(item => (
                      <tr key={item.id}>
                        <td>{ item.id }</td>
                        <td>{ item.name }</td>
                        <td>{ item.unit }</td>
                        <td>{ item.cost }</td>                        
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
  isError: state.item.errors
});

export default connect(
  mapStateToProps,
  { fetchItems }
)(Items);
