import { hot } from 'react-hot-loader/root';
import React from 'react';

// Components
import SiteList from './siteList/SiteList';
import Header from './header/Header';
import Form from './form/Form';


function App() {
    return (
        <div>
            <Header/>
            <SiteList/>
            <Form/>
        </div>
    );
}

export default App;
export const HotApp = hot(App);
