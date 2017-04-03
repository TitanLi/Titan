import React, { Component } from 'react';
import MessageList from './messageList.js';
import MessageForm from './messageForm.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
        <div className="CardDiv">
            <MessageList
                item={this.state.item}
            />
            <MessageForm
                handleItem={this.handleItem.bind(this)}
            />
        </div>
    );
  }
}


export default MessageBoard;
