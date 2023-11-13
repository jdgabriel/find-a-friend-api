import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Pet, PetProps } from '@/domain/enterprise/entities/pet/pet'

interface MakeUseCaseProps extends PetProps {
  picturesIds: Array<string>
}

export function makePet(override: Partial<PetProps> = {}, id?: UniqueEntityID) {
  return Pet.create(
    {
      name: 'Pet name',
      bio: 'Bio content',
      age: 'pup',
      energyLevel: 'low',
      indecencyLevel: 'low',
      place: 'medium',
      size: 'medium',
      ...override,
    },
    id,
  )
}
