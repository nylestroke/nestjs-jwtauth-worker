import {ApiProperty} from "@nestjs/swagger";
import {IsString, Validate} from "class-validator";
import {Unique} from "sequelize-typescript";

export  class CreatePostDto {
    @ApiProperty({
        example: 'Example title',
        description: 'Заголовок статьи'
    })
    @IsString({message: 'Заголовок должен быть строкой'})
    @Validate(Unique)
    readonly title: string;

    @ApiProperty({
        example: 'Example content',
        description: 'Описание статьи'
    })
    @IsString({message: 'Описание статьи должно быть строкой'})
    readonly content: string;

    @ApiProperty({
        example: 1,
        description: 'Идентификатор пользователя'
    })
    readonly userId: number;
}