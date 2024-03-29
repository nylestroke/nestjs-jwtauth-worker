import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {UnbanUserDto} from "./dto/unban-user.dto";
import {UserRoles} from "../roles/user-roles.model";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User) private userRepository:
        typeof User, private roleService: RolesService,
    ) {}

    async createUser(dto: CreateUserDto) {
        const user =  await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue('Пользователь');
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async getAllUsers() {
        return await this.userRepository.findAll({include: {all: true}});
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({where: {email}, include: {all: true}});
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);

        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException({message: 'Пользователь или роль не найден'}, HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException({message: 'Пользователь не найден'}, HttpStatus.NOT_FOUND);
        }
        if (user.banned) {
            throw new HttpException({status: 400, message: `Пользователь ${user.email} уже заблокирован.`}, HttpStatus.BAD_REQUEST);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return {
            status: 200,
            message: `Пользователь ${user.email} успешно забанен`
        };
    }

    async unban(dto: UnbanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException({message: 'Пользователь не найден'}, HttpStatus.NOT_FOUND);
        }
        if (!user.banned) {
            throw new HttpException({status: 400, message: `Пользователь ${user.email} не заблокирован.`}, HttpStatus.BAD_REQUEST);
        }
        user.banned = false;
        user.banReason = null;
        await user.save();
        return {
            status: 200,
            message: `Пользователь ${user.email} успешно разблокирован`
        }
    }

    async delete(dto: UnbanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException({message: 'Пользователь не найден'}, HttpStatus.NOT_FOUND);
        }
        await user.destroy();
        return {
            status: 200
        }
    }

}
