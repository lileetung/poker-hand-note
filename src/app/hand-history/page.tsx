'use client';
import { useHandHistory } from '@/hooks/useHandHistory';
import Navbar from "@/components/Navbar";

// 常量定義
const POSITIONS = [
  { value: '', label: '位置' },
  { value: 'BB', label: 'BB' },
  { value: 'SB', label: 'SB' },
  { value: 'BTN', label: 'BTN' },
  { value: 'CO', label: 'CO' },
  { value: 'HJ', label: 'HJ' },
  { value: 'LJ', label: 'LJ' },
  { value: 'UTG1', label: 'UTG1' },
  { value: 'UTG', label: 'UTG' },
];

const CARDS = [
  { value: '', label: '卡' },
  { value: 'A', label: 'A' },
  { value: 'K', label: 'K' },
  { value: 'Q', label: 'Q' },
  { value: 'J', label: 'J' },
  { value: 'T', label: 'T' },
  { value: '9', label: '9' },
  { value: '8', label: '8' },
  { value: '7', label: '7' },
  { value: '6', label: '6' },
  { value: '5', label: '5' },
  { value: '4', label: '4' },
  { value: '3', label: '3' },
  { value: '2', label: '2' },
];

const SUITS = [
  { value: '♠️', label: '♠️' },
  { value: '♥️', label: '♥️' },
  { value: '♦️', label: '♦️' },
  { value: '♣️', label: '♣️' },
];

const ACTIONS = [
  { value: '', label: '動作' },
  { value: 'check', label: 'Check' },
  { value: 'bet', label: 'Bet' },
  { value: 'call', label: 'Call' },
  { value: 'fold', label: 'Fold' },
  { value: 'raise', label: 'Raise' },
  { value: 'allin', label: 'Allin' },
];

export default function HandHistory() {
  const {
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
  } = useHandHistory();

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      
      {/* Flash Message */}
      {flashMessage.show && (
        <div 
          className={`
            fixed top-4 right-4 px-6 py-3 rounded-md shadow-lg
            transition-all duration-300 transform translate-y-0
            ${flashMessage.type === 'success' 
              ? 'bg-emerald-500 text-white' 
              : 'bg-red-500 text-white'
            }
          `}
        >
          {flashMessage.message}
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Game Info Section */}
          <section className="bg-[#1A1A1A] rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-emerald-400">Game Info</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <input 
                type="number" 
                placeholder="玩家人數"
                value={gameInfo.playerCount}
                onChange={(e) => updateGameInfo('playerCount', e.target.value)}
                className="bg-[#242424] border border-gray-700 rounded-md p-2 text-white"
              />
              <input 
                type="number" 
                placeholder="小盲"
                value={gameInfo.smallBlind}
                onChange={(e) => updateGameInfo('smallBlind', e.target.value)}
                className="bg-[#242424] border border-gray-700 rounded-md p-2 text-white"
              />
              <input 
                type="number" 
                placeholder="大盲"
                value={gameInfo.bigBlind}
                onChange={(e) => updateGameInfo('bigBlind', e.target.value)}
                className="bg-[#242424] border border-gray-700 rounded-md p-2 text-white"
              />
              <input 
                type="number" 
                placeholder="前注(Ante)"
                value={gameInfo.ante}
                onChange={(e) => updateGameInfo('ante', e.target.value)}
                className="bg-[#242424] border border-gray-700 rounded-md p-2 text-white"
              />
            </div>
          </section>

          {/* Hero Section */}
          <section className="bg-[#1A1A1A] rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-emerald-400">Hero</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Position and Stack Row */}
              <select 
                value={heroInfo.position}
                onChange={(e) => updateHeroInfo('position', e.target.value)}
                className="bg-[#242424] border border-gray-700 rounded-md p-2 text-white"
              >
                {POSITIONS.map(pos => (
                  <option key={pos.value} value={pos.value}>{pos.label}</option>
                ))}
              </select>
              
              <input 
                type="number" 
                placeholder="籌碼量"
                value={heroInfo.stack}
                onChange={(e) => updateHeroInfo('stack', e.target.value)}
                className="bg-[#242424] border border-gray-700 rounded-md p-2 text-white"
              />
              
              {/* Cards Row */}
              <div className="col-span-2 grid grid-cols-4 gap-4">
                {/* Card 1 */}
                <select 
                  value={heroInfo.card1.value}
                  onChange={(e) => updateHeroInfo('card1Value', e.target.value)}
                  className="bg-[#242424] border border-gray-700 rounded-md p-2 text-white"
                >
                  {CARDS.map(card => (
                    <option key={card.value} value={card.value}>{card.label}</option>
                  ))}
                </select>
                <select 
                  value={heroInfo.card1.suit}
                  onChange={(e) => updateHeroInfo('card1Suit', e.target.value)}
                  className="bg-[#242424] border border-gray-700 rounded-md p-2 text-white"
                >
                  {SUITS.map(suit => (
                    <option key={suit.value} value={suit.value}>{suit.label}</option>
                  ))}
                </select>
                
                {/* Card 2 */}
                <select 
                  value={heroInfo.card2.value}
                  onChange={(e) => updateHeroInfo('card2Value', e.target.value)}
                  className="bg-[#242424] border border-gray-700 rounded-md p-2 text-white"
                >
                  {CARDS.map(card => (
                    <option key={card.value} value={card.value}>{card.label}</option>
                  ))}
                </select>
                <select 
                  value={heroInfo.card2.suit}
                  onChange={(e) => updateHeroInfo('card2Suit', e.target.value)}
                  className="bg-[#242424] border border-gray-700 rounded-md p-2 text-white"
                >
                  {SUITS.map(suit => (
                    <option key={suit.value} value={suit.value}>{suit.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Gameplay Stages */}
          <div className="space-y-6">
            {stages.map((stage, stageIndex) => (
              <section key={stage.name} className="bg-[#1A1A1A] rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-emerald-400">{stage.name}</h2>
                <button 
                  onClick={() => addAction(stage.name)}
                  className="bg-emerald-600 text-white px-4 h-10 rounded-md hover:bg-emerald-700 transition-colors"
                >
                  + Add Action
                </button>
                <div className="mt-4 space-y-2">
                  {stage.actions.map((action, actionIndex) => (
                    <div key={action.id} className="flex items-center gap-2">
                      <select
                        value={action.position}
                        onChange={(e) => updateAction(stageIndex, actionIndex, 'position', e.target.value)}
                        className="bg-[#242424] border border-gray-700 rounded-md px-2 h-10 text-white w-24"
                      >
                        {POSITIONS.map(pos => (
                          <option key={pos.value} value={pos.value}>{pos.label}</option>
                        ))}
                      </select>
                      <select
                        value={action.action}
                        onChange={(e) => updateAction(stageIndex, actionIndex, 'action', e.target.value)}
                        className="bg-[#242424] border border-gray-700 rounded-md px-2 h-10 text-white w-24"
                      >
                        {ACTIONS.map(act => (
                          <option key={act.value} value={act.value}>{act.label}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        placeholder="金額"
                        value={action.amount}
                        onChange={(e) => updateAction(stageIndex, actionIndex, 'amount', e.target.value)}
                        className="bg-[#242424] border border-gray-700 rounded-md px-2 h-10 text-white w-20"
                      />
                      <button
                        onClick={() => deleteAction(stageIndex, actionIndex)}
                        className="bg-red-600 text-white px-3 h-10 rounded-md hover:bg-red-700 flex-shrink-0"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Opponents Section */}
          <section className="bg-[#1A1A1A] rounded-lg p-6 mt-6">
            <h2 className="text-xl font-bold mb-4 text-emerald-400">Opponents</h2>
            <button 
              onClick={addOpponent}
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors mb-4"
            >
              + Add Opponent
            </button>
            <div className="space-y-4">
              {opponents.map((opponent, opponentIndex) => (
                <div key={opponent.id} className="grid gap-2">
                  {/* Position Row */}
                  <select
                    value={opponent.position}
                    onChange={(e) => updateOpponent(opponentIndex, 'position', e.target.value)}
                    className="bg-[#242424] border border-gray-700 rounded-md p-2 text-white"
                  >
                    {POSITIONS.map(pos => (
                      <option key={pos.value} value={pos.value}>{pos.label}</option>
                    ))}
                  </select>
                  
                  {/* Cards Row */}
                  <div className="grid grid-cols-5 gap-2">
                    {/* Card 1 */}
                    <select
                      value={opponent.card1.value}
                      onChange={(e) => updateOpponent(opponentIndex, 'card1Value', e.target.value)}
                      className="bg-[#242424] border border-gray-700 rounded-md p-2 text-white"
                    >
                      {CARDS.map(card => (
                        <option key={card.value} value={card.value}>{card.label}</option>
                      ))}
                    </select>
                    <select
                      value={opponent.card1.suit}
                      onChange={(e) => updateOpponent(opponentIndex, 'card1Suit', e.target.value)}
                      className="bg-[#242424] border border-gray-700 rounded-md p-2 text-white"
                    >
                      {SUITS.map(suit => (
                        <option key={suit.value} value={suit.value}>{suit.label}</option>
                      ))}
                    </select>
                    
                    {/* Card 2 */}
                    <select
                      value={opponent.card2.value}
                      onChange={(e) => updateOpponent(opponentIndex, 'card2Value', e.target.value)}
                      className="bg-[#242424] border border-gray-700 rounded-md p-2 text-white"
                    >
                      {CARDS.map(card => (
                        <option key={card.value} value={card.value}>{card.label}</option>
                      ))}
                    </select>
                    <select
                      value={opponent.card2.suit}
                      onChange={(e) => updateOpponent(opponentIndex, 'card2Suit', e.target.value)}
                      className="bg-[#242424] border border-gray-700 rounded-md p-2 text-white"
                    >
                      {SUITS.map(suit => (
                        <option key={suit.value} value={suit.value}>{suit.label}</option>
                      ))}
                    </select>
                    
                    <button
                      onClick={() => deleteOpponent(opponentIndex)}
                      className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Output Section */}
          <section className="bg-[#1A1A1A] rounded-lg p-6 mt-6">
            <textarea 
              readOnly
              value={generateOutput()}
              className="w-full h-48 bg-[#242424] border border-gray-700 rounded-md p-4 text-white mb-4"
            />
            <div className="flex gap-4">
              <button 
                onClick={copyToClipboard}
                className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors"
              >
                COPY
              </button>
              <button 
                onClick={saveHandHistory}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                SAVE
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 