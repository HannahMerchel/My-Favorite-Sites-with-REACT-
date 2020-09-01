import React from 'react';

// component that shows a title and introduction-paragraph
function Intro() {
    return (
        <div>
            <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', marginBottom: '5px' }}>
                <h1> My Favourite Sites </h1>
            </div>
            <p style={{ marginBottom: '0px' }}>
                Willkommen auf meiner Liste von Chayns-Sites! Hier kannst Du nach Sites suchen und sie Dir ansehen.
            </p>
        </div>
    );
}

export default Intro;
