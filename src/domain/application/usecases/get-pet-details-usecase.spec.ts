import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makePet } from '@test/repository/factories/make-pet'
import { InMemoryPetAttachmentsRepository } from '@test/repository/in-memory-pet-attachment'
import { InMemoryPetRepository } from '@test/repository/in-memory-pet-repository'
import { GetPetDetailsUseCase } from './get-pet-details-usecase'

let petRepository: InMemoryPetRepository
let petAttachmentRepository: InMemoryPetAttachmentsRepository
let sut: GetPetDetailsUseCase

describe('Get pet details use case', () => {
  beforeEach(() => {
    petAttachmentRepository = new InMemoryPetAttachmentsRepository()
    petRepository = new InMemoryPetRepository(petAttachmentRepository)
    sut = new GetPetDetailsUseCase(petRepository)
  })

  it('should be able get a pet details', async () => {
    const pet = makePet()
    await petRepository.create(pet)

    const result = await sut.execute({
      petId: pet.id.value,
    })

    expect(result.isLeft()).toBe(false)
    if (result.isRight()) {
      expect(petRepository.items[0]).toEqual(result.value?.pet)
    }
  })

  it('should be return error with pet not found', async () => {
    const result = await sut.execute({
      petId: '1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
