import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';

import { PrismaService } from '@/config/prisma/prisma.service';

import { PostPaginationDTO } from './dtos/post-pagination.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOne(post: Prisma.PostUncheckedCreateInput) {
    try {
      return await this.prismaService.client.post.create({
        data: {
          content: post.content,
          category: post.category,
          images: post.images,
          user: {
            connect: {
              id: post.userId,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteByPostId(postId: Prisma.PostWhereUniqueInput['id']) {
    try {
      return await this.prismaService.client.$transaction(async (tx) => {
        const deletedPost = await tx.post.deleteMany({
          where: {
            id: postId,
          },
        });

        const deletedImages = await tx.postImage.deleteMany({
          where: {
            postId,
          },
        });

        return [deletedPost, deletedImages];
      });
    } catch (error) {
      throw error;
    }
  }

  async find({ limit, after, before }: PostPaginationDTO) {
    try {
      return await this.prismaService.client.post
        // @ts-expect-error
        .paginate({
          include: {
            images: {
              select: {
                content: true,
              },
            },
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            id: 'desc',
          },
        })
        .withCursor({
          limit: +limit,
          ...(after && { after }),
          ...(before && { before }),
          getCursor(post: Post) {
            return post.id;
          },
          parseCursor(cursor: Post['id']) {
            return {
              id: cursor,
            };
          },
        });
    } catch (error) {
      throw error;
    }
  }

  async getPosts() {
    try {
      const posts = await this.prismaService.client.post.findMany({
        select: {
          id: true,
          content: true,
          category: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
          user: { select: { name: true, id: true, email: true } },
        },
      });
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async deletePosts(postIDs: Post['id'][]) {
    try {
      return this.prismaService.client.post.deleteMany({
        where: {
          id: {
            in: postIDs,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
