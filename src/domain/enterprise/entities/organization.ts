import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Address } from './address'

interface OrganizationProps {
  name: string
  email: string
  address: Address | null
  createdAt: Date
  updatedAt?: Date
}

export class Organization extends AggregateRoot<OrganizationProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  get address(): Address | null {
    return this.props.address
  }

  set address(address: Address) {
    this.props.address = address
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<OrganizationProps, 'createdAt' | 'address'>,
    id?: UniqueEntityID,
  ) {
    const organization = new Organization(
      {
        ...props,
        address: props.address ?? null,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return organization
  }
}
