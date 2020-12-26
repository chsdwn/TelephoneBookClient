import React from 'react';
import Draggable from 'react-draggable';
import IPhoneNumber from '../models/phoneNumber';

interface IProps {
  phoneNumbers: IPhoneNumber[];
  handlePhoneNumberDelete: (id: string) => void;
  handlePhoneNumberUpdate: (id: string) => void;
}

export const PhoneNumbersTable = ({
  phoneNumbers,
  handlePhoneNumberDelete,
  handlePhoneNumberUpdate,
}: IProps) => {
  const maskPhoneNumber = (phoneNumber: string) => {
    return (
      `${phoneNumber[0]}${phoneNumber[1]}${phoneNumber[2]} ` +
      `${phoneNumber[3]}${phoneNumber[4]}${phoneNumber[5]} ` +
      `${phoneNumber[6]}${phoneNumber[7]} ` +
      `${phoneNumber[8]}${phoneNumber[9]} `
    );
  };

  return (
    <Draggable handle="thead">
      <table className="divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Tip
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Numara
            </th>
            <th scope="col" className="relative">
              <span className="sr-only">Düzenle</span>
            </th>
            <th scope="col" className="relative">
              <span className="sr-only">Sil</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {!phoneNumbers && (
            <tr>
              <td colSpan={4}>
                <p className="text-center p-2 text-gray-700">Kişi seçiniz!</p>
              </td>
            </tr>
          )}
          {phoneNumbers &&
            phoneNumbers.map((phoneNumber, i) => (
              <tr key={`person-${i}`} className="hover:bg-gray-300">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {phoneNumber.type === 'Work'
                      ? 'İş'
                      : phoneNumber.type === 'Home'
                      ? 'Ev'
                      : 'Şahsi'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {maskPhoneNumber(phoneNumber.number)}
                  </div>
                </td>
                <td className="whitespace-nowrap text-xs">
                  <div
                    className="cursor-pointer text-gray-500 hover:text-gray-900"
                    onClick={() => handlePhoneNumberUpdate(phoneNumber.id)}>
                    Düzenle
                  </div>
                </td>
                <td className="whitespace-nowrap text-xs px-4">
                  <div
                    className="cursor-pointer text-red-500 hover:text-red-900"
                    onClick={() => handlePhoneNumberDelete(phoneNumber.id)}>
                    Sil
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Draggable>
  );
};
