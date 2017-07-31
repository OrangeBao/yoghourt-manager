/**
 * Created by baoyinghai on 7/28/17.
 */
import React from 'react';
import PFetch from '../../framework/fetch';
import { Table, Icon, Button, Modal, Form, Input, Popconfirm, message } from 'antd';
import "./production.less";

const FormItem = Form.Item;
const { Column } = Table;

class Production extends React.Component {

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

  confirmDelete = record => {
    PFetch('/deleteProduction', {productionId: record.productionId}).then(data => {
      this.updateDataSource();
      message.success('删除成功！');
    }).catch(e => {
      console.error(e);
      message.error('删除失败！');
    });
  };

  cancelDelete = () => {
    // message.error('Click on No');
  };

  updateDataSource = () => {
    this.setState({loading: true}, () => PFetch('/getAllProductionsByPage', {currentPage: this.state.pagination.current - 1, pageSize: this.state.pagination.pageSize}).then(data => {
      const pagination = {
        ...this.state.pagination,
        total: data.count
      };
      this.setState({
        dataSource: data.data,
        loading: false,
        pagination
      });
    }));
  };

  componentDidMount() {
    this.updateDataSource();
  }

  showModal = id => this.setState({ visible: true, productionId: id });

  handleOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(this.state.productionId);
        if (this.state.productionId) {
          const pro = this.state.dataSource.filter(p => p.productionId === this.state.productionId)[0]
          PFetch('/modifyProduction', Object.assign({}, pro, values)).then(() => {
            this.handleCancel();
            this.updateDataSource();
            message.success('修改成功！');
          }).catch(e => {
            console.error(e);
            message.error('修改失败！');
          });
        } else {
          PFetch('/addProduction', Object.assign({monthSell: 0, imgId: 'title'}, values)).then(() => {
            this.handleCancel();
            this.updateDataSource();
            message.success('添加成功！');
          }).catch(e => {
            console.error(e);
            message.error('添加失败！');
          });
        }
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    }, () => this.props.form.resetFields());
  };

  handleSubmit = () => {

  };

  modifyProduction = record => {
    this.props.form.setFieldsValue({
      ...record
    });
    this.showModal(record.productionId);
  };

  render() {
    const { dataSource, loading, pagination } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="production-wrapper">
        <div className="button-bar">
          <Button onClick={() => this.showModal()}>添加产品</Button>
        </div>
        <Table dataSource={dataSource} loading={loading} pagination={pagination} onChange={this.pageChange}>
          <Column
            title="产品编号"
            dataIndex="productionId"
            key="productionId"
          />
          <Column
            title="产品名称"
            dataIndex="title"
            key="title"
          />
          <Column
            title="月销"
            dataIndex="monthSell"
            key="monthSell"
          />
          <Column
            title="单价"
            dataIndex="price"
            key="price"
          />
          <Column
            title="图片"
            dataIndex="imgId"
            key="imgId"
          />
          <Column
            title="操作"
            key="action"
            render={(text, record) => (
              <span>
                <Popconfirm title="确定删除该产品？" onConfirm={() => this.confirmDelete(record)} onCancel={this.cancelDelete} okText="确定" cancelText="取消">
                  <a href="#">删除</a>
                </Popconfirm>
                <span className="ant-divider" />
                <a href="#" className="ant-dropdown-link" onClick={() => this.modifyProduction(record)}>
                  修改
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

export default Form.create()(Production);