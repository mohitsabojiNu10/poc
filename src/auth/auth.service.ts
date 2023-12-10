import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { SignUpDto } from './dto/signupDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly dbConnection: Connection) {}

  async signUp(signUpDto: SignUpDto): Promise<any> {
    const { email, password } = signUpDto;

    this.logger.log(this.dbConnection.isConnected);

    const query = `select * from m_users where email ='${email}'`;
    // const result = this.dbConnection(query);
    const isUserExists = await this.dbConnection.query(query);
    this.logger.log(isUserExists);

    if (isUserExists.length < 1) {
      return `User doesn't exists!`;
    }

    const pswd = isUserExists[0].password;
    const role = isUserExists[0].role;
    this.logger.log(pswd);

    if (pswd != password) {
      return 'Password is incorrect!';
    }

    this.logger.log(isUserExists);

    return {
      Message: 'Logged in successfully',
      Role: role,
    };

    // if (isUserExists) {
    //   throw new Error('name already exists');
    // }

    // console.log(signUpDto);
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    // const user = new User();
    // user.userName = name;
    // user.password = hashedPassword;
    // // user.userRole=
    // // const token = this.jwtService.sign({ id: user.userId });
    // await this.userRepository.save(user);
    // // console.log('token', token);
    // return {
    //   statusCode: HttpStatus.CREATED,
    //   message: 'user created successfully',
    //   // data: token,
    // };
  }
}
