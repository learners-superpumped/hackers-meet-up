import { Injectable } from '@nestjs/common';
import { supabase } from './db/supabase.service';

@Injectable()
export class AppService {
  getHello(): string {
    supabase.from('test').select('*').then(console.log);
    return 'Hello World!';
  }
}
