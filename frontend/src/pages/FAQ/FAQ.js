import "./faq.scss";
import { useTranslation } from 'react-i18next';

function FAQ() {
  const {t} = useTranslation();
  return (
    <div className="faq-container">
      <ol className="paragraph-container">
        <div className="paragraph-item">
          <h1>{t("faq")}</h1>
        </div>
        <li className="paragraph-item p-list">
          <h3 className="p-header">{t("faq-question-1")}</h3>
          <p>
            {t("faq-answer-1.1")}
          </p>
          <br />
          <p>{t("faq-answer-1.2")}</p>
        </li>
        <li className="paragraph-item p-list">
          <h3 className="p-header">{t("faq-question-2")}</h3>
          <p>
            {t("faq-answer-2.1")}
          </p>
          <br />
          <p>
            {t("faq-answer-2.2")}
          </p>
        </li>
        <li className="paragraph-item p-list">
          <h3 className="p-header">{t("faq-question-3")}</h3>
          <p>
            {t("faq-answer-3")}
          </p>
        </li>
        <li className="paragraph-item p-list">
          <h3 className="p-header">
            {t("faq-question-4")}
          </h3>
          <p>
            {t("faq-answer-4.1")}
            <br />
            {t("faq-answer-4.2")}
          </p>
        </li>
        <li className="paragraph-item p-list">
          <h3 className="p-header">
            {t("faq-question-5")}
          </h3>
          <p>
            {t("faq-answer-5.1")}
          </p>
          <br />
          <p>
            {t("faq-answer-5.2")}
          </p>
        </li>
        <li className="paragraph-item p-list">
          <h3 className="p-header">
            {t("faq-question-6")}
          </h3>
          <p>
            {t("faq-answer-6")}
          </p>
        </li>
        <li className="paragraph-item p-list">
          <h3 className="p-header">{t("faq-question-7")}</h3>
          <p>
            {t("faq-answer-7")}
          </p>
        </li>
        <li className="paragraph-item p-list">
          <h3 className="p-header">{t("faq-question-8")}</h3>
          <p>
            {t("faq-answer-8")}
          </p>
        </li>
        <li className="paragraph-item p-list">
          <h3 className="p-header">{t("faq-question-9")}</h3>
          <p>
            {t("faq-answer-9")}
          </p>
        </li>
        <li className="paragraph-item p-list">
          <h3 className="p-header">{t("faq-question-10")}</h3>
          <p>
            {t("faq-answer-10")}
          </p>
        </li>
        <li className="paragraph-item p-list">
          <h3 className="p-header">{t("faq-question-11")}</h3>
          <p>
            {t("faq-answer-11")}
          </p>
        </li>
        <li className="paragraph-item">
          <h2>{t("faq-question-12")}</h2>
        </li>
        <li className="paragraph-item p-list">
          <h3 className="p-header">{t("faq-question-13")}</h3>
          <p>
            {t("faq-answer-13")}
          </p>
        </li>
        <li className="paragraph-item p-list">
          <h3 className="p-header">
            {t("faq-question-14")}
          </h3>
          <h4>{t("faq-answer-14.1")}</h4>
          <p>
           {t("faq-answer-14.2")}
          </p>
          <br />
          <h4>{t("faq-answer-14.3")}</h4>
          <p>
            {t("faq-answer-14.4")}
          </p>
          <br />

          <h4>{t("faq-answer-14.5")}</h4>
          <p>
            {t("faq-answer-14.6")}
          </p>
        </li>
        <li className="paragraph-item p-list">
          <h3 className="p-header">{t("faq-question-15")}</h3>
          <p>
            {t("faq-answer-15")}
          </p>
        </li>
      </ol>
    </div>
  );
}

export default FAQ;
