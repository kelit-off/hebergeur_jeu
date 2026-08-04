import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller({path: "auth", version: "1"})
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register() {

    }

    @Post('login')
    async login(@Body() body : LoginDto) {
        return this.authService.login(body)
    }

    @Post('forgot-password')
    async forgotPassword() {

    }

    @Post('reset-password')
    async reset() {

    }
}