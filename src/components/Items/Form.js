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
    
    this.state = props.item 
      ? {
          item: {
            id: props.item ? props.item.id : '',
            name: props.item ? props.item.name : '',
            unit: props.item ? props.item.unit.unit_id : '',
            cost: props.item ? props.item.cost : 0.00,
            stock: props.item ? props.item.stock : 0,
            min: props.item ? props.item.min : 0,
            balance: props.item ? props.item.balance : 0,
            item_type: props.item ? props.item.item_type.id : '',
            item_group: props.item ? props.item.item_group.id : '',
            status: props.item ? props.item.status : 0,
          },
          modal: false
        }
      : initialState;

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.toggle = this.toggle.bind(this);
  }

  static propTypes = {
    item: PropTypes.object,
    handleSubmit: PropTypes.func,
  };

  componentDidUpdate(nextProps) {
    console.log('This is componentDidUpdate method');
    // const { item, isEditing } = this.props;
    
    // if (isEditing && nextProps.item !== item) {
    //   this.setState(prevState => {
    //     return {
    //       ...prevState,
    //       item: item
    //     };
    //   });
    // }
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

  onSubmit (e) {
    e.preventDefault();

    this.props.handleSubmit(this.state.item)
  }
  // toggle() {
  //   this.setState({
  //     modal: !this.state.modal
  //   })
  // }
  
  render() {
    let { units, itemTypes, itemGroups, validateErrors } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" sm="6">
            <Card>
              <Form onSubmit={this.onSubmit} encType="multipart/form-data" className="form-horizontal">
                <CardHeader>
                  <strong>{this.props.formMode ? 'เพิ่มรายการวัสดุ' : 'แก้ไขรายการวัสดุ'}</strong>
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
                        className={`${(validateErrors && validateErrors.item_type) ? 'is-invalid' : ''} form-control`}
                      >
                        <option value="">--กรุณาเลือก--</option>
                        {itemTypes && itemTypes.map(type => (
                          <option value={type.id} key={type.id}>{type.name}</option>
                        ))}
                      </Input>
                      <div className="invalid-feedback">
                        {validateErrors && validateErrors.item_type && validateErrors.item_type.map(msg => {
                          return msg;
                        })}
                      </div>
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
                        className={`${(validateErrors && validateErrors.item_group) ? 'is-invalid' : ''} form-control`}
                      >
                        <option value="">--กรุณาเลือก--</option>
                        {itemGroups && itemGroups.map(group => (
                          <option value={group.id} key={group.id}>{group.group_name}</option>
                        ))}
                      </Input>
                      <div className="invalid-feedback">
                        {validateErrors && validateErrors.item_group && validateErrors.item_group.map(msg => {
                          return msg;
                        })}
                      </div>
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
                        className={`${(validateErrors && validateErrors.name) ? 'is-invalid' : ''} form-control`}
                      />
                      <div className="invalid-feedback">
                        {validateErrors && validateErrors.name && validateErrors.name.map(msg => {
                          return msg;
                        })}
                      </div>
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
                        className={`${(validateErrors && validateErrors.unit) ? 'is-invalid' : ''} form-control`}
                      >
                        <option value="">--กรุณาเลือก--</option>
                        {units && units.map(unit => (
                          <option value={unit.unit_id} key={unit.unit_id}>{unit.unit_name}</option>
                        ))}
                      </Input>
                      <div className="invalid-feedback">
                        {validateErrors && validateErrors.unit && validateErrors.unit.map(msg => {
                          return msg;
                        })}
                      </div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>ราคาต่อหน่วย</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        id="cost"
                        name="cost"
                        type="text"
                        value={this.state.item.cost}
                        onChange={this.handleChange}
                        placeholder="ราคาต่อหน่วย"
                        className={`${(validateErrors && validateErrors.cost) ? 'is-invalid' : ''} form-control`}
                      />
                      <div className="invalid-feedback">
                        {validateErrors && validateErrors.cost && validateErrors.cost.map(msg => {
                          return msg;
                        })}
                      </div>
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
                        className={`${(validateErrors && validateErrors.stock) ? 'is-invalid' : ''} form-control`}
                      />
                      <div className="invalid-feedback">
                        {validateErrors && validateErrors.stock && validateErrors.stock.map(msg => {
                          return msg;
                        })}
                      </div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>จำนวนขั้นต่ำ</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        id="min"
                        name="min"
                        type="text"
                        value={this.state.item.min}
                        onChange={this.handleChange}
                        placeholder="จำนวนขั้นต่ำ"
                        className={`${(validateErrors && validateErrors.min) ? 'is-invalid' : ''} form-control`}
                      />
                      <div className="invalid-feedback">
                        {validateErrors && validateErrors.min && validateErrors.min.map(msg => {
                          return msg;
                        })}
                      </div>
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
                        className={`${(validateErrors && validateErrors.balance) ? 'is-invalid' : ''} form-control`}
                      />
                      <div className="invalid-feedback">
                        {validateErrors && validateErrors.balance && validateErrors.balance.map(msg => {
                          return msg;
                        })}
                      </div>
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  {this.props.formMode 
                    ? <Button type="submit" size="sm" color="primary">
                        <i className="fa fa-dot-circle-o"></i> เพิ่มวัสดุ
                      </Button>
                    : <Button type="submit" size="sm" color="warning">
                        <i className="fa fa-edit"></i> แก้ไขวัสดุ
                      </Button>
                  }
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
