import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dtos';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(user: any): Promise<string> {
    const payload = {id: user._id,provider: user.provider};
    return await this.jwtService.sign(payload);
  };

  async registerUser(payload: CreateUserDto): Promise<User> {
    let foundedUser = await this.userModel.findOne({email: payload.email,provider: payload.provider});
    if(foundedUser) {
      throw new ConflictException("User already exists");
    };
    if(!foundedUser) {
        let passwordHash: string | null = null;
        if(payload.password) {
          passwordHash = bcrypt.hashSync(payload.password, 10);
        };
        foundedUser = await this.userModel.create({
            fullName: payload.fullName,
            email: payload.email,
            password: passwordHash,
            provider: payload.provider || 'local'
        })
    };
    return foundedUser;
  };
  async loginUser(payload: {email: string, password: string}): Promise<User> {
    const foundedUser = await this.userModel.findOne({email: payload.email});
    if(!foundedUser) {
      throw new ConflictException("User not found");
    }
    const isMatch = bcrypt.compareSync(payload.password, foundedUser.password);
    if(!isMatch) {
      throw new ConflictException("Password is not match");
    };
    return foundedUser;
  }
}
