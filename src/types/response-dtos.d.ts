interface BaseSuccessResponseDto {
  status: 1;
}

interface CreateUserResponseDto extends BaseSuccessResponseDto {
  token: string;
}

interface CreateSessionResponseDto extends BaseSuccessResponseDto {
  token: string;
}
