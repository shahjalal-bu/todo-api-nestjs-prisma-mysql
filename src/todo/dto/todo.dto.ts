/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

/* eslint-disable prettier/prettier */
export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class UpdateTodoDto {
  @IsString()
  title?: string;
  @IsBoolean()
  completed?: boolean;
}
