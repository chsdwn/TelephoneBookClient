import { useEffect, useState } from 'react';
import { PersonsTable } from '../components/PersonsTable';
import { PersonCreate } from '../components/PersonCreate';
import { PhoneNumbersTable } from '../components/PhoneNumbersTable';
import { PhoneNumberCreate } from '../components/PhoneNumberCreate';

import PersonsService from '../services/PersonsServices';
import PhoneNumbersService from '../services/PhoneNumbersService';

import IGetAllBody from '../models/getAllBody';
import IPerson from '../models/person';
import IPhoneNumber from '../models/phoneNumber';
import { Search } from '../components/Search';

export default function Home() {
  const personsService = new PersonsService();
  const phoneNumbersService = new PhoneNumbersService();

  const [getAllBody, setGetAllBody] = useState<IGetAllBody>({
    firstName: '',
    lastName: '',
    city: '',
    phoneNumber: '',
    page: 1,
    pageSize: 5,
  });

  const [personCount, setPersonCount] = useState(0);
  const [persons, setPersons] = useState<IPerson[]>(null);
  const [personToUpdate, setPersonToUpdate] = useState<IPerson>(null);
  const [selectedPersonId, setSelectedPersonId] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState<IPhoneNumber[]>(null);
  const [phoneNumberToUpdate, setPhoneNumberToUpdate] = useState<IPhoneNumber>(
    null,
  );

  const fetchData = async () => {
    const personsData = await personsService.getPersons(getAllBody);
    setPersonCount(personsData.count);
    setPersons(personsData.persons);
  };

  const fetchPhoneNumbers = async () => {
    const phoneNumbersData = await phoneNumbersService.getPhoneNumbers(
      selectedPersonId,
    );
    setPhoneNumbers(phoneNumbersData.phoneNumbers);
  };

  useEffect(() => {
    fetchData();
  }, [getAllBody, fetchData]);

  useEffect(() => {
    if (selectedPersonId) fetchPhoneNumbers();
  }, [selectedPersonId]);

  const createPerson = async (person: IPerson) => {
    await personsService.createPerson(person);
    await fetchData();
  };

  const getPersonToUpdate = async (id: string) => {
    const person = await personsService.getPerson(id);
    setPersonToUpdate(person);
  };

  const handleUpdatePerson = async (person: IPerson) => {
    await personsService.updatePerson(person);
    setPersonToUpdate(null);
  };

  const deletePersons = async (id: string) => {
    const ids = [id];
    await personsService.deletePerson(ids);
    await fetchData();
    setPersonToUpdate(null);
  };

  const handlePage = (page: number) => {
    const body = Object.assign({}, getAllBody);
    body.page = page;
    setGetAllBody(body);
  };

  const createPhoneNumber = async (phoneNumber: IPhoneNumber) => {
    phoneNumber.personId = selectedPersonId;
    await phoneNumbersService.createPhoneNumber(phoneNumber);
    await fetchPhoneNumbers();
  };

  const deletePhoneNumbers = async (id: string) => {
    const ids = [id];
    await phoneNumbersService.deletePhoneNumber(ids);
    await fetchPhoneNumbers();
    setPhoneNumberToUpdate(null);
  };

  const getPhoneNumberToUpdate = (id: string) => {
    const phoneNumber = phoneNumbers.find((pn) => pn.id === id);
    setPhoneNumberToUpdate(phoneNumber);
  };

  const handleUpdatePhoneNumber = async (phoneNumber: IPhoneNumber) => {
    await phoneNumbersService.updatePhoneNumber(phoneNumber);
    await fetchPhoneNumbers();
    setPhoneNumberToUpdate(null);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-evenly">
        <PersonsTable
          persons={persons}
          count={personCount}
          handlePersonSelect={setSelectedPersonId}
          handlePersonDelete={deletePersons}
          handlePersonUpdate={getPersonToUpdate}
          handlePage={handlePage}
        />
        <PersonCreate
          personToUpdate={personToUpdate}
          handleSavePerson={createPerson}
          handleUpdatePerson={handleUpdatePerson}
        />
      </div>
      <div className="flex flex-row justify-evenly">
        <PhoneNumbersTable
          phoneNumbers={phoneNumbers}
          handlePhoneNumberDelete={deletePhoneNumbers}
          handlePhoneNumberUpdate={getPhoneNumberToUpdate}
        />
        <Search getAllBody={getAllBody} setGetAllBody={setGetAllBody} />
        <PhoneNumberCreate
          phoneNumberToUpdate={phoneNumberToUpdate}
          handleSavePhoneNumber={createPhoneNumber}
          handleUpdatePhoneNumber={handleUpdatePhoneNumber}
        />
      </div>
    </div>
  );
}
