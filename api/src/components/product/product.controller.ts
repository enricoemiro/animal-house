import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { RequiresAuth } from '../auth/decorators/requires-auth.decorator';
import { ImageType } from '../image/image.interface';
import { ImageFilePipe } from '../image/image.pipe';
import { ImageService } from '../image/image.service';
import { CreateDTO } from './dtos/create.dto';
import { GetProductsByCategoryDTO } from './dtos/getProductsByCategory.dto';
import { UpdatePictureDTO } from './dtos/updatePicture.dto';
import { ProductsNotFoundException } from './exceptions/products-not-found-exception.exception';
import { ProductService } from './product.service';

@Controller('product')
@RequiresAuth(true)
export class ProductController {
  constructor(private productService: ProductService, private imageService: ImageService) { }

  @Post('create')
  async create(@Body() createDTO: CreateDTO) {
    await this.productService.createOne(createDTO);
    return { message: 'The product has been successfully created.' };
  }

  @Get('get/products/:categoryId')
  @Header('Cross-Origin-Resource-Policy', 'cross-origin')
  async getProductsByCategory(@Param() { categoryId }: GetProductsByCategoryDTO) {
    const products = await this.productService.getProductsByCategory(categoryId);

    if (!products) {
      throw new ProductsNotFoundException();
    }
    return { products };
  }

  @Post('update/picture')
  @UseInterceptors(FileInterceptor('picture'))
  public async updateProductPicture(
    @Body() updatePictureDTO: UpdatePictureDTO,
    @UploadedFile(ImageFilePipe) picture: Express.Multer.File,
  ) {
    await this.imageService.create({
      ownerId: updatePictureDTO.id,
      type: ImageType.PRODUCT,
      buffer: picture.buffer,
    });

    await this.productService.updatePicture(updatePictureDTO.id);

    return { message: 'The product image has been successfully updated.' };
  }

  @Get('get/products')
  async getProducts() {
    const products = await this.productService.getProducts();
    return products;
  }
}
