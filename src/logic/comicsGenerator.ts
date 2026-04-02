import type { ProblemStats } from './storage';
import type { LanguageCode } from './wordGenerator';

export interface ComicFrame {
  id: string; // unique id per frame
  icon?: any;
  imageUrl?: string;
  translations: Record<LanguageCode, string>;
}

export interface ComicStory {
  id: string;
  frames: ComicFrame[];
  bonusImage?: string;
}

const COMIC_LIBRARY: ComicStory[] = [
  {
    id: "alien_pizza",
    frames: [
      { id: "arrive", imageUrl: "comics/alien_pizza/frame1.png", translations: { ru: "Где я?", en: "Where am I?", fr: "Où suis-je?", he: "איפה אני?" } },
      { id: "smell", imageUrl: "comics/alien_pizza/frame2.png", translations: { ru: "Что это пахнет?", en: "What is this smell?", fr: "Qu'est-ce qui sent?", he: "מה הריח הזה?" } },
      { id: "eat", imageUrl: "comics/alien_pizza/frame3.png", translations: { ru: "Очень вкусно!", en: "Very tasty!", fr: "Très savoureux!", he: "טעים מאוד!" } },
      { id: "steal", imageUrl: "comics/alien_pizza/frame4.png", translations: { ru: "Беру всё!", en: "I take everything!", fr: "Je prends tout!", he: "אני לוקח הכל!" } },
    ],
    bonusImage: "comics/alien_pizza/bonus.png"
  },
  {
    id: "alien_bath",
    frames: [
      { id: "bath1", imageUrl: "comics/alien_bath/frame1.png", translations: { ru: "Что за пена?", en: "What is this foam?", fr: "Quelle est cette mousse?", he: "מה זה הקצף הזה?" } },
      { id: "bath2", imageUrl: "comics/alien_bath/frame2.png", translations: { ru: "Горячо!", en: "Hot!", fr: "Chaud!", he: "חם!" } },
      { id: "bath3", imageUrl: "comics/alien_bath/frame3.png", translations: { ru: "Уточка!", en: "Duck!", fr: "Canard!", he: "ברווז!" } },
      { id: "bath4", imageUrl: "comics/alien_bath/frame4.png", translations: { ru: "Я облако!", en: "I am a cloud!", fr: "Je suis un nuage!", he: "אני ענן!" } },
    ],
    bonusImage: "comics/alien_bath/bonus.png"
  },
  {
    id: "alien_gym",
    frames: [
      { id: "gym1", imageUrl: "comics/alien_gym/frame1.png", translations: { ru: "Тяжело!", en: "Heavy!", fr: "Lourd!", he: "כבד!" } },
      { id: "gym2", imageUrl: "comics/alien_gym/frame2.png", translations: { ru: "Ой, быстро!", en: "Oops, fast!", fr: "Oups, rapide!", he: "אופס, מהר!" } },
      { id: "gym3", imageUrl: "comics/alien_gym/frame3.png", translations: { ru: "Протеин!", en: "Protein!", fr: "Protéine!", he: "חלבון!" } },
      { id: "gym4", imageUrl: "comics/alien_gym/frame4.png", translations: { ru: "Я сильный!", en: "I am strong!", fr: "Je suis fort!", he: "אני חזק!" } },
    ],
    bonusImage: "comics/alien_gym/bonus.png"
  },
  {
    id: "alien_shop",
    frames: [
      { id: "shop1", imageUrl: "comics/alien_shop/frame1.png", translations: { ru: "Зеленый шар?", en: "Green sphere?", fr: "Sphère verte?", he: "כדור ירוק?" } },
      { id: "shop2", imageUrl: "comics/alien_shop/frame2.png", translations: { ru: "Вперёд!", en: "Forward!", fr: "En avant!", he: "קדימה!" } },
      { id: "shop3", imageUrl: "comics/alien_shop/frame3.png", translations: { ru: "Вот камни.", en: "Here are the stones.", fr: "Voici les pierres.", he: "הנה האבנים." } },
      { id: "shop4", imageUrl: "comics/alien_shop/frame4.png", translations: { ru: "Всё купил!", en: "Bought everything!", fr: "J'ai tout acheté!", he: "קניתי הכל!" } },
    ],
    bonusImage: "comics/alien_shop/bonus.png"
  },
  {
    id: "alien_beach",
    frames: [
      { id: "beach1", imageUrl: "comics/alien_beach/frame1.png", translations: { ru: "Много воды!", en: "Lot of water!", fr: "Beaucoup d'eau!", he: "הרבה מים!" } },
      { id: "beach2", imageUrl: "comics/alien_beach/frame2.png", translations: { ru: "Мой дом!", en: "My home!", fr: "Ma maison!", he: "הבית שלי!" } },
      { id: "beach3", imageUrl: "comics/alien_beach/frame3.png", translations: { ru: "Злой жук!", en: "Angry bug!", fr: "Insecte en colère!", he: "חרק כועס!" } },
      { id: "beach4", imageUrl: "comics/alien_beach/frame4.png", translations: { ru: "Я песок!", en: "I am sand!", fr: "Je suis du sable!", he: "אני חול!" } },
    ],
    bonusImage: "comics/alien_beach/bonus.png"
  },
  {
    id: "alien_cinema",
    frames: [
      { id: "cinema1", imageUrl: "comics/alien_cinema/frame1.png", translations: { ru: "Неправда!", en: "Not true!", fr: "Pas vrai!", he: "לא נכון!" } },
      { id: "cinema2", imageUrl: "comics/alien_cinema/frame2.png", translations: { ru: "Большая еда.", en: "Big food.", fr: "Grosse nourriture.", he: "אוכל גדול." } },
      { id: "cinema3", imageUrl: "comics/alien_cinema/frame3.png", translations: { ru: "Грустно...", en: "Sad...", fr: "Triste...", he: "עצוב..." } },
      { id: "cinema4", imageUrl: "comics/alien_cinema/frame4.png", translations: { ru: "Я готов!", en: "I am ready!", fr: "Je suis prêt!", he: "אני מוכן!" } },
    ],
    bonusImage: "comics/alien_cinema/bonus.png"
  },
  {
    id: "alien_snow",
    frames: [
      { id: "snow1", imageUrl: "comics/alien_snow/frame1.png", translations: { ru: "Белая звезда?", en: "White star?", fr: "Étoile blanche?", he: "כוכב לבן?" } },
      { id: "snow2", imageUrl: "comics/alien_snow/frame2.png", translations: { ru: "Брат!", en: "Brother!", fr: "Frère!", he: "אח!" } },
      { id: "snow3", imageUrl: "comics/alien_snow/frame3.png", translations: { ru: "Быстро!", en: "Fast!", fr: "Rapide!", he: "מהר!" } },
      { id: "snow4", imageUrl: "comics/alien_snow/frame4.png", translations: { ru: "Тепло...", en: "Warm...", fr: "Chaud...", he: "חמים..." } },
    ],
    bonusImage: "comics/alien_snow/bonus.png"
  },
  {
    id: "alien_garden",
    frames: [
      { id: "garden1", imageUrl: "comics/alien_garden/frame1.png", translations: { ru: "Расти!", en: "Grow!", fr: "Pousse!", he: "תגדל!" } },
      { id: "garden2", imageUrl: "comics/alien_garden/frame2.png", translations: { ru: "Пей воду!", en: "Drink water!", fr: "Bois de l'eau!", he: "שתה מים!" } },
      { id: "garden3", imageUrl: "comics/alien_garden/frame3.png", translations: { ru: "Монстр!", en: "Monster!", fr: "Monstre!", he: "מפלצת!" } },
      { id: "garden4", imageUrl: "comics/alien_garden/frame4.png", translations: { ru: "Бежим!", en: "Run!", fr: "Fuyons!", he: "לברוח!" } },
    ],
    bonusImage: "comics/alien_garden/bonus.png"
  },
  {
    id: "alien_concert",
    frames: [
      { id: "concert1", imageUrl: "comics/alien_concert/frame1.png", translations: { ru: "Громко!", en: "Loud!", fr: "Fort!", he: "רועש!" } },
      { id: "concert2", imageUrl: "comics/alien_concert/frame2.png", translations: { ru: "Моя гитара!", en: "My guitar!", fr: "Ma guitare!", he: "הגיטרה שלי!" } },
      { id: "concert3", imageUrl: "comics/alien_concert/frame3.png", translations: { ru: "Я лечу!", en: "I am flying!", fr: "Je vole!", he: "אני עף!" } },
      { id: "concert4", imageUrl: "comics/alien_concert/frame4.png", translations: { ru: "Рок-н-ролл!", en: "Rock and roll!", fr: "Rock and roll!", he: "רוקנרול!" } },
    ],
    bonusImage: "comics/alien_concert/bonus.png"
  },
  {
    id: "alien_bake",
    frames: [
      { id: "bake1", imageUrl: "comics/alien_bake/frame1.png", translations: { ru: "Сложно.", en: "Difficult.", fr: "Difficile.", he: "קשה." } },
      { id: "bake2", imageUrl: "comics/alien_bake/frame2.png", translations: { ru: "Ой!", en: "Oops!", fr: "Oups!", he: "אופס!" } },
      { id: "bake3", imageUrl: "comics/alien_bake/frame3.png", translations: { ru: "Готово!", en: "Done!", fr: "Fini!", he: "מוכן!" } },
      { id: "bake4", imageUrl: "comics/alien_bake/frame4.png", translations: { ru: "Вкусно!", en: "Tasty!", fr: "Délicieux!", he: "טעים!" } },
    ],
    bonusImage: "comics/alien_bake/bonus.png"
  },
  {
    id: "alien_camp",
    frames: [
      { id: "camp1", imageUrl: "comics/alien_camp/frame1.png", translations: { ru: "Трудный дом.", en: "Difficult home.", fr: "Maison difficile.", he: "בית קשה." } },
      { id: "camp2", imageUrl: "comics/alien_camp/frame2.png", translations: { ru: "Огонь!", en: "Fire!", fr: "Feu!", he: "אש!" } },
      { id: "camp3", imageUrl: "comics/alien_camp/frame3.png", translations: { ru: "Кто там?", en: "Who is there?", fr: "Qui est là?", he: "מי שם?" } },
      { id: "camp4", imageUrl: "comics/alien_camp/frame4.png", translations: { ru: "Здесь лучше.", en: "Better here.", fr: "Mieux ici.", he: "עדיף כאן." } },
    ],
    bonusImage: "comics/alien_camp/bonus.png"
  },
  {
    id: "alien_pet",
    frames: [
      { id: "pet1", imageUrl: "comics/alien_pet/frame1.png", translations: { ru: "Странный зверь.", en: "Strange beast.", fr: "Bête étrange.", he: "חיה מוזרה." } },
      { id: "pet2", imageUrl: "comics/alien_pet/frame2.png", translations: { ru: "Лови!", en: "Catch!", fr: "Attrape!", he: "תפוס!" } },
      { id: "pet3", imageUrl: "comics/alien_pet/frame3.png", translations: { ru: "Мокро!", en: "Wet!", fr: "Mouillé!", he: "רטוב!" } },
      { id: "pet4", imageUrl: "comics/alien_pet/frame4.png", translations: { ru: "Мой друг.", en: "My friend.", fr: "Mon ami.", he: "חבר שלי." } },
    ],
    bonusImage: "comics/alien_pet/bonus.png"
  },
  {
    id: "alien_park",
    frames: [
      { id: "park1", imageUrl: "comics/alien_park/frame1.png", translations: { ru: "Земные горки.", en: "Earth coasters.", fr: "Montagnes russes.", he: "רכבת הרים." } },
      { id: "park2", imageUrl: "comics/alien_park/frame2.png", translations: { ru: "Остановите!", en: "Stop!", fr: "Arrêtez!", he: "תעצרו!" } },
      { id: "park3", imageUrl: "comics/alien_park/frame3.png", translations: { ru: "Сладкое облако.", en: "Sweet cloud.", fr: "Nuage doux.", he: "ענן מתוק." } },
      { id: "park4", imageUrl: "comics/alien_park/frame4.png", translations: { ru: "Я улетаю.", en: "I am flying away.", fr: "Je m'envole.", he: "אני עף משם." } },
    ],
    bonusImage: "comics/alien_park/bonus.png"
  },
  {
    id: "alien_paint",
    frames: [
      { id: "paint1", imageUrl: "comics/alien_paint/frame1.png", translations: { ru: "Пусто.", en: "Empty.", fr: "Vide.", he: "ריק." } },
      { id: "paint2", imageUrl: "comics/alien_paint/frame2.png", translations: { ru: "Искусство!", en: "Art!", fr: "Art!", he: "אומנות!" } },
      { id: "paint3", imageUrl: "comics/alien_paint/frame3.png", translations: { ru: "Шедевр!", en: "Masterpiece!", fr: "Chef-d'œuvre!", he: "יצירת מופת!" } },
      { id: "paint4", imageUrl: "comics/alien_paint/frame4.png", translations: { ru: "Я богат!", en: "I am rich!", fr: "Je suis riche!", he: "אני עשיר!" } },
    ],
    bonusImage: "comics/alien_paint/bonus.png"
  }
];

export function getStoryById(id: string): ComicStory | undefined {
  return COMIC_LIBRARY.find(s => s.id === id);
}

export interface ComicProblem {
  type: 'comics';
  storyId: string;
  frames: ComicFrame[]; 
  solvedFrames: string[]; 
  currentFrameId: string; // Internal ID of the frame
  answer: string; // same as currentFrameId (the ID string) -- we changed this concept!
  options: ComicFrame[]; 
  language: LanguageCode; // Added so UI knows which text to show
}

export function generateComicSequence(_level: number, language: LanguageCode = 'ru', _stats?: ProblemStats, seenStoryIds: string[] = []): ComicProblem[] {
  let availableStories = COMIC_LIBRARY.filter(s => !seenStoryIds.includes(s.id));
  if (availableStories.length === 0) {
    availableStories = COMIC_LIBRARY;
  }

  const storyIndex = Math.floor(Math.random() * availableStories.length);
  const story = availableStories[storyIndex];

  const options = [...story.frames];
  const askOrder = [...story.frames].sort(() => Math.random() - 0.5);

  const sequence: ComicProblem[] = [];
  const solvedFrames: string[] = [];

  for (let i = 0; i < 4; i++) {
    const currentFrame = askOrder[i];
    const currentSolved = [...solvedFrames];
    
    sequence.push({
      type: 'comics',
      storyId: story.id,
      frames: options,
      solvedFrames: currentSolved,
      currentFrameId: currentFrame.id,
      answer: currentFrame.id,
      options: options,
      language: language
    });

    solvedFrames.push(currentFrame.id);
  }

  return sequence;
}
