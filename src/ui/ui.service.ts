import { Injectable } from '@nestjs/common';
import { CreateUiInput } from './dto/create-ui.input';
import { UpdateUiInput } from './dto/update-ui.input';

@Injectable()
export class UiService {
  create(createUiInput: CreateUiInput) {
    return 'This action adds a new ui';
  }

  findAll() {
    return `This action returns all ui`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ui`;
  }

  update(id: number, updateUiInput: UpdateUiInput) {
    return `This action updates a #${id} ui`;
  }

  remove(id: number) {
    return `This action removes a #${id} ui`;
  }
}
