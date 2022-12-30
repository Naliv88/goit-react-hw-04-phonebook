import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import style from './App.module.css'

class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

 componentDidMount() {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    storedContacts &&
      storedContacts.length > 0 &&
      this.setState({ contacts: storedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    prevState.contacts !== this.state.contacts &&
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }



  onContatactAdd = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    const isContactExist = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isContactExist) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  filterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterList = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  onContatactDeleted = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    return (
      <div className={style.section}>
        <h1>Phonebook</h1>
        <ContactForm onContatactAdd={this.onContatactAdd} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} filter={this.filterChange} />
        <ContactList
          contacts={this.filterList()}
          onContatactDeleted={this.onContatactDeleted}
        />
      </div>
    );
  }
}
export default App;
