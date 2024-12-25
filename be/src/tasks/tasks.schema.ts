import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FlattenMaps, HydratedDocument, Model } from 'mongoose';
import { Audit } from 'src/common/schema/audit.schema';
import { TaskPriority } from './task-priority.enum';

export type FlatTask = FlattenMaps<Task & { _id: string }>;
export type TaskModel = Model<Task>;
export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task extends Audit {
  @Prop({ isRequired: true, unique: true })
  name: string;

  @Prop()
  description?: string;

  /** Duration is stored in milliseconds */
  @Prop({ type: Number, isRequired: Object })
  duration: number;

  @Prop({ isRequired: true })
  date: Date;

  @Prop({ isRequired: true, type: String, enum: Object.values(TaskPriority) })
  priority: TaskPriority;

  @Prop({ isRequired: true })
  roomId: string;

  @Prop({
    type: [String],
    default: [],
    isRequired: true,
  })
  assignedUserIds: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
