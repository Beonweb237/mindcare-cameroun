import { useState } from 'react';
import { Heart, Shield, Briefcase, CloudRain, Sun, Users, MessageCircle, Clock, Lock, Send } from 'lucide-react';
import { communityTopics } from '@/data/professionals';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const iconMap: Record<string, typeof Heart> = {
  Heart,
  Shield,
  Briefcase,
  CloudRain,
  Sun,
  Users,
};

const mockPosts = [
  {
    id: '1',
    author: 'Anonyme',
    initials: 'A.D.',
    content: "Je me sens un peu mieux cette semaine. La méditation quotidienne m'aide beaucoup à gérer mon anxiété. Merci à tous pour votre soutien.",
    topic: 'Anxiété généralisée',
    likes: 12,
    replies: 3,
    time: 'Il y a 2h',
  },
  {
    id: '2',
    author: 'Anonyme',
    initials: 'M.K.',
    content: "C'est ma première semaine sans cigarette. C'est difficile mais je tiens bon. Si quelqu'un a des conseils pour gérer les cravings, je suis preneur.",
    topic: 'Addiction et sevrage',
    likes: 24,
    replies: 8,
    time: 'Il y a 4h',
  },
  {
    id: '3',
    author: 'Anonyme',
    initials: 'S.N.',
    content: "Mon patron vient de m'assigner un nouveau projet avec des délais impossibles. Je sens que le burn-out guette. Comment vous gérez le stress au travail ?",
    topic: 'Stress au travail',
    likes: 18,
    replies: 12,
    time: 'Il y a 6h',
  },
  {
    id: '4',
    author: 'Anonyme',
    initials: 'J.P.',
    content: "Ça fait 3 mois que j'ai perdu ma mère. Certains jours vont mieux, d'autres sont très durs. Merci à ce groupe d'exister.",
    topic: 'Deuil et perte',
    likes: 31,
    replies: 15,
    time: 'Il y a 8h',
  },
  {
    id: '5',
    author: 'Anonyme',
    initials: 'L.M.',
    content: "Aujourd'hui j'ai réussi à sortir de mon lit et à faire une promenade. C'est une petite victoire mais ça compte énormément pour moi.",
    topic: 'Dépression et humeur',
    likes: 45,
    replies: 20,
    time: 'Il y a 10h',
  },
];

export default function Community() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState(mockPosts);
  const [showGuidelines, setShowGuidelines] = useState(false);

  const filteredPosts = selectedTopic
    ? posts.filter((p) => p.topic === communityTopics.find((t) => t.id === selectedTopic)?.title)
    : posts;

  const handleSubmitPost = () => {
    if (!newPost.trim()) return;
    const topic = selectedTopic
      ? communityTopics.find((t) => t.id === selectedTopic)?.title || 'Général'
      : 'Général';
    
    setPosts((prev) => [
      {
        id: Date.now().toString(),
        author: 'Anonyme',
        initials: 'Vous',
        content: newPost,
        topic,
        likes: 0,
        replies: 0,
        time: 'À l\'instant',
      },
      ...prev,
    ]);
    setNewPost('');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 aurora-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-semibold text-mind-blue uppercase tracking-widest mb-4">Communauté</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Vous n'êtes pas seul
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Rejoignez notre communauté anonyme et bienveillante. Partagez vos expériences et trouvez du soutien auprès de personnes qui vous comprennent.
          </p>
        </div>

        {/* Anonymity guarantee */}
        <div className="mb-10 p-4 bg-mind-blue/5 border border-mind-blue/20 rounded-xl flex items-start gap-3">
          <Lock className="w-5 h-5 text-mind-blue flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-mind-blue text-sm font-medium mb-1">Anonymat garanti</p>
            <p className="text-slate-400 text-sm">
              Votre identité reste confidentielle. Seules vos initiales anonymisées sont visibles. Aucune donnée personnelle n'est partagée.
            </p>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Groupes de soutien</h2>
            <button
              onClick={() => setShowGuidelines(true)}
              className="text-mind-blue text-sm hover:underline"
            >
              Charte de la communauté
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communityTopics.map((topic) => {
              const Icon = iconMap[topic.icon] || Heart;
              const isActive = selectedTopic === topic.id;
              
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(isActive ? null : topic.id)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-mind-blue/10 border-mind-blue/30'
                      : 'bg-night-800/50 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-mind-blue/20' : 'bg-white/5'
                    }`}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-mind-blue' : 'text-slate-400'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium mb-1">{topic.title}</h3>
                      <p className="text-slate-400 text-xs mb-3 line-clamp-2">{topic.description}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {topic.memberCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {topic.postCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {topic.lastActivity}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* New Post */}
        <div className="mb-10 p-6 rounded-2xl bg-night-800/50 border border-white/5">
          <h3 className="text-white font-medium mb-4">
            {selectedTopic
              ? `Poster dans ${communityTopics.find((t) => t.id === selectedTopic)?.title}`
              : 'Partager votre ressenti'}
          </h3>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Exprimez-vous librement... Votre message sera anonyme."
            className="w-full h-24 px-4 py-3 bg-night-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-mind-blue/50 resize-none mb-4"
          />
          <div className="flex items-center justify-between">
            <p className="text-slate-500 text-xs">Tous les messages sont modérés avec bienveillance.</p>
            <button
              onClick={handleSubmitPost}
              disabled={!newPost.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-mind-blue hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-mind-blue text-white font-medium rounded-lg transition-all duration-300"
            >
              <Send className="w-4 h-4" />
              Publier
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-6">
            {selectedTopic
              ? `Messages dans ${communityTopics.find((t) => t.id === selectedTopic)?.title}`
              : 'Derniers messages'}
          </h2>

          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-6 rounded-2xl bg-night-800/50 border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mind-blue to-mind-purple flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                  {post.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-slate-300 text-sm font-medium">{post.author}</span>
                    <span className="text-slate-600 text-xs">{post.time}</span>
                    <span className="px-2 py-0.5 bg-mind-purple/10 text-mind-purple text-xs rounded-full">
                      {post.topic}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{post.content}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-slate-500 hover:text-mind-pink text-sm transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-slate-500 hover:text-mind-blue text-sm transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.replies} réponses</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guidelines Dialog */}
      <Dialog open={showGuidelines} onOpenChange={setShowGuidelines}>
        <DialogContent className="bg-night-800 border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Charte de la communauté</DialogTitle>
            <DialogDescription className="text-slate-400">
              Règles pour un espace bienveillant et sécurisé
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {[
              {
                title: 'Anonymat',
                description: 'Ne partagez jamais d\'informations personnelles identifiables (nom, adresse, téléphone).',
              },
              {
                title: 'Bienveillance',
                description: 'Soyez bienveillant dans vos réponses. Chaque personne traverse des épreuves uniques.',
              },
              {
                title: 'Pas de jugement',
                description: 'Ce lieu est exempt de jugement. N\'critiquez pas les expériences des autres.',
              },
              {
                title: 'Pas de conseils médicaux',
                description: 'Ne donnez pas de conseils médicaux. Encouragez plutôt la consultation professionnelle.',
              },
              {
                title: 'Signalement',
                description: 'Signalez tout contenu inapproprié. Notre équipe modère avec bienveillance.',
              },
            ].map((rule) => (
              <div key={rule.title} className="p-3 bg-night-900/50 rounded-lg">
                <h4 className="text-white font-medium text-sm mb-1">{rule.title}</h4>
                <p className="text-slate-400 text-sm">{rule.description}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
