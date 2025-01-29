export default class User {
  name: string;
  email: string;
  address: {
    line1: string;
    line2: string;
  };
  city: string;
  zipCode: number;
  hiringDate: string;
  jobTitle: string;

  constructor(
    name: string,
    email: string,
    address: { line1: string; line2: string },
    city: string,
    zipCode: number,
    hiringDate: string,
    jobTitle: string
  ) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.city = city;
    this.zipCode = zipCode;
    this.hiringDate = hiringDate;
    this.jobTitle = jobTitle;
  }
}
