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
        let url;
        let hash;
        let port;
        let username;
        let what="austin-reviews.herokuapp.com";
        if(cookieVars!==undefined){
             //console.log("in cookievars if")
            cookieVars=cookieVars.replace(/=/g, " ")
            let cookieArray= cookieVars.split(" ")
            if(cookieArray.length>1){
                for(let i=0; i<cookieArray.length; i++){
                    //console.log("in cookiearray if")
                    if(cookieArray[i]==="username"){
                        username=cookieArray[i+1].substring(0, cookieArray[i+1].length-1)
                    }
                    if(cookieArray[i]==="port"){
                        port=parseInt(cookieArray[i+1])
                    }
                    if(cookieArray[i]==="hash"){
                        hash=cookieArray[i+1].substring(0, cookieArray[i+1].length-1)
                    }
                    if(cookieArray[i]==="url"){
                        url=cookieArray[i+1].substring(0, cookieArray[i+1].length)
                    }
                }
                if(url==="localhost"){
                    url="localhost:";
                    what=url+port;
                }else{
                    url="austin-reviews.herokuapp.com:80";
                    what=url;
                }
                console.log(url)
                cookieObj.username=username;
                cookieObj.port=port;
                cookieObj.hash=hash;
                cookieObj.url=url;
                console.log(cookieObj)
            }

        }
        console.log(what)
        this.socket = io(what);
        //this.socket = io('localhost:3001');
        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        this.state = {
            username: cookieObj.username,
            message: '',
            messages: [],
            id:[]
        };
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