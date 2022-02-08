import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../components/Container/Container';
import  ContactForm  from "../components/ContactForm/ContactForm";
import { ContactList } from '../components/ContactList/ContactList';
import SearchFilter from '../components/SearchFilter/SearchFilter';
import { useFetchContactsQuery } from '../services/contacts';

import { getFilter } from '../redux/filter/filter-selectors';

import { resetFilter } from '../redux/filter/filterSlice';
// import { contactApi } from '../services/contacts';
import { selectIsLoggedIn } from '../redux/auth/authSlice';


export default function ContactsView() {
  const { data, error } = useFetchContactsQuery();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  //   const { data, error } = useSelector(contactApi.endpoints.fetchContacts.select());
  // console.log(data)
  
    useEffect(() => {
       if (data && data.length < 5 && filter!=="") {
            dispatch(resetFilter(''))
        };
    }, [data, dispatch, filter])

  return (
    <>
      {isLoggedIn && <Container>
      <h1>Phoneboock</h1>
      <ContactForm />
      <h2>Contacts</h2>
      {error && <h1>{ error.data.message}</h1>}
      {/* {data && <SearchFilter />} */}
      {(data && data.length >= 5) && <SearchFilter />}
      {data && data.length === 0 ? <h3>Add contacts</h3> : <ContactList/>}
      
    </Container>}
    </>
    );
}
