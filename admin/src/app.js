import React from 'react';
import Header from "./components/common/header";
import PageLoader from "./containers/page_loader";
import AsideUserAlerts from "./components/common/aside-user-alerts";
import ASideMainMenu from "./components/common/aside-main-menu";
import Footer from "./components/common/footer";

import $ from 'jquery';
window.$ = $;
window.jQuery = $;


import 'bootstrap';
import 'bootstrap-growl';
import Waves from 'node-waves';

//import './functions';
//import './demo';
import './actions';

//import '../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min';
//import '../node_modules/jquery-bootgrid/dist/jquery.bootgrid.min';



export default class App extends React.Component {

    constructor(props){
        super(props);
    }

	componentDidMount(){
		setTimeout (function () {
			$('.page-loader').fadeOut();
		}, 500);


		/*
		 * Waves Animation
		 */
		(function(){
			Waves.attach('.btn:not(.btn-icon):not(.btn-float)');
			Waves.attach('.btn-icon, .btn-float', ['waves-circle', 'waves-float']);
			Waves.init();
		})();

	}

    render() {
        return (
            <div>
                <Header/>
                <section id="main">
                    <AsideUserAlerts/>
                    <ASideMainMenu/>
                    {this.props.children}
                    <Footer/>
                </section>
                <PageLoader/>
            </div>
        );
    }
}
