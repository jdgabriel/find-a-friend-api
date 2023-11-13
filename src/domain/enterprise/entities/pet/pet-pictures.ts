import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface PetPicturesProps {
  petId: UniqueEntityID
  pictureId: UniqueEntityID
}

export class PetPictures extends Entity<PetPicturesProps> {
  get petId() {
    return this.props.petId
  }

  get pictureId() {
    return this.props.pictureId
  }

  static create(props: PetPicturesProps, id?: UniqueEntityID) {
    const petPictures = new PetPictures(props, id)
    return petPictures
  }
}
