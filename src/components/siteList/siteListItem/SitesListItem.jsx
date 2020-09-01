import React from 'react';
import './siteListItem.scss';
import PropTypes from 'prop-types';


const propTypes = {
    title: PropTypes.string,
    siteId: PropTypes.string.isRequired,
};

const defaultProps = {
    title: 'Site-Title',
};


// component that represents a site, has a link, title and icon
class SitesListItem extends React.PureComponent {
    constructor(props) {
        super();
        this.state = {
            imgUrl: 'https://sub60.tobit.com/l/152342?size=100\\',
            title: props.title,
            siteId: props.siteId,
        };
        this.checkIcon = this.checkIcon.bind(this);
        this.viewSite = this.viewSite.bind(this);
    }

    // checks if the site has a icon, if so sets the site icon as own icon
    checkIcon() {
        const { siteId } = this.state;
        fetch(`https://chayns.tobit.com/storage/${siteId}/Images/icon-57.png`, { method: 'HEAD' })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ imgUrl: `https://chayns.tobit.com/storage/${siteId}/Images/icon-57.png` });
                }
            });
    }

    // opens the site in a new tab
    viewSite() {
        const { siteId } = this.state;
        chayns.openUrlInBrowser(`https://chayns.net/${siteId}/`);
    }

    render() {
        const { title, imgUrl } = this.state;
        this.checkIcon();

        return (
            <button
                type="button"
                onClick={this.viewSite}
                className="site_item__wrapper"
            >
                <img
                    src={imgUrl}
                    alt="Site-icon"
                    className="siteIcon"
                />
                <p className="site_item__title">
                    {title}
                </p>
            </button>
        );
    }
}

SitesListItem.propTypes = propTypes;
SitesListItem.defaultProps = defaultProps;

export default SitesListItem;
