import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private openai;
  constructor() {
    this.openai = new OpenAI({
      // FIXME(동작하는 apiKey로 변경해야 함)
      apiKey: 'dummy',
    });
  }
  async chatCompletion(
    messages: { role: string; content: string }[],
  ): Promise<string> {
    console.log(`messages >> ${JSON.stringify(messages)}`);
    const response = await this.openai.chat.completions.create({
      messages: messages,
      response_format: { type: 'json_object' },
      // model: 'gpt-4-1106-preview',
      model: 'gpt-3.5-turbo-1106', // FIXME(GPT-4로 변경)
    });

    // console.log(`GPT response >> ${JSON.stringify(response)}`);

    return response.choices[0].message.content;
  }

  async chatCompletion2(
    messages: { role: string; content: string }[],
  ): Promise<string> {
    console.log('together ai called ==================================');
    const url = 'https://api.together.xyz/v1/chat/completions';
    const apiKey = 'dummy';

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    });

    const data = {
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      max_tokens: 1024,
      messages: messages,
    };

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    };

    const rawResponse = await fetch(url, options);
    const response = JSON.parse(await rawResponse.text());
    // .then((response) => response.json())
    // .then((response) => {
    //   return response.choices[0].message.content;
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });

    return response.choices[0].message.content;
  }
}
