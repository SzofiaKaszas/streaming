import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly albums_db: PrismaService) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.albums_db.album.create({
      data: {
        title: createAlbumDto.title,
      },
    });
  }

  findAll() {
    return this.albums_db.album.findMany();
  }

  findOne(id: number) {
    return this.albums_db.album.findUnique({
      where: { id },
    });
  }

  addSongToAlbum(albumid: number, songid: number) {
    return this.albums_db.album.update({
      where: { id: albumid },
      data: {
        songs: {
          connect: { id: songid },
        },
      },
      include: { songs: true },
    });
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return this.albums_db.album.update({
      where: { id },
      data: {
        title: updateAlbumDto.title,
      },
    });
  }

  remove(id: number) {
    return this.albums_db.album.delete({
      where: { id },
    });
  }
}
