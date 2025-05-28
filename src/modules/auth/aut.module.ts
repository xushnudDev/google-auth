import { Module } from "@nestjs/common";
import { AuthController } from "./aut.controller";
import { GoogleStrategy } from "./strategy";

@Module({
    controllers: [AuthController],
    providers: [GoogleStrategy],
})
export class AuthModule {}