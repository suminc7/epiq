import React, {Component} from 'react';


export default class AsideUserAlerts extends Component {


    render() {
        return (
            <aside id="s-user-alerts" className="sidebar">
                <ul className="tab-nav tn-justified tn-icon m-t-10" data-tab-color="teal">
                    <li><a className="sua-messages" href="#sua-messages" data-toggle="tab"><i className="zmdi zmdi-email"></i></a></li>
                    <li><a className="sua-notifications" href="#sua-notifications" data-toggle="tab"><i className="zmdi zmdi-notifications"></i></a></li>
                    <li><a className="sua-tasks" href="#sua-tasks" data-toggle="tab"><i className="zmdi zmdi-view-list-alt"></i></a></li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade" id="sua-messages">
                        <ul className="sua-menu list-inline list-unstyled palette-Light-Blue bg">
                            <li><a href=""><i className="zmdi zmdi-check-all"></i> Mark all</a></li>
                            <li><a href=""><i className="zmdi zmdi-long-arrow-tab"></i> View all</a></li>
                            <li><a href="" data-ma-action="sidebar-close"><i className="zmdi zmdi-close"></i> Close</a></li>
                        </ul>

                        <div className="list-group lg-alt c-overflow">
                            <a href="" className="list-group-item media">
                                <div className="pull-left">
                                    <img className="avatar-img" src="img/profile-pics/1.jpg" alt=""/>
                                </div>

                                <div className="media-body">
                                    <div className="lgi-heading">David Villa Jacobs</div>
                                    <small className="lgi-text">Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis lobortis sapien non posuere</small>
                                </div>
                            </a>

                            <a href="" className="list-group-item media">
                                <div className="pull-left">
                                    <img className="avatar-img" src="img/profile-pics/5.jpg" alt=""/>
                                </div>
                                <div className="media-body">
                                    <div className="lgi-heading">Candice Barnes</div>
                                    <small className="lgi-text">Quisque non tortor ultricies, posuere elit id, lacinia purus curabitur.</small>
                                </div>
                            </a>

                            <a href="" className="list-group-item media">
                                <div className="pull-left">
                                    <img className="avatar-img" src="img/profile-pics/3.jpg" alt=""/>
                                </div>
                                <div className="media-body">
                                    <div className="lgi-heading">Jeannette Lawson</div>
                                    <small className="lgi-text">Donec congue tempus ligula, varius hendrerit mi hendrerit sit amet. Duis ac quam sit amet leo feugiat iaculis</small>
                                </div>
                            </a>

                            <a href="" className="list-group-item media">
                                <div className="pull-left">
                                    <img className="avatar-img" src="img/profile-pics/4.jpg" alt=""/>
                                </div>
                                <div className="media-body">
                                    <div className="lgi-heading">Darla Mckinney</div>
                                    <small className="lgi-text">Duis tincidunt augue nec sem dignissim scelerisque. Vestibulum rhoncus sapien sed nulla aliquam lacinia</small>
                                </div>
                            </a>

                            <a href="" className="list-group-item media">
                                <div className="pull-left">
                                    <img className="avatar-img" src="img/profile-pics/2.jpg" alt=""/>
                                </div>
                                <div className="media-body">
                                    <div className="lgi-heading">Rudolph Perez</div>
                                    <small className="lgi-text">Phasellus a ullamcorper lectus, sit amet viverra quam. In luctus tortor vel nulla pharetra bibendum</small>
                                </div>
                            </a>
                        </div>

                        <a href="" className="btn btn-float btn-danger m-btn">
                            <i className="zmdi zmdi-plus"></i>
                        </a>
                    </div>
                    <div className="tab-pane fade" id="sua-notifications">
                        <ul className="sua-menu list-inline list-unstyled palette-Orange bg">
                            <li><a href=""><i className="zmdi zmdi-volume-off"></i> Mute</a></li>
                            <li><a href=""><i className="zmdi zmdi-long-arrow-tab"></i> View all</a></li>
                            <li><a href="" data-ma-action="sidebar-close"><i className="zmdi zmdi-close"></i> Close</a></li>
                        </ul>

                        <div className="list-group lg-alt c-overflow">
                            <a href="" className="list-group-item media">
                                <div className="pull-left">
                                    <img className="avatar-img" src="img/profile-pics/1.jpg" alt=""/>
                                </div>

                                <div className="media-body">
                                    <div className="lgi-heading">David Villa Jacobs</div>
                                    <small className="lgi-text">Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis lobortis sapien non posuere</small>
                                </div>
                            </a>

                            <a href="" className="list-group-item media">
                                <div className="pull-left">
                                    <img className="avatar-img" src="img/profile-pics/5.jpg" alt=""/>
                                </div>
                                <div className="media-body">
                                    <div className="lgi-heading">Candice Barnes</div>
                                    <small className="lgi-text">Quisque non tortor ultricies, posuere elit id, lacinia purus curabitur.</small>
                                </div>
                            </a>

                            <a href="" className="list-group-item media">
                                <div className="pull-left">
                                    <img className="avatar-img" src="img/profile-pics/3.jpg" alt=""/>
                                </div>
                                <div className="media-body">
                                    <div className="lgi-heading">Jeannette Lawson</div>
                                    <small className="lgi-text">Donec congue tempus ligula, varius hendrerit mi hendrerit sit amet. Duis ac quam sit amet leo feugiat iaculis</small>
                                </div>
                            </a>

                            <a href="" className="list-group-item media">
                                <div className="pull-left">
                                    <img className="avatar-img" src="img/profile-pics/4.jpg" alt=""/>
                                </div>
                                <div className="media-body">
                                    <div className="lgi-heading">Darla Mckinney</div>
                                    <small className="lgi-text">Duis tincidunt augue nec sem dignissim scelerisque. Vestibulum rhoncus sapien sed nulla aliquam lacinia</small>
                                </div>
                            </a>

                            <a href="" className="list-group-item media">
                                <div className="pull-left">
                                    <img className="avatar-img" src="img/profile-pics/2.jpg" alt=""/>
                                </div>
                                <div className="media-body">
                                    <div className="lgi-heading">Rudolph Perez</div>
                                    <small className="lgi-text">Phasellus a ullamcorper lectus, sit amet viverra quam. In luctus tortor vel nulla pharetra bibendum</small>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="sua-tasks">
                        <ul className="sua-menu list-inline list-unstyled palette-Green-400 bg">
                            <li><a href=""><i className="zmdi zmdi-time"></i> Archived</a></li>
                            <li><a href=""><i className="zmdi zmdi-check-all"></i> Mark all</a></li>
                            <li><a href="" data-ma-action="sidebar-close"><i className="zmdi zmdi-close"></i> Close</a></li>
                        </ul>

                        <div className="list-group lg-alt c-overflow">
                            <div className="list-group-item">
                                <div className="lgi-heading m-b-5">HTML5 Validation Report</div>

                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100" style={{'width': '95%'}}>
                                        <span className="sr-only">95% Complete (success)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="lgi-heading m-b-5">Google Chrome Extension</div>

                                <div className="progress">
                                    <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{'width': '80%'}}>
                                        <span className="sr-only">80% Complete (success)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="lgi-heading m-b-5">Social Intranet Projects</div>

                                <div className="progress">
                                    <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{'width': '20%'}}>
                                        <span className="sr-only">20% Complete</span>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="lgi-heading m-b-5">Bootstrap Admin Template</div>

                                <div className="progress">
                                    <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{'width': '60%'}}>
                                        <span className="sr-only">60% Complete (warning)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="lgi-heading m-b-5">Youtube Client App</div>

                                <div className="progress">
                                    <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{'width': '80%'}}>
                                        <span className="sr-only">80% Complete (danger)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a href="" className="btn btn-float btn-danger m-btn">
                            <i className="zmdi zmdi-plus"></i>
                        </a>
                    </div>
                </div>
            </aside>
        )
    }
}