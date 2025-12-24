import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from '../entities/recipe.entity';
import { Ingredient } from '../entities/ingredient.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  findAll() {
    return this.recipeRepository.find({
      relations: ['user', 'category', 'ingredients'],
    });
  }

  findOne(id: number) {
    return this.recipeRepository.findOne({
      where: { id },
      relations: ['user', 'category', 'ingredients'],
    });
  }

  findByUser(userId: number) {
    return this.recipeRepository.find({
      where: { userId },
      relations: ['category', 'ingredients'],
    });
  }

  async create(userId: number, data: any) {
    const ingredients = await this.ingredientRepository.findByIds(data.ingredientIds || []);
    
    const recipe = this.recipeRepository.create({
      title: data.title,
      instructions: data.instructions,
      imageUrl: data.imageUrl,
      prepTime: data.prepTime,
      userId: userId,
      categoryId: data.categoryId,
      ingredients: ingredients,
    });

    return this.recipeRepository.save(recipe);
  }

  async update(id: number, userId: number, userRole: string, data: any) {
    const recipe = await this.recipeRepository.findOne({ where: { id } });
    
    if (!recipe) {
      throw new Error('Tarif bulunamadı');
    }

    if (recipe.userId !== userId && userRole !== 'admin') {
      throw new Error('Bu tarifi düzenleyemezsiniz');
    }

    if (data.ingredientIds) {
      const ingredients = await this.ingredientRepository.findByIds(data.ingredientIds);
      recipe.ingredients = ingredients;
    }

    recipe.title = data.title || recipe.title;
    recipe.instructions = data.instructions || recipe.instructions;
    recipe.imageUrl = data.imageUrl || recipe.imageUrl;
    recipe.prepTime = data.prepTime || recipe.prepTime;
    recipe.categoryId = data.categoryId || recipe.categoryId;

    return this.recipeRepository.save(recipe);
  }

  async remove(id: number, userId: number, userRole: string) {
    const recipe = await this.recipeRepository.findOne({ where: { id } });
    
    if (!recipe) {
      throw new Error('Tarif bulunamadı');
    }

    if (recipe.userId !== userId && userRole !== 'admin') {
      throw new Error('Bu tarifi silemezsiniz');
    }

    await this.recipeRepository.delete(id);
    return { message: 'Tarif silindi' };
  }
}