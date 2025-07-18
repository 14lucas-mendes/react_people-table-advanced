import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({
  isloading,
  people,
  selectedSlug,
}: {
  isloading: boolean;
  people: Person[];
  selectedSlug: string;
}) => {
  const [searchParams] = useSearchParams();

  if (isloading) {
    return <Loader />;
  }

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  let nextOrder = 'asc';

  if (currentSort === 'name' && currentOrder === 'asc') {
    nextOrder = 'desc';
  } else if (currentSort === 'name' && currentOrder === 'desc') {
    nextOrder = ''; // Para remover a ordenação, usar string vazia para evitar erro de tipo
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink
                params={nextOrder ? { sort: 'name', order: nextOrder } : {}}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ sort: 'sex', order: 'desc' }}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{ sort: 'born', order: 'desc' }}>
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={{ sort: 'died', order: 'desc' }}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink name={person.name} allPeople={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink name={person.motherName || ''} allPeople={people} />
            </td>
            <td>
              <PersonLink name={person.fatherName || ''} allPeople={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
