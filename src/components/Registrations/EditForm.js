import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  Input,
  Label,
  Row,
} from 'reactstrap';
import moment from 'moment';

import { fetchHosps, fetchPcus } from '../../redux/hospcode';
import { updateRegistration } from '../../redux/registrations';

import ModalPatients from '../Modals/ModalPatients';
import ModalICD10s from '../Modals/ModalICD10s';

import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import th from 'date-fns/locale/th';

registerLocale('th', th)
setDefaultLocale('th');

const initialState = {
  registration: {
    id: '',
    pid: '',
    patient_name: '',
    dx: '',
    dx_desc: '',
    dx_date: '',
    dch_hosp: '',
    dch_date: '',
    pcu: '',
    reg_date: '',
    reg_status: ''
  },
  modalPatients: false,
  modalIcd10: false
};

class EditForm extends Component {
  constructor (props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    // this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePatients = this.togglePatients.bind(this);
    this.toggleIcd10 = this.toggleIcd10.bind(this);
  }

  static propType = {
    registration: PropTypes.any,
    fetchHosps: PropTypes.func.isRequired,
    fetchPcus: PropTypes.func.isRequired,
    updateRegistration: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchHosps();
    this.props.fetchPcus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.registration !== this.props.registration) {
      const { created_at, updated_at, ...registration } = nextProps.registration

      this.setState(prevState => {
        return {
          ...prevState,
          registration: {
            dx_date: moment(registration.dx_date).format('DD/MM/YYYY'),
            dch_date: moment(registration.dch_date).format('DD/MM/YYYY'),
            reg_date: moment(registration.reg_date).format('DD/MM/YYYY'),
            ...prevState.registration,
            ...registration
          }
        }
      });
    }
  }

  togglePatients() {
    this.setState({
      modalPatients: !this.state.modalPatients
    })
  }
  
  toggleIcd10() {
    this.setState({
      modalIcd10: !this.state.modalIcd10
    })
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState(prevState => {
      return {
        ...prevState,
        registration: {
          ...prevState.registration,
          [name]: value
        }
      };
    });
  }

  handleDateChange = (name, date) => {
    this.setState(prevState => {
      return {
        ...prevState,
        registration: {
          ...prevState.registration,
          [name]: date
        }
      };
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    
    const { id, patient_name, dx_desc, age_y, dx_date, dch_date, reg_date, ...registration } = this.state.registration;

    const updateData = {
      ...registration,
      dx_date: moment(dx_date).format('YYYY-MM-DD'),
      dch_date: moment(dch_date).format('YYYY-MM-DD'),
      reg_date: moment(reg_date).format('YYYY-MM-DD'),
    }

    this.props.updateRegistration(id, updateData, this.props.history);

    this.setState(initialState);
  }

  handleModalSelected = (e, obj) => {
    console.log(obj)
    if(this.state.modalPatients) {
      this.setState(prevState => {
        return {
          ...prevState,
          modalPatients: !this.state.modalPatients,
          registration: {
            ...prevState.registration,
            pid: obj.pid,
            patient_name: obj.pname + obj.fname + ' ' + obj.lname,
          }
        };
      });
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          modalIcd10: !this.state.modalIcd10,
          registration: {
            ...prevState.registration,
            dx: obj.code,
            dx_desc: obj.name,
          }
        };
      });
    }
  }

  render () {
    const { hosps, pcus } = this.props;
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" sm="6">
            <Card>
              <Form onSubmit={this.handleSubmit}>
                <CardHeader>
                  <strong>Edit Registration</strong>
                  <small> Form</small>
                </CardHeader>
                <CardBody>
                  <Row form>
                    <Col md="4" className="form-group">
                      <Label htmlFor="patient">PID</Label>
                      <div className="input-group mb-0">
                        <Input
                          id="pid"
                          name="pid"
                          type="text"
                          value={this.state.registration.pid}
                          onChange={this.handleChange}
                          placeholder="ผู้ป่วย"
                        />
                        <div className="input-group-append">
                          <button 
                            className="btn btn-outline-secondary" 
                            type="button" 
                            id="button-addon1" 
                            onClick={this.togglePatients}
                          >
                            <i className="material-icons">search</i>
                          </button>
                        </div>
                      </div>
                    </Col>
                    <Col md="5" className="form-group">
                      <Label htmlFor="dchDate">ชื่อ-สกุลผู้ป่วย</Label>
                      <Input
                        id="patient_name"
                        name="patient_name"
                        type="text"
                        value={this.state.registration.patient_name}
                        placeholder="ชื่อ-สกุลผู้ป่วย"
                        readOnly
                      />
                    </Col>
                    <Col md="3" className="form-group">
                      <Label htmlFor="dxDate">วันที่เริ่มวินิจฉัย</Label>
                      {/* <Input 
                        id="dx_date"
                        name="dx_date"
                        type="text"
                        value={this.state.registration.dx_date}
                        onChange={this.handleChange}
                        placeholder="วันที่เริ่มวินิจฉัย"
                      /> */}
                      <DatePicker
                        id="dx_date"
                        name="dx_date"
                        dateFormat="yyyy-MM-dd"
                        selected={Date.parse(this.state.registration.dx_date)}
                        onChange={e => this.handleDateChange('dx_date', e)}
                        className="form-control"
                        placeholderText="วันที่เริ่มวินิจฉัย"
                      />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="4">
                      <Label htmlFor="dx">ICD10</Label>
                      <div className="input-group mb-0">
                        <Input
                          id="dx"
                          name="dx"
                          type="text"
                          value={this.state.registration.dx}
                          onChange={this.handleChange}
                          placeholder="ICD10"
                        />
                        <div className="input-group-append">
                          <button 
                            className="btn btn-outline-secondary" 
                            type="button" 
                            id="button-addon2" 
                            onClick={this.toggleIcd10}
                          >
                            <i className="material-icons">search</i>
                          </button>
                        </div>
                      </div>
                    </Col>
                    <Col md="8" className="form-group">
                      <Label htmlFor="dchDate">วินิจฉัยโรค</Label>
                      <Input
                        id="dx_desc"
                        name="dx_desc"
                        type="text"
                        value={this.state.registration.dx_desc}
                        placeholder="วินิจฉัยโรค"
                        readOnly
                      />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="9" className="form-group">
                      <Label htmlFor="dchHosp">รพ.แม่ข่ายที่ D/C</Label>
                      <Input
                        type="select"
                        id="dch_hosp"
                        name="dch_hosp"
                        value={this.state.registration.dch_hosp}
                        onChange={this.handleChange}
                      >
                        <option>Choose...</option>
                        { hosps && hosps.map((h) => (
                          <option key={h.hospcode} value={h.hospcode}>{h.name}</option>
                        ))}
                      </Input>
                    </Col>
                    <Col md="3" className="form-group">
                      <Label htmlFor="dchDate">วันที่จำหน่าย</Label>
                      {/* <Input
                        id="dch_date"
                        name="dch_date"
                        type="text"
                        value={this.state.registration.dch_date}
                        onChange={this.handleChange}
                        placeholder="วันที่ D/C"
                      /> */}
                      <DatePicker
                        id="dch_date"
                        name="dch_date"
                        dateFormat="yyyy-MM-dd"
                        selected={Date.parse(this.state.registration.dch_date)}
                        onChange={e => this.handleDateChange('dch_date', e)}
                        className="form-control"
                        placeholderText="วันที่จำหน่าย"
                      />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="9" className="form-group">
                      <Label htmlFor="pcu">PCU ที่รับดูแล</Label>
                      <Input
                        type="select"
                        id="pcu"
                        name="pcu"
                        value={this.state.registration.pcu}
                        onChange={this.handleChange}
                      >
                        <option>Choose...</option>
                        { pcus && pcus.map((h) => (
                          <option key={h.hospcode} value={h.hospcode}>{h.name}</option>
                        ))}
                      </Input>
                    </Col>
                    <Col md="3" className="form-group">
                      <Label htmlFor="regDate">วันที่รับ Case</Label>
                      {/* <Input 
                        id="reg_date"
                        name="reg_date"
                        type="text"
                        value={this.state.registration.reg_date}
                        onChange={this.handleChange}
                        placeholder="วันที่รับ Case"
                      /> */}
                      <DatePicker
                        id="reg_date"
                        name="reg_date"
                        dateFormat="yyyy-MM-dd"
                        selected={Date.parse(this.state.registration.reg_date)}
                        onChange={e => this.handleDateChange('reg_date', e)}
                        className="form-control"
                        placeholderText="วันที่รับ Case"
                      />
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter style={{ textAlign: "right" }}>
                  <Button type="submit" size="sm" color="warning">
                    <i className="fa fa-dot-circle-o"></i> แก้ไขทะเบียนผู้ป่วย
                  </Button>
                </CardFooter>
              </Form>
            </Card>
            
            <ModalPatients 
              modal={this.state.modalPatients} 
              toggle={this.togglePatients} 
              onModalSelected={this.handleModalSelected} />

            <ModalICD10s 
              modal={this.state.modalIcd10} 
              toggle={this.toggleIcd10} 
              onModalSelected={this.handleModalSelected} />

          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  registration: state.registration.registration,
  hosps: state.hospcode.hosps,
  pcus: state.hospcode.pcus
});

export default connect(
  mapStateToProps,
  { fetchHosps, fetchPcus, updateRegistration }
)(EditForm);
