import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuditLogService } from '../audit-log.service';
import { NextFunction } from 'express';
import { CreateAuditLogDto } from '../dto/create-audit-log.dto';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(private readonly auditService: AuditLogService) {}
  use(req: any, res: any, next: NextFunction) {
    const userId = req.user ? req.user.id : 'Anonymous';
    const { method, originalUrl, ip } = req;

    // Capture the response status code
    res.on('finish', () => {
      const responseStatusCode = res.statusCode;

      const createAuditLogDto: CreateAuditLogDto = {
        timestamp: new Date(),
        userId: userId,
        action: `${method} ${originalUrl}`,
        endpoint: originalUrl,
        method: method,
        ipAddress: ip,
        responseStatusCode: responseStatusCode,
      };


      this.auditService.create(createAuditLogDto);
    });
    next();
  }
}
