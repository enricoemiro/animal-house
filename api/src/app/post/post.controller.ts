import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Session,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { RequiresAuth } from '@/app/auth/decorators/requires-auth.decorator';
import { SkipAuth } from '@/app/auth/decorators/skip-auth.decorator';
import { UserSession } from '@/app/user/interfaces/user-session.interface';

import { ImageService } from '../image/image.service';
import { CreateDTO } from './dtos/create.dto';
import { DeleteByPostIdDTO } from './dtos/delete-by-post-id.dto';
import { PostPaginationDTO } from './dtos/post-pagination.dto';
import { PostService } from './post.service';

@Controller('/api/v1/post')
@RequiresAuth(true)
export class PostController {
  constructor(private readonly postService: PostService, private imageService: ImageService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 3))
  async createPost(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createDTO: CreateDTO,
    @Session() { user }: UserSession,
  ) {
    const resizedImages = await this.imageService.resizeImages(images);

    await this.postService.createOne({
      content: createDTO.content,
      category: createDTO.category,
      userId: user.id,
      ...(resizedImages.length > 0
        ? {
            images: {
              createMany: {
                data: resizedImages,
              },
            },
          }
        : {}),
    });

    return {
      message: 'The post has been successfully created.',
    };
  }

  @Delete('delete/:postId')
  async deleteByPostId(@Param() { postId }: DeleteByPostIdDTO) {
    await this.postService.deleteByPostId(postId);

    return {
      message: 'The post has been successfully deleted.',
    };
  }

  @Get('get/posts')
  @SkipAuth()
  async getPosts(@Query() getPostsDTO: PostPaginationDTO) {
    const [posts, meta] = await this.postService.find(getPostsDTO);

    return {
      posts,
      meta,
    };
  }
}
