import { Injectable } from '@nestjs/common';
import { supabase } from '../db/supabase.service';

@Injectable()
export class UserService {
  async getUserById(id: number) {
    const result = await supabase.from('user').select('*').eq('id', id);

    return result.data;
  }

  async updateUserById(
    id: number,
    body: { name?: string; linkedInUrl?: string },
  ) {
    await supabase
      .from('user')
      .update({
        name: body.name,
        linkedInUrl: body.linkedInUrl,
      })
      .eq('id', id);

    return true;
  }

  async updateUserSurvey(
    id: number,
    result: { question: string; answer: string }[],
  ) {
    await supabase
      .from('user')
      .update({
        survey: result,
      })
      .eq('id', id);

    return true;
  }

  async getUserResult(id: number, anotherId?: number) {
    if (anotherId) {
      const { data: data1, error: error1 } = await supabase
        .from('match')
        .select(
          `
        *,
        userB: user!match_userB_fkey (
          id,
          created_at,
          name,
          email,
          linkedInUrl,
          survey
        )
      `,
        )
        .eq('userA', id)
        .eq('userB', anotherId);

      if (error1) {
        console.error('Error fetching matches:', error1);
        return;
      }

      const frag1 = data1.map((match) => {
        return {
          user: match.userB,
          result: {
            matchingScore: match.score,
            reasoning: match.reasoning,
            topicSuggestion: match.topicSuggestion,
            conversations: match.conversations,
          },
        };
      });

      const { data: data2, error: error2 } = await supabase
        .from('match')
        .select(
          `
        *,
        userA: user!match_userA_fkey (
          id,
          created_at,
          name,
          email,
          linkedInUrl,
          survey
        )
      `,
        )
        .eq('userB', id)
        .eq('userA', anotherId);

      if (error2) {
        console.error('Error fetching matches:', error2);
        return;
      }

      const frag2 = data2.map((match) => {
        return {
          user: match.userA,
          result: {
            matchingScore: match.score,
            reasoning: match.reasoning,
            topicSuggestion: match.topicSuggestion,
            conversations: match.conversations,
          },
        };
      });

      return [...frag1, ...frag2];
    }

    const { data: data1, error: error1 } = await supabase
      .from('match')
      .select(
        `
        *,
        userB: user!match_userB_fkey (
          id,
          created_at,
          name,
          email,
          linkedInUrl,
          survey
        )
      `,
      )
      .eq('userA', id)
      .order('score', { ascending: false });

    if (error1) {
      console.error('Error fetching matches:', error1);
      return;
    }

    const frag1 = data1.map((match) => {
      return {
        user: match.userB,
        result: {
          matchingScore: match.score,
          reasoning: match.reasoning,
          topicSuggestion: match.topicSuggestion,
          conversations: match.conversations,
        },
      };
    });

    const { data: data2, error: error2 } = await supabase
      .from('match')
      .select(
        `
        *,
        userA: user!match_userA_fkey (
          id,
          created_at,
          name,
          email,
          linkedInUrl,
          survey
        )
      `,
      )
      .eq('userB', id)
      .order('score', { ascending: false });

    if (error2) {
      console.error('Error fetching matches:', error2);
      return;
    }

    const frag2 = data2.map((match) => {
      return {
        user: match.userA,
        result: {
          matchingScore: match.score,
          reasoning: match.reasoning,
          topicSuggestion: match.topicSuggestion,
          conversations: match.conversations,
        },
      };
    });

    return [...frag1, ...frag2];
  }
}
