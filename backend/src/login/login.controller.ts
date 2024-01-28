import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) { }

  @Post()
  async login(
    @Body() body: { email: string; name: string; linkedInUrl: string },
  ): Promise<{ userId: number }> {
    return await this.loginService.loginOrSignUp(body);
  }
}
