import { useSelector } from 'react-redux';
import { contactApi } from '../../services/contacts';
import { ContactElement } from "../ContactElement/ContactElement";
import { getFilter } from '../../redux/filter/filter-selectors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export const ContactList = () => {

    const filter = useSelector(getFilter);

    const { data } = useSelector(contactApi.endpoints.fetchContacts.select());
    
    const getVisibleContact = () => {
        if (data.length < 5) {
            return data;
        }
        const normalizedFilter = filter.toLowerCase();
        return data.filter(({ name }) =>
            name.toLowerCase().includes(normalizedFilter),
        );
    };

    return (

        <>
            <List >
            {data &&
                getVisibleContact().map(({ id, name, number }) => {
                return (
                    <ListItem  key={id}>
                        <ContactElement
                            name={name}
                            number={number}
                            id={id}
                        />
                    </ListItem>
                )  
            })}
            
            </List>

            {/* {isLoading && <Spinner />} */}
            
            {/* <ul className={s.list} >
            {data &&
                getVisibleContact().map(({ id, name, number }) => {
                return (
                    <li className={ s.item} key={id}>
                        <ContactElement
                            name={name}
                            number={number}
                            id={id}
                        />
                    </li>
                )  
            })}
            
            </ul> */}

        </>
         
            
       
    )
}


