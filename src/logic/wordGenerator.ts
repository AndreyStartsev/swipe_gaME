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

export type LanguageCode = 'ru' | 'en' | 'fr' | 'he';

export interface WordOption {
  id: string; // Internal stable ID
  text?: string; // Translated text
  icon?: any;
}

export interface WordProblem {
  type: 'word';
  variant: 'icon-to-word' | 'word-to-icon';
  answer: string; // The correct translated text
  centerIcon?: any;
  centerText?: string;
  options: WordOption[];
}

export const WORD_DICTIONARY = [
  { id: 'car', icon: Car, translations: { ru: 'Машина', en: 'Car', fr: 'Voiture', he: 'מכונית' } },
  { id: 'dog', icon: Dog, translations: { ru: 'Собака', en: 'Dog', fr: 'Chien', he: 'כלב' } },
  { id: 'cat', icon: Cat, translations: { ru: 'Кот', en: 'Cat', fr: 'Chat', he: 'חתול' } },
  { id: 'sun', icon: Sun, translations: { ru: 'Солнце', en: 'Sun', fr: 'Soleil', he: 'שמש' } },
  { id: 'moon', icon: Moon, translations: { ru: 'Луна', en: 'Moon', fr: 'Lune', he: 'ירח' } },
  { id: 'tree', icon: TreeDeciduous, translations: { ru: 'Дерево', en: 'Tree', fr: 'Arbre', he: 'עץ' } },
  { id: 'home', icon: Home, translations: { ru: 'Дом', en: 'House', fr: 'Maison', he: 'בית' } },
  { id: 'apple', icon: Apple, translations: { ru: 'Яблоко', en: 'Apple', fr: 'Pomme', he: 'תפוח' } },
  { id: 'bird', icon: Bird, translations: { ru: 'Птица', en: 'Bird', fr: 'Oiseau', he: 'ציפור' } },
  { id: 'book', icon: Book, translations: { ru: 'Книга', en: 'Book', fr: 'Livre', he: 'ספר' } },
  { id: 'cloud', icon: Cloud, translations: { ru: 'Облако', en: 'Cloud', fr: 'Nuage', he: 'ענן' } },
  { id: 'heart', icon: Heart, translations: { ru: 'Сердце', en: 'Heart', fr: 'Cœur', he: 'לב' } },
  { id: 'key', icon: Key, translations: { ru: 'Ключ', en: 'Key', fr: 'Clé', he: 'מפתח' } },
  { id: 'leaf', icon: Leaf, translations: { ru: 'Лист', en: 'Leaf', fr: 'Feuille', he: 'עלה' } },
  { id: 'mountain', icon: Mountain, translations: { ru: 'Гора', en: 'Mountain', fr: 'Montagne', he: 'הר' } },
  { id: 'plane', icon: Plane, translations: { ru: 'Самолет', en: 'Airplane', fr: 'Avion', he: 'מטוס' } },
  { id: 'star', icon: Star, translations: { ru: 'Звезда', en: 'Star', fr: 'Étoile', he: 'כוכב' } },
  { id: 'umbrella', icon: Umbrella, translations: { ru: 'Зонт', en: 'Umbrella', fr: 'Parapluie', he: 'מטריה' } },
  { id: 'waves', icon: Waves, translations: { ru: 'Волна', en: 'Wave', fr: 'Vague', he: 'גל' } },
  { id: 'zap', icon: Zap, translations: { ru: 'Молния', en: 'Lightning', fr: 'Éclair', he: 'ברק' } },
  { id: 'rocket', icon: Rocket, translations: { ru: 'Ракета', en: 'Rocket', fr: 'Fusée', he: 'טיל' } },
  { id: 'train', icon: Train, translations: { ru: 'Поезд', en: 'Train', fr: 'Train', he: 'רכבת' } },
  { id: 'ship', icon: Ship, translations: { ru: 'Корабль', en: 'Ship', fr: 'Navire', he: 'ספינה' } },
  { id: 'bike', icon: Bike, translations: { ru: 'Велосипед', en: 'Bike', fr: 'Vélo', he: 'אופניים' } },
  { id: 'bus', icon: Bus, translations: { ru: 'Автобус', en: 'Bus', fr: 'Bus', he: 'אוטובוס' } },
  { id: 'flower', icon: Flower, translations: { ru: 'Цветок', en: 'Flower', fr: 'Fleur', he: 'פרח' } },
  { id: 'carrot', icon: Carrot, translations: { ru: 'Морковь', en: 'Carrot', fr: 'Carotte', he: 'גזר' } },
  { id: 'coffee', icon: Coffee, translations: { ru: 'Кофе', en: 'Coffee', fr: 'Café', he: 'קפה' } },
  { id: 'music', icon: Music, translations: { ru: 'Музыка', en: 'Music', fr: 'Musique', he: 'מוזיקה' } },
  { id: 'bell', icon: Bell, translations: { ru: 'Колокол', en: 'Bell', fr: 'Cloche', he: 'פעמון' } },
  { id: 'clock', icon: Clock, translations: { ru: 'Часы', en: 'Clock', fr: 'Horloge', he: 'שעון' } },
  { id: 'compass', icon: Compass, translations: { ru: 'Компас', en: 'Compass', fr: 'Boussole', he: 'מצפן' } },
  { id: 'crown', icon: Crown, translations: { ru: 'Корона', en: 'Crown', fr: 'Couronne', he: 'כתר' } },
  { id: 'feather', icon: Feather, translations: { ru: 'Перо', en: 'Feather', fr: 'Plume', he: 'נוצה' } },
  { id: 'flame', icon: Flame, translations: { ru: 'Огонь', en: 'Fire', fr: 'Feu', he: 'אש' } },
  { id: 'globe', icon: Globe, translations: { ru: 'Глобус', en: 'Globe', fr: 'Globe', he: 'גלובוס' } },
  { id: 'hammer', icon: Hammer, translations: { ru: 'Молоток', en: 'Hammer', fr: 'Marteau', he: 'פטיש' } },
  { id: 'anchor', icon: Anchor, translations: { ru: 'Якорь', en: 'Anchor', fr: 'Ancre', he: 'עוגן' } },
  { id: 'camera', icon: Camera, translations: { ru: 'Камера', en: 'Camera', fr: 'Caméra', he: 'מצלמה' } },
  { id: 'gift', icon: Gift, translations: { ru: 'Подарок', en: 'Gift', fr: 'Cadeau', he: 'מתנה' } },
  { id: 'scissors', icon: Scissors, translations: { ru: 'Ножницы', en: 'Scissors', fr: 'Ciseaux', he: 'מספריים' } },
  { id: 'snowflake', icon: Snowflake, translations: { ru: 'Снег', en: 'Snow', fr: 'Neige', he: 'שלג' } },
  { id: 'sword', icon: Sword, translations: { ru: 'Меч', en: 'Sword', fr: 'Épée', he: 'חרב' } },
  { id: 'tent', icon: Tent, translations: { ru: 'Палатка', en: 'Tent', fr: 'Tente', he: 'אוהל' } },
  { id: 'trophy', icon: Trophy, translations: { ru: 'Кубок', en: 'Trophy', fr: 'Trophée', he: 'גביע' } },
  { id: 'shield', icon: Shield, translations: { ru: 'Щит', en: 'Shield', fr: 'Bouclier', he: 'מגן' } },
  { id: 'fish', icon: Fish, translations: { ru: 'Рыба', en: 'Fish', fr: 'Poisson', he: 'דג' } },
  { id: 'bug', icon: Bug, translations: { ru: 'Жук', en: 'Bug', fr: 'Insecte', he: 'חרק' } },
  { id: 'rabbit', icon: Rabbit, translations: { ru: 'Кролик', en: 'Rabbit', fr: 'Lapin', he: 'ארנב' } },
  { id: 'turtle', icon: Turtle, translations: { ru: 'Черепаха', en: 'Turtle', fr: 'Tortue', he: 'צב' } },
  { id: 'snail', icon: Snail, translations: { ru: 'Улитка', en: 'Snail', fr: 'Escargot', he: 'שבלול' } },
  { id: 'droplets', icon: Droplets, translations: { ru: 'Капли', en: 'Drops', fr: 'Gouttes', he: 'טיפות' } },
  { id: 'cloudrain', icon: CloudRain, translations: { ru: 'Дождь', en: 'Rain', fr: 'Pluie', he: 'גשם' } },
  { id: 'wind', icon: Wind, translations: { ru: 'Ветер', en: 'Wind', fr: 'Vent', he: 'רוח' } },
  { id: 'tornado', icon: Tornado, translations: { ru: 'Торнадо', en: 'Tornado', fr: 'Tornade', he: 'טורנדו' } },
  { id: 'icecream', icon: IceCream, translations: { ru: 'Мороженое', en: 'Ice Cream', fr: 'Glace', he: 'גלידה' } },
  { id: 'pizza', icon: Pizza, translations: { ru: 'Пицца', en: 'Pizza', fr: 'Pizza', he: 'פיצה' } },
  { id: 'cherry', icon: Cherry, translations: { ru: 'Вишня', en: 'Cherry', fr: 'Cerise', he: 'דובדבן' } },
  { id: 'banana', icon: Banana, translations: { ru: 'Банан', en: 'Banana', fr: 'Banane', he: 'בננה' } },
  { id: 'egg', icon: Egg, translations: { ru: 'Яйцо', en: 'Egg', fr: 'Œuf', he: 'ביצה' } },
  { id: 'laptop', icon: Laptop, translations: { ru: 'Ноутбук', en: 'Laptop', fr: 'Ordinateur', he: 'לפטופ' } },
  { id: 'smartphone', icon: Smartphone, translations: { ru: 'Телефон', en: 'Phone', fr: 'Téléphone', he: 'טלפון' } },
  { id: 'headphones', icon: Headphones, translations: { ru: 'Наушники', en: 'Headphones', fr: 'Casque', he: 'אוזניות' } },
  { id: 'gamepad2', icon: Gamepad2, translations: { ru: 'Геймпад', en: 'Gamepad', fr: 'Manette', he: 'שלט' } },
  { id: 'tv', icon: Tv, translations: { ru: 'Телевизор', en: 'TV', fr: 'Télévision', he: 'טלויזיה' } },
  { id: 'watch', icon: Watch, translations: { ru: 'Наручные часы', en: 'Watch', fr: 'Montre', he: 'שעון יד' } },
  { id: 'shirt', icon: Shirt, translations: { ru: 'Рубашка', en: 'Shirt', fr: 'Chemise', he: 'חולצה' } },
  { id: 'glasses', icon: Glasses, translations: { ru: 'Очки', en: 'Glasses', fr: 'Lunettes', he: 'משקפיים' } },
  { id: 'truck', icon: Truck, translations: { ru: 'Грузовик', en: 'Truck', fr: 'Camion', he: 'משאית' } },
  { id: 'axe', icon: Axe, translations: { ru: 'Топор', en: 'Axe', fr: 'Hache', he: 'גרזן' } },
  { id: 'wrench', icon: Wrench, translations: { ru: 'Гаечный ключ', en: 'Wrench', fr: 'Clé anglaise', he: 'מפתח ברגים' } },
  { id: 'shovel', icon: Shovel, translations: { ru: 'Лопата', en: 'Shovel', fr: 'Pelle', he: 'את חפירה' } },
  { id: 'ghost', icon: Ghost, translations: { ru: 'Призрак', en: 'Ghost', fr: 'Fantôme', he: 'רוח רפאים' } },
  { id: 'skull', icon: Skull, translations: { ru: 'Череп', en: 'Skull', fr: 'Crâne', he: 'גולגולת' } },
  { id: 'bot', icon: Bot, translations: { ru: 'Робот', en: 'Robot', fr: 'Robot', he: 'רובוט' } },
  { id: 'diamond', icon: Diamond, translations: { ru: 'Алмаз', en: 'Diamond', fr: 'Diamant', he: 'יהלום' } },
  { id: 'magnet', icon: Magnet, translations: { ru: 'Магнит', en: 'Magnet', fr: 'Aimant', he: 'מגנט' } },
  { id: 'mic', icon: Mic, translations: { ru: 'Микрофон', en: 'Microphone', fr: 'Microphone', he: 'מיקרופון' } },
  { id: 'palette', icon: Palette, translations: { ru: 'Палитра', en: 'Palette', fr: 'Palette', he: 'פלטה' } },
  { id: 'pen', icon: Pen, translations: { ru: 'Ручка', en: 'Pen', fr: 'Stylo', he: 'עט' } },
  { id: 'eye', icon: Eye, translations: { ru: 'Глаз', en: 'Eye', fr: 'Œil', he: 'עין' } },
  { id: 'ear', icon: Ear, translations: { ru: 'Ухо', en: 'Ear', fr: 'Oreille', he: 'אוזן' } },
  { id: 'smile', icon: Smile, translations: { ru: 'Улыбка', en: 'Smile', fr: 'Sourire', he: 'חיוך' } },
  { id: 'map', icon: Map, translations: { ru: 'Карта', en: 'Map', fr: 'Carte', he: 'מפה' } },
  { id: 'castle', icon: Castle, translations: { ru: 'Замок', en: 'Castle', fr: 'Château', he: 'טירה' } },
  { id: 'store', icon: Store, translations: { ru: 'Магазин', en: 'Store', fr: 'Magasin', he: 'חנות' } },
  { id: 'factory', icon: Factory, translations: { ru: 'Фабрика', en: 'Factory', fr: 'Usine', he: 'מפעל' } },
  { id: 'briefcase', icon: Briefcase, translations: { ru: 'Портфель', en: 'Briefcase', fr: 'Mallette', he: 'תיק מסמכים' } },
  { id: 'bomb', icon: Bomb, translations: { ru: 'Бомба', en: 'Bomb', fr: 'Bombe', he: 'פצצה' } },
  { id: 'pencil', icon: Pencil, translations: { ru: 'Карандаш', en: 'Pencil', fr: 'Crayon', he: 'עיפרון' } },
  { id: 'brain', icon: Brain, translations: { ru: 'Мозг', en: 'Brain', fr: 'Cerveau', he: 'מוח' } },
  { id: 'bone', icon: Bone, translations: { ru: 'Кость', en: 'Bone', fr: 'Os', he: 'עצם' } },
  { id: 'bed', icon: Bed, translations: { ru: 'Кровать', en: 'Bed', fr: 'Lit', he: 'מיטה' } },
  { id: 'lightbulb', icon: Lightbulb, translations: { ru: 'Лампочка', en: 'Lightbulb', fr: 'Ampoule', he: 'נורה' } },
  { id: 'dooropen', icon: DoorOpen, translations: { ru: 'Дверь', en: 'Door', fr: 'Porte', he: 'דלת' } },
  { id: 'ticket', icon: Ticket, translations: { ru: 'Билет', en: 'Ticket', fr: 'Billet', he: 'כרטיס' } },
  { id: 'medal', icon: Medal, translations: { ru: 'Медаль', en: 'Medal', fr: 'Médaille', he: 'מדליה' } },
  { id: 'coins', icon: Coins, translations: { ru: 'Монеты', en: 'Coins', fr: 'Pièces', he: 'מטבעות' } },
  { id: 'wallet', icon: Wallet, translations: { ru: 'Кошелек', en: 'Wallet', fr: 'Portefeuille', he: 'ארנק' } },
  { id: 'creditcard', icon: CreditCard, translations: { ru: 'Кредитка', en: 'Credit Card', fr: 'Carte', he: 'אשראי' } },
  { id: 'lock', icon: Lock, translations: { ru: 'Замок (навесной)', en: 'Lock', fr: 'Cadenas', he: 'מנעול' } },
  { id: 'tractor', icon: Tractor, translations: { ru: 'Трактор', en: 'Tractor', fr: 'Tracteur', he: 'טרקטור' } },
  { id: 'ambulance', icon: Ambulance, translations: { ru: 'Скорая помощь', en: 'Ambulance', fr: 'Ambulance', he: 'אמבולנס' } },
  { id: 'cross', icon: Cross, translations: { ru: 'Крест', en: 'Cross', fr: 'Croix', he: 'צלב' } },
  { id: 'stethoscope', icon: Stethoscope, translations: { ru: 'Стетоскоп', en: 'Stethoscope', fr: 'Stéthoscope', he: 'סטטוסקופ' } },
  { id: 'syringe', icon: Syringe, translations: { ru: 'Шприц', en: 'Syringe', fr: 'Seringue', he: 'מזרק' } },
  { id: 'thermometer', icon: Thermometer, translations: { ru: 'Термометр', en: 'Thermometer', fr: 'Thermomètre', he: 'מד חום' } },
  { id: 'pill', icon: Pill, translations: { ru: 'Таблетка', en: 'Pill', fr: 'Pilule', he: 'גלולה' } },
  { id: 'battery', icon: Battery, translations: { ru: 'Батарейка', en: 'Battery', fr: 'Batterie', he: 'סוללה' } },
  { id: 'plug', icon: Plug, translations: { ru: 'Штекер', en: 'Plug', fr: 'Prise', he: 'תקע' } },
  { id: 'sofa', icon: Sofa, translations: { ru: 'Диван', en: 'Sofa', fr: 'Canapé', he: 'ספה' } },
  { id: 'armchair', icon: Armchair, translations: { ru: 'Кресло', en: 'Armchair', fr: 'Fauteuil', he: 'כורסה' } },
  { id: 'rat', icon: Rat, translations: { ru: 'Крыса', en: 'Rat', fr: 'Rat', he: 'עכברוש' } },
  { id: 'wine', icon: Wine, translations: { ru: 'Вино', en: 'Wine', fr: 'Vin', he: 'יין' } },
  { id: 'beer', icon: Beer, translations: { ru: 'Пиво', en: 'Beer', fr: 'Bière', he: 'בירה' } },
  { id: 'grape', icon: Grape, translations: { ru: 'Виноград', en: 'Grape', fr: 'Raisin', he: 'ענבים' } },
  { id: 'circle', icon: Circle, translations: { ru: 'Круг', en: 'Circle', fr: 'Cercle', he: 'מעגל' } },
  { id: 'square', icon: Square, translations: { ru: 'Квадрат', en: 'Square', fr: 'Carré', he: 'ריבוע' } },
  { id: 'triangle', icon: Triangle, translations: { ru: 'Треугольник', en: 'Triangle', fr: 'Triangle', he: 'משולש' } },
  { id: 'hexagon', icon: Hexagon, translations: { ru: 'Шестиугольник', en: 'Hexagon', fr: 'Hexagone', he: 'משושה' } },
  { id: 'octagon', icon: Octagon, translations: { ru: 'Восьмиугольник', en: 'Octagon', fr: 'Octogone', he: 'מתומן' } },
  { id: 'arrowright', icon: ArrowRight, translations: { ru: 'Направо', en: 'Right', fr: 'Droite', he: 'ימינה' } },
  { id: 'arrowleft', icon: ArrowLeft, translations: { ru: 'Налево', en: 'Left', fr: 'Gauche', he: 'שמאלה' } },
  { id: 'arrowup', icon: ArrowUp, translations: { ru: 'Вверх', en: 'Up', fr: 'Haut', he: 'למעלה' } },
  { id: 'arrowdown', icon: ArrowDown, translations: { ru: 'Вниз', en: 'Down', fr: 'Bas', he: 'למטה' } },
  { id: 'building', icon: Building, translations: { ru: 'Здание', en: 'Building', fr: 'Bâtiment', he: 'בניין' } },
  { id: 'building1', icon: Building2, translations: { ru: 'Небоскреб', en: 'Skyscraper', fr: 'Gratte-ciel', he: 'גורד שחקים' } },
  { id: 'hospital', icon: Hospital, translations: { ru: 'Больница', en: 'Hospital', fr: 'Hôpital', he: 'בית חולים' } },
  { id: 'school', icon: School, translations: { ru: 'Школа', en: 'School', fr: 'École', he: 'בית ספר' } },
  { id: 'church', icon: Church, translations: { ru: 'Церковь', en: 'Church', fr: 'Église', he: 'כנסייה' } },
  { id: 'warehouse', icon: Warehouse, translations: { ru: 'Склад', en: 'Warehouse', fr: 'Entrepôt', he: 'מחסן' } },
  { id: 'hotel', icon: Hotel, translations: { ru: 'Отель', en: 'Hotel', fr: 'Hôtel', he: 'מלון' } },
  { id: 'landmark', icon: Landmark, translations: { ru: 'Памятник', en: 'Monument', fr: 'Monument', he: 'אנדרטה' } },
  { id: 'helicopter', icon: Helicopter, translations: { ru: 'Вертолет', en: 'Helicopter', fr: 'Hélicoptère', he: 'מסוק' } },
  { id: 'bath', icon: Bath, translations: { ru: 'Ванна', en: 'Bathtub', fr: 'Baignoire', he: 'אמבטיה' } },
  { id: 'citrus', icon: Citrus, translations: { ru: 'Цитрус', en: 'Citrus', fr: 'Agrume', he: 'פרי הדר' } },
  { id: 'nut', icon: Nut, translations: { ru: 'Орех', en: 'Nut', fr: 'Noix', he: 'אגוז' } },
  { id: 'wheat', icon: Wheat, translations: { ru: 'Пшеница', en: 'Wheat', fr: 'Blé', he: 'חיטה' } },
];

let lastVariant: 'icon-to-word' | 'word-to-icon' = 'icon-to-word';

export function generateWordProblem(_level: number, problemStats?: ProblemStats, language: LanguageCode = 'ru'): WordProblem {
  let targetIndex = 0;
  let isDifficultPulled = false;

  if (problemStats && Math.random() < 0.35) {
    const difficultWords = WORD_DICTIONARY.filter(item => {
      // Using Language-Specific Key
      const statKey = `${item.id}_${language}`;
      const stat = problemStats[statKey];
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
      const statKey = `${WORD_DICTIONARY[targetIndex].id}_${language}`;
      const stat = problemStats?.[statKey];
      const isTooEasy = stat && ((stat.correct >= 3 && stat.wrong === 0) || (stat.correct >= 10 && stat.wrong <= 1));
      if (!isTooEasy) break;
      attempts++;
    }
  }

  const answerItem = WORD_DICTIONARY[targetIndex];
  const answerWord = answerItem.translations[language];
  const optionsSet = new Set<string>();
  optionsSet.add(answerItem.id);

  while(optionsSet.size < 4) {
    const wrongIndex = Math.floor(Math.random() * WORD_DICTIONARY.length);
    optionsSet.add(WORD_DICTIONARY[wrongIndex].id);
  }

  const shuffledIds = Array.from(optionsSet).sort(() => Math.random() - 0.5);
  
  const variant: 'icon-to-word' | 'word-to-icon' = lastVariant === 'icon-to-word' ? 'word-to-icon' : 'icon-to-word';
  lastVariant = variant;
  
  const options: WordOption[] = shuffledIds.map(id => {
    const dictItem = WORD_DICTIONARY.find(w => w.id === id)!;
    return {
      id: dictItem.translations[language], // We use the translated word directly as ID for the answer matching compatibility
      ...(variant === 'icon-to-word' ? { text: dictItem.translations[language] } : { icon: dictItem.icon })
    };
  });

  return {
    type: 'word',
    variant,
    answer: answerWord,
    centerIcon: variant === 'icon-to-word' ? answerItem.icon : undefined,
    centerText: variant === 'word-to-icon' ? answerWord : undefined,
    options
  };
}
