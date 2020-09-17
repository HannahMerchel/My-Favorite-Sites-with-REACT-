import React from 'react';
import './siteListItem.scss';
import PropTypes from 'prop-types';

// component that represents a site, has a link, title and icon
const SitesListItem = ({ title, siteId }) => {
    const [imgUrl, setImgUrl] = React.useState('https://sub60.tobit.com/l/152342?size=60\\');

    // checks if the site has a icon, if so sets the site icon as own icon
    fetch(`https://chayns.tobit.com/storage/${siteId}/Images/icon-57.png`, { method: 'HEAD' })
        .then((response) => {
            if (response.status === 200) {
                setImgUrl(`https://chayns.tobit.com/storage/${siteId}/Images/icon-57.png`);
            }
        });

    // opens the site in a new tab
    const viewSite = () => {
        chayns.openUrlInBrowser(`https://chayns.net/${siteId}/`);
    };

    return (
        <button
            type="button"
            onClick={viewSite}
            className="site_item__wrapper"
        >
            <div className="site_item_icon__wrapper">
                <img
                    src={imgUrl}
                    alt="Site-icon"
                    className="site_item__icon"
                />
            </div>
            <p className="site_item__title">
                {title}
            </p>
        </button>
    );
};

const propTypes = {
    title: PropTypes.string,
    siteId: PropTypes.string.isRequired,
};

const defaultProps = {
    title: 'Site-Title',
};

SitesListItem.propTypes = propTypes;
SitesListItem.defaultProps = defaultProps;

export default SitesListItem;
