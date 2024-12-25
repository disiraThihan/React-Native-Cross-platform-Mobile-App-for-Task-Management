import { TaskPriority } from './task-priority.enum';
import {
  IsArray,
  IsDateString,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @IsIn(Object.values(TaskPriority))
  priority: TaskPriority;

  @IsMongoId()
  @IsNotEmpty()
  roomId: string;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  assignedUserIds: string[];
}
