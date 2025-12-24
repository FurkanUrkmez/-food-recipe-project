import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Ingredient } from './ingredient.entity';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  instructions: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  prepTime: number;

  @ManyToOne(() => User, user => user.recipes)
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Category, category => category.recipes)
  category: Category;

  @Column()
  categoryId: number;

  @ManyToMany(() => Ingredient, ingredient => ingredient.recipes)
  @JoinTable({
    name: 'recipe_ingredients',
    joinColumn: { name: 'recipeId' },
    inverseJoinColumn: { name: 'ingredientId' }
  })
  ingredients: Ingredient[];
}