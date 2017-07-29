import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Home, Order, Production, Login } from './biz';
import { getLoginFlag } from './framework/utils/SessionUtil';
import './style/index.less';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class SiderDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      isLogin: getLoginFlag()
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  renderPage = () => {
    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
            <SubMenu
              key="production"
              title={<span><Icon type="user" /><span>产品</span></span>}
            >
              <Menu.Item key="productionManager">
                <Link to="/production">产品管理</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="order"
              title={<span><Icon type="team" /><span>订单</span></span>}
            >
              <Menu.Item key="orderManager">
                <Link to="/order">订单管理</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="about">
              <Icon type="file" />
              <span><Link className="root-menu" to="/">关于我们</Link></span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px', flexDirection: 'column', display: 'flex' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360, display: 'flex', flex: 1 }}>
              <Route exact path="/" component={Home}/>
              <Route path="/order" component={Order}/>
              <Route path="/production" component={Production}/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  };

  render() {
    return (
      <Router>
        {this.state.isLogin ? this.renderPage() : <Login loginCallBack={() => this.setState({isLogin: true})}/>}
      </Router>
    );
  }
};

