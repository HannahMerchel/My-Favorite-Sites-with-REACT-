import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';

// Components
import SitesList from './SiteList';
import Intro from './Intro';
import Form from './Form';


class App extends PureComponent {
    render() {
        return (
            <div>
                <Intro/>
                <SitesList/>
                <Form/>
            </div>
        );
    }
}

export default App;
export const HotApp = hot(App);
