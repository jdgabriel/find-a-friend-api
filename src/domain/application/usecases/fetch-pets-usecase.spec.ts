import { makePet } from '@test/repository/factories/make-pet'
import { InMemoryPetAttachmentsRepository } from '@test/repository/in-memory-pet-attachment'
import { InMemoryPetRepository } from '@test/repository/in-memory-pet-repository'
import { FetchPetsUseCase } from './fetch-pets-usecase'

let petRepository: InMemoryPetRepository
let petAttachmentRepository: InMemoryPetAttachmentsRepository
let sut: FetchPetsUseCase

describe('Fetch pets use case', () => {
  beforeEach(() => {
    petAttachmentRepository = new InMemoryPetAttachmentsRepository()
    petRepository = new InMemoryPetRepository(petAttachmentRepository)
    sut = new FetchPetsUseCase(petRepository)
  })

  it('should be able a fetch a pets', async () => {
    const pet = makePet()
    await petRepository.create(pet)

    const result = await sut.execute({ pageInfo: { page: 1 } })

    expect(result.isRight()).toBe(true)
    expect(result.value?.pets).toHaveLength(1)
  })

  it('should be able to fetch pets with filters', async () => {
    for (let index = 1; index <= 5; index++) {
      await petRepository.create(makePet({ age: 'adult', size: 'medium' }))
    }

    for (let index = 1; index <= 10; index++) {
      await petRepository.create(makePet({ age: 'adult', size: 'medium' }))
    }

    for (let index = 1; index <= 10; index++) {
      await petRepository.create(makePet({ age: 'pup', size: 'small' }))
    }

    const result = await sut.execute({
      filters: { age: 'adult', size: 'medium' },
      pageInfo: { page: 1 },
    })

    expect(result.value?.pets).toHaveLength(15)
    expect(petRepository.items).toHaveLength(25)
  })
})
