import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { buildMessage } from 'class-validator';
import { buildResponse } from 'src/common/response/response.helper';
import { RegisterDto } from './dto/register.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.login(dto);
    return buildResponse(200, "Login realizado com sucesso.", user)
  }

  @Post('register')
  @ApiResponse({ status: 200, description: 'Usuário admin criado com sucesso' })
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.registerAdmin(dto);
    return buildResponse(201, 'Usuário admin criado com sucesso', user);
  }
}
