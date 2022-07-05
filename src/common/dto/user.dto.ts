import {
  IsEmail,
  IsNotEmpty,
  Length,
  MinLength,
  MaxLength,
} from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Length(11)
  phone_number: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
