# 安裝套件
## Material-UI
[Material-UI](http://www.material-ui.com)

[Git hub](https://github.com/callemall/material-ui)

## 安裝
```
$ cd Project
$ npm install react-tap-event-plugin --save
$ npm install material-ui --save
```
## 應用
```javascript
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
```
