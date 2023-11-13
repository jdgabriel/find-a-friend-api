import { WatchedList } from '@/core/entities/watched-list'
import { PetAttachment, PetAttachmentProps } from './pet-attachment'

export class PetAttachmentsList extends WatchedList<PetAttachmentProps> {
  compareItems(a: PetAttachment, b: PetAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
