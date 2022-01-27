import { CloudDirectoryUser } from "./CloudDirectoryUser";

export interface CloudDirectoryUsers {
  totalResults: number;
  itemsPerPage: number;
  schemas: Array<string>;
  Resources: Array<CloudDirectoryUser>;
}
