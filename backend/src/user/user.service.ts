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
      const { data, error } = await supabase
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

      if (error) {
        console.error('Error fetching matches:', error);
        return;
      }

      return data;
    }

    const { data, error } = await supabase
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
      .eq('userA', id);

    if (error) {
      console.error('Error fetching matches:', error);
      return;
    }

    return data;
  }
}
