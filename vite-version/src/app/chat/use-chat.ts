"use client"

import { create } from "zustand"

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  status: "online" | "away" | "offline"
  lastSeen: string
  role: string
  department: string
}

export interface Message {
  id: string
  content: string
  timestamp: string
  senderId: string
  type: "text" | "image" | "file"
  isEdited: boolean
  reactions: Array<{
    emoji: string
    users: string[]
    count: number
  }>
  replyTo: string | null
}

export interface Conversation {
  id: string
  type: "direct" | "group"
  participants: string[]
  name: string
  avatar: string
  lastMessage: {
    id: string
    content: string
    timestamp: string
    senderId: string
  }
  unreadCount: number
  isPinned: boolean
  isMuted: boolean
}

interface ChatState {
  conversations: Conversation[]
  messages: Record<string, Message[]>
  users: User[]
  selectedConversation: string | null
  searchQuery: string
  isTyping: Record<string, boolean>
  onlineUsers: string[]
}

interface ChatActions {
  setConversations: (conversations: Conversation[]) => void
  setMessages: (conversationId: string, messages: Message[]) => void
  setUsers: (users: User[]) => void
  setSelectedConversation: (conversationId: string | null) => void
  setSearchQuery: (query: string) => void
  addMessage: (conversationId: string, message: Message) => void
  markAsRead: (conversationId: string) => void
  togglePin: (conversationId: string) => void
  toggleMute: (conversationId: string) => void
  setTyping: (conversationId: string, isTyping: boolean) => void
  setOnlineUsers: (userIds: string[]) => void
}

export const useChat = create<ChatState & ChatActions>((set, get) => ({
  // State
  conversations: [],
  messages: {},
  users: [],
  selectedConversation: null,
  searchQuery: "",
  isTyping: {},
  onlineUsers: [],

  // Actions
  setConversations: (conversations) => set({ conversations }),
  
  setMessages: (conversationId, messages) => 
    set((state) => ({
      messages: { ...state.messages, [conversationId]: messages }
    })),
  
  setUsers: (users) => set({ users }),
  
  setSelectedConversation: (conversationId) => {
    set({ selectedConversation: conversationId })
    if (conversationId) {
      get().markAsRead(conversationId)
    }
  },
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  addMessage: (conversationId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), message]
      },
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: {
                id: message.id,
                content: message.content,
                timestamp: message.timestamp,
                senderId: message.senderId
              }
            }
          : conv
      )
    })),
  
  markAsRead: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      )
    })),
  
  togglePin: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, isPinned: !conv.isPinned } : conv
      )
    })),
  
  toggleMute: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, isMuted: !conv.isMuted } : conv
      )
    })),
  
  setTyping: (conversationId, isTyping) =>
    set((state) => ({
      isTyping: { ...state.isTyping, [conversationId]: isTyping }
    })),
  
  setOnlineUsers: (userIds) => set({ onlineUsers: userIds }),
}))
