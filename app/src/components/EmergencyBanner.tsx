import { X, Phone, MessageCircle, AlertTriangle } from 'lucide-react';

interface EmergencyBannerProps {
  onClose: () => void;
}

export function EmergencyBanner({ onClose }: EmergencyBannerProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-night-800 border border-red-500/30 rounded-2xl p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-red-600/20 flex items-center justify-center pulse-emergency">
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Besoin d'aide immédiate ?</h2>
            <p className="text-slate-400 text-sm">Vous n'êtes pas seul. Des professionnels sont là pour vous.</p>
          </div>
        </div>

        {/* Hotline numbers */}
        <div className="space-y-4 mb-6">
          <a
            href="tel:119"
            className="flex items-center gap-4 p-4 bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 rounded-xl transition-all duration-300 group"
          >
            <Phone className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-white font-semibold">119 - Samu Social</p>
              <p className="text-slate-400 text-sm">24h/24, 7j/7 - Appel gratuit</p>
            </div>
          </a>

          <a
            href="tel:+237677772636"
            className="flex items-center gap-4 p-4 bg-mind-blue/10 hover:bg-mind-blue/20 border border-mind-blue/20 rounded-xl transition-all duration-300 group"
          >
            <Phone className="w-6 h-6 text-mind-blue group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-white font-semibold">+237 6 77 77 26 36</p>
              <p className="text-slate-400 text-sm">MindCare Hotline - 24h/24</p>
            </div>
          </a>

          <button
            onClick={() => window.open('https://wa.me/237677772636', '_blank')}
            className="w-full flex items-center gap-4 p-4 bg-green-600/10 hover:bg-green-600/20 border border-green-500/20 rounded-xl transition-all duration-300 group"
          >
            <MessageCircle className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <p className="text-white font-semibold">Chat WhatsApp</p>
              <p className="text-slate-400 text-sm">Discuter avec un conseiller</p>
            </div>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="p-4 bg-night-900/50 rounded-xl border border-white/5">
          <p className="text-slate-400 text-xs text-center leading-relaxed">
            Si vous êtes en danger immédiat, appelez les urgences <strong className="text-white">119</strong> ou rendez-vous au service d'urgences le plus proche. MindCare ne remplace pas les services d'urgence médicale.
          </p>
        </div>
      </div>
    </div>
  );
}
