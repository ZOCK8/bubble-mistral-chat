
import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from '@/components/ChatHeader';
import ChatBubble from '@/components/ChatBubble';
import ChatInput from '@/components/ChatInput';
import SettingsPanel from '@/components/SettingsPanel';
import MistralAPI from '@/services/mistralApi';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

const Index = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hallo! Ich bin dein AI-Assistent. Wie kann ich dir heute helfen? 😊',
      isUser: false,
      timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    aiName: 'Luna AI',
    theme: 'purple',
    temperature: 0.7,
    maxTokens: 1000,
    nsfw: true,
    responseStyle: 'flirty'
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mistralApi = new MistralAPI('451d5e98-3182-4cc2-8863-485f28981683');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getThemeClasses = () => {
    switch (settings.theme) {
      case 'blue':
        return 'bg-gradient-to-br from-blue-100 to-blue-200';
      case 'red':
        return 'bg-gradient-to-br from-red-100 to-pink-200';
      case 'green':
        return 'bg-gradient-to-br from-green-100 to-emerald-200';
      case 'dark':
        return 'bg-gradient-to-br from-gray-800 to-gray-900';
      default:
        return 'bg-gradient-to-br from-purple-100 to-pink-200';
    }
  };

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const conversationHistory = messages.map(msg => ({
        role: (msg.isUser ? 'user' : 'assistant') as const,
        content: msg.content
      }));

      const systemPrompt = mistralApi.createSystemPrompt(settings.responseStyle, settings.nsfw);
      
      const apiMessages = [
        { role: 'system' as const, content: systemPrompt },
        ...conversationHistory,
        { role: 'user' as const, content: messageText }
      ];

      const response = await mistralApi.sendMessage(apiMessages, {
        temperature: settings.temperature,
        maxTokens: settings.maxTokens
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : "Nachricht konnte nicht gesendet werden",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative">
      <ChatHeader
        onSettingsClick={() => setShowSettings(true)}
        aiName={settings.aiName}
        isOnline={true}
      />
      
      <div className={`flex-1 overflow-y-auto p-4 ${getThemeClasses()}`}>
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.content}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        
        {isLoading && (
          <ChatBubble
            message=""
            isUser={false}
            timestamp=""
            isTyping={true}
          />
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isLoading}
      />
      
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </div>
  );
};

export default Index;
