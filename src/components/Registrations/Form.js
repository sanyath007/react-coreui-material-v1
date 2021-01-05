import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Input, Label, Row } from 'reactstrap';

import { fetchHosps, fetchPcus } from '../../redux/hospcode';

import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import th from 'date-fns/locale/th';

registerLocale('th', th)
setDefaultLocale('th');

class NewForm extends Component {
  constructor (props) {
    super(props);
  }

  static propType = {
    fetchHosps: PropTypes.func.isRequired,
    fetchPcus: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchHosps();
    this.props.fetchPcus();
  }

  render () {    
    console.log(this.props.errors)
    return (
      <div className="animated fadeIn">
        <Row form>
          <Col md="4" className="form-group">
            <Label htmlFor="dxDate">วันที่เริ่มวินิจฉัย</Label>
            <DatePicker
              id="dx_date"
              name="dx_date"
              dateFormat="yyyy-MM-dd"
              selected={this.props.registration.dx_date}
              onChange={e => this.props.handleDateChange('dx_date', e)}
              className={`${(this.props.errors && this.props.errors.dx_date) ? 'is-invalid' : ''} form-control`}
              placeholderText="วันที่เริ่มวินิจฉัย"
            />
            <div className="error">
              {this.props.errors && this.props.errors.dx_date && this.props.errors.dx_date[0]}
            </div>
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
                value={this.props.registration.dx}
                onChange={this.props.handleChange}
                className={`${(this.props.errors && this.props.errors.dx) ? 'is-invalid' : ''} form-control`}
                placeholder="ICD10"
              />
              <div className="input-group-append">
                <button 
                  className="btn btn-outline-secondary" 
                  type="button" 
                  id="button-addon2" 
                  onClick={this.props.toggleModalIcd10}
                >
                  <i className="material-icons">search</i>
                </button>
              </div>
              <div className="invalid-feedback">
                {this.props.errors && this.props.errors.dx && this.props.errors.dx.map(msg => {
                  return msg;
                })}
              </div>
            </div>
          </Col>
          <Col md="8" className="form-group">
            <Label htmlFor="dchDate">วินิจฉัยโรค</Label>
            <Input
              id="dx_desc"
              name="dx_desc"
              type="text"
              value={this.props.registration.dx_desc}
              onChange={this.props.handleChange}
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
              value={this.props.registration.dch_hosp}
              onChange={this.props.handleChange}
              className={`${(this.props.errors && this.props.errors.dch_hosp) ? 'is-invalid' : ''} form-control`}
            >
              <option>Choose...</option>
              { this.props.hosps && this.props.hosps.map((h) => (
                <option key={h.hospcode} value={h.hospcode}>{h.name}</option>
              ))}
            </Input>
            <div className="invalid-feedback">
              {this.props.errors && this.props.errors.dch_hosp && this.props.errors.dch_hosp.map(msg => {
                return msg;
              })}
            </div>
          </Col>
          <Col md="3" className="form-group">
            <Label htmlFor="dchDate">วันที่จำหน่าย</Label>
            <DatePicker
              id="dch_date"
              name="dch_date"
              dateFormat="yyyy-MM-dd"
              selected={this.props.registration.dch_date}
              onChange={e => this.props.handleDateChange('dch_date', e)}
              className={`${(this.props.errors && this.props.errors.dch_date) ? 'is-invalid' : ''} form-control`}
              placeholderText="วันที่จำหน่าย"
            />
            <div className="error">
              {this.props.errors && this.props.errors.dch_date && this.props.errors.dch_date[0]}
            </div>
          </Col>
        </Row>

        <Row form>
          <Col md="9" className="form-group">
            <Label htmlFor="pcu">PCU ที่รับดูแล</Label>
            <Input
              type="select"
              id="pcu"
              name="pcu"
              value={this.props.registration.pcu}
              onChange={this.props.handleChange}
              className={`${(this.props.errors && this.props.errors.pcu) ? 'is-invalid' : ''} form-control`}
            >
              <option>Choose...</option>
              { this.props.pcus && this.props.pcus.map((h) => (
                <option key={h.hospcode} value={h.hospcode}>{h.name}</option>
              ))}
            </Input>
            <div className="invalid-feedback">
              {this.props.errors && this.props.errors.pcu && this.props.errors.pcu.map(msg => {
                return msg;
              })}
            </div>
          </Col>
          <Col md="3" className="form-group">
            <Label htmlFor="regDate">วันที่รับ Case</Label>
            <DatePicker
              id="reg_date"
              name="reg_date"
              dateFormat="yyyy-MM-dd"
              selected={this.props.registration.reg_date}
              onChange={e => this.props.handleDateChange('reg_date', e)}
              className={`${(this.props.errors && this.props.errors.reg_date) ? 'is-invalid' : ''} form-control`}
              placeholderText="วันที่รับ Case"
            />
            <div className="error">
              {this.props.errors && this.props.errors.reg_date && this.props.errors.reg_date[0]}
            </div>
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
  {
    fetchHosps, 
    fetchPcus,
  }
)(NewForm);
