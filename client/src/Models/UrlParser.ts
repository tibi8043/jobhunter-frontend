import { IFilterPayLoad } from "../Redux/interfaces";

export class UrlParser {
  public static parseUrl(baseUrl: string, filter: IFilterPayLoad): string {
    const result =
      `${baseUrl}?` +
      (filter.userId ? `userId=${filter.userId}&` : "") +
      (filter.salaryFrom ? `salaryFrom[$gt]=${filter.salaryFrom}&` : "") +
      (filter.salaryTo ? `salaryTo[$lt]=${filter.salaryTo}&` : "") +
      (filter.city ? `city=${filter.city}&` : "") +
      (filter.jobType ? `type=${filter.jobType}&` : "") +
      (filter.searchValue
        ? `company[$like]=%${filter.searchValue.toLowerCase()}%`
        : "") +
      (filter.homeOffice ? `homeOffice=${filter.homeOffice}` : "");
    console.log(result);
    return result;
  }
}
