import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormInput } from './FormInput';
import Draggable from 'react-draggable';

import IGetAllBody from '../models/getAllBody';

interface IProps {
  getAllBody: IGetAllBody;
  setGetAllBody: Dispatch<SetStateAction<IGetAllBody>>;
}

export const Search = ({ getAllBody, setGetAllBody }: IProps) => {
  const [searchType, setSearchType] = useState('firstName');
  const [search, setSearch] = useState('');

  const onSearch = () => {
    const body = clearBody();

    switch (searchType) {
      case 'firstName':
        body.firstName = search;
        break;
      case 'lastName':
        body.lastName = search;
        break;
      case 'city':
        body.city = search;
        break;
      case 'phoneNumber':
        body.phoneNumber = search;
        break;
    }
    console.log(body);
    setGetAllBody(body);
  };

  const onClear = () => {
    setSearch('');
    setGetAllBody(clearBody());
  };

  const clearBody = () => {
    const body = Object.assign({}, getAllBody);
    body.firstName = '';
    body.lastName = '';
    body.city = '';
    body.phoneNumber = '';
    return body;
  };

  return (
    <Draggable handle="p">
      <div className="box-border w-60">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <p className="bg-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider text-center">
            Kişi Ara
          </p>
          <div className="px-2 py-2 bg-white space-y-2 sm:p-2">
            <select
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => setSearchType(e.target.value)}>
              <option value="firstName">İsim</option>
              <option value="lastName">Soyad</option>
              <option value="city">Şehir</option>
              <option value="phoneNumber">Numara</option>
            </select>
            <FormInput
              id="search"
              name="search"
              placeholder="Ara..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />

            <div className="flex">
              <button
                className="mx-1 inline-flex justify-center py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={onSearch}>
                Ara
              </button>
              <button
                className="mx-1 inline-flex justify-center py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={onClear}>
                Temizle
              </button>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};
