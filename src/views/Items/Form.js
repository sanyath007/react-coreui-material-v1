import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Col,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';

import ModalMap from '../Modals/ModalMap';

import { fetchChangwats } from '../../redux/changwat';
import { fetchAmphurs } from '../../redux/amphur';
import { fetchTambons } from '../../redux/tambon';

import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import th from 'date-fns/locale/th';

registerLocale('th', th)
setDefaultLocale('th');

const initialState = {
  filterAmphurs: [],
  filterTambons: [],
  modal: false
}

class NewForm extends Component {
  constructor (props) {
    super(props);

    this.state = initialState;

    this.onSelectedChangwat = this.onSelectedChangwat.bind(this);
    this.onSelectedAmphur = this.onSelectedAmphur.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  static propTypes = {
    changwats: PropTypes.array.isRequired,
    amphurs: PropTypes.array.isRequired,
    tambons: PropTypes.array.isRequired,
    fetchChangwats: PropTypes.func.isRequired,
    fetchAmphurs: PropTypes.func.isRequired,
    fetchTambons: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchChangwats();
    this.props.fetchAmphurs();
    this.props.fetchTambons();
  }

  onSelectedChangwat(value) {
    this.setState(prevState => ({
      ...prevState,
      filterAmphurs: this.props.amphurs.filter(amp => amp.chw_id === value)
    }));
  }
  
  onSelectedAmphur(value) {
    this.setState(prevState => ({
      ...prevState,
      filterTambons: this.props.tambons.filter(tam => tam.amp_id === value)
    }));
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }
  
  render() {
    const { changwats } = this.props;
    const { filterAmphurs, filterTambons } = this.state;
    console.log(this.props.errors)
    return (
      <div className="animated fadeIn">
        {/* <Row form>
          <Col md="4" className="form-group">
            <Label htmlFor="pid">PID</Label>
            <Input
              id="pid"
              name="pid"
              type="text"
              value={this.props.patient.pid}
              onChange={this.props.handleChange}
              placeholder="PID"
            />
          </Col>
          <Col md="4">
            <Label htmlFor="hn">HN</Label>
            <Input
              id="hn"
              name="hn"
              type="text"
              value={this.props.patient.hn}
              onChange={this.props.handleChange}
              placeholder="HN"
            />
          </Col>
          <Col md="4" className="form-group">
            <Label htmlFor="cid">เลขบัตรประชาชน</Label>
            <Input 
              id="cid"
              name="cid"
              type="text"
              value={this.props.patient.cid}
              onChange={this.props.handleChange}
              placeholder="เลขบัตรประชาชน"
            />
          </Col>
        </Row> */}

        <Row form>
          <Col md="2" className="form-group">
            <Label htmlFor="pname">คำนำหน้า</Label>
            <Input
              type="select"
              id="pname"
              name="pname"
              value={this.props.patient.pname}
              onChange={e => {
                this.props.handleChange(e)
                this.props.handleSelectedPname(e.target.value)
              }}
              className={`${(this.props.errors && this.props.errors.pname) ? 'is-invalid' : ''} form-control`}
            >
              <option value="">Choose...</option>
              <option value="1">ด.ช.</option>
              <option value="2">ด.ญ.</option>
              <option value="3">นาย</option>
              <option value="4">นาง</option>
              <option value="5">นางสาว</option>
            </Input>
            <div className="invalid-feedback">
              {this.props.errors && this.props.errors.pname && this.props.errors.pname.map(msg => {
                return msg;
              })}
            </div>
          </Col>
          <Col md="5" className="form-group">
            <Label htmlFor="fname">ชื่อ</Label>
            <Input
              id="fname"
              name="fname"
              type="text"
              value={this.props.patient.fname}
              onChange={this.props.handleChange}
              className={`${(this.props.errors && this.props.errors.fname) ? 'is-invalid' : ''} form-control`}
              placeholder="ชื่อ"
            />
            <div className="invalid-feedback">
              {this.props.errors && this.props.errors.fname && this.props.errors.fname.map(msg => {
                return msg;
              })}
            </div>
          </Col>
          <Col md="5">
            <Label htmlFor="lname">สกุล</Label>
            <Input
              id="lname"
              name="lname"
              type="text"
              value={this.props.patient.lname}
              onChange={this.props.handleChange}
              className={`${(this.props.errors && this.props.errors.lname) ? 'is-invalid' : ''} form-control`}
              placeholder="สกุล"
            />
            <div className="invalid-feedback">
              {this.props.errors && this.props.errors.lname && this.props.errors.lname.map(msg => {
                return msg;
              })}
            </div>
          </Col>
        </Row>

        <Row form>
        <Col md="4" className="form-group">
            <Label htmlFor="cid">เลขบัตรประชาชน</Label>
            <Input 
              id="cid"
              name="cid"
              type="text"
              value={this.props.patient.cid}
              onChange={this.props.handleChange}
              className={`${(this.props.errors && this.props.errors.cid) ? 'is-invalid' : ''} form-control`}
              placeholder="เลขบัตรประชาชน"
            />
            <div className="invalid-feedback">
              {this.props.errors && this.props.errors.cid && this.props.errors.cid.map(msg => {
                return msg;
              })}
            </div>
          </Col>
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
          <Col md="2" className="form-group">
            <Label htmlFor="ageY">อายุ</Label>
            <Input
              id="age_y"
              name="age_y"
              type="text"
              value={this.props.patient.age_y}
              onChange={this.props.handleChange}
              className={`${(this.props.errors && this.props.errors.age_y) ? 'is-invalid' : ''} form-control`}
              placeholder="อายุ"
            />
            <div className="invalid-feedback">
              {this.props.errors && this.props.errors.age_y && this.props.errors.age_y.map(msg => {
                return msg;
              })}
            </div>
          </Col>
          <Col md="2">
            <Label htmlFor="sex">เพศ</Label>
            <Input type="select"
              id="sex"
              name="sex"
              value={this.props.patient.sex}
              onChange={this.props.handleChange}
              className={`${(this.props.errors && this.props.errors.sex) ? 'is-invalid' : ''} form-control`}
            >
              <option>Choose...</option>
              <option value="1">ชาย</option>
              <option value="2">หญิง</option>
            </Input>
            <div className="invalid-feedback">
              {this.props.errors && this.props.errors.sex && this.props.errors.sex.map(msg => {
                return msg;
              })}
            </div>
          </Col>
        </Row>

        <FormGroup>
          <Label htmlFor="address">ที่อยู่</Label>
          <Input
            id="address"
            name="address"
            type="text"
            value={this.props.patient.address}
            onChange={this.props.handleChange}
            className={`${(this.props.errors && this.props.errors.address) ? 'is-invalid' : ''} form-control`}
            placeholder="ที่อยู่"
          />
          <div className="invalid-feedback">
            {this.props.errors && this.props.errors.address && this.props.errors.address.map(msg => {
              return msg;
            })}
          </div>
        </FormGroup>

        <Row form>
          <Col md="10" className="form-group">
            <Label htmlFor="road">ถนน</Label>
            <Input
              id="road"
              name="road"
              type="text"
              value={this.props.patient.road}
              onChange={this.props.handleChange}
              placeholder="ถนน"
            />
          </Col>
          <Col md="2">
            <Label htmlFor="moo">หมู่</Label>
            <Input
              id="moo"
              name="moo"
              type="text"
              value={this.props.patient.moo}
              onChange={this.props.handleChange}
              placeholder="หมู่"
              />
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
          <Col md="4" className="form-group">
            <Label htmlFor="tambon">ตำบล</Label>
            <Input type="select"
              id="tambon"
              name="tambon"
              value={this.props.patient.tambon}
              onChange={this.props.handleChange}
              className={`${(this.props.errors && this.props.errors.tambon) ? 'is-invalid' : ''} form-control`}
            >
              <option>Choose...</option>
              {filterTambons && filterTambons.map(tam => (
                <option key={tam.id} value={tam.id}>{tam.tambon}</option>
              ))}
            </Input>
            <div className="invalid-feedback">
              {this.props.errors && this.props.errors.tambon && this.props.errors.tambon.map(msg => {
                return msg;
              })}
            </div>
          </Col>
        </Row>

        <Row form>
          <Col md="2" className="form-group">
            <Label htmlFor="zipcode">ไปรษณีย์</Label>
            <Input
              id="zipcode"
              name="zipcode"
              type="text"
              value={this.props.patient.zipcode}
              onChange={this.props.handleChange}
              className={`${(this.props.errors && this.props.errors.zipcode) ? 'is-invalid' : ''} form-control`}
              placeholder="รหัสไปรษณีย์"
            />
            <div className="invalid-feedback">
              {this.props.errors && this.props.errors.zipcode && this.props.errors.zipcode.map(msg => {
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
          <Col md="5" className="form-group">
            <Label htmlFor="tel">โทรศัพท์</Label>
            <Input
              id="tel"
              name="tel"
              type="text"
              value={this.props.patient.tel}
              onChange={this.props.handleChange}
              placeholder="โทรศัพท์ติดต่อ"
            />
          </Col>
        </Row>
        
        {/* #========= Modal =========# */}
        <ModalMap
          isOpen={this.state.modal}
          toggle={this.toggle}
          size="lg"
          className={this.props.className}
        />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  changwats: state.changwat.changwats,
  amphurs: state.amphur.amphurs,
  tambons: state.tambon.tambons
});

export default connect(
  mapStateToProps,
  {
    fetchChangwats,
    fetchAmphurs,
    fetchTambons
  }
)(NewForm);
