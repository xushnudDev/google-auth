import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor() {}


    @Get("/google")
    @UseGuards(AuthGuard('google'))
    async googleAuth() {}


    @Get("/google/callback")
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: any) {
        return (req.user);
    }
}