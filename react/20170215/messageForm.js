import React, { Component } from 'react';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name:'',
        content:'',
    };
  };
  handleName(event) {
    this.setState({
      name: event.target.value
    });
  };
  handleContent(event) {
    this.setState({
      content: event.target.value
    });
  };
  handleSubmit() {
    let inputMessage={name:this.state.name,content:this.state.content};
    this.props.handleItem(inputMessage);
  };
  render() {
    return (
      <div>
          <label>
              Name:
              <input type="text" name="name" value={this.state.name}  onChange={this.handleName.bind(this)}/>
          </label>
          <label>
              Content:
              <input type="text" name="content" value={this.state.content}  onChange={this.handleContent.bind(this)}/>
          </label>
          <input type="submit" onClick={this.handleSubmit.bind(this)}/>
      </div>
    );
  }
}
export default MessageForm;
