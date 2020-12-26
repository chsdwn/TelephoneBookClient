import IPhoneNumber from '../models/phoneNumber';
import IPhoneNumbersResult from '../models/phoneNumbersResult';

export default class PhoneNumbersService {
  phoneNumbersEndpoint = process.env.NEXT_PUBLIC_API_URI + '/phonenumbers';

  async getPhoneNumbers(personId: string) {
    const res = await fetch(`${this.phoneNumbersEndpoint}/${personId}`);
    const result = (await res.json()) as IPhoneNumbersResult;
    return result;
  }

  async createPhoneNumber(phoneNumber: IPhoneNumber) {
    await fetch(`${this.phoneNumbersEndpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(phoneNumber),
    }).then(() => {});
  }

  async updatePhoneNumber(phoneNumber: IPhoneNumber) {
    await fetch(`${this.phoneNumbersEndpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(phoneNumber),
    }).then(() => {});
  }

  async deletePhoneNumber(ids: string[]) {
    await fetch(`${this.phoneNumbersEndpoint}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ids),
    }).then(() => {});
  }
}
