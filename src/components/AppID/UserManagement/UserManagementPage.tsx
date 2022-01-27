import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { sendRequest } from "../../common/sendRequest";
import { CloudDirectoryUsers } from "../model/CloudDirectoryUsers";
import DataTable from "react-data-table-component";
import { CloudDirectoryUser } from "../model/CloudDirectoryUser";

export function UserManagementPage() {
  const { t } = useTranslation("appid");
  // const [pageSize, setPageSize] = useState<number>(5);
  const [users, setUsers] = useState<CloudDirectoryUsers>({
    totalResults: 0,
    itemsPerPage: 0,
    schemas: [],
    Resources: [],
  });
  const startIndex = 0;
  const count = 100;
  const query = "";

  const getUsers = async (payload: { startIndex?: number; count?: number; query?: string }) => {
    const searchParams = new URLSearchParams();
    if (payload.startIndex) {
      searchParams.append("startIndex", payload.startIndex.toString());
    }
    if (payload.count) {
      searchParams.append("count", payload.count.toString());
    }
    if (payload.query) {
      searchParams.append("query", payload.query);
    }
    const url = "/api/v1/appid/users?".concat(searchParams.toString());
    return await sendRequest({ url: url, method: "GET" });
  };

  useEffect(() => {
    getUsers({ startIndex: startIndex, count: count }).then((response: Response) => {
      if (response.ok) {
        response.json().then((cloudDirectoryUsers: CloudDirectoryUsers) => {
          setUsers(cloudDirectoryUsers);
        });
      }
    });
  }, [startIndex, count, query]);

  const columns = [
    { name: "ID", selector: (row: CloudDirectoryUser) => row.id },
    { name: "Name", selector: (row: CloudDirectoryUser) => row.displayName },
    { name: "User Name", selector: (row: CloudDirectoryUser) => row.userName },
    { name: "Emails", selector: (row: CloudDirectoryUser) => row.emails[0].value },
    { name: "Status", selector: (row: CloudDirectoryUser) => row.status },
    { name: "Active", selector: (row: CloudDirectoryUser) => row.active },
  ];

  return (
    <div className="page">
      <div className="title">{t("usermanagement.page_title")}</div>
      {users.Resources ? <DataTable columns={columns} data={users.Resources} /> : <></>}
    </div>
  );
}
