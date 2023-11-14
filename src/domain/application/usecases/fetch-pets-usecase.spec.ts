import { makeAddress } from '@test/repository/factories/make-address'
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
    const address = makeAddress({ city: 'city-1' })
    const pet = makePet({ address })
    await petRepository.create(pet)

    const result = await sut.execute({
      filters: { city: 'city-1' },
      pageInfo: { page: 1 },
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.pets).toHaveLength(1)
  })

  it('should be able to fetch pets with filters', async () => {
    const addressCity1 = makeAddress({ city: 'city-1' })
    const addressCity2 = makeAddress({ city: 'city-2' })

    for (let index = 1; index <= 5; index++) {
      await petRepository.create(
        makePet({ age: 'adult', size: 'medium', address: addressCity1 }),
      )
    }

    for (let index = 1; index <= 10; index++) {
      await petRepository.create(
        makePet({ age: 'adult', size: 'medium', address: addressCity1 }),
      )
    }

    for (let index = 1; index <= 10; index++) {
      await petRepository.create(
        makePet({ age: 'pup', size: 'small', address: addressCity2 }),
      )
    }

    const result = await sut.execute({
      filters: { city: addressCity1.city, age: 'adult', size: 'medium' },
      pageInfo: { page: 1 },
    })

    expect(result.value?.pets).toHaveLength(15)
    expect(petRepository.items).toHaveLength(25)
  })
})
