import React, { Component } from 'react'
import { Form, Icon, Input, Button, Row, Col, } from 'antd';
import io from "socket.io-client";
import { connect } from "react-redux"; //getting info from redux
import  moment  from "moment";
import {getChats} from "../../../_actions/chat_actions"

export class ChatPage extends Component {
    state= {
        chatMessage: "",
    }

    componentDidMount() {
        let server = "http://localhost:5000";
        this.props.dispatch(getChats());

        this.socket = io(server); //connect client to server

        this.socket.on("Output Chat Message", messageFromBackEnd => {
            console.log(messageFromBackEnd)
        })
    }

    hanleSearchChange =(e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }


    renderCards=()=>{
        this.props.chats.chats &&
        this.props.chats.chats.map((chat,i)=>{
            <ChatCard/>

        })

    }

    submitChatMessage = (e) => {
        e.preventDefault(); //Now what kind of value i want to send to the server 
        //geeting from props

        let chatMessage = this.state.chatMessage
        let userId = this.props.user.userData._id
        let userName = this.props.user.userData.name;
        let userImage = this.props.user.userData.image;
        let nowTime = moment(); // for current time we send the message
        let type = "Text"
//now have to send the message to the server
        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            userImage,
            nowTime,
            type
        });
        this.setState({ chatMessage: "" }) //put value back 
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <p style={{ fontSize: '2rem', textAlign: 'center' }}> Chit Chat</p>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="infinite-container">
                         {this.props.chats && (
                            <div>{this.renderCards()}</div>
                        )} }
                        <div
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                            style={{ float: "left", clear: "both" }}
                        />
                    </div>

                    <Row >
                        <Form layout="inline" onSubmit={this.submitChatMessage}>
                            <Col span={18}>
                                <Input
                                    id="message"
                                    prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Let's start talking"
                                    type="text"
                                    value={this.state.chatMessage}
                                    onChange={this.hanleSearchChange}
                                />
                            </Col>
                            <Col span={2}>
                                
                            </Col>

                            <Col span={4}>
                                <Button type="primary" style={{ width: '100%' }} onClick={this.submitChatMessage}  htmlType="submit">
                                    <Icon type="enter" />
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        Chats: state.chat
    }
}


export default connect(mapStateToProps)(ChatPage);