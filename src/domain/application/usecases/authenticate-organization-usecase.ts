import { Hash } from '@/core/entities/hash'
import { Either, left, right } from '@/core/errors/either'
import { AuthorizationForbidden } from '@/core/errors/not-allowed-error copy'
import { Organization } from '@/domain/enterprise/entities/organization'
import { OrganizationRepository } from '../repositories/organization-repository'

export interface AuthenticateOrganizationUseCaseRequest {
  email: string
  password: string
}

type AuthenticateOrganizationUseCaseResponse = Either<
  AuthorizationForbidden,
  {
    organization: Organization
    token: { type: 'Bearer'; access_token: string }
  }
>

export class AuthenticateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrganizationUseCaseRequest): Promise<AuthenticateOrganizationUseCaseResponse> {
    const organization = await this.organizationRepository.findByEmail(email)
    if (!organization) {
      return left(new AuthorizationForbidden())
    }

    if (!Hash.compare(password, organization.password)) {
      return left(new AuthorizationForbidden())
    }

    return right({
      organization,
      token: { type: 'Bearer', access_token: 'token' },
    })
  }
}
