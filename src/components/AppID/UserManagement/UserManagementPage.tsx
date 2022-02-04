import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "react-data-table-component";
import { sendRequest } from "../../common/sendRequest";
import { Role, UserProfile, Users } from "../model";
import { ExpandedUser } from "./ExpandedUser";

export function UserManagementPage() {
  const { t } = useTranslation("appid");
  // const [pageSize, setPageSize] = useState<number>(5);
  const [pagedUsers, setPagedUsers] = useState<Users>({
    totalResults: 0,
    itemsPerPage: 0,
    requestOptions: { count: 0 },
    users: [],
  });
  const [roles, setRoles] = useState<Array<Role>>([]);
  const startIndex = 0;
  const count = 100;
  const query = "";

  const getRoles = async () => {
    const url = "api/v1/appid/roles";
    return await sendRequest({ url: url, method: "GET" });
  };

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
    getRoles().then((response: Response) => {
      if (response.ok) {
        response.json().then((payload: { roles: Array<Role> }) => {
          setRoles(payload.roles);
        });
      }
    });
  }, []);

  useEffect(() => {
    getUsers({ startIndex: startIndex, count: count }).then((response: Response) => {
      if (response.ok) {
        response.json().then((payload: Users) => {
          console.log(payload);
          setPagedUsers(payload);
        });
      }
    });
  }, [startIndex, count, query]);

  const columns = [
    { name: "Last", selector: (row: UserProfile) => row.family_name, sortable: true },
    { name: "First", selector: (row: UserProfile) => row.given_name, sortable: true },
    { name: "Email", selector: (row: UserProfile) => row.email, sortable: true, grow: 2 },
    {
      name: "Status",
      selector: (row: UserProfile) => row.identities[0].idpUserInfo.status,
      sortable: true,
    },
    {
      name: "Active",
      selector: (row: UserProfile) => String(row.identities[0].idpUserInfo.active),
      sortable: true,
    },
  ];

  const ExpandedComponent = (data: { data: UserProfile }) => (
    <ExpandedUser userProfile={data.data} roles={roles} />
  );

  return (
    <div className="page">
      <div className="title">{t("usermanagement.page_title")}</div>
      {pagedUsers.users ? (
        <DataTable
          columns={columns}
          data={pagedUsers.users}
          expandableRowsComponent={ExpandedComponent}
          pagination
          expandableRows={true}
          expandOnRowClicked={false}
          expandOnRowDoubleClicked={false}
          expandableRowsHideExpander={false}
          dense
        />
      ) : (
        <></>
      )}
    </div>
  );
}
