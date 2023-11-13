import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, right } from '@/core/errors/either'
import { Pet } from '@/domain/enterprise/entities/pet/pet'
import { PetAttachment } from '@/domain/enterprise/entities/pet/pet-attachment'
import { PetAttachmentsList } from '@/domain/enterprise/entities/pet/pet-attachment-list'
import { PetRepository } from '../repositories/pet-repository'

export interface CreatePetUseCaseRequest {
  name: string
  bio: string
  age: 'pup' | 'adult'
  size: 'small' | 'medium' | 'big'
  energyLevel: 'low' | 'medium' | 'high'
  indecencyLevel: 'low' | 'medium' | 'high'
  place: 'small' | 'medium' | 'big'
  picturesIds: Array<string>
}

type CreatePetUseCaseResponse = Either<null, { pet: Pet }>

export class CreatePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    picturesIds,
    ...props
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = Pet.create(props)

    const picturesList = picturesIds.map((id) =>
      PetAttachment.create({
        petId: pet.id,
        attachmentId: new UniqueEntityID(id),
      }),
    )

    pet.attachments = new PetAttachmentsList(picturesList)
    await this.petRepository.create(pet)

    return right({ pet })
  }
}
