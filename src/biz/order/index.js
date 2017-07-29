/**
 * Created by baoyinghai on 7/28/17.
 */
import React from 'react';
import PFetch from '../../framework/fetch';
import DateUtil from '../../framework/utils/DateUtil';
import { Table, Icon, Button, Modal, Form, Input, Popconfirm, message } from 'antd';
import './order.less';

const FormItem = Form.Item;
const { Column } = Table;

const statueDic = ['待确认', '被退回', '已确认', '派送中'];

class Order extends React.Component {

  state = {
    dataSource: [],
    visible: false
  };

  updateDataSource = () => {
    PFetch('/getAllOrdersByTime').then(data => {
      this.setState({
        dataSource: data
      });
    });
  };

  componentDidMount() {
    this.updateDataSource();
  }

  render() {
    const { dataSource } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="order-wrapper">
        <Table dataSource={dataSource}>
          <Column
            title="订单编号"
            dataIndex="orderId"
            key="orderId"
          />
          <Column
            title="订单详情"
            dataIndex="desc"
            key="desc"
          />
          <Column
            title="商品数量"
            dataIndex="count"
            key="count"
          />
          <Column
            title="总价"
            dataIndex="money"
            key="money"
          />
          <Column
            title="下单时间"
            dataIndex="createTime"
            key="createTime"
            render={(text, record) => (
              <span>{DateUtil.format.call(new Date(text), 'yyyy-MM-dd hh:mm:ss')}</span>
            )}
          />
          <Column
            title="收货地址"
            dataIndex="address"
            key="address"
          />
          <Column
            title="收货人姓名"
            dataIndex="name"
            key="name"
          />
          <Column
            title="收货人电话"
            dataIndex="phone"
            key="phone"
          />
          <Column
            title="订单状态"
            dataIndex="statue"
            key="statue"
            render={(text) => statueDic[text]}
          />
          <Column
            title="操作"
            key="action"
            render={(text, record) => (
              <span>
                <Popconfirm title="确定删除该产品？" onConfirm={() => this.confirmDelete(record)} onCancel={this.cancelDelete} okText="确定" cancelText="取消">
                  <a href="#">确认</a>
                </Popconfirm>
                <span className="ant-divider" />
                <a href="#" className="ant-dropdown-link" onClick={() => this.modifyProduction(record)}>
                  退回
                </a>
              </span>
            )}
          />
        </Table>
        <Modal
          title="添加商品"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form className="production-form">
            <FormItem
              label="产品名"
            >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入产品名' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label="单价"
            >
              {getFieldDecorator('price', {
                rules: [{ required: true, message: '请输入产品单价' }],
              })(
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Order);