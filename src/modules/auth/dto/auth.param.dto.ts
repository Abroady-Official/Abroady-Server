import { PickType } from '@nestjs/swagger';
import { UserDTO } from 'src/modules/users/dto/user.dto';

export class AuthParamDTO extends PickType(UserDTO, ['social']) {}
