import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { AlertTriangle, ArrowLeft, Brain, CheckCircle, ChevronRight, Heart, Phone, RotateCcw } from 'lucide-react';
import { phq9Questions, gad7Questions } from '@/data/professionals';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TestState {
  answers: number[];
  currentQuestion: number;
  completed: boolean;
  result: { score: number; maxScore: number; severity: string; description: string; recommendation: string } | null;
}

function getPHQ9Result(score: number) {
  if (score <= 4) return {
    severity: 'Minimal',
    description: 'Vos symptômes de dépression sont minimes. Continuez à prendre soin de vous.',
    recommendation: 'Maintenez vos habitudes saines. Notre section ressources peut vous aider à préserver votre bien-être.',
  };
  if (score <= 9) return {
    severity: 'Léger',
    description: 'Vous présentez des symptômes dépressifs légers.',
    recommendation: 'Envisagez de consulter un professionnel. Notre journal de bord peut vous aider à suivre votre humeur.',
  };
  if (score <= 14) return {
    severity: 'Modéré',
    description: 'Vous présentez une dépression modérée.',
    recommendation: 'Nous vous recommandons de consulter un professionnel. Vous pouvez prendre rendez-vous avec l\'un de nos experts.',
  };
  if (score <= 19) return {
    severity: 'Modérément sévère',
    description: 'Vos symptômes sont significatifs.',
    recommendation: 'Une consultation professionnelle est fortement recommandée. Notre hotline est disponible 24h/24.',
  };
  return {
    severity: 'Sévère',
    description: 'Vos symptômes sont sévères.',
    recommendation: 'Veuillez consulter un professionnel dès que possible. Contactez notre hotline d\'urgence 24h/24.',
  };
}

function getGAD7Result(score: number) {
  if (score <= 4) return {
    severity: 'Minimal',
    description: 'Vos symptômes d\'anxiété sont minimes.',
    recommendation: 'Continuez à pratiquer des techniques de relaxation. Nos ressources de méditation peuvent vous aider.',
  };
  if (score <= 9) return {
    severity: 'Léger',
    description: 'Vous présentez une anxiété légère.',
    recommendation: 'Apprenez des stratégies de gestion du stress dans notre section ressources.',
  };
  if (score <= 14) return {
    severity: 'Modéré',
    description: 'Votre anxiété est modérée.',
    recommendation: 'Envisagez une consultation avec un professionnel. Notre communauté peut aussi vous soutenir.',
  };
  return {
    severity: 'Sévère',
    description: 'Votre anxiété est élevée.',
    recommendation: 'Nous vous recommandons vivement de consulter un professionnel. Prenez rendez-vous dès maintenant.',
  };
}

function TestComponent({
  title,
  questions,
  onComplete,
  onResult,
  color,
}: {
  title: string;
  questions: typeof phq9Questions;
  onComplete: () => void;
  onResult: (result: TestState['result']) => void;
  color: string;
}) {
  const [state, setState] = useState<TestState>({
    answers: new Array(questions.length).fill(-1),
    currentQuestion: 0,
    completed: false,
    result: null,
  });
  const navigate = useNavigate();

  const handleAnswer = useCallback((value: number) => {
    setState((prev) => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestion] = value;
      
      if (prev.currentQuestion === questions.length - 1) {
        const score = newAnswers.reduce((a, b) => a + b, 0);
        const result = title.includes('PHQ-9') ? getPHQ9Result(score) : getGAD7Result(score);
        const resultObj = { score, maxScore: questions.length * 3, ...result };
        onResult(resultObj);
        return { ...prev, answers: newAnswers, completed: true, result: resultObj };
      }
      
      return { ...prev, answers: newAnswers, currentQuestion: prev.currentQuestion + 1 };
    });
  }, [questions.length, title, onResult]);

  const handlePrevious = () => {
    setState((prev) => ({
      ...prev,
      currentQuestion: Math.max(0, prev.currentQuestion - 1),
    }));
  };

  const progress = ((state.currentQuestion + 1) / questions.length) * 100;

  if (state.completed && state.result) {
    const isSevere = state.result.severity === 'Sévère' || state.result.severity === 'Modérément sévère';
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className={`p-8 rounded-2xl ${isSevere ? 'bg-red-500/10 border-red-500/30' : 'bg-night-800/50 border-white/5'} border`}>
          <div className="text-center mb-8">
            <div className={`w-16 h-16 rounded-full ${isSevere ? 'bg-red-500/20' : 'bg-emerald-500/20'} flex items-center justify-center mx-auto mb-4`}>
              {isSevere ? (
                <AlertTriangle className="w-8 h-8 text-red-500" />
              ) : (
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              )}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Score: {state.result.score} / {state.result.maxScore}
            </h3>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              isSevere ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {state.result.severity}
            </span>
          </div>

          <div className="space-y-4 mb-8">
            <div className="p-4 bg-night-900/50 rounded-xl">
              <h4 className="text-white font-semibold mb-2">Interprétation</h4>
              <p className="text-slate-400 text-sm">{state.result.description}</p>
            </div>
            <div className="p-4 bg-night-900/50 rounded-xl">
              <h4 className="text-white font-semibold mb-2">Recommandation</h4>
              <p className="text-slate-400 text-sm">{state.result.recommendation}</p>
            </div>
          </div>

          {isSevere && (
            <div className="p-4 bg-red-600/10 border border-red-500/20 rounded-xl mb-6">
              <p className="text-red-400 text-sm text-center">
                <strong>Important:</strong> Ce test ne remplace pas un diagnostic professionnel. Si vous avez des pensées suicidaires, contactez immédiatement notre hotline.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onComplete}
              className="flex-1 px-6 py-3 bg-mind-blue hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Retour aux tests
            </button>
            {isSevere && (
              <button
                onClick={() => navigate('/professionnels')}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Trouver de l'aide
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[state.currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm">Question {state.currentQuestion + 1} / {questions.length}</span>
          <span className="text-slate-400 text-sm">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-night-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%`, backgroundColor: color }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-2">
          Au cours des 2 dernières semaines,
        </h3>
        <p className="text-lg text-slate-300">{currentQ.text}</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {currentQ.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            className={`w-full p-4 rounded-xl border text-left transition-all duration-300 hover:-translate-y-0.5 ${
              state.answers[state.currentQuestion] === option.value
                ? 'border-mind-blue bg-mind-blue/10'
                : 'border-white/5 bg-night-800/50 hover:border-white/20'
            }`}
          >
            <span className="text-white">{option.label}</span>
          </button>
        ))}
      </div>

      {/* Navigation */}
      {state.currentQuestion > 0 && (
        <button
          onClick={handlePrevious}
          className="mt-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Question précédente
        </button>
      )}
    </div>
  );
}

export default function Assessment() {
  const [activeTest, setActiveTest] = useState<'phq9' | 'gad7' | null>(null);
  const [showEmergency, setShowEmergency] = useState(false);

  const handleResult = (result: TestState['result']) => {
    if (result && (result.severity === 'Sévère' || result.severity === 'Modérément sévère')) {
      setShowEmergency(true);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 aurora-bg">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        {!activeTest && (
          <div className="mb-12">
            <p className="text-sm font-semibold text-mind-blue uppercase tracking-widest mb-4">Auto-évaluation</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tests de bien-être mental
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Ces questionnaires standardisés vous aident à évaluer votre état mental. Ils ne remplacent pas un diagnostic professionnel.
            </p>
          </div>
        )}

        {/* Warning */}
        {!activeTest && (
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl mb-10 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-400 text-sm font-medium mb-1">Information importante</p>
              <p className="text-slate-400 text-sm">
                Ces tests sont des outils d'auto-évaluation et ne constituent pas un diagnostic médical. En cas de détresse sévère, consultez immédiatement un professionnel de santé.
              </p>
            </div>
          </div>
        )}

        {/* Test Selection or Active Test */}
        {!activeTest ? (
          <div className="grid md:grid-cols-2 gap-6">
            {/* PHQ-9 Card */}
            <button
              onClick={() => setActiveTest('phq9')}
              className="group text-left p-8 rounded-2xl bg-night-800/50 border border-white/5 hover:border-mind-blue/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="w-14 h-14 rounded-xl bg-mind-blue/20 flex items-center justify-center mb-6 group-hover:bg-mind-blue/30 transition-colors">
                <Brain className="w-7 h-7 text-mind-blue" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">PHQ-9</h3>
              <p className="text-slate-400 text-sm mb-4">
                Questionnaire de santé du patient-9. Évalue la sévérité des symptômes dépressifs.
              </p>
              <div className="flex items-center gap-2 text-mind-blue text-sm">
                <span>9 questions</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* GAD-7 Card */}
            <button
              onClick={() => setActiveTest('gad7')}
              className="group text-left p-8 rounded-2xl bg-night-800/50 border border-white/5 hover:border-mind-purple/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="w-14 h-14 rounded-xl bg-mind-purple/20 flex items-center justify-center mb-6 group-hover:bg-mind-purple/30 transition-colors">
                <Heart className="w-7 h-7 text-mind-purple" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">GAD-7</h3>
              <p className="text-slate-400 text-sm mb-4">
                Échelle d'anxiété généralisée-7. Mesure la sévérité des symptômes anxieux.
              </p>
              <div className="flex items-center gap-2 text-mind-purple text-sm">
                <span>7 questions</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setActiveTest(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
            >
              <RotateCcw className="w-4 h-4" />
              Changer de test
            </button>

            {activeTest === 'phq9' && (
              <TestComponent
                title="PHQ-9"
                questions={phq9Questions}
                onComplete={() => setActiveTest(null)}
                onResult={handleResult}
                color="#3b82f6"
              />
            )}

            {activeTest === 'gad7' && (
              <TestComponent
                title="GAD-7"
                questions={gad7Questions}
                onComplete={() => setActiveTest(null)}
                onResult={handleResult}
                color="#8b5cf6"
              />
            )}
          </div>
        )}

        {/* Emergency Dialog */}
        <Dialog open={showEmergency} onOpenChange={setShowEmergency}>
          <DialogContent className="bg-night-800 border-red-500/30 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                Votre bien-être nous importe
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-slate-400 mb-6">
                Vos résultats indiquent des symptômes significatifs. Nous vous encourageons fortement à consulter un professionnel.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:119"
                  className="flex items-center gap-4 p-4 bg-red-600/10 border border-red-500/20 rounded-xl"
                >
                  <Phone className="w-6 h-6 text-red-500" />
                  <div>
                    <p className="text-white font-semibold">119 - Samu Social</p>
                    <p className="text-slate-400 text-sm">24h/24, appel gratuit</p>
                  </div>
                </a>
              </div>
              <button
                onClick={() => setShowEmergency(false)}
                className="mt-6 w-full px-6 py-3 bg-night-900/50 text-slate-400 rounded-xl hover:text-white transition-colors"
              >
                J'ai compris, continuer
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
