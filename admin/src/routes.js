import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';
import Home from "./containers/home";
import Video from "./containers/video";
import User from "./containers/user";
import VideoTotal from "./containers/video/video-total";
import Banner from "./containers/banner";
import BannerWeb from "./containers/banner/banner-web";
import BannerApp from "./containers/banner/banner-app";
import BannerModify from "./containers/banner/banner-modify";
import BannerSorting from "./containers/banner/banner-sorting";
import VideoPremium from "./containers/video/video-premium";
import VideoVRstar from "./containers/video/video-vrstar";
import VideoModify from "./containers/video/video-modify";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="video" component={Video}>
            <Route path="total" component={VideoTotal} />
            <Route path="premium" component={VideoPremium} />
            <Route path="vrstar" component={VideoVRstar} />
            <Route path="modify/:id" component={VideoModify} />
        </Route>
        <Route path="user" component={User} />
        <Route path="banner" component={Banner}>
					<Route path="web" component={BannerWeb} />
					<Route path="app" component={BannerApp} />
					<Route path="new" component={BannerModify} />
					<Route path="sort" component={BannerSorting} />
					<Route path="modify/:id" component={BannerModify} />
				</Route>
    </Route>
)
