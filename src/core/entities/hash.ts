import bcrypt from 'bcrypt'

export class Hash {
  static create(stringToHash: string) {
    return bcrypt.hashSync(stringToHash, 6)
  }

  static compare(stringHash: string, stringToCompareHash: string) {
    return bcrypt.compareSync(stringHash, stringToCompareHash)
  }
}
