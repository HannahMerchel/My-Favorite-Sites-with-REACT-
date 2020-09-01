import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    siteId: PropTypes.string.isRequired,
};

const defaultProps = {
    image: 'https://sub60.tobit.com/l/152342?size=100\\',
    title: 'Site-Title',
};


// component that represents a site, has a link, title and icon
class SitesListItem extends React.PureComponent {
    constructor(props) {
        super();
        this.state = {
            image: props.image,
            title: props.title,
            siteId: props.siteId,
        };
        this.checkIcon = this.checkIcon.bind(this);
        this.viewSite = this.viewSite.bind(this);
    }

    // checks if the site has a icon, if so sets the site icon as own icon
    checkIcon() {
        const { image } = this.state;
        fetch(image, { method: 'HEAD' })
            .then(() => {})
            .catch(() => {
                this.setState({ image: 'https://sub60.tobit.com/l/152342?size=100\\' });
            });
    }

    // opens the site in a new tab
    viewSite() {
        const { siteId } = this.state;
        chayns.openUrlInBrowser(`https://chayns.net/${siteId}/`);
    }

    render() {
        const { title, image } = this.state;
        this.checkIcon();

        return (
            <button
                type="button"
                onClick={this.viewSite}
                style={{
                    height: '77px',
                    width: '81px',
                    marginBottom: '8px',
                    marginRight: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    placeItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    color: 'white',
                }}
            >
                <img
                    src={image}
                    alt="Site-icon"
                    className="siteIcon"
                />
                <p style={{
                    marginTop: '5px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    width: '90px',
                    whiteSpace: 'nowrap',
                }}
                >
                    {title}
                </p>
            </button>
        );
    }
}

SitesListItem.propTypes = propTypes;
SitesListItem.defaultProps = defaultProps;

export default SitesListItem;
