import { useState } from 'react';

interface GameInfo {
  playerCount: string;
  smallBlind: string;
  bigBlind: string;
  ante: string;
}

interface HeroInfo {
  position: string;
  card1: { value: string; suit: string };
  card2: { value: string; suit: string };
  stack: string;
}

interface Action {
  id: string;
  position: string;
  action: string;
  amount: string;
}

interface Stage {
  name: string;
  actions: Action[];
  cards?: { value: string; suit: string }[];
}

interface Opponent {
  id: string;
  position: string;
  card1: { value: string; suit: string };
  card2: { value: string; suit: string };
}

export function useHandHistory() {
  const [gameInfo, setGameInfo] = useState<GameInfo>({
    playerCount: '',
    smallBlind: '',
    bigBlind: '',
    ante: '',
  });

  const [heroInfo, setHeroInfo] = useState<HeroInfo>({
    position: '',
    card1: { value: '', suit: '♠️' },
    card2: { value: '', suit: '♠️' },
    stack: '',
  });

  const [stages, setStages] = useState<Stage[]>([
    { name: 'Preflop', actions: [] },
    { name: 'Flop', actions: [], cards: Array(3).fill({ value: '', suit: '' }) },
    { name: 'Turn', actions: [], cards: [{ value: '', suit: '' }] },
    { name: 'River', actions: [], cards: [{ value: '', suit: '' }] },
  ]);

  const [opponents, setOpponents] = useState<Opponent[]>([]);

  const [flashMessage, setFlashMessage] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: '',
  });

  // 更新遊戲資訊
  const updateGameInfo = (field: keyof GameInfo, value: string) => {
    setGameInfo(prev => ({ ...prev, [field]: value }));
  };

  // 更新英雄資訊
  const updateHeroInfo = (field: keyof HeroInfo | 'card1Value' | 'card1Suit' | 'card2Value' | 'card2Suit', value: string) => {
    setHeroInfo(prev => {
      switch (field) {
        case 'card1Value':
          return { ...prev, card1: { ...prev.card1, value } };
        case 'card1Suit':
          return { ...prev, card1: { ...prev.card1, suit: value } };
        case 'card2Value':
          return { ...prev, card2: { ...prev.card2, value } };
        case 'card2Suit':
          return { ...prev, card2: { ...prev.card2, suit: value } };
        default:
          return { ...prev, [field]: value };
      }
    });
  };

  // 添加行動
  const addAction = (stageName: string) => {
    setStages(prev => prev.map(stage => {
      if (stage.name === stageName) {
        return {
          ...stage,
          actions: [...stage.actions, {
            id: Math.random().toString(36).substr(2, 9),
            position: '',
            action: '',
            amount: '',
          }],
        };
      }
      return stage;
    }));
  };

  // 更新行動
  const updateAction = (stageIndex: number, actionIndex: number, field: keyof Action, value: string) => {
    setStages(prev => prev.map((stage, sIndex) => {
      if (sIndex === stageIndex) {
        const newActions = [...stage.actions];
        newActions[actionIndex] = { ...newActions[actionIndex], [field]: value };
        return { ...stage, actions: newActions };
      }
      return stage;
    }));
  };

  // 刪除行動
  const deleteAction = (stageIndex: number, actionIndex: number) => {
    setStages(prev => prev.map((stage, sIndex) => {
      if (sIndex === stageIndex) {
        const newActions = stage.actions.filter((_, index) => index !== actionIndex);
        return { ...stage, actions: newActions };
      }
      return stage;
    }));
  };

  // 添加對手
  const addOpponent = () => {
    setOpponents(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      position: '',
      card1: { value: '', suit: '♠️' },
      card2: { value: '', suit: '♠️' },
    }]);
  };

  // 更新對手資訊
  const updateOpponent = (
    opponentIndex: number, 
    field: 'position' | 'card1Value' | 'card1Suit' | 'card2Value' | 'card2Suit', 
    value: string
  ) => {
    setOpponents(prev => prev.map((opp, index) => {
      if (index === opponentIndex) {
        switch (field) {
          case 'position':
            return { ...opp, position: value };
          case 'card1Value':
            return { ...opp, card1: { ...opp.card1, value } };
          case 'card1Suit':
            return { ...opp, card1: { ...opp.card1, suit: value } };
          case 'card2Value':
            return { ...opp, card2: { ...opp.card2, value } };
          case 'card2Suit':
            return { ...opp, card2: { ...opp.card2, suit: value } };
          default:
            return opp;
        }
      }
      return opp;
    }));
  };

  // 刪除對手
  const deleteOpponent = (opponentIndex: number) => {
    setOpponents(prev => prev.filter((_, index) => index !== opponentIndex));
  };

  // 生成輸出文本
  const generateOutput = (): string => {
    let output = '';

    // Game Info
    output += `${gameInfo.playerCount}人 ${gameInfo.smallBlind}/${gameInfo.bigBlind}`;
    output += gameInfo.ante ? ` (${gameInfo.ante})\n` : ' (No Ante)\n';

    // Hero Info
    output += `我: ${heroInfo.position} ${heroInfo.card1.value}${heroInfo.card1.suit} ${heroInfo.card2.value}${heroInfo.card2.suit}`;
    output += `, 碼量: ${heroInfo.stack}\n\n`;

    // Stages
    stages.forEach(stage => {
      output += `${stage.name}: `;
      
      // 如果有牌面卡牌且不是 Preflop
      if (stage.cards && stage.name !== 'Preflop') {
        output += stage.cards.map(card => `${card.value}${card.suit}`).join(' ') + '\n';
      } else {
        output += '\n'; // 確保 Preflop 也有換行
      }

      // 添加行動
      stage.actions.forEach(action => {
        if (action.position && action.action) { // 只有當位置和動作都有值時才添加
          output += `${action.position} ${action.action}${action.amount ? ' ' + action.amount : ''}\n`;
        }
      });
      
      output += '.\n';
    });

    // 添加對手資訊
    if (opponents.length > 0) {
      output += '\n'; // 添加一個空行
      opponents.forEach(opp => {
        if (opp.position) {
          output += `${opp.position} ${opp.card1.value}${opp.card1.suit} ${opp.card2.value}${opp.card2.suit}\n`;
        }
      });
    }

    return output.trim();
  };

  // 顯示 flash message
  const showFlashMessage = (type: 'success' | 'error', message: string) => {
    setFlashMessage({ show: true, type, message });
    setTimeout(() => {
      setFlashMessage(prev => ({ ...prev, show: false }));
    }, 3000); // 3秒後自動消失
  };

  // 複製到剪貼板
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateOutput());
      showFlashMessage('success', '已複製！');
      return true;
    } catch (err) {
      showFlashMessage('error', '複製失敗，請重試。');
      console.error('Failed to copy:', err);
      return false;
    }
  };

  // 儲存功能
  const saveHandHistory = () => {
    // 這裡可以添加實際的儲存邏輯
    showFlashMessage('success', '已儲存！');
  };

  return {
    gameInfo,
    heroInfo,
    stages,
    updateGameInfo,
    updateHeroInfo,
    addAction,
    updateAction,
    deleteAction,
    generateOutput,
    copyToClipboard,
    opponents,
    addOpponent,
    updateOpponent,
    deleteOpponent,
    flashMessage,
    saveHandHistory,
  };
} 