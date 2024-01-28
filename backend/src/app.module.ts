import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { MatchController } from './match/match.controller';
import { MatchService } from './match/match.service';
import { OpenaiService } from './openai/openai.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [
    AppController,
    UserController,
    LoginController,
    MatchController,
  ],
  providers: [
    AppService,
    UserService,
    LoginService,
    MatchService,
    OpenaiService,
    CronService,
  ],
})
export class AppModule { }
