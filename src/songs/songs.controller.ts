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
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  // /songs?start=12&top=10
  @Get()
  findAll(
    @Query('start') start: string = '0',
    @Query('top') top: string = '10',
  ) {
    return this.songsService.findAll(+start, +top);
  }

  @Get('search')
  search(@Query('title') title: string) {
    return this.songsService.search(title);
  }

  @Get('longest')
  getLongest(@Query('top') top: string = '3') {
    return this.songsService.getLongest(+top);
  }

  @Get('popular')
  getMostPopular() {
    return this.songsService.getMostPopular();
  }

  @Get('recent')
  getMostRecent() {
    return this.songsService.getMostRecent();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songsService.update(+id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(+id);
  }
  
}
