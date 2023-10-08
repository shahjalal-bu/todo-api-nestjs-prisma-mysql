import { TodoService } from './todo.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TodoEntity } from './entities/todo.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TodoEntity })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoEntity, isArray: true })
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoEntity })
  findOne(@Param('id') id: string) {
    const todo = this.todoService.findOne(+id);
    if (!todo) {
      throw new NotFoundException(`Todo with ${id} does not exist.`);
    }
    return todo;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TodoEntity })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoEntity })
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
