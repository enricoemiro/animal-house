import { Breadcrumb, Container } from 'react-bootstrap';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

function HeaderBreadcrumb() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <section className="py-3 bg-light">
      <Container>
        <h1 className="fw-bold mb-0">
          {breadcrumbs[breadcrumbs.length - 1].breadcrumb}
        </h1>

        <Breadcrumb listProps={{ className: 'mb-0' }}>
          {breadcrumbs.map(({ key, breadcrumb }, index, array) => {
            const isCurrentRoute = array.length - 1 === index;

            return (
              <Breadcrumb.Item
                key={index}
                href={!isCurrentRoute ? key : ''}
                active={isCurrentRoute ? true : false}
              >
                {breadcrumb}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </Container>
    </section>
  );
}

export default HeaderBreadcrumb;
