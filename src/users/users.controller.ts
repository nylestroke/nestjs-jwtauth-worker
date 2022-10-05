import {Body, Controller, Get, Param, Post, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @ApiOperation({
        summary: 'Создание пользователя'
    })
    @ApiResponse({
        status: 200,
        type: User
    })
    @UseGuards(RolesGuard)
    @Roles('Администратор')
    @UsePipes(ValidationPipe)
    @Post('/create')
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({
        summary: 'Получение всех пользователей'
    })
    @ApiResponse({
        status: 200,
        type: [User]
    })
    @Roles('Администратор')
    @UseGuards(RolesGuard)
    @Get('/list')
    getAll() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({
        summary: 'Получение информации об пользователе'
    })
    @ApiResponse({
        status: 200,
        type: User
    })
    @UseGuards(JwtAuthGuard)
    @Get('/:email')
    getUserByEmail(@Param() data: {email: string}) {
        return this.userService.getUserByEmail(data.email);
    }

    @ApiOperation({summary: 'Выдача роли пользователю'})
    @ApiResponse({status: 200})
    @Roles('Администратор')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }

    @ApiOperation({summary: 'Забанить пользователя'})
    @ApiResponse({status: 200})
    @Roles('Администратор')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.userService.ban(dto);
    }
}
