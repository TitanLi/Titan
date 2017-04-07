import React,{Component} from 'react';

class MessageForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name : "",
      content : "",
    }
  }

  handleName(event){
    this.setState({
      name:event.target.value
    });
    console.log(this.state.name);
  }

  handleContent(event){
    this.setState({
      content:event.target.value
    });
    console.log(this.state.content);
  }

  handleSubmit(){
      let inputMessage = {name:this.state.name,content:this.state.content};
      this.props.handleItem(inputMessage);
  }

  render(){
    return (
      <div>
        name:
        <input onChange={this.handleName.bind(this)}></input>
        content:
        <input onChange={this.handleContent.bind(this)}></input>
        <button onClick={this.handleSubmit.bind(this)}>sent</button>
      </div>
    );
  }
}

export default MessageForm;
