import React from 'react';
import Message from './Message.jsx';

let divStyle = {
  fontStyle: 'italic'
};

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
            <div style={divStyle} key={index}>{message.content}</div>
          }
        })}
      </div>
    );
  }
}

export default MessageList;