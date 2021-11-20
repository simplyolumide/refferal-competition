export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  referrer?: string;
}

export default CreateUserDto;
