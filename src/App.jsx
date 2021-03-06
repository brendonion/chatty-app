import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


// Generates a random color out of four colors 
function randomColor() {
  let colors = ['#cc0000', '#003399', '#006600', '#663300'];
  let random = Math.floor(Math.random() * (3 - 0)) + 0; 
  return colors[random];
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [], // Messages coming from the server will be stored here as they arrive
      colors: randomColor()
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
    console.log('on receival', event.data);
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
          this.onUserCountChange(userAmount);
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
      const newMessage = {type: 'postMessage', username: user, content: input, color: this.state.colors};
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

  // Render the full App with all the components
  render() {
    console.log('Rendering <App/>');
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty Onions</a>
          <h4 className="currently-online">
            {this.state.online} User(s) Online
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
