import { useEffect, useState } from 'react';

interface IProps {
  dataCount: number;
  pageSize: number;
  handlePage: (page: number) => void;
}

export const Paginate = ({ dataCount, pageSize, handlePage }: IProps) => {
  const [pageCount, setPageCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    let pageCount = Math.round(dataCount / pageSize);
    const mod = dataCount % pageSize;

    if (mod < pageSize / 2 && mod !== 0) ++pageCount;

    setPageCount(pageCount);
  }, [dataCount, pageSize]);

  const makeArrayOfPages = () => {
    const pages: number[] = [];
    for (let i = 0; i < pageCount; i++) pages.push(i + 1);

    return pages;
  };

  return (
    <div className="flex justify-center text-center text-gray-500 select-none">
      {makeArrayOfPages().map((page) => (
        <div key={`paginate-div-${page}`} className="px-1">
          <p
            key={`paginate-p-${page}`}
            className="cursor-pointer"
            style={{
              textDecoration: selectedPage === page && 'underline',
              color: selectedPage === page && 'black',
            }}
            onClick={() => {
              handlePage(page);
              setSelectedPage(page);
            }}>
            {page}
          </p>
        </div>
      ))}
    </div>
  );
};
