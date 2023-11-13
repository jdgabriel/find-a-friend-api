import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryPetAttachmentsRepository } from '@test/repository/in-memory-pet-attachment'
import { InMemoryPetRepository } from '@test/repository/in-memory-pet-repository'
import { CreatePetUseCase } from './create-pet-usecase'

let petRepository: InMemoryPetRepository
let petAttachmentRepository: InMemoryPetAttachmentsRepository
let sut: CreatePetUseCase

describe('Create pet use case', () => {
  beforeEach(() => {
    petAttachmentRepository = new InMemoryPetAttachmentsRepository()
    petRepository = new InMemoryPetRepository(petAttachmentRepository)
    sut = new CreatePetUseCase(petRepository)
  })

  it('should be able create a pet', async () => {
    const result = await sut.execute({
      name: 'pet name',
      bio: 'Bio content',
      age: 'pup',
      energyLevel: 'low',
      indecencyLevel: 'low',
      picturesIds: ['1', '2'],
      place: 'medium',
      size: 'medium',
    })
    expect(result.isRight()).toBe(true)
    expect(petRepository.items[0]).toEqual(result.value?.pet)
    expect(petRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(petRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
