import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';
import { SYSTEM_PROMPT, USER_PROMPT } from './constants';
import { supabase } from '../db/supabase.service';
import { match } from 'assert';
import { GptResponse } from './match.types';
import { Json } from '../db/supabase.types';
@Injectable()
export class MatchService {
  constructor(private openAiService: OpenaiService) { }

  async test(input: string) {
    const completion = await this.openAiService.chatCompletion([
      {
        role: 'user',
        content: input,
      },
    ]);

    console.log('completion', completion);

    return completion;
  }

  async matchRandomTwo() {
    const id = new Date();
    console.log('matchRandomTwo() called: ', id);
    const [user1Id, user2Id] = await this.selectTwoUnmatchedPeople();

    const user1 = (await supabase.from('user').select('*').eq('id', user1Id))
      .data[0];
    const user2 = (await supabase.from('user').select('*').eq('id', user2Id))
      .data[0];

    const matchResult = await this.openAiService.chatCompletion([
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: USER_PROMPT.replace('{{user1_name}}', user1.name)
          .replace('{{user1_survey}}', JSON.stringify(user1.survey))
          .replace('{{user2_name}}', user2.name)
          .replace('{{user2_survey}}', JSON.stringify(user2.survey)),
      },
    ]);

    console.log('-------------------------');
    console.log(JSON.parse(matchResult));

    try {
      const parsedResult = JSON.parse(matchResult) as GptResponse;
      await supabase.from('match').insert({
        userA: user1Id,
        userB: user2Id,
        score: parseInt(parsedResult.matching.matchingScore),
        conversations: parsedResult.conversations,
        reasoning: parsedResult.matching.reasoning,
        topicSuggestion: parsedResult.matching.topicSuggestion,
      });
      console.log('matchRandomTwo() completed: ', id);
    } catch (e) {
      console.log;
    }

    return true;
  }

  private alreadySeletedPair: Map<string, boolean> = new Map();
  private async selectTwoUnmatchedPeople() {
    const { data: userIds, error: userIdsError } = await supabase
      .from('user')
      .select('id')
      .neq('survey', null);
    if (userIdsError) {
      throw userIdsError;
    }

    const allUserIds = userIds.map((elem) => elem.id);

    let tryCount = 500;
    while (tryCount >= 0) {
      const [user1, user2] = this.randomSample(allUserIds, 2);

      const found =
        this.alreadySeletedPair.get(JSON.stringify([user1, user2])) ||
        this.alreadySeletedPair.get(JSON.stringify([user2, user1]));

      if (found) {
        console.log('same pair already processed');
        tryCount--;
        continue;
      }

      // 2. check if already matched
      const { data: case1Data, error: error1 } = await supabase
        .from('match')
        .select('*')
        .eq('userA', user1)
        .eq('userB', user2);
      if (error1) {
        console.log(error1);
        tryCount--;
        continue;
      }
      if (case1Data.length > 0) {
        console.log(
          `already matched, ${user1}-${user2}, tryCount left ${tryCount}`,
        );
        tryCount--;
        continue;
      }

      const { data: case2Data, error: error2 } = await supabase
        .from('match')
        .select('*')
        .eq('userA', user2)
        .eq('userB', user1);
      if (error2) {
        console.log(error2);
        tryCount--;
        continue;
      }
      if (case2Data.length > 0) {
        console.log(
          `already matched, ${user1}-${user2}, tryCount left ${tryCount}`,
        );
        tryCount--;
        continue;
      }

      this.alreadySeletedPair.set(JSON.stringify([user1, user2]), true);
      console.log(`final 2 selected, ${[user1, user2]}`);
      return [user1, user2];
    }
  }

  private randomSample(list: number[], count: number): number[] {
    const sampled: number[] = [];
    const availableIndices = list.map((_, index) => index);

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const selectedIndex = availableIndices.splice(randomIndex, 1)[0];
      sampled.push(list[selectedIndex]);
    }

    return sampled;
  }
}
