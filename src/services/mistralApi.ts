
interface MistralMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface MistralResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

class MistralAPI {
  private apiKey: string;
  private baseUrl = 'https://openrouter.ai/api/v1/chat/completions';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(
    messages: MistralMessage[],
    options: {
      temperature?: number;
      maxTokens?: number;
      model?: string;
    } = {}
  ): Promise<string> {
    const {
      temperature = 0.7,
      maxTokens = 1000,
      model = 'mistralai/mistral-7b-instruct'
    } = options;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'NSFW AI Chat'
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens: maxTokens,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenRouter API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const data: MistralResponse = await response.json();
      return data.choices[0]?.message?.content || 'Keine Antwort erhalten.';
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      throw new Error(error instanceof Error ? error.message : 'Unbekannter Fehler beim Senden der Nachricht');
    }
  }

  createSystemPrompt(responseStyle: string, nsfw: boolean): string {
    const basePrompt = `Du bist ein ${responseStyle} AI-Assistent. Antworte auf Deutsch in einem ${responseStyle} Ton.`;
    
    if (nsfw) {
      return `${basePrompt} Du kannst über erwachsene Themen sprechen und bist offen für intime Gespräche. Sei respektvoll aber auch verführerisch und spielerisch.`;
    }
    
    return `${basePrompt} Halte die Unterhaltung respektvoll und freundlich.`;
  }
}

export default MistralAPI;
