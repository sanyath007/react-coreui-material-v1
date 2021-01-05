import React, { Component } from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader
} from 'reactstrap';

import MapContainer from '../Maps/MapContainer'

const ModalMap = (props) => {
  const { isOpen, toggle, className } = props;

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl" className={className}>
      <ModalHeader toggle={toggle}>พิกัดที่อยู๋ (ละติจูด, ลองติจูด)</ModalHeader>
      <ModalBody>
        <div style={{ height: '480px' }}>
          <MapContainer />
        </div>
      </ModalBody>
    </Modal>
  );
}

export default ModalMap;
