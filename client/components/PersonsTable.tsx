import Draggable from 'react-draggable';
import IPerson from '../models/person';
import { Paginate } from './Paginate';

interface IProps {
  persons: IPerson[];
  count: number;
  handlePersonSelect: (id: string) => void;
  handlePersonDelete: (id: string) => void;
  handlePersonUpdate: (id: string) => void;
  handlePage: (page: number) => void;
}

export const PersonsTable = ({
  persons,
  count,
  handlePersonSelect,
  handlePersonDelete,
  handlePersonUpdate,
  handlePage,
}: IProps) => {
  return (
    <Draggable handle="thead">
      <table className="divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Ad
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Soyad
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Şehir
            </th>
            <th scope="col" className="relative"></th>
            <th scope="col" className="relative"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {persons &&
            persons.map((person, i) => (
              <tr
                key={`person-${i}`}
                className="hover:bg-gray-300"
                onClick={() => handlePersonSelect(person.id)}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {person.firstName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.lastName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.city}</div>
                </td>
                <td className="whitespace-nowrap text-xs">
                  <div
                    className="cursor-pointer text-gray-500 hover:text-gray-900"
                    onClick={() => handlePersonUpdate(person.id)}>
                    Düzenle
                  </div>
                </td>
                <td className="whitespace-nowrap text-xs px-4">
                  <div
                    className="cursor-pointer text-red-500 hover:text-red-900"
                    onClick={() => handlePersonDelete(person.id)}>
                    Sil
                  </div>
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan={5}>
              <Paginate
                dataCount={count}
                pageSize={5}
                handlePage={handlePage}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Draggable>
  );
};
