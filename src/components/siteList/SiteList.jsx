import React from 'react';
import './siteList.scss';

// chayns-components
import { Button, Input } from 'chayns-components/lib';

// components
import SiteListItem from './siteListItem/SiteListItem';

// component with a search bar, sites-list and load-more button
const SiteList = () => {
    const [searchString, setSearchString] = React.useState('ahaus');
    const [skip, setSkip] = React.useState(0);
    const [listItemComponents, setListItemComponents] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [moreSitesAvailable, setMoreSitesAvailable] = React.useState(true);
    const [searchTimeout, setSearchTimeout] = React.useState();

    // loads and appends list of sites with results of the current search string
    const loadSites = () => {
        chayns.showWaitCursor();
        setIsLoading(true);
        fetch(`https://chayns2.tobit.com/SiteSearchApi/location/search/${searchString}/?skip=${skip}&take=31`)
            .then((response) => response.json())
            .then(async (data) => {
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
                    setMoreSitesAvailable(true);
                } else {
                    setMoreSitesAvailable(false);
                }
                if (skip !== 0) {
                    setListItemComponents([...listItemComponents, ...newListItemComponents]);
                } else {
                    setListItemComponents([]);
                    setListItemComponents([...newListItemComponents]);
                }
                setIsLoading(false);
                chayns.hideWaitCursor();
            })
            .catch();
    };

    // increases skip and loads the additional sites
    const handleLoadMore = async () => {
        setSkip(skip + 30);
    };

    // sets skip to 0 causing the list to clear and load or does so directly (if the site list isn't loading)
    const handleSearchSites = async (string) => {
        if (!isLoading && searchString === string) {
            if (skip !== 0) setSkip(0);
            else loadSites();
        }
    };

    // updates the search string
    const onChangeSearch = async (event) => {
        await setSearchString(event !== '' ? event : 'ahaus');
    };

    // starts a timer to search new sites (first clears the previous one)
    React.useEffect(() => {
        clearTimeout(searchTimeout);
        setSearchTimeout(setTimeout(() => handleSearchSites(searchString), 500));
    }, [searchString]);

    // loads more / new sites whenever skip changes
    React.useEffect(() => {
        loadSites();
    }, [skip]);

    return (
        <div>
            <div className="headline__wrapper">
                <h1> My Favourite Sites </h1>
                <Input
                    class="search"
                    placeholder="Suche"
                    design={Input.BORDER_DESIGN}
                    icon="fa fa-search"
                    onChange={onChangeSearch}
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
                    onClick={handleLoadMore}
                    disabled={(isLoading || !moreSitesAvailable)}
                >
                    Mehr laden
                </Button>
            </div>
        </div>
    );
};

export default SiteList;
