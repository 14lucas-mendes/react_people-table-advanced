import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type PeopleTableProps = {
  isloading: boolean;
  people: Person[];
  selectedSlug: string;
  selectedSort: string | null;
  selectedOrder: string | null;
  selectedSex: string | null;
  selectedCenturies: string[] | null;
  selectedQuery: string | null;
  selectedBorn: string | null;
  selectedDied: string | null;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({
  isloading,
  people,
  selectedSlug,
  selectedSort,
  selectedOrder,
  selectedSex,
  selectedBorn,
  selectedDied,
}: PeopleTableProps) => {
  if (isloading) {
    return <Loader />;
  }

  const paramsSort = () => {
    if (selectedSort !== 'name') {
      return {
        sort: 'name',
        order: null,
      };
    } else if (selectedSort === 'name' && selectedOrder === null) {
      return {
        sort: 'name',
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

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
              <SearchLink params={paramsSort()}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={selectedSex === 'sex' ? { sex: null } : { sex: 'sex' }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={
                  selectedBorn === 'born' ? { born: null } : { born: 'born' }
                }
              >
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={
                  selectedDied === 'died' ? { died: null } : { died: 'died' }
                }
              >
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
