/* eslint-disable prettier/prettier */
import { IsEmail, MaxLength, MinLength } from "class-validator";

export class LoginAuthDto {
    @IsEmail()
    correo: string;

    @MinLength(4)
    @MaxLength(16)
    password: string;
}