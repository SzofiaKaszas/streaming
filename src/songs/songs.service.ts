import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SongsService {
  constructor(private readonly db: PrismaService) {}

  create(createSongDto: CreateSongDto) {
    return this.db.song.create({
      data: createSongDto,
    });
  }

  findAll(start: number, top: number) {
    return this.db.song.findMany({
      skip: start,
      take: top,
      include: { album: true },
    });
  }

  search(title: string) {
    return this.db.song.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });
  }

  findOne(id: number) {
    return this.db.song.findUnique({
      where: { id },
      include: { album: true },
    });
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return this.db.song.update({
      where: { id },
      data: updateSongDto,
    });
  }

  remove(id: number) {
    return this.db.song.delete({
      where: { id },
    });
  }

  getLongest(top: number) {
    return this.db.song.findMany({
      take: top,
      orderBy: {
        length: 'desc',
      },
    });
  }

  async getMostPopular() {
    return await this.db.song.findMany({
      orderBy:{
        favoritedBy: {
          _count: 'desc'
        }
      },
      take: 10,
      include: {favoritedBy: true}
    });
  }

  async getMostRecent() {
    return await this.db.song.findMany({
      orderBy:{
        createdAt: 'desc'
      },
      take: 10,
    });
  }
}
