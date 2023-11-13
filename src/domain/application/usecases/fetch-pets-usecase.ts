import { Either, right } from '@/core/errors/either'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { Pet } from '@/domain/enterprise/entities/pet/pet'
import { PetFilters, PetRepository } from '../repositories/pet-repository'

interface FetchPetsUseCaseRequest {
  filters?: PetFilters
  pageInfo: PaginationParams
}

type FetchPetsUseCaseResponse = Either<
  null,
  {
    pets: Array<Pet>
  }
>

export class FetchPetsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    filters = {},
    pageInfo,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petRepository.findMany(filters, pageInfo)
    return right({ pets })
  }
}
