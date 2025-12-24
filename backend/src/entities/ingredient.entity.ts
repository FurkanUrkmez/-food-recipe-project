import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Recipe, recipe => recipe.ingredients)
  recipes: Recipe[];
}