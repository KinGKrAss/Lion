# 🦁 Lion/Z1

**Royal KrAss Group** | Strukturierter Workspace für Status, Projekte, Dokumente, Energie und unterstützende Zoe-Analysen.

![License](https://img.shields.io/badge/license-Apache%202.0-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![Status](https://img.shields.io/badge/status-Verified%20Build-brightgreen)

---

## Überblick

Dieses Repository enthält die aktuell vorhandene **Lion/Z1**-Oberfläche als Vite/React-Frontend mit Express-Backend. Die UI arbeitet heute mit sechs vorhandenen Arbeitsmodulen:

- **CORE** – Systemstatus, Rollen, Einstellungen, Sicherheit
- **GAIA** – Immobilien, Grundstücke, Projekte, Karten
- **FORTUNA** – Einnahmen, Ausgaben, Cashflow, Berichte
- **ELECTRA** – Energieproduktion, Kennzahlen, CO₂-Auswertungen
- **DIPLOMATIE** – Dokumente, Verträge, Kontakte, Termine
- **ZOE AI** – Analysen, Zusammenfassungen, unterstützte Arbeitsabläufe und strategische Vorschläge

### Wichtige Leitplanken

- Lion/Z1 unterstützt **strukturierte Analysen und Arbeitsvorbereitung**.
- Die App verspricht **keine autonome Ausführung**, **keine finanziellen Freigaben** und **keine Ergebnisse ohne Nutzereingaben**.
- **FORTUNA** dient der Aufbereitung von Finanzdaten und ersetzt keine Finanzberatung.
- **Luna ist in diesem Repository derzeit nicht verdrahtet**. Eine Integration sollte erst erfolgen, wenn dafür ein klarer Modul- oder Serviceanschluss definiert ist.

---

## Verifikation

```bash
npm install
npm run lint
npm run build
npm test
```

Diese Befehle sind die vorgesehenen Checks für lokale Verifikation von TypeScript, Build und der minimalen Modul-/Landing-Testsuite.

---

## Schnellstart

### Voraussetzungen

- Node.js 18+
- npm
- optional: Gemini API Key für Chat-Antworten
- optional: SMTP-Zugangsdaten für Kontakt-E-Mails

### Installation

```bash
git clone https://github.com/KinGKrAss/Lion.git
cd Lion
npm install
cp .env.example .env.local
```

### Lokale Entwicklung

```bash
npm run dev
```

Einzeln startbare Modi:

```bash
npm run client:dev   # Frontend auf Port 3000
npm run server:dev   # Backend auf Port 5000
npm run lint         # TypeScript-Check
npm run build        # Produktionsbuild
npm test             # Minimaler Modul-/Landing-Check
```

---

## Architektur in Kurzform

- `src/App.tsx` steuert die Oberfläche über lokale Modi statt über einen Router:
  - `landing`
  - `setup`
  - `chat`
  - `todos`
- `src/constants.ts` enthält die zentralen Moduldefinitionen und die daraus abgeleiteten Chat-Szenarien.
- `src/components/LandingPage.tsx` verwendet dieselben Moduldaten wie die Szenarioauswahl, damit Anzeige und Chat-Kontext konsistent bleiben.
- `server.ts` stellt API-Endpunkte für Auth, Chat, Kontakte, Admin-Zugriff und Health bereit.

---

## API-Endpunkte

Vorhandene Endpunkte in `server.ts`:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/chat`
- `POST /api/chat/session`
- `POST /api/contact`
- `GET /api/contact/:id`
- `GET /api/admin/contacts`
- `PATCH /api/admin/contact/:id/status`
- `GET /api/health`

---

## Umgebungsvariablen

Beispiel in `.env.example`:

```env
VITE_API_URL=http://localhost:5000
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
APP_URL=http://localhost:5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin@kingkrass.com
```

---

## Offene manuelle Schritte

- `GEMINI_API_KEY` in `.env.local` setzen, wenn Chat-Antworten mit Gemini getestet werden sollen.
- Optional SMTP-Zugangsdaten eintragen, wenn das Kontaktformular E-Mails versenden soll.
- Eine echte **Luna**-Anbindung erst nach Festlegung von Datenfluss, Zuständigkeit und UI-Einstiegspunkt ergänzen.
