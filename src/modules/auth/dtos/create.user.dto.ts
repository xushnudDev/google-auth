export class CreateUserDto {
    fullName: string;
    email: string;
    password?: string;
    provider: string;
}