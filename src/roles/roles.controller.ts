import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiTags, ApiOperation, ApiResponse} from "@nestjs/swagger";

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @ApiOperation({
        summary: "Создание роли пользователя"
    })
    @ApiResponse({
        status: 200,
        type: CreateRoleDto
    })
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({
        summary: "Получение информации о роли по ее названию"
    })
    @ApiResponse({
        status: 200,
        type: CreateRoleDto
    })
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }
}
