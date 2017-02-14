import React, {Component} from 'react';
import {Link} from "react-router";
import activeComponent from 'react-router-active-component';


export default class ASideMainMenu extends Component {


	handleSubmenu(e){
//		e.preventDefault();
//		$(e.target).next().slideToggle(200);
//		$(e.target).parent().toggleClass('toggled');
	}


    render() {

        const NavLink = activeComponent('li');
        const NavLinkSub = activeComponent('li', {link:false});


        return (
            <aside id="s-main-menu" className="sidebar">
                <div className="smm-header">
                    <i className="zmdi zmdi-long-arrow-left" data-ma-action="sidebar-close"></i>
                </div>

                <ul className="smm-alerts">
                    <li data-user-alert="sua-messages" data-ma-action="sidebar-open" data-ma-target="user-alerts">
                        <i className="zmdi zmdi-email"></i>
                    </li>
                    <li data-user-alert="sua-notifications" data-ma-action="sidebar-open" data-ma-target="user-alerts">
                        <i className="zmdi zmdi-notifications"></i>
                    </li>
                    <li data-user-alert="sua-tasks" data-ma-action="sidebar-open" data-ma-target="user-alerts">
                        <i className="zmdi zmdi-view-list-alt"></i>
                    </li>
                </ul>

                <ul className="main-menu">

                    <NavLink to="/" onlyActiveOnIndex>
                        <i className="zmdi zmdi-trending-up"></i> Home
                    </NavLink>
                    {/*<NavLinkSub to="/video" className="sub-menu">*/}
                        {/*<Link to="/video" onClick={this.handleSubmenu} data-ma-action="submenu-toggle"><i className="zmdi zmdi-view-compact"></i> 동영상</Link>*/}
                        {/*<ul>*/}
                            {/*<NavLink to="/video/total">전체 동영상</NavLink>*/}
                            {/*<NavLink to="/video/premium">프리미엄 동영상</NavLink>*/}
                            {/*<NavLink to="/video/vrstar">VR스타 동영상</NavLink>*/}
                        {/*</ul>*/}
                    {/*</NavLinkSub>*/}
									<NavLinkSub to="/banner" className="sub-menu">
										<Link to="/banner" onClick={this.handleSubmenu} data-ma-action="submenu-toggle"><i className="zmdi zmdi-view-compact"></i> 배너</Link>
										<ul>
											<NavLink to="/banner/web">웹 배너</NavLink>
											{/*<NavLink to="/banner/app">앱 배너</NavLink>*/}
											<NavLink to="/banner/sort">배너 순서 관리</NavLink>
										</ul>
									</NavLinkSub>
                </ul>
            </aside>
        )
    }
}