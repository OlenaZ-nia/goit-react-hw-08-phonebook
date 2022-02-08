import { useDeleteContactMutation } from '../../services/contacts';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import StarBorder from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import s from './ContactElement.module.css';

export const ContactElement = ({ id, name, number }) => {

    const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
    
    return (
        <>
            <ListItemButton>
                <ListItemText>
                <ListItemIcon>
              <StarBorder color="primary"/>
            </ListItemIcon>
                <p className={s.contact}>{name}: <span className={s.tel}>{number}</span></p>
            </ListItemText>
            
            <Button variant="outlined"
                type="button"
                size="small"
                onClick={() => { deleteContact(id); toast.success(`Contact ${name} deleted`) }}>
                    {isDeleting ? '...' : 'Delete'}
                    <DeleteIcon />
            </Button>

            </ListItemButton>
            

            {/* <p className={s.contact}>{name}: <span className={s.tel}>{number}</span></p> */}

            {/* <button
                type="button"
                className={s.btn}
                onClick={() => { deleteContact(id); toast.success(`Contact ${name} deleted`)}}
            > 
                {isDeleting ? '...' :'Delete'}
            </button> */}
        </>
    )
}

ContactElement.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
};