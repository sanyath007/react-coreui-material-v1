import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  ButtonDropdown,
  ButtonGroup,
  Card,
  CardBody,

  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,

} from 'reactstrap';

import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

class DashboardCard extends Component {
  render() {
    const { _id, card, toggle, chartData, chartOptions, bgClass, chartWrapper, chartType } = this.props;

    return (
      <Col xs="12" sm="6" lg="3">
        <Card className={bgClass}>
          <CardBody className="pb-0">
            <ButtonGroup className="float-right">
              <ButtonDropdown id={_id} isOpen={card} toggle={toggle}>
                <DropdownToggle caret className="p-0" color="transparent">
                  <i className="icon-settings"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another action</DropdownItem>
                  <DropdownItem disabled>Disabled action</DropdownItem>
                  <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ButtonGroup>
            <div className="text-value">9.823</div>
            <div>Members online</div>
          </CardBody>
          <div className={chartWrapper} style={{ height: '70px' }}>
            { chartType === 'line'
                ? <Line data={chartData} options={chartOptions} height={70} />
                : <Bar data={chartData} options={chartOptions} height={70} />
            }
          </div>
        </Card>
      </Col>
    );
  }
}

export default DashboardCard;