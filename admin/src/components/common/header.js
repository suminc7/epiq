import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';

export default class Header extends Component {



    render() {
        return (
            <header id="header" className="media">
                <div className="pull-left h-logo">
                    <a href="index.html" className="hidden-xs">
                        EPIQ VR
                        <small>admin extended</small>
                    </a>

                    <div className="menu-collapse" data-ma-action="sidebar-open" data-ma-target="main-menu">
                        <div className="mc-wrap">
                            <div className="mcw-line top palette-White bg"></div>
                            <div className="mcw-line center palette-White bg"></div>
                            <div className="mcw-line bottom palette-White bg"></div>
                        </div>
                    </div>
                </div>

                <ul className="pull-right h-menu">
                    <li className="hm-search-trigger">
                        <a href="" data-ma-action="search-open">
                            <i className="hm-icon zmdi zmdi-search"></i>
                        </a>
                    </li>

                    <li className="dropdown hidden-xs hidden-sm h-apps">
                        <a data-toggle="dropdown" href="">
                            <i className="hm-icon zmdi zmdi-apps"></i>
                        </a>
                        <ul className="dropdown-menu pull-right">
                            <li>
                                <a href="">
                                    <i className="palette-Red-400 bg zmdi zmdi-calendar"></i>
                                    <small>Calendar</small>
                                </a>
                            </li>

                            <li>
                                <a href="">
                                    <i className="palette-Green-400 bg zmdi zmdi-file-text"></i>
                                    <small>Files</small>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <i className="palette-Light-Blue bg zmdi zmdi-email"></i>
                                    <small>Mail</small>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <i className="palette-Orange-400 bg zmdi zmdi-trending-up"></i>
                                    <small>Analytics</small>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <i className="palette-Purple-300 bg zmdi zmdi-view-headline"></i>
                                    <small>News</small>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <i className="palette-Blue-Grey bg zmdi zmdi-image"></i>
                                    <small>Gallery</small>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="dropdown hidden-xs">
                        <a data-toggle="dropdown" href=""><i className="hm-icon zmdi zmdi-more-vert"></i></a>
                        <ul className="dropdown-menu dm-icon pull-right">
                            <li className="hidden-xs">
                                <a data-action="fullscreen" href=""><i className="zmdi zmdi-fullscreen"></i> Toggle Fullscreen</a>
                            </li>
                            <li>
                                <a data-action="clear-localstorage" href=""><i className="zmdi zmdi-delete"></i> Clear Local Storage</a>
                            </li>
                            <li>
                                <a href=""><i className="zmdi zmdi-face"></i> Privacy Settings</a>
                            </li>
                            <li>
                                <a href=""><i className="zmdi zmdi-settings"></i> Other Settings</a>
                            </li>
                        </ul>
                    </li>
                    <li className="hm-alerts" data-user-alert="sua-messages" data-ma-action="sidebar-open" data-ma-target="user-alerts">
                        <a href=""><i className="hm-icon zmdi zmdi-notifications"></i></a>
                    </li>
                    <li className="dropdown hm-profile">
                        <a data-toggle="dropdown" href="">
                            <img src="img/profile-pics/1.jpg" alt="" />
                        </a>

                        <ul className="dropdown-menu pull-right dm-icon">
                            <li>
                                <a href="profile-about.html"><i className="zmdi zmdi-account"></i> View Profile</a>
                            </li>
                            <li>
                                <a href=""><i className="zmdi zmdi-input-antenna"></i> Privacy Settings</a>
                            </li>
                            <li>
                                <a href=""><i className="zmdi zmdi-settings"></i> Settings</a>
                            </li>
                            <li>
                                <a href=""><i className="zmdi zmdi-time-restore"></i> Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>

                <div className="media-body h-search">
                    <form className="p-relative">
                        <input type="text" className="hs-input" placeholder="Search for people, files & reports"/>
                            <i className="zmdi zmdi-search hs-reset" data-ma-action="search-clear"></i>
                    </form>
                </div>

            </header>
        );
    }
}