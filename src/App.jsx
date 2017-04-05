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
      const returnedMessage = JSON.parse(event.data);
      const messages = this.state.messages.concat(returnedMessage);
      this.setState({
        messages: messages
      })
    }
  }

  // Sends message to WebSocket
  sendMessage(input) {
    setTimeout(() => {
      const user = this.state.currentUser.name;
      console.log(user);
      const newMessage = {username: user, content: input};
      const theMessage = JSON.stringify(newMessage);
      this.socket.send(theMessage);
    }, 1000);
  }

  // Function that changes username
  changeName(input) {
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
