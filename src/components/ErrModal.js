import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { closeError } from '../actions/common'
import TopModal from './TopModal'
let ErrModal = ({dispatch,show,msg}) => (
  <TopModal isOpen={show} toggle={() => dispatch(closeError())}
    /* className={'modal-primary ' + this.props.className} */>
    <ModalHeader  toggle={() => dispatch(closeError())}>错误</ModalHeader>
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
      
    </ModalBody>
      <ModalFooter>
                                <Button color="primary" onClick={() => dispatch(closeError())}>关闭</Button>{' '}
                               {/*  <Button color="secondary" onClick={this.toggleShowEditUser}>Cancel</Button> */}
                              </ModalFooter>
  </TopModal>
)


const mapStateToProps = (state) => {
  let err = state.err
  let show=err.show
  let msg=err.msg
  return {show,msg}
}

ErrModal = connect(
  mapStateToProps
)(ErrModal)

export default ErrModal