import PropTypes from 'prop-types';
import s from './Box.module.css';

export const Box = ({ children }) => {
    return <div className={s.box}>{ children}</div>
}

Box.propTypes = {
    children: PropTypes.node.isRequired,
}