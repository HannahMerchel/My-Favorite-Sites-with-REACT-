import React from 'react';
import './siteList.scss';

// chayns-components
import { Button, Input } from 'chayns-components/lib';

// components
import SiteListItem from './siteListItem/SitesListItem';


// component with a search bar, sites-list and load-more button
class SiteList extends React.PureComponent {
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

    // loads the first 30 Sites when the cpmonent is created
    componentDidMount() {
        this.loadSites();
    }

    // starts a timer to search new sites (frist clears the previous one)
    onChangeSearch(event) {
        this.setState((prevState) => {
            clearTimeout(prevState.timeout);
            const dTimeout = setTimeout(() => {
                this.searchSites(event);
            }, 500);
            return { timeout: dTimeout };
        });
    }

    // clears the old site list and searches new sites (once the site list isn't loading)
    async searchSites(string) {
        const { loading } = this.state;
        if (!loading) {
            await this.setState((prevState) => {
                clearTimeout(prevState.timeout);
                return {
                    loading: true,
                    skip: 0,
                    searchString: string !== '' ? string : 'love',
                    itemComponents: [],
                };
            });
            this.loadSites();
        } else {
            this.onChangeSearch(string);
        }
    }

    // loads and appends list of sites with the current search string
    loadSites() {
        const { searchString, skip } = this.state;
        chayns.showWaitCursor();
        this.setState({ loading: true });
        fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchString}&Skip=${skip}&Take=31`)
            .then((response) => response.json())
            .then((data) => {
                this.setState((prevState) => {
                    let newItemComponents = (data.Data).map((item) => (
                        <SiteListItem
                            key={item.siteId}
                            siteId={item.siteId}
                            title={item.appstoreName}
                        />
                    ));
                    // to check if there will be more sites available to load
                    if (newItemComponents.length === 31) {
                        newItemComponents = newItemComponents.slice(0, 30);
                    } else {
                        this.setState({ moreSitesAvailable: false });
                    }
                    return { itemComponents: [...prevState.itemComponents, ...newItemComponents] };
                });
                this.setState({ loading: false });
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
        const { itemComponents, loading, moreSitesAvailable } = this.state;
        return (
            <div>
                <Input
                    class="input"
                    placeholder="Suche"
                    design={Input.BORDER_DESIGN}
                    icon="fa fa-search"
                    onChange={this.onChangeSearch}
                    className="site_search__input"
                />
                <div className="site_list__wrapper">
                    {itemComponents}
                </div>
                <div className="site_load_button__wrapper">
                    <Button
                        onClick={this.loadMore}
                        disabled={(loading || !moreSitesAvailable)}
                    >
                        Mehr laden
                    </Button>
                </div>
            </div>
        );
    }
}

export default SiteList;
