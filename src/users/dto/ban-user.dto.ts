import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class BanUserDto {
    @ApiProperty({
        example: "1",
        description: "Идентификатор пользователя"
    })
    @IsNumber({}, {message: 'Идентификатор пользователя должен быть числом'})
    readonly userId: number;

    @ApiProperty({
        example: "Плохое поведение",
        description: "Причина блокировки"
    })
    @IsString({message: 'Должно быть строкой'})
    readonly banReason: string;
}