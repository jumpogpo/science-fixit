import { ApiProperty } from '@nestjs/swagger';

export class LoginSuccessResponseDto {
  @ApiProperty({ example: 'Login successful' })
  message: string;
}

export class UnauthorizedResponseDto {
  @ApiProperty({ example: 'Unauthorized' })
  message: string;

  @ApiProperty({ example: 401 })
  statusCode: number;
}
