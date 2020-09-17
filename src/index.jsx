import ReactDOM from 'react-dom';
import React from 'react';

// Components
import App from './components/App';

// Get tapp element
const tappElement = document.querySelector('.tapp');

// Render App component into tapp element
// If mode is development the component will be used from hot export of App
const render = () => {
    ReactDOM.render(
        <App/>,
        tappElement,
    );
};

// Call render function after chayns is ready
chayns.ready.then(render).catch((error) => {
    // eslint-disable-next-line no-console
    console.warn('No chayns environment found.', error);
});
