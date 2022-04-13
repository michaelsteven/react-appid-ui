import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { Loader } from "../../common/Loader";
import { Locale, Locales } from "../model";
import supportedLocales from "./supportedLocales.json";

type SupportedLocalesListProps = {
  languages: Array<string>;
  onRowSelected: any;
};

export function SupportedLocalesList(props: SupportedLocalesListProps) {
  const { t } = useTranslation("appid");
  const [pending, setPending] = useState(true);
  const [pagedLocales, setPagedLocales] = useState<Locales>({
    totalResults: 0,
    itemsPerPage: 0,
    requestOptions: { count: 0 },
    locales: [],
  });
  const rowSelectCritera = (row: any) => props.languages.includes(row.code);

  const columns = [
    {
      name: t("supportedlocales.code"),
      selector: (row: Locale) => row.code,
      sortable: true,
    },
    {
      name: t("supportedlocales.language"),
      selector: (row: Locale) => row.language,
      sortable: true,
    },
    {
      name: t("supportedlocales.region"),
      selector: (row: Locale) => (row.region ? row.region : ""),
      sortable: true,
    },
  ];

  const paginationOptions = {
    rowsPerPageText: t("supportedlocales.rows_per_page"),
    rangeSeparatorText: t("supportedlocales.of"),
    SelectAllRowsItemText: t("supportedlocales.all"),
  };

  useEffect(() => {
    setPagedLocales({
      totalResults: 0,
      itemsPerPage: 0,
      requestOptions: { count: 0 },
      locales: supportedLocales,
    });
    setPending(false);
  }, []);

  const handleChange = (eventData: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Array<Locale>;
  }) => {
    if (
      !eventData.selectedRows.every((locale) => props.languages.includes(locale.code)) ||
      eventData.selectedCount !== props.languages.length
    ) {
      props.onRowSelected(eventData.selectedRows);
    }
  };

  return (
    <>
      {pagedLocales.locales ? (
        <DataTable
          columns={columns}
          data={pagedLocales.locales}
          pagination
          dense
          paginationComponentOptions={paginationOptions}
          progressPending={pending}
          progressComponent={<Loader />}
          noDataComponent={t("supportedlocales.no_records")}
          selectableRows
          onSelectedRowsChange={handleChange}
          selectableRowSelected={rowSelectCritera}
        />
      ) : (
        <></>
      )}
    </>
  );
}
