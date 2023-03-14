import { Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { RequiresAuth } from '../auth/decorators/requires-auth.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { ImageService } from '../image/image.service';
import { CreateDTO } from './dtos/create.dto';
import { GetProductByIdDTO } from './dtos/get-product-by-id.dto';
import { GetProductsByCategoryDTO } from './dtos/get-products-by-category.dto';
import { ProductsNotFoundException } from './exceptions/products-not-found-exception.exception';
import { ProductService } from './product.service';

@Controller('/api/v1/product')
@RequiresAuth(true)
export class ProductController {
  constructor(private productService: ProductService, private imageService: ImageService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 3))
  async create(@Body() createDTO: CreateDTO, @UploadedFiles() images: Express.Multer.File[]) {
    const resizedImages = await this.imageService.resizeImages(images);

    await this.productService.createOne({
      name: createDTO.name,
      description: createDTO.description,
      availability: parseInt(createDTO.availability),
      price: parseFloat(createDTO.price),
      categoryId: createDTO.categoryId,
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

    return { message: 'The product has been successfully created.' };
  }

  @Get('get/products/:categoryId')
  @SkipAuth()
  async getProductsByCategory(@Param() { categoryId }: GetProductsByCategoryDTO) {
    const products = await this.productService.getProductsByCategory(categoryId);
    if (!products) {
      throw new ProductsNotFoundException();
    }
    return products;
  }

  @Get('get/product/:id')
  async getProductById(@Param() { id }: GetProductByIdDTO) {
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new ProductsNotFoundException();
    }
    return product;
  }

  @Get('get/preview')
  @SkipAuth()
  async getPreview() {
    const products = await this.productService.getPreview();

    if (!products) {
      throw new ProductsNotFoundException();
    }
    return products;
  }
}
