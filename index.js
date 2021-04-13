const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e1ac1a0f-bd19-4d7d-85b0-26a544413f29/token"
const instanceLocator = "v1:us1:e1ac1a0f-bd19-4d7d-85b0-26a544413f29"
const roomId = 13973678
const username = "tarek22"


const DUMMY_DATA = [
	{
		senderId: "perborgen",
		text: "who'll win?"
	},
	{
		senderId: "janedoe",
		text: "who'll win?"
	}
]

class App extends React.Component {

	constructor() {
		super();
		this.state = {
			messages: DUMMY_DATA
		}
	}

	componentDidMount(){
		const chatManager = new Chatkit.ChatManager({
			instanceLocator: instanceLocator,
			userId: username,
			tokenProvider: new Chatkit.TokenProvider({
				url: testToken
			})
		})
	
	 // chatManager.connect()
  //       .then(currentUser => {
  //           this.currentUser = currentUser
  //           this.currentUser.subscribeToRoom({
  //           roomId: roomId,
  //           hooks: {
  //               onNewMessage: message => {

  //                   this.setState({
  //                       messages: [...this.state.messages, message]
  //                   })
  //               }
  //           }
  //       })
  //     })
    }

    sendMessage(text) {
    	console.log("text",text);
		console.log("dummy data 1",DUMMY_DATA);
    	DUMMY_DATA.push(
	    	{
			senderId: "muffin",
			text: text
			}
		) 
		console.log("dummy data 2",DUMMY_DATA);
		window.location.reload();
    }

    render() {
        return (
        	 <div className="app">
        	 <Title />
             <MessageList messages= {this.state.messages} />
             <SendMessageForm sendMessage = {this.sendMessage} />

        	 </div>
        )

                

        
    }
}

class MessageList extends React.Component {
	render() {
		return (
		  <ul className="message-list">
		  	{this.props.messages.map( (message, index) => {
		  		return (
		  			<li key={message.id} className="message">
		  				<div> {message.senderId} </div>
		  				<div> {message.text} </div>
		  			</li>
		  		)
		  	})}
		  </ul>
		)
	}
}




class SendMessageForm extends React.Component {
	constructor() {
	  super();
	  this.state = {
	  		message: ''
	  }

	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.sendMessage(this.state.message);
	}

	handleChange(e){
		this.setState({
			message: e.target.value
		})
	}

	render () {
	 return (
	 	<form
	 	  onSubmit={this.handleSubmit}	
	 	  className="send-message-form">
	 		<input 
	 		  onChange={this.handleChange}
	 		  value = {this.state.message}
	 		  placeholder ="Type your message and hit ENTER"
	 		  type ="text"
	 		/>	
	 	</form>	
		)
	}    	
}


function Title() {
  return <p className="title">My awesome chat app</p>
}


ReactDOM.render(<App />, document.getElementById('root'));