import { PaginationParams } from '@/core/repositories/pagination-params'
import { PetAttachmentRepository } from '@/domain/application/repositories/pet-attachments-repository'
import {
  PetFilters,
  PetRepository,
} from '@/domain/application/repositories/pet-repository'
import { Pet } from '@/domain/enterprise/entities/pet/pet'

export class InMemoryPetRepository implements PetRepository {
  public items: Array<Pet> = []

  constructor(private petAttachmentRepository: PetAttachmentRepository) {}

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id.value === id)
    if (!pet) return null
    return pet
  }

  async findMany(filters: PetFilters, { page }: PaginationParams) {
    let pets: Array<Pet> = this.items

    const filterKeys = Object.keys(filters) as (keyof typeof filters)[]
    filterKeys.forEach((filterOption) => {
      if (filters[filterOption] !== undefined) {
        pets = pets.filter(
          (item) => item[filterOption] === filters[filterOption],
        )
      }
    })

    return pets.slice((page - 1) * 20, page * 20)
  }

  async create(pet: Pet) {
    this.items.push(pet)
  }

  async save(pet: Pet) {
    const itemIndex = this.items.findIndex((item) => item.id === pet.id)
    this.items[itemIndex] = pet
  }

  async delete(pet: Pet) {
    const itemIndex = this.items.findIndex((item) => item.id === pet.id)
    await this.petAttachmentRepository.deleteManyByPetId(pet.id.value)
    this.items.splice(itemIndex, 1)
  }
}
