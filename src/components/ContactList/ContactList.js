import { useSelector } from 'react-redux';

// import { useFetchContactsQuery } from '../../services/api';
import { contactApi } from '../../services/api';
import { ContactElement } from "../ContactElement/ContactElement";
import { getFilter } from '../../redux/filter-selectors';
// import { Spinner } from '../Spinner/Spinner';

import s from './ContactList.module.css';

export const ContactList = () => {

    const filter = useSelector(getFilter);

    // const {data, error, isFetching} = useFetchContactsQuery();
    const {data} = useSelector(contactApi.endpoints.fetchContacts.select());
    
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

        // {isFetching && <Spinner />}
         
            <ul className={s.list} >
            {data &&
                getVisibleContact().map(({ id, name, phone }) => {
                return (
                    <li className={ s.item} key={id}>
                        <ContactElement
                            name={name}
                            number={phone}
                            id={id}
                        />
                    </li>
                )  
            })}
            
            </ul>
       
    )
}


