/**
 * Created by baoyinghai on 7/31/17.
 */
import React from 'react';
import { Table, Icon, Button, Modal, Form, Input, Popconfirm, message, Row, Col } from 'antd';
import DateUtil from '../../framework/utils/DateUtil';
import PFetch from '../../framework/fetch';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

class OrderDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSubmit = () => {

  };

  cancelDelete = () => {
    // message.error('Click on No');
  };

  confirmOrder = () => {
    const { location } = this.props;
    PFetch('/changeOrderState', {orderId: location.state.orderId, statue: 2}).then(data => {
      // const { dataSource } = this.state;
      // const newD = dataSource && dataSource.map(r => {
      //     if (r.orderId === record.orderId) {
      //       return {
      //         ...record, statue: 2
      //       }
      //     }
      //     return r;
      //   });
      // this.setState({dataSource: newD});
      message.success('订单确认成功！');
    }).catch(e => {
      message.error('订单确认失败！');
      console.log(e);
    })
  };

  confirmReturn = () => {
    const { location } = this.props;
    PFetch('/changeOrderState', {orderId: location.state.orderId, statue: 1}).then(data => {
      message.success('订单退回成功！');
    }).catch(e => {
      message.error('订单退回失败！');
      console.log(e);
    })
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const { location } = this.props;
    console.log(location);
    return (
      <Form className="order-form">
        <FormItem
          label="订单编号"
          {...formItemLayout}
        >
          {getFieldDecorator('orderId', {})(
            <span>{location.state.orderId}</span>
          )}
        </FormItem>
        <FormItem
          label="订单详情"
          {...formItemLayout}
        >
          {getFieldDecorator('desc', {})(
            <div>
              {location.state.desc.split(';').map(item => <p>{item}</p>)}
            </div>
          )}
        </FormItem>
        <FormItem
          label="商品数量"
          {...formItemLayout}
        >
          {getFieldDecorator('count', {})(
            <span>{location.state.count}</span>
          )}
        </FormItem>
        <FormItem
          label="总价"
          {...formItemLayout}
        >
          {getFieldDecorator('money', {})(
            <span>{location.state.money}</span>
          )}
        </FormItem>
        <FormItem
          label="下单时间"
          {...formItemLayout}
        >
          {getFieldDecorator('createTime', {})(
            <span>{DateUtil.format.call(new Date(location.state.createTime), 'yyyy-MM-dd hh:mm:ss')}</span>
          )}
        </FormItem>
        <FormItem
          label="收货地址"
          {...formItemLayout}
        >
          {getFieldDecorator('address', {})(
            <span>{location.state.address}</span>
          )}
        </FormItem>
        <FormItem
          label="收货人"
          {...formItemLayout}
        >
          {getFieldDecorator('name', {})(
            <span>{location.state.name}</span>
          )}
        </FormItem>
        <FormItem
          label="收货人电话"
          {...formItemLayout}
        >
          {getFieldDecorator('phone', {})(
            <span>{location.state.phone}</span>
          )}
        </FormItem>
        <FormItem
          label="订单状态"
          {...formItemLayout}
        >
          {getFieldDecorator('statue', {})(
            <span>{location.state.statue}</span>
          )}
        </FormItem>
        <FormItem>
          <Button size='default' onClick={this.confirmOrder} type="primary" className="btn-confirm">
            确认订单
          </Button>

          <Button size='default' onClick={this.confirmReturn} type="default" className="btn-return">
            退回订单
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(OrderDetail);