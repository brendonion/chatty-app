import React from 'react';

class Chatbar extends React.Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.username.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default Chatbar;