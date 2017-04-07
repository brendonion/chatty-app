import React from 'react';

class Chatbar extends React.Component {

  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      console.log(event.target.value);
      this.props.enter(event.target.value);
      event.target.value = '';
      return;
    } else {
      return false;
    }
  }

  handleNameChange = (event) => {
    if (event.target.value !== '') {
      console.log(event.target.value);
      this.props.changename(event.target.value);
      return;
    } else {
      this.props.changename('Anonymous');
      return;
    }
  }

  render() {
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