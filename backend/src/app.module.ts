import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { RecipesModule } from './recipes/recipes.module';
import { User } from './entities/user.entity';
import { Recipe } from './entities/recipe.entity';
import { Category } from './entities/category.entity';
import { Ingredient } from './entities/ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Recipe, Category, Ingredient],
      synchronize: true,
    }),
    AuthModule,
    CategoriesModule,
    IngredientsModule,
    RecipesModule,
  ],
})
export class AppModule {}