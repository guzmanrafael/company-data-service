import { asClass, createContainer } from 'awilix';
import { CompanyClient } from './functions/helpers/CompanyClient';

const container = createContainer({
  injectionMode: 'CLASSIC'
});

container.register({
  companyClient: asClass(CompanyClient).scoped()
}
);

export default container;
