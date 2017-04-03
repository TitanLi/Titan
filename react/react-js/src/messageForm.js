import React,{Component} from 'react';

class MessageForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name : "",
      content : "",
    }
  }

  handleItem(event){
    this.setState({
      name:event.target.value
    });
    console.log(this.state.name);
  }

  handleItem(event){
    this.setState({
      content:event.target.value
    });
    console.log(this.state.content);
  }
  render(){
    return (
      <div>
        name:
        <input onChange={this.handleItem.bind(this)}></input>
        content:
        <input onChange={this.handleItem.bind(this)}></input>
        <button>sent</button>
      </div>
    )
  }
}

export default MessageForm;
