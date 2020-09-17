import React, { useState } from 'react';
import './form.scss';

// chayns-components
import { Accordion, Input, Button } from 'chayns-components/lib';

// component that consists of a form in a accordion
const Form = () => {
    const [name, setName] = useState('');
    const [eMail, setEMail] = useState('');
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');

    // sends a message to site (this site) with the form content and clears the form
    const submit = () => {
        if (!(name === '' || eMail === '')) {
            let message = `Nachricht von My Favourite Site:\nName: ${name};\n eMail: ${eMail};\n SiteAdresse: `;
            message += address !== '' ? address : '/';
            message += ';\n Kommentar: ';
            message += comment !== '' ? `${comment};` : '/;';
            chayns.intercom.sendMessageToPage({ text: message });
            setName('');
            setEMail('');
            setAddress('');
            setComment('');
            chayns.dialog.alert('', 'Vielen Dank für Deinen Vorschlag!\nDein Formula wurde versandt.');
        }
    }

    return (
        <Accordion head="Willst Du eine Site vorschlagen?">
            <div className="accordion__content">
                <Input
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(event) => {
                        setName(event);
                    }}
                />
                <Input
                    placeholder="eMail"
                    required
                    value={eMail}
                    onChange={(event) => {
                        setEMail(event);
                    }}
                />
                <Input
                    placeholder="Site-Adresse"
                    value={address}
                    onChange={(event) => {
                        setAddress(event);
                    }}
                />
                <Input
                    placeholder="Kommentar"
                    value={comment}
                    onChange={(event) => {
                        setComment(event);
                    }}
                />
                <div className="submit_button__wrapper">
                    <Button
                        onClick={submit}
                        disabled={name === '' || eMail === ''}
                    >
                        Formular versenden
                    </Button>
                </div>
            </div>
        </Accordion>
    );
};

export default Form;
