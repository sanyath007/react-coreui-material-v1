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

import { fetchHosps, fetchPcus } from '../../redux/hospcode';
import { addRegistration } from '../../redux/registrations';

import ModalPatients from '../Modals/ModalPatients';
import ModalICD10s from '../Modals/ModalICD10s';

import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import th from 'date-fns/locale/th';

registerLocale('th', th)
setDefaultLocale('th');

const initialState = {
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
  reg_status: '',
  modalPatients: false,
  modalIcd10: false
};

class NewForm extends Component {
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
    fetchHosps: PropTypes.func.isRequired,
    fetchPcus: PropTypes.func.isRequired,
    addRegistration: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchHosps();
    this.props.fetchPcus();
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

    this.setState({
      [name]: value
    });
  }

  handleDateChange = (name, date) => {
    this.setState({ [name]: date });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    
    const { id, patient_name, dx_desc, modalIcd10, modalPatients, ...registration } = this.state;

    this.props.addRegistration(registration);

    this.setState(initialState);

    this.props.history.push('/registrations');
  }

  handleModalSelected = (e, obj) => {
    console.log(obj)
    if(this.state.modalPatients) {
      this.setState({
        pid: obj.pid,
        patient_name: obj.pname + obj.fname + ' ' + obj.lname,
        modalPatients: !this.state.modalPatients
      })
    } else {
      this.setState({
        dx: obj.code,
        dx_desc: obj.name,
        modalIcd10: !this.state.modalIcd10
      })
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
                  <strong>New Registration</strong>
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
                          value={this.state.pid}
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
                        value={this.state.patient_name}
                        onChange={this.handleChange}
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
                        value={this.state.dx_date}
                        onChange={this.handleChange}
                        placeholder="วันที่เริ่มวินิจฉัย"
                      /> */}
                      <DatePicker
                        id="dx_date"
                        name="dx_date"
                        dateFormat="yyyy-MM-dd"
                        selected={this.state.dx_date}
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
                          value={this.state.dx}
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
                        value={this.state.dx_desc}
                        onChange={this.handleChange}
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
                        value={this.state.dch_hosp}
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
                        value={this.state.dch_date}
                        onChange={this.handleChange}
                        placeholder="วันที่ D/C"
                      /> */}
                      <DatePicker
                        id="dch_date"
                        name="dch_date"
                        dateFormat="yyyy-MM-dd"
                        selected={this.state.dch_date}
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
                        value={this.state.pcu}
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
                        value={this.state.reg_date}
                        onChange={this.handleChange}
                        placeholder="วันที่รับ Case"
                      /> */}
                      <DatePicker
                        id="reg_date"
                        name="reg_date"
                        dateFormat="yyyy-MM-dd"
                        selected={this.state.reg_date}
                        onChange={e => this.handleDateChange('reg_date', e)}
                        className="form-control"
                        placeholderText="วันที่รับ Case"
                      />
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter style={{ textAlign: "right" }}>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> ลงทะเบียนผู้ป่วย
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
  hosps: state.hospcode.hosps,
  pcus: state.hospcode.pcus
});

export default connect(
  mapStateToProps,
  { fetchHosps, fetchPcus, addRegistration }
)(NewForm);
