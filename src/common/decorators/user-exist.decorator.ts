import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from 'src/modules/users/users.service';
import { rm } from '../constants';

@ValidatorConstraint({ name: 'UserExist', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(userId: number) {
    try {
      await this.usersService.getUserById(userId);
    } catch (error) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return rm.NO_USER;
  }
}

export const UserExist = (validationOptions?: ValidationOptions) => {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserExistsRule,
    });
  };
};
