import React, { useEffect, useState } from 'react';

import { Button, Input, CHAYNS_CSS_VERSION } from 'chayns-components/lib';

import SiteListItem from './SitesListItem';

class SitesList extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            searchString: 'love',
            skip: 0,
            itemComponents: [],
            loading: false,
            moreSitesAvailable: true,
        };
        this.loadSites = this.loadSites.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.searchSites = this.searchSites.bind(this);
    }

    componentDidMount() {
        this.loadSites();
    }

    onChangeSearch(event) {
        this.setState((prevState) => {
            clearTimeout(prevState.timeout);
            const dTimeout = setTimeout(() => {
                this.searchSites(event);
            }, 500);
            return { timeout: dTimeout };
        });
    };

    async searchSites(string) {
        if (this.state.timeout) {
            await this.setState((prevState) => {
                clearTimeout(prevState.timeout);
                return {
                    loading: true,
                    skip: 0,
                    searchString: string,
                    itemComponents: [],
                };
            });
            this.loadSites();
        }
    }

    loadSites() {
        chayns.showWaitCursor();
        this.setState({ loading: true })
        fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${this.state.searchString}&Skip=${this.state.skip}&Take=31`)
            .then((response) => response.json())
            .then((data) => {
                this.setState((prevState) => {
                    let itemComponents = [...prevState.itemComponents]
                    itemComponents.push((data.Data).map((item) => (
                        <SiteListItem
                            key={item.siteId}
                            siteId={item.siteId}
                            image={`https://chayns.tobit.com/storage/${item.siteId}/Images/icon-57.png`} title={item.appstoreName}
                        />
                    )));
                    // check ahead if there are more Sites
                    if (itemComponents[0].length === 31) {
                        itemComponents = itemComponents[0].slice(0, 30);
                    }
                    else {
                        this.setState({ moreSitesAvailable: false })
                    }
                    return { itemComponents: itemComponents }
                });
                this.setState({loading: false })
                chayns.hideWaitCursor();
            });
    }

    async loadMore() {
        await this.setState((prevState) => {
            return { skip: prevState.skip + 30 }
        });
        this.loadSites();
    }

    render() {
        return (
            <div>
                <Input
                    class="input"
                    placeholder="Suche"
                    design={Input.BORDER_DESIGN}
                    icon="fa fa-search"
                    onChange={this.onChangeSearch}
                />
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
                    <Button onClick={this.loadMore} disabled={(this.state.loading || !this.state.moreSitesAvailable)}>Mehr laden</Button>
                </div>
            </div>
        )
    }
}

export default SitesList;
