import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "react-data-table-component";
import { useDialogState, Dialog, DialogBackdrop, DialogDisclosure } from "reakit/Dialog";
import { Languages, Locales, Locale } from "../model";
import { sendRequestWithAuth } from "../../common/sendRequest";
import { Loader } from "../../common/Loader";
import supportedLocales from "./supportedLocales.json";
import { SupportedLocalesList } from "./SupportedLocalesList";

const getLanguages = () => {
  const url = "api/v1/appid/languages";
  return sendRequestWithAuth({ url: url, method: "GET" });
};

const putLocales = (codes: Array<string>) => {
  return sendRequestWithAuth({
    url: "/api/v1/appid/languages",
    method: "PUT",
    body: JSON.stringify({ languages: codes }),
  });
};

export function SupportedLocalesPage() {
  const [pending, setPending] = useState(true);
  const [reload, setReload] = useState(true);
  const { t } = useTranslation("appid");
  const [languages, setLanguages] = useState<Array<string>>([]);
  const [pagedLocales, setPagedLocales] = useState<Locales>({
    totalResults: 0,
    itemsPerPage: 0,
    requestOptions: { count: 0 },
    locales: [],
  });
  const dialog = useDialogState();

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
    getLanguages().then((response: Response) => {
      if (response.ok) {
        response.json().then((result: Languages) => {
          let locales = {
            totalResults: 0,
            itemsPerPage: 0,
            requestOptions: { count: 0 },
            locales: [],
          } as Locales;
          setLanguages(result.languages);
          result.languages.forEach(function (number, index, array) {
            const locale = supportedLocales.find((locale: Locale) => locale.code === array[index]);
            if (locale) {
              locales.locales.push(locale);
            }
          });
          setPagedLocales(locales);
          setPending(false);
        });
      }
    });
  }, [reload]);

  const handleLanguageAdded = (e: Array<Locale>) => {
    console.log(e.map((locale: Locale) => locale.code));
    dialog.hide();
    setPending(true);
    putLocales(e.map((locale: Locale) => locale.code));
    setReload(!reload);
  };

  return (
    <div className="page">
      <div>
        <div className="title">{t("supportedlocales.page_title")}</div>
        <div>
          <DialogDisclosure {...dialog}>{t("supportedlocales.add_language")}</DialogDisclosure>
          <DialogBackdrop {...dialog}>
            <Dialog
              {...dialog}
              aria-label={t("supportedlocales.add_language")}
              style={{ position: "static", transform: "none" }}
            >
              <div
                style={{
                  top: "50%",
                  transform: "translate(0, -50%)",
                  border: "1px solid #000000",
                  margin: "auto",
                  width: "400px",
                  alignContent: "center",
                }}
              >
                <SupportedLocalesList onRowSelected={handleLanguageAdded} languages={languages} />
              </div>
            </Dialog>
          </DialogBackdrop>
        </div>
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
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
