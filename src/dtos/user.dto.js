export class UserDto {
  /**
   * @param {Object} params
   * @param {string} params.id
   * @param {string} params.firstName
   * @param {string} [params.middleName]
   * @param {string} params.lastName
   * @param {string} params.email
   * @param {string} params.phoneNumber
   * @param {string} [params.profileImage]
   * @param {string} [params.firebaseProvider]
   * @param {string} [params.companyRole]
   * @param {boolean} [params.emailVerified]
   * @param {boolean} [params.phoneVerified]
   * @param {Object} [params.address]
   * @param {Object} [params.company]
   */
  constructor({
    id,
    firstName,
    middleName = '',
    lastName,
    email,
    phoneNumber,
    profileImage = '',
    firebaseProvider = 'email',
    companyRole = '',
    emailVerified = false,
    phoneVerified = false,
    address = {},
    company = {}
  } = {}) {
    Object.assign(this, {
      id,
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      profileImage,
      firebaseProvider,
      companyRole,
      emailVerified,
      phoneVerified,
      address,
      company
    });
  }
}

export class UserResponseDto {
  /**
   * @param {Object} params
   * @param {UserDto} params.user       // The user data
   * @param {string} params.message     // Response message
   */
  constructor({ user, message } = {}) {
    this.user = user instanceof UserDto ? user : new UserDto(user);
    this.message = message;
  }
}

export default UserResponseDto;
