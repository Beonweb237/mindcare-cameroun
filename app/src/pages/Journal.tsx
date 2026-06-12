import { useState } from 'react';
import { Calendar, TrendingUp, Moon, Zap, Heart, Plus, AlertCircle } from 'lucide-react';
import { journalMockEntries } from '@/data/professionals';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const emotionOptions = [
  'Joie', 'Calme', 'Gratitude', 'Anxiété', 'Stress', 'Fatigue',
  'Tristesse', 'Colère', 'Espoir', 'Amour', 'Sérénité', 'Isolement',
];

export default function Journal() {
  const [entries, setEntries] = useState(journalMockEntries);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<typeof entries[0] | null>(null);
  
  // New entry form state
  const [mood, setMood] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [sleep, setSleep] = useState(5);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [note, setNote] = useState('');

  const handleSubmitEntry = () => {
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood,
      emotions: selectedEmotions,
      note,
      energy,
      sleep,
    };
    setEntries((prev) => [newEntry, ...prev]);
    setShowNewEntry(false);
    setMood(5);
    setEnergy(5);
    setSleep(5);
    setSelectedEmotions([]);
    setNote('');
  };

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion]
    );
  };

  // Calculate stats
  const avgMood = entries.reduce((acc, e) => acc + e.mood, 0) / entries.length;
  const avgEnergy = entries.reduce((acc, e) => acc + e.energy, 0) / entries.length;
  const avgSleep = entries.reduce((acc, e) => acc + e.sleep, 0) / entries.length;
  const moodTrend = entries[0].mood - entries[entries.length - 1].mood;

  // Generate chart points
  const chartData = entries.slice().reverse();
  const maxVal = 10;
  const points = chartData.map((entry, i) => ({
    x: (i / (chartData.length - 1)) * 100,
    y: 100 - (entry.mood / maxVal) * 100,
    mood: entry.mood,
    date: entry.date,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L 100 100 L 0 100 Z`;

  return (
    <div className="min-h-screen pt-24 pb-16 aurora-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold text-mind-blue uppercase tracking-widest mb-4">Journal de bord</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Votre espace de suivi personnel
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Prenez un moment pour vous. Notez votre humeur du jour et visualisez vos progrès au fil du temps.
            </p>
          </div>
          <button
            onClick={() => setShowNewEntry(true)}
            className="flex items-center gap-2 px-6 py-3 bg-mind-blue hover:bg-blue-500 text-white font-semibold rounded-xl shadow-glow transition-all duration-300 hover:-translate-y-1 self-start"
          >
            <Plus className="w-5 h-5" />
            Nouvelle entrée
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: 'Humeur moyenne',
              value: avgMood.toFixed(1),
              icon: Heart,
              color: 'text-mind-pink',
              bg: 'bg-mind-pink/10',
            },
            {
              label: 'Énergie moyenne',
              value: avgEnergy.toFixed(1),
              icon: Zap,
              color: 'text-yellow-400',
              bg: 'bg-yellow-400/10',
            },
            {
              label: 'Sommeil moyen',
              value: avgSleep.toFixed(1),
              icon: Moon,
              color: 'text-mind-purple',
              bg: 'bg-mind-purple/10',
            },
            {
              label: 'Tendance',
              value: moodTrend > 0 ? `+${moodTrend}` : moodTrend,
              icon: TrendingUp,
              color: moodTrend >= 0 ? 'text-emerald-400' : 'text-red-400',
              bg: moodTrend >= 0 ? 'bg-emerald-400/10' : 'bg-red-400/10',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl bg-night-800/50 border border-white/5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mood Chart */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-2xl bg-night-800/50 border border-white/5 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-mind-blue" />
                  Évolution de votre humeur
                </h2>
                <span className="text-slate-500 text-sm">7 derniers jours</span>
              </div>
              
              <div className="relative h-64">
                <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                  {/* Grid */}
                  {[0, 25, 50, 75, 100].map((y) => (
                    <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  ))}
                  
                  {/* Area */}
                  <defs>
                    <linearGradient id="journalGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={areaD} fill="url(#journalGradient)" />
                  
                  {/* Line */}
                  <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Points */}
                  {points.map((p, i) => (
                    <circle
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      r="2"
                      fill="#3b82f6"
                      stroke="#0a0a12"
                      strokeWidth="0.5"
                    />
                  ))}
                </svg>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-500 pointer-events-none">
                  <span>10</span>
                  <span>5</span>
                  <span>0</span>
                </div>
              </div>
              
              {/* X-axis labels */}
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                {chartData.map((entry, i) => (
                  <span key={i}>
                    {new Date(entry.date).toLocaleDateString('fr-FR', { weekday: 'short' })}
                  </span>
                ))}
              </div>
            </div>

            {/* Entries List */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-mind-purple" />
                Vos entrées récentes
              </h2>
              
              <div className="space-y-4">
                {entries.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className="w-full text-left p-5 rounded-2xl bg-night-800/50 border border-white/5 hover:border-mind-blue/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        entry.mood >= 7 ? 'bg-emerald-500/10' :
                        entry.mood >= 5 ? 'bg-yellow-500/10' :
                        entry.mood >= 3 ? 'bg-orange-500/10' :
                        'bg-red-500/10'
                      }`}>
                        <span className={`text-lg font-bold ${
                          entry.mood >= 7 ? 'text-emerald-400' :
                          entry.mood >= 5 ? 'text-yellow-400' :
                          entry.mood >= 3 ? 'text-orange-400' :
                          'text-red-400'
                        }`}>
                          {entry.mood}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-white text-sm font-medium">
                            {new Date(entry.date).toLocaleDateString('fr-FR', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                            })}
                          </span>
                          <div className="flex gap-1">
                            {entry.emotions.map((e) => (
                              <span key={e} className="px-2 py-0.5 bg-mind-blue/10 text-mind-blue text-xs rounded-full">
                                {e}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-400 text-sm line-clamp-2">{entry.note}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Quick Stats & Suggestions */}
          <div className="space-y-6">
            {/* Weekly Summary */}
            <div className="p-6 rounded-2xl bg-night-800/50 border border-white/5">
              <h3 className="text-white font-semibold mb-4">Résumé de la semaine</h3>
              <div className="space-y-3">
                {entries.slice(0, 7).map((entry) => (
                  <div key={entry.id} className="flex items-center gap-3">
                    <span className="text-slate-500 text-xs w-8">
                      {new Date(entry.date).toLocaleDateString('fr-FR', { weekday: 'narrow' })}
                    </span>
                    <div className="flex-1 h-6 bg-night-900/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          entry.mood >= 7 ? 'bg-emerald-500' :
                          entry.mood >= 5 ? 'bg-yellow-500' :
                          entry.mood >= 3 ? 'bg-orange-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${(entry.mood / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-white text-xs w-4">{entry.mood}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-mind-blue/10 to-mind-purple/10 border border-mind-blue/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-mind-blue" />
                Suggestions du jour
              </h3>
              <div className="space-y-3">
                {[
                  { text: 'Essayez une méditation de 10 minutes', link: '/ressources' },
                  { text: 'Écrivez 3 choses pour lesquelles vous êtes reconnaissant', action: () => setShowNewEntry(true) },
                  { text: 'Faites une promenade de 20 minutes', link: null },
                ].map((suggestion, i) => (
                  <div
                    key={i}
                    className="p-3 bg-night-900/30 rounded-lg text-slate-300 text-sm hover:bg-night-900/50 transition-colors cursor-pointer"
                    onClick={() => {
                      if (suggestion.action) suggestion.action();
                    }}
                  >
                    {suggestion.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Entry Dialog */}
      <Dialog open={showNewEntry} onOpenChange={setShowNewEntry}>
        <DialogContent className="bg-night-800 border-white/10 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Nouvelle entrée journalière</DialogTitle>
            <DialogDescription className="text-slate-400">
              Comment vous sentez-vous aujourd'hui ?
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-6">
            {/* Mood */}
            <div>
              <label className="text-white font-medium text-sm mb-3 block">Votre humeur (1-10)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={mood}
                  onChange={(e) => setMood(Number(e.target.value))}
                  className="flex-1 accent-mind-blue"
                />
                <span className="text-white font-semibold w-8 text-right">{mood}</span>
              </div>
              <div className="flex justify-between mt-1 text-xs text-slate-500">
                <span>Très mal</span>
                <span>Neutre</span>
                <span>Excellent</span>
              </div>
            </div>

            {/* Energy */}
            <div>
              <label className="text-white font-medium text-sm mb-3 block">Votre énergie (1-10)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={energy}
                  onChange={(e) => setEnergy(Number(e.target.value))}
                  className="flex-1 accent-yellow-400"
                />
                <span className="text-white font-semibold w-8 text-right">{energy}</span>
              </div>
            </div>

            {/* Sleep */}
            <div>
              <label className="text-white font-medium text-sm mb-3 block">Qualité du sommeil (1-10)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={sleep}
                  onChange={(e) => setSleep(Number(e.target.value))}
                  className="flex-1 accent-mind-purple"
                />
                <span className="text-white font-semibold w-8 text-right">{sleep}</span>
              </div>
            </div>

            {/* Emotions */}
            <div>
              <label className="text-white font-medium text-sm mb-3 block">Émotions ressenties</label>
              <div className="flex flex-wrap gap-2">
                {emotionOptions.map((emotion) => (
                  <button
                    key={emotion}
                    onClick={() => toggleEmotion(emotion)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-all duration-300 ${
                      selectedEmotions.includes(emotion)
                        ? 'bg-mind-blue text-white'
                        : 'bg-night-900/50 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {emotion}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="text-white font-medium text-sm mb-3 block">Note personnelle</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Décrivez votre journée..."
                className="w-full h-24 px-4 py-3 bg-night-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-mind-blue/50 resize-none"
              />
            </div>

            <button
              onClick={handleSubmitEntry}
              className="w-full py-3 bg-mind-blue hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow"
            >
              Enregistrer l'entrée
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Entry Detail Dialog */}
      <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
        <DialogContent className="bg-night-800 border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedEntry && new Date(selectedEntry.date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </DialogTitle>
          </DialogHeader>
          
          {selectedEntry && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-night-900/50 rounded-xl text-center">
                  <Heart className="w-5 h-5 text-mind-pink mx-auto mb-1" />
                  <p className="text-white font-semibold">{selectedEntry.mood}</p>
                  <p className="text-slate-500 text-xs">Humeur</p>
                </div>
                <div className="p-3 bg-night-900/50 rounded-xl text-center">
                  <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                  <p className="text-white font-semibold">{selectedEntry.energy}</p>
                  <p className="text-slate-500 text-xs">Énergie</p>
                </div>
                <div className="p-3 bg-night-900/50 rounded-xl text-center">
                  <Moon className="w-5 h-5 text-mind-purple mx-auto mb-1" />
                  <p className="text-white font-semibold">{selectedEntry.sleep}</p>
                  <p className="text-slate-500 text-xs">Sommeil</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium text-sm mb-2">Émotions</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.emotions.map((e) => (
                    <span key={e} className="px-3 py-1 bg-mind-blue/10 text-mind-blue text-sm rounded-full">
                      {e}
                    </span>
                  ))}
                </div>
              </div>

              {selectedEntry.note && (
                <div>
                  <h4 className="text-white font-medium text-sm mb-2">Note</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{selectedEntry.note}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
