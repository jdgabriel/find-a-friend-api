import { Address } from '../../enterprise/entities/address'

export interface AddressRepository {
  create(address: Address): Promise<void>
  delete(address: Address): Promise<void>
  save(address: Address): Promise<void>
}
