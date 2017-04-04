import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {loading: false};
  }

componentDidMount() {
    setTimeout(() => {
      this.setState({loading: true})
    }, 3000)
  }

  render() {
    console.log('Rendering <App/>');
      if (this.state.loading) {
        return <h1>Loading...</h1> 
      } else {
      return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList />
        <ChatBar />
      </div>
      )
      }
  }
}

export default App;
