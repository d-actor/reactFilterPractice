import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  state = { cities: [], value: '' }

  componentDidMount() {
    axios.get("https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json")
      .then( res => {
        this.setState({ cities: res.data });
      })
      .catch( err => {
        console.log(err)
      })
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
    this.search()
  }

  search = () => {
    const { value, cities } = this.state;
    return cities.filter( city => {
      const regex = new RegExp(value, 'gi');
      return city.city.match(regex) || city.state.match(regex);
    })
  }

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  displayMatches = () => {
    const matchArray = this.search()
    return matchArray.map( city => {
    // TODO highlight regex results
    //  const regex = new RegExp(value, 'gi');
    //  const cityName = place.city.replace
      return(
        <li key={city.id}>
          <span>{city.city}, {city.state} { this.numberWithCommas(city.population) }</span>
        </li>
      )
    })
  }

  render() {
    const { value } = this.state;
    return (
      <div className="App">
        <h1>Search Filter Yo</h1>
        <input type="text" value={value} placeholder="City or State" onChange={this.handleChange} />
        <ul>
          { this.displayMatches() }
        </ul>
      </div>
    );
  }
}

export default App;
