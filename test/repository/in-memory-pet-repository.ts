import { PetAttachmentRepository } from '@/domain/application/repositories/pet-attachments-repository'
import { PetRepository } from '@/domain/application/repositories/pet-repository'
import { Pet } from '@/domain/enterprise/entities/pet/pet'

export class InMemoryPetRepository implements PetRepository {
  public items: Array<Pet> = []

  constructor(private petAttachmentRepository: PetAttachmentRepository) {}

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id.value === id)
    if (!pet) return null
    return pet
  }

  async create(pet: Pet) {
    this.items.push(pet)
  }

  async delete(pet: Pet) {
    const itemIndex = this.items.findIndex((item) => item.id === pet.id)
    await this.petAttachmentRepository.deleteManyByPetId(pet.id.value)
    this.items.splice(itemIndex, 1)
  }

  async save(pet: Pet) {
    const itemIndex = this.items.findIndex((item) => item.id === pet.id)
    this.items[itemIndex] = pet
  }
}
