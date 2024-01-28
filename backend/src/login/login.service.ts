import { Injectable } from '@nestjs/common';
import { supabase } from '../db/supabase.service';

@Injectable()
export class LoginService {
  async loginOrSignUp(body: {
    email: string;
    name: string;
    linkedInUrl: string;
  }): Promise<{ userId: number }> {
    const userWithEmail = (
      await supabase
        .from('user')
        .select('*')
        .eq('email', body.email)
        .order('id', { ascending: false })
        .limit(1)
    ).data;

    // login
    if (userWithEmail.length > 0) {
      return { userId: userWithEmail[0].id };
    }

    // signup
    const { data, error } = await supabase
      .from('user')
      .upsert([
        {
          email: body.email,
          name: body.name,
          linkedInUrl: body.linkedInUrl,
        },
      ])
      .select();
    if (error) {
      throw error;
    }

    return { userId: data[0].id };
  }
}
