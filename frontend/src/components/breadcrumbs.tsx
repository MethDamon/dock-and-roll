import { UIMatch, useMatches } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { Link } from 'react-router-dom';

export const Breadcrumbs = () => {
  let matches = useMatches() as UIMatch<object, { crumb: () => JSX.Element }>[];
  matches = matches.filter((match) => Boolean(match.handle?.crumb));
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={'/'}>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {matches.map((match, index) => (
          <div key={match.id}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={match.pathname}>{match.handle.crumb()}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== matches.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
