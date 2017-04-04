import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          id: "1",
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          id: "2",
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };

    this.sendMessage = this.sendMessage.bind(this);
  }


  sendMessage(input) {
    setTimeout(() => {
      const user = this.state.currentUser.name;
      console.log(user);
      console.log(this.state.messages.length);
      const newMessage = {id: this.state.messages.length + 1, username: user, content: input};
      const messages = this.state.messages.concat(newMessage);
      this.setState({
        messages: messages
      })
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
