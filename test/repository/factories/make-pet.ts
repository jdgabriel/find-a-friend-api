import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Pet, PetProps } from '@/domain/enterprise/entities/pet/pet'

export function makePet(override: Partial<PetProps> = {}, id?: UniqueEntityID) {
  const pet = Pet.create(
    {
      orgId: new UniqueEntityID('organization-id-1'),
      name: faker.animal.cat(),
      bio: faker.lorem.sentence(10),
      age: 'pup',
      energyLevel: 'low',
      indecencyLevel: 'low',
      place: 'medium',
      size: 'medium',
      ...override,
    },
    id,
  )

  return pet
}
