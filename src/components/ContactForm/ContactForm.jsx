import React, { Component } from 'react';
import style from "./ContactForm.module.css";

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInput = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  submitForm = event => {
      event.preventDefault();
      console.log(this.state);
      this.props.onContatactAdd(this.state);
      this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={style.addForm} onSubmit={this.submitForm}>
        <label htmlFor="">
          Name
          <input
            className={style.inputForm}
            placeholder='add name'
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleInput}
          />
        </label>
        <label htmlFor="">
          Phone
          <input
            className={style.inputForm}
            placeholder='add phone'
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handleInput}
          />
        </label>

        <button className={style.btnForm} type="submit">Add contact</button>
      </form>
    );
  }
}

