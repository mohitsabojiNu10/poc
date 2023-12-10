import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SignUpDto } from './dto/signupDto';
import { AuthService } from './auth.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signupData: SignUpDto) {
    const result = await this.authService.signUp(signupData);
    if (result == `User doesn't exists!`) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: [`User doesn't exists!`],
        },
        HttpStatus.NOT_FOUND,
      );
    } else if (result == `Password is incorrect!`) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: [`Password is incorrect!`],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return result;
  }
}
