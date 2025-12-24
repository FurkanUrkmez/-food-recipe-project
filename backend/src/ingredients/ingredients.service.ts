import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../entities/ingredient.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  findAll() {
    return this.ingredientRepository.find();
  }

  findOne(id: number) {
    return this.ingredientRepository.findOne({ where: { id } });
  }

  create(name: string) {
    const ingredient = this.ingredientRepository.create({ name });
    return this.ingredientRepository.save(ingredient);
  }

  async update(id: number, name: string) {
    await this.ingredientRepository.update(id, { name });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.ingredientRepository.delete(id);
    return { message: 'Malzeme silindi' };
  }
}