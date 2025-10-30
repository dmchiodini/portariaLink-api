import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, isString, MinLength } from 'class-validator';
import { UserRoleEnum } from 'src/common/enums/user-role.enum';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'E-mail do usuário' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Tipo de usuário' })
  @IsEnum(UserRoleEnum)
  role?: UserRoleEnum;
}
