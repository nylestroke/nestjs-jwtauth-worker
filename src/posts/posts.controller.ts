import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {Post as PostModel} from "./posts.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

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

    @ApiOperation({
        summary: 'Удаление статьи'
    })
    @ApiResponse({
        status: 200
    })
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    deletePost(@Param('id') id: number) {
        return this.postService.delete(id);
    }
}
