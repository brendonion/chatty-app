import React from 'react';


// function randomColor() {
//   let colors = ['#cc0000', '#003399', '#006600', '#663300'];
//   let random = Math.floor(Math.random() * (3 - 0)) + 0; 
//   return colors[random];
// }

// let nameStyle = {
//   color: randomColor()
// }


class Message extends React.Component {
  render() {
    return (
      <main className="messages">
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      </main>
    );
  }
}

export default Message;