import React from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {
  
  render() {
    return (
      <div>
        {this.props.messages.map(function (message, index) {
          if (message.type = 'incomingMessage') {
            return (
            <Message key={index} username={message.username} content={message.content} />
            )
          } else if (message.type = 'incomingNotification') {
            <div key={index}>{message.content}</div>
          }
        })}
      </div>
    );
  }
}

export default MessageList;