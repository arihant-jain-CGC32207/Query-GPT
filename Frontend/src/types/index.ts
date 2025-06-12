export interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
  data?: any[];
  isLoading?: boolean;
  error?: string;
}

export interface ApiResponse {
  result: any[];
}

export interface UserPrompt {
  prompt: string;
}