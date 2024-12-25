import { Module, forwardRef } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { SchedulesTransformer } from './schedules.transformer';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from './schedules.schema';
import { TasksModule } from 'src/tasks/tasks.module';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  imports: [
    forwardRef(() => TasksModule),
    forwardRef(() => RoomsModule),
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
  ],
  providers: [SchedulesService, SchedulesTransformer],
  controllers: [SchedulesController],
  exports: [SchedulesService, MongooseModule],
})
export class SchedulesModule {}
