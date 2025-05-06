import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() task: any) {
    return this.tasksService.create(task)
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.tasksService.findAll(userId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updates: any) {
    return this.tasksService.update(id, updates)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.delete(id)
  }
}
