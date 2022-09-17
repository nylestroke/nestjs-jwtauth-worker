import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: 'user@mail.com',
        description: 'Почтовый адресс'
    })
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный формат почты'})
    readonly email: string;

    @ApiProperty({
        example: 'password',
        description: 'Пароль пользователя'
    })
    @IsString({message: 'Должно быть строкой'})
    @Length(5, 24, {message: 'Пароль должен быть от 5 до 24 символов'})
    readonly password: string;
}