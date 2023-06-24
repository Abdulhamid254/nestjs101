import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  ParseIntPipe,
  ParseBoolPipe,
  Req,
  Res,
  Query,
  ValidationPipe,
  UsePipes,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
// @UseGuards(AuthGuard) // if we want the guard to work for all the request in this controller we place it here the when we want it to for a single endpoint we place it just below the endpoint decorator
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers() {
    return this.userService.fetchUsers();
  }

  //   @Get()
  //   // getting users using query parameters: mostly for filtering
  //   getUsers(@Query('sortBy') sortBy: string) {
  //     console.log(sortBy);
  //     return [{ username: 'Anson', email: 'abdul@gmail.com' }];
  //   }
  // validation for boolean operations
  //   @Get()
  //   // getting users using query parameters: mostly for filtering
  //   getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
  //     console.log(sortDesc);
  //     return [{ username: 'Anson', email: 'abdul@gmail.com' }];
  //   }

  //   getUsers() {
  //     return [{ username: 'Anson', email: 'abdul@gmail.com' }];
  //   }

  //   @Get('posts')
  //   getUsersPosts() {
  //     return [
  //       {
  //         username: 'Anson',
  //         email: 'abdul@gmail.com',
  //         posts: [
  //           {
  //             id: 1,
  //             title: 'Post 1',
  //           },
  //           {
  //             id: 2,
  //             title: 'Post 2',
  //           },
  //         ],
  //       },
  //     ];
  //   }

  //   @Get('posts/comments')
  //   getUersPostComments() {
  //     return [
  //       {
  //         id: 1,
  //         title: 'Post 1',
  //         COMMENTS: [],
  //       },
  //     ];
  //   }

  // here we ar doing it the express way
  //   @Post('create')
  //   createUser(@Req() request: Request, @Res() response: Response) {
  //     console.log(request.body);
  //     response.send('Created');
  //   }

  // new way of doing things using nestjs
  //   @Post('create')
  //   @UsePipes(new ValidationPipe())
  //   createUser(@Body() userData: CreateUserDto) {
  //     console.log(userData);
  //     return {};
  //   }
  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    // isNaN here converts a  string to number
    // typeof operator takes both stringa and number
    // console.log(typeof userData.age);
    // to Precision() brings about exactness with regard to dto
    console.log(userData.age.toPrecision());

    // console.log(isNaN(userData.age));
    return this.userService.createUser(userData);
  }

  // parse int pipe here is responsible for making sure that our id is in number format
  //   @Get(':id')
  //   getUserById(@Param('id', ParseIntPipe) id: number) {
  //     // console.log(id);
  //     return this.userService.fetchUserById(id);
  //   }

  // a case where we have no user handling it and giving an error and we have handled exceptions
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.fetchUserById(id);
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return user;
  }
  // nested ifd parameters
  //   @Get(':id/:postId')
  //   getUserById(@Param('id') id: string, @Param('postId') postId: string) {
  //     console.log(id);
  //     return { id, postId };
  //   }
}
