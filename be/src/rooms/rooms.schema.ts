import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FlattenMaps, HydratedDocument, Model } from 'mongoose';
import { Audit } from 'src/common/schema/audit.schema';
import { RoomTag } from './room-tag.enum';

export type FlatRoom = FlattenMaps<Room & { _id: string }>;
export type RoomModel = Model<Room>;
export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room extends Audit {
  @Prop({ type: String, isRequired: true })
  name: string;

  @Prop({ type: String, isRequired: true })
  description: string;

  @Prop({ type: String, isRequired: true })
  organization: string;

  @Prop({ isRequired: true, type: String, enum: Object.values(RoomTag) })
  tag: RoomTag;

  @Prop({ type: [String] })
  adminIds: string[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
