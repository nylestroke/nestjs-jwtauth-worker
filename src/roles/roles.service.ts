import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof  Role) {
    }

    async createRole(dto: CreateRoleDto) {
        return this.roleRepository.create(dto);
    }

    async getRoleByValue(value: string) {
        return this.roleRepository.findOne({where: {value}});
    }

    async deleteRole(id: number) {
        const role = await this.roleRepository.findByPk(id);
        if (!role) {
            throw new HttpException("Не удалость найти роль по данному идентификатору", HttpStatus.NOT_FOUND);
        }
        await this.roleRepository.destroy({where: {id: id}});
        return {
            status: 200
        }
    }
}
