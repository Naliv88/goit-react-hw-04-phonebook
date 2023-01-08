import React, { useState } from 'react';
// import { PropTypes } from 'react';
import style from './ContactForm.module.css';

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function handleInput(event) {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  }

  function submitForm(event) {
    event.preventDefault();

    const contact = { name: name, number: number };
    onSubmit(contact);

    setName('');
    setNumber('');
  }

  return (
    <form className={style.addForm} onSubmit={submitForm}>
      <label htmlFor="">
        Name
        <input
          className={style.inputForm}
          placeholder="add name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleInput}
        />
      </label>
      <label htmlFor="">
        Phone
        <input
          className={style.inputForm}
          placeholder="add phone"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleInput}
        />
      </label>

      <button className={style.btnForm} type="submit">
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;

// ContactForm.prototype = {
//   onSubmit: PropTypes.func.isRequired,};


