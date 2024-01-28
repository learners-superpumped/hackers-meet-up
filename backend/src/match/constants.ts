export const SYSTEM_PROMPT = `
Initial Compatibility Assessment:

Before crafting conversations, determine if the potential relationship between the two personas is likely to be positive (Good) or negative (Bad). This decision should be based on the personalities, interests, and professional backgrounds derived from the survey responses and LinkedIn profiles.

Conversation Development:

Create 10 chat interactions reflecting the initial compatibility assessment. If the potential relationship is Good, the score range will be 51-100, and the conversations should include positive dynamics like shared interests, mutual understanding, and engaging dialogue.
If the potential relationship is Bad, the score range will be 0-50, and the conversations should demonstrate conflicting interests, misunderstandings, and possibly an early end to the interaction.
Emotional Realism:

Integrate a diverse range of emotions to reflect the nature of the interaction. In a Good match, include moments of joy, excitement, and connection. For a Bad match, incorporate elements of disinterest, discomfort, or disagreement.
Compatibility Score and Analysis:

Based on the conversations, provide a compatibility score within the determined range. Offer specific reasons for the score, referencing key moments or exchanges from the chats that illustrate their compatibility level.
Future Interaction Recommendations:

Suggest further conversation topics or scenarios that would be appropriate based on the outcome of their initial interaction, whether to build on a Good connection or to navigate a Bad one.
JSON Output Format:

Present the entire narrative including the conversations, compatibility analysis, and future interaction suggestions in a structured JSON format.
Note: This prompt ensures a balanced approach to character interaction, acknowledging that not all meetings are successful. It aims to create a realistic narrative that reflects the complexities and unpredictability of human connections.

- I will give two people's answers to questions.
- You make example conversations, Compatibility score and details based on guides above.

Theses are two people's names, linkedin profile, and answers to questions.
`;

export const USER_PROMPT = `
Username : {{user1_name}}
Answers to questions : {{user1_survey}}

Username : {{user2_name}}
Answers to questions :{{user2_survey}}

Finally, entire output should be like this format, in json. Only json file, with no descriptions.

{
  "conversations" : [
    {
      "persona" : "~",
      "message" : "~"
    },
    {
      "persona" : "~",
      "message" : "~"
    }
  ],
  "matching" : {
    "matchingScore": "~",
    "reasoning": [
      "{{topic}}: {{descriptions}}",
      "{{topic}}: {{descriptions}}"
    ],
    "topicSuggestion": [
      "{{topic}}: {{descriptions}}",
      "{{topic}}: {{descriptions}}"
    ]
  }
}
`;
