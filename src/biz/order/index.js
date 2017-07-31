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
    visible: false,
    loading: true,
    pagination: {
      pageSize: 10,
      current: 1,
      defaultCurrent: 0,
      total:0
    }
  };

  pageChange = (pagination, filters, sorter) => {
    const { current } = pagination;
    this.setState({pagination: pagination}, () => {
      this.updateDataSource(current - 1)
    });
  };

  updateDataSource = () => {
    this.setState({loading: true}, () => {
      PFetch('/getAllOrdersByTimeAndPage', {currentPage: this.state.pagination.current - 1, pageSize: this.state.pagination.pageSize}).then(data => {
        const pagination = {
          ...this.state.pagination,
          total: data.count
        };
        this.setState({
          dataSource: data.data,
          loading: false,
          pagination
        });
      });
    });
  };

  componentDidMount() {
    this.updateDataSource();
  }

  cancelDelete = () => {
    // message.error('Click on No');
  };

  confirmOrder = record => {
    PFetch('/changeOrderState', {orderId: record.orderId, statue: 2}).then(data => {
      const { dataSource } = this.state;
      const newD = dataSource && dataSource.map(r => {
        if (r.orderId === record.orderId) {
          return {
            ...record, statue: 2
          }
        }
        return r;
      });
      this.setState({dataSource: newD});
      message.success('订单确认成功！');
    }).catch(e => {
      message.error('订单确认失败！');
      console.log(e);
    })
  };

  confirmReturn = record => {
    PFetch('/changeOrderState', {orderId: record.orderId, statue: 1}).then(data => {
      const { dataSource } = this.state;
      const newD = dataSource && dataSource.map(r => {
          if (r.orderId === record.orderId) {
            return {
              ...record, statue: 1
            }
          }
          return r;
        });
      this.setState({dataSource: newD});
      message.success('订单退回成功！');
    }).catch(e => {
      message.error('订单退回失败！');
      console.log(e);
    })
  };

  render() {
    const { dataSource, loading, pagination } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="order-wrapper">
        <Table dataSource={dataSource} loading={loading} pagination={pagination} onChange={this.pageChange}>
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
                <Popconfirm title="确定接受该产品？" onConfirm={() => this.confirmOrder(record)} onCancel={this.cancelDelete} okText="确定" cancelText="取消">
                  <a href="#">接受</a>
                </Popconfirm>
                <span className="ant-divider" />
                <Popconfirm title="确定退回该产品？" onConfirm={() => this.confirmReturn(record)} onCancel={this.cancelDelete} okText="确定" cancelText="取消">
                  <a href="#">退回</a>
                </Popconfirm>
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