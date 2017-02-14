import React, { Component } from 'react';

export default class HomeContent extends Component {

    componentDidMount(){
        // console.log(salvattore);

        // var grid = document.querySelector('#c-grid');
        // var item = document.createElement('article');
        // salvattore.registerGrid(grid);
        // salvattore.appendElements(grid, [item]);
        // item.outerHTML = 'I’ve been appended!2';
    }

    render() {
        return (
            <section id="content">
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>Sales Statistics <small>Vestibulum purus quam scelerisque, mollis nonummy metus</small></h2>

                            <ul className="actions">
                                <li>
                                    <a href="">
                                        <i className="zmdi zmdi-check-all"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="zmdi zmdi-trending-up"></i>
                                    </a>
                                </li>
                                <li className="dropdown">
                                    <a href="" data-toggle="dropdown">
                                        <i className="zmdi zmdi-more-vert"></i>
                                    </a>

                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li>
                                            <a href="">Change Date Range</a>
                                        </li>
                                        <li>
                                            <a href="">Change Graph Type</a>
                                        </li>
                                        <li>
                                            <a href="">Other Settings</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <div className="card-body">
                            <div className="chart-edge">
                                <div id="curved-line-chart" className="flot-chart "></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
