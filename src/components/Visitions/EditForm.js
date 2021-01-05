import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { range } from 'lodash';
import uuid from 'uuid';
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
} from "reactstrap";
import TagsInput from 'react-tagsinput';
import Dropzone from 'react-dropzone';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';

import ModalPatients from '../Modals/ModalPatients';
import ModalBarthelIndex from '../Modals/ModalBarthelIndex';

import { updateVisition } from '../../redux/visitions';
import { addBarthel } from '../../redux/barthel';
// CSS
import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';

import th from 'date-fns/locale/th';

registerLocale('th', th)
setDefaultLocale('th');

const initialState = {
  visition: {
    id: '',
    pid: '',
    patient_name: '',
    visit_count: 1,
    visit_date: '',
    visitors: [],
    barthel_score: '',
    impairment: '',
    complication: '',
    is_rehab: '',
    visit_status: '',
    attachments: [],
  },
  barthel: null,
  modalPatient: false,
  modalBarthel: false,
};

const fileBoxStyle = {
  border: '1px solid #e4e7ea',
  borderRadius: '2px',
  minHeight: '50px',
  padding: '10px'
}

const thumbnailStyle = {
  width: '120px',
  height: '120px'
}

class NewForm extends Component {
  constructor (props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleTagsInputChange = this.handleTagsInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  static propTypes = {
    visition: PropTypes.any,
    updateVisition: PropTypes.func.isRequired,
    addBarthel: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.visition !== this.props.visition) {
      const { age_y, created_at, updated_at, ...visition } = nextProps.visition

      this.setState(prevState => {
        return {
          ...prevState,
          visition: {
            visit_date: moment(visition.visit_date).format('DD/MM/YYYY'),
            visitors: visition.visitors.split(','),
            ...prevState.visition,
            ...visition
          }
        };
      });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState(prevState => {
      return {
        ...prevState,
        visition: {
          ...prevState.visition,
          [name]: value
        }
      };
    });
  }
  
  handleDateChange = (name, date) => {
    this.setState(prevState => {
      return {
        ...prevState,
        visition: {
          ...prevState.visition,
          [name]: date
        }
      };
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();

    // Add patient pid and visition data to barthel
    // if(barthel) {
    //   barthel['pid'] = this.state.pid;
    //   barthel['visit_count'] = this.state.visit_count;
    //   barthel['visit_date'] = moment(this.state.visit_date).format('YYYY-MM-DD');
  
    //   this.props.addBarthel(barthel);
    // }
    
    const { id, patient_name, ...visition} = this.state.visition;
    // Cast datetime to string format
    visition['visit_date'] = moment(visition.visit_date).format('YYYY-MM-DD');
    // Store data to db.
    this.props.updateVisition(id, visition, this.props.history);

    this.setState( this.initialState);
  }

  handleTagsInputChange (tags) {
    this.setState({ visitors: tags });
  }
  
  handleDrop (acceptedFiles) {
    this.setState({ 
      attachments: this.state.attachments.concat(acceptedFiles) });
  }
  
  toggleModalPatient = () => {
    this.setState({
      modalPatient: !this.state.modalPatient
    });
  }
  
  toggleModalBarthel = () => {
    this.setState({
      modalBarthel: !this.state.modalBarthel
    });
  }

  handleModalSelected = (e, obj) => {
    this.setState({
      pid: obj.pid,
      patient_name: obj.pname + obj.fname + ' ' + obj.lname,
      modalPatient: !this.state.modalPatient
    });
  }

  handleModalSaved = (barthel) => {
    console.log(barthel);

    this.setState({
      modalBarthel: !this.state.modalBarthel,
      barthel_score: barthel.score,
      barthel: barthel,
    });
  }

  render () {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" sm="6">
            <Card>
              <Form onSubmit={this.handleSubmit}>
                <CardHeader>
                  <strong>Edit Visition</strong>
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
                          value={this.state.visition.pid}
                          onChange={this.handleChange}
                          placeholder="PID"
                        />
                        <div className="input-group-append">
                          <button 
                            type="button" 
                            id="btnPatient" 
                            className="btn btn-outline-secondary" 
                            onClick={this.toggleModalPatient}
                          >
                            <i className="material-icons">search</i>
                          </button>
                        </div>
                      </div>
                    </Col>
                    <Col md="8" className="form-group">
                      <Label htmlFor="dchDate">ชื่อ-สกุลผู้ป่วย</Label>
                      <Input
                        id="patient_name"
                        name="patient_name"
                        type="text"
                        value={this.state.visition.patient_name}
                        placeholder="ชื่อ-สกุลผู้ป่วย"
                        readOnly
                      />
                    </Col>
                    <Col md="6">
                      <Label htmlFor="visitCount">ครั้งที่</Label>
                      <Input
                        type="select"
                        id="visit_count"
                        name="visit_count"
                        value={this.state.visition.visit_count}
                        onChange={this.handleChange}
                        placeholder="ครั้งที่"
                      >
                        { range(1, 11).map(count => (
                          <option value={count} key={ uuid() }>{count}</option>
                        ))}
                      </Input>
                    </Col>
                    <Col md="6" className="form-group">
                      <Label htmlFor="visitDate">วันที่เยี่ยมบ้าน</Label>
                      {/* <Input 
                        id="visit_date"
                        name="visit_date"
                        type="text"
                        value={this.state.visit_date}
                        onChange={this.handleChange}
                        placeholder="วันที่เยี่ยมบ้าน"
                      /> */}
                      <DatePicker
                        id="visit_date"
                        name="visit_date"
                        dateFormat="yyyy-MM-dd"
                        selected={Date.parse(this.state.visition.visit_date)}
                        onChange={e => this.handleDateChange('visit_date', e)}
                        className="form-control"
                        placeholderText="วันที่เริ่มวินิจฉัย"
                      />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="12" className="form-group">
                      <Label htmlFor="visitors">บุคลากร</Label>
                      {/* <TagsInput
                        id="visitors"
                        name="visitors"
                        value={this.state.visition.visitors}
                        onChange={this.handleTagsInputChange}
                      /> */}
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="4" className="form-group">
                      <Label htmlFor="barthelScore">Barthel Score</Label>
                      <div className="input-group mb-0">
                        <Input
                          id="barthel_score"
                          name="barthel_score"
                          type="text"
                          value={this.state.visition.barthel_score}
                          onChange={this.handleChange}
                          placeholder="Barthel Score"
                        />
                        <div className="input-group-append">
                          <button
                            type="button"
                            id="btnBarthel"
                            className="btn btn-outline-secondary"
                            onClick={this.toggleModalBarthel}
                          >
                            <i className="material-icons">ประเมิน</i>
                          </button>
                        </div>
                      </div>
                    </Col>
                    <Col md="4" className="form-group">
                      <Label htmlFor="age">Impairment</Label>
                      <Input
                        type="select"
                        id="impairment"
                        name="impairment"
                        value={this.state.visition.impairment}
                        onChange={this.handleChange}
                      >
                        <option value="">Choose...</option>
                        <option value="1">Swallowing problem</option>
                        <option value="2">Communication problem</option>
                        <option value="3">Mobility problem</option>
                        <option value="4">Cognitive and perception problem</option>
                        <option value="5">Bowel and bladder problem</option>
                      </Input>
                    </Col>
                    <Col md="4">
                      <Label htmlFor="sex">Complication</Label>
                      <Input
                        type="select"
                        id="complication"
                        name="complication"
                        value={this.state.visition.complication}
                        onChange={this.handleChange}
                      >
                        <option value="">Choose...</option>
                        <option value="1">Bedsore grade (1-4)</option>
                        <option value="2">Urinary tract infection (UTI)</option>
                        <option value="3">Aspirate pneumonia</option>
                      </Input>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="6" className="form-group">
                      <Label htmlFor="road">การ Rehab</Label>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="is_rehab"
                            value="1"
                            checked={this.state.visition.is_rehab === 1}
                            onChange={this.handleChange} />{' '}ได้รับการ Rehab
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="is_rehab"
                            value="0"
                            checked={this.state.visition.is_rehab === 0}
                            onChange={this.handleChange} />{' '}ไม่ได้รับการ Rehab
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <Label htmlFor="moo">สถานะการเยี่ยม</Label>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="visit_status"
                            value="1"
                            checked={this.state.visition.visit_status === 1}
                            onChange={this.handleChange} />{' '}
                          พบผู้ป่วย
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="visit_status"
                            value="0"
                            checked={this.state.visition.visit_status === 0}
                            onChange={this.handleChange} />{' '}
                          ไม่พบผู้ป่วย
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="visit_status"
                            value="2"
                            checked={this.state.visition.visit_status === 2}
                            onChange={this.handleChange} />{' '}
                          ผู้ป่วยย้ายที่อยู่
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="visit_status"
                            value="3"
                            checked={this.state.visition.visit_status === 3}
                            onChange={this.handleChange} />{' '}
                          เสียชีวิตแล้ว
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="12" className="form-group">
                      <Label htmlFor="attachments">รูปถ่าย/ไฟล์ </Label>
                      {/* <Dropzone onDrop={this.handleDrop} multiple>
                        {({getRootProps, getInputProps, isDragActive}) => (
                          <div {...getRootProps()} style={fileBoxStyle}>
                            <input {...getInputProps()} />
                            {isDragActive ? `Drop it like it's Hot!` : 'Click me or drag a file to upload!'}

                            <Row form>
                              { this.state.attachments.length > 0 && this.state.attachments.map(file => (
                                <Col md="3" key={file.name}>
                                  <img src={URL.createObjectURL(file)} style={ thumbnailStyle } alt="" /> {file.name}
                                </Col>
                              ))}
                            </Row>
                          </div>
                        )}
                      </Dropzone> */}
                    </Col>
                  </Row>
          
                </CardBody>
                <CardFooter style={{ textAlign: "right" }}>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> บันทึกการเยี่ยม
                  </Button>
                </CardFooter>
              </Form>
            </Card>

            <ModalPatients
              modal={this.state.modalPatient}
              toggle={this.toggleModalPatient}
              onModalSelected={this.handleModalSelected} />
            
            <ModalBarthelIndex
              modal={this.state.modalBarthel}
              toggle={this.toggleModalBarthel}
              patient={this.state.pid}
              onModalSaved={this.handleModalSaved} />
              
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  visition: state.visition.visition
});

export default connect(
  mapStateToProps,
  { updateVisition, addBarthel }
)(NewForm);
