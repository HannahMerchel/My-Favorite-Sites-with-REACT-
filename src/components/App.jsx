import { hot } from 'react-hot-loader/root';
import React from 'react';

// Components
import SitesList from './SiteList';
import Intro from './Intro';
import Form from './Form';


function App() {
    return (
        <div>
            <Intro/>
            <SitesList/>
            <Form/>
        </div>
    );
}

export default App;
export const HotApp = hot(App);
