import { PickType } from '@nestjs/swagger';
import { UserDTO } from 'src/modules/users/dto/user.dto';

export class AuthPostReqDTO extends PickType(UserDTO, ['social', 'uuid', 'nickname', 'country', 'language']) {}
