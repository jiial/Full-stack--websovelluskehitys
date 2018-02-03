import React from 'react';
import axios from 'axios';
import personService from './services/persons';

const Yhteystieto = (props) => {
  return (
    <li>{props.name}  {props.number}    <button onClick={props.delete}>Poista</button></li>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const SuccessfulOperation = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '1234' }
      ],
      newName: '',
      newNumber: '',
      filter: '',
      showAll: true,
      error: null,
      success: null
    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('will mount')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response })
      })
      .catch(error => {
        this.setState({
          error: 'Yhteystietoja ei löytynyt!'
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      })
  }

  lisaaYhteystieto = (event) => {
    event.preventDefault()
    const newName = this.state.newName
    const uusiHenkilo = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const filteredPersons = this.state.persons.filter(function (person) {
      return person.name === newName
    })


    if (filteredPersons.length === 0) {
      personService
        .create(uusiHenkilo)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response),
            newName: '',
            newNumber: '',
            success: 'Yhteystiedon lisääminen onnistui!'
          })
          setTimeout(() => {
            this.setState({ success: null })
          }, 5000)
        })
        .catch(error => {
          this.setState({
            error: 'Yhteystiedon lisääminen epäonnistui!'
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 5000)
        })
    } else {
      if (window.confirm('Yhteystieto on jo olemassa. Korvataanko numero uudella numerolla?')) {
        const person = filteredPersons[0]
        const id = person.id
        const changedPerson = { ...person, number: this.state.newNumber }
        personService
          .update(id, changedPerson)
          .then(changedPerson => {
            const persons = this.state.persons.filter(n => n.id !== id)
            this.setState({
              persons: persons.concat(changedPerson),
              success: 'Numeron muokkaus onnistui!'
            })
            setTimeout(() => {
              this.setState({ success: null })
            }, 5000)
          })
          .catch(error => {
            this.setState({
              error: 'Numeron muuttaminen epäonnistui!'
            })
            setTimeout(() => {
              this.setState({ error: null })
            }, 5000)
          })
      }
    }
  }

  kasitteleNimenMuutos = (event) => {
    this.setState({ newName: event.target.value })
  }

  kasitteleNumeronMuutos = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  kasitteleFiltterinMuutos = (event) => {
    this.setState({ filter: event.target.value })
    if (this.state.filter !== '') {
      this.setState({ showAll: false })
    }
  }

  poista = (id) => {
    return () => {
      if (window.confirm('Haluatko varmasti poistaa yhteystiedon?')) {
        console.log(id)
        personService
          .remove(id)
          .then(response => {
            const personsLeft = this.state.persons.filter(n => n.id !== id)
            this.setState({
              persons: personsLeft,
              success: 'Yhteystiedon poistaminen onnistui!'
            })
            setTimeout(() => {
              this.setState({ success: null })
            }, 5000)
          })
          .catch(error => {
            this.setState({
              error: 'Virhe! Yhteystieto on jo poistettu!',
              persons: this.state.persons.filter(n => n.id !== id)
            })
            setTimeout(() => {
              this.setState({ error: null })
            }, 5000)
          })
      }
    }
  }

  render() {
    console.log('render')
    const naytettavat = this.state.showAll ?
      this.state.persons : this.state.persons.filter(person => person.name.includes(this.state.filter))

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.error} />
        <SuccessfulOperation message={this.state.success} />
        <div>
          rajaa näytettäviä: <input value={this.state.filter} onChange={this.kasitteleFiltterinMuutos} />
        </div>
        <form onSubmit={this.lisaaYhteystieto}>
          <h3>Lisää uusi</h3>
          <div>
            nimi: <input value={this.state.newName} onChange={this.kasitteleNimenMuutos} />
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.kasitteleNumeronMuutos} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h3>Numerot</h3>
        <ul>
          {naytettavat.map(person =>
            <Yhteystieto
              key={person.id}
              name={person.name}
              number={person.number}
              delete={this.poista(person.id)}
            />
          )}
        </ul>
      </div>
    )
  }
}

export default App