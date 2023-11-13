import { AggregateRoot } from '@/core/entities/aggregate-root'

export interface PetProps {
  name: string
  bio: string
  age: 'a'
  size: 'small' | 'medium' | 'big'
  energyLevel: 'low' | 'medium' | 'high'
  indecencyLevel: 'low' | 'medium' | 'high'
  place: 'small' | 'medium' | 'big'
}

export class Pet extends AggregateRoot<PetProps> {}
