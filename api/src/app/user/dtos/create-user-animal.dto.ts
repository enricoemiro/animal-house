import { PickType } from '@nestjs/mapped-types';

import { AnimalDTO } from '@/app/animal/animal.dto';

export class CreateUserAnimalDTO extends PickType(AnimalDTO, ['name'] as const) {}
