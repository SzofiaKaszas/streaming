import { IsNotEmpty, IsString } from "class-validator";

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  title : string
}
