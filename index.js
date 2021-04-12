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
	
	 chatManager.connect()
        .then(currentUser => {
            this.currentUser = currentUser
            this.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onNewMessage: message => {

                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }
        })
      })
    }

    sendMessage(text) {
    	this.currentUser.sendMessage({
    		text,
    		roomId: roomId
    	})
    }




    render() {
        return (
        	 <div className="app">
        	 <Title />
             <MessageList messages= {this.state.messages} />
             {/*<SendMessageForm />*/}

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



function Title() {
  return <p className="title">My awesome chat app</p>
}

ReactDOM.render(<App />, document.getElementById('root'));