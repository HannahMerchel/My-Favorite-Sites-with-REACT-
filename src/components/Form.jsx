import React from 'react';

import { Accordion, Input, Button } from 'chayns-components/lib';

function Form() {
    return (
        <div>
            <Accordion head="Willst Du eine Site vorschlagen?">
                <div className="accordion__content">
                    <Input placeholder="Name" type="name" required={true}/>
                    <Input placeholder="eMail" type="mail" required={true}/>
                    <Input placeholder="Site-Adresse" type="url"/>
                    <Input placeholder="Kommentar" type="text"/>
                    <div style={{ textAlign: 'center', paddingTop: '8px' }}>
                        <Button>Formular versenden</Button>
                    </div>
                </div>
            </Accordion>
        </div>
    );
}

export default Form;
