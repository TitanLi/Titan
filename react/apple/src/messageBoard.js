import React,{Component} from 'react';
import MessageList from './messageList';
import MessageForm from './messageForm';

class MessageBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      item:[{name:'Titan',content:'Wellcome'},{name:'Apple',content:'Wellcome'}],
    };
  };
  render() {
    return (
      <div>
        messageBoard!!
        <MessageList
          item = {this.state.item}
        />
        <MessageForm />
      </div>
    );
  }
}

export default MessageBoard;
