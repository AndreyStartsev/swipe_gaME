import { 
  Car, Dog, Cat, Sun, Moon, TreeDeciduous, Home, Apple, Bird,
  Book, Cloud, Heart, Key, Leaf, Mountain, Plane, Star, Umbrella, 
  Waves, Zap, Rocket, Train, Ship, Bike, Bus, Flower, Carrot, 
  Coffee, Music, Bell, Clock, Compass, Crown, Feather, Flame, 
  Globe, Hammer, Anchor, Camera, Gift, Scissors, Snowflake, Sword, 
  Tent, Trophy, Map, Shield,
  Fish, Bug, Rabbit, Turtle, Snail, Droplets, CloudRain, Wind, Tornado,
  IceCream, Pizza, Cherry, Banana, Egg, Laptop, Smartphone,
  Headphones, Gamepad2, Tv, Watch, Shirt, Glasses, Truck, Axe, Wrench,
  Shovel, Ghost, Skull, Bot, Diamond, Magnet, Mic, Palette, Pen,
  Eye, Ear, Smile,
  Castle, Store, Factory, Briefcase, Bomb, Pencil, Brain, Bone, Bed,
  Lightbulb, DoorOpen, Ticket, Medal, Coins, Wallet, CreditCard, Lock,
  Tractor, Ambulance, Cross, Stethoscope, Syringe, Thermometer, Pill,
  Battery, Plug, Sofa, Armchair, Rat, Wine, Beer, Grape,
  Circle, Square, Triangle, Hexagon, Octagon,
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown,
  Building, Building2, Hospital, School, Church, Warehouse, Hotel, Landmark,
  Helicopter, Bath, Citrus, Nut, Wheat
} from 'lucide-react';
import type { ProblemStats } from './storage';

export interface WordOption {
  id: string;
  text?: string;
  icon?: any;
}

export interface WordProblem {
  type: 'word';
  variant: 'icon-to-word' | 'word-to-icon';
  answer: string;
  centerIcon?: any;
  centerText?: string;
  options: WordOption[];
}

export const WORD_DICTIONARY = [
  { icon: Car, word: 'Машина' },
  { icon: Dog, word: 'Собака' },
  { icon: Cat, word: 'Кот' },
  { icon: Sun, word: 'Солнце' },
  { icon: Moon, word: 'Луна' },
  { icon: TreeDeciduous, word: 'Дерево' },
  { icon: Home, word: 'Дом' },
  { icon: Apple, word: 'Яблоко' },
  { icon: Bird, word: 'Птица' },
  { icon: Book, word: 'Книга' },
  { icon: Cloud, word: 'Облако' },
  { icon: Heart, word: 'Сердце' },
  { icon: Key, word: 'Ключ' },
  { icon: Leaf, word: 'Лист' },
  { icon: Mountain, word: 'Гора' },
  { icon: Plane, word: 'Самолет' },
  { icon: Star, word: 'Звезда' },
  { icon: Umbrella, word: 'Зонт' },
  { icon: Waves, word: 'Волна' },
  { icon: Zap, word: 'Молния' },
  { icon: Rocket, word: 'Ракета' },
  { icon: Train, word: 'Поезд' },
  { icon: Ship, word: 'Корабль' },
  { icon: Bike, word: 'Велосипед' },
  { icon: Bus, word: 'Автобус' },
  { icon: Flower, word: 'Цветок' },
  { icon: Carrot, word: 'Морковь' },
  { icon: Coffee, word: 'Кофе' },
  { icon: Music, word: 'Музыка' },
  { icon: Bell, word: 'Колокол' },
  { icon: Clock, word: 'Часы' },
  { icon: Compass, word: 'Компас' },
  { icon: Crown, word: 'Корона' },
  { icon: Feather, word: 'Перо' },
  { icon: Flame, word: 'Огонь' },
  { icon: Globe, word: 'Глобус' },
  { icon: Hammer, word: 'Молоток' },
  { icon: Anchor, word: 'Якорь' },
  { icon: Camera, word: 'Камера' },
  { icon: Gift, word: 'Подарок' },
  { icon: Scissors, word: 'Ножницы' },
  { icon: Snowflake, word: 'Снег' },
  { icon: Sword, word: 'Меч' },
  { icon: Tent, word: 'Палатка' },
  { icon: Trophy, word: 'Кубок' },
  { icon: Shield, word: 'Щит' },
  { icon: Fish, word: 'Рыба' },
  { icon: Bug, word: 'Жук' },
  { icon: Rabbit, word: 'Кролик' },
  { icon: Turtle, word: 'Черепаха' },
  { icon: Snail, word: 'Улитка' },
  { icon: Droplets, word: 'Капли' },
  { icon: CloudRain, word: 'Дождь' },
  { icon: Wind, word: 'Ветер' },
  { icon: Tornado, word: 'Торнадо' },
  { icon: IceCream, word: 'Мороженое' },
  { icon: Pizza, word: 'Пицца' },
  { icon: Cherry, word: 'Вишня' },
  { icon: Banana, word: 'Банан' },
  { icon: Egg, word: 'Яйцо' },
  { icon: Laptop, word: 'Ноутбук' },
  { icon: Smartphone, word: 'Телефон' },
  { icon: Headphones, word: 'Наушники' },
  { icon: Gamepad2, word: 'Геймпад' },
  { icon: Tv, word: 'Телевизор' },
  { icon: Watch, word: 'Наручные часы' },
  { icon: Shirt, word: 'Рубашка' },
  { icon: Glasses, word: 'Очки' },
  { icon: Truck, word: 'Грузовик' },
  { icon: Axe, word: 'Топор' },
  { icon: Wrench, word: 'Гаечный ключ' },
  { icon: Shovel, word: 'Лопата' },
  { icon: Ghost, word: 'Призрак' },
  { icon: Skull, word: 'Череп' },
  { icon: Bot, word: 'Робот' },
  { icon: Diamond, word: 'Алмаз' },
  { icon: Magnet, word: 'Магнит' },
  { icon: Mic, word: 'Микрофон' },
  { icon: Palette, word: 'Палитра' },
  { icon: Pen, word: 'Ручка' },
  { icon: Eye, word: 'Глаз' },
  { icon: Ear, word: 'Ухо' },
  { icon: Smile, word: 'Улыбка' },
  { icon: Map, word: 'Карта' },
  { icon: Castle, word: 'Замок' },
  { icon: Store, word: 'Магазин' },
  { icon: Factory, word: 'Фабрика' },
  { icon: Briefcase, word: 'Портфель' },
  { icon: Bomb, word: 'Бомба' },
  { icon: Pencil, word: 'Карандаш' },
  { icon: Brain, word: 'Мозг' },
  { icon: Bone, word: 'Кость' },
  { icon: Bed, word: 'Кровать' },
  { icon: Lightbulb, word: 'Лампочка' },
  { icon: DoorOpen, word: 'Дверь' },
  { icon: Ticket, word: 'Билет' },
  { icon: Medal, word: 'Медаль' },
  { icon: Coins, word: 'Монеты' },
  { icon: Wallet, word: 'Кошелек' },
  { icon: CreditCard, word: 'Кредитка' },
  { icon: Lock, word: 'Замок (навесной)' },
  { icon: Tractor, word: 'Трактор' },
  { icon: Ambulance, word: 'Скорая помощь' },
  { icon: Cross, word: 'Крест' },
  { icon: Stethoscope, word: 'Стетоскоп' },
  { icon: Syringe, word: 'Шприц' },
  { icon: Thermometer, word: 'Термометр' },
  { icon: Pill, word: 'Таблетка' },
  { icon: Battery, word: 'Батарейка' },
  { icon: Plug, word: 'Штекер' },
  { icon: Sofa, word: 'Диван' },
  { icon: Armchair, word: 'Кресло' },
  { icon: Rat, word: 'Крыса' },
  { icon: Wine, word: 'Вино' },
  { icon: Beer, word: 'Пиво' },
  { icon: Grape, word: 'Виноград' },
  { icon: Circle, word: 'Круг' },
  { icon: Square, word: 'Квадрат' },
  { icon: Triangle, word: 'Треугольник' },
  { icon: Hexagon, word: 'Шестиугольник' },
  { icon: Octagon, word: 'Восьмиугольник' },
  { icon: ArrowRight, word: 'Направо' },
  { icon: ArrowLeft, word: 'Налево' },
  { icon: ArrowUp, word: 'Вверх' },
  { icon: ArrowDown, word: 'Вниз' },
  { icon: Building, word: 'Здание' },
  { icon: Building2, word: 'Небоскреб' },
  { icon: Hospital, word: 'Больница' },
  { icon: School, word: 'Школа' },
  { icon: Church, word: 'Церковь' },
  { icon: Warehouse, word: 'Склад' },
  { icon: Hotel, word: 'Отель' },
  { icon: Landmark, word: 'Памятник' },
  { icon: Helicopter, word: 'Вертолет' },
  { icon: Bath, word: 'Ванна' },
  { icon: Citrus, word: 'Цитрус' },
  { icon: Nut, word: 'Орех' },
  { icon: Wheat, word: 'Пшеница' }
];

let lastVariant: 'icon-to-word' | 'word-to-icon' = 'icon-to-word';

export function generateWordProblem(_level: number, problemStats?: ProblemStats): WordProblem {
  let targetIndex = 0;
  let isDifficultPulled = false;

  if (problemStats && Math.random() < 0.35) {
    const difficultWords = WORD_DICTIONARY.filter(item => {
      const stat = problemStats[item.word];
      return stat && stat.wrong > 0 && (stat.wrong >= stat.correct * 0.5 || stat.wrong >= 2);
    });
    
    if (difficultWords.length > 0) {
      const selected = difficultWords[Math.floor(Math.random() * difficultWords.length)];
      targetIndex = WORD_DICTIONARY.indexOf(selected);
      isDifficultPulled = true;
    }
  }

  if (!isDifficultPulled) {
    let attempts = 0;
    while (attempts < 5) {
      targetIndex = Math.floor(Math.random() * WORD_DICTIONARY.length);
      const word = WORD_DICTIONARY[targetIndex].word;
      const stat = problemStats?.[word];
      const isTooEasy = stat && ((stat.correct >= 3 && stat.wrong === 0) || (stat.correct >= 10 && stat.wrong <= 1));
      if (!isTooEasy) break;
      attempts++;
    }
  }

  const answerWord = WORD_DICTIONARY[targetIndex].word;
  const optionsSet = new Set<string>();
  optionsSet.add(answerWord);

  while(optionsSet.size < 4) {
    const wrongIndex = Math.floor(Math.random() * WORD_DICTIONARY.length);
    optionsSet.add(WORD_DICTIONARY[wrongIndex].word);
  }

  const shuffledWords = Array.from(optionsSet).sort(() => Math.random() - 0.5);
  
  const variant: 'icon-to-word' | 'word-to-icon' = lastVariant === 'icon-to-word' ? 'word-to-icon' : 'icon-to-word';
  lastVariant = variant;
  
  const options: WordOption[] = shuffledWords.map(wordText => {
    const dictItem = WORD_DICTIONARY.find(w => w.word === wordText);
    return {
      id: wordText,
      ...(variant === 'icon-to-word' ? { text: wordText } : { icon: dictItem?.icon })
    };
  });

  return {
    type: 'word',
    variant,
    answer: answerWord,
    centerIcon: variant === 'icon-to-word' ? WORD_DICTIONARY[targetIndex].icon : undefined,
    centerText: variant === 'word-to-icon' ? answerWord : undefined,
    options
  };
}
