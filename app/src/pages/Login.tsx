import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth, type UserProfile } from '@/contexts/AuthContext';
import { LogIn, User, Stethoscope, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface DemoProfile {
  id: string;
  name: string;
  email: string;
  role: UserProfile['role'];
  title: string;
  description: string;
  icon: typeof User;
  color: string;
  borderColor: string;
  avatar: string;
}

const demoProfiles: DemoProfile[] = [
  {
    id: 'patient-1',
    name: 'Amélie D.',
    email: 'amelie@demo.mindcare',
    role: 'patient',
    title: 'Patient',
    description: 'Accédez à votre journal, vos tests et la communauté de soutien.',
    icon: User,
    color: 'from-mind-blue to-blue-400',
    borderColor: 'border-mind-blue/30 hover:border-mind-blue/60',
    avatar: 'AD',
  },
  {
    id: 'patient-2',
    name: 'Marc K.',
    email: 'marc@demo.mindcare',
    role: 'patient',
    title: 'Patient',
    description: 'Suivez votre bien-être mental et consultez nos ressources.',
    icon: User,
    color: 'from-mind-purple to-purple-400',
    borderColor: 'border-mind-purple/30 hover:border-mind-purple/60',
    avatar: 'MK',
  },
  {
    id: 'pro-1',
    name: 'Dr. Jean-Pierre Nkoulou',
    email: 'dr.nkoulou@mindcare.cm',
    role: 'professional',
    title: 'Psychologue clinicien',
    description: 'Gérez vos consultations, vos patients et votre planning.',
    icon: Stethoscope,
    color: 'from-emerald-500 to-teal-400',
    borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
    avatar: 'JN',
  },
  {
    id: 'pro-2',
    name: 'Dr. Marie-Claire Essomba',
    email: 'dr.essomba@mindcare.cm',
    role: 'professional',
    title: 'Psychiatre',
    description: 'Accédez à votre tableau de bord professionnel.',
    icon: Stethoscope,
    color: 'from-amber-500 to-orange-400',
    borderColor: 'border-amber-500/30 hover:border-amber-500/60',
    avatar: 'ME',
  },
  {
    id: 'admin-1',
    name: 'Admin MindCare',
    email: 'admin@mindcare.cm',
    role: 'admin',
    title: 'Administrateur',
    description: 'Gérez la plateforme, les professionnels et le contenu.',
    icon: ShieldCheck,
    color: 'from-red-500 to-rose-400',
    borderColor: 'border-red-500/30 hover:border-red-500/60',
    avatar: 'AD',
  },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedProfile, setSelectedProfile] = useState<DemoProfile | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSelectProfile = (profile: DemoProfile) => {
    setSelectedProfile(profile);
    setEmail(profile.email);
    setPassword('demo-password-2024');
  };

  const handleLogin = () => {
    if (!selectedProfile) return;
    setIsLoggingIn(true);

    // Simulate login delay
    setTimeout(() => {
      login({
        id: selectedProfile.id,
        email: selectedProfile.email,
        name: selectedProfile.name,
        role: selectedProfile.role,
        title: selectedProfile.title,
        avatar: selectedProfile.avatar,
      });
      navigate('/');
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center aurora-bg px-4 py-20">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-mind-blue/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-mind-purple/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-mind-blue to-mind-purple flex items-center justify-center mx-auto mb-6 shadow-glow">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Se connecter à <span className="text-mind-blue">MindCare</span>
          </h1>
          <p className="text-slate-400 max-w-md mx-auto">
            Choisissez un profil de démonstration ci-dessous pour accéder à la plateforme.
          </p>
        </div>

        {/* Demo Profiles */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4 text-center">
            Profils de démonstration
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoProfiles.map((profile) => {
              const Icon = profile.icon;
              const isSelected = selectedProfile?.id === profile.id;

              return (
                <button
                  key={profile.id}
                  onClick={() => handleSelectProfile(profile)}
                  className={`relative text-left p-5 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? `${profile.borderColor} bg-gradient-to-br ${profile.color} bg-opacity-10 shadow-lg`
                      : 'border-white/5 bg-night-800/50 hover:border-white/10'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-mind-blue flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${profile.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{profile.name}</p>
                      <p className="text-slate-400 text-xs">{profile.title}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{profile.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Form */}
        <div className="max-w-md mx-auto p-6 rounded-2xl bg-night-800/50 border border-white/5">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-2">Adresse email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-night-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-mind-blue/50 transition-all"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-sm mb-2">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-night-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-mind-blue/50 transition-all pr-12"
                  placeholder="••••••••"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={!selectedProfile || isLoggingIn}
              className="w-full py-3.5 bg-mind-blue hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-mind-blue text-white font-semibold rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connexion...
                </span>
              ) : (
                <>
                  Connexion
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-slate-500 text-xs">
              Mode démonstration — cliquez sur un profil ci-dessus pour remplir automatiquement les champs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
