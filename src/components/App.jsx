import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import style from './App.module.css';

const data = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [filter, setFilter] = useState('');
  const [filterList, setFilterList] = useState(data || []);
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || data
  );

  useEffect(() => {
    setFilterList(
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [filter, contacts]);

  const onContatactAdd = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    const isContactExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isContactExist) {
      return alert(`${name} is already in contacts`);
    }
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const onDeleted = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const setFilters = e => {
    const { value } = e.target;
    setFilter(value);
  };

  return (
    <div className={style.section}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onContatactAdd} />
      <h2>Contacts</h2>
      <Filter value={filter} filter={setFilters} />
      <ContactList contacts={filterList} onDeleted={onDeleted} />
    </div>
  );
};

export default App;
