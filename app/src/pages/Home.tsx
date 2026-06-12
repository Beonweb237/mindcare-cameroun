import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Brain, Shield, Users, MessageCircle, Video, Phone, Lock, Heart, Star, ChevronRight } from 'lucide-react';
import { professionals, resources, pricingPlans } from '@/data/professionals';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text parallax
      gsap.to('.hero-text', {
        y: -10,
        duration: 4,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Scroll-triggered animations
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        
        const elements = section.querySelectorAll('.animate-item');
        gsap.fromTo(
          elements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="aurora-bg">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mind-blue/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mind-purple/20 rounded-full blur-[128px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="hero-text">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mind-blue/10 border border-mind-blue/20 text-mind-blue text-sm font-medium mb-8">
              <Shield className="w-4 h-4" />
              <span>Confidentialité garantie • Anonymat total</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6 glow-text">
              Trouver le calme,
              <br />
              <span className="bg-gradient-to-r from-mind-blue via-mind-purple to-mind-pink bg-clip-text text-transparent">
                un jour à la fois.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              MindCare vous accompagne dans votre parcours de bien-être mental avec des professionnels certifiés, des outils d'auto-évaluation et une communauté bienveillante.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/journal"
                className="group px-8 py-4 bg-mind-blue hover:bg-blue-500 text-white font-semibold rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
              >
                Commencer votre suivi
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/professionnels"
                className="px-8 py-4 text-slate-300 hover:text-white font-medium transition-colors duration-300 flex items-center gap-2"
              >
                En savoir plus
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '50+', label: 'Professionnels' },
                { value: '10K+', label: 'Utilisateurs' },
                { value: '98%', label: 'Satisfaction' },
                { value: '24/7', label: 'Disponibilité' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section
        ref={(el) => { sectionsRef.current[0] = el; }}
        className="relative py-32 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative animate-item">
              <div className="absolute -inset-4 bg-gradient-to-br from-mind-blue/30 to-mind-purple/30 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src="/images/founder-portrait.jpg"
                  alt="Fondateur de MindCare"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-900/80 to-transparent" />
              </div>
              
              {/* Wave effect overlay */}
              <svg className="absolute -bottom-10 left-0 right-0 w-full h-24 opacity-40" viewBox="0 0 400 50" preserveAspectRatio="none">
                <path d="M0,25 Q100,5 200,25 T400,25" fill="none" stroke="url(#wave-gradient)" strokeWidth="2" className="wave-line" />
                <path d="M0,30 Q100,10 200,30 T400,30" fill="none" stroke="url(#wave-gradient)" strokeWidth="1.5" className="wave-line" style={{ animationDelay: '0.3s' }} />
                <defs>
                  <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Quote */}
            <div className="animate-item">
              <p className="text-sm font-semibold text-mind-blue uppercase tracking-widest mb-4">Notre mission</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
                "La santé mentale est un droit, pas un privilège."
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                MindCare est né du constat que beaucoup de personnes traversent des épreuves psychologiques sans jamais trouver l'aide nécessaire. En tant que psychologue passionné, j'ai créé cette application pour démocratiser l'accès au suivi psychologique au Cameroun et en Afrique francophone.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Notre plateforme connecte les personnes en difficulté avec des professionnels certifiés, offre des outils d'auto-évaluation anonymes et crée une communauté de soutien bienveillante où chacun peut s'exprimer librement, sans jugement.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-mind-blue to-mind-purple flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Dr. Fondateur</p>
                  <p className="text-slate-400 text-sm">Psychologue clinicien & Fondateur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={(el) => { sectionsRef.current[1] = el; }}
        className="py-32"
      >
        <div className="max-w-4xl mx-auto px-6 text-center animate-item">
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
            Il est temps de prendre soin de votre{' '}
            <span className="bg-gradient-to-r from-mind-blue to-mind-purple bg-clip-text text-transparent">
              santé mentale.
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Ensemble, commençons votre parcours vers un bien-être durable. Des professionnels qualifiés vous attendent.
          </p>
          <Link
            to="/communaute"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-mind-blue to-mind-purple text-white font-semibold rounded-xl shadow-glow-lg hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] transition-all duration-300 hover:-translate-y-1"
          >
            <Users className="w-5 h-5" />
            Rejoindre la communauté
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={(el) => { sectionsRef.current[2] = el; }}
        className="py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-item">
            <p className="text-sm font-semibold text-mind-blue uppercase tracking-widest mb-4">Nos services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Une suite complète d'outils et de services pour votre bien-être mental, conçue avec des professionnels de santé.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Video,
                title: 'Consultation vidéo anonyme',
                description: 'Échangez en toute confidentialité avec des professionnels certifiés via visioconférence sécurisée.',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: MessageCircle,
                title: 'Chat thérapeutique',
                description: 'Messagerie asynchrone cryptée pour un suivi continu avec votre thérapeute.',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: Brain,
                title: 'Tests d\'auto-évaluation',
                description: 'Évaluez votre bien-mental avec des questionnaires validés (PHQ-9, GAD-7, MBI).',
                color: 'from-emerald-500 to-teal-500',
              },
              {
                icon: Users,
                title: 'Communauté anonyme',
                description: 'Rejoignez des groupes de soutien par thématique dans un espace bienveillant et sans jugement.',
                color: 'from-orange-500 to-red-500',
              },
              {
                icon: Lock,
                title: 'Confidentialité maximale',
                description: 'Vos données sont cryptées et ne sont jamais partagées. Anonymat garanti.',
                color: 'from-indigo-500 to-purple-500',
              },
              {
                icon: Phone,
                title: 'Hotline d\'urgence',
                description: 'Accédez à une ligne d\'écoute 24h/24 en cas de crise suicidaire ou d\'urgence.',
                color: 'from-red-500 to-pink-500',
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="animate-item group p-6 rounded-2xl bg-night-800/50 border border-white/5 hover:border-mind-blue/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section
        ref={(el) => { sectionsRef.current[3] = el; }}
        className="py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-item">
            <p className="text-sm font-semibold text-mind-blue uppercase tracking-widest mb-4">Nos experts</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Des professionnels certifiés à votre écoute
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Tous nos psychologues, psychiatres et conseillers sont vérifiés et certifiés. Consultez leurs profils, leurs spécialités et les langues qu'ils parlent.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.slice(0, 3).map((pro, i) => (
              <div
                key={pro.id}
                className="animate-item group relative rounded-2xl bg-night-800/50 border border-white/5 overflow-hidden hover:border-mind-blue/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={pro.image}
                    alt={pro.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-night-900/80 backdrop-blur-sm rounded-lg">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs font-medium">{pro.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white">{pro.name}</h3>
                    {pro.verified && (
                      <Shield className="w-4 h-4 text-mind-blue" />
                    )}
                  </div>
                  <p className="text-mind-blue text-sm mb-3">{pro.title}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pro.specialties.map((s) => (
                      <span key={s} className="px-2 py-1 bg-mind-blue/10 text-mind-blue text-xs rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>{pro.experience} ans d'exp.</span>
                    <span>{pro.languages.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 animate-item">
            <Link
              to="/professionnels"
              className="inline-flex items-center gap-2 px-6 py-3 border border-mind-blue/30 text-mind-blue hover:bg-mind-blue/10 rounded-xl transition-all duration-300"
            >
              Voir tous les experts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Journal Preview Section */}
      <section
        ref={(el) => { sectionsRef.current[4] = el; }}
        className="py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-item">
              <p className="text-sm font-semibold text-mind-blue uppercase tracking-widest mb-4">Journal de bord</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Suivez vos émotions au quotidien
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Notre journal de bord émotionnel vous permet de noter votre humeur, vos pensées et vos ressentis. Visualisez vos progrès au fil du temps grâce à des courbes et des analyses personnalisées.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Notes d\'humeur quotidiennes',
                  'Courbes de progression visuelles',
                  'Analyse des patterns émotionnels',
                  'Partage sécurisé avec votre thérapeute',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-mind-blue/20 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-3 h-3 text-mind-blue" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/journal"
                className="inline-flex items-center gap-2 px-6 py-3 bg-mind-blue hover:bg-blue-500 text-white font-semibold rounded-xl shadow-glow transition-all duration-300 hover:-translate-y-1"
              >
                Découvrir le journal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mood Chart Preview */}
            <div className="animate-item">
              <div className="relative p-6 rounded-2xl bg-night-800/50 border border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold">Votre humeur cette semaine</h3>
                  <span className="text-slate-400 text-sm">Fév 2024</span>
                </div>
                <svg viewBox="0 0 400 200" className="w-full h-auto">
                  {/* Grid lines */}
                  {[0, 50, 100, 150, 200].map((y) => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  ))}
                  {/* Area under curve */}
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,120 Q50,80 100,100 T200,60 T300,90 T400,40 L400,200 L0,200 Z"
                    fill="url(#moodGradient)"
                  />
                  {/* Line */}
                  <path
                    d="M0,120 Q50,80 100,100 T200,60 T300,90 T400,40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="animate-draw"
                  />
                  {/* Points */}
                  {[
                    { x: 0, y: 120 },
                    { x: 100, y: 100 },
                    { x: 200, y: 60 },
                    { x: 300, y: 90 },
                    { x: 400, y: 40 },
                  ].map((point, i) => (
                    <circle key={i} cx={point.x} cy={point.y} r="5" fill="#3b82f6" stroke="#0a0a12" strokeWidth="2" />
                  ))}
                </svg>
                <div className="flex justify-between mt-4 text-slate-400 text-xs">
                  <span>Lun</span>
                  <span>Mar</span>
                  <span>Mer</span>
                  <span>Jeu</span>
                  <span>Ven</span>
                  <span>Sam</span>
                  <span>Dim</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section
        ref={(el) => { sectionsRef.current[5] = el; }}
        className="py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-item">
            <p className="text-sm font-semibold text-mind-blue uppercase tracking-widest mb-4">Ressources</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Apprenez à mieux vous comprendre
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Accédez à des articles, podcasts et exercices de méditation guidée élaborés par des professionnels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.slice(0, 3).map((resource, i) => (
              <div
                key={resource.id}
                className="animate-item group rounded-2xl bg-night-800/50 border border-white/5 overflow-hidden hover:border-mind-blue/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover card-3d"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
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
                    {resource.duration && (
                      <span className="text-slate-500 text-xs">{resource.duration}</span>
                    )}
                    {resource.readTime && (
                      <span className="text-slate-500 text-xs">{resource.readTime}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-mind-blue transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">{resource.description}</p>
                  <p className="text-slate-500 text-xs">Par {resource.author}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 animate-item">
            <Link
              to="/ressources"
              className="inline-flex items-center gap-2 px-6 py-3 border border-mind-blue/30 text-mind-blue hover:bg-mind-blue/10 rounded-xl transition-all duration-300"
            >
              Explorer les ressources
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section
        ref={(el) => { sectionsRef.current[6] = el; }}
        className="py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-item">
            <p className="text-sm font-semibold text-mind-blue uppercase tracking-widest mb-4">Communauté</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Vous n'êtes pas seul
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Rejoignez notre communauté anonyme et bienveillante pour partager vos expériences et trouver du soutien.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                initials: 'A.D.',
                text: "Grâce à MindCare, j'ai enfin trouvé l'aide dont j'avais besoin. La communauté m'a beaucoup soutenu pendant ma dépression.",
                topic: 'Dépression',
              },
              {
                initials: 'M.K.',
                text: "Les consultations anonymes m'ont permis de parler librement sans crainte du jugement. Un vrai soulagement.",
                topic: 'Anxiété',
              },
              {
                initials: 'S.N.',
                text: "Le journal de bord m'aide énormément à comprendre mes émotions et à suivre mes progrès. Merci MindCare !",
                topic: 'Bien-être',
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="animate-item p-6 rounded-2xl bg-night-800/50 border border-white/5 hover:border-mind-purple/30 transition-all duration-500"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mind-blue to-mind-purple flex items-center justify-center text-white text-sm font-semibold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Membre anonyme</p>
                    <span className="px-2 py-0.5 bg-mind-purple/10 text-mind-purple text-xs rounded-full">
                      {testimonial.topic}
                    </span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>

          <div className="text-center animate-item">
            <Link
              to="/communaute"
              className="inline-flex items-center gap-2 px-6 py-3 border border-mind-purple/30 text-mind-purple hover:bg-mind-purple/10 rounded-xl transition-all duration-300"
            >
              Rejoindre la communauté
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        ref={(el) => { sectionsRef.current[7] = el; }}
        className="py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-item">
            <p className="text-sm font-semibold text-mind-blue uppercase tracking-widest mb-4">Tarifs</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Commencez gratuitement, évoluez à votre rythme
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Consultez nos différentes formules adaptées à vos besoins et à votre budget.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <div
                key={plan.id}
                className={`animate-item relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-mind-blue/20 to-night-800/50 border-2 border-mind-blue/50 shadow-glow'
                    : 'bg-night-800/50 border border-white/5 hover:border-white/10'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-mind-blue text-white text-xs font-semibold rounded-full">
                    Recommandé
                  </div>
                )}
                
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">
                    {plan.price === 0 ? 'Gratuit' : `${plan.price.toLocaleString()} FCFA`}
                  </span>
                  {plan.price > 0 && <span className="text-slate-400 text-sm">/{plan.period}</span>}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-slate-300 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.highlighted ? 'bg-mind-blue/20' : 'bg-white/5'
                      }`}>
                        <Heart className={`w-3 h-3 ${plan.highlighted ? 'text-mind-blue' : 'text-slate-400'}`} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-mind-blue hover:bg-blue-500 text-white shadow-glow hover:shadow-glow-lg'
                      : 'bg-white/5 hover:bg-white/10 text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
