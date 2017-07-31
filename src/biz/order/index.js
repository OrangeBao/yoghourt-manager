/**
 * Created by baoyinghai on 7/28/17.
 */
import React from 'react';
import {
  Link
} from 'react-router-dom';
import PFetch from '../../framework/fetch';
import DateUtil from '../../framework/utils/DateUtil';
import { Table, Icon, Button, Modal, Form, Input, Popconfirm, message } from 'antd';
import './order.less';

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
            title="收货地址"
            dataIndex="address"
            key="address"
            render={(text, record) => (
              <span className="text-wrapper">{text}</span>
            )}
          />
          <Column
            title="订单状态"
            dataIndex="statue"
            key="statue"
            render={(text) => statueDic[text]}
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
            title="操作"
            key="action"
            render={(text, record) => (
              <span>
                <Link to={{
                  pathname: "/order/" + record.orderId,
                  state: { ...record }
                }}>详情</Link>
              </span>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default Form.create()(Order);