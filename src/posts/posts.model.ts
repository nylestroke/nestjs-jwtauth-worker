import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";

interface PostCreationAttr {
    title: string;
    content: string;
    userId: number;
    image: string;
}

@Table({
    tableName: 'posts'
})
export class Post extends Model<Post, PostCreationAttr> {
    @ApiProperty({
        example: 1,
        description: 'Уникальный идентификатор'
    })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({
        example: 'Example title',
        description: 'Заголовок статьи'
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    title: string;

    @ApiProperty({
        example: 'Example content',
        description: 'Описание статьи'
    })
    @Column({
        type: DataType.STRING,
         allowNull: false
    })
    content: string;

    @ApiProperty({
        example: '/static/image.jpg',
        description: 'Изображение статьи'
    })
    @Column({
        type: DataType.STRING
    })
    image: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId: number;

    @BelongsTo(() => User)
    author: User;
}