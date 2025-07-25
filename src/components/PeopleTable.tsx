import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type PeopleTableProps = {
  isloading: boolean;
  people: Person[];
  selectedSlug: string;
  params: {
    sort: string | null;
    order: string | null;
    sex: string | null;
    centuries: string[];
    query: string | null;
    born: string | null;
    died: string | null;
  };
};

const itensHeaders = [
  { name: 'Name' },
  { name: 'Sex' },
  { name: 'Born' },
  { name: 'Died' },
];

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({
  isloading,
  people,
  selectedSlug,
  params,
}: PeopleTableProps) => {
  if (isloading) {
    return <Loader />;
  }

  const paramsSort = () => {
    if (params.sort !== 'name') {
      return {
        sort: 'name',
        order: null,
      };
    } else if (params.sort === 'name' && params.order === null) {
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
          {itensHeaders.map(item => (
            <th key={item.name}>
              <span className="is-flex is-flex-wrap-nowrap">
                {item.name}
                <SearchLink params={paramsSort()}>
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
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
