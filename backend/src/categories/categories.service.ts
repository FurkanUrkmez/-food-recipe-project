import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({ where: { id } });
  }

  create(name: string) {
    const category = this.categoryRepository.create({ name });
    return this.categoryRepository.save(category);
  }

  async update(id: number, name: string) {
    await this.categoryRepository.update(id, { name });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.categoryRepository.delete(id);
    return { message: 'Kategori silindi' };
  }
}