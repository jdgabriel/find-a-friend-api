import { PetAttachment } from '@/domain/enterprise/entities/pet/pet-attachment'

export interface PetAttachmentRepository {
  findManyByPetId(petId: string): Promise<Array<PetAttachment>>
  deleteManyByPetId(petId: string): Promise<void>
}
