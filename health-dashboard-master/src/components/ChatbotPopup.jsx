import React from 'react';

class ChatbotPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatopen: false,
    };
    this.textRef = React.createRef();
  }

  toggle = () => {
    this.setState({ chatopen: !this.state.chatopen });
  }

  handleSend = () => {
    const { getMessage } = this.props;
    getMessage(this.textRef.current.value);
  }

  render() {
    const { messages } = this.props;
    const { chatopen } = this.state;
    const hide = {
      display: 'none',
    };
    const show = {
      display: 'block',
    };

    return (
      <div id='chatCon'>
        <div className="chat-box" style={chatopen ? show : hide}>
          <div className="header">Chat with me</div>
          <div className="msg-area">
            {
              messages.map((msg, i) => (
                i % 2 ? (
                  <p className="right"><span>{msg}</span></p>
                ) : (
                  <p className="left"><span>{msg}</span></p>
                )
              ))
            }
          </div>
          <div className="footer">
            <input type="text" ref={this.textRef} />
            <button onClick={this.handleSend}><i className="fa fa-paper-plane"></i></button>
          </div>
        </div>
        <div className="pop">
          <p><img onClick={this.toggle} src="https://p7.hiclipart.com/preview/151/758/442/iphone-imessage-messages-logo-computer-icons-message.jpg" alt="" /></p>
        </div>
      </div>
    );
  }
}

export default ChatbotPopup