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

  render(){                               //render( ){ } 內為顯示的內容
    return(                               //return 回傳內容至render( )
      <div>
        messageBoard!!!!
        <MessageForm />
        <MessageList
          item = {this.state.item}
        />
      </div>
    );
  }
}

export default MessageBoard;
