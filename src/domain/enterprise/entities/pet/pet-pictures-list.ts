import { WatchedList } from '@/core/entities/watched-list'
import { PetPictures, PetPicturesProps } from './pet-pictures'

export class PetPicturesListList extends WatchedList<PetPicturesProps> {
  compareItems(a: PetPictures, b: PetPictures): boolean {
    return a.pictureId.equals(b.pictureId)
  }
}
