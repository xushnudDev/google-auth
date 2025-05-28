import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: Function,
): Promise<any> {
  const user = {
    email: profile.emails[0].value,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
  };
  done(null, user);
}

}
