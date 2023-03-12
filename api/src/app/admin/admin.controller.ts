import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { ActivityService } from '@/app/activity/activity.service';
import { RequiresAuth } from '@/app/auth/decorators/requires-auth.decorator';
import { CategoryService } from '@/app/category/category.service';
import { HeadOfficeService } from '@/app/headOffice/headOffice.service';
import { ProductService } from '@/app/product/product.service';
import { UserService } from '@/app/user/user.service';

import { PostService } from '../post/post.service';
import { CreateActivityDTO } from './dtos/create-activity.dto';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { CreateHeadOfficeDTO } from './dtos/create-headOffice.dto';
import { CreateProductDTO } from './dtos/create-product.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { DeleteHeadOfficesDTO } from './dtos/delete-headOffices.dto';
import { DeletePostsDTO } from './dtos/delete-posts.dto';
import { DeleteProductsDTO } from './dtos/delete-products.dto';
import { DeleteUsersDTO } from './dtos/delete-users.dto';
import { EditProductDTO } from './dtos/edit-product.dto';
import { EditUserDTO } from './dtos/edit-user.dto';
import { IdActivityDTO } from './dtos/id-activity.dto';
import { IdCategoryDTO } from './dtos/id-category.dto';
import { IdHeadOfficeDTO } from './dtos/id-headOffice.dto';
import { IdPostDTO } from './dtos/id-post.dto';
import { IdProductDTO } from './dtos/id-product.dto';
import { IdUserDTO } from './dtos/id-user.dto';
import { NameCategoryDTO } from './dtos/name-category.dto';

@Controller('/api/v1/admin')
@RequiresAuth(true)
export class AdminController {
  constructor(
    private productService: ProductService,
    private userService: UserService,
    private activityService: ActivityService,
    private categoryService: CategoryService,
    private headOfficeService: HeadOfficeService,
    private postService: PostService,
  ) {}
  @Get('get/users')
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get('get/categories')
  async getCategories() {
    const categories = await this.categoryService.getCategories();
    return categories;
  }

  @Get('get/products')
  async getProducts() {
    const products = await this.productService.getProducts();
    return products;
  }

  @Get('get/headoffices')
  async getHeadOffices() {
    const headoffices = await this.headOfficeService.getAllLocations();
    return headoffices;
  }

  @Get('get/posts')
  async getPosts() {
    const posts = await this.postService.getPosts();
    return posts;
  }

  @Post('create/user')
  async createUser(@Body() userDTO: CreateUserDTO) {
    await this.userService.createOne(userDTO);
    return { message: 'User created successfully.' };
  }

  @Post('create/product')
  async createProduct(@Body() createProductDTO: CreateProductDTO) {
    await this.productService.createOne(createProductDTO);
    return { message: 'The product has been successfully created.' };
  }

  @Post('create/headoffice')
  async createHeadOffice(@Body() createHeadOfficeDTO: CreateHeadOfficeDTO) {
    await this.headOfficeService.createOne(createHeadOfficeDTO);
    return { message: 'The head office has been successfully created.' };
  }

  @Post('create/activity')
  async createActivity(@Body() createActivityDTO: CreateActivityDTO) {
    await this.activityService.createOne(createActivityDTO);
    return { message: 'The activity has been successfully created.' };
  }

  @Delete('delete/user/:id')
  async deleteUser(@Param() { id }: IdUserDTO) {
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully.' };
  }

  @Delete('delete/users')
  async deleteUsers(@Body() { userIDs }: DeleteUsersDTO) {
    await this.userService.deleteUsers(userIDs);
    return { message: 'Users deleted successfully.' };
  }

  @Delete('delete/product/:id')
  async deleteProduct(@Param() { id }: IdProductDTO) {
    await this.productService.deleteProduct(id);
    return { message: 'Product deleted successfully.' };
  }

  @Delete('delete/products')
  async deleteProducts(@Body() { productIDs }: DeleteProductsDTO) {
    await this.productService.deleteProducts(productIDs);
    return { message: 'Products deleted successfully.' };
  }

  @Delete('delete/activity/:id')
  async deleteActivity(@Param() { id }: IdActivityDTO) {
    await this.activityService.deleteActivity(id);
    return { message: 'Activity deleted successfully.' };
  }

  @Delete('delete/category/:name')
  async deleteCategory(@Param() { name }: IdCategoryDTO) {
    await this.categoryService.deleteCategory(name);
    return { message: 'Category deleted successfully.' };
  }

  @Delete('delete/headoffice/:id')
  async deleteHeadOffice(@Param() { id }: IdHeadOfficeDTO) {
    await this.headOfficeService.deleteHeadOffice(id);
    return { message: 'HeadOffice deleted successfully.' };
  }

  @Delete('delete/headoffices')
  async deleteHeadOffices(@Body() { headOfficeIDs }: DeleteHeadOfficesDTO) {
    await this.headOfficeService.deleteHeadOffices(headOfficeIDs);
    return { message: 'Head offices deleted successfully.' };
  }

  @Delete('delete/post/:postId')
  async deletePost(@Param() { postId }: IdPostDTO) {
    await this.postService.deleteByPostId(postId);
    return { message: 'Post deleted succesfully.' };
  }

  @Delete('delete/posts')
  async deletePosts(@Body() { postIDs }: DeletePostsDTO) {
    await this.postService.deletePosts(postIDs);
    return { message: 'Head offices deleted successfully.' };
  }

  @Put('edit/user/:id')
  async editUser(@Param() { id }: IdUserDTO, @Body() editUserDTO: EditUserDTO) {
    await this.userService.editUser(id, editUserDTO);
    return { message: 'User edited successfully.' };
  }

  @Put('edit/product/:id')
  async editProduct(@Param() { id }: IdProductDTO, @Body() editProductDTO: EditProductDTO) {
    await this.productService.editProduct(id, editProductDTO);
    return { message: 'Product edited successfully.' };
  }

  @Put('edit/activity/:id')
  async editActivity(@Param() { id }: IdActivityDTO, @Body() editActivityDTO: CreateActivityDTO) {
    await this.activityService.editActivity(id, editActivityDTO);
    return { message: 'Activity edited successfully.' };
  }

  @Put('edit/headoffice/:id')
  async editHeadOffice(
    @Param() { id }: IdHeadOfficeDTO,
    @Body() editHeadOfficeDTO: CreateHeadOfficeDTO,
  ) {
    await this.headOfficeService.editHeadOffice(id, editHeadOfficeDTO);
    return { message: 'Activity edited successfully.' };
  }

  @Put('edit/category/:id')
  async editCategory(@Param() { id }: NameCategoryDTO, @Body() editCategoryDTO: CreateCategoryDTO) {
    await this.categoryService.editCategory(id, editCategoryDTO);
    return { message: 'Activity edited successfully.' };
  }

  @Put('book/activity/:id')
  async bookActivity(@Param() { id }: IdActivityDTO, @Body() idUserDTO: IdUserDTO) {
    await this.activityService.bookOne(id, idUserDTO.id);
    return { message: 'Activity booked successfully' };
  }

  @Put('unbook/activity/:id')
  async unbookActivity(@Param() { id }: IdActivityDTO, @Body() idUserDTO: IdUserDTO) {
    await this.activityService.unbookOne(id, idUserDTO.id);
    return { message: 'Activity unbooked successfully' };
  }
}
