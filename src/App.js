import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Container } from './components/Container/Container';
import  ContactForm  from "./components/ContactForm/ContactForm";
import { ContactList } from './components/ContactList/ContactList';
import SearchFilter from './components/SearchFilter/SearchFilter';
import { useFetchContactsQuery } from './services/api';

// import { contactApi } from './services/api';
import { resetFilter } from './redux/filterSlice';


import { Spinner } from './components/Spinner/Spinner';

import 'modern-normalize/modern-normalize.css';


export default function App() {
  const { data, error, isFetching } = useFetchContactsQuery();
  const dispatch = useDispatch();
    // const { data } = useSelector(contactApi.endpoints.fetchContacts.select());
    
    useEffect(() => {
       if (data && data.length < 5) {
            dispatch(resetFilter(''))
        };
    }, [data, dispatch])

  return (
    <Container>
      <h1>Phoneboock</h1>
      <ContactForm />
      <ToastContainer autoClose={3000} theme={'dark'} />
      <h2>Contacts</h2>
      {(data && data.length >= 5) && <SearchFilter />}
      {data && data.length === 0 ? <h3>Add contacts</h3> : <ContactList />}
      {isFetching && <Spinner />}
    </Container>
    );
}


