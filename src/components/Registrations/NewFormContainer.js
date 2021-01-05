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
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import moment from 'moment';

import { addPatient } from '../../redux/patients';
import { addRegistration } from '../../redux/registrations';

import RegistrationForm from '../Registrations/Form';
import PatientForm from '../Patients/Form';
import ModalICD10s from '../Modals/ModalICD10s';

const initialState = {
  registration: {
    cid: '',
    dx: '',
    dx_desc: '',
    dx_date: '',
    dch_hosp: '',
    dch_date: '',
    pcu: '',
    reg_date: '',
    reg_status: '',
  },
  patient: {
    pid: '',
    hn: '',
    cid: '',
    pname: '',
    fname: '',
    lname: '',
    birthdate: '',
    age_y: '',
    sex: '',
    tel: '',
    address: '',
    moo: '',
    road: '',
    tambon: '',
    amphur: '',
    changwat: '',
    zipcode: '',
    latlong: ''
  },
  modalIcd10: false,
  activeTab: new Array(4).fill('1'),
};

class NewFormContainer extends Component {
  constructor (props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.toggleModalIcd10 = this.toggleModalIcd10.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
  }

  static propType = {
    addPatient: PropTypes.func.isRequired,
    addRegistration: PropTypes.func.isRequired
  };
  
  toggleModalIcd10() {
    this.setState({
      modalIcd10: !this.state.modalIcd10
    })
  }

  handleChange(e) {
    const { name, value } = e.target;
    const activedTab = this.state.activeTab[0];

    if(activedTab == 1) {
      this.setState(prevState => {
        return {
          ...prevState,
          patient: {
            ...prevState.patient,
            [name]: value
          }
        }
      });
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          registration: {
            ...prevState.registration,
            [name]: value
          }
        }
      });
    }
  }

  handleDateChange = (name, date) => {
    const activedTab = this.state.activeTab[0];

    if(activedTab == 1) {
      this.setState(prevState => {
        return {
          ...prevState,
          patient: {
            ...prevState.patient,
            [name]: date
          }
        };
      });
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          registration: {
            ...prevState.registration,
            [name]: date
          }
        }
      });
    }
  }
  
  calAgeYFromBirthdate = (value) => {
    let _bdY = moment(value).format('YYYY');
    let _curY = moment(Date.now()).format('YYYY');
    let _ageY = _curY - _bdY;

    this.setState(prevState => ({
      ...prevState,
      patient: {
        ...prevState.patient,
        age_y: _ageY.toString(),
      }
    }));
  }

  handleSelectedPname = (value) => {
    let _sex = ([2,4,5].indexOf(parseInt(value)) !== -1) ? 2 : 1;
    
    this.setState(prevState => ({
      ...prevState,
      patient: {
        ...prevState.patient,
        sex: _sex.toString(),
      }
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const { patient, registration } = this.state;

    const newRegistration = {
      ...registration,
      cid: patient.cid,
      reg_date: moment(registration.reg_date).format('YYYY-MM-DD'),
      dx_date: moment(registration.dx_date).format('YYYY-MM-DD'),
      dch_date: moment(registration.dch_date).format('YYYY-MM-DD')
    }

    const newPatient = {
      ...patient,
      birthdate: moment(patient.birthdate).format('YYYY-MM-DD')
    }

    console.log(newPatient, newRegistration)
    this.props.addPatient(newPatient);
    this.props.addRegistration(newRegistration);

    // this.setState(initialState);

    // this.props.history.push('/registrations');
  }

  handleModalSelected = (e, obj) => {
    if(this.state.modalIcd10) {
      this.setState(prevState => {
        return {
          ...prevState,
          registration: {
            ...prevState.registration,
            dx: obj.code,
            dx_desc: obj.name,
          },
          modalIcd10: !this.state.modalIcd10
        }
      });
    }
  }
  
  toggleTab(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          <PatientForm
            patient={this.state.patient}
            handleChange={this.handleChange}
            handleDateChange={this.handleDateChange}
            handleSelectedPname={this.handleSelectedPname}
            calAgeYFromBirthdate={this.calAgeYFromBirthdate}
            errors={this.props.patientErrors}
          />
        </TabPane>
        <TabPane tabId="2">
          <RegistrationForm
            registration={this.state.registration}
            handleChange={this.handleChange}
            handleDateChange={this.handleDateChange}
            toggleModalIcd10={this.toggleModalIcd10}
            errors={this.props.regisErrors}
          />
        </TabPane>
      </>
    );
  }

  render () {    
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
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        active={this.state.activeTab[0] === '1'}
                        onClick={() => { this.toggleTab(0, '1'); }}
                      >
                        ข้อมูลผู้ป่วย
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        active={this.state.activeTab[0] === '2'}
                        onClick={() => { this.toggleTab(0, '2'); }}
                      >
                        การลงทะเบียน IMC
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab[0]}>
                    {this.tabPane()}
                  </TabContent>
                </CardBody>
                <CardFooter style={{ textAlign: "right" }}>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> ลงทะเบียนผู้ป่วย
                  </Button>
                </CardFooter>
              </Form>
            </Card>

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
  patientErrors: state.patient.errors,
  regisErrors: state.registration.errors
});

export default connect(
  mapStateToProps,
  {
    addPatient,
    addRegistration
  }
)(NewFormContainer);
