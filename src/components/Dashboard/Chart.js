import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';

class DashboardChart extends Component {
  render() {
    return (
      <Card>
        <CardBody>
          <Row>
            <Col sm="5">
              <CardTitle className="mb-0">{this.props.title}</CardTitle>
              <div className="small text-muted">{this.props.subtitle}</div>
            </Col>
            <Col sm="7" className="d-none d-sm-inline-block">
              <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
              <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                <ButtonGroup className="mr-3" aria-label="First group">
                  <Button color="outline-secondary" onClick={() => this.props.onRadioBtnClick(1)} active={this.props.radioSelected === 1}>Day</Button>
                  <Button color="outline-secondary" onClick={() => this.props.onRadioBtnClick(2)} active={this.props.radioSelected === 2}>Month</Button>
                  <Button color="outline-secondary" onClick={() => this.props.onRadioBtnClick(3)} active={this.props.radioSelected === 3}>Year</Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Col>
          </Row>
          <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
            <Line data={this.props.chartData} options={this.props.chartOptions} height={300} />
          </div>
        </CardBody>
        <CardFooter>
          <Row className="text-center">
            <Col sm={12} md className="mb-sm-2 mb-0">
              <div className="text-muted">Visits</div>
              <strong>29.703 Users (40%)</strong>
              <Progress className="progress-xs mt-2" color="success" value="40" />
            </Col>
            <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Unique</div>
              <strong>24.093 Users (20%)</strong>
              <Progress className="progress-xs mt-2" color="info" value="20" />
            </Col>
            <Col sm={12} md className="mb-sm-2 mb-0">
              <div className="text-muted">Pageviews</div>
              <strong>78.706 Views (60%)</strong>
              <Progress className="progress-xs mt-2" color="warning" value="60" />
            </Col>
            <Col sm={12} md className="mb-sm-2 mb-0">
              <div className="text-muted">New Users</div>
              <strong>22.123 Users (80%)</strong>
              <Progress className="progress-xs mt-2" color="danger" value="80" />
            </Col>
            <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Bounce Rate</div>
              <strong>Average Rate (40.15%)</strong>
              <Progress className="progress-xs mt-2" color="primary" value="40" />
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

export default DashboardChart;