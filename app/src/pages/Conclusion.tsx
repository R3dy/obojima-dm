import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Heart, PartyPopper, Compass, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  CONTENT DATA                                                       */
/* ------------------------------------------------------------------ */

const letterPossibilities = [
  {
    icon: Compass,
    accent: '#C9A84C',
    title: 'A Hook to What’s Next',
    text: 'The letter sets up your next adventure — a summons, a map, or a warning that pulls the party toward their next destination.',
  },
  {
    icon: Heart,
    accent: '#8B3A3A',
    title: 'A Confession',
    text: 'A declaration of love or the admission of a misdeed. Either one can unspool into a whole new tale of its own.',
  },
  {
    icon: PartyPopper,
    accent: '#6B4C7A',
    title: 'A Secret Invitation',
    text: 'An invitation to a hidden witch’s costume ball — a doorway into intrigue, masks, and unexpected allies.',
  },
];

const hooks = [
  {
    title: 'Deliver the Letter',
    text: 'Lomi admits the letter still needs to be delivered and — having lost his nerve — asks the party to finish the job for him.',
  },
  {
    title: 'Lomi Joins the Party',
    text: 'The young postal knight tags along as an NPC until the letter reaches its destination, growing in confidence along the way.',
  },
  {
    title: 'A New City Calls',
    text: 'Mrs. Linfrey lives in another city. Carrying her letter there can launch the party’s next full adventure.',
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Conclusion() {
  return (
    <div className="min-h-[100dvh] pt-16">
      {/* Hero header */}
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen size={22} color="#B87333" />
              <span className="text-label text-copper tracking-[0.12em]">CONCLUSION</span>
            </div>
            <h1 className="text-display-md text-parchment">Escape &amp; Aftermath</h1>
            <p className="font-body text-[1.05rem] mt-4 max-w-[640px] mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              How the adventure ends — returning to size, recovering the letter,
              and the threads you can pull to spin it into your next story.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="max-w-container-narrow mx-auto space-y-10">
          {/* Escape */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background: 'linear-gradient(135deg, #2D2016 0%, #1E1610 100%)',
              border: '1px solid rgba(184,115,51,0.15)',
              borderTop: '3px solid #4A5D3F',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} color="#8FA678" />
              <span className="text-label text-[0.7rem] tracking-[0.12em] uppercase" style={{ color: '#8FA678' }}>The Happy Ending</span>
            </div>
            <h2 className="text-display-md text-parchment" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Escape!</h2>
            <p className="font-body text-[1.05rem] leading-relaxed mt-4" style={{ color: 'rgba(245,240,230,0.85)' }}>
              If all goes well, the adventurers drink the correct potion and return
              to their normal size, recover Mrs. Linfrey’s misdelivered letter, and
              slip out of the workshop without a hitch. Lomi is overjoyed and thanks
              the party profusely — a warm, triumphant note to end the session on.
            </p>
          </motion.div>

          {/* The Letter */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mail size={18} color="#B87333" />
              <h2 className="text-display-md text-parchment" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Mrs. Linfrey’s Letter</h2>
            </div>
            <p className="font-body text-[0.95rem] leading-relaxed mb-5" style={{ color: 'rgba(245,240,230,0.7)' }}>
              The letter is the adventure’s lingering mystery. Decide what it holds
              based on where you want your campaign to go next — and remember the
              party can always choose <em>not</em> to read it.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {letterPossibilities.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="rounded-xl p-5"
                    style={{ background: 'rgba(45,32,22,0.6)', border: '1px solid rgba(184,115,51,0.15)', borderBottom: `3px solid ${p.accent}66` }}
                  >
                    <Icon size={24} color={p.accent === '#C9A84C' ? '#C9A84C' : p.accent === '#8B3A3A' ? '#C47171' : '#A084B0'} className="mb-3" />
                    <h3 className="text-heading-lg text-parchment mb-2">{p.title}</h3>
                    <p className="font-body text-[0.85rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>{p.text}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Opening the letter warning */}
            <div className="rounded-xl p-5 flex gap-3" style={{ background: 'rgba(139,58,58,0.08)', border: '1px solid rgba(139,58,58,0.3)' }}>
              <ShieldAlert size={20} color="#C47171" className="shrink-0 mt-0.5" />
              <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.78)' }}>
                <span className="font-semibold" style={{ color: '#C47171' }}>If the party opens it: </span>
                Lomi is horrified and pleads with them not to commit such a dishonorable
                act. If they do, he reports them to the Courier Brigade — a black mark
                that can carry consequences into later adventures.
              </p>
            </div>
          </div>

          {/* Continuation hooks */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Compass size={18} color="#C9A84C" />
              <h2 className="text-display-md text-parchment" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Where It Goes Next</h2>
            </div>
            <div className="space-y-3">
              {hooks.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="rounded-xl p-5 flex gap-4"
                  style={{ background: 'linear-gradient(135deg, #2D2016 0%, #1E1610 100%)', border: '1px solid rgba(184,115,51,0.15)' }}
                >
                  <span className="text-stat text-lg shrink-0 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C' }}>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-heading-lg text-parchment mb-1">{h.title}</h3>
                    <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.7)' }}>{h.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Closing / back home */}
          <div className="text-center pt-4">
            <p className="font-body text-[1.05rem] italic mb-6" style={{ color: 'rgba(245,240,230,0.6)' }}>
              What began as a simple favor became a perilous journey through a giant
              world — and the party will never look at a witch’s workshop the same way again.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-body font-semibold text-sm transition-colors duration-200"
              style={{ backgroundColor: '#B87333', color: '#1A1410' }}
            >
              Back to the Beginning <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
