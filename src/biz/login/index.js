import React from 'react';
import './index.less';
import PFetch from '../../framework/fetch';
import { saveLoginFlag } from '../../framework/utils/SessionUtil';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

  state = {
    errorMsg: null
  };

  resetErrorMsg = () => {
    if (this.state.errorMsg !== null) {
      this.setState({errorMsg: null});
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        PFetch('/managerLogin', values).then(response => {
          if (response.code === 2) {
            saveLoginFlag(true);
            this.props.loginCallBack(values);
          } else if (response.code === 0) {
            this.setState({errorMsg: '用户不存在'});
          } else if (response.code === 1) {
            this.setState({errorMsg: '密码错误'});
          } else {
            this.setState(JSON.stringify(response));
          }
        });
        // this.props.loginCallBack(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-wrapper">
        <div className="title">yoghourt 管理系统</div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input onChange={this.resetErrorMsg} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input onChange={this.resetErrorMsg} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <span className="err-wrapper">{this.state.errorMsg}</span>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(NormalLoginForm);

