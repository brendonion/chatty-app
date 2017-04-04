import React from 'react';
import MessageList from './MessageList.jsx';

class Message extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
        <MessageList />
      </div>
    );
  }
}

export default Message;