import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router'

export default class PageLoader extends Component {

    render() {
        return (
            <div className="page-loader palette-Teal bg">
                <div className="preloader pl-xl pls-white">
                    <svg className="pl-circular" viewBox="25 25 50 50">
                        <circle className="plc-path" cx="50" cy="50" r="20"/>
                    </svg>
                </div>
            </div>
        );
    }
}
