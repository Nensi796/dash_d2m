export interface IUser {
  id: string;
  name: string;
}

export type HtmlTags =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'inherit'
  | 'button'
  | 'overline'
  | 'caption'
  | 'subtitle1'
  | 'subtitle2'
  | 'body2'
  | undefined;

export interface IFilterModal {
  status?: string;
  adviser?: string;
  admin?: string;
}
export interface IStaff {
  id: string;
  name: string;
  countryCode: string;
  officeId: string;
  picture: string;
  phoneNumber: string;
  role: string;
  email: string;
  isVerified: boolean;
}
export interface IClientReminder {
  id: string;
  subject: string;
  role: string;
  dueDate: string;
  createdBy: string;
  clientId: string;
  isCompleted: boolean;
}

export interface IDashboardReminders {
  _id: string;
  subject: string;
  dueDate: string;
  clientName: string;
}

export interface IClientDetails {
  clientId: string;
  title: string;
  fullName: string;
  emailAddress: string;
  mobileNumber: string;
  status: string;
  advisor: string;
  admin: string;
  view: string;
}
export interface IProspectDetails {
  id: string;
  fullName: string;
  dob: string;
  email: string;
  phoneNumber: string;
  postCode: string;
  advisorID: number;
  mortgageType: string;
  adviser: string;
  officeId: string;
  admin: string;
  mortgageDetails: MortgageDetails;
}

export interface IFormInputsProspect {
  mortgageType: string;
  interest_rate: string;
  adviser_id: string;
  fullName_applicant: string;
  email_applicant: string;
  phone_applicant: string;
  date: string;
  pinCode_applicant: number;
  payment: string;
  term: string;
  adviser: string;
  admin: string;
  loan: string;
  address_line1: string;
  address_line2: string;
  address_line3: string;
  office: string;
}
export interface IReviewDetails {
  clientId: string;
  title: string;
  fullName: string;
  product_Type: string;
  description: string;
  renewal_date: string;
  view: string;
}
export interface IFormInputsClient {
  applicant: string[];
  fullName_applicant: string;
  email_applicant: string;
  phone_applicant: string;
  date: string;
  pinCode_applicant: string;
  mortgageType: string;
  fullName_solicitor: string;
  email_solicitor: string;
  phone_solicitor: string;
  office: string;
  adviser: string;
  admin: string;
  property: string;
  acc_num: number;
  price: number;
  term: string;
  rerpayment_method: string;
  pinCode_mortgage: number;
  amount: number;
  lender: string;
  next_renewal_date: string;
}
export interface IReviewFilterData {
  clientId: number;
  title: string;
  fullName: string;
  product_Type: string;
  description: string;
  renewal_date: string;
  view: string;
}
export interface IStaffDetails {
  role: string;
  name: string;
  email: string;
  phoneNumber: string;
  photo: FileList;
  office: string;
}

export interface IGetClientDetails {
  __typename: string;
  id: string;
  fullName: string;
  dob: string;
  correspondence: Correspondence;
  mortgageType: string;
  adviser: string;
  officeId: string;
  admin: string;
  mortgageProperty: MortgageProperty[];
  solicitorDetails: SolicitorDetails;
  applicants: string[];
}
export interface IClientInputs {
  name: string;
  birthDate: string;
  fname: string;
  dob: string;
  pin: number;
  num: string;
  email: string;
  MortgageTypeData: string;
  advisor: string;
  admin: string;
  officeId: string;
  fullName_solicitor: string;
  email_solicitor: string;
  phone_solicitor: string;
  propertyNumber: number;
  ePin: number;
  purchasePrice: number;
  term: string;
  repaymentMethod: number;
  lAccountNumber: number;
  amountRequired: string;
  lender: string;
  nextDate: string;
}

export interface SolicitorDetails {
  __typename: string;
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
}

export interface MortgageProperty {
  __typename: string;
  propertyNumber: string;
  postCode: string;
  purchasePrice: string;
  term: string;
  rerPaymentMethod: string;
  lenderAccountNumber: string;
  lender: string;
  nextRenewalDate: string;
  amountRequired: number;
  additionalProducts: AdditionalProduct[];
}

export interface AdditionalProduct {
  __typename: string;
  type: string;
  description: string;
  renewalDate: string;
}

export interface IProspectData {
  mortgageType: string;
  interestRates: string;
  advisorID: string;
  fullName: string;
  email: string;
  phoneNumber: number;
  dob: string;
  postCode: string;
  monthlyPayment: string;
  term: string;
  adviser: string;
  admin: string;
  loanAmount: string;
  mortgageDetails?: MortgageDetails;
  id?: string;
  officeId: string;
  // __typename: string;
}

export interface MortgageDetails {
  loanAmount: string;
  interestRates: string;
  term: string;
  monthlyPayment: string;
  __typename: string;
}

export interface Correspondence {
  __typename: string;
  fullName: string;
  dob: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  postCode: string;
}

export interface AdditionalProduct {
  __typename: string;
  type: string;
  description: string;
  renewalDate: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface MortgageDetails {
  loanAmount: string;
  interestRates: string;
  term: string;
  monthlyPayment: string;
  __typename: string;
}
export interface IOffice {
  id: string;
  name: string;
  phoneNumber: string;
  postCode: string;
  address1: string;
  address2: string;
  address3: string;
}
