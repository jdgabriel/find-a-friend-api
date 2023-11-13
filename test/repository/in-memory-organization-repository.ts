import { AddressRepository } from '@/domain/application/repositories/address-repository'
import { OrganizationRepository } from '@/domain/application/repositories/organization-repository'
import { Organization } from '@/domain/enterprise/entities/organization'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public items: Array<Organization> = []

  constructor(private addressRepository: AddressRepository) {}

  async findById(id: string) {
    const organization = this.items.find((item) => item.id.value === id)
    if (!organization) return null
    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)
    if (!organization) return null
    return organization
  }

  async create(organization: Organization) {
    this.items.push(organization)
    if (organization.address) {
      this.addressRepository.create(organization.address)
    }
  }

  async save(organization: Organization) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === organization.id,
    )
    this.items[itemIndex] = organization
  }

  async delete(organization: Organization) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === organization.id,
    )
    this.items.splice(itemIndex, 1)
    if (organization.address) {
      this.addressRepository.delete(organization.address)
    }
  }
}
