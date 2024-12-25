import { Task } from './tasks.schema';

export class DetailedTaskDto extends Task {
  _id: string;
  roomName: string;
  roomTag: string;
}
