import React,{Component} from 'react'
import { Menu, Icon } from 'antd';
import { NavLink,withRouter} from 'react-router-dom'
import { navMenus } from '../../utils/utils';

const { SubMenu, Item} = Menu;

const {admin_menus} = navMenus();

class AdminNav extends Component {

    state = {
        selectedKeys:[],
    }
    componentDidMount() {
        this.handlePop()
        window.addEventListener("popstate", this.handlePop)
    }
    componentWillUnmount() {
        window.removeEventListener("popstate", this.handlePop)
    }
    // 获取激活的菜单
    getSelectedKeys = () => {
        // console.log(this.props.location.pathname);
        return [ this.props.location.pathname ]
    }
    //前进和后退的监听执行
    handlePop=()=>{
        // console.log(this.props.history.location);
        this.setState({
            selectedKeys: this.getSelectedKeys(),
        })
    }

    onMenuItemClick = ({ item, key }) => {
        this.setState({
            selectedKeys: [key]
        })
    }

    render() {
        const {selectedKeys} = this.state
        return(
        <Menu
            selectedKeys={selectedKeys}
            mode="vertical"
            onClick={this.onMenuItemClick}
        >
            {
                admin_menus.map(v => {
                    return v.subMenu?
                        <SubMenu key={v.key} title={<span><Icon type={v.icon} /><span>{v.name}</span></span>}>
                        {
                            v.subMenu.map(k => 
                                <Menu.Item key={k.NavLinkTo}>
                                    <NavLink to={k.NavLinkTo} exact activeStyle={{color:'darkmagenta',fontSize:20}}>
                                        <span className="NavLink-text">{k.name}</span>
                                    </NavLink>
                                </Menu.Item>)
                        }
                        </SubMenu>
                        :
                        <Menu.Item key={v.NavLinkTo}>
                            <NavLink to={v.NavLinkTo}exact  activeStyle={{color:'darkmagenta',fontSize:20}}>
                                <Icon type={v.icon}/>
                                <span className="NavLink-text">{v.name}</span>
                            </NavLink>
                        </Menu.Item>
                })
            }
        </Menu>)
    }
}
export default withRouter(AdminNav);