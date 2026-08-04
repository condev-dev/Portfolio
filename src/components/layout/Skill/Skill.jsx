import SectionTitle from "../../ui/SectionTitle/SectionTitle";
import Content from "../Content/Content";
import "./index.css";
import React from "react";
import { useTranslation } from "react-i18next";

const Skill = () => {
  const { t } = useTranslation();

  const skills = [
    { name: "HTML5", level: "professional", progress: 95 },
    { name: "CSS3", level: "professional", progress: 95 },
    { name: "JavaScript (ES6+)", level: "professional", progress: 95 },
    { name: "React.js", level: "advanced", progress: 80 },
    { name: "Next.js", level: "advanced", progress: 80 },
    { name: "Redux / RTK", level: "professional", progress: 95 },
    { name: "Tailwind CSS", level: "advanced", progress: 80 },
    { name: "Framer Motion", level: "professional", progress: 95 },
    { name: "Material-UI (MUI)", level: "professional", progress: 95 },
    { name: "Bootstrap", level: "professional", progress: 95 },
    { name: "Sass / SCSS", level: "advanced", progress: 80 },
    { name: "Node.js", level: "intermediate", progress: 65 },
    { name: "RESTful APIs", level: "advanced", progress: 80 },
    { name: "Git & GitHub", level: "professional", progress: 95 },
    { name: "PWA", level: "professional", progress: 95 },
    { name: "Testing (Jest, RTL)", level: "advanced", progress: 80 },
    { name: "Technical SEO", level: "professional", progress: 95 },
    { name: "Figma", level: "professional", progress: 95 },
    { name: "Adobe XD", level: "professional", progress: 95 },
    { name: "C# (.NET Basics)", level: "intermediate", progress: 65 },
  ];

  return (
    <div className="skill-bg">
      <Content>
        <section
          className="skill-container"
          id="skills"
          aria-labelledby="skills-title"
        >
          <SectionTitle title={t("skills.title")} id="skills-title" />

          <div className="skill-content mt-5" role="list">
            {skills.map((skill, index) => (
              <article className="progress-item" key={index} role="listitem">
                <div className="d-flex justify-content-between align-items-center flex-row-reverse">
                  <h3 className="h6 mb-0">{skill.name}</h3>
                  <span
                    className="skill-level"
                    aria-label={`${t("skills.levelLabel")}: ${t(
                      `skills.levels.${skill.level}`
                    )}`}
                  >
                    {t(`skills.levels.${skill.level}`)}
                  </span>
                </div>

                <div
                  className="progress mt-3"
                  role="progressbar"
                  aria-valuenow={skill.progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: `${skill.progress}%` }}
                    aria-hidden="true"
                  >
                    <span className="visually-hidden">{skill.progress}%</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Content>
    </div>
  );
};

export default React.memo(Skill);
