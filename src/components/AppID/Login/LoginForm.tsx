import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Credentials } from "../model";
import "../styles.css";

type LoginFormProps = {
  onSubmit: SubmitHandler<any>;
};

export default function LoginForm(props: LoginFormProps) {
  const { t } = useTranslation("appid");

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange" });
  const { onSubmit } = props;

  return (
    <form
      data-testid="component-loginpage-loginform-div"
      onSubmit={handleSubmit((data: Credentials) => onSubmit(data))}
    >
      <div className="row">
        <label>{t("loginform.email")}</label>
        {errors.email && <span>{errors.email.message}</span>}
        <input
          {...register("username", {
            required: {
              value: true,
              message: t("loginform.required"),
            },
            maxLength: {
              value: 100,
              message: t("loginform.maxlengthexceeded"),
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: t("loginform.patterninvalid"),
            },
          })}
        />
      </div>
      <div className="row">
        <label>{t("loginform.password")}</label>
        {errors.password && <span>{errors.password.message}</span>}
        {errors.password && errors.password.type === "maxLength" && (
          <span>{t("loginform.maxlengthexceeded")}</span>
        )}
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: t("loginform.required"),
            },
          })}
        />
      </div>
      <button type="submit" disabled={!isDirty || !isValid}>
        {t("loginform.submit")}
      </button>
    </form>
  );
}
