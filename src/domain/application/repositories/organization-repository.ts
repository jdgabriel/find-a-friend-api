import { Organization } from '../../enterprise/entities/organization'

export interface OrganizationRepository {
  findById(id: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
  create(organization: Organization): Promise<void>
  delete(organization: Organization): Promise<void>
  save(organization: Organization): Promise<void>
}
