import React,{Component} from 'react';

class MessageList extends Component{
  render(){
    const messages = this.props.item;
    const message = messages.map((m,index) =>
    <div key={index}>
      {m.name}
      {m.content}
    </div>
    );

    return(
      <div>
        {message}
      </div>
    );
  }
}

export default MessageList;
