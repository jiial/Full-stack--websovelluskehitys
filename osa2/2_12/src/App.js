import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      country: null
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleInput = (event) => {
    console.log(event.target)
    this.setState({ filter: event.target.value, country: null })
  }

  showCountry = (event) => {
    console.log(event.target)
    this.setState({ country: event.target.value })
  }

  render() {
    if (this.state.country !== null) {
      const countriesToShow = this.state.countries.filter(country => country.name.match(this.state.country))
      return (
        <div>
          <p>find countries: </p><input value={this.state.filter} onChange={this.handleInput} />
          <h2>{countriesToShow[0].name}</h2>
          <p>capital: {countriesToShow[0].capital}</p>
          <p>population: {countriesToShow[0].population}</p>
          <img src={countriesToShow[0].flag} alt="flag" width="240" height="140" />
        </div>
      )
    }
    const countriesToShow = this.state.countries.filter(country => country.name.includes(this.state.filter))
    if (countriesToShow.length === 1) {
      return (
        <div>
          <p>find countries: </p><input value={this.state.filter} onChange={this.handleInput} />
          <h2>{countriesToShow[0].name}</h2>
          <p>capital: {countriesToShow[0].capital}</p>
          <p>population: {countriesToShow[0].population}</p>
          <img src={countriesToShow[0].flag} alt="flag" width="240" height="140" />
        </div>
      )
    }
    if (countriesToShow.length < 10) {
      return (
        <div>
          <p>find countries: </p><input value={this.state.filter} onChange={this.handleInput} />
          <p height="30">   </p>
          {countriesToShow.map(country => 
          <div key={country.name}><input value={country.name} onClick={this.showCountry} readOnly="true" /></div>
          )}
        </div>
      )
    }
    return (
      <div>
        <p>find countries: </p><input value={this.state.filter} onChange={this.handleInput} />
        <p>too many matches, specify another filter</p>
      </div>
    )
  }
}

export default App;
