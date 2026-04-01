import { useGameState } from './logic/useGameState';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { BonusScreen } from './components/BonusScreen';
import { Starfield } from './components/Starfield';
import { AchievementsScreen } from './components/AchievementsScreen';
import { useState } from 'react';

function App() {
  const [showAchievements, setShowAchievements] = useState(false);
  const {
    gameState,
    gameMode,
    score,
    timeLeft,
    level,
    currentProblem,
    bonusImage,
    isNewRecord,
    newAchievements,
    wordLanguage,
    startGame,
    handleAnswer,
    continueFromBonus,
    changeLanguage,
  } = useGameState();

  return (
    <div className="w-full min-h-[100dvh] bg-[#020202] overflow-hidden select-none relative">
      
      {/* Глобальный фон полета через звезды */}
      <Starfield />

      <div className="absolute inset-0 z-10 w-full h-full">
        {showAchievements ? (
          <AchievementsScreen onBack={() => setShowAchievements(false)} />
        ) : (
          <>
            {gameState === 'idle' && (
              <StartScreen 
                onStart={startGame} 
                onOpenAchievements={() => setShowAchievements(true)}
                language={wordLanguage}
                onChangeLanguage={changeLanguage}
              />
            )}
        
        {gameState === 'playing' && currentProblem && (
          <GameScreen
            score={score}
            timeLeft={timeLeft}
            level={level}
            problem={currentProblem}
            onAnswer={handleAnswer}
          />
        )}
        
        {gameState === 'bonus' && bonusImage && (
          <BonusScreen imageUrl={bonusImage} onContinue={continueFromBonus} />
        )}

        {gameState === 'gameOver' && (
          <GameOverScreen
            score={score}
            level={level}
            isNewRecord={isNewRecord}
            newAchievements={newAchievements}
            onRestart={() => startGame(gameMode)}
          />
        )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
