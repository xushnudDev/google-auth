import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-facebook";
import { AuthService } from "../auth.service";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(private readonly authService: AuthService) {
        super({
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            scope: ['email', 'public_profile'],
            profileFields: ['id', 'emails', 'name', 'displayName'], 
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any> {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName || `${profile.name?.givenName ?? ''} ${profile.name?.familyName ?? ''}`;

        const user = await this.authService.registerUser({
            fullName: name,
            email,
            password: '',
            provider: 'facebook',
        });

        const token = await this.authService.generateToken(user);
        return done(null, { user, token });
    }
}
