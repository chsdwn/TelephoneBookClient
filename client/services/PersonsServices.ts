import IPerson from '../models/person';
import IPersonsResult from '../models/personsResult';

export default class PersonsService {
  personsEndpoint = process.env.NEXT_PUBLIC_API_URI + '/persons';

  async getPersons(body: any) {
    const res = await fetch(`${this.personsEndpoint}/getall`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const result = (await res.json()) as IPersonsResult;

    return result;
  }

  async getPerson(id: string) {
    const res = await fetch(`${this.personsEndpoint}/${id}`);
    const result = (await res.json()) as IPerson;

    return result;
  }

  async createPerson(person: IPerson) {
    await fetch(`${this.personsEndpoint}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person),
    }).then(() => {});
  }

  async updatePerson(person: IPerson) {
    await fetch(`${this.personsEndpoint}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person),
    }).then(() => {});
  }

  async deletePerson(ids: string[]) {
    await fetch(`${this.personsEndpoint}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ids),
    }).then(() => {});
  }
}
