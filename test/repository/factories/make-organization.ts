import { Hash } from '@/core/entities/hash'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Organization,
  OrganizationProps,
} from '@/domain/enterprise/entities/organization'
import { faker } from '@faker-js/faker'

export function makeOrganization(
  override: Partial<OrganizationProps> = {},
  id?: UniqueEntityID,
) {
  const organization = Organization.create(
    {
      name: faker.company.name(),
      email: faker.internet.email(),
      password: Hash.create(String(faker.number.int({ min: 6, max: 16 }))),
      phoneNumber: faker.phone.number(),
      ...override,
    },
    id,
  )

  return organization
}
