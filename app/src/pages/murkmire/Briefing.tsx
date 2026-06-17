import { motion } from 'framer-motion';
import { KeyRound, Target, ShieldCheck, Coins, Map as MapIcon } from 'lucide-react';
import { ReadAloud, DMSecret, SkillCheck } from '../../components/DMCallouts';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';
const GOLD = '#C9A84C';

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

function IntelCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-xl p-6"
      style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}26` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon size={17} color={ACCENT} />
        <h3 className="text-heading-lg text-parchment">{title}</h3>
      </div>
      <div className="font-body text-[0.95rem] leading-relaxed space-y-2" style={{ color: 'rgba(245,240,230,0.8)' }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function Briefing() {
  return (
    <div className="min-h-[100dvh] pt-16">
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container-narrow mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <KeyRound size={22} color={GOLD} />
              <span className="text-label tracking-[0.12em]" style={{ color: GOLD }}>
                THE BRIEFING
              </span>
            </div>
            <h1 className="text-display-md text-parchment">The Golden Vault Calls</h1>
            <p className="font-body text-[1.05rem] mt-4 leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              Everything the crew knows before they set foot in Varkenbluff — and a few things the patron
              left out.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-container-narrow mx-auto px-4 pb-24 space-y-10">
        <ReadAloud title="The Puzzle Box">
          The box arrives however it needs to — slipped under a door, left on a barstool, pressed into a hand
          by a stranger who is gone before you turn around. It is brass, the size of a fist, warm to the touch,
          and it will not open by force. Solve it, and golden light spills out to draw a hooded figure in the
          air, its voice as smooth and patient as still water.
        </ReadAloud>

        <DMSecret heading="Running the Patron">
          The Golden Vault&apos;s handler is deliberately impossible to identify or trace. Speak in calm,
          economical sentences. The handler answers questions about the job freely but deflects anything about
          the organization itself (&ldquo;That is not part of tonight&rdquo;). The puzzle box dissolves into
          harmless light once the briefing ends, leaving no evidence.
        </DMSecret>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <IntelCard icon={Target} title="The Target">
            <p>
              The <strong style={{ color: ACCENT_LIGHT }}>Murkmire Malevolence</strong> — a dark, fist-to-melon
              sized meteorite displayed under glass on the museum&apos;s upper floor. It radiates a faint chill
              and a wrongness that sensitive creatures feel before they see it.
            </p>
            <p>Bring the stone. Leave everything else. The Vault wants a clean lift, not a robbery.</p>
          </IntelCard>

          <IntelCard icon={MapIcon} title="The Place">
            <p>
              The <strong style={{ color: ACCENT_LIGHT }}>Vermeulen-Voss Museum of Natural History</strong>, in
              the river town of <strong>Varkenbluff</strong> — a fog-wrapped, lamp-lit town built on a bluff
              over a sluggish, swampy river.
            </p>
            <p>The museum closes at dusk. A small night staff and a curator who works late remain inside.</p>
          </IntelCard>

          <IntelCard icon={ShieldCheck} title="The Security">
            <p>
              Locked doors and shuttered windows, a roaming night guard or two, an alarm bell that summons the
              town watch, and arcane wards in the curator&apos;s wing. The galleries are crowded with mounted
              animals and specimen cases — useful cover, and soon to be much more than that.
            </p>
          </IntelCard>

          <IntelCard icon={Coins} title="The Payout">
            <p>
              A generous purse on delivery, with a <strong style={{ color: GOLD }}>bonus</strong> for a clean,
              bloodless job and for leaving the museum&apos;s other treasures untouched.
            </p>
            <p>Burn the place down or rack up bodies, and the Vault pays the base rate — and may not call again.</p>
          </IntelCard>
        </div>

        <SkillCheck
          dc={13}
          skill="Intelligence (Investigation)"
          title="Study the Intel Package"
          pass="The Vault includes a rough floor plan and the guards’ rotation — grant the party one free piece of useful information when they break in (a skylight latch, a sticky service door, the curator’s late hours)."
          fail="The intel is thin; the crew goes in mostly blind and must scout in person during Beat 2."
        />

        <DMSecret heading="The Truth About the Stone">
          The meteorite&apos;s necrotic field grows stronger each night. Tiny preserved specimens already
          twitch in their jars after dark. The longer the stone sits in a building full of dead creatures, the
          more dangerous the museum becomes — and if it is never removed, Varkenbluff&apos;s own graveyards are
          next. The party doesn&apos;t need to know all of this, but it justifies the urgency and the escalating
          danger of Beat 5.
        </DMSecret>
      </div>
    </div>
  );
}
