import { Injectable } from '@nestjs/common';
import { supabase } from './db/supabase.service';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const result = await supabase.from('test').select('*');

    console.log(result.data['test']);
    // return result.data[0].name;
    return 'hello';
  }
}
