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

    checkIcon() {
        fetch(this.state.image, { method: 'HEAD' })
            .then(() => {})
            .catch(() => {
                this.setState({ image: 'https://sub60.tobit.com/l/152342?size=100\\' });
            });
    }

    viewSite() {
        chayns.openUrlInBrowser(`https://chayns.net/${this.state.siteId}/`);
    }
    
    render() {
        this.checkIcon();
        if (this.state.title.length > 11) {
            this.setState((prevState) => {
                let titleText = prevState.title.substring(0, 9);
                titleText += '...';
                return { title: titleText }
            });
        }

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
                    src={this.state.image}
                    alt="Site-icon"
                    className="siteIcon"
                />
                <p style={{width: '130%'}}>{this.state.title}</p>
            </button>
        );
    }
}

SitesListItem.propTypes = propTypes;
SitesListItem.defaultProps = defaultProps;

export default SitesListItem;
