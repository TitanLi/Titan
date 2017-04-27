import React, { Component } from 'react';
import MessageList from './messageList.js';
import MessageForm from './messageForm.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import './messageBoard.css';
injectTapEventPlugin();

class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        item:[{name:'Allen',content:'Wellcome'},{name:'Billy',content:'HiHi'}],
    };
  };
  handleItem(inputMessage){
      let currentMessage=this.state.item;
      currentMessage.push(inputMessage);
      this.setState({
        item: currentMessage,
      });
  };
  render() {
    return (
      <MuiThemeProvider>
          <div className="CardDiv">
              <AppBar
                  title="Message"
                  iconClassNameRight="muidocs-icon-navigation-expand-more"
                  style={{borderTopLeftRadius:20,borderTopRightRadius:20,}}
              />
              <Paper Depth={1} style={{padding:20,backgroundColor:'rgba(255,255,255,0.5)',borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
                  <MessageList
                      item={this.state.item}
                  />
                  <MessageForm
                      handleItem={this.handleItem.bind(this)}
                  />
              </Paper>
          </div>
      </MuiThemeProvider>
    );
  }
}


export default MessageBoard;
