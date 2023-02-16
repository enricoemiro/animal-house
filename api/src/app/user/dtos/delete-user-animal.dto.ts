import { PickType } from '@nestjs/mapped-types';

import { AnimalDTO } from '@/app/animal/animal.dto';

export class DeleteUserAnimalDTO extends PickType(AnimalDTO, ['id'] as const) {}
