import { Genre } from "generated/prisma/enums";

export class CreateSongDto {
  title: string;
  length: number; // length in seconds
  genre : Genre;
  albumId: number;
}
