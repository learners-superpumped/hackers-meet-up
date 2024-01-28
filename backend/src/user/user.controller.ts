import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    console.log('id', id);
    return await this.userService.getUserById(id);
  }

  @Patch(':id')
  async updateUserById(
    @Param('id') id: number,
    @Body()
    body: {
      name?: string;
      linkedInUrl?: string;
    },
  ) {
    return await this.userService.updateUserById(id, body);
  }

  @Post(':id/survey')
  async updateSurveyResult(
    @Param('id') id: number,
    @Body()
    body: {
      result: { question: string; answer: string }[];
    },
  ) {
    return await this.userService.updateUserSurvey(id, body.result);
  }

  @Get(':id/result')
  async getResults(@Param('id') id: number, @Query('with') anotherId?: number) {
    return await this.userService.getUserResult(id, anotherId);
  }
}
