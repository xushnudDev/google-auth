import { Module } from "@nestjs/common";
import { AuthController } from "./aut.controller";
import { FacebookStrategy, GoogleStrategy } from "./strategy";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./model";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name,schema: UserSchema}]),
        JwtModule.register({
            secret: "secret",
            signOptions: { expiresIn: "1d" },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService,GoogleStrategy,FacebookStrategy],
    exports: [AuthService]
})
export class AuthModule {}