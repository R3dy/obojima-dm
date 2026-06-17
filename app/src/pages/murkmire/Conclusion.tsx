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
            <h1 className="text-display-md text-parchment">Payout & Fallout</h1>
            <p className="font-body text-[1.05rem] mt-4 leading-relaxed" style={{ color: 'rgba(245,240,230,0.65)' }}>
              How the job ends, what the crew earns, and the threads you can pull into the next session.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-container-narrow mx-auto px-4 pb-24 space-y-10">
        {/* DELIVERY */}
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center py-6">
          <Gem size={32} color={GOLD} className="mx-auto mb-4" />
          <h2 className="text-[1.8rem] font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}>Delivering the Stone</h2>
          <p className="text-[1rem] max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(245,240,230,0.7)' }}>
            Once the crew is clear of Varkenbluff, the Golden Vault makes contact to take delivery — another
            puzzle box, a dead-drop, or a hooded courier. The stone is sealed away to be contained, the museum
            falls quiet, and the danger to the town passes with it.
          </p>
        </motion.section>

        {/* OUTCOMES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Card icon={Star} accent={ACCENT} title="The Clean Lift">
            <p>
              No deaths, no fire, nothing taken but the stone. The Vault pays in full <strong>plus its bonus</strong>,
              marks the crew as reliable, and the town never quite works out what happened.
            </p>
          </Card>
          <Card icon={Skull} accent="#C47171" title="The Loud Night">
            <p>
              Bodies, a burned gallery, or a blaring alarm and a chase through the watch. The Vault still pays the
              base rate — but skips the bonus, and a trail of witnesses follows the crew into later jobs.
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
              <><strong style={{ color: GOLD }}>Base payout:</strong> a generous purse from the Golden Vault on delivery of the meteorite.</>,
              <><strong style={{ color: ACCENT_LIGHT }}>Clean-job bonus:</strong> extra coin for a bloodless lift that left the collection intact.</>,
              <><strong style={{ color: '#6B7FA0' }}>Opportunistic loot:</strong> anything the crew lifted along the way — though pocketing museum treasures risks the bonus.</>,
              <><strong style={{ color: '#A084B0' }}>Standing:</strong> a reliable crew earns the Vault’s future business — and the first of many sealed brass boxes.</>,
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GOLD }} />
                <span className="text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,240,230,0.85)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* COMPLICATIONS */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} color="#C47171" />
            <h2 className="text-heading-lg text-parchment">Complications & Loose Ends</h2>
          </div>
          <div className="space-y-4">
            <Card icon={AlertTriangle} accent="#C47171" title="The Curator Remembers">
              <p>
                If Arkin saw the crew — or survived an ugly encounter — she becomes a determined, well-connected
                enemy who wants her property back and the thieves named.
              </p>
            </Card>
            <Card icon={Scroll} accent="#6B7FA0" title="Who Sold the Stone?">
              <p>
                The office ledgers name whoever dredged the meteorite from the Murkmire and sold it on. A perfect
                hook: who else is digging dangerous things out of the swamp, and for whom?
              </p>
            </Card>
            <Card icon={Skull} accent="#6B4C7A" title="It Was Only the First">
              <p>
                The Golden Vault hints that the Malevolence is one of several such stones. Containing this one buys
                time — finding the rest is a campaign.
              </p>
            </Card>
          </div>
        </section>

        {/* CONTINUING */}
        <Card icon={Gem} accent={GOLD} title="Continuing with the Golden Vault">
          <p>
            The Murkmire Malevolence is the opening job of a longer career. The Vault’s next puzzle box can arrive
            whenever you like — a new target, a new town, the same simple rules: take only what you’re sent for,
            and hurt no one you don’t have to.
          </p>
        </Card>

        {/* END */}
        <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center py-12">
          <Star size={28} color={GOLD} className="mx-auto mb-4" />
          <h3 className="text-[1.5rem] font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}>End of the Job</h3>
          <p className="text-[1rem] max-w-xl mx-auto" style={{ color: 'rgba(245,240,230,0.5)' }}>
            The stone is contained, the crew is paid, and somewhere a brass box is already waiting for the next
            knock at the door.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
