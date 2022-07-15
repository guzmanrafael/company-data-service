import { ICompanyClient } from '../../interfaces/ICompanyClient';
import { Company } from '../../models/Company';

export class CompanyClient implements ICompanyClient {
  public async createCompany(event: any) {
    try {
      await Company.create(event.newCompany);
    } catch (error) {
      console.error(error);
      throw new Error('Create_Company_Error');
    }
    return {
      statusCode: 200
    };
  }

  public async getCompany(event: any) {
    const companyId = event.id;
    let data;
    try {
      data = await Company.findOne({ where: { id: companyId } });
    } catch (error) {
      console.error(error);
      throw new Error('Get_Company');
    }
    return data || {};
  }

  public async updateCompany(event: any) {
    const companyId = event.id;

    try {
      await Company.update(event.updateCompany, { where: { id: companyId } });
      return {
        statusCode: 200
      };
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}
