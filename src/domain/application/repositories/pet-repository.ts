import { PaginationParams } from '@/core/repositories/pagination-params'
import { Pet } from '../../enterprise/entities/pet/pet'

export interface PetFilters {
  age?: 'pup' | 'adult'
  size?: 'small' | 'medium' | 'big'
  energyLevel?: 'low' | 'medium' | 'high'
  indecencyLevel?: 'low' | 'medium' | 'high'
  place?: 'small' | 'medium' | 'big'
}

export interface PetRepository {
  findById(id: string): Promise<Pet | null>
  findMany(filters: PetFilters, params: PaginationParams): Promise<Array<Pet>>
  create(pet: Pet): Promise<void>
  delete(pet: Pet): Promise<void>
  save(pet: Pet): Promise<void>
}
