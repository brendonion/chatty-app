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
  }


  sendMessage(input) {
    setTimeout(() => {
      const user = this.state.currentUser.name;
      console.log(user);
      const newMessage = {id: this.state.messages.length + 1, username: user, content: input};
      const messages = this.state.messages.concat(newMessage);
      const messageData = {username: user, content: input};
      // this.setState({
      //   messages: messages
      // })
      const theMessage = JSON.stringify(messageData);
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
