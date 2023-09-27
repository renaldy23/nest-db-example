import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entity/todos.entity';
import { Repository } from 'typeorm';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  async getAllTodos(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }
  async findTodoById(id: any): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (todo) {
      return todo;
    }

    throw new HttpException(
      {
        message: 'Todo not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
  async createTodo(todo: CreateTodoDTO): Promise<TodoEntity> {
    return await this.todoRepository.save(todo);
  }
}
