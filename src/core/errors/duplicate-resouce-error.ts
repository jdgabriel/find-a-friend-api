import { UseCaseError } from '@/core/errors/use-case-error'

export class DuplicateResource extends Error implements UseCaseError {
  constructor() {
    super('Not allowed')
  }
}
