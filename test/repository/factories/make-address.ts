import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Address, AddressProps } from '@/domain/enterprise/entities/address'

interface MakeUseCaseProps extends AddressProps {
  picturesIds: Array<string>
}

export function makeAddress(
  override: Partial<AddressProps> = {},
  id?: UniqueEntityID,
) {
  const address = Address.create(
    {
      ownerId: new UniqueEntityID('owner-id'),
      city: faker.location.city(),
      postalNumber: faker.location.zipCode(),
      street: faker.location.street(),
      ...override,
    },
    id,
  )

  return address
}
