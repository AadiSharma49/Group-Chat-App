import React, { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  where,
  query,
  orderBy
} from 'firebase/firestore';
import { auth, db } from '../firebase-config.jsx';
import './Chat.css';

const Chat = ({ room, onLeave }) => { // ✅ Add onLeave callback
  const [newChat, setNewChat] = useState('');
  const [chats, setChats] = useState([]);
  const messagesRef = collection(db, 'messages');

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where('room', '==', room),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const messages = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((msg) => msg.createdAt); // Filter out empty timestamps
      setChats(messages);
    });

    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newChat.trim() === '') return;

    if (!auth.currentUser) {
      alert('You must be signed in to send messages.');
      return;
    }

    try {
      await addDoc(messagesRef, {
        text: newChat.trim(),
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room
      });
      setNewChat('');
    } catch (error) {
      console.error('🔥 Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="Chat-app">
      <div className="chat-header">
        <h2>Room: {room}</h2>
        <button className="back-button" onClick={onLeave}>⬅ Back</button> {/* ✅ Back Button */}
      </div>
      <div className="messages">
        {chats.map((chat) => (
          <div key={chat.id} className="message">
            <span className="message-user">{chat.user}:</span> {chat.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-chat-form">
        <input
          type="text"
          className="new-chat-input"
          placeholder="Enter your message..."
          onChange={(e) => setNewChat(e.target.value)}
          value={newChat}
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default Chat;
