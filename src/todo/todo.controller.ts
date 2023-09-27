import { Controller, Get, Post, Put, Delete, Body, Param, Res } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  async getTodos() {
    return await this.todoService.getAllTodos();
  }
  @Post()
  async createTodo(@Body() payload: CreateTodoDTO) {
    try {
      return await this.todoService.createTodo(payload);
    } catch (error) {
      return error.message;
    }
  }
  @Get(':id')
  async getDetailTodo(@Param('id') id: number) {
    return await this.todoService.findTodoById(id);
  }
}
