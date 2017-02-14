import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';

export default class Footer extends Component {



    render() {
        return (
            <footer id="footer">
                Copyright &copy; 2015 Material Admin

                <ul className="f-menu">
                    <li><a href="">Home</a></li>
                    <li><a href="">Dashboard</a></li>
                    <li><a href="">Reports</a></li>
                    <li><a href="">Support</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </footer>
        );
    }
}