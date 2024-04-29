import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateAuditLogDto {

        @IsDate()
        @IsNotEmpty()
        timestamp: Date;

        @IsNotEmpty()
        @IsString()
        userId: string;

        @IsNotEmpty()
        @IsString()
        action: string;

        @IsNotEmpty()
        @IsString()
        endpoint: string;

        @IsNotEmpty()
        @IsString()
        method: string;

        @IsNotEmpty()
        @IsString()
        ipAddress: string;

        @IsNotEmpty()
        responseStatusCode:number;



}
