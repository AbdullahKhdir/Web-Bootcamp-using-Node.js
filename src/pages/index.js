import React from 'react';

import Layout from '../components/Layout';
// import { Link } from 'gatsby';
import Sidebar from '../components/Sidebar';
import config from '../../config';
const IndexPage = () => (
  <Layout>
    <Sidebar />
    <div className="container-fluid p-0">
      <section
        className="resume-section p-3 p-lg-5 d-flex align-items-center"
        id="about"
      >
        <div className="w-100">
          <h1 className="mb-0">
            {config.firstName}
            <span className="text-primary"> {config.lastName}</span>
          </h1>
          <div className="subheading mb-5">
            {config.address} · {config.phone} ·
            <a href={`mailto:${config.email}`}>{config.email}</a>
          </div>
          <p className="lead mb-5">
              Ich bin Abdullah, Khdir, 24 Jahre alt und komme aus Syrien. Ich bin seit 5 Jahren in Deutschland und absolviere gerade
              eine Ausbildung als Fachinformatiker für Anwendungsentwicklung bei der Deutschen Telekom AG.
              Während meiner Ausbildung habe ich Erfahrungen in unterschiedlichen Bereichen gesammelt, die in der Telekommunikationswelt wichtig sind und in der IT-Welt als Programmierer benötigt werden.
              Ich habe auch Erfahrungen in dem Automatisierungsbereich, wo unterschiedliche Netzkomponenten durch Agenten gesteuert und automatisiert werden können. In der Ausbildung habe ich an einem Projekt gearbeitet, dass sich mit der Entwicklung vom SNMP-Agent befasst, welches später für die Steuerung und Automatisierung von Power-Distribution-Units eingesetzt wurde. Zusätzlich habe ich mit der Entwicklung von automatisierten System-Tests die Qualität des Projekts geprüft. Außerdem sammelte ich Wissen über die Entwicklung von Web-Applikationen mit der Nutzung von umfangreichen Technologien, als auch Erfahrungen für den Entwurf und Entwicklung von Oberflächen (GUI).
          </p>
          <div className="social-icons">
            {config.socialLinks.map(social => {
              const { icon, url } = social;
              return (
                <a key={url} href={url}>
                  <i className={`fab ${icon}`}></i>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      <hr className="m-0" />
      <section
        className="resume-section p-3 p-lg-5 d-flex justify-content-center"
        id="experience"
      >
        <div className="w-100">
          <h2 className="mb-5">Erfahrungen</h2>
          <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
            <div className="resume-content">
              <h3 className="mb-0">Autiomatisierungsbereich</h3>
              <div className="subheading mb-3">Deutsche Telekom Technik GmbH</div>
              <p>
                Ich habe ein SNMP-Agent der Hilfe von Programmiersprahe Java entwickelt,
                welcher zur Steuerung von Power-Distribution-Units durch SNMP-Protokoll dient.
                Ebenso habe ich an unterschiedlichen Automatisierungs-Lösungen gearbeitet,
                die Netzkomponenten durch den Agent automatisiert werden können.
              </p>
            </div>
            <div className="resume-date text-md-right">
              <span className="text-primary">März 2021 - Präsens</span>
            </div>
          </div>
          <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
            <div className="resume-content">
              <h3 className="mb-0">Entwicklung Web-Applikationen</h3>
              <div className="subheading mb-3">Berufliche Entwicklung</div>
              <p>
                Durch verschiedene Projekte könnte ich im Bereich Entwicklung von Web-Applikationen mit der Nutzung von MERN-Technologien Kenntnisse aneigenen.
                Zusätzlich bin ich auch mit separaten Frontends-Applikationen vertraut.
              </p>
            </div>
            <div className="resume-date text-md-right">
              <span className="text-primary">Februar 2021</span>
            </div>
          </div>
          <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
            <div className="resume-content">
              <h3 className="mb-0">Entwicklung von Graphical User Interface</h3>
              <div className="subheading mb-3">Deutsche Telekom Technik GmbH</div>
              <p>
                Ich habe eine Graphical-User-Interface mit der Hilfe von Programmiersprahe Java für ein Power-Distribution-Unit-Device entwickelt, die die Funktionalitäten des Produkts steuert
                und überwacht.
              </p>
            </div>
            <div className="resume-date text-md-right">
              <span className="text-primary">August 2020</span>
            </div>
          </div>
          <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
            <div className="resume-content">
              <h3 className="mb-0">Entwicklung und Betreuung von Datenbank</h3>
              <div className="subheading mb-3">Deutsche Telekom Technik GmbH</div>
              <p>
                Ich habe eine Oberfläche für eine Datenbank mit der Nutzung von MS-Access entwickelt und betreut,
                die sich mit den Tools aller Abteilungen befasst.
              </p>
            </div>
            <div className="resume-date text-md-right">
              <span className="text-primary">Dezember 2020</span>
            </div>
          </div>
          </div>
      </section>

      <hr className="m-0" />

      <section
        className="resume-section p-3 p-lg-5 d-flex align-items-center"
        id="education"
      >
        <div className="w-100">
          <h2 className="mb-5">BERUFLICHER WERDEGANG</h2>

          <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
            <div className="resume-content">
                <h3 className="mb-0">Fachinformatiker als Anwendungsentwickler</h3>
              <div className="subheading mb-3">Ausbildung bei der Deutschen Telekom AG in Nürnberg</div>
              <div>Umfangreichen Themen in der Telekommunikationswelt, spezifisch in dem Automatisierungsbereich</div>
                <p></p>
            </div>
            <div className="resume-date text-md-right">
              <span className="text-primary">September 2018 - September 2021</span>
            </div>
          </div>

          <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
            <div className="resume-content">
                <h3 className="mb-0">Sprachliche Kenntnisse</h3>
              <div className="subheading mb-3">Universität Oldenburg</div>
              <div>Abschluss Sprachkurs DSH-1 mit Zertifikat</div>
                <p>Ich verfüge auch über sehr gute Kenntnisse in englische Sprache</p>
            </div>
            <div className="resume-date text-md-right">
              <span className="text-primary">März 2017 - Februar 2018</span>
            </div>
          </div>

          <div className="resume-item d-flex flex-column flex-md-row justify-content-between">
            <div className="resume-content">
              <h3 className="mb-0">Al Imam Ali Senior High School, Amman</h3>
              <div className="subheading mb-3">Gymnasium Abitur</div>
                <p></p>
              </div>
              <div className="resume-date text-md-right">
                <span className="text-primary">September 2013 - Mai 2015</span>
              </div>
            </div>
          </div>

      </section>

      <hr className="m-0" />

      <section
        className="resume-section p-3 p-lg-5 d-flex align-items-center"
        id="skills"
      >
        <div className="w-100">
          <h2 className="mb-5">KENNTNISSE</h2>

          <div className="subheading mb-3">
            Programmiersprachen &amp; Tools
          </div>
          <ul className="list-inline dev-icons">
            <li className="list-inline-item">
            <i className="fab fa-java"></i>
            </li>
            <li className="list-inline-item">
              <i class="fab fa-cuttlefish">++</i>
            </li>
            <li className="list-inline-item">
              <i class="fab fa-cuttlefish">#</i>
            </li>
            <li className="list-inline-item">
              <i className="fab fa-html5"></i>
            </li>
            <li className="list-inline-item">
              <i className="fab fa-css3-alt"></i>
            </li>
            <li className="list-inline-item">
              <i className="fab fa-js-square"></i>
            </li>
            <li className="list-inline-item">
              <i className="fab fa-react"></i>
            </li>
            <li className="list-inline-item">
              <i className="fab fa-node-js"></i>
            </li>
            <li className="list-inline-item">
              <i className="fab fa-npm"></i>
            </li>
          </ul>

          <div className="subheading mb-3">Workflow</div>
          <ul className="fa-ul mb-0">
            <li>
            <i className="fa-li fa fa-check"></i>
              Cross Functional Teams
            </li>
            <li>
            <i className="fa-li fa fa-check"></i>
              Agile Development &amp; Scrum
            </li>
            <li>
            <i className="fa-li fa fa-check"></i>
              EDV
            </li>
          </ul>
        </div>
      </section>

      <hr className="m-0" />

      <section
        className="resume-section p-3 p-lg-5 d-flex align-items-center"
        id="interests"
      >
        <div className="w-100">
          <h2 className="mb-5">INTERESSEN</h2>
          <p>
              Lernen von den neuen Technologien, die die IT-Welt allen bereichen umdreht.
              Spezifisch die Programmierungstechnologien, die im Praxis häufig eingestzt sind.
          </p>
          <p className="mb-0">
              Ich mag reisen, und neue Orte, Eigenschaften, Kulturen und Menschen kennenzulernen.
          </p>
        </div>
      </section>
    </div>
  </Layout>
);

export default IndexPage;
