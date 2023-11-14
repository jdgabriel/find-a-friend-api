import { Either, left, right } from '@/core/errors/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Pet } from '@/domain/enterprise/entities/pet/pet'
import { PetRepository } from '../repositories/pet-repository'

export interface GetPetDetailsUseCaseRequest {
  petId: string
}

type GetPetDetailsUseCaseResponse = Either<ResourceNotFoundError, { pet: Pet }>

export class GetPetDetailsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    petId,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petRepository.findById(petId)

    if (!pet) {
      return left(new ResourceNotFoundError())
    }

    return right({ pet })
  }
}
