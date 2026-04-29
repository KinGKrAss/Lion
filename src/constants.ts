import { Language, Scenario } from './types';

export const LANGUAGES: Language[] = [
  { id: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', voiceCode: 'es-ES' },
  { id: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', voiceCode: 'fr-FR' },
  { id: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', voiceCode: 'de-DE' },
  { id: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', voiceCode: 'it-IT' },
  { id: 'jp', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', voiceCode: 'ja-JP' },
  { id: 'kr', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', voiceCode: 'ko-KR' },
  { id: 'cn', name: 'Chinese', nativeName: '普通话', flag: '🇨🇳', voiceCode: 'zh-CN' },
];

export const SCENARIOS: Scenario[] = [
  {
    id: 'cafe',
    title: 'Ordering at a Cafe',
    description: 'Practice ordering your favorite coffee and pastry in a bustling local cafe.',
    initialMessage: 'Bonjour ! Bienvenue au Café Royal. Que puis-je vous servir aujourd\'hui ?',
    systemPrompt: 'You are a friendly barista at a high-end cafe. Engage the user in a natural conversation about ordering food and drinks. Occasionally suggest a specialty.',
    icon: 'Coffee'
  },
  {
    id: 'travel',
    title: 'Check-in at a Luxury Hotel',
    description: 'Navigate the check-in process and ask about hotel amenities.',
    initialMessage: 'Good evening. Welcome to the Royal KrAss Hotel. Do you have a reservation under a specific name?',
    systemPrompt: 'You are a sophisticated hotel concierge. Help the user check into their room, explain the luxury features of the hotel (spa, rooftop bar), and handle special requests.',
    icon: 'Hotel'
  },
  {
    id: 'interview',
    title: 'Job Interview',
    description: 'Prepare for your next big career move with a professional mock interview.',
    initialMessage: 'Thank you for joining us today. To start, could you tell me a bit about your professional background and why you applied for this position?',
    systemPrompt: 'You are a professional HR manager. Conduct a formal job interview. Ask challenging but fair questions and provide professional feedback if the user asks.',
    icon: 'Briefcase'
  },
  {
    id: 'casual',
    title: 'Casual Networking',
    description: 'Meet new people at a tech conference and exchange professional interests.',
    initialMessage: 'Hey! Are you enjoying the conference so far? Which talk was your favorite?',
    systemPrompt: 'You are a fellow professional at a high-end networking event. Chat casually about industry trends, professional goals, and hobbies.',
    icon: 'MessageSquare'
  }
];
