import { Link } from 'react-router';
import { Brain, Heart, Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Consultation vidéo', path: '/professionnels' },
    { label: 'Chat thérapeutique', path: '/professionnels' },
    { label: 'Auto-évaluation', path: '/evaluation' },
    { label: 'Journal de bord', path: '/journal' },
  ],
  ressources: [
    { label: 'Articles', path: '/ressources' },
    { label: 'Podcasts', path: '/ressources' },
    { label: 'Méditation', path: '/ressources' },
    { label: 'Communauté', path: '/communaute' },
  ],
  entreprise: [
    { label: 'À propos', path: '/' },
    { label: 'Nos experts', path: '/professionnels' },
    { label: 'Tarifs', path: '/' },
    { label: 'Contact', path: '/' },
  ],
  legal: [
    { label: 'Confidentialité', path: '/' },
    { label: 'Conditions d\'utilisation', path: '/' },
    { label: 'Sécurité', path: '/' },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-night-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mind-blue to-mind-purple flex items-center justify-center shadow-glow">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Mind<span className="text-mind-blue">Care</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Démocratiser l'accès à la santé mentale au Cameroun. Un espace sûr, confidentiel et bienveillant.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-mind-blue" />
                <span>+237 6XX XXX XXX (Hotline)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-mind-blue" />
                <span>contact@mindcare.cm</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-mind-blue" />
                <span>Yaoundé, Cameroun</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-slate-400 hover:text-mind-blue text-sm transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Ressources</h4>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-slate-400 hover:text-mind-blue text-sm transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.entreprise.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-slate-400 hover:text-mind-blue text-sm transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-slate-400 hover:text-mind-blue text-sm transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 MindCare Cameroun. Tous droits réservés.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1">
            Fait avec <Heart className="w-3 h-3 text-mind-pink fill-mind-pink" /> au Cameroun
            <span className="mx-1">&mdash;</span>
            <a
              href="https://www.beonweb.cm/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-mind-blue transition-colors duration-300"
            >
              Conçu par Beonweb
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
