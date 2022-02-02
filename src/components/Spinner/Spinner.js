import './Spinner.module.css';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PropTypes from 'prop-types';
import { TailSpin } from 'react-loader-spinner';

export const Spinner = ({height=50, width=50}) => {
    return (
            <TailSpin color="grey" height={height} width={width} ariaLabel='loading' />
    )
}

Spinner.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number
}