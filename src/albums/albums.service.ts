import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly db: PrismaService) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.db.album.create({
      data: {
        title: createAlbumDto.title,
      },
    });
  }

  findAll() {
    return this.db.album.findMany();
  }

  findOne(id: number) {
    return this.db.album.findUniqueOrThrow({
      where: { id },
      include: {
        songs: {
          //select: { id: true, title: true, length: true, genre: true },
          omit: {
            albumId: true,
          },
        },
      },
    });
  }

  async getAlbumLength(id: number): Promise<number | null> {
    return (
      await this.db.song.aggregate({
        _sum: {
          length: true,
        },
        where: {
          albumId: id,
        },
      })
    )._sum.length;
  }

  addSongToAlbum(albumid: number, songid: number) {
    return this.db.album.update({
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
    return this.db.album.update({
      where: { id },
      data: {
        title: updateAlbumDto.title,
      },
    });
  }

  remove(id: number) {
    return this.db.album.delete({
      where: { id },
    });
  }

  removeSong(albumid: number, songid : number){
    return this.db.album.update({
      where : {id:albumid},
      data:{
        songs:{
          disconnect:{id:songid},
        },
      },
    });
  }
}
