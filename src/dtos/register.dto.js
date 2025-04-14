export default class RegisterDto {
    constructor(data) {
      this.firstName = data.firstName;
      this.middleName = data.middleName || '';
      this.lastName = data.lastName;
      this.email = data.email;
      this.password = data.password;
      this.phoneNumber = data.phoneNumber;
      this.profileImage = data.profileImage || '';
      this.firebaseProvider = 'email'; // default
  
      if (data.address) {
        this.address = {
          streetLine1: data.address.streetLine1,
          streetLine2: data.address.streetLine2 || '',
          city: data.address.city,
          state: data.address.state,
          country: data.address.country,
          postalCode: data.address.postalCode,
          addressType: data.address.addressType || 'BILLING',
          isPrimary: data.address.isPrimary ?? true,
        };
      }
  
      if (data.company) {
        this.company = {
          name: data.company.name,
          originCountry: data.company.originCountry,
          email: data.company.email,
          phoneNumber: data.company.phoneNumber,
          companyRegistrationNumber: data.company.companyRegistrationNumber,
          taxIdentificationNumber: data.company.taxIdentificationNumber,
          verificationDate: data.company.verificationDate,
          isBuyer: data.company.isBuyer ?? false,
          isSeller: data.company.isSeller ?? false,
          transactionLimit: data.company.transactionLimit,
          productCategories: data.company.productCategories || [],
        };
      }
  
      if (data.companyRole) {
        this.companyRole = data.companyRole;
      }
    }
  }
  