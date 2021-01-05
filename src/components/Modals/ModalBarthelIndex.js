import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';

const initialState = {
  pid: '',
  feeding: '',
  grooming: '',
  transfer: '',
  mobility: '',
  toilet: '',
  dressing: '',
  stair: '',
  bathing: '',
  bowel: '',
  bladder: ''
};

class ModalBarthelIndex extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.patient !== this.props.patient) {
      console.log(`prev: ${this.props.patient}, current: ${nextProps.patient}`);
      this.setState({ pid: nextProps.patient });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const { pid, ...barthel} = this.state;
    
    let score = Object.values(barthel).reduce((score, b) => {
      return score + parseInt(b);
    }, 0);

    barthel['score'] = score;

    this.props.onModalSaved(barthel);

    this.setState(initialState);
  }

  render() {
    const { modal, toggle, className } = this.props;

    return (
      <Modal
        isOpen={modal}
        toggle={toggle}
        size="lg"
        id="modal-barthel-index"
        className={className}
      >
        <Form onSubmit={this.handleSubmit}>
          <ModalHeader toggle={toggle}>ประเมินความสามารถในการดำเนินชีวิตประจำวัน</ModalHeader>
          <ModalBody>
            <Table responsive hover>
              <thead>
                <tr>
                  <th style={{ width: '50%'}}>วินิจฉัยโรค</th>
                  <th>ประเมินคะแนน</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1. Feeding การรับประทานอาหาร เมื่อเตรียมสำรับไว้เรียบร้อยต่อหน้า</td>
                  <td>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="feeding0"
                        name="feeding"
                        value="0"
                        onChange={this.handleChange}
                      /> ตักเองไม่ได้ ต้องมีคนป้อน (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="feeding5"
                        name="feeding"
                        value="5"
                        onChange={this.handleChange}
                      /> ตักเองได้ แต่ต้องมีคนช่วย (5)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="feeding10"
                        name="feeding"
                        value="10"
                        onChange={this.handleChange}
                      /> ตักช่อยเหลือตนเองได้ (10)  
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td>2. Grooming ล้างหน้า แปรงฟัน หวีผม</td>
                  <td>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="grooming0"
                        name="grooming"
                        value="0"
                        onChange={this.handleChange}
                      /> ต้องการความช่วยเหลือ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="grooming5"
                        name="grooming"
                        value="5"
                        onChange={this.handleChange}
                      /> ทำเองได้ (5)  
                    </FormGroup>
                  </td>            
                </tr>
                <tr>
                  <td>3. Transfer ลุกนั่งจากที่นอน หรือจากเตียงไปยังเก้าอี้</td>
                  <td>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="transfer"
                        name="transfer"
                        value="0"
                        onChange={this.handleChange}
                      /> ไม่สามารถนั่งได้ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="transfer0"
                        name="transfer"
                        value="5"
                        onChange={this.handleChange}
                      /> ต้องการความช่วยเหลืออย่างมากจึงจะนั่งได้ (5)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="transfer5"
                        name="transfer"
                        value="10"
                        onChange={this.handleChange}
                      /> ต้องการความช่วยเหลือหรือช่วยพยุงเล็กน้อย (10)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="transfer10"
                        name="transfer"
                        value="15"
                        onChange={this.handleChange}
                      /> ทำเองได้ (15)  
                    </FormGroup>
                  </td>            
                </tr>
                <tr>
                  <td>4. Mobility การเคลื่อนที่ภายในห้องหรือบ้าน</td>
                  <td>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="mobility0"
                        name="mobility"
                        value="0"
                        onChange={this.handleChange}
                      /> เคลื่อนที่ไปไหนไม่ได้ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="mobility5"
                        name="mobility"
                        value="5"
                        onChange={this.handleChange}
                      /> ใช้รถเข็นช่วยตัวเองเคลื่อนที่ได้เอง (5)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="mobility10"
                        name="mobility"
                        value="10"
                        onChange={this.handleChange}
                      /> เดินหรือเคลื่อนที่โดยมีคนช่วยพยุง (10)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="mobility15"
                        name="mobility"
                        value="15"
                        onChange={this.handleChange}
                      /> เดินหรือเคลื่อนที่ได้เอง (15)  
                    </FormGroup>
                  </td>            
                </tr>
                <tr>
                  <td>5. Toilet การใช้ห้องน้ำ</td>
                  <td>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="toilet0"
                        name="toilet"
                        value="0"
                        onChange={this.handleChange}
                      /> ช่วยเหลือตนเองไม่ได้ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="toilet5"
                        name="toilet"
                        value="5"
                        onChange={this.handleChange}
                      /> ทำเองได้บ้าง (5)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="toilet10"
                        name="toilet"
                        value="10"
                        onChange={this.handleChange}
                      /> ช่วยเหลือตนเองได้ทั้งหมด (10)  
                    </FormGroup>
                  </td>            
                </tr>
                <tr>
                  <td>6. Dressing การสวมใส่เสื้อผ้า</td>
                  <td>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="dressing0"
                        name="dressing"
                        value="0"
                        onChange={this.handleChange}
                      /> สวมใส่เองแทบไม่ได้ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="dressing5"
                        name="dressing"
                        value="5"
                        onChange={this.handleChange}
                      /> สวมใส่เองได้ร้อยละ 50 (5)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="dressing10"
                        name="dressing"
                        value="10"
                        onChange={this.handleChange}
                      /> สวมใส่เองได้ทั้งหมด (10)  
                    </FormGroup>
                  </td>            
                </tr>
                <tr>
                  <td>7. Stair การขึ้นลงบันได 1 ขั้น</td>
                  <td>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="stair0"
                        name="stair"
                        value="0"
                        onChange={this.handleChange}
                      /> ช่วยเหลือตนเองไม่ได้ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="stair5"
                        name="stair"
                        value="5"
                        onChange={this.handleChange}
                      /> ทำเองได้บ้าง (5)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="stair10"
                        name="stair"
                        value="10"
                        onChange={this.handleChange}
                      /> ช่วยเหลือตนเองได้ทั้งหมด (10)  
                    </FormGroup>
                  </td>            
                </tr>
                <tr>
                  <td>8. Bathing การอาบน้ำ</td>
                  <td>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="bathing0"
                        name="bathing"
                        value="0"
                        onChange={this.handleChange}
                      /> ต้องการความช่วยเหลือ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="bathing5"
                        name="bathing"
                        value="5"
                        onChange={this.handleChange}
                      /> ทำเองได้ (5)  
                    </FormGroup>
                  </td>            
                </tr>
                <tr>
                  <td>9. Bowel การกลั้น ถ่ายอุจจาระใน 1 สัปดาห์ที่ผ่านมา</td>
                  <td>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="bowel0"
                        name="bowel"
                        value="0"
                        onChange={this.handleChange}
                      /> กลั้นไม่ได้หรือต้องสวนอุจจาระเสมอ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="bowel5"
                        name="bowel"
                        value="5"
                        onChange={this.handleChange}
                      /> กลั้นไม่ได้บางครั้ง (5)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="bowel10"
                        name="bowel"
                        value="10"
                        onChange={this.handleChange}
                      /> กลั้นได้ปกติ (10)  
                    </FormGroup>
                  </td>            
                </tr>
                <tr>
                  <td>10. Bladder การกลั้น ถ่ายปัสสาวะใน 1 สัปดาห์ที่ผ่านมา</td>
                  <td>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="bladder0"
                        name="bladder"
                        value="0"
                        onChange={this.handleChange}
                      /> กลั้นไม่ได้หรือใช้สายสวนปัสสาวะเสมอ (0)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="bladder5"
                        name="bladder"
                        value="5"
                        onChange={this.handleChange}
                      /> กลั้นไม่ได้บางครั้ง (5)  
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="radio"
                        id="bladder15"
                        name="bladder"
                        value="10"
                        onChange={this.handleChange}
                      /> กลั้นได้ปกติ (10)  
                    </FormGroup>
                  </td>            
                </tr>
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" size="sm" color="primary">
              <i className="fa fa-dot-circle-o"></i> บันทึกการประเมิน
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default ModalBarthelIndex;
