import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SectionTitle from "../../ui/SectionTitle/SectionTitle";
import Content from "../Content/Content";
import ConDevLogo from "../../../assets/img/logo-condev.webp";
import emailjs from "@emailjs/browser";
import "./index.css";
import React from "react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(t("contact.validation.firstName")),
      lastName: Yup.string().required(t("contact.validation.lastName")),
      email: Yup.string()
        .email(t("contact.validation.emailInvalid"))
        .required(t("contact.validation.emailRequired")),
      subject: Yup.string().required(t("contact.validation.subject")),
      message: Yup.string().required(t("contact.validation.message")),
    }),
    onSubmit: (values, { resetForm }) => {
      emailjs
        .send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          values,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )
        .then(
          () => {
            toast.success(t("contact.toast.success"));
            resetForm();
          },
          () => {
            toast.error(t("contact.toast.error"));
          }
        );
    },
  });

  const handleErrors = () => {
    const errors = formik.errors;
    const touched = formik.touched;
    const firstErrorKey = Object.keys(errors).find((key) => touched[key]);
    if (firstErrorKey) {
      toast.error(errors[firstErrorKey]);
    }
  };

  return (
    <Content>
      <section className="contact-container" id="contact">
        <SectionTitle title={t("contact.title")} />
        <div className="contact-content mt-5 d-flex justify-content-center align-items-center flex-column">
          <img
            src={ConDevLogo}
            alt={t("contact.altLogo")}
            className="condev-logo-contact mt-3 pt-2 pt-md-0 mt-md-5"
            loading="lazy"
          />
          <div className="w-100 mt-4 pt-2 pt-lg-0 mt-md-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
                if (
                  Object.keys(formik.errors).length > 0 &&
                  formik.submitCount > 0
                ) {
                  handleErrors();
                }
              }}
              className="d-flex flex-column align-items-center justify-content-center w-100 contact-form mt-md-4 mx-auto"
              noValidate
            >
              <h3 className="mt-4 pt-2">{t("contact.heading")}</h3>

              <input
                type="text"
                placeholder={t("contact.placeholders.firstName")}
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                required
              />

              <input
                type="text"
                placeholder={t("contact.placeholders.lastName")}
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                required
              />

              <input
                type="email"
                placeholder={t("contact.placeholders.email")}
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
              />

              <input
                type="text"
                placeholder={t("contact.placeholders.subject")}
                name="subject"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subject}
                required
              />

              <textarea
                placeholder={t("contact.placeholders.message")}
                className="mb-3"
                name="message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                required
                rows="5"
              />

              <button type="submit" className="mt-5">
                {t("contact.button")}
              </button>
            </form>
          </div>
        </div>
      </section>

      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={5000}
      />
    </Content>
  );
};

export default React.memo(Contact);
