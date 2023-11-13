import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Address } from '@/domain/enterprise/entities/address'
import {
  Organization,
  OrganizationProps,
} from '@/domain/enterprise/entities/organization'
import { Password } from '@/domain/enterprise/entities/password'

export function makeOrganization(
  override: Partial<OrganizationProps> = {},
  id?: UniqueEntityID,
) {
  const organization = Organization.create(
    {
      name: 'Organization name',
      email: 'organization@email.com',
      password: Password.create('123123'),
      phoneNumber: '9999999999',
      ...override,
    },
    id,
  )

  organization.address = Address.create({
    city: 'city',
    postalNumber: '123321',
    street: 'street',
    ownerId: organization.id,
  })

  return organization
}
