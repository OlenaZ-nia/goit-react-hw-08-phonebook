import { useDeleteContactMutation } from '../../services/api';
import PropTypes from 'prop-types';
import s from './ContactElement.module.css';

export const ContactElement = ({ id, name, number }) => {

    const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
    
    return (
        <>
            <p className={s.contact}>{name}: <span className={s.tel}>{number}</span></p>
            <button
                type="button"
                className={s.btn}
                onClick={() => deleteContact(id)}
            > 
                {isDeleting ? '...' :'Delete'}
            </button>
        </>
    )
}

ContactElement.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
};