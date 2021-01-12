import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';

// import ModalMap from '../Modals/ModalMap';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import th from 'date-fns/locale/th';

registerLocale('th', th)
setDefaultLocale('th');

const initialState = {
  item: {
    id: '',
    name: '',
    unit: '',
    cost: 0.00,
    stock: 0,
    min: 0,
    balance: 0,
    item_type: '',
    item_group: '',
    status: 0,
  },
  modal: false
}

class ItemForm extends Component {
  constructor (props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    // this.toggle = this.toggle.bind(this);
  }

  static propTypes = {
    item: PropTypes.object,
    handleSubmit: PropTypes.func,
  };

  componentDidUpdate(nextProps) {
    console.log('This is componentDidUpdate method');
    const { item } = this.props;
    
    if (nextProps.item !== item) {
      this.setState(prevState => {
        return {
          ...prevState,
          item: item
        };
      });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState(preState => {
      return {
        ...preState,
        item: {
          ...preState.item,
          [name]: value 
        }
      }
    });
    
    /** If input name is 'item_group' call handleItemGroupSelected method */
    if (name === 'item_group') {
      this.handleItemGroupSelected(value);
    }
  }

  handleItemGroupSelected (id) {
    let selectedGroup = this.props.itemGroups.filter(group => parseInt(group.id) === parseInt(id));

    this.setState(prevState => ({
      ...prevState,
      item: {
        ...prevState.item,
        name: selectedGroup[0].group_name+ ' No.'
      }
    }));
  }

  // toggle() {
  //   this.setState({
  //     modal: !this.state.modal
  //   })
  // }
  
  render() {
    let { units, itemTypes, itemGroups, handleSubmit } = this.props;
    console.log(this.state.item);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" sm="6">
            <Card>
              <Form onSubmit={handleSubmit(this.state.item)} encType="multipart/form-data" className="form-horizontal">
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
                        value={this.state.item.item_type}
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
                        value={this.state.item.item_group}
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
                        value={this.state.item.name}
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
                        value={this.state.item.unit}
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
                        value={this.state.item.cost}
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
                        value={this.state.item.stock}
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
                        value={this.state.item.min}
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
                        value={this.state.item.balance}
                        onChange={this.handleChange}
                        placeholder="คงเหลือ"
                        className={`${(this.props.errors && this.props.errors.balance) ? 'is-invalid' : ''} form-control`}
                      />
                      <div className="invalid-feedback">
                        {this.props.errors && this.props.errors.balance && this.props.errors.balance.map(msg => {
                          return msg;
                        })}
                      </div>
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="warning">
                    <i className="fa fa-edit"></i> แก้ไขวัสดุ
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* <Row form>
          <Col md="4" className="form-group">
            <Label htmlFor="birthdate">วันเกิด</Label>
            <DatePicker
              id="birthdate"
              name="birthdate"
              dateFormat="yyyy-MM-dd"
              selected={this.props.patient.birthdate}
              onChange={e => {
                this.props.handleDateChange('birthdate', e)
                this.props.calAgeYFromBirthdate(e)
              }}
              className={`${(this.props.errors && this.props.errors.birthdate) ? 'is-invalid' : ''} form-control`}
              placeholderText="วันที่เกิด"
            />
            <div className="error">
              {this.props.errors && this.props.errors.birthdate && this.props.errors.birthdate[0]}
            </div>
          </Col>
        </Row>
        <Row form>
          <Col md="4" className="form-group">
            <Label htmlFor="changwat">จังหวัด</Label>
            <Input type="select" 
              id="changwat"
              name="changwat"
              value={this.props.patient.changwat}
              onChange={e => {
                this.props.handleChange(e)
                this.onSelectedChangwat(e.target.value)
              }}
              className={`${(this.props.errors && this.props.errors.changwat) ? 'is-invalid' : ''} form-control`}
            >
              <option>Choose...</option>
              {changwats && changwats.map(chw => (
                <option key={chw.chw_id} value={chw.chw_id}>{chw.changwat}</option>
              ))}
            </Input>
            <div className="invalid-feedback">
              {this.props.errors && this.props.errors.changwat && this.props.errors.changwat.map(msg => {
                return msg;
              })}
            </div>
          </Col>
          <Col md="4" className="form-group">
            <Label htmlFor="amphur">อำเภอ</Label>
            <Input type="select"
              id="amphur"
              name="amphur"
              value={this.props.patient.amphur}
              onChange={e => {
                this.props.handleChange(e)
                this.onSelectedAmphur(e.target.value)
              }}
              className={`${(this.props.errors && this.props.errors.amphur) ? 'is-invalid' : ''} form-control`}
            >
              <option>Choose...</option>
              {filterAmphurs && filterAmphurs.map(amp => (
                <option key={amp.id} value={amp.id}>{amp.amphur}</option>
              ))}
            </Input>
            <div className="invalid-feedback">
              {this.props.errors && this.props.errors.amphur && this.props.errors.amphur.map(msg => {
                return msg;
              })}
            </div>
          </Col>          
          <Col md="5" className="form-group">
            <Label htmlFor="latlong">ละติจูด, ลองติจูด</Label>
            <Input
              id="latlong"
              name="latlong"
              type="text"
              value={this.props.patient.latlong}
              onChange={this.props.handleChange}
              onClick={this.toggle}
              className={`${(this.props.errors && this.props.errors.latlong) ? 'is-invalid' : ''} form-control`}
              placeholder="ละติจูด, ลองติจูด"
            />
            <div className="invalid-feedback">
              {this.props.errors && this.props.errors.latlong && this.props.errors.latlong.map(msg => {
                return msg;
              })}
            </div>
          </Col>
        </Row> */}
        
        {/* #========= Modal =========# */}
        {/* <ModalMap
          isOpen={this.state.modal}
          toggle={this.toggle}
          size="lg"
          className={this.props.className}
        /> */}

      </div>
    );
  }
}

export default ItemForm;
