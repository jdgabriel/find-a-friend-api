import { PetAttachmentRepository } from '@/domain/application/repositories/pet-attachments-repository'
import { PetAttachment } from '@/domain/enterprise/entities/pet/pet-attachment'

export class InMemoryPetAttachmentsRepository
  implements PetAttachmentRepository
{
  public items: Array<PetAttachment> = []

  async findManyByPetId(petId: string) {
    const petAttachments = this.items.filter(
      (item) => item.petId.value === petId,
    )
    return petAttachments
  }

  async deleteManyByPetId(petId: string) {
    const petAttachments = this.items.filter(
      (item) => item.petId.value !== petId,
    )
    this.items = petAttachments
  }
}
