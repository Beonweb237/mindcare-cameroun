import { useState, useMemo } from 'react';
import { BookOpen, Headphones, Wind, Clock, User, Play, Pause } from 'lucide-react';
import { resources } from '@/data/professionals';

type FilterType = 'all' | 'article' | 'podcast' | 'meditation';

export default function Resources() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchesFilter = activeFilter === 'all' || r.type === activeFilter;
      const matchesSearch =
        searchQuery === '' ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const filters: { value: FilterType; label: string; icon: typeof BookOpen }[] = [
    { value: 'all', label: 'Tout', icon: BookOpen },
    { value: 'article', label: 'Articles', icon: BookOpen },
    { value: 'podcast', label: 'Podcasts', icon: Headphones },
    { value: 'meditation', label: 'Méditations', icon: Wind },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 aurora-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-semibold text-mind-blue uppercase tracking-widest mb-4">Ressources</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Apprenez à mieux vous comprendre
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Accédez à des articles, podcasts et exercices de méditation guidée élaborés par des professionnels pour vous accompagner au quotidien.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Rechercher une ressource..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-lg px-4 py-3 bg-night-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-mind-blue/50 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeFilter === filter.value
                  ? 'bg-mind-blue text-white'
                  : 'bg-night-800/50 text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
              }`}
            >
              <filter.icon className="w-4 h-4" />
              {filter.label}
            </button>
          ))}
        </div>

        {/* Featured Resource */}
        {activeFilter === 'all' && !searchQuery && (
          <div className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-mind-blue/10 to-mind-purple/10 border border-mind-blue/20">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/2">
                <span className="inline-block px-3 py-1 bg-mind-blue/20 text-mind-blue text-xs font-medium rounded-full mb-4">
                  Ressource du jour
                </span>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Méditation guidée : Retour au calme
                </h2>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Une séance de méditation de 15 minutes pour apaiser votre esprit et retrouver votre centre. Parfaite pour les moments de stress ou d'anxiété.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>15 minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <User className="w-4 h-4" />
                    <span>Dr. Marie-Claire Essomba</span>
                  </div>
                </div>
                <button
                  onClick={() => setPlayingId(playingId === 'featured' ? null : 'featured')}
                  className="flex items-center gap-3 px-6 py-3 bg-mind-blue hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow"
                >
                  {playingId === 'featured' ? (
                    <>
                      <Pause className="w-5 h-5" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Écouter maintenant
                    </>
                  )}
                </button>
              </div>
              <div className="lg:w-1/2">
                <img
                  src="/images/resource-3.jpg"
                  alt="Méditation"
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        )}

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((resource) => (
            <div
              key={resource.id}
              className="group rounded-2xl bg-night-800/50 border border-white/5 overflow-hidden hover:border-mind-blue/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-900/60 to-transparent" />
                
                {/* Play button for audio/meditation */}
                {(resource.type === 'podcast' || resource.type === 'meditation') && (
                  <button
                    onClick={() => setPlayingId(playingId === resource.id ? null : resource.id)}
                    className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-mind-blue/90 hover:bg-mind-blue flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    {playingId === resource.id ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                  </button>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    resource.type === 'article' ? 'bg-emerald-500/10 text-emerald-400' :
                    resource.type === 'podcast' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-blue-500/10 text-blue-400'
                  }`}>
                    {resource.type === 'article' ? 'Article' : resource.type === 'podcast' ? 'Podcast' : 'Méditation'}
                  </span>
                  <span className="text-slate-500 text-xs">{resource.category}</span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-mind-blue transition-colors">
                  {resource.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{resource.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {resource.author}
                    </span>
                    {resource.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {resource.duration}
                      </span>
                    )}
                    {resource.readTime && (
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {resource.readTime}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">Aucune ressource ne correspond à vos critères.</p>
          </div>
        )}
      </div>
    </div>
  );
}
