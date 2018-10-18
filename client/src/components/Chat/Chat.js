import React from "react";
import io from "socket.io-client";
import './Chat.css';

// import socket = require('socket.io');
// const server = require('http').createServer()
// io.socket(server);

// io.on('connection', (socket) => {
//     console.log(socket.id);

//     socket.on('SEND_MESSAGE', function(data){
//         io.emit('RECEIVE_MESSAGE', data);
//     })
// });

//let socket;

class Chat extends React.Component{
    constructor(props){





        super(props);

        this.state = {
            cookie:{},
            username: '',
            json:'',
            message: '',
            messages: [],
            id:[],
            what:'',
            userlist:[],
        };


        this.checkCookie= ()=>{
            let cookieVars=document.cookie;
            let cookieObj={};
            // console.log(cookieVars);
            let url;
            let hash;
            let port;
            let username;
            let token
            let what="austin-reviews.herokuapp.com";
            if(cookieVars!==undefined){
                //console.log("in cookievars if")
                cookieVars=cookieVars.replace(/=/g, " ")
                let cookieArray= cookieVars.split(" ")
                if(cookieArray.length>1){
                    for(let i=0; i<cookieArray.length; i++){
                        //console.log("in cookiearray if")
                        if(cookieArray[i]==="username"){
                            if(cookieArray[i+1][cookieArray[i+1].length]===";"){
                                username=cookieArray[i+1].substring(0, cookieArray[i+1].length-1)
                            }else{
                                username=cookieArray[i+1].substring(0, cookieArray[i+1].length)
                            }
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
                        if(cookieArray[i]==="token"){
                            token=cookieArray[i+1].substring(0, cookieArray[i+1].length)
                            //console.log("full cookiearray token element")
                            //console.log(cookieArray[i+1])
                        }
                    }
                    if(url==="localhost"){
                        url="localhost:";
                        what=url+port;
                    }else{
                        url="austin-reviews.herokuapp.com";
                        what=url;
                    }
                    // console.log(url)
                    cookieObj.username=username;
                    cookieObj.port=port;
                    cookieObj.hash=hash;
                    cookieObj.url=url;
                    cookieObj.token=token;
                    cookieObj.what=what;
                    this.setState({cookie:cookieObj})
                    // console.log(cookieObj)

                   
                }

            }
            // console.log(what)

        }
        this.componentDidMount =async ()=>{
            await this.checkCookie();
            //console.log("On chat page, cookieobject in state:")
            //console.log(this.state.cookie)
        }


        let socket = io(this.state.cookie.what);

        //this.socket = io('localhost:3001');

        socket.on('connect', ()=>{
            socket.emit('authentication', {token:this.state.cookie.token});
                socket.on('authenticated', ()=> {
                    socket.on('RECEIVE_MESSAGE', (data)=>{
                        addMessage(data);
                        this.setState({userlist:data.userlist})
                    });   
                });
                socket.on('unauthorized', function(err){
                    console.log("There was an error with the authentication:", err.message);
                });

        });



        this.sendMessage = (ev) => {
            ev.preventDefault();
            //console.log(this.state.cookie)
            socket.emit('SEND_MESSAGE', {
                //author: this.state.cookie.username,
                message: this.state.message
            })
            this.setState({message: ''});
        } 

        const addMessage = data => {
            let id=this.idgen()
            // console.log(id)
            // console.log(data);
            data.id=id;
            this.setState({messages: [...this.state.messages, data]});
            // console.log(this.state.messages);
        };

        this.idgen = ()=>{
            return Math.floor(Math.random()*1000000000000);
        }
    }
    render(){
        // console.log(this.props.globUsername)

        return (
            <div className="" >
            <div className='container'>
                <div className="mt-3 card border border-dark p-3">
                    <div className="card-title">Global Chat</div>
                    <hr/>
                    <div className="messages">
                        {this.state.messages.map(message => {
                            return (
                                <div key={message.id}>
                                <p className='mb-0'><span className='text-info'>{message.author}</span>: {message.message}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="card border border-dark p-3">
                        <ul>
                        {this.state.userlist.map(user => {
                            return (
                                <div key={user}>
                                <li className='mb-0'><span className='text-info'>{user}</span></li>
                                </div>
                            )
                        })}
                        </ul>
                </div>
           
            <div className="fixedCard">
                {/* <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/> */}
                <textarea type="text" placeholder="Message" className="form-control mb-1" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                <div className='text-center'>
                    <button onClick={this.sendMessage} className="btn btn-primary btn-sm ">Send</button>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default Chat;