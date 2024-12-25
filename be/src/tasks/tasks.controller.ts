import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PageRequest } from 'src/common/dtos/page-request.dto';
import { CreateTaskDto } from './create-task.dto';
import { UserRole } from 'src/common/enums/user-roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidateObjectIdPipe } from 'src/common/pipes/validate-object-id.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('search')
  async searchTasks(@Body() pageRequest: PageRequest) {
    const page = await this.tasksService.searchTasks(pageRequest);
    console.log(page);
    return page;
  }

  @Get(':id')
  async getTask(@Param('id', ValidateObjectIdPipe) id: string) {
    return await this.tasksService.getDetailedTask(id);
  }

  @Put('unassign')
  @Roles(...Object.values(UserRole))
  async unassignUserFromTask(
    @Query('user-id', ValidateObjectIdPipe) userId: string,
    @Query('task-id', ValidateObjectIdPipe) taskId: string,
  ) {
    await this.tasksService.unassignUserFromTask(userId, taskId);
  }

  @Put('assign')
  @Roles(...Object.values(UserRole))
  async assignUserToTask(
    @Query('user-id', ValidateObjectIdPipe) userId: string,
    @Query('task-id', ValidateObjectIdPipe) taskId: string,
  ) {
    await this.tasksService.assignUserToTask(userId, taskId);
  }

  @Put(':id')
  @Roles(...Object.values(UserRole))
  async editTask(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() editTaskDto: CreateTaskDto,
  ) {
    return await this.tasksService.editTask(id, editTaskDto);
  }

  @Delete(':id')
  @Roles(...Object.values(UserRole))
  async deleteTask(@Param('id', ValidateObjectIdPipe) id: string) {
    await this.tasksService.deleteTask(id);
  }

  @Post()
  @Roles(...Object.values(UserRole))
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.createTask(createTaskDto);
  }
}
