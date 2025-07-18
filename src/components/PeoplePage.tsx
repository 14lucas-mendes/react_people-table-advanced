import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { useLocation } from 'react-router-dom';

export const PeoplePage = () => {
  const [isloading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const location = useLocation();

  // Extrai o slug da URL se existir
  const slug = location.pathname.split('/people/')[1];

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
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
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable
                  isloading={isloading}
                  people={people}
                  selectedSlug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
