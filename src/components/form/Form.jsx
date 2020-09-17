import React from 'react';
import './form.scss';

// chayns-components
import { Accordion, Input, Button } from 'chayns-components/lib';

// component that consists of a form in a accordion
function Form() {
    const [name, setName] = React.useState('');
    const [eMail, setEMail] = React.useState('');
    const [adress, setAdress] = React.useState('');
    const [comment, setComment] = React.useState('');

    // sends a message to site (this site) with the form content and clears the form
    function submit() {
        if (!(name === '' || eMail === '')) {
            let message = `Nachricht von My Favourite Site:\nName: ${name};\n eMail: ${eMail};\n SiteAdresse: `;
            message += adress !== '' ? adress : '/';
            message += ';\n Kommentar: ';
            message += comment !== '' ? `${comment};` : '/;';
            chayns.intercom.sendMessageToPage({ text: message });
            setName('');
            setEMail('');
            setAdress('');
            setComment('');
            chayns.dialog.alert('', 'Vielen Dank für Deinen Vorschlag!\nDein Formula wurde versandt.');
        }
    }

    return (
        <div>
            <Accordion head="Willst Du eine Site vorschlagen?">
                <div className="accordion__content">
                    <Input
                        placeholder="Name"
                        type="name"
                        required
                        value={name}
                        onChange={(event) => { setName(event); }}
                    />
                    <Input
                        placeholder="eMail"
                        type="mail"
                        required
                        value={eMail}
                        onChange={(event) => { setEMail(event); }}
                    />
                    <Input
                        placeholder="Site-Adresse"
                        type="url"
                        value={adress}
                        onChange={(event) => { setAdress(event); }}
                    />
                    <Input
                        placeholder="Kommentar"
                        type="text"
                        value={comment}
                        onChange={(event) => { setComment(event); }}
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
        </div>
    );
}

export default Form;
