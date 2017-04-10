import React, {Component} from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

injectTapEventPlugin();

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <RaisedButton label="Default"/>
                    <h1>我是Home</h1>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
