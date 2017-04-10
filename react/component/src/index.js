import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class Name extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
      </div>
    );
  }
}

class Site extends React.Component {
  render() {
    return (
      <a href={this.props.site}>{this.props.site}</a>
    );
  }
}

class App extends React.Component {
  render() {
    return(//引入css
      <div className="App">
        <Name name={this.props.name} />
        <Site site={this.props.site} />
      </div>
    );
  }
}

ReactDOM.render(
  <App name="Google" site="www.google.com" />,
  document.getElementById('root')
);
