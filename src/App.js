import React, { Component } from 'react';

import './App.css';


const endpoint = 'https://api.chucknorris.io/jokes/random';



class App extends Component {

  state = {
    sentence1: '',
    sentence2: '',
    winner: '',
    isLoading: true
  }

  componentDidMount() {
    fetch(endpoint)
      .then(response => response.json())
      .then(sentence1 =>
        fetch(endpoint)
          .then(response => response.json())
          .then(sentence2 =>
            this.setState({
              sentence1: sentence1.value,
              sentence2: sentence2.value,
              isLoading: false
            })
          )
      )
  }

  chooseSentence = sentence => {
    this.setState({
      winner: this.state[sentence]
    })
  }

  render() {
    return (
      <>
        {
          this.state.isLoading
            ? <h1>Loading Chuck facts...</h1>
            :
            <>
              <div className='container'>
                <div className='box'>
                  <h2 className='sentence'>{this.state.sentence1}</h2>
                  <button className='myButton' onClick={() => this.chooseSentence('sentence1')}>That's hilarious!</button>
                </div>
                <div className='box'>
                  <h2 className='sentence'>{this.state.sentence2}</h2>
                  <button className='myButton' onClick={() => this.chooseSentence('sentence2')}>That's hilarious!</button>
                </div>
              </div>
              {this.state.winner &&
                <h1 className='winner'>The winner is: {this.state.winner}</h1>
              }
            </>
        }
      </>
    );
  }
}

export default App;
