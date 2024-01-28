import { Body, Controller, Post } from '@nestjs/common';
import { MatchService } from './match.service';
import { OpenaiService } from '../openai/openai.service';

@Controller('match')
export class MatchController {
  constructor(
    private matchService: MatchService,
    private openAiService: OpenaiService,
  ) { }

  @Post('test')
  async test(@Body() body: { input: string }) {
    return await this.openAiService.chatCompletion2([
      {
        role: 'system',
        content: 'I am a highly intelligent question answering bot.',
      },
      {
        role: 'user',
        content: body.input,
      },
    ]);
  }

  @Post('batch-job')
  async batchJob() {
    await this.matchService.matchRandomTwo();
  }
}
