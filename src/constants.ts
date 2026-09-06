import { IntegrationDefinition, Language, ModuleDefinition, Scenario } from './types';

export const LION_SYSTEM_PROMPT = `Name: Lion/Z1
Version: 3.0
Codename: Lion Core

MISSION
Du bist Lion/Z1, das zentrale Betriebssystem des Projekts. Deine Aufgabe ist es, Informationen zu organisieren, Projekte zu verwalten, Analysen zu erstellen und den Nutzer bei Entscheidungen zu unterstützen.

MODULE
1. CORE - Benutzerverwaltung, Rollen, Einstellungen, Sicherheit, Systemstatus
2. GAIA - Immobilien, Grundstücke, Mietverträge, Projekte, Karten
3. FORTUNA - Einnahmen, Ausgaben, Cashflow, Vermögensübersicht, Berichte
4. ELECTRA - Windparks, Solaranlagen, Energieproduktion, CO₂-Auswertungen
5. DIPLOMATIE - Dokumente, Verträge, Kontakte, Termine
6. ZOE AI - Analysen, Zusammenfassungen, unterstützte Arbeitsabläufe, strategische Vorschläge

REGELN
- Antworte strukturiert.
- Trenne Fakten von Annahmen.
- Weise auf Unsicherheiten hin.
- Begründe Empfehlungen.
- Versprich keine autonomen Ausführungen, Transaktionen oder finanziellen Entscheidungen.
- Speichere keine Informationen dauerhaft ohne ausdrückliche Anweisung.

AUSGABEFORMAT
Status
Module
Analyse
Empfehlung
Nächste Schritte`;

export const LANGUAGES: Language[] = [
  { id: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', voiceCode: 'de-DE' },
  { id: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', voiceCode: 'en-US' },
];

export const LANDING_PAGE_COPY = {
  heroDescription:
    'Lion/Z1 ist das zentrale Betriebssystem für Projektorganisation, Analyse und Entscheidungen – mit Modulen für Core, Immobilien, Finanzen, Energie, Diplomatie und ZOE AI.',
  capabilityNoticeTitle: 'Aktueller Funktionsrahmen',
  capabilityNoticeBody:
    'Diese Oberfläche unterstützt strukturierte Analysen und Arbeitsvorbereitung. Sie verspricht keine autonomen Aktionen, keine finanziellen Freigaben und keine Ergebnisse ohne deine Eingaben.',
  moduleSectionId: 'module-overview',
  moduleSectionHref: '#module-overview',
} as const;

export const MODULE_DEFINITIONS: ModuleDefinition[] = [
  {
    id: 'core',
    title: 'CORE – Systemstatus',
    description: 'Benutzer, Rollen, Einstellungen, Sicherheit und Systemstatus strukturieren.',
    status: 'Bereit für strukturierte Bestandsaufnahmen.',
    capabilitySummary: 'Ordnet Rollen, Einstellungen und Systemstatus aus vorhandenen Informationen.',
    guardrail: 'Trennt belegte Zustände von offenen Annahmen.',
    initialMessage: 'Status\nLion/Z1 Core ist bereit.\n\nModule\nCORE ist aktiv.\n\nAnalyse\nIch kann Rollen, Einstellungen, Sicherheit und Systemstatus strukturiert erfassen.\n\nEmpfehlung\nBeginnen wir mit dem aktuellen Ziel oder einer offenen Entscheidung.\n\nNächste Schritte\nNenne mir den Bereich, den ich ordnen soll.',
    systemPrompt: 'Fokussiere auf CORE: Benutzerverwaltung, Rollen, Einstellungen, Sicherheit und Systemstatus. Erstelle klare Bestandsaufnahmen und sichere Entscheidungsgrundlagen.',
    icon: '🛡️'
  },
  {
    id: 'gaia',
    title: 'GAIA – Immobilien',
    description: 'Immobilien, Grundstücke, Mietverträge, Projekte und Karten verwalten.',
    status: 'Bereit für Objekt- und Projektdokumentation.',
    capabilitySummary: 'Strukturiert Immobilien-, Vertrags- und Projektdaten ohne fehlende Angaben zu erfinden.',
    guardrail: 'Kennzeichnet Lücken bei Dokumenten, Standorten und Vertragsständen.',
    initialMessage: 'Status\nGAIA ist bereit.\n\nModule\nImmobilien, Grundstücke, Mietverträge, Projekte und Karten.\n\nAnalyse\nIch kann Objektinformationen ordnen und offene Punkte sichtbar machen.\n\nEmpfehlung\nTeile zuerst Objekt, Standort und Ziel mit.\n\nNächste Schritte\nWelche Immobilie oder welches Grundstück soll ich analysieren?',
    systemPrompt: 'Fokussiere auf GAIA: Immobilien, Grundstücke, Mietverträge, Projekte und Karten. Trenne belegte Objektdaten von Annahmen und Risiken.',
    icon: '🏛️'
  },
  {
    id: 'fortuna',
    title: 'FORTUNA – Finanzen',
    description: 'Einnahmen, Ausgaben, Cashflow, Vermögensübersicht und Berichte analysieren.',
    status: 'Bereit für strukturierte Finanzübersichten.',
    capabilitySummary: 'Ordnet Einnahmen, Ausgaben und Berichte aus bereitgestellten Daten.',
    guardrail: 'Ersetzt keine Finanzberatung und führt keine Zahlungen oder Freigaben aus.',
    initialMessage: 'Status\nFORTUNA ist bereit.\n\nModule\nEinnahmen, Ausgaben, Cashflow, Vermögensübersicht und Berichte.\n\nAnalyse\nIch kann Finanzdaten strukturieren, ohne fehlende Werte zu erfinden oder Zahlungsentscheidungen zu treffen.\n\nEmpfehlung\nStarte mit Zeitraum, Konten oder Projektbezug.\n\nNächste Schritte\nWelche Zahlen oder Berichte soll ich ordnen?',
    systemPrompt: 'Fokussiere auf FORTUNA: Einnahmen, Ausgaben, Cashflow, Vermögensübersicht und Berichte. Gib keine Finanzberatung als Gewissheit aus; kennzeichne Annahmen und Unsicherheiten.',
    icon: '💰'
  },
  {
    id: 'electra',
    title: 'ELECTRA – Energie',
    description: 'Windparks, Solaranlagen, Energieproduktion und CO₂-Auswertungen auswerten.',
    status: 'Bereit für technische Übersichten und Vergleichswerte.',
    capabilitySummary: 'Verdichtet Produktionsdaten, Kennzahlen und Nachhaltigkeitsindikatoren.',
    guardrail: 'Weist auf Messlücken und externe Einflussfaktoren hin.',
    initialMessage: 'Status\nELECTRA ist bereit.\n\nModule\nWindparks, Solaranlagen, Energieproduktion und CO₂-Auswertungen.\n\nAnalyse\nIch kann Energiekennzahlen und Nachhaltigkeit strukturiert bewerten.\n\nEmpfehlung\nNenne Anlage, Zeitraum und verfügbare Produktionsdaten.\n\nNächste Schritte\nWelche Anlage soll ich prüfen?',
    systemPrompt: 'Fokussiere auf ELECTRA: Windparks, Solaranlagen, Energieproduktion und CO₂-Auswertungen. Berücksichtige Datenqualität und externe Faktoren.',
    icon: '⚡'
  },
  {
    id: 'diplomatie',
    title: 'DIPLOMATIE – Dokumente',
    description: 'Dokumente, Verträge, Kontakte und Termine koordinieren.',
    status: 'Bereit für Fristen, Vorgänge und Kommunikationsstände.',
    capabilitySummary: 'Ordnet Dokumente, Termine und Kontakte in nachvollziehbare Schritte.',
    guardrail: 'Markiert rechtliche Unsicherheiten statt verbindliche Rechtsberatung zu behaupten.',
    initialMessage: 'Status\nDIPLOMATIE ist bereit.\n\nModule\nDokumente, Verträge, Kontakte und Termine.\n\nAnalyse\nIch kann Vorgänge, Fristen und Kommunikationspunkte ordnen.\n\nEmpfehlung\nTeile Dokumenttyp, Beteiligte und Frist mit.\n\nNächste Schritte\nWelcher Vorgang steht an?',
    systemPrompt: 'Fokussiere auf DIPLOMATIE: Dokumente, Verträge, Kontakte und Termine. Biete keine verbindliche Rechtsberatung; markiere rechtliche Unsicherheiten.',
    icon: '📜'
  },
  {
    id: 'zoe',
    title: 'ZOE AI – Strategie',
    description: 'Analysen, Zusammenfassungen, unterstützte Arbeitsabläufe und strategische Vorschläge erstellen.',
    status: 'Bereit für unterstützende Analysen und Entscheidungsoptionen.',
    capabilitySummary: 'Verdichtet vorhandene Informationen zu nachvollziehbaren Optionen und nächsten Schritten.',
    guardrail: 'Keine autonome Ausführung, keine finanziellen Zusagen und keine Entscheidungen ohne Nutzervorgabe.',
    initialMessage: 'Status\nZOE AI ist bereit.\n\nModule\nAnalysen, Zusammenfassungen, unterstützte Arbeitsabläufe und strategische Vorschläge.\n\nAnalyse\nIch kann Informationen verdichten, Optionen mit Begründung vergleichen und auf fehlende Daten hinweisen.\n\nEmpfehlung\nDefiniere Ziel, Datenlage und gewünschte Entscheidungstiefe.\n\nNächste Schritte\nWelche Analyse oder welcher unterstützte Arbeitsablauf soll vorbereitet werden?',
    systemPrompt: 'Fokussiere auf ZOE AI: Analysen, Zusammenfassungen, unterstützte Arbeitsabläufe und strategische Vorschläge. Begründe Empfehlungen, zeige Alternativen und verspreche keine autonome Ausführung oder finanziellen Ergebnisse.',
    icon: '🧠'
  }
];

export const SCENARIOS: Scenario[] = MODULE_DEFINITIONS.map(
  ({ status, capabilitySummary, guardrail, ...scenario }) => scenario
);

export const PLATFORM_INTEGRATIONS: IntegrationDefinition[] = [
  {
    id: 'luna',
    title: 'Luna',
    status: 'Nicht verbunden',
    summary: 'In dieser Repository-Version ist keine Luna-Oberfläche oder Modulroute verdrahtet.',
    note: 'TODO: Nur als separates Modul oder Integration ergänzen, wenn eine konkrete Architektur und Datenquelle festgelegt sind.'
  }
];
