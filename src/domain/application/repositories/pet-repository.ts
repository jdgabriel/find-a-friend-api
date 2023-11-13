import { Pet } from '../../enterprise/entities/pet/pet'

export interface PetRepository {
  findById(id: string): Promise<Pet | null>
  findBySlug(slug: string): Promise<Pet | null>
  create(pet: Pet): Promise<void>
  delete(pet: Pet): Promise<void>
  save(pet: Pet): Promise<void>
}
