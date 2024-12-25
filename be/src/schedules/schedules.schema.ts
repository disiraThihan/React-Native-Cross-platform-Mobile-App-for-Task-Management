import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FlattenMaps, HydratedDocument, Model } from 'mongoose';
import { Audit } from 'src/common/schema/audit.schema';

export type FlatSchedule = FlattenMaps<Schedule & { _id: string }>;
export type ScheduleModel = Model<Schedule>;
export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule extends Audit {
  @Prop({ isRequired: true })
  roomId: string;

  @Prop({ isRequired: true })
  userId: string;

  @Prop({ isRequired: true })
  date: Date;

  @Prop({ type: [Object], default: [], isRequired: true })
  taskList: {
    taskId: string;
    startTime: Date;
    endTime: Date;
  }[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
