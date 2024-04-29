import { Injectable } from '@nestjs/common';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { AuditLog, AuditLogDocument } from './schemas/auditLog.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuditLogService {
  constructor(@InjectModel(AuditLog.name) private readonly auditLogModel: Model<AuditLogDocument>) {}
  async create(createAuditLogDto: CreateAuditLogDto) : Promise<AuditLog> {
    const createdAuditLog = new this.auditLogModel(createAuditLogDto);
    return await createdAuditLog.save();
  }

  async findAll(): Promise<AuditLog[]> {
    return await this.auditLogModel.find().exec();
  }
}
