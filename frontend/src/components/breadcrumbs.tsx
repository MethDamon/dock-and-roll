import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from './ui/breadcrumb';

export const Breadcrumbs = () => (
  <Breadcrumb className="hidden md:flex">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <a href="#">Home</a>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>My Boats</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);
