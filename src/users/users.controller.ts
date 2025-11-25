import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post(':userid/favorites/:songid')
  addToFavorites(
    @Param('userid') userid: string,
    @Param('songid') songid: string,
  ) {
    return this.usersService.addToFavorites(+userid, +songid);
  }

  @Delete(':userid/favorites/:songid')
  deleteFromFavorites(
    @Param('userid') userid: string,
    @Param('songid') songid: string,
  ) {
    return this.usersService.deleteFromFavorites(+userid, +songid);
  }

  @Get()
  findAll(@Query('domain') domain: string = '') {
    if (domain) {
      return this.usersService.findByDomain(domain);
    } else {
      return this.usersService.findAll();
    }
  }

  @Get(':userid/favorites')
  getFavorites(
    @Param('userid') userid: string,
    @Query('page') page: string = '1',
  ) {
    return this.usersService.getFavourites(+userid, +page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
