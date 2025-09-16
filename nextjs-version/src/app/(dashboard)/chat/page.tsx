"use client"

import { useEffect, useState } from "react"

import { Chat } from "./components/chat"
import { type Conversation, type Message, type User } from "./use-chat"

// Import static data
import conversationsData from "./data/conversations.json"
import messagesData from "./data/messages.json"
import usersData from "./data/users.json"

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Record<string, Message[]>>({})
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, these would be API calls
        setConversations(conversationsData as Conversation[])
        setMessages(messagesData as Record<string, Message[]>)
        setUsers(usersData as User[])
      } catch (error) {
        console.error("Failed to load chat data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-muted-foreground">Loading chat...</div>
      </div>
    )
  }

  return (
    <div className="px-4 md:px-6">
      <Chat
        conversations={conversations}
        messages={messages}
        users={users}
      />
    </div>
  )
}
