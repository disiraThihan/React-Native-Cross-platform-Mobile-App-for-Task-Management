import { Duration } from 'dayjs/plugin/duration';
import { PopulatedScheduleDto } from './populated-schedule.dto';
import { RoomTag } from 'src/rooms/room-tag.enum';

export class DetailedSchedulesDto {
  userId: string;
  date: Date;
  totalScheduled: number;
  counts: {
    total: number;
  } & { [tag in RoomTag]: number };
  schedules: PopulatedScheduleDto[];
}
