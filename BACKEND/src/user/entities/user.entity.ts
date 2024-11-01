import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Channel } from 'src/channel/entities/channel.entity';

export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  BUSY = 'busy',
}

@Schema({   timestamps: true })
export class User extends Document {
  @Prop({ required: true }) /* we use prop if we want to pass multiple values */
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  // @Prop()
  // password: string;

  @Prop()
  profilePicture: string;

  @Prop()
  phoneNumber?: string;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.OFFLINE })
  status: UserStatus;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Channel' }] })
  channels: Channel[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  friends: User[];

  @Prop({ default: Date.now })
  lastSeen: Date;

  @Prop({ default: 0 })
  rewardPoints: number;

}

export const UserSchema = SchemaFactory.createForClass(User);
