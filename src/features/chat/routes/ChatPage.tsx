import React, { useState } from 'react';
import { useGetAllContacts } from '../api/getContacts';
import storage from '../../../utils/storage';
import { ChatWindow } from '../components/ChatWindow';

const ChatPage = () => {
    const [receiverId, setReceiverId] = useState<string | null>(null);
    const currentUserId = storage.getUser().user.id;
    const users = useGetAllContacts().data || [];
    console.log(users);

    return (
        <div style={{ display: 'flex' }}>
            <div>
                {users.map(user => (
                    <div
                        key={user.id}
                        onClick={() => setReceiverId(user.id)}
                        style={{
                            cursor: 'pointer',
                            padding: '10px',
                            borderRadius: '5px',
                            backgroundColor: receiverId === user.id ? '#e9ecef' : 'white'
                        }}
                    >
                        {user.firstName} {user.lastName}
                    </div>
                ))}
            </div>
            <div style={{
                marginLeft: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                width: '100%'
            }}>
                {receiverId ? (
                    <ChatWindow
                        receiverId={receiverId}
                        currentUserId={currentUserId.toString()}
                    />
                ) : (
                    <div>Select a user to start chatting</div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;