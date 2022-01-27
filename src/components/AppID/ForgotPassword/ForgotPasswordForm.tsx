import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";

type FormProps = {
  onSubmit: SubmitHandler<any>;
};

export type FormData = {
  username: string;
};

export default function ForgotPasswordForm(props: FormProps) {
  const { t } = useTranslation("appid");
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange" });
  const { onSubmit } = props;

  return (
    <form
      data-testid="component-forgotpasswordpage-forgotpasswordform-div"
      onSubmit={handleSubmit((data: { [x: string]: FormData }) => onSubmit(data))}
    >
      <div className="row">
        <label>{t("forgotpasswordform.email")}</label>
        {errors.email && <span>{errors.email.message}</span>}
        <input
          {...register("username", {
            required: {
              value: true,
              message: t("forgotpasswordform.required"),
            },
            maxLength: {
              value: 100,
              message: t("forgotpasswordform.maxlengthexceeded"),
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: t("forgotpasswordform.patterninvalid"),
            },
          })}
        />
      </div>
      <button type="submit" disabled={!isDirty || !isValid}>
        {t("forgotpasswordform.submit")}
      </button>
    </form>
  );
}
