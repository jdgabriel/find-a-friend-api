import { Hash } from '@/core/entities/hash'
import { AuthorizationForbidden } from '@/core/errors/not-allowed-error copy'
import { makeOrganization } from '@test/repository/factories/make-organization'
import { InMemoryAddressRepository } from '@test/repository/in-memory-address-repository'
import { InMemoryOrganizationRepository } from '@test/repository/in-memory-organization-repository'
import { AuthenticateOrganizationUseCase } from './authenticate-organization-usecase'

let organizationRepository: InMemoryOrganizationRepository
let addressRepository: InMemoryAddressRepository
let sut: AuthenticateOrganizationUseCase

describe('Authenticate organization use case', () => {
  beforeEach(() => {
    addressRepository = new InMemoryAddressRepository()
    organizationRepository = new InMemoryOrganizationRepository(
      addressRepository,
    )
    sut = new AuthenticateOrganizationUseCase(organizationRepository)
  })

  it('should be able authenticate a organization', async () => {
    const organization = makeOrganization({
      email: 'organization@email.com',
      password: Hash.create('123456789'),
    })

    await organizationRepository.create(organization)

    const result = await sut.execute({
      email: organization.email,
      password: '123456789',
    })

    expect(result.isLeft()).toBe(false)
    if (result.isRight()) {
      expect(result.value.organization).toBeTruthy()
      expect(result.value.token).toMatchObject({
        type: 'Bearer',
        access_token: expect.any(String),
      })
    }
  })

  it('should not be able authenticate a organization with incorrectly params', async () => {
    const organization = makeOrganization({
      email: 'organization@email.com',
      password: Hash.create('123456789'),
    })

    await organizationRepository.create(organization)

    const result = await sut.execute({
      email: organization.email,
      password: 'invalid_password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AuthorizationForbidden)
  })
})
