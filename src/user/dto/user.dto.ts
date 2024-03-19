import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsBoolean, IsDateString, IsString, MaxLength } from "class-validator";

export class UserDto {
    
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(50) 
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(50) 
    last_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(50) 
    user_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(100) 
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(20) 
    phone: string;

    
    restore: boolean;

   
    active: boolean;

   
    created_at: Date;

    
    updated_at: Date;

    
    deleted_at: Date;
}
