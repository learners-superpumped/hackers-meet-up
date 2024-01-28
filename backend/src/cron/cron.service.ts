import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { MatchService } from '../match/match.service';

@Injectable()
export class CronService {
  constructor(private matchService: MatchService) { }

  @Interval(5000)
  handleCron() {
    this.matchService.matchRandomTwo();
  }
}
