import {
    Body,
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Put,
} from '@nestjs/common';
import { RequiresAuth } from '@/components/auth/decorators/requires-auth.decorator';
import { ProductService } from '@/components/product/product.service';
import { UserService } from '@/components/user/user.service';
import { CategoryService } from '@/components/category/category.service';
import { ActivityService } from '@/components/activity/activity.service';
import { HeadOfficeService } from '@/components/headOffice/headOffice.service';
import { CreateUserDTO } from './dtos/createUser.dto';
import { CreateActivityDTO } from './dtos/createActivity.dto';
import { CreateProductDTO } from './dtos/createProduct.dto';
import { CreateHeadOfficeDTO } from './dtos/createHeadOffice.dto';
import { IdUserDTO } from './dtos/idUser.dto';
import { IdProductDTO } from './dtos/IdProduct.dto';
import { IdActivityDTO } from './dtos/idActivity.dto';
import { IdCategoryDTO } from './dtos/idCategory.dto';
import { IdHeadOfficeDTO } from './dtos/idHeadOffice.dto';
import { EditUserDTO } from './dtos/editUser.dto';
import { EditProductDTO } from './dtos/editProduct.dto';
import { DeleteUsersDTO } from './dtos/deleteUsers.dto';
import { DeleteProductsDTO } from './dtos/deleteProducts.dto';
import { DeleteHeadOfficesDTO } from './dtos/deleteHeadOffices.dto';

@Controller('admin')
@RequiresAuth(true)
export class AdminController {
    constructor(private productService: ProductService, private userService: UserService, private activityService: ActivityService, private categoryService: CategoryService, private headOfficeService: HeadOfficeService) { }
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

    @Put('edit/user/:id')
    async editUser(@Param() { id }: IdUserDTO, @Body() editUserDTO: EditUserDTO) {
        await this.userService.editUser(id, editUserDTO);
        return { message: 'User edited successfully.' }
    }

    @Put('edit/product/:id')
    async editProduct(@Param() { id }: IdProductDTO, @Body() editProductDTO: EditProductDTO) {
        await this.productService.editProduct(id, editProductDTO);
        return { message: 'Product edited successfully.' }
    }

    @Put('edit/activity/:id')
    async editActivity(@Param() { id }: IdActivityDTO, @Body() editActivityDTO: CreateActivityDTO) {
        await this.activityService.editActivity(id, editActivityDTO);
        return { message: 'Activity edited successfully.' }
    }

    @Put('edit/headoffice/:id')
    async editHeadOffice(@Param() { id }: IdHeadOfficeDTO, @Body() editHeadOfficeDTO: CreateHeadOfficeDTO) {
        await this.headOfficeService.editHeadOffice(id, editHeadOfficeDTO);
        return { message: 'Activity edited successfully.' }
    }

    @Put('book/activity/:id')
    async bookActivity(@Param() { id }: IdActivityDTO, @Body() idUserDTO: IdUserDTO) {
        await this.activityService.bookOne(id, idUserDTO.id)
        return { message: 'Activity booked successfully' }
    }

    @Put('unbook/activity/:id')
    async unbookActivity(@Param() { id }: IdActivityDTO, @Body() idUserDTO: IdUserDTO) {
        await this.activityService.unbookOne(id, idUserDTO.id)
        return { message: 'Activity unbooked successfully' }
    }
}