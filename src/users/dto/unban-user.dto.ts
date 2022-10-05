import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class UnbanUserDto {
    @ApiProperty({
        example: "1",
        description: "Идентификатор пользователя"
    })
    @IsNumber({}, {message: 'Идентификатор пользователя должен быть числом'})
    readonly userId: number;
}