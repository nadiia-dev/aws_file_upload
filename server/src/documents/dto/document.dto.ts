import { IsEmail, IsString, IsUrl } from 'class-validator';

export class CreateDocumentDto {
  @IsEmail()
  userEmail: string;

  @IsString()
  filename: string;

  @IsUrl()
  s3Url: string;
}
