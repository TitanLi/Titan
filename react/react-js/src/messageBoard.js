import React,{Component} from 'react';
import MessageForm from './messageForm.js';
import MessageList from './messageList.js';

class MessageBoard extends Component{     //新增元件
  constructor(props){
    super(props);
    this.state = {
      item:[{name:'Titan',content:'Wellcome'},{name:'apple',content:'Hi'}],
    }
  }

  handleItem(inputMessage){
    let currentMessage=this.state.item;
    currentMessage.push(inputMessage);
    this.setState({
      item:currentMessage,
    });
  }

  render(){                               //render( ){ } 內為顯示的內容
    return(                               //return 回傳內容至render( )
      <div>
        messageBoard!!!!
        <MessageList item = {this.state.item}/>
        <MessageForm handleItem={this.handleItem.bind(this)}/>
      </div>
    );
  }
}

export default MessageBoard;
