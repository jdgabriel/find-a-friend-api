import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface AddressProps {
  ownerId: UniqueEntityID
  street: string
  postalNumber: string
  city: string
  createdAt: Date
  updatedAt?: Date
}

export class Address extends AggregateRoot<AddressProps> {
  get ownerId() {
    return this.props.ownerId
  }

  get street() {
    return this.props.street
  }

  get city() {
    return this.props.city
  }

  get postalNumber() {
    return this.props.postalNumber
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<AddressProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const address = new Address(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return address
  }
}
