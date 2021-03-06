import React from "react";
import moment from 'moment';
import { Comment, Tooltip, Avatar, Divider } from 'antd';
import ReactEmoji from 'react-emoji';

// function ChatCard(props) {
//     return (
//         <div style={{ width: '100%' }}>
//             <Comment
//                 author={props.sender.name}
//                 avatar={
//                     <Avatar
//                         src={props.sender.image} alt={props.sender.name}
//                     />
//                 }
//                 content={
//                     props.message.substring(0, 8) === "uploads/" ?
//                         // this will be either video or image 

//                         props.message.substring(props.message.length - 3, props.message.length) === 'mp4' ?
//                             <video
//                                 style={{ maxWidth: '200px' }}
//                                 src={`http://localhost:5000/${props.message}`} alt="video"
//                                 type="video/mp4" controls
//                             />
//                             :
//                             <img
//                                 style={{ maxWidth: '200px' }}
//                                 src={`http://localhost:5000/${props.message}`}
//                                 alt="img"
//                             />
//                         :
//                         <p>
//                             {props.message}
//                         </p>
//                 }
//                 datetime={
//                     <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
//                         <span>{moment().fromNow()}</span>
//                     </Tooltip>
//                 }
//             />
//         </div>
//     )
// // }
// function ChatCard(props){
//     return(
//         <div style={{width:'100%'}}>
//             hello
//         </div>

//     )
// }


function ChatCard(props) {
    return (
        <div style={{ width: '100%' }}>
            
            <Comment
            
                author={props.sender.name}
                avatar={
                    <Avatar
                        src={props.sender.image} alt={props.sender.name}
                    />
                }
                content={
                    props.message.substring(0, 8) === "uploads/" ?
                        // this will be either video or image 

                        props.message.substring(props.message.length - 3, props.message.length) === 'mp4' ?
                            <video
                                style={{ maxWidth: '200px' }}
                                src={`http://localhost:5000/${props.message}`} alt="video"
                                type="video/mp4" controls
                            />
                            :
                            <img
                                style={{ maxWidth: '201px' }}
                                src={`http://localhost:5000/${props.message}`}
                                alt="img"
                            />
                        :
                        <p style={{color:'#000'}}>
                            {props.message}
                        </p>
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                    </Tooltip>
                }
            />
        </div>
    )
}


























export default ChatCard;