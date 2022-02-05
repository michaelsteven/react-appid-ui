import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Account } from "../model";
import "../styles.css";

type SignupFormProps = {
  onSubmit: SubmitHandler<any>;
};

type FormData = Account & {
  reenterPassword: string;
};

export default function SignupForm(props: SignupFormProps) {
  const { t } = useTranslation("appid");
  const { onSubmit } = props;
  const {
    getValues,
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  React.useEffect(() => {
    setFocus("firstName");
  }, [setFocus]);

  return (
    <form
      data-testid="component-signuppage-signupform-div"
      onSubmit={handleSubmit((data: { [x: string]: FormData }) => onSubmit(data))}
    >
      <div className="row">
        <label>{t("signupform.firstname")}</label>
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <input
          {...register("firstName", {
            required: {
              value: true,
              message: t("signupform.required"),
            },
            maxLength: {
              value: 40,
              message: t("signupform.maxlengthexceeded"),
            },
          })}
        />
      </div>
      <div className="row">
        <label>{t("signupform.lastname")}</label>
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <input
          {...register("lastName", {
            required: {
              value: true,
              message: t("signupform.required"),
            },
            maxLength: {
              value: 40,
              message: t("signupform.maxlengthexceeded"),
            },
          })}
        />
      </div>
      <div className="row">
        <label>{t("signupform.email")}</label>
        {errors.email && <span>{errors.email.message}</span>}
        <input
          {...register("email", {
            required: {
              value: true,
              message: t("signupform.required"),
            },
            maxLength: {
              value: 100,
              message: t("signupform.maxlengthexceeded"),
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: t("signupform.patterninvalid"),
            },
          })}
        />
      </div>
      <div className="row">
        <label>{t("signupform.password")}</label>
        {errors.password && <span>{errors.password.message}</span>}
        {errors.password && errors.password.type === "maxLength" && (
          <span>{t("signupform.maxlengthexceeded")}</span>
        )}
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: t("signupform.required"),
            },
            minLength: {
              value: 8,
              message: t("signupform.underminlength"),
            },
            maxLength: {
              value: 100,
              message: t("signupform.maxlengthexceeded"),
            },
          })}
        />
      </div>
      <div className="row">
        <label>{t("signupform.reenterpassword")}</label>
        {errors.reenterpassword && errors.reenterpassword.type === "required" && (
          <span>{t("signupform.required")}</span>
        )}
        {errors.reenterpassword && <span>{t("signupform.passwordmatchinvalid")}</span>}
        <input
          type="password"
          {...register("reenterpassword", {
            required: true,
            validate: (value) => value === getValues("password"),
          })}
        />
      </div>
      <button type="submit" disabled={!isDirty || !isValid}>
        {t("signupform.submit")}
      </button>
    </form>
  );
}
