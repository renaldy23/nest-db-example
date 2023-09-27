import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateTodoDTO {
  @IsNotEmpty({ message: 'Please enter title' })
  title: string;
  @IsNotEmpty({ message: 'Content value cannot be empty!' })
  content: string;
  @IsNotEmpty({ message: 'Deadline field cannot be empty' })
  @IsDateString()
  deadline_date: Date;
}
