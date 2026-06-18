import { motion } from 'framer-motion';
import { Gem, Coins, AlertTriangle, Scroll, Skull, Star } from 'lucide-react';

const ACCENT = '#3E7C6A';
const ACCENT_LIGHT = '#6FB3A0';
const GOLD = '#C9A84C';

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: (i ?? 0) * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

function Card({
  icon: Icon,
  accent,
  title,
  children,
}: {
  icon: React.ElementType;
  accent: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={0}
      className="rounded-xl p-6"
      style={{ background: 'linear-gradient(135deg, #16241F 0%, #12100D 100%)', border: `1px solid ${ACCENT}26`, borderLeft: `3px solid ${accent}` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} color={accent} />
        <h3 className="text-[1.05rem] font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F5F0E6' }}>{title}</h3>
      </div>
      <div className="font-body text-[0.92rem] leading-relaxed space-y-2" style={{ color: 'rgba(245,240,230,0.78)' }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function Conclusion() {
  return (
    <div className="min-h-[100dvh] pt-16">
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-container-narrow mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gem size={22} color={GOLD} />
              <span className="text-label tracking-[0.12em]" style={{ color: GOLD }}>THE GETAWAY</span>
            </div>
            <h1 className="text-display-md text-parchment">Conclusion & Further Adventures</h1>
            <p className="font-body text-[1.05rem] mt-4 leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              How the heist ends, what the crew earns, and the hooks that carry the story past midnight — whether
              they succeed or fail.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-container-narrow mx-auto px-4 pb-24 space-y-10">
        {/* DELIVERY */}
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center py-6">
          <Gem size={32} color={GOLD} className="mx-auto mb-4" />
          <h2 className="text-[1.8rem] font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}>Delivering the Egg</h2>
          <p className="text-[1rem] max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.7)' }}>
            If the characters escape with the Murkmire Stone, they bring it to Dr. Dannell in the alley. She locks it
            in her crystal box, whereupon the stone becomes inert and its effects stop immediately. She assures the
            crew the egg will be safe in her care, pays their reward, and sets about reclaiming her university post
            while keeping the stone sealed.
          </p>
        </motion.section>

        {/* OUTCOMES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Card icon={Star} accent={ACCENT} title="Mission Successful">
            <p>
              The egg reaches Dr. Dannell before midnight and is neutralized. The city is spared, and the crew is
              paid. Dr. Dannell may soon ask for help reclaiming her reputation (see “Reinstate Dr. Dannell” below).
            </p>
          </Card>
          <Card icon={Skull} accent="#C47171" title="Mission Unsuccessful">
            <p>
              If the stone isn&apos;t delivered by midnight, it hatches into a nascent eldritch horror and its
              effects cease. Curator Alda Arkin may also be revealed as the head of a fencing syndicate (see the
              failure hooks below).
            </p>
          </Card>
        </div>

        {/* REWARDS */}
        <motion.section
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="p-6 rounded-xl"
          style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Coins size={18} color={GOLD} />
            <h2 className="text-heading-lg text-parchment">Rewards Summary</h2>
          </div>
          <ul className="space-y-2.5">
            {[
              <><strong style={{ color: GOLD }}>Dr. Dannell&apos;s reward:</strong> her heirloom bag of holding, plus 20 gp per character (30 gp if a character succeeded on the DC 13 Persuasion check).</>,
              <><strong style={{ color: ACCENT_LIGHT }}>Golden Vault payment:</strong> if using that patron, an uncommon magic item of the characters&apos; choice (subject to your approval), delivered the next day.</>,
              <><strong style={{ color: '#6B7FA0' }}>Found treasure:</strong> shop tills (V2), the café lockbox (V11), a potion of vitality (V7), a +1 dagger and +1 handaxe (V10), and 150 gp of gems and ore (V16).</>,
              <><strong style={{ color: '#A084B0' }}>Goodwill:</strong> Dr. Dannell&apos;s gratitude — and her future need of capable, discreet help.</>,
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GOLD }} />
                <span className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.85)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* SUCCESS HOOKS */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Scroll size={18} color={ACCENT_LIGHT} />
            <h2 className="text-heading-lg text-parchment">If the Mission Succeeds</h2>
          </div>
          <div className="space-y-4">
            <Card icon={Scroll} accent={ACCENT} title="Another Stone">
              <p>
                A colleague reports a second Murkmire expedition has unearthed a similar object — this one closer to
                hatching, with strange happenings befalling the crew. The characters must reach the dig, but the egg
                hatches first: the hatchling uses the <strong>ankheg</strong> stat block, except its bite deals
                poison damage instead of acid.
              </p>
            </Card>
            <Card icon={Scroll} accent="#6B7FA0" title="Investigate the Hatchling">
              <p>
                A strange, nearly 8-foot creature appears in the Varkenbluff Zoo&apos;s crocodile enclosure, hatched
                from a similar egg. It grows by the hour as animals vanish and zookeepers suffer headaches. Again the
                hatchling uses the <strong>ankheg</strong> stat block with a poison bite.
              </p>
            </Card>
            <Card icon={Scroll} accent="#6B4C7A" title="Reinstate Dr. Dannell">
              <p>
                Vindicated, Dr. Dannell seeks her university post back — but Curator Arkin blocks her, then goes
                missing, casting suspicion on Dannell. The trail through high society reveals Arkin as the head of an
                illegal syndicate fencing stolen objects, whom the characters must confront.
              </p>
            </Card>
          </div>
        </section>

        {/* FAILURE HOOKS */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} color="#C47171" />
            <h2 className="text-heading-lg text-parchment">If the Mission Fails</h2>
          </div>
          <div className="space-y-4">
            <Card icon={AlertTriangle} accent="#C47171" title="A Stolen Stone">
              <p>
                Arkin steals the stone herself to fence it. An arcane ritual stops it hatching but leaves its dire
                effects — which warp her into a Monstrosity. She holes up in her manor with the egg, and the
                characters must confront the warped creatures within, the curator among them.
              </p>
            </Card>
            <Card icon={Skull} accent="#8B3A3A" title="Museum Feeding Frenzy">
              <p>
                The egg hatches into a nascent <strong>eldritch horror</strong> that eats the guards one by one.
                Pony-sized, it uses the <strong>ankheg</strong> stat block (poison bite) and sets slime traps through
                the museum. Left unchecked for days, it bursts out toward the university as a
                <strong> juvenile eldritch horror</strong> using the <strong>behir</strong> stat block — no
                languages, Intelligence 18, and added spellcasting.
              </p>
            </Card>
          </div>
        </section>

        {/* END */}
        <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center py-12">
          <Star size={28} color={GOLD} className="mx-auto mb-4" />
          <h3 className="text-[1.5rem] font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}>End of the Heist</h3>
          <p className="text-[1rem] max-w-xl mx-auto" style={{ color: 'rgba(245,240,230,0.5)' }}>
            The Murkmire Malevolence is contained — or loosed. Either way, the Murkmire still holds its secrets, and
            Varkenbluff will need its heroes again.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
