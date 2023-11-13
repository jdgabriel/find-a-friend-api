import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface PetAttachmentProps {
  petId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class PetAttachment extends Entity<PetAttachmentProps> {
  get petId() {
    return this.props.petId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: PetAttachmentProps, id?: UniqueEntityID) {
    const petAttachments = new PetAttachment(props, id)
    return petAttachments
  }
}
