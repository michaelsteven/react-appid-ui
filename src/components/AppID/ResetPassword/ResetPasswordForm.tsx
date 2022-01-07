import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "../styles.css";

type LoginFormProps = {
  onSubmit: SubmitHandler<any>;
};

type FormData = {
  password: string;
  reenterPassword: string;
};

export default function ResetPasswordForm(props: LoginFormProps) {
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
      data-testid="component-resetpasswordform-div"
      onSubmit={handleSubmit((data: FormData) => onSubmit(data))}
    >
      <div className="row">
        <label>{t("resetpasswordform.password")}</label>
        {errors.password && <span>{errors.password.message}</span>}
        {errors.password && errors.password.type === "maxLength" && (
          <span>{t("resetpasswordform.maxlengthexceeded")}</span>
        )}
        <input
          type="password"
          {...register("password", {
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
        {errors.reenterpassword && errors.reenterpassword.type === "required" && (
          <span>{t("resetpasswordform.required")}</span>
        )}
        {errors.reenterpassword && <span>{t("resetpasswordform.passwordmatchinvalid")}</span>}
        <input
          type="password"
          {...register("reenterpassword", {
            required: true,
            validate: (value) => value === getValues("password"),
          })}
        />
      </div>
      <button type="submit" disabled={!isDirty || !isValid}>
        {t("resetpasswordform.submit")}
      </button>
    </form>
  );
}
