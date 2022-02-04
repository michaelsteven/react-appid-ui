import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const { i18n } = useTranslation();

  const changeLanguage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, lng: string) => {
    e.preventDefault();
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="language-selector">
      <button onClick={toggling}>
        <img src="/assets/icons/icon-language.svg" alt="" />
      </button>
      {isOpen && (
        <div className="menu">
          <div
            onClick={(e) => {
              changeLanguage(e, "en");
            }}
          >
            <input
              type="radio"
              name="language"
              onChange={undefined}
              checked={i18n.resolvedLanguage === "en"}
            />{" "}
            English
          </div>
          <div
            onClick={(e) => {
              changeLanguage(e, "fr_FR");
            }}
          >
            <input
              type="radio"
              name="language"
              onChange={undefined}
              checked={i18n.resolvedLanguage === "fr_FR"}
            />{" "}
            Français
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
