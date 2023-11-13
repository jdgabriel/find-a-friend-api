import { Hash } from '@/core/entities/hash'

export class Password {
  public value: string

  private constructor(password: string) {
    this.value = password
  }

  static compare(stringHash: string, stringToCompareHash: string) {
    return Hash.compare(stringHash, stringToCompareHash)
  }

  static create(password: string) {
    const pass = new Password(password)
    return pass
  }
}
