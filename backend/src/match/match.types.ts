export interface GptResponse {
  conversations: Record<string, string>[];
  matching: {
    matchingScore: string;
    reasoning: string[];
    topicSuggestion: string[];
  };
}
