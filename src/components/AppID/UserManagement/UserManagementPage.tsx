import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "react-data-table-component";
import { sendRequest } from "../../common/sendRequest";
import { Role, UserProfile, Users } from "../model";
import { ExpandedUser } from "./ExpandedUser";
import { Loader } from "../../common/Loader";

export function UserManagementPage() {
  const { t } = useTranslation("appid");
  const [pending, setPending] = React.useState(true);
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

  const getRoles = () => {
    const url = "api/v1/appid/roles";
    return sendRequest({ url: url, method: "GET" });
  };

  const getUsers = (payload: { startIndex?: number; count?: number; query?: string }) => {
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
    return sendRequest({ url: url, method: "GET" });
  };

  useEffect(() => {
    getRoles().then((response: Response) => {
      if (response.ok) {
        response.json().then((payload: { roles: Array<Role> }) => {
          setRoles(payload.roles);
          setPending(false);
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
    {
      name: t("usermanagement.last"),
      selector: (row: UserProfile) => row.family_name,
      sortable: true,
    },
    {
      name: t("usermanagement.first"),
      selector: (row: UserProfile) => row.given_name,
      sortable: true,
    },
    {
      name: t("usermanagement.email"),
      selector: (row: UserProfile) => row.email,
      sortable: true,
      grow: 2,
    },
    {
      name: t("usermanagement.status"),
      selector: (row: UserProfile) => row.identities[0].idpUserInfo.status,
      sortable: true,
    },
    {
      name: t("usermanagement.active"),
      selector: (row: UserProfile) =>
        row.identities[0].idpUserInfo.active ? t("usermanagement.true") : t("usermanagement.false"),
      sortable: true,
    },
  ];

  const ExpandedComponent = (data: { data: UserProfile }) => (
    <ExpandedUser userProfile={data.data} roles={roles} />
  );

  const paginationOptions = {
    rowsPerPageText: t("usermanagement.rows_per_page"),
    rangeSeparatorText: t("usermanagement.of"),
    SelectAllRowsItemText: t("usermanagement.all"),
  };

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
          paginationComponentOptions={paginationOptions}
          progressPending={pending}
          progressComponent={<Loader />}
          noDataComponent={t("usermanagement.no_records")}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
