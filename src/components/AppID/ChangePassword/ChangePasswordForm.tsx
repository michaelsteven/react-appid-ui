import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "../styles.css";

type FormProps = {
  onSubmit: SubmitHandler<any>;
};

type FormData = {
  newPassword: string;
  reenterPassword: string;
};

export default function ChangePasswordForm(props: FormProps) {
  const { t } = useTranslation("appid");
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange" });
  const { onSubmit } = props;

  return (
    <form
      data-testid="component-changepasswordform-div"
      onSubmit={handleSubmit((data: { [x: string]: FormData }) => onSubmit(data))}
    >
      <div className="row">
        <label>{t("changepasswordform.password")}</label>
        {errors.newPassword && <span>{errors.newPassword.message}</span>}
        {errors.newPassword && errors.newPassword.type === "maxLength" && (
          <span>{t("changepasswordform.maxlengthexceeded")}</span>
        )}
        <input
          type="password"
          {...register("newPassword", {
            required: {
              value: true,
              message: t("changepasswordform.required"),
            },
            minLength: {
              value: 8,
              message: t("changepasswordform.underminlength"),
            },
            maxLength: {
              value: 100,
              message: t("changepasswordform.maxlengthexceeded"),
            },
          })}
        />
      </div>
      <div className="row">
        <label>{t("changepasswordform.reenterpassword")}</label>
        {errors.reenterPassword && errors.reenterPassword.type === "required" && (
          <span>{t("changepasswordform.required")}</span>
        )}
        {errors.reenterPassword && <span>{t("changepasswordform.passwordmatchinvalid")}</span>}
        <input
          type="password"
          {...register("reenterPassword", {
            required: true,
            validate: (value) => value === getValues("newPassword"),
          })}
        />
      </div>
      <button type="submit" disabled={!isDirty || !isValid}>
        {t("changepasswordform.submit")}
      </button>
    </form>
  );
}
