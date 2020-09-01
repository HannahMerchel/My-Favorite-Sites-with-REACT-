import { hot } from 'react-hot-loader/root';
import React from 'react';

// Components
import SiteList from './siteList/SiteList';
import Intro from './intro/Intro';
import Form from './form/Form';


function App() {
    return (
        <div>
            <Intro/>
            <SiteList/>
            <Form/>
        </div>
    );
}

export default App;
export const HotApp = hot(App);
