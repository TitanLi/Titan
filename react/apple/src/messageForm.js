import React,{Component} from 'react';
class MessageForm extends Component {
  render() {
    return (
      <div>
        name:
        <input></input>
        content:
        <input></input>
        <button>sent</button>
      </div>
    );
  }
}

export default MessageForm;
