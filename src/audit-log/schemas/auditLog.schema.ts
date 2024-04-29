import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type AuditLogDocument = HydratedDocument<AuditLog>;
@Schema()
export class AuditLog {
  @Prop({ required: true, default: Date.now })
  timestamp: Date;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  endpoint: string;

  @Prop()
  method: string;

  @Prop()
  ipAddress: string;

  @Prop()
  responseStatusCode: number;

  @Prop()
  code: string;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
