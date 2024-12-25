import { Injectable } from '@nestjs/common';
import { DetailedSchedulesDto } from './detailed-schedules.dto';
import { PopulatedScheduleDto } from './populated-schedule.dto';
import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';
import { RoomTag } from 'src/rooms/room-tag.enum';
dayjs?.extend(duration);

@Injectable()
export class SchedulesTransformer {
  constructor() {}

  async buildDetailedScheduleDto(
    userId: string,
    date: Date,
    schedules: PopulatedScheduleDto[],
  ): Promise<DetailedSchedulesDto> {
    const totalScheduled = schedules.reduce(
      (a, b) => a + b.totalScheduled.asMilliseconds(),
      0,
    );
    let totalTaskCount = 0;
    let counts: DetailedSchedulesDto['counts'] = Object.values(RoomTag).reduce(
      (obj, tag) => {
        const selectedSchedules = schedules.filter((s) => s.tag === tag);
        const taskCount = selectedSchedules.reduce(
          (a, b) => a + b.taskList.length,
          0,
        );
        totalTaskCount += taskCount;
        return { ...obj, [tag]: taskCount };
      },
      {} as DetailedSchedulesDto['counts'],
    );
    counts = { ...counts, total: totalTaskCount };

    console.log({
      counts,
      date,
      schedules,
      totalScheduled,
      userId,
    });
    return {
      counts,
      date,
      schedules,
      totalScheduled,
      userId,
    };
  }
}
