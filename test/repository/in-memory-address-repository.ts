import { AddressRepository } from '@/domain/application/repositories/address-repository'
import { Address } from '@/domain/enterprise/entities/address'

export class InMemoryAddressRepository implements AddressRepository {
  public items: Array<Address> = []

  constructor() {}

  async create(pet: Address) {
    this.items.push(pet)
  }

  async save(pet: Address) {
    const itemIndex = this.items.findIndex((item) => item.id === pet.id)
    this.items[itemIndex] = pet
  }

  async delete(pet: Address) {
    const itemIndex = this.items.findIndex((item) => item.id === pet.id)
    this.items.splice(itemIndex, 1)
  }
}
