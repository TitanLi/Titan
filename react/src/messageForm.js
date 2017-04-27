import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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
          <label style={{marginRight:50}}>
              <TextField
                  value={this.state.name}
                  onChange={this.handleName.bind(this)}
                  floatingLabelText="Name"
                  style={{width:150}}
              />
              <br/>
          </label>
          <label>
              <TextField
                  value={this.state.content}
                  onChange={this.handleContent.bind(this)}
                  hintText="Content"
                  multiLine={true}
                  style={{width:350}}
              />
          </label>
          <RaisedButton
              label="sent"
              primary={true}
              onClick={this.handleSubmit.bind(this)}
              style={{marginLeft:10}}
              labelStyle={{borderRadius:20}}
          />
      </div>
    );
  }
}
export default MessageForm;
