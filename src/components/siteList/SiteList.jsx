import React from 'react';
import './siteList.scss';

// chayns-components
import { Button, Input, Accordion } from 'chayns-components/lib';

// components
import SiteListItem from './siteListItem/SiteListItem';


// component with a search bar, sites-list and load-more button
class SiteList extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            searchString: 'ahaus',
            skip: 0,
            listItemComponents: [],
            isLoading: false,
            moreSitesAvailable: true,
        };
        this.loadSites = this.loadSites.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.handleSearchSites = this.handleSearchSites.bind(this);
    }

    // loads the first 30 Sites when the component is created
    componentDidMount() {
        this.loadSites();
    }

    // starts a timer to search new sites (first clears the previous one)
    onChangeSearch(event) {
        this.setState((prevState) => {
            clearTimeout(prevState.searchTimeout);
            const dTimeout = setTimeout(() => {
                this.handleSearchSites(event);
            }, 500);
            return { searchTimeout: dTimeout };
        });
    }

    // clears the old site list and searches new sites (once the site list isn't loading)
    async handleSearchSites(string) {
        const { isLoading } = this.state;
        if (!isLoading) {
            await this.setState((prevState) => {
                clearTimeout(prevState.searchTimeout);
                return {
                    isLoading: true,
                    skip: 0,
                    searchString: string !== '' ? string : 'ahaus',
                    listItemComponents: [],
                };
            });
            this.loadSites();
        } else {
            this.onChangeSearch(string);
        }
    }

    // loads and appends list of sites with results of the current search string
    loadSites() {
        const { searchString, skip } = this.state;
        chayns.showWaitCursor();
        this.setState({ isLoading: true });
        fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchString}&Skip=${skip}&Take=31`)
            .then((response) => response.json())
            .then(async (data) => {
                await this.setState((prevState) => {
                    let newListItemComponents = (data.Data).map((item) => (
                        <SiteListItem
                            key={item.siteId}
                            siteId={item.siteId}
                            title={item.appstoreName}
                        />
                    ));
                    // to check if there will be more sites available to load
                    if (newListItemComponents.length === 31) {
                        newListItemComponents = newListItemComponents.slice(0, 30);
                    } else {
                        this.setState({ moreSitesAvailable: false });
                    }
                    return { listItemComponents: [...prevState.listItemComponents, ...newListItemComponents] };
                });
                this.setState({ isLoading: false });
                chayns.hideWaitCursor();
            })
            .catch();
    }

    // increases skip and loads the additional sites
    async loadMore() {
        await this.setState((prevState) => ({ skip: prevState.skip + 30 }));
        this.loadSites();
    }

    render() {
        const { listItemComponents, isLoading, moreSitesAvailable } = this.state;
        return (
            <div>
                <Accordion head="Sites" defaultOpened onSearch={this.onChangeSearch}>
                    <div className="accordion__content">
                        <div className="site_list__wrapper">
                            {listItemComponents}
                        </div>
                        <div className="site_load_button__wrapper">
                            <Button
                                onClick={this.loadMore}
                                disabled={(isLoading || !moreSitesAvailable)}
                            >
                                Mehr laden
                            </Button>
                        </div>
                    </div>
                </Accordion>
            </div>
        );
    }
}

/* 
                <Input
                    class="search"
                    placeholder="Suche"
                    design={Input.BORDER_DESIGN}
                    icon="fa fa-search"
                    onChange={this.onChangeSearch}
                    className="site_search__input"
                /> */

export default SiteList;
