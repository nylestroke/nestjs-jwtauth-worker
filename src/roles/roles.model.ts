import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";

interface RoleCreationAttr {
    value: string;
    description: string;
}

@Table({
    tableName: 'roles'
})
export class Role extends Model<Role, RoleCreationAttr> {

    @ApiProperty({
        example: true,
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
        example: 'Administrator',
        description: 'Уникальное значение роли'
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    value: string;

    @ApiProperty({
        example: 'description',
        description: 'Описание роли'
    })
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}