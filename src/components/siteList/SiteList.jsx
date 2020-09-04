import React from 'react';
import './siteList.scss';

// chayns-components
import { Button, Input } from 'chayns-components/lib';

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
        this.handleLoadMore = this.handleLoadMore.bind(this);
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
            return { searchTimeout: dTimeout, searchString: event };
        });
    }

    // clears the old site list and searches new sites (if the site list isn't loading)
    async handleSearchSites(string) {
        const { isLoading, searchString } = this.state;
        if (!isLoading && searchString === string) {
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
        }
    }

    // loads and appends list of sites with results of the current search string
    loadSites() {
        const { searchString, skip } = this.state;
        chayns.showWaitCursor();
        this.setState({ isLoading: true });
        fetch(`https://chayns2.tobit.com/SiteSearchApi/location/search/${searchString}/?skip=${skip}&take=31`)
            .then((response) => response.json())
            .then(async (data) => {
                await this.setState((prevState) => {
                    let newListItemComponents = data.map((item) => (
                        <SiteListItem
                            key={item.siteId}
                            siteId={item.siteId}
                            title={item.locationName}
                        />
                    ));
                    // to check if there will be more sites available to load
                    if (newListItemComponents.length === 31) {
                        newListItemComponents = newListItemComponents.slice(0, 30);
                    } else {
                        this.setState({ moreSitesAvailable: false });
                    }
                    return { listItemComponents: [...prevState.listItemComponents, ...newListItemComponents] };
                })
                this.setState({ isLoading: false });
                chayns.hideWaitCursor();
            })
            .catch();
    }

    // increases skip and loads the additional sites
    async handleLoadMore() {
        await this.setState((prevState) => ({ skip: prevState.skip + 30 }));
        this.loadSites();
    }

    render() {
        const { listItemComponents, isLoading, moreSitesAvailable } = this.state;
        return (
            <div>
                <div className="headline__wrapper">
                    <h1> My Favourite Sites </h1>
                    <Input
                        class="search"
                        placeholder="Suche"
                        design={Input.BORDER_DESIGN}
                        icon="fa fa-search"
                        onChange={this.onChangeSearch}
                        className="headline__searchbar"
                    />
                </div>
                <p>
                    Willkommen auf meiner Liste von Chayns-Sites! Hier kannst Du nach Sites suchen und sie Dir ansehen.
                </p>
                <div className="site_list__wrapper">
                    {listItemComponents}
                </div>
                <div className="site_load_button__wrapper">
                    <Button
                        onClick={this.handleLoadMore}
                        disabled={(isLoading || !moreSitesAvailable)}
                    >
                        Mehr laden
                    </Button>
                </div>
            </div>
        );
    }
}

export default SiteList;
