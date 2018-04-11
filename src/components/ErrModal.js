import React, { Component } from 'react';
import { connect } from 'react-redux'
import Pages from './Pages'
import { getAdmin, saveAdmin, getAdminInfo } from '../actions'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import AdminForm from './forms/AdminForm'
import SubmitValidationForm from './forms/SubmitValidationForm'
const ErrModal = ({ msg, label, type, meta: { touched, error } }) => (
  <Modal isOpen={this.state.showEditUser} toggle={() => this.toggleShowEditUser()}
    className={'modal-primary ' + this.props.className}>
    <ModalHeader toggle={() => this.toggleShowEditUser()}>修改用户</ModalHeader>
    <ModalBody>
      {/* <Form action="" method="post" onSubmit={(e) => this.handleSubmit(e)}>
                                  <FormGroup>
                                    <InputGroup>
                                      <InputGroupAddon >登录名称</InputGroupAddon>
                                      <Input type="text" id="loginName" name="loginName" value={this.state.loginName} />
                                      <InputGroupAddon><i className="fa fa-user"></i></InputGroupAddon>
                                    </InputGroup>
                                  </FormGroup>
                                  <FormGroup>
                                    <InputGroup>
                                      <InputGroupAddon >真实姓名</InputGroupAddon>
                                      <Input type="text" id="realName" name="realName" value={this.state.realName} />
                                      <InputGroupAddon><i className="fa fa-user"></i></InputGroupAddon>
                                    </InputGroup>
                                  </FormGroup>

                                  <FormGroup className="form-actions">
                                    <Button type="submit" color="primary">保存</Button>&nbsp;&nbsp;
                    <Button onClick={() => this.toggleShowEditUser()} color="secondary">取消</Button>
                                  </FormGroup>
                                </Form> */}
      <AdminForm onSubmit={this.submit} />
    </ModalBody>
    {/*   <ModalFooter>
                                <Button color="primary" onClick={this.toggleShowEditUser}>Do Something</Button>{' '}
                                <Button color="secondary" onClick={this.toggleShowEditUser}>Cancel</Button>
                              </ModalFooter> */}
  </Modal>
)
export default ErrModal