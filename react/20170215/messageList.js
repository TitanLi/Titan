import React, { Component } from 'react';
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render(){
    const messages = this.props.item;
    const message = messages.map((m,index) =>
        <div key={index}>
            <p>{m.name}</p>
            <p>{m.content}</p>
        </div>
    );
    return (
        <div>
            {message}
        </div>
    );
  }
}
export default MessageList;
