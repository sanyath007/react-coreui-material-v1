import React, { Component } from 'react';
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

class NewForm extends Component {
  constructor (props) {
    super(props);

    this.initialState = {
      pid: '',
      hn: '',
      cid: '',
      pname: '',
      fname: '',
      lname: '',
      birthdate: '',
      age_y: 0,
      sex: 1,
      tel: '',
      address: '',
      moo: '',
      road: '',
      tambon: '',
      amphur: '',
      changwat: '',
      zipcode: '',
      latlong: ''
    }

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    const name = event.target.name;
    const value = event.target.value;
    
    this.setState({
      [name]: value
    });
    
    if (name === 'changwat') {
      console.log(name + '=' + value);
      this.props.onSelectedChangwat(value)
    }
    
    if (name === 'amphur') {
      console.log(name + '=' + value);
      this.props.onSelectedAmphur(value)
    }
  }
  
  handleSubmit (event) {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.setState(this.initialState);
  }

  render () {
    let { changwats, amphurs, tambons } = this.props;

    return (
      <div className="animated fadeIn">
      <Row>
        <Col xs="12" md="12" sm="6">
          <Card>
            <CardHeader>
              <strong>Patient</strong>
              <small> Form</small>
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <Row form>
                  <Col md="4" className="form-group">
                    <label htmlFor="pid">PID</label>
                    <Input
                      id="pid"
                      name="pid"
                      type="text"
                      value={this.state.pid}
                      onChange={this.handleChange}
                      placeholder="PID"
                    />
                  </Col>
                  <Col md="4">
                    <label htmlFor="hn">HN</label>
                    <Input
                      id="hn"
                      name="hn"
                      type="text"
                      value={this.state.hn}
                      onChange={this.handleChange}
                      placeholder="HN"
                    />
                  </Col>
                  <Col md="4" className="form-group">
                    <label htmlFor="cid">เลขบัตรประชาชน</label>
                    <Input 
                      id="cid"
                      name="cid"
                      type="text"
                      value={this.state.cid}
                      onChange={this.handleChange}
                      placeholder="เลขบัตรประชาชน"
                    />
                  </Col>
                </Row>

                <Row form>
                  <Col md="2" className="form-group">
                    <label htmlFor="pname">คำนำหน้า</label>
                    <Input
                      id="pname"
                      name="pname"
                      value={this.state.pname}
                      onChange={this.handleChange}
                    >
                      <option value="">Choose...</option>
                      <option value="ด.ช.">ด.ช.</option>
                      <option value="ด.ญ.">ด.ญ.</option>
                      <option value="นาย">นาย</option>
                      <option value="นาง">นาง</option>
                      <option value="นางสาว">นางสาว</option>
                    </Input>
                  </Col>
                  <Col md="5" className="form-group">
                    <label htmlFor="fname">ชื่อ</label>
                    <Input
                      id="fname"
                      name="fname"
                      type="text"
                      value={this.state.fname}
                      onChange={this.handleChange}
                      placeholder="ชื่อ"
                    />
                  </Col>
                  <Col md="5">
                    <label htmlFor="lname">สกุล</label>
                    <Input
                      id="lname"
                      name="lname"
                      type="text"
                      value={this.state.lname}
                      onChange={this.handleChange}
                      placeholder="สกุล"
                    />
                  </Col>
                </Row>

                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="birthdate">วันเกิด</label>
                    <Input
                      id="birthdate"
                      name="birthdate"
                      type="text"
                      value={this.state.birthdate}
                      onChange={this.handleChange}
                      placeholder="วันเกิด"
                    />
                  </Col>
                  <Col md="3" className="form-group">
                    <label htmlFor="age">อายุ</label>
                    <Input
                      id="age"
                      name="age"
                      type="text"
                      value={this.state.age}
                      onChange={this.handleChange}
                      placeholder="อายุ"
                    />
                  </Col>
                  <Col md="3">
                    <label htmlFor="sex">เพศ</label>
                    <Input type="select"
                      id="sex"
                      name="sex"
                      value={this.state.sex}
                      onChange={this.handleChange}
                    >
                      <option>Choose...</option>
                      <option value="1">ชาย</option>
                      <option value="2">หญิง</option>
                    </Input>
                  </Col>
                </Row>

                <FormGroup>
                  <label htmlFor="address">ที่อยู่</label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    value={this.state.address}
                    onChange={this.handleChange}
                    placeholder="ที่อยู่"
                  />
                </FormGroup>

                <Row form>
                  <Col md="10" className="form-group">
                    <label htmlFor="road">ถนน</label>
                    <Input
                      id="road"
                      name="road"
                      type="text"
                      value={this.state.road}
                      onChange={this.handleChange}
                      placeholder="ถนน"
                    />
                  </Col>
                  <Col md="2">
                    <label htmlFor="moo">หมู่</label>
                    <Input
                      id="moo"
                      name="moo"
                      type="text"
                      value={this.state.moo}
                      onChange={this.handleChange}
                      placeholder="หมู่"
                      />
                  </Col>
                </Row>

                <Row form>
                  <Col md="4" className="form-group">
                    <label htmlFor="changwat">จังหวัด</label>
                    <Input type="select" 
                      id="changwat"
                      name="changwat"
                      value={this.state.changwat}
                      onChange={this.handleChange}
                    >
                      <option>Choose...</option>
                      {changwats && changwats.map(chw => (
                        <option key={chw.chw_id} value={chw.chw_id}>{chw.changwat}</option>
                      ))}
                    </Input>
                  </Col>
                  <Col md="4" className="form-group">
                    <label htmlFor="amphur">อำเภอ</label>
                    <Input type="select"
                      id="amphur"
                      name="amphur"
                      value={this.state.amphur}
                      onChange={this.handleChange}
                    >
                      <option>Choose...</option>
                      {this.state.changwat && amphurs && amphurs.map(amp => (
                        <option key={amp.id} value={amp.id}>{amp.amphur}</option>
                      ))}
                    </Input>
                  </Col>
                  <Col md="4" className="form-group">
                    <label htmlFor="tambon">ตำบล</label>
                    <Input type="select"
                      id="tambon"
                      name="tambon"
                      value={this.state.tambon}
                      onChange={this.handleChange}
                    >
                      <option>Choose...</option>
                      {this.state.amphur && tambons && tambons.map(tam => (
                        <option key={tam.id} value={tam.id}>{tam.tambon}</option>
                      ))}
                    </Input>
                  </Col>
                </Row>

                <Row form>
                  <Col md="2" className="form-group">
                    <label htmlFor="zipcode">ไปรษณีย์</label>
                    <Input
                      id="zipcode"
                      name="zipcode"
                      type="text"
                      value={this.state.zipcode}
                      onChange={this.handleChange}
                      placeholder="รหัสไปรษณีย์"
                    />
                  </Col>
                  <Col md="5" className="form-group">
                    <label htmlFor="latlong">ละติจูด, ลองติจูด</label>
                    <Input
                      id="latlong"
                      name="latlong"
                      type="text"
                      value={this.state.latlong}
                      onChange={this.handleChange}
                      data-toggle="modal" 
                      data-target="#exampleModal"
                      placeholder="ละติจูด, ลองติจูด"
                    />
                  </Col>
                  <Col md="5" className="form-group">
                    <label htmlFor="tel">โทรศัพท์</label>
                    <Input
                      id="tel"
                      name="tel"
                      type="text"
                      value={this.state.tel}
                      onChange={this.handleChange}
                      placeholder="โทรศัพท์ติดต่อ"
                    />
                  </Col>
                </Row>

                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> เพิ่มผู้ป่วย</Button>
              </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewForm;
