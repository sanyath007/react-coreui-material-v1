import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Table
} from 'reactstrap';

import { fetchItems } from '../../redux/items';

class NewForm extends Component {
  constructor (props) {
    super(props);

    this.initialState = {
      order: {
        id: '',
        order_no: '',
        order_date: '',
        order_dept: '',
        order_by: '',
        order_reason: '',
        remark: '',
        status: 0,
        items: []
      },
      newRow: {
        no: 0,
        item: null,
        amount: 0,
        total: 0.00
      }
    }

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleCalTotal = this.handleCalTotal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    items: PropTypes.array.isRequired,
    isSuccess: PropTypes.object,
    isError: PropTypes.any,
    fetchItems: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchItems();
  }

  handleChange = type => e => {
    const name = e.target.name;
    const value = e.target.value;
    
    if (type === 'order') {
      this.setState(prevState => ({
        ...prevState,
        order: {
          ...prevState.order,
          [name]: value
        }
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        newRow: {
          ...prevState.newRow,
          [name]: value
        }
      }));
    }

    if (type !== 'order' && name === 'amount') {
      this.handleCalTotal("test");
    }
  }
  
  handleCalTotal  = params => {
    const { item } = this.state.newRow;
    console.log(item.id);
  }

  handleSubmit (event) {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.setState(this.initialState);
  }

  handleAddItem (e) {

  }

  handleRemoveItem (e) {

  }

  render () {
    let { items } = this.props;
    let { order, newRow } = this.state;

    return (

      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" sm="6">
            <Card>
              <Form onSubmit={this.handleSubmit} encType="multipart/form-data" className="form-horizontal">
                <CardHeader>
                  <strong>วัสดุ</strong>
                  <small> Form</small>
                </CardHeader>
                <CardBody>              
                  <FormGroup row className="my-0">
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="order_no">เลขที่เบิก</Label>
                        <Input
                          type="text"
                          id="order_no"
                          name="order_no"
                          value={order.order_no}
                          placeholder="ระบุเลขที่เบิก"
                          onChange={this.handleChange('order')}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="city">วันที่เบิก</Label>
                        <Input
                          type="date"
                          id="order_date"
                          name="order_date"
                          value={order.order_date}
                          placeholder="date"
                          onChange={this.handleChange('order')}
                        />
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="my-0">
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="city">ผู้เบิก</Label>
                        <Input
                          type="text"
                          id="order_by"
                          name="order_by"
                          value={order.order_by}
                          placeholder="ระบุผู้เบิก"
                          onChange={this.handleChange('order')}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="postal-code">หน่วยงาน</Label>
                        <Input
                          type="select"
                          id="order_dept"
                          name="order_dept"
                          value={order.order_dept}
                          onChange={this.handleChange('order')}
                        >
                          <option value="">--กรุณาเลือก--</option>
                          {/* {itemTypes && itemTypes.map(itemType => (
                            <option value={itemType.id} key={itemType.id}>{itemType.name}</option>
                          ))} */}
                        </Input>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="my-0">
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="city">เหตุผลในการเบิก</Label>
                        <Input
                          type="textarea"
                          id="order_reason"
                          name="order_reason"
                          value={order.order_reason}
                          rows="2"
                          placeholder="เหตุผลในการเบิก..."
                          onChange={this.handleChange('order')}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="city">หมายเหตุ</Label>
                        <Input
                          type="textarea"
                          id="remark"
                          name="remark"
                          value={order.remark}
                          rows="2"
                          placeholder="หมายเหตุ..."
                          onChange={this.handleChange('order')}
                        />
                      </FormGroup>
                    </Col>
                  </FormGroup>

                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: '5%' }}>ลำดับ</th>
                        <th scope="col">รายการวัสดุ</th>
                        <th scope="col" style={{ width: '15%' }}>จำนวน</th>
                        <th scope="col" style={{ width: '15%' }}>มูลค่า</th>
                        <th scope="col" style={{ textAlign: 'center', width: '10%' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items && order.items.map(item => (
                          <tr>
                            <td></td>
                          </tr>
                      ))}

                      <tr>
                        <td></td>
                        <td>
                          <Input
                            type="select"
                            id="item"
                            name="item"
                            value={newRow.item}
                            onChange={this.handleChange('newRow')}
                          >
                            <option value="">--กรุณาเลือก--</option>
                            {items && items.map(item => (
                              <option value={item.id} key={item.id}>{item.name}</option>
                            ))}
                          </Input>
                        </td>
                        <td>
                          <Input
                            type="text"
                            id="amount"
                            name="amount"
                            value={newRow.amount}
                            onChange={this.handleChange('newRow')}
                            placeholder="ระบุจำนวน"
                          />
                        </td>
                        <td>{newRow.total}</td>
                        <td style={{ textAlign: "center" }}>
                          <Button
                            className="btn btn-success btn-sm mr-1"
                            onClick={e => this.handleAddItem(e)}
                          >
                            Add
                          </Button>
                          <Button
                            className="btn btn-danger btn-sm"
                            onClick={e => this.handleRemoveItem(e)}
                          >
                            Remove
                          </Button> 
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> เพิ่มการเบิก
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.item.items
});

export default connect(
  mapStateToProps,
  { fetchItems }
)(NewForm);
