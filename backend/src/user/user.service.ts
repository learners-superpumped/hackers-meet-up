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
  }
}
