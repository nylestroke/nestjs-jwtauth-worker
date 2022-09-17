import {Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {Post as PostModel} from "./posts.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Статьи')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @ApiOperation({
        summary: 'Создание статьи'
    })
    @ApiResponse({
        status: 200,
        type: PostModel
    })
    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
        return this.postService.create(dto, image);
    }
}
