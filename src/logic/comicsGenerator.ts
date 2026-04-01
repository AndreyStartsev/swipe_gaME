
import type { ProblemStats } from './storage';

export interface ComicFrame {
  id: string; // unique id per frame, can be the text itself
  icon?: any;
  imageUrl?: string;
  text: string;
}

export interface ComicStory {
  id: string;
  frames: ComicFrame[];
  bonusImage?: string;
}

// 4 icons/images per story
const COMIC_LIBRARY: ComicStory[] = [
  {
    id: "alien_pizza",
    frames: [
      { id: "arrive", imageUrl: "comics/alien_pizza/frame1.png", text: "Где я?" },
      { id: "smell", imageUrl: "comics/alien_pizza/frame2.png", text: "Что это пахнет?" },
      { id: "eat", imageUrl: "comics/alien_pizza/frame3.png", text: "Очень вкусно!" },
      { id: "steal", imageUrl: "comics/alien_pizza/frame4.png", text: "Беру всё!" },
    ],
    bonusImage: "comics/alien_pizza/bonus.png"
  },
  {
    id: "alien_bath",
    frames: [
      { id: "bath1", imageUrl: "comics/alien_bath/frame1.png", text: "Что за пена?" },
      { id: "bath2", imageUrl: "comics/alien_bath/frame2.png", text: "Горячо!" },
      { id: "bath3", imageUrl: "comics/alien_bath/frame3.png", text: "Уточка!" },
      { id: "bath4", imageUrl: "comics/alien_bath/frame4.png", text: "Я облако!" },
    ],
    bonusImage: "comics/alien_bath/bonus.png"
  },
  {
    id: "alien_gym",
    frames: [
      { id: "gym1", imageUrl: "comics/alien_gym/frame1.png", text: "Тяжело!" },
      { id: "gym2", imageUrl: "comics/alien_gym/frame2.png", text: "Ой, быстро!" },
      { id: "gym3", imageUrl: "comics/alien_gym/frame3.png", text: "Протеин!" },
      { id: "gym4", imageUrl: "comics/alien_gym/frame4.png", text: "Я сильный!" },
    ],
    bonusImage: "comics/alien_gym/bonus.png"
  },
  {
    id: "alien_shop",
    frames: [
      { id: "shop1", imageUrl: "comics/alien_shop/frame1.png", text: "Зеленый шар?" },
      { id: "shop2", imageUrl: "comics/alien_shop/frame2.png", text: "Вперёд!" },
      { id: "shop3", imageUrl: "comics/alien_shop/frame3.png", text: "Вот камни." },
      { id: "shop4", imageUrl: "comics/alien_shop/frame4.png", text: "Всё купил!" },
    ],
    bonusImage: "comics/alien_shop/bonus.png"
  },
  {
    id: "alien_beach",
    frames: [
      { id: "beach1", imageUrl: "comics/alien_beach/frame1.png", text: "Много воды!" },
      { id: "beach2", imageUrl: "comics/alien_beach/frame2.png", text: "Мой дом!" },
      { id: "beach3", imageUrl: "comics/alien_beach/frame3.png", text: "Злой жук!" },
      { id: "beach4", imageUrl: "comics/alien_beach/frame4.png", text: "Я песок!" },
    ],
    bonusImage: "comics/alien_beach/bonus.png"
  },
  {
    id: "alien_cinema",
    frames: [
      { id: "cinema1", imageUrl: "comics/alien_cinema/frame1.png", text: "Неправда!" },
      { id: "cinema2", imageUrl: "comics/alien_cinema/frame2.png", text: "Большая еда." },
      { id: "cinema3", imageUrl: "comics/alien_cinema/frame3.png", text: "Грустно..." },
      { id: "cinema4", imageUrl: "comics/alien_cinema/frame4.png", text: "Я готов!" },
    ],
    bonusImage: "comics/alien_cinema/bonus.png"
  },
  {
    id: "alien_snow",
    frames: [
      { id: "snow1", imageUrl: "comics/alien_snow/frame1.png", text: "Белая звезда?" },
      { id: "snow2", imageUrl: "comics/alien_snow/frame2.png", text: "Брат!" },
      { id: "snow3", imageUrl: "comics/alien_snow/frame3.png", text: "Быстро!" },
      { id: "snow4", imageUrl: "comics/alien_snow/frame4.png", text: "Тепло..." },
    ],
    bonusImage: "comics/alien_snow/bonus.png"
  },
  {
    id: "alien_garden",
    frames: [
      { id: "garden1", imageUrl: "comics/alien_garden/frame1.png", text: "Расти!" },
      { id: "garden2", imageUrl: "comics/alien_garden/frame2.png", text: "Пей воду!" },
      { id: "garden3", imageUrl: "comics/alien_garden/frame3.png", text: "Монстр!" },
      { id: "garden4", imageUrl: "comics/alien_garden/frame4.png", text: "Бежим!" },
    ],
    bonusImage: "comics/alien_garden/bonus.png"
  },
  {
    id: "alien_concert",
    frames: [
      { id: "concert1", imageUrl: "comics/alien_concert/frame1.png", text: "Громко!" },
      { id: "concert2", imageUrl: "comics/alien_concert/frame2.png", text: "Моя гитара!" },
      { id: "concert3", imageUrl: "comics/alien_concert/frame3.png", text: "Я лечу!" },
      { id: "concert4", imageUrl: "comics/alien_concert/frame4.png", text: "Рок-н-ролл!" },
    ],
    bonusImage: "comics/alien_concert/bonus.png"
  },
  {
    id: "alien_bake",
    frames: [
      { id: "bake1", imageUrl: "comics/alien_bake/frame1.png", text: "Сложно." },
      { id: "bake2", imageUrl: "comics/alien_bake/frame2.png", text: "Ой!" },
      { id: "bake3", imageUrl: "comics/alien_bake/frame3.png", text: "Готово!" },
      { id: "bake4", imageUrl: "comics/alien_bake/frame4.png", text: "Вкусно!" },
    ],
    bonusImage: "comics/alien_bake/bonus.png"
  },
  {
    id: "alien_camp",
    frames: [
      { id: "camp1", imageUrl: "comics/alien_camp/frame1.png", text: "Трудный дом." },
      { id: "camp2", imageUrl: "comics/alien_camp/frame2.png", text: "Огонь!" },
      { id: "camp3", imageUrl: "comics/alien_camp/frame3.png", text: "Кто там?" },
      { id: "camp4", imageUrl: "comics/alien_camp/frame4.png", text: "Здесь лучше." },
    ],
    bonusImage: "comics/alien_camp/bonus.png"
  },
  {
    id: "alien_pet",
    frames: [
      { id: "pet1", imageUrl: "comics/alien_pet/frame1.png", text: "Странный зверь." },
      { id: "pet2", imageUrl: "comics/alien_pet/frame2.png", text: "Лови!" },
      { id: "pet3", imageUrl: "comics/alien_pet/frame3.png", text: "Мокро!" },
      { id: "pet4", imageUrl: "comics/alien_pet/frame4.png", text: "Мой друг." },
    ],
    bonusImage: "comics/alien_pet/bonus.png"
  },
  {
    id: "alien_park",
    frames: [
      { id: "park1", imageUrl: "comics/alien_park/frame1.png", text: "Земные горки." },
      { id: "park2", imageUrl: "comics/alien_park/frame2.png", text: "Остановите!" },
      { id: "park3", imageUrl: "comics/alien_park/frame3.png", text: "Сладкое облако." },
      { id: "park4", imageUrl: "comics/alien_park/frame4.png", text: "Я улетаю." },
    ],
    bonusImage: "comics/alien_park/bonus.png"
  },
  {
    id: "alien_paint",
    frames: [
      { id: "paint1", imageUrl: "comics/alien_paint/frame1.png", text: "Пусто." },
      { id: "paint2", imageUrl: "comics/alien_paint/frame2.png", text: "Искусство!" },
      { id: "paint3", imageUrl: "comics/alien_paint/frame3.png", text: "Шедевр!" },
      { id: "paint4", imageUrl: "comics/alien_paint/frame4.png", text: "Я богат!" },
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
  currentFrameId: string; // The text to show in the center
  answer: string; // same as currentFrameId
  options: ComicFrame[]; // 4 frames in order: TL, TR, BL, BR
}

// Generates a sequence of 4 problems for a single comic story
export function generateComicSequence(_level: number, _stats?: ProblemStats): ComicProblem[] {
  const storyIndex = Math.floor(Math.random() * COMIC_LIBRARY.length);
  const story = COMIC_LIBRARY[storyIndex];

  // The 4 target windows. We shuffle the frames to place them in random windows,
  // OR we keep them in standard reading order. Let's keep reading order so it makes a story.
  const options = [...story.frames];

  // The order of texts asked should be randomized so it's not always TL -> TR -> BL -> BR.
  const askOrder = [...story.frames].sort(() => Math.random() - 0.5);

  const sequence: ComicProblem[] = [];
  const solvedFrames: string[] = [];

  for (let i = 0; i < 4; i++) {
    const currentFrame = askOrder[i];
    
    // Create a copy of solvedFrames for this snapshot in time
    const currentSolved = [...solvedFrames];
    
    sequence.push({
      type: 'comics',
      storyId: story.id,
      frames: options,
      solvedFrames: currentSolved,
      currentFrameId: currentFrame.id,
      answer: currentFrame.id,
      options: options, // we pass options just to be consistent, but frames is basically options
    });

    // The next problem in the sequence will know this frame is solved
    solvedFrames.push(currentFrame.id);
  }

  return sequence;
}
