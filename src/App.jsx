import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [], // Messages coming from the server will be stored here as they arrive
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  // Checks for connections to server, and broadcasts all new messages
  componentDidMount() {
    const socket = new WebSocket('ws://localhost:3001');
    this.socket = socket;
    socket.onopen = (event) => {
      console.log('User Connected');
    };
    this.socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
      switch (data.type) {
        case 'incomingMessage':
          const messages = this.state.messages.concat(data);
          this.setState({
            messages: messages
          })
          break;
        case 'incomingNotification':
          const notifications = this.state.messages.concat(data);
          this.setState({
            messages: notifications
          })
          break;
        case 'userCountChanged':
          let userAmount = data.userCount;
          let userColor = data.color;
          console.log('user color', userColor);
          this.onUserCountChange(userAmount);
          this.setState({
            colors: userColor
          })
          break;
        default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);  
      }
    }
  }

  // Sends message to WebSocket
  sendMessage(input) {
    setTimeout(() => {
      const user = this.state.currentUser.name;
      const newMessage = {type: 'postMessage', username: user, content: input};
      const sendMessage = JSON.stringify(newMessage);
      this.socket.send(sendMessage);
    }, 1000);
  }

  // Function that changes username
  changeName(input) {
    const currentName = this.state.currentUser.name;
    const notification = {
      type: 'postNotification', 
      content: (currentName + ' has changed their name to ' + input)
    };
    const sendName = JSON.stringify(notification);
    this.socket.send(sendName);
    this.setState({
      currentUser: {name: input}
    })
  }
  
  // Function that takes the userCount data from the server and gives it to the client
  onUserCountChange(data) {
    this.setState({
      online: data
    })
  }


  render() {
    console.log('Rendering <App/>');
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty Onions</a>
          <h4 className="currently-online">
            {this.state.online} Users Online
          </h4>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.currentUser} enter={this.sendMessage}
        changename={this.changeName} />
      </div>
    );
  }
}

export default App;
