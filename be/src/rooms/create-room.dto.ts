import { IsArray, IsIn, IsNotEmpty, IsOptional, IsString, isNotEmpty } from 'class-validator';
import { RoomTag } from './room-tag.enum';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  organization: string;

  @IsString()
  @IsIn(Object.values(RoomTag))
  tag: RoomTag;
}
