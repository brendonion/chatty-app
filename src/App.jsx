import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: {name: "Bob"},
      messages: [] // messages coming from the server will be stored here as they arrive
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  // Checks for connections to server, and broadcasts all new messages
  componentDidMount() {
    const socket = new WebSocket('ws://localhost:3001');
    this.socket = socket;
    socket.onopen = (event) => {
      console.log('Connected to server'); 
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
          console.log('the message', data.content);
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
      console.log(user);
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
    console.log('input', input);
    const sendName = JSON.stringify(notification);
    this.socket.send(sendName);
    this.setState({
      currentUser: {name: input}
    })
  }


  render() {
    console.log('Rendering <App/>');
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.currentUser} enter={this.sendMessage}
        changename={this.changeName} />
      </div>
    );
  }
}

export default App;
