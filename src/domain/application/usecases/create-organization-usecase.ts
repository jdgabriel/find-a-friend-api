import { Hash } from '@/core/entities/hash'
import { DuplicateResource } from '@/core/errors/duplicate-resouce-error'
import { Either, left, right } from '@/core/errors/either'
import { Address } from '@/domain/enterprise/entities/address'
import { Organization } from '@/domain/enterprise/entities/organization'
import { OrganizationRepository } from '../repositories/organization-repository'

export interface CreateOrganizationUseCaseRequest {
  name: string
  email: string
  street: string
  postalNumber: string
  city: string
  phoneNumber: string
  password: string
}

type CreateOrganizationUseCaseResponse = Either<
  DuplicateResource,
  { organization: Organization }
>

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(
    props: CreateOrganizationUseCaseRequest,
  ): Promise<CreateOrganizationUseCaseResponse> {
    const organizationAlreadyExists =
      await this.organizationRepository.findByEmail(props.email)

    if (organizationAlreadyExists) {
      return left(new DuplicateResource())
    }

    const organization = Organization.create({
      ...props,
      password: Hash.create(props.password),
    })

    const address = Address.create({
      ownerId: organization.id,
      postalNumber: props.postalNumber,
      city: props.city,
      street: props.street,
    })

    organization.address = address

    await this.organizationRepository.create(organization)

    return right({ organization })
  }
}
