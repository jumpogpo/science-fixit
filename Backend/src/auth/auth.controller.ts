import {
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { GoogleAuthGuard } from './google.auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-auth.dto';
import {
  LoginSuccessResponseDto,
  UnauthorizedResponseDto,
} from './dto/login-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login with email and password
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginSuccessResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const { accessToken } = this.authService.login(req.user);
    res.cookie('access_token', accessToken, { httpOnly: true });
    return { message: 'Login successful' };
  }

  // Login with google
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google login' })
  @ApiResponse({ status: 200, description: 'Redirect to Google login' })
  async googleAuth() {}

  // Google login callback
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google login callback' })
  @ApiResponse({ status: 200, description: 'Google login callback' })
  async googleAuthRedirect(@Request() req, @Res({ passthrough: true }) res) {
    const { accessToken } = await this.authService.googleLogin(req.user);
    res.cookie('access_token', accessToken, { httpOnly: true });
    return res.redirect('/');
  }
}
