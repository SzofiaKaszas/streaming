import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const album = await this.albumsService.findOne(+id);
    const length = await this.albumsService.getAlbumLength(+id);
    album['length'] = length;
    return album;
    /*return {
      ...album,
      length,
    }*/
  }

  // :albumid/addSong/:songid
  @Post(':albumid/addSong/:songid')
  addSongToAlbum(
    @Param('albumid') albumid: string,
    @Param('songid') songid: string,
  ) {
    return this.albumsService.addSongToAlbum(+albumid, +songid);
  }

  @Delete(':albumid/removeSong/:songid')
  removeSong(
    @Param('albumid') albumid: string,
    @Param('songid') songid: string,
  ) {
    return this.albumsService.removeSong(+albumid, +songid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumsService.remove(+id);
  }
}
