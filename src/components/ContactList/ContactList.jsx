import React from 'react';
import PropTypes from 'prop-types';
import style from './ContactList.module.css';

export const ContactList = ({ contacts, onContatactDeleted }) => {
  return (
    <ul className={style.list}>
      {contacts.map(contact => {
        return (
          <li className={style.listItem} key={contact.id}>
            <p>
              {contact.name}: {contact.number}
            </p>
            <button className={style.btnDelete}
              onClick={() => onContatactDeleted(contact.id)}
              type="button"
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })
  ),
  onContatactDeleted: PropTypes.func.isRequired,
};
