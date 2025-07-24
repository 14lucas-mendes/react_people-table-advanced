import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useEffect, useRef, useState } from 'react';
import { getPeople } from '../api';
import { useLocation, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isloading, setIsLoading] = useState(false);
  const location = useLocation();
  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');
  const born = searchParams.get('born');
  const died = searchParams.get('died');

  // Extrai o slug da URL se existir
  const slug = location.pathname.split('/people/')[1];

  const peopleRef = useRef<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        peopleRef.current = data;
        setSortedPeople(peopleRef.current);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const sortItensTable = (sort: string | null, order: string | null) => {
    if (sort === 'name' && order === null) {
      setSortedPeople(
        [...peopleRef.current].sort((a: Person, b: Person) =>
          a.name.localeCompare(b.name),
        ),
      );
    } else if (sort === 'name' && order === 'desc') {
      const result = [...peopleRef.current].sort((a: Person, b: Person) =>
        b.name.localeCompare(a.name),
      );

      setSortedPeople(result);
    } else if (sort === null && order === null) {
      setSortedPeople(peopleRef.current);
    }
  };

  useEffect(() => {
    if (peopleRef.current.length > 0) {
      sortItensTable(sort, order);
    }
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isloading ? (
                <Loader />
              ) : peopleRef.current.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable
                  isloading={isloading}
                  people={sortedPeople}
                  selectedSlug={slug}
                  selectedSort={sort}
                  selectedOrder={order}
                  selectedSex={sex}
                  selectedCenturies={centuries}
                  selectedQuery={query}
                  selectedBorn={born}
                  selectedDied={died}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
