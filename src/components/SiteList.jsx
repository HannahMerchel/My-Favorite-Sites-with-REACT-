import React, { useEffect, useState } from 'react';

import { Button, Input, CHAYNS_CSS_VERSION } from 'chayns-components/lib';

import SiteListItem from './SitesListItem';

class SitesList extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            searchString: 'love',
            skip: 10,
            itemComponents: [<SiteListItem key="0"/>, <SiteListItem key="1"/>]
        };
        this.loadSites = this.loadSites.bind(this);
    }

    componentDidMount() {
        this.loadSites();
    }

    loadSites() {
        chayns.showWaitCursor();
        fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${this.state.searchString}&Skip=${this.state.skip}&Take=30`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    itemComponents: (data.Data).map((item) => (<SiteListItem key={item.siteId} siteId={item.siteId} image={`https://chayns.tobit.com/storage/${item.siteId}/Images/icon-57.png`} title={item.appstoreName}/>))
                });
                chayns.hideWaitCursor();
            });
    }

    render() {
        return (
            <div>
                <Input class="input" placeholder="Suche" design={Input.BORDER_DESIGN} icon="fa fa-search"/>
                <div
                    style={{
                        paddingTop: '8px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        placeItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    {this.state.itemComponents}
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button>Mehr laden</Button>
                </div>
            </div>
        )
    }
}

export default SitesList;
