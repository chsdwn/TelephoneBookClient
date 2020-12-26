import { useEffect, useState } from 'react';
import { FormInput } from './FormInput';
import Draggable from 'react-draggable';

import IPhoneNumber from '../models/phoneNumber';

interface IProps {
  phoneNumberToUpdate?: IPhoneNumber;
  handleSavePhoneNumber: (phoneNumber: IPhoneNumber) => void;
  handleUpdatePhoneNumber: (phoneNumber: IPhoneNumber) => void;
}

export const PhoneNumberCreate = ({
  phoneNumberToUpdate,
  handleSavePhoneNumber,
  handleUpdatePhoneNumber,
}: IProps) => {
  const [id, setId] = useState('');
  const [type, setType] = useState('Self');
  const [number, setNumber] = useState('');

  useEffect(() => {
    if (phoneNumberToUpdate) {
      setId(phoneNumberToUpdate.id);
      setType(phoneNumberToUpdate.type);
      setNumber(phoneNumberToUpdate.number);
    } else clear();
  }, [phoneNumberToUpdate]);

  const onSave = async () => {
    if (number.length !== 10) {
      console.log('return');
      return;
    }

    const phoneNumber: IPhoneNumber = {
      id,
      type,
      number,
    };

    if (id) {
      phoneNumber.id = id;
      handleUpdatePhoneNumber(phoneNumber);
    } else handleSavePhoneNumber(phoneNumber);

    clear();
  };

  const clear = () => {
    setId('');
    setType('Self');
    setNumber('');
  };

  return (
    <Draggable handle="p">
      <div className="box-border w-60">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <p className="bg-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider text-center">
            Numara Kaydet/Güncelle
          </p>
          <div className="px-2 py-2 bg-white space-y-2 sm:p-2">
            <select
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => setType(e.target.value)}>
              <option
                value="Self"
                selected={
                  phoneNumberToUpdate && phoneNumberToUpdate.type === 'Self'
                }>
                Self
              </option>
              <option
                value="Work"
                selected={
                  phoneNumberToUpdate && phoneNumberToUpdate.type === 'Work'
                }>
                Work
              </option>
              <option
                value="Home"
                selected={
                  phoneNumberToUpdate && phoneNumberToUpdate.type === 'Home'
                }>
                Home
              </option>
            </select>
            <FormInput
              id="number"
              name="number"
              placeholder="Numara"
              type="number"
              maxLength={10}
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            />

            <button
              className="inline-flex justify-center py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onSave}
              disabled={!number}>
              {id ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};
