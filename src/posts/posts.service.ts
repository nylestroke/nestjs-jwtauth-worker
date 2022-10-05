import {ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {CreatePostDto} from "./dto/create-post.dto";
import {FilesService} from "../files/files.service";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
                private fileService: FilesService) {}

    async create(dto: CreatePostDto, image: any) {
        const fileName = await this.fileService.createFile(image);
        try {
            return await this.postRepository.create({...dto, image: fileName});
        } catch (err) {
            const errors = err.errors.map(err => err.message);
            throw new HttpException({status: 'error', error: errors}, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: number) {
        const post = await this.postRepository.findByPk(id);
        if (!post) {
            throw new HttpException("Не удалость найти статью по данному идентификатору", HttpStatus.NOT_FOUND);
        }
        await post.destroy();
        return {
            status: 200
        }
    }
}
