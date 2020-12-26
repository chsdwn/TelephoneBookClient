import { useEffect, useState } from 'react';
import { FormInput } from './FormInput';
import Draggable from 'react-draggable';

import IPerson from '../models/person';

interface IProps {
  personToUpdate?: IPerson;
  handleSavePerson: (person: IPerson) => void;
  handleUpdatePerson: (person: IPerson) => void;
}

export const PersonCreate = ({
  personToUpdate,
  handleSavePerson,
  handleUpdatePerson,
}: IProps) => {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');

  useEffect(() => {
    if (personToUpdate) {
      setId(personToUpdate.id);
      setFirstName(personToUpdate.firstName);
      setLastName(personToUpdate.lastName);
      setCountry(personToUpdate.country);
      setCity(personToUpdate.city);
      setDistrict(personToUpdate.district);
      setStreet(personToUpdate.street);
      setZipCode(personToUpdate.zipCode);
    } else clear();
  }, [personToUpdate]);

  const onSave = async () => {
    const person: IPerson = {
      firstName,
      lastName,
      country,
      city,
      district,
      street,
      zipCode,
    };

    if (id) {
      person.id = id;
      handleUpdatePerson(person);
    } else handleSavePerson(person);

    clear();
  };

  const clear = () => {
    setId('');
    setFirstName('');
    setLastName('');
    setCountry('');
    setCity('');
    setDistrict('');
    setStreet('');
    setZipCode('');
  };

  return (
    <Draggable handle="p">
      <div className="box-border w-60">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <p className="bg-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider text-center">
            Kişi Kaydet/Güncelle
          </p>
          <div className="px-2 py-2 bg-white space-y-2 sm:p-2">
            <FormInput
              id="firstName"
              name="firstName"
              placeholder="İsim"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <FormInput
              name="lastName"
              id="lastName"
              placeholder="Soyad"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <FormInput
              name="country"
              id="country"
              placeholder="Ülke"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
            <FormInput
              name="city"
              id="city"
              placeholder="Şehir"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
            <FormInput
              name="district"
              id="district"
              placeholder="İlçe"
              onChange={(e) => setDistrict(e.target.value)}
              value={district}
            />
            <FormInput
              name="street"
              id="street"
              placeholder="Sokak"
              onChange={(e) => setStreet(e.target.value)}
              value={street}
            />
            <FormInput
              name="zipCode"
              id="zipCode"
              placeholder="Posta Kodu"
              onChange={(e) => setZipCode(e.target.value)}
              value={zipCode}
            />

            <button
              className="inline-flex justify-center py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onSave}
              disabled={!firstName}>
              {id ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};
