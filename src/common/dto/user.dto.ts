import {
  IsEmail,
  IsNotEmpty,
  Length,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @IsNotEmpty({ message: 'first name is required' })
  @ApiProperty()
  first_name: string;

  @IsNotEmpty({ message: 'last name is required' })
  @ApiProperty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'username is required' })
  @ApiProperty()
  username: string;

  @IsNotEmpty({ message: 'phone number is required' })
  @Length(11)
  @ApiProperty()
  phone_number: string;

  @IsNotEmpty({ message: 'password is required' })
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty()
  password: string;
}

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty()
  password: string;
}
