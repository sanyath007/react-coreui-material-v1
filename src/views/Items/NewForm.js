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
} from 'reactstrap';

import { fetchUnits } from '../../redux/units';
import { fetchItemTypes } from '../../redux/itemTypes';

class NewForm extends Component {
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
      status: 0,
    }

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    units: PropTypes.array.isRequired,
    isSuccess: PropTypes.object,
    isError: PropTypes.any,
    fetchUnits: PropTypes.func.isRequired,
    fetchItemTypes: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchUnits();
    this.props.fetchItemTypes();
  }

  handleChange (event) {
    const name = event.target.name;
    const value = event.target.value;
    
    this.setState({
      [name]: value
    });
  }
  
  handleSubmit (event) {
    event.preventDefault();

    console.log(this.state);
    // this.props.onSubmit(this.state);
    // this.setState(this.initialState);
  }

  render () {
    let { units, itemTypes } = this.props;

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
                        {itemTypes && itemTypes.map(itemType => (
                          <option value={itemType.id} key={itemType.id}>{itemType.name}</option>
                        ))}
                      </Input>
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
  units: state.unit.units,
  itemTypes: state.itemType.itemTypes
});

export default connect(
  mapStateToProps,
  { fetchUnits, fetchItemTypes }
)(NewForm);
