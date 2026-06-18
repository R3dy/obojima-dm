import { Suspense } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import { AdventureProvider, useAdventure } from './context/AdventureContext';

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
  const { id, config } = useAdventure();

  return (
    <AnimatePresence mode="wait">
      {/* Keying on the adventure id as well as the path forces a clean
          remount when the DM flips adventures from the home page. */}
      <Routes location={location} key={`${id}:${location.pathname}`}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <Home />
            </AnimatedPage>
          }
        />
        {config.routes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={
              <AnimatedPage>
                <Suspense fallback={<PageLoader />}>
                  <Element />
                </Suspense>
              </AnimatedPage>
            }
          />
        ))}
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
        <p className="text-label text-copper">Off the map</p>
        <h1 className="text-display-md text-parchment mt-2 mb-4">Page Not Found</h1>
        <p className="text-parchment/60 font-body mb-8">
          This path doesn&apos;t lead anywhere in the current adventure.
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
    <AdventureProvider>
      <MotionConfig reducedMotion="user">
        <Layout>
          <AppRoutes />
        </Layout>
      </MotionConfig>
    </AdventureProvider>
  );
}
