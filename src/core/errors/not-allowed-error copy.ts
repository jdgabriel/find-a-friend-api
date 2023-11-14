import { UseCaseError } from '@/core/errors/use-case-error'

export class AuthorizationForbidden extends Error implements UseCaseError {
  constructor() {
    super('Email or password incorrect')
  }
}
