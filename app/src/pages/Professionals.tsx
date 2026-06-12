import { useState, useMemo } from 'react';
import { Search, Filter, Shield, Star, Languages, Clock, Video, MessageCircle } from 'lucide-react';
import { professionals } from '@/data/professionals';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function Professionals() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedPro, setSelectedPro] = useState<typeof professionals[0] | null>(null);
  const [bookingType, setBookingType] = useState<'video' | 'chat' | null>(null);

  const specialties = useMemo(() => {
    const set = new Set<string>();
    professionals.forEach((p) => p.specialties.forEach((s) => set.add(s)));
    return ['all', ...Array.from(set)];
  }, []);

  const languages = useMemo(() => {
    const set = new Set<string>();
    professionals.forEach((p) => p.languages.forEach((l) => set.add(l)));
    return ['all', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return professionals.filter((pro) => {
      const matchesSearch =
        searchQuery === '' ||
        pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pro.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pro.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSpecialty = selectedSpecialty === 'all' || pro.specialties.includes(selectedSpecialty);
      const matchesLanguage = selectedLanguage === 'all' || pro.languages.includes(selectedLanguage);
      return matchesSearch && matchesSpecialty && matchesLanguage;
    });
  }, [searchQuery, selectedSpecialty, selectedLanguage]);

  return (
    <div className="min-h-screen pt-24 pb-16 aurora-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-semibold text-mind-blue uppercase tracking-widest mb-4">Annuaire</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nos professionnels de santé mentale
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Tous nos psychologues, psychiatres et conseillers sont vérifiés et certifiés. Trouvez celui qui vous correspond.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, spécialité..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-night-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-mind-blue/50 focus:ring-1 focus:ring-mind-blue/50 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 text-sm">Spécialité:</span>
            </div>
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 ${
                  selectedSpecialty === spec
                    ? 'bg-mind-blue text-white'
                    : 'bg-night-800/50 text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
                }`}
              >
                {spec === 'all' ? 'Toutes' : spec}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 text-sm">Langue:</span>
            </div>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 ${
                  selectedLanguage === lang
                    ? 'bg-mind-purple text-white'
                    : 'bg-night-800/50 text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
                }`}
              >
                {lang === 'all' ? 'Toutes' : lang}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-slate-400 text-sm mb-6">
          {filtered.length} professionnel{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pro) => (
            <div
              key={pro.id}
              className="group rounded-2xl bg-night-800/50 border border-white/5 overflow-hidden hover:border-mind-blue/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={pro.image}
                  alt={pro.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-night-900/80 backdrop-blur-sm rounded-lg">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-medium">{pro.rating}</span>
                  <span className="text-slate-400 text-xs">({pro.reviews})</span>
                </div>
                {pro.verified && (
                  <div className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 bg-mind-blue/20 backdrop-blur-sm rounded-lg">
                    <Shield className="w-3 h-3 text-mind-blue" />
                    <span className="text-mind-blue text-xs font-medium">Vérifié</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-1">{pro.name}</h3>
                <p className="text-mind-blue text-sm mb-3">{pro.title}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {pro.specialties.map((s) => (
                    <span key={s} className="px-2 py-1 bg-mind-blue/10 text-mind-blue text-xs rounded-full">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Languages className="w-3 h-3" />
                    <span>{pro.languages.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{pro.experience} ans</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <span className="text-white font-semibold">{pro.pricePerSession.toLocaleString()} FCFA</span>
                    <span className="text-slate-500 text-xs">/séance</span>
                  </div>
                  <button
                    onClick={() => setSelectedPro(pro)}
                    className="px-4 py-2 bg-mind-blue hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-glow"
                  >
                    Consulter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">Aucun professionnel ne correspond à vos critères.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialty('all');
                setSelectedLanguage('all');
              }}
              className="mt-4 text-mind-blue hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Booking Dialog */}
      <Dialog open={!!selectedPro} onOpenChange={() => { setSelectedPro(null); setBookingType(null); }}>
        <DialogContent className="bg-night-800 border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Prendre rendez-vous</DialogTitle>
            <DialogDescription className="text-slate-400">
              {selectedPro?.name} — {selectedPro?.title}
            </DialogDescription>
          </DialogHeader>

          {!bookingType ? (
            <div className="space-y-4 mt-4">
              <button
                onClick={() => setBookingType('video')}
                className="w-full p-4 rounded-xl bg-night-900/50 border border-white/5 hover:border-mind-blue/30 transition-all duration-300 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-mind-blue/20 flex items-center justify-center group-hover:bg-mind-blue/30 transition-colors">
                    <Video className="w-6 h-6 text-mind-blue" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Consultation vidéo</h4>
                    <p className="text-slate-400 text-sm">Visioconférence sécurisée et anonyme</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setBookingType('chat')}
                className="w-full p-4 rounded-xl bg-night-900/50 border border-white/5 hover:border-mind-purple/30 transition-all duration-300 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-mind-purple/20 flex items-center justify-center group-hover:bg-mind-purple/30 transition-colors">
                    <MessageCircle className="w-6 h-6 text-mind-purple" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Chat thérapeutique</h4>
                    <p className="text-slate-400 text-sm">Messagerie asynchrone cryptée</p>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              <div className="p-4 rounded-xl bg-night-900/50 border border-white/5">
                <h4 className="text-white font-semibold mb-2">
                  {bookingType === 'video' ? 'Consultation vidéo' : 'Chat thérapeutique'}
                </h4>
                <p className="text-slate-400 text-sm mb-4">
                  {selectedPro?.name} — {selectedPro?.pricePerSession.toLocaleString()} FCFA/séance
                </p>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-slate-400 text-sm mb-1 block">Date souhaitée</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 bg-night-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mind-blue/50"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm mb-1 block">Heure</label>
                    <select className="w-full px-4 py-2 bg-night-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-mind-blue/50">
                      <option>08:00</option>
                      <option>09:00</option>
                      <option>10:00</option>
                      <option>11:00</option>
                      <option>14:00</option>
                      <option>15:00</option>
                      <option>16:00</option>
                      <option>17:00</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setBookingType(null)}
                  className="flex-1 border-white/10 text-white hover:bg-white/5"
                >
                  Retour
                </Button>
                <Button
                  onClick={() => {
                    alert('Rendez-vous confirmé ! Un email de confirmation vous sera envoyé.');
                    setSelectedPro(null);
                    setBookingType(null);
                  }}
                  className="flex-1 bg-mind-blue hover:bg-blue-500"
                >
                  Confirmer le rendez-vous
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
