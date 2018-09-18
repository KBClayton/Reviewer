import React from "react";
import io from "socket.io-client";

// var socket = require('socket.io');
// const server = require('http').createServer()
// io.socket(server);

// io.on('connection', (socket) => {
//     console.log(socket.id);

//     socket.on('SEND_MESSAGE', function(data){
//         io.emit('RECEIVE_MESSAGE', data);
//     })
// });



class Chat extends React.Component{
    constructor(props){
        super(props);



        let cookieVars=document.cookie;
        let cookieObj={};
        console.log(cookieVars);
        if(cookieVars!==undefined){
          //console.log("in cookievars if")
        cookieVars=cookieVars.replace(/=/g, " ")
        let cookieArray= cookieVars.split(" ")
        console.log(cookieArray[7])
        let bumper=0;
        if(cookieArray[0]==="heroku-session-affinity"){
            bumper=2;
        }
          if(cookieArray.length>8){
            //console.log("in cookiearray if")
            let username=cookieArray[bumper+1].substring(0, cookieArray[bumper+1].length-1)
            let port=parseInt(cookieArray[3])
            let hash=cookieArray[bumper+5].substring(0, cookieArray[bumper+5].length-1)
            let url=cookieArray[bumper+7].substring(0, cookieArray[bumper+7].length)
            //console.log(url)
            //url=url.substring(8, url.length-7)
            console.log(url)
            if(url==="localhost"){
                url="localhost:";
            }else{
                url="austin-reviews.herokuapp.com:";
            }
            console.log(url)
            cookieObj.username=username;
            cookieObj.port=port;
            cookieObj.hash=hash;
            cookieObj.url=url;
            //console.log(cookieObj)
            if(cookieObj.username!==undefined && cookieObj.username.length>5)
            {
              //console.log(cookieObj.username)
            //this.setState({ redirectToReferrer: true });
            this.isAuthenticated = true;
            }
          }
        }
        this.state = {
            username: cookieObj.username,
            message: '',
            messages: [],
            id:[]
        };
        let what=cookieObj.url+cookieObj.port
        console.log(what)
        this.socket = io(what);
        //this.socket = io('localhost:3001');
        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            let id=this.idgen()
            console.log(id)
            console.log(data);
            data.id=id;
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({message: ''});

        }
        this.idgen = ()=>{
            return Math.floor(Math.random()*1000000000000);
            
        }
    }
    render(){
        return (
            <div className="container" >
                <div className="row">
                    <div className="">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div key={message.id}>{message.author}: {message.message} </div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                {/* <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/> */}
                                <br/>
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;