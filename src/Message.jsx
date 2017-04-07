import React from 'react';


class Message extends React.Component {
  render() {
    return (
      <main className="messages">
        <div className="message">
          <span className="message-username" style={{color: this.props.color}}>
            {this.props.username}
          </span>
          <span className="message-content">{this.props.content}</span>
        </div>
      </main>
    );
  }
}

export default Message;