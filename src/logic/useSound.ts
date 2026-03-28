import { useCallback, useRef } from 'react';

export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const bgmRef = useRef<{ osc: OscillatorNode; gain: GainNode; timerID: number; nextNoteTime: number } | null>(null);
  const anxietyRef = useRef(0);

  const initAudio = () => {
    if (typeof window === 'undefined') return;
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
  };

  // Космический тон с lowpass фильтром и плавным затуханием (sweep)
  const playTone = (freq: number, type: OscillatorType, duration: number, vol = 0.1, sweep = false) => {
    if (!ctxRef.current) initAudio();
    const ctx = ctxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    if (sweep) {
        osc.frequency.exponentialRampToValueAtTime(freq / 2, ctx.currentTime + duration);
    }

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(sweep ? 3000 : 5000, ctx.currentTime);
    if (sweep) filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const playCorrect = useCallback(() => {
    initAudio();
    // Яркий космический колокольчик/лазер
    playTone(880, 'sine', 0.2, 0.15); 
    setTimeout(() => playTone(1318.51, 'square', 0.4, 0.05, true), 80); 
  }, []);

  const playWrong = useCallback(() => {
    initAudio();
    // Устрашающий синтезаторный бас как в сай-фай фильмах
    playTone(120, 'sawtooth', 0.5, 0.2, true);
    setTimeout(() => playTone(80, 'square', 0.5, 0.2, true), 100);
  }, []);

  const playStart = useCallback(() => {
    initAudio();
    // Красивое атмосферное включение
    playTone(440, 'sine', 0.8, 0.1, true); 
    setTimeout(() => playTone(659.25, 'square', 0.8, 0.05, true), 200); 
  }, []);

  const playGameOver = useCallback(() => {
    initAudio();
    // Глубокий, падающий звук провала (отключение систем)
    playTone(150, 'sawtooth', 2, 0.3, true);
    setTimeout(() => playTone(100, 'square', 2.5, 0.3, true), 200);
  }, []);

  const startBgm = useCallback(() => {
    initAudio();
    const ctx = ctxRef.current;
    if (!ctx || bgmRef.current) return;

    // --- EFFECT CHAIN: Endless Intertwining Delay ---
    // Создаем эхо-узел, который зацикливает звук сам в себя
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.6; // Общая громкость музыки

    const delay = ctx.createDelay();
    delay.delayTime.value = 0.33; // Пунктирное эхо (переплетение нот)
    const feedback = ctx.createGain();
    feedback.gain.value = 0.55; // Затухание эха (много повторений)

    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(masterGain);
    masterGain.connect(ctx.destination);

    // --- DRONE LAYER (Гул как у органов Циммера) ---
    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    const droneFilter = ctx.createBiquadFilter();
    drone.type = 'sawtooth';
    drone.frequency.value = 55; // Очень низкая Ля (A1)
    
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 100;

    droneGain.gain.value = 0; // Изначально тишина
    
    drone.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(masterGain);
    drone.start();

    const state = { 
      osc: drone, // placeholder
      gain: droneGain, // placeholder
      timerID: 0, 
      nextNoteTime: ctx.currentTime + 0.1,
      noteIndex: 0 
    };
    bgmRef.current = state;

    // --- HARMONIC ARPEGGIO (Восходящие гармоники Ля-минор) ---
    const notes = [
      110.00, // A2
      164.81, // E3
      220.00, // A3
      261.63, // C4
      329.63, // E4
      440.00, // A4
      493.88, // B4
      523.25, // C5
      659.25, // E5
      880.00, // A5
    ];

    const schedule = () => {
      if (!bgmRef.current) return;
      
      while (state.nextNoteTime < ctx.currentTime + 0.1) {
        const anxiety = anxietyRef.current; // От 0 (начало) до 1 (таймаут)
        
        // --- ОБНОВЛЕНИЕ DRONE (Нарастание тревоги) ---
        const droneVol = 0.05 + Math.pow(anxiety, 2) * 0.2; // Напряжение сильно нарастает в конце
        droneGain.gain.setTargetAtTime(droneVol, state.nextNoteTime, 0.1);
        droneFilter.frequency.setTargetAtTime(100 + anxiety * 2000, state.nextNoteTime, 0.1);
        
        // --- ГЕНЕРАЦИЯ СЛЕДУЮЩЕЙ НОТЫ АРПЕДЖИО ---
        // Скорость игры: от 0.4 сек до 0.15 сек между нотками
        const rate = 0.4 - anxiety * 0.25; 
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine'; // Чистый "стеклянный" звук звезд
        
        const noteFreq = notes[state.noteIndex % notes.length];
        
        // По мере роста anxiety гармоники задираются на октавы выше (1, 2, 4 раза)
        const scaleShift = 1 + Math.floor(anxiety * 2); 
        osc.frequency.setValueAtTime(noteFreq * scaleShift, state.nextNoteTime);

        // Фильтр для эффекта "щипка" (Плюк)
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800 + anxiety * 3000, state.nextNoteTime);
        
        // Огибающая (Envelope)
        const attack = 0.05;
        const release = rate * 1.5;
        const vol = 0.1 + anxiety * 0.15; // Громче при панике

        gain.gain.setValueAtTime(0, state.nextNoteTime);
        gain.gain.linearRampToValueAtTime(vol, state.nextNoteTime + attack);
        gain.gain.exponentialRampToValueAtTime(0.001, state.nextNoteTime + attack + release);

        osc.connect(filter);
        filter.connect(gain);
        
        // Нота уходит и в прямую трансляцию, И в бесконечное эхо (Delay)
        gain.connect(masterGain); 
        gain.connect(delay); 

        osc.start(state.nextNoteTime);
        osc.stop(state.nextNoteTime + attack + release + 0.1);

        state.nextNoteTime += rate;
        
        // Процедурная генерация мелодии: Матрица переходов (Цепи Маркова)
        const rand = Math.random();
        
        // 50% шанс - мягкий шаг вверх (нагнетание)
        // 25% шанс - резкий прыжок через ноту (всплеск эмоций)
        // 15% шанс - повтор предыдущей ноты (заморозка/эхо)
        // 10% шанс - шаг вниз (откат, чтобы подчеркнуть следующий скачок)
        let step = 1;
        if (rand < 0.50) step = 1;
        else if (rand < 0.75) step = 2;
        else if (rand < 0.90) step = 0;
        else step = -1;

        state.noteIndex += step;
        if (state.noteIndex < 0) state.noteIndex = 0;

        if (state.noteIndex >= notes.length) {
            // Возвращаемся в начало, но стартуем выше, если таймер поджимает
            state.noteIndex = Math.floor(anxiety * 4); 
        }
      }
      state.timerID = requestAnimationFrame(schedule);
    };
    schedule();
  }, []);

  const stopBgm = useCallback(() => {
    if (bgmRef.current && ctxRef.current) {
      cancelAnimationFrame(bgmRef.current.timerID);
      const ctx = ctxRef.current;
      bgmRef.current.gain.gain.cancelScheduledValues(ctx.currentTime);
      bgmRef.current.gain.gain.setValueAtTime(bgmRef.current.gain.gain.value, ctx.currentTime);
      bgmRef.current.gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      bgmRef.current.osc.stop(ctx.currentTime + 0.6);
      bgmRef.current = null;
    }
  }, []);

  const setAnxiety = useCallback((level: number) => {
    anxietyRef.current = Math.max(0, Math.min(1, level));
  }, []);

  return { playCorrect, playWrong, playStart, playGameOver, startBgm, stopBgm, setAnxiety };
}
