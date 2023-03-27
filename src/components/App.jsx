import React, { Component } from 'react';
import { ContactForm } from './form/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './list/ContactList';
import { nanoid } from 'nanoid';
import css from '../components/App.module.css'

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (!parsedContacts) {
      return;
    }
    return this.setState({ contacts: parsedContacts });
  }

  formSubmitHandler = data => {
    const contExist = this.state.contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLocaleLowerCase()
    );
    data.id = nanoid();
    const newContacts = this.state.contacts;

    if (!contExist) {
      newContacts.push(data);
      localStorage.setItem('contacts', JSON.stringify(newContacts));
      return this.setState({ contacts: newContacts });
    };

    return alert(`${data.name} is already in contacts list!`);
  };

  filterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLocaleLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.contacts);
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.filterChange} />
        <ContactList
          contacts={visibleContacts}
          id={this.state.id}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
};
