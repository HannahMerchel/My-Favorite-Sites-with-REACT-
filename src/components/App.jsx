import { hot } from 'react-hot-loader/root';
import React from 'react';

// Components
import SiteList from './siteList/SiteList';
import Form from './form/Form';

const App = () => (
    <>
        <SiteList/>
        <Form/>
    </>
);

export default App;
export const HotApp = hot(App);
