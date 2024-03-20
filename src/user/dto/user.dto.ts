import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsBoolean, IsDateString, IsPhoneNumber,Matches } from 'class-validator';

export class UserDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' }) 
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @MaxLength(50, { message: 'El apellido no puede tener más de 50 caracteres' }) 
    last_name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
    @MaxLength(50, { message: 'El nombre de usuario no puede tener más de 50 caracteres' }) 
    user_name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @MaxLength(100, { message: 'La contraseña no puede tener más de 100 caracteres' }) 
    password: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
    @Matches(/^[0-9]{9,11}$/, { message: 'El número de teléfono no es válido' })
    phone: string;

   
}

