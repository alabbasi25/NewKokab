import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { 
  ChatMessage, GratitudePost, ConflictMessage, RomancePrompt, JournalEntry, UserID, UserStatus,
  LoveLanguageResult, PrivateNote
} from '../types';
import { kokabApi } from '../api';

interface MawaddaContextType {
  messages: ChatMessage[];
  gratitudeFeed: GratitudePost[];
  conflictRoom: ConflictMessage[];
  romancePrompts: RomancePrompt[];
  journal: JournalEntry[];
  partnerStatus: UserStatus | null;
  isPartnerTyping: boolean;
  loveLanguages: LoveLanguageResult[];
  privateNotes: PrivateNote[];
  
  // Actions
  sendMessage: (text: string, type?: ChatMessage['type']) => void;
  addChatReaction: (msgId: string, emoji: string) => void;
  editMessage: (id: string, text: string) => void;
  deleteMessage: (id: string) => void;
  markMessagesRead: () => void;
  addGratitude: (content: string) => void;
  sendConflictMessage: (content: string) => void;
  setTypingStatus: (isTyping: boolean) => void;
  nudgePartner: (title: string, body: string) => void;
  sendHapticPulse: (pattern: string) => void;
}

const MawaddaContext = createContext<MawaddaContextType | undefined>(undefined);

export const MawaddaProvider: React.FC<{ children: React.ReactNode; userId: UserID }> = ({ children, userId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [gratitudeFeed, setGratitudeFeed] = useState<GratitudePost[]>([]);
  const [conflictRoom, setConflictRoom] = useState<ConflictMessage[]>([]);
  const [romancePrompts, setRomancePrompts] = useState<RomancePrompt[]>([]);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [partnerStatus, setPartnerStatus] = useState<UserStatus | null>(null);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const [loveLanguages, setLoveLanguages] = useState<LoveLanguageResult[]>([]);
  const [privateNotes, setPrivateNotes] = useState<PrivateNote[]>([]);
  
  const socketRef = useRef<Socket | null>(null);

  // Sync initial state from server
  useEffect(() => {
    const fetchState = async () => {
      try {
        const { data } = await kokabApi.getState();
        if (data.messages) setMessages(data.messages);
        if (data.gratitudeFeed) setGratitudeFeed(data.gratitudeFeed);
        if (data.conflictRoom) setConflictRoom(data.conflictRoom);
        if (data.romancePrompts) setRomancePrompts(data.romancePrompts);
        if (data.journal) setJournal(data.journal);
        if (data.loveLanguages) setLoveLanguages(data.loveLanguages);
        if (data.privateNotes) setPrivateNotes(data.privateNotes);
      } catch (err) {
        console.error("Mawadda sync failed", err);
      }
    };
    fetchState();
  }, [userId]);

  useEffect(() => {
    socketRef.current = io();
    const socket = socketRef.current;

    socket.emit('user:online', userId);

    socket.on('chat:message', (msg: ChatMessage) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on('chat:typing', (data: { userId: UserID, isTyping: boolean }) => {
      if (data.userId !== userId) {
        setIsPartnerTyping(data.isTyping);
      }
    });

    socket.on('user:status_update', (status: Record<UserID, UserStatus>) => {
      const partnerId = userId === 'F' ? 'B' : 'F';
      if (status[partnerId]) setPartnerStatus(status[partnerId]);
    });

    socket.on('system:nudge', (data: { title: string, body: string }) => {
      // In a real app, this would trigger a push notification
      // Here we can just log it or show a local UI notification if needed
      console.log("NUDGE RECEIVED:", data);
    });

    socket.on('system:haptic', (data: { pattern: string }) => {
      if ('vibrate' in navigator) {
        if (data.pattern === 'heartbeat') navigator.vibrate([200, 100, 200]);
        else if (data.pattern === 'double_pulse') navigator.vibrate([100, 50, 100]);
        else navigator.vibrate(200);
      }
    });

    return () => { socket.disconnect(); };
  }, [userId]);

  const sendMessage = (text: string, type: ChatMessage['type'] = 'text') => {
    const msg: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: userId,
      text,
      timestamp: Date.now(),
      type,
      status: 'sent',
      reactions: {}
    };
    setMessages(prev => [...prev, msg]);
    socketRef.current?.emit('chat:message', msg);
    kokabApi.updateState({ messages: [...messages, msg] });
  };

  const addChatReaction = (messageId: string, emoji: string) => {
    socketRef.current?.emit('chat:reaction', { messageId, emoji, userId });
    const updated = messages.map(m => m.id === messageId ? {
      ...m,
      reactions: { ...m.reactions, [emoji]: [...(m.reactions[emoji] || []), userId] }
    } : m);
    setMessages(updated);
    kokabApi.updateState({ messages: updated });
  };

  const editMessage = (id: string, text: string) => {
    const updated = messages.map(m => m.id === id ? { ...m, text, editedAt: Date.now() } : m);
    setMessages(updated);
    socketRef.current?.emit('chat:edit', { id, text });
    kokabApi.updateState({ messages: updated });
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    socketRef.current?.emit('chat:delete', id);
    kokabApi.updateState({ messages: updated });
  };

  const markMessagesRead = () => {
    const partnerId = userId === 'F' ? 'B' : 'F';
    const updated = messages.map(m => m.senderId === partnerId && m.status !== 'read' ? { ...m, status: 'read' as const } : m);
    setMessages(updated);
    socketRef.current?.emit('chat:read', userId);
    kokabApi.updateState({ messages: updated });
  };

  const addGratitude = (content: string) => {
    const post: GratitudePost = {
      id: Math.random().toString(36).substr(2, 9),
      authorId: userId,
      content,
      timestamp: Date.now(),
      reactions: [],
      likes: [],
      comments: []
    };
    setGratitudeFeed(prev => [post, ...prev]);
    kokabApi.updateState({ gratitudeFeed: [post, ...gratitudeFeed] });
  };

  const sendConflictMessage = (content: string) => {
    const msg: ConflictMessage = {
      id: Math.random().toString(36).substr(2, 9),
      authorId: userId,
      content,
      timestamp: Date.now(),
      revealed: false
    };
    setConflictRoom(prev => [...prev, msg]);
    kokabApi.updateState({ conflictRoom: [...conflictRoom, msg] });
  };

  const setTypingStatus = (isTyping: boolean) => {
    socketRef.current?.emit('chat:typing', { userId, isTyping });
  };

  const nudgePartner = (title: string, body: string) => {
    socketRef.current?.emit('system:nudge', { recipientId: userId === 'F' ? 'B' : 'F', title, body });
  };

  const sendHapticPulse = (pattern: string) => {
    socketRef.current?.emit('system:haptic', { recipientId: userId === 'F' ? 'B' : 'F', pattern });
  };

  return (
    <MawaddaContext.Provider value={{
      messages, gratitudeFeed, conflictRoom, romancePrompts, journal, partnerStatus, isPartnerTyping,
      loveLanguages, privateNotes,
      sendMessage, addChatReaction, editMessage, deleteMessage, markMessagesRead, addGratitude, sendConflictMessage, setTypingStatus, nudgePartner, sendHapticPulse
    }}>
      {children}
    </MawaddaContext.Provider>
  );
};

export const useMawadda = () => {
  const context = useContext(MawaddaContext);
  if (!context) throw new Error('useMawadda must be used within MawaddaProvider');
  return context;
};
