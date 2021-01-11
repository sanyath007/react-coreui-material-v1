import React, { Component, createRef } from 'react';
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
import { toast } from 'react-toastify';

import { fetchLastOrderNo, addOrder } from '../../redux/orders';
import { fetchItem, fetchItems } from '../../redux/items';
import { fetchDepts } from '../../redux/depts';

class NewForm extends Component {
  constructor (props) {
    super(props);

    this.initialState = {
      order: {
        id: '',
        order_no: '',
        order_date: '',
        order_dept: '',
        order_by: '1300200009261',
        order_reason: '',
        remark: '',
        status: 0,
        items: []
      },
      newItem: {
        no: 0,
        item_id: '',
        item: {},
        amount: 0,
        total: 0.00
      }
    }

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleCalcTotal = this.handleCalcTotal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.order_no = createRef();
  }

  static propTypes = {
    isError: PropTypes.any,
    isSuccess: PropTypes.object,
    item: PropTypes.object,
    items: PropTypes.array.isRequired,
    lastOrderNo: PropTypes.string.isRequired,
    depts: PropTypes.array.isRequired,
    fetchItem: PropTypes.func.isRequired,
    fetchItems: PropTypes.func.isRequired,
    fetchDepts: PropTypes.func.isRequired,
    fetchLastOrderNo: PropTypes.func.isRequired,
    addOrder: PropTypes.func.isRequired,
  };
  
  componentDidMount() {
    this.props.fetchItems();
    this.props.fetchDepts();
    this.props.fetchLastOrderNo();
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
        newItem: {
          ...prevState.newItem,
          [name]: value
        }
      }));
    }

    if (type !== 'order' && name === 'item_id') {
      this.props.fetchItem(value);
    }
    
    if (type !== 'order' && name === 'amount') {
      this.handleCalcTotal(value);
    }
  }
  
  handleCalcTotal = amount => {
    if (this.props.item) {
      let total = parseFloat(parseFloat(this.props.item.cost) * amount);

      this.setState(prevState => ({
        ...prevState,
        newItem: {
          ...prevState.newItem,
          no: prevState.order.items.length + 1,
          item: this.props.item,
          total: total
        }
      }));
    }
  }

  handleSubmit (e) {
    e.preventDefault();

    let { order } = this.state;

    order.order_no = this.order_no.current.props.defaultValue;
    console.log(order);
    //TODO: validate data before add data to db

    if (order.items.length > 0) {
      this.props.addOrder(order);

      // this.setState(this.initialState);
    } else {
      toast.error('Error: You not have items in order data');
    }
  }

  handleAddItem (e) {
    e.preventDefault();

    if(this.state.newItem.item_id && this.state.newItem.amount !== 0) {
      const { items } = this.state.order;
      /** Check have exist item  */
      if (items.find(item => parseInt(item.item_id) === parseInt(this.state.newItem.item_id))) {
        toast.error('Error: This item is exists!!');
        return false;
      }

      this.setState(prevState => {
        return {
          ...prevState,
          order: {
            ...prevState.order,
            items: [...prevState.order.items, this.state.newItem],
          }
        }
      });
  
      /** Set state to initialState */
      this.setState(prevState => {
        return {
          ...prevState,
          newItem: {
            ...this.initialState.newItem
          }
        }
      });
    } else {
      toast.error('Error: You have not selected item yet or amount value equal 0')
    }
  }

  handleEditItem = editId => e => {
    e.preventDefault();

    console.log(editId);
  }
  
  handleDeleteItem = deleteId => e => {
    e.preventDefault();

    if (window.confirm("คุณแน่ใจว่าต้องการลบรายการนี้ใช่หรือไม่")) {
      const { items } = this.state.order;    
      let newOrderItems = items.filter(item => parseInt(item.item_id) !== deleteId);
      
      this.setState(prevState => ({
        ...prevState,
        order: {
          ...prevState.order,
          items: newOrderItems
        }
      }));
    }
  }

  render () {
    let { items, depts, lastOrderNo } = this.props;
    let { order, newItem } = this.state;

    return (

      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" sm="6">
            <Card>
              <Form onSubmit={this.handleSubmit} encType="multipart/form-data" className="form-horizontal">
                <CardHeader>
                  <strong>เบิกวัสดุ</strong>
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
                          ref={this.order_no}
                          defaultValue={lastOrderNo}
                          // value={order.order_no}
                          placeholder="ระบุเลขที่เบิก"
                          readOnly
                          // onChange={this.handleChange('order')}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="order_date">วันที่เบิก</Label>
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
                        <Label htmlFor="order_by">ผู้เบิก</Label>
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
                          {depts && depts.map(dept => (
                            <option value={dept.depart_id} key={dept.depart_id}>{dept.depart_name}</option>
                          ))}
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
                        <Label htmlFor="city">เพิ่มเติม</Label>
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
                        <th scope="col" style={{ textAlign: 'center', width: '5%' }}>ลำดับ</th>
                        <th scope="col">รายการวัสดุ</th>
                        <th scope="col" style={{ textAlign: 'center', width: '15%' }}>จำนวน</th>
                        <th scope="col" style={{ textAlign: 'center', width: '15%' }}>มูลค่า</th>
                        <th scope="col" style={{ textAlign: 'center', width: '10%' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items && order.items.map((item, index) => (
                          <tr key={item.item.id}>
                            <td style={{ textAlign: 'center' }}>{index+1}</td>
                            <td>{item.item.id+ '-' +item.item.name}</td>
                            <td style={{ textAlign: 'center' }}>{item.amount}</td>
                            <td style={{ textAlign: 'center' }}>{item.total}</td>
                            <td style={{ textAlign: 'center' }}>
                              <Button
                                className="btn btn-warning btn-sm mr-1"
                                onClick={this.handleEditItem(item.item.id)}
                              >
                                Edit
                              </Button>
                              <Button
                                className="btn btn-danger btn-sm"
                                onClick={this.handleDeleteItem(item.item.id)}
                              >
                                Del
                              </Button> 
                            </td>
                          </tr>
                      ))}

                      <tr>
                        <td></td>
                        <td>
                          <Input
                            type="select"
                            id="item_id"
                            name="item_id"
                            value={newItem.item_id}
                            onChange={this.handleChange('newItem')}
                          >
                            <option value="">--กรุณาเลือก--</option>
                            {items && items.map(item => (
                              <option value={item.id} key={item.id}>{item.name}</option>
                            ))}
                          </Input>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <Input
                            type="text"
                            id="amount"
                            name="amount"
                            value={newItem.amount}
                            onChange={this.handleChange('newItem')}
                            placeholder="ระบุจำนวน"
                            style={{ textAlign: 'center' }}
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>{newItem.total}</td>
                        <td style={{ textAlign: "center" }}>
                          <Button
                            className="btn btn-success btn-sm mr-1"
                            onClick={e => this.handleAddItem(e)}
                          >
                            Add
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
  item: state.item.item,
  items: state.item.items,
  depts: state.dept.depts,
  lastOrderNo: state.order.lastOrderNo,
});

export default connect(
  mapStateToProps,
  { fetchItem, fetchItems, fetchDepts, fetchLastOrderNo, addOrder }
)(NewForm);
