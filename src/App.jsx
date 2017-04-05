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
  }


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


  sendMessage(input) {
    setTimeout(() => {
      const user = this.state.currentUser.name;
      console.log(user);
      const newMessage = {username: user, content: input};
      const theMessage = JSON.stringify(newMessage);
      this.socket.send(theMessage);
    }, 1000);
  }


  render() {
    console.log('Rendering <App/>');
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.currentUser} enter={this.sendMessage}  />
      </div>
    );
  }
}

export default App;
