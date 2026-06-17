import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';

const AdventureFlow = lazy(() => import('./pages/AdventureFlow'));
const Overview = lazy(() => import('./pages/Overview'));
const NPCs = lazy(() => import('./pages/NPCs'));
const Workshop = lazy(() => import('./pages/Workshop'));
const Locations = lazy(() => import('./pages/Locations'));
const Encounters = lazy(() => import('./pages/Encounters'));
const Bestiary = lazy(() => import('./pages/Bestiary'));
const Potions = lazy(() => import('./pages/Potions'));
const Conclusion = lazy(() => import('./pages/Conclusion'));
const OkiriVillage = lazy(() => import('./pages/OkiriVillage'));
const Subclasses = lazy(() => import('./pages/Subclasses'));
const FeatsConditions = lazy(() => import('./pages/FeatsConditions'));
const BackgroundsGear = lazy(() => import('./pages/BackgroundsGear'));

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const pageTransition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <Home />
            </AnimatedPage>
          }
        />
        <Route
          path="/adventure"
          element={
            <AnimatedPage>
              <Suspense fallback={<PageLoader />}>
                <AdventureFlow />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/overview"
          element={
            <AnimatedPage>
              <Suspense fallback={<PageLoader />}>
                <Overview />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/okiri"
          element={
            <AnimatedPage>
              <Suspense fallback={<PageLoader />}>
                <OkiriVillage />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/npcs"
          element={
            <AnimatedPage>
              <Suspense fallback={<PageLoader />}>
                <NPCs />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/workshop"
          element={
            <AnimatedPage>
              <Suspense fallback={<PageLoader />}>
                <Workshop />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/locations"
          element={
            <AnimatedPage>
              <Suspense fallback={<PageLoader />}>
                <Locations />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/encounters"
          element={
            <AnimatedPage>
              <Suspense fallback={<PageLoader />}>
                <Encounters />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/bestiary"
          element={
            <AnimatedPage>
              <Suspense fallback={<PageLoader />}>
                <Bestiary />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/potions"
          element={
            <AnimatedPage>
              <Suspense fallback={<PageLoader />}>
                <Potions />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/conclusion"
          element={
            <AnimatedPage>
              <Suspense fallback={<PageLoader />}>
                <Conclusion />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/subclasses"
          element={
            <AnimatedPage>
              <Suspense fallback={<PageLoader />}>
                <Subclasses />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/feats"
          element={
            <AnimatedPage>
              <Suspense fallback={<PageLoader />}>
                <FeatsConditions />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="/gear"
          element={
            <AnimatedPage>
              <Suspense fallback={<PageLoader />}>
                <BackgroundsGear />
              </Suspense>
            </AnimatedPage>
          }
        />
        <Route
          path="*"
          element={
            <AnimatedPage>
              <NotFound />
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function NotFound() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center pt-16 px-4">
      <div className="text-center">
        <p className="text-label text-copper">Lost in the tall grass</p>
        <h1 className="text-display-md text-parchment mt-2 mb-4">Page Not Found</h1>
        <p className="text-parchment/60 font-body mb-8">
          This path doesn&apos;t lead anywhere in the workshop.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-body font-semibold text-sm transition-colors duration-200"
          style={{ backgroundColor: '#B87333', color: '#1A1410' }}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

function PageLoader() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-copper border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Layout>
        <AppRoutes />
      </Layout>
    </MotionConfig>
  );
}
