import { InMemoryAddressRepository } from '@test/repository/in-memory-address-repository'
import { InMemoryOrganizationRepository } from '@test/repository/in-memory-organization-repository'
import { CreateOrganizationUseCase } from './create-organization-usecase'

let organizationRepository: InMemoryOrganizationRepository
let addressRepository: InMemoryAddressRepository
let sut: CreateOrganizationUseCase

describe('Create organization use case', () => {
  beforeEach(() => {
    addressRepository = new InMemoryAddressRepository()
    organizationRepository = new InMemoryOrganizationRepository(
      addressRepository,
    )
    sut = new CreateOrganizationUseCase(organizationRepository)
  })

  it('should be able create a organization', async () => {
    const result = await sut.execute({
      email: 'jhon@doe.com',
      name: 'Org name',
      phoneNumber: '5531999999999',
      postalNumber: '12345678',
      street: 'Street name',
      password: '1234',
    })

    expect(result.isRight()).toBe(true)
    expect(organizationRepository.items[0].email).toEqual('jhon@doe.com')
    expect(addressRepository.items[0]).toMatchObject({
      phoneNumber: '5531999999999',
      postalNumber: '12345678',
    })
  })
})
