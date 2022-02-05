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

export default function ResetPasswordForm(props: FormProps) {
  const { t } = useTranslation("appid");
  const {
    getValues,
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange" });
  const { onSubmit } = props;

  React.useEffect(() => {
    setFocus("password");
  }, [setFocus]);

  return (
    <form
      data-testid="component-resetpasswordform-div"
      onSubmit={handleSubmit((data: { [x: string]: FormData }) => onSubmit(data))}
    >
      <div className="row">
        <label>{t("resetpasswordform.password")}</label>
        {errors.newPassword && <span>{errors.newPassword.message}</span>}
        {errors.newPassword && errors.newPassword.type === "maxLength" && (
          <span>{t("resetpasswordform.maxlengthexceeded")}</span>
        )}
        <input
          type="password"
          {...register("newPassword", {
            required: {
              value: true,
              message: t("resetpasswordform.required"),
            },
            minLength: {
              value: 8,
              message: t("resetpasswordform.underminlength"),
            },
            maxLength: {
              value: 100,
              message: t("resetpasswordform.maxlengthexceeded"),
            },
          })}
        />
      </div>
      <div className="row">
        <label>{t("resetpasswordform.reenterpassword")}</label>
        {errors.reenterPassword && errors.reenterPassword.type === "required" && (
          <span>{t("resetpasswordform.required")}</span>
        )}
        {errors.reenterPassword && <span>{t("resetpasswordform.passwordmatchinvalid")}</span>}
        <input
          type="password"
          {...register("reenterPassword", {
            required: true,
            validate: (value) => value === getValues("newPassword"),
          })}
        />
      </div>
      <button type="submit" disabled={!isDirty || !isValid}>
        {t("resetpasswordform.submit")}
      </button>
    </form>
  );
}
