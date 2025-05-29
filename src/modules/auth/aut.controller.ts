import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Get("/google")
    @UseGuards(AuthGuard('google'))
    async googleAuth() {}


    @Get("/google/callback")
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: any) {
        return (req.user);
    };


    @Get("/facebook")
    @UseGuards(AuthGuard('google'))
    async facebookAuth() {}


    @Get("/facebook/callback")
    @UseGuards(AuthGuard('facebook'))
    async facebookAuthRedirect(@Req() req: any) {
        return (req.user);
    };


    @Post("register")
    async register(@Body() payload: CreateUserDto) {
        return await this.authService.registerUser(payload);
    };
    @Post("login")
    async login(@Body() payload: {email: string, password: string}) {
        return await this.authService.loginUser(payload);
    };
}