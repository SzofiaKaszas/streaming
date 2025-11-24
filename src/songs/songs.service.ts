import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SongsService {
  constructor(private readonly sonsg_db: PrismaService) {}

  create(createSongDto: CreateSongDto) {
    return this.sonsg_db.song.create({
      data: createSongDto,
    });
  }

  findAll(start: number, count: number) {
    return this.sonsg_db.song.findMany({
      skip: start,
      take: count,
    });
  }

  search(title: string) {
    return this.sonsg_db.song.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });
  }

  findOne(id: number) {
    return this.sonsg_db.song.findUnique({
      where: { id },
    });
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return this.sonsg_db.song.update({
      where: { id },
      data: updateSongDto,
    });
  }

  remove(id: number) {
    return this.sonsg_db.song.delete({
      where: { id },
    });
  }
}
