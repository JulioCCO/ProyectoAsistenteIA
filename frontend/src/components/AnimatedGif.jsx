
import PropTypes from 'prop-types';

export const AnimatedGif = ({ src, alt }) => {

    return <img src={src} alt={alt} />

}

AnimatedGif.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
}