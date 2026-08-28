import { useState, useCallback, useEffect } from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Award,
  Calendar,
  Flag,
  Lightbulb,
  Quote,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { quizQuestions, timelineEvents, polarFacts } from '@/data/mockData';

function QuizModule() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const question = quizQuestions[current];
  const total = quizQuestions.length;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    const correct = index === question.correctIndex;
    if (correct) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, correct]);
  };

  const handleNext = () => {
    if (current + 1 < total) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  if (finished) {
    const percentage = Math.round((score / total) * 100);
    const grade =
      percentage === 100
        ? 'Polar Scholar'
        : percentage >= 80
          ? 'Polar Explorer'
          : percentage >= 60
            ? 'Polar Adventurer'
            : 'Polar Cadet';

    return (
      <div className="glass-panel rounded-2xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-frost-cyan/10 rounded-full blur-3xl" />

        {/* Certificate Badge */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto mb-5 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-frost-cyan/20 to-frost-blue/10 border-2 border-frost-cyan/40 flex items-center justify-center">
              <Award className="w-12 h-12 text-frost-cyan" style={{ filter: 'drop-shadow(0 0 12px rgba(6,182,212,0.6))' }} />
            </div>
            <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
          </div>

          <div className="inline-block px-4 py-1 rounded-full bg-frost-cyan/10 border border-frost-cyan/30 mb-3">
            <span className="text-xs font-mono text-frost-cyan tracking-widest">CERTIFICATE OF ACHIEVEMENT</span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-1">{grade}</h3>
          <p className="text-slate-400 mb-4">ICEBYTE Polar Quest — Student Outreach Program</p>

          <div className="flex items-center justify-center gap-6 mb-6">
            <div>
              <p className="text-4xl font-mono font-bold text-frost-cyan">
                {score}<span className="text-2xl text-slate-500">/{total}</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">Score</p>
            </div>
            <div className="w-px h-12 bg-polar-border" />
            <div>
              <p className="text-4xl font-mono font-bold text-white">{percentage}%</p>
              <p className="text-xs text-slate-500 mt-1">Accuracy</p>
            </div>
          </div>

          {/* Answer review */}
          <div className="flex items-center justify-center gap-1.5 mb-6">
            {answers.map((correct, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-md flex items-center justify-center text-xs ${
                  correct
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}
              >
                {correct ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              </div>
            ))}
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-frost-cyan/10 border border-frost-cyan/30 text-frost-cyan text-sm font-medium hover:bg-frost-cyan/20 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-frost-cyan" />
          <span className="text-sm font-medium text-slate-200">Polar Quest</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-500">
            Q {current + 1} / {total}
          </span>
          <span className="text-xs font-mono text-frost-cyan">Score: {score}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-polar-bg rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-frost-cyan to-frost-blue transition-all duration-300"
          style={{ width: `${((current + (answered ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      {/* Question dots */}
      <div className="flex items-center justify-center gap-1.5 mb-5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 bg-frost-cyan'
                : i < current
                  ? 'w-1.5 bg-frost-cyan/40'
                  : 'w-1.5 bg-polar-border'
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <h3 className="text-lg font-semibold text-white mb-4 leading-snug">{question.question}</h3>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correctIndex;
          const isSelected = i === selected;
          let cls = 'bg-polar-card border-polar-border text-slate-300 hover:border-frost-cyan/30 hover:bg-frost-cyan/5';
          if (answered) {
            if (isCorrect) {
              cls = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300';
            } else if (isSelected) {
              cls = 'bg-red-500/10 border-red-500/40 text-red-300';
            } else {
              cls = 'bg-polar-card border-polar-border text-slate-500 opacity-60';
            }
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all text-sm text-left ${cls} ${
                !answered ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <span>{opt}</span>
              {answered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {answered && isSelected && !isCorrect && (
                <XCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div className="animate-fade-in mb-4">
          <div
            className={`p-3 rounded-lg border text-sm ${
              selected === question.correctIndex
                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-200'
                : 'bg-amber-500/5 border-amber-500/20 text-amber-200'
            }`}
          >
            {selected === question.correctIndex ? 'Correct! ' : 'Not quite. '}
            {question.explanation}
          </div>
        </div>
      )}

      {/* Next button */}
      {answered && (
        <button
          onClick={handleNext}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-frost-cyan/10 border border-frost-cyan/30 text-frost-cyan text-sm font-medium hover:bg-frost-cyan/20 transition-colors animate-fade-in"
        >
          {current + 1 < total ? 'Next Question' : 'See Results'}
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-4 h-4 text-frost-cyan" />
        <span className="text-sm font-medium text-slate-200">India's Polar Expeditions Timeline</span>
        <span className="text-xs text-slate-500 ml-2">1981 — 2026</span>
      </div>

      {/* Timeline track */}
      <div className="relative mb-6">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-polar-border" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-frost-cyan to-frost-blue transition-all duration-300"
          style={{ width: `${(activeIndex / (timelineEvents.length - 1)) * 100}%` }}
        />

        {/* Year markers */}
        <div className="relative flex justify-between">
          {timelineEvents.map((event, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  i === activeIndex
                    ? 'bg-frost-cyan border-frost-cyan scale-125'
                    : i < activeIndex
                      ? 'bg-frost-cyan/20 border-frost-cyan/40'
                      : 'bg-polar-bg border-polar-border group-hover:border-frost-cyan/30'
                }`}
                style={
                  i === activeIndex
                    ? { boxShadow: '0 0 12px rgba(6,182,212,0.6)' }
                    : undefined
                }
              >
                {event.milestone ? (
                  <Flag className="w-3.5 h-3.5 text-white" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                )}
              </div>
              <span
                className={`text-[10px] font-mono transition-colors ${
                  i === activeIndex ? 'text-frost-cyan font-bold' : 'text-slate-500'
                }`}
              >
                {event.year}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active event detail */}
      <div
        key={activeIndex}
        className="p-4 rounded-xl bg-polar-bg/40 border border-polar-border/50 animate-fade-in"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-frost-cyan/10 border border-frost-cyan/30 flex items-center justify-center shrink-0">
            <span className="text-xs font-mono font-bold text-frost-cyan">
              {timelineEvents[activeIndex].year.toString().slice(-2)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-white">{timelineEvents[activeIndex].expedition}</h4>
              {timelineEvents[activeIndex].milestone && (
                <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-mono text-amber-300">
                  MILESTONE
                </span>
              )}
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {timelineEvents[activeIndex].description}
            </p>
          </div>
        </div>
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
          disabled={activeIndex === 0}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg glass-panel text-xs text-slate-400 hover:text-frost-cyan disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <span className="text-xs font-mono text-slate-500">
          {activeIndex + 1} / {timelineEvents.length}
        </span>
        <button
          onClick={() => setActiveIndex((i) => Math.min(timelineEvents.length - 1, i + 1))}
          disabled={activeIndex === timelineEvents.length - 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg glass-panel text-xs text-slate-400 hover:text-frost-cyan disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function FactsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % polarFacts.length);
  }, []);

  const prev = () => {
    setIndex((i) => (i - 1 + polarFacts.length) % polarFacts.length);
  };

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) next();
    }, 6000);
    return () => clearInterval(interval);
  }, [paused, next]);

  return (
    <div
      className="glass-panel rounded-2xl p-6 relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-frost-cyan/5 rounded-full blur-3xl" />

      <div className="flex items-center gap-2 mb-4 relative">
        <Lightbulb className="w-4 h-4 text-amber-300" />
        <span className="text-sm font-medium text-slate-200">Did You Know?</span>
      </div>

      <div className="relative min-h-[120px]">
        <div key={index} className="animate-fade-in">
          <Quote className="w-6 h-6 text-frost-cyan/30 mb-2" />
          <p className="text-sm text-slate-300 leading-relaxed mb-3">
            {polarFacts[index].fact}
          </p>
          <p className="text-xs font-mono text-slate-500">— {polarFacts[index].source}</p>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {polarFacts.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-6 bg-frost-cyan' : 'w-1.5 bg-polar-border hover:bg-frost-cyan/30'
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md glass-panel hover:border-frost-cyan/30 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 text-slate-400" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md glass-panel hover:border-frost-cyan/30 transition-colors"
      >
        <ChevronRight className="w-4 h-4 text-slate-400" />
      </button>
    </div>
  );
}

export default function StudentOutreach() {
  return (
    <section className="relative pt-16 min-h-screen">
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-frost-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-[1px] bg-frost-cyan" />
            <span className="text-xs font-mono text-frost-cyan tracking-widest">EDUCATION ACADEMY</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap className="w-8 h-8 text-frost-cyan" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Student Outreach</h2>
          </div>
          <p className="text-slate-400 max-w-2xl">
            An interactive learning hub for students to explore India's polar science legacy.
            Test your knowledge, journey through expedition history, and discover the wonders of
            the polar regions.
          </p>
        </div>

        {/* Quiz */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-frost-cyan" />
            Polar Quest — Interactive Quiz
          </h3>
          <div className="max-w-2xl mx-auto">
            <QuizModule />
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-frost-cyan" />
            Expedition Timeline
          </h3>
          <Timeline />
        </div>

        {/* Facts Carousel */}
        <div>
          <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-300" />
            Did You Know?
          </h3>
          <div className="max-w-2xl mx-auto">
            <FactsCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
