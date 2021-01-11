import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import { connect } from 'react-redux';

import { updateItem } from '../../redux/items';
import { fetchUnits } from '../../redux/units';
import { fetchItemTypes } from '../../redux/itemTypes';
import { fetchItemGroups } from '../../redux/itemGroups';

class EditForm extends Component {
  constructor (props) {
    super(props);

    this.initialState = {
      id: '',
      name: '',
      unit: '',
      cost: 0.00,
      stock: 0,
      min: 0,
      balance: 0,
      item_type: '',
      item_group: '',
      status: 0
    }

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    isError: PropTypes.any,
    isSuccess: PropTypes.object,
    item: PropTypes.object,
    units: PropTypes.array.isRequired,
    itemTypes: PropTypes.array.isRequired,
    itemGroups: PropTypes.array.isRequired,
    updateItem: PropTypes.func.isRequired,
    fetchUnits: PropTypes.func.isRequired,
    fetchItemTypes: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchUnits();
    this.props.fetchItemTypes();
    this.props.fetchItemGroups();
  }
  
  componentDidUpdate(nextProps) {
    // const { patient } = this.props;
    
    // if (nextProps.patient !== patient) {
    //   const { created_at, updated_at, ...pt } = patient;

    //   this.setState(prevState => {
    //     let { filterTambons, filterAmphurs, modal } = prevState;
        
    //     let newState = { filterTambons, filterAmphurs, modal, ...pt };
        
    //     return {
    //       ...newState
    //     };
    //   });

    // }
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
    
    /** If input name is 'item_group' call handleItemGroupSelected method */
    if (name === 'item_group') {
      this.handleItemGroupSelected(value);
    }
  }
  
  handleItemGroupSelected (id) {
    let selectedGroup = this.props.itemGroups.filter(group => parseInt(group.id) === parseInt(id));

    this.setState(prevState => ({
      ...prevState,
      name: selectedGroup[0].group_name+ ' No.'
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const editedItem = this.state;
    
    this.props.updateItem(editedItem);

    // this.setState(this.initialState);
  }

  render() {
    let { item, units, itemTypes, itemGroups } = this.props;
    
    console.log(this.props.item);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" sm="6">
            <Card>
              <Form onSubmit={this.handleSubmit} encType="multipart/form-data" className="form-horizontal">
                <CardHeader>
                  <strong>แก้ไขรายการวัสดุ</strong>
                  <small> Form</small>
                </CardHeader>
                <CardBody>
                <FormGroup row>
                    <Col md="3">
                      <Label>ประเภท</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="select"
                        id="item_type"
                        name="item_type"
                        value={this.state.item_type}
                        onChange={this.handleChange}
                      >
                        <option value="">--กรุณาเลือก--</option>
                        {itemTypes && itemTypes.map(type => (
                          <option value={type.id} key={type.id}>{type.name}</option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>กลุ่ม</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="select"
                        id="item_group"
                        name="item_group"
                        value={this.state.item_group}
                        onChange={this.handleChange}
                      >
                        <option value="">--กรุณาเลือก--</option>
                        {itemGroups && itemGroups.map(group => (
                          <option value={group.id} key={group.id}>{group.group_name}</option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>ชื่อวัสดุ</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="ชื่อวัสดุ..."
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>หน่วย</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="select"
                        id="unit"
                        name="unit"
                        value={this.state.unit}
                        onChange={this.handleChange}
                      >
                        <option value="">--กรุณาเลือก--</option>
                        {units && units.map(unit => (
                          <option value={unit.unit_id} key={unit.unit_id}>{unit.unit_name}</option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>ราคา</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        id="cost"
                        name="cost"
                        type="text"
                        value={this.state.cost}
                        onChange={this.handleChange}
                        placeholder="ชื่อ"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Stock</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        id="stock"
                        name="stock"
                        type="text"
                        value={this.state.stock}
                        onChange={this.handleChange}
                        placeholder="Stock"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Min</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        id="min"
                        name="min"
                        type="text"
                        value={this.state.min}
                        onChange={this.handleChange}
                        placeholder="Min"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>คงเหลือ</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        id="balance"
                        name="balance"
                        type="text"
                        value={this.state.balance}
                        onChange={this.handleChange}
                        placeholder="คงเหลือ"
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> เพิ่มวัสดุ
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
  units: state.unit.units,
  itemTypes: state.itemType.itemTypes,
  itemGroups: state.itemGroup.itemGroups
});

export default connect(
  mapStateToProps,
  { fetchUnits, fetchItemTypes, fetchItemGroups, updateItem }
)(EditForm);
