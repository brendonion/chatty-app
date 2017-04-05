import React from 'react';

class Chatbar extends React.Component {

  // constructor(props){
  //   super(props);
  //   this.handleKeyPress = this.handleKeyPress.bind(this);
  //   this.handleNameChange = this.handleNameChange.bind(this);
  // }


  handleNameChange = (event) => {
    if (event.target.value !== '') {
      console.log(event.target.value);
      this.props.newuser(event.target.value);
      return;
    } else {
      return;
    }
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter' && event.target.value !== '') {
      console.log(event.target.value);
      this.props.enter(event.target.value);
      event.target.value = '';
      return;
    } else {
      return;
    }
  }

  render() {
    console.log(this.props.enter);
    console.log(this.handleKeyPress);
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.username.name}
          onBlur={this.handleNameChange} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER"
          onKeyPress={this.handleKeyPress} />
      </footer>
    );
  }
}

export default Chatbar;