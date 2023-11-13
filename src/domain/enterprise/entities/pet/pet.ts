import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Address } from '@/domain/enterprise/entities/address'
import { PetAttachmentsList } from './pet-attachment-list'

export interface PetProps {
  orgId: UniqueEntityID
  name: string
  bio: string
  address: Address | null
  age: 'pup' | 'adult'
  size: 'small' | 'medium' | 'big'
  energyLevel: 'low' | 'medium' | 'high'
  indecencyLevel: 'low' | 'medium' | 'high'
  place: 'small' | 'medium' | 'big'
  attachments: PetAttachmentsList
  createdAt: Date
  updatedAt?: Date
}

export class Pet extends AggregateRoot<PetProps> {
  get orgId() {
    return this.props.orgId
  }

  get name() {
    return this.props.name
  }

  get bio() {
    return this.props.bio
  }

  get address(): Address | null {
    return this.props.address
  }

  set address(address: Address) {
    this.props.address = address
  }

  get age() {
    return this.props.age
  }

  get size() {
    return this.props.size
  }

  get energyLevel() {
    return this.props.energyLevel
  }

  get indecencyLevel() {
    return this.props.indecencyLevel
  }

  get place() {
    return this.props.place
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: PetAttachmentsList) {
    this.props.attachments = attachments
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<PetProps, 'createdAt' | 'attachments' | 'address'>,
    id?: UniqueEntityID,
  ) {
    const pet = new Pet(
      {
        ...props,
        attachments: props.attachments ?? new PetAttachmentsList(),
        address: props.address ?? null,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return pet
  }
}
