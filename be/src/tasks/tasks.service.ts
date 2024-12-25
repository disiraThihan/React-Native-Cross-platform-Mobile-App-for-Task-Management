import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { PageRequest } from 'src/common/dtos/page-request.dto';
import { Task, TaskModel } from './tasks.schema';
import ErrorMessage from 'src/common/enums/error-message.enum';
import { CreateTaskDto } from './create-task.dto';
import { SchedulesService } from 'src/schedules/schedules.service';
import dayjs, { duration } from 'dayjs';
import { UsersService } from 'src/users/users.service';
import { MongooseUtil } from 'src/common/util/mongoose.util';
import { RoomsService } from 'src/rooms/rooms.service';
import { DetailedTaskDto } from './detailed-task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @Inject(REQUEST) private readonly req: Request,
    @Inject(forwardRef(() => SchedulesService))
    private readonly schedulesService: SchedulesService,
    private readonly usersService: UsersService,
    private readonly roomsService: RoomsService,
    @InjectModel(Task.name) private readonly taskModel: TaskModel,
  ) {
    dayjs.extend(duration);
  }

  async getTask(id: string) {
    const existingTask = await this.taskModel.findById(id);
    if (existingTask == null) {
      throw new BadRequestException(
        ErrorMessage.TASK_NOT_FOUND,
        `Task with id '${id}' was not found`,
      );
    }
    return existingTask;
  }

  async getDetailedTask(id: string) {
    const existingTask = await this.getTask(id);
    const existingRoom = await this.roomsService.getRoom(existingTask.roomId);
    const detailedTask: DetailedTaskDto = {
      _id: existingTask.id,
      roomName: existingRoom.name,
      roomTag: existingRoom.tag,
      name: existingTask.name,
      duration: existingTask.duration,
      date: existingTask.date,
      priority: existingTask.priority,
      roomId: existingRoom.id,
      assignedUserIds: existingTask.assignedUserIds,
      createdBy: existingTask.createdBy,
      createdAt: existingTask.createdAt,
    };
    return detailedTask;
  }

  async editTask(id: string, editTaskDto: CreateTaskDto) {
    let { date, description, duration, name, priority, assignedUserIds } =
      editTaskDto;
    name = name?.trim();
    description = description?.trim();

    const existingTask = await this.getTask(id);
    const tasksWithSimilarNames = await this.taskModel.find({
      roomId: existingTask.roomId,
      name: { $regex: RegExp(`^${name}`) },
    });
    if (tasksWithSimilarNames.length > 0) {
      name = `${name} #${tasksWithSimilarNames.length}`;
    }

    const allAffectedUserIds = new Set<string>();
    assignedUserIds.forEach((userId) => {
      allAffectedUserIds.add(userId);
    });
    existingTask.assignedUserIds.forEach((userId) => {
      allAffectedUserIds.add(userId);
    });

    existingTask.date = date ?? existingTask.date;
    existingTask.description = description;
    existingTask.duration = duration ?? existingTask.duration;
    existingTask.name = name ?? existingTask.name;
    existingTask.priority = priority ?? existingTask.priority;
    existingTask.assignedUserIds =
      assignedUserIds ?? existingTask.assignedUserIds;
    const savedTask = await existingTask.save();

    await this.schedulesService.updateRoomSchedulesOfUsers(
      existingTask.roomId,
      [...allAffectedUserIds],
    );
    return savedTask;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    let {
      date,
      description,
      duration,
      name,
      priority,
      roomId,
      assignedUserIds = [],
    } = createTaskDto;
    name = name?.trim();
    description = description?.trim();

    const tasksWithSimilarNames = await this.taskModel.find({
      roomId,
      name: { $regex: RegExp(`^${name}`) },
    });
    if (tasksWithSimilarNames.length > 0) {
      name = `${name} #${tasksWithSimilarNames.length}`;
    }

    const savedTask = await this.taskModel.create({
      date,
      description,
      duration,
      name,
      priority,
      roomId,
      assignedUserIds,
      createdAt: new Date(),
      createdBy: (this.req as any)?.user?.id,
    });

    await this.schedulesService.updateRoomSchedulesOfUsers(
      roomId,
      assignedUserIds,
    );
    return savedTask;
  }

  async deleteTask(id: string) {
    const existingTask = await this.taskModel.findByIdAndDelete(id);
    if (existingTask == null) {
      throw new BadRequestException(
        ErrorMessage.TASK_NOT_FOUND,
        `Task with id '${id}' was not found`,
      );
    }
    await this.schedulesService.updateRoomSchedulesOfUsers(
      existingTask.roomId,
      existingTask.assignedUserIds,
    );
  }

  async searchTasks(pageRequest: PageRequest) {
    return await MongooseUtil.getDocumentPage(this.taskModel, pageRequest);
  }

  async getAllTasksByCreatedBy(userId: string) {
    return await this.taskModel.find({ createdBy: { $in: [userId] } });
  }

  async getAllTasksByIds(taskIds: string[]) {
    return await this.taskModel.find({ _id: { $in: taskIds } });
  }

  async getAllTasksByUserIds(userIds: string[]) {
    return await this.taskModel.find({ assignedUserIds: { $in: userIds } });
  }

  async deleteAllTasksFromRoom(roomId: string) {
    await this.taskModel.deleteMany({ roomId });
  }

  async assignUserToTask(userId: string, taskId: string) {
    await this.usersService.getUser(userId);
    const existingTask = await this.getTask(taskId);

    const distinctUserIds = new Set([...existingTask.assignedUserIds, userId]);
    existingTask.assignedUserIds = [...distinctUserIds];

    await Promise.all([
      existingTask.save(),
      this.schedulesService.updateRoomSchedulesOfUsers(
        existingTask.roomId,
        existingTask.assignedUserIds,
      ),
    ]);
  }

  async unassignUserFromTask(userId: string, taskId: string) {
    await this.usersService.getUser(userId);
    const existingTask = await this.getTask(taskId);
    existingTask.assignedUserIds = existingTask.assignedUserIds.filter(
      (id) => id !== userId,
    );
    const distinctUserIds = new Set(existingTask.assignedUserIds);
    existingTask.assignedUserIds = [...distinctUserIds];

    await Promise.all([
      existingTask.save(),
      this.schedulesService.updateRoomSchedulesOfUsers(existingTask.roomId, [
        userId,
      ]),
    ]);
  }
}
