import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  ChevronLeft,
  Compass,
  Focus,
  Heart,
  Layers3,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  PenTool,
  Phone,
  RefreshCw,
  ScanLine,
  Search,
  ShoppingBag,
  Sofa,
  Sparkles,
  Utensils,
  X,
  type LucideIcon,
} from "lucide-react";

type ScreenMode =
  | "meal-scan"
  | "meal-home"
  | "meal-recipe"
  | "urban-home"
  | "urban-shop"
  | "urban-detail";

type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  features: string[];
  focus: string;
  approach: string;
  screens: [ScreenMode, ScreenMode, ScreenMode];
  theme: "meal" | "urban";
};

const projects: Project[] = [
  {
    id: "meal-lens",
    number: "01",
    title: "Meal Lens AI",
    category: "AI-powered recipe scanner / mobile app UI/UX",
    year: "2025",
    description:
      "An AI-powered recipe scanner concept designed to make food discovery easier. Explore recipes through food images or ingredient information, with a clear path from curiosity to inspiration.",
    features: [
      "AI food image scanning",
      "Ingredient identification",
      "Smart recipe discovery",
      "Recipe details and exploration",
      "Simple, intuitive navigation",
    ],
    focus: "Make food discovery feel immediate, useful, and approachable.",
    approach:
      "The concept starts with a familiar action: point a camera at a dish. From there, ingredient cues and recipe suggestions create a considered flow from scan to story, without making the technology feel like the interface.",
    screens: ["meal-scan", "meal-home", "meal-recipe"],
    theme: "meal",
  },
  {
    id: "urbanest",
    number: "02",
    title: "Urbanest",
    category: "Furniture shopping application / UI/UX design",
    year: "2025",
    description:
      "A modern furniture shopping application concept focused on making discovery, browsing, and product exploration feel simple and enjoyable. A calm digital storefront for considered pieces and thoughtful spaces.",
    features: [
      "Modern furniture discovery",
      "Thoughtful product categories",
      "Clear product detail screens",
      "Rich product imagery and descriptions",
      "Intuitive shopping experience",
    ],
    focus: "Help people picture a piece in their home before they choose it.",
    approach:
      "A quiet visual hierarchy gives interiors and product photography room to lead. Category browsing, considered product details, and clear actions work together to make exploration feel natural rather than transactional.",
    screens: ["urban-shop", "urban-home", "urban-detail"],
    theme: "urban",
  },
];

const navigation = [
  ["Home", "home"],
  ["About", "about"],
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["Contact", "contact"],
] as const;

const processSteps: { number: string; title: string; description: string; Icon: LucideIcon }[] = [
  {
    number: "01",
    title: "Research",
    description: "Understand the people, context, and problem before reaching for a solution.",
    Icon: Compass,
  },
  {
    number: "02",
    title: "Define",
    description: "Make the opportunity clear and bring the project requirements into focus.",
    Icon: Focus,
  },
  {
    number: "03",
    title: "Ideate",
    description: "Explore directions, user flows, and possibilities with an open mind.",
    Icon: Lightbulb,
  },
  {
    number: "04",
    title: "Design",
    description: "Turn the strongest ideas into purposeful layouts and prototypes.",
    Icon: PenTool,
  },
  {
    number: "05",
    title: "Refine",
    description: "Improve the details, consistency, and usability of the experience.",
    Icon: RefreshCw,
  },
];

const skillGroups = [
  {
    title: "UI/UX Design",
    Icon: Layers3,
    skills: [
      "User-centered design",
      "Wireframing",
      "Prototyping",
      "Visual design",
      "Layout design",
      "Usability principles",
      "Information architecture",
      "User flows",
      "User journeys",
      "Responsive design principles",
      "User research fundamentals",
    ],
  },
  {
    title: "Design Tools",
    Icon: PenTool,
    skills: [
      "Figma",
      "Interactive prototypes",
      "Typography",
      "Color theory",
      "Component-based design",
      "Design handoff fundamentals",
    ],
  },
  {
    title: "Technical Skills",
    Icon: Layers3,
    skills: [
      "HTML",
      "CSS",
      "Basic web technologies",
      "Microsoft Excel",
      "Analytical problem solving",
    ],
  },
];

const certifications = [
  { name: "Python 101 for Data Science", issuer: "IBM Cognitive Class", year: "2025" },
  { name: "Introduction to Internet of Things (IoT)", issuer: "Cisco Networking Academy", year: "2024" },
  { name: "SQL for Data Analytics", issuer: "" },
  { name: "Power BI Fundamentals", issuer: "" },
  { name: "Machine Learning Fundamentals", issuer: "" },
];

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? undefined : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SiteHeader({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-shell">
        <a className="wordmark" href="#home" aria-label="Mujawar Rehan, home" onClick={() => setMenuOpen(false)}>
          <span>MUJAWAR REHAN</span>
          <span className="wordmark-sub">UI/UX DESIGNER</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <a href={`#${href}`} key={href}>
              {label}
            </a>
          ))}
        </nav>

        <a className="nav-talk" href="#contact">
          Let&apos;s Talk <ArrowUpRight size={14} strokeWidth={1.8} />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} strokeWidth={1.7} /> : <Menu size={21} strokeWidth={1.7} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {navigation.map(([label, href], index) => (
              <a href={`#${href}`} key={href} onClick={() => setMenuOpen(false)}>
                <span className="mobile-nav-index">0{index + 1}</span>
                <span>{label}</span>
                <ArrowUpRight size={16} strokeWidth={1.6} />
              </a>
            ))}
            <a className="mobile-nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>
              Let&apos;s Talk <ArrowUpRight size={16} strokeWidth={1.6} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileDevice({ mode, priority = false }: { mode: ScreenMode; priority?: boolean }) {
  const mealScreen = mode.startsWith("meal");
  const description = {
    "meal-scan": "Meal Lens AI food scanning interface",
    "meal-home": "Meal Lens AI recipe discovery interface",
    "meal-recipe": "Meal Lens AI recipe detail interface",
    "urban-home": "Urbanest furniture discovery interface",
    "urban-shop": "Urbanest furniture category interface",
    "urban-detail": "Urbanest furniture product detail interface",
  }[mode];

  return (
    <div className="device-shell" role="img" aria-label={description}>
      <div className={`device-screen ${mealScreen ? "device-screen-meal" : "device-screen-urban"}`}>
        <div className="dynamic-island" />
        <div className="status-bar" aria-hidden="true">
          <span>9:41</span>
          <span className="status-glyphs"><i /><i /><b /></span>
        </div>

        {mode === "meal-scan" && (
          <div className="phone-ui meal-scan-ui">
            <div className="app-toolbar">
              <span className="app-brand meal-brand"><Sparkles size={13} /> meal lens</span>
              <span className="round-app-icon"><Search size={13} /></span>
            </div>
            <div className="phone-screen-heading">
              <span className="screen-overline">A LITTLE INSPIRATION</span>
              <h4>Start with<br />what you see.</h4>
            </div>
            <div className="scan-photo phone-photo">
              <img src="/images/meal-lens-food.jpg" alt="" loading={priority ? "eager" : "lazy"} />
              <span className="scan-corner scan-corner-tl" />
              <span className="scan-corner scan-corner-tr" />
              <span className="scan-corner scan-corner-bl" />
              <span className="scan-corner scan-corner-br" />
              <span className="scan-overlay-label"><ScanLine size={12} /> Looking good</span>
            </div>
            <p className="phone-caption">Scan a dish or an ingredient to find your next favourite.</p>
            <div className="phone-primary">
              <Camera size={14} /> Scan a meal <ArrowUpRight size={13} />
            </div>
            <div className="phone-tabbar"><span className="is-active"><Sparkles size={13} /> Discover</span><span><Heart size={13} /> Saved</span></div>
          </div>
        )}

        {mode === "meal-home" && (
          <div className="phone-ui meal-home-ui">
            <div className="app-toolbar">
              <span className="app-brand meal-brand"><Sparkles size={13} /> meal lens</span>
              <span className="round-app-icon"><Search size={13} /></span>
            </div>
            <div className="phone-screen-heading meal-greeting">
              <span className="screen-overline">GOOD FOOD, GOOD MOOD</span>
              <h4>Find something<br />delicious.</h4>
            </div>
            <div className="meal-feature-image phone-photo">
              <img src="/images/meal-lens-food.jpg" alt="" loading={priority ? "eager" : "lazy"} />
              <div className="meal-image-copy">
                <span>MADE FOR TODAY</span>
                <strong>Roasted tomato<br />rigatoni</strong>
                <small>Discover the recipe <ArrowRight size={11} /></small>
              </div>
            </div>
            <div className="phone-section-label"><b>Explore by mood</b><span>See all <ArrowRight size={10} /></span></div>
            <div className="mood-row"><span>Comfort</span><span>Fresh</span><span>Quick</span></div>
            <div className="phone-tabbar"><span className="is-active"><Sparkles size={13} /> Discover</span><span><Heart size={13} /> Saved</span></div>
          </div>
        )}

        {mode === "meal-recipe" && (
          <div className="phone-ui meal-recipe-ui">
            <div className="app-toolbar app-toolbar-back"><ChevronLeft size={17} /><span className="screen-overline">RECIPE</span><Heart size={15} /></div>
            <div className="recipe-photo phone-photo">
              <img src="/images/meal-lens-food.jpg" alt="" loading={priority ? "eager" : "lazy"} />
              <span className="recipe-photo-chip"><Utensils size={11} /> AI MATCH</span>
            </div>
            <div className="recipe-copy">
              <span className="screen-overline">SIMPLE, SEASONAL, SATISFYING</span>
              <h4>Roasted tomato<br />rigatoni</h4>
              <p>A bright, comforting bowl with basil and a little parmesan.</p>
              <div className="recipe-meta"><span>25 min</span><span>Easy</span><span>4 steps</span></div>
              <div className="phone-primary">See the recipe <ArrowRight size={13} /></div>
            </div>
            <div className="phone-tabbar"><span className="is-active"><Sparkles size={13} /> Discover</span><span><Heart size={13} /> Saved</span></div>
          </div>
        )}

        {mode === "urban-home" && (
          <div className="phone-ui urban-home-ui">
            <div className="app-toolbar">
              <span className="app-brand urban-brand"><span className="urban-mark">u</span> urbanest</span>
              <span className="round-app-icon"><Search size={13} /></span>
            </div>
            <div className="phone-screen-heading urban-heading">
              <span className="screen-overline">FIND YOUR OWN RHYTHM</span>
              <h4>Make room<br />for living.</h4>
            </div>
            <div className="urban-feature-image phone-photo">
              <img src="/images/urbanest-interior.jpg" alt="" loading={priority ? "eager" : "lazy"} />
              <div className="urban-feature-copy"><span>THE QUIET HOME EDIT</span><strong>Pieces with<br />a point of view.</strong></div>
            </div>
            <div className="phone-section-label"><b>Find your feeling</b><span>Explore <ArrowRight size={10} /></span></div>
            <div className="urban-categories"><span>Living</span><span>Dining</span><span>Lighting</span></div>
            <div className="phone-tabbar"><span className="is-active"><Sofa size={13} /> Discover</span><span><Heart size={13} /> Saved</span></div>
          </div>
        )}

        {mode === "urban-shop" && (
          <div className="phone-ui urban-shop-ui">
            <div className="app-toolbar">
              <span className="app-brand urban-brand"><span className="urban-mark">u</span> urbanest</span>
              <span className="round-app-icon"><ShoppingBag size={13} /></span>
            </div>
            <div className="shop-topline"><span className="screen-overline">ROOM TO FEEL AT HOME</span><span className="filter-label">Filter <span>+</span></span></div>
            <div className="phone-screen-heading shop-heading"><h4>Living room</h4><p>Comfort, considered.</p></div>
            <div className="shop-photo phone-photo">
              <img src="/images/urbanest-interior.jpg" alt="" loading={priority ? "eager" : "lazy"} />
              <span className="shop-save"><Heart size={14} /></span>
            </div>
            <div className="shop-product-copy"><span>LOUNGE / LIVING</span><strong>The everyday edit</strong><small>Thoughtful pieces for slow Sundays.</small></div>
            <div className="shop-category-row"><span>Seating</span><span>Tables</span><span>Storage</span></div>
            <div className="phone-tabbar"><span className="is-active"><Sofa size={13} /> Discover</span><span><Heart size={13} /> Saved</span></div>
          </div>
        )}

        {mode === "urban-detail" && (
          <div className="phone-ui urban-detail-ui">
            <div className="app-toolbar app-toolbar-back"><ChevronLeft size={17} /><span className="app-brand urban-brand"><span className="urban-mark">u</span> urbanest</span><Heart size={15} /></div>
            <div className="detail-photo phone-photo">
              <img src="/images/urbanest-interior.jpg" alt="" loading={priority ? "eager" : "lazy"} />
              <span className="detail-image-index">01 / 04</span>
            </div>
            <div className="urban-detail-copy">
              <span className="screen-overline">THE LOUNGE COLLECTION</span>
              <h4>Settle in.</h4>
              <p>Timeless shapes, tactile finishes, and room to stay a while.</p>
              <div className="material-line"><span /> Warm cognac / Natural oak</div>
              <div className="phone-primary">Explore the piece <ArrowRight size={13} /></div>
            </div>
            <div className="phone-tabbar"><span className="is-active"><Sofa size={13} /> Discover</span><span><Heart size={13} /> Saved</span></div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectSection({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  return (
    <article className={`project-section project-section-${project.theme}`}>
      <div className="project-intro content-width">
        <Reveal className="project-title-block">
          <span className="project-number">{project.number} <span>/ SELECTED CONCEPT</span></span>
          <h3>{project.title}</h3>
          <p className="project-category">{project.category}</p>
        </Reveal>
        <Reveal className="project-short-description" delay={0.08}>
          <p>{project.description}</p>
          <span className="project-year">DESIGN CONCEPT <i /> {project.year}</span>
        </Reveal>
      </div>

      <div className={`project-stage project-stage-${project.theme}`} aria-label={`${project.title} app interface presentation`}>
        <div className="stage-glow" aria-hidden="true" />
        <motion.div className="stage-phone stage-phone-left" whileHover={{ y: -9 }} transition={{ duration: 0.3 }}>
          <div className="stage-phone-tilt stage-phone-tilt-left">
            <MobileDevice mode={project.screens[0]} />
          </div>
        </motion.div>
        <motion.div className="stage-phone stage-phone-center" whileHover={{ y: -12 }} transition={{ duration: 0.3 }}>
          <div className="stage-phone-tilt stage-phone-tilt-center">
            <MobileDevice mode={project.screens[1]} />
          </div>
        </motion.div>
        <motion.div className="stage-phone stage-phone-right" whileHover={{ y: -9 }} transition={{ duration: 0.3 }}>
          <div className="stage-phone-tilt stage-phone-tilt-right">
            <MobileDevice mode={project.screens[2]} />
          </div>
        </motion.div>
        <div className="stage-index" aria-hidden="true">{project.number} / 02</div>
      </div>

      <div className="project-detail-row content-width">
        <div className="project-detail-copy">
          <span className="detail-label">THE DESIGN FOCUS</span>
          <p>{project.focus}</p>
        </div>
        <div className="project-detail-copy project-features">
          <span className="detail-label">DESIGNED AROUND</span>
          <ul>
            {project.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        </div>
        <div className="project-link-wrap">
          <button className="text-link case-study-link" type="button" onClick={() => onOpen(project)}>
            View Case Study <ArrowUpRight size={17} strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </article>
  );
}

function CaseStudyDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="dialog-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            ref={dialogRef}
            className="case-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-dialog-title"
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="dialog-topline">
              <span className="detail-label">CASE STUDY / {project.year} / CONCEPT PROJECT</span>
              <button className="dialog-close" type="button" onClick={onClose} ref={closeRef} aria-label="Close case study">
                <X size={20} strokeWidth={1.7} />
              </button>
            </div>
            <div className="dialog-heading">
              <span className="project-number">{project.number} / SELECTED CONCEPT</span>
              <h2 id="case-dialog-title">{project.title}</h2>
              <p>{project.category}</p>
            </div>
            <p className="dialog-description">{project.description}</p>
            <div className="dialog-focus-grid">
              <div>
                <span className="detail-label">DESIGN INTENTION</span>
                <h3>{project.focus}</h3>
              </div>
              <div>
                <span className="detail-label">THE APPROACH</span>
                <p>{project.approach}</p>
              </div>
            </div>
            <div className="dialog-feature-block">
              <span className="detail-label">CORE EXPERIENCE ELEMENTS</span>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}><Check size={15} strokeWidth={1.8} /> {feature}</li>
                ))}
              </ul>
            </div>
            <p className="dialog-note">A self-directed UI/UX design concept. No live product or performance results are implied.</p>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HeroArtwork({ y }: { y: MotionValue<number> }) {
  return (
    <motion.div className="hero-artwork" style={{ y }} aria-label="Selected mobile app interface concepts">
      <motion.div
        className="hero-device hero-device-left"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-device-tilt hero-device-tilt-left"><MobileDevice mode="meal-scan" priority /></div>
      </motion.div>
      <motion.div
        className="hero-device hero-device-center"
        initial={{ opacity: 0, y: 46 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-device-tilt hero-device-tilt-center"><MobileDevice mode="meal-home" priority /></div>
      </motion.div>
      <motion.div
        className="hero-device hero-device-right"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-device-tilt hero-device-tilt-right"><MobileDevice mode="urban-home" priority /></div>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 76]);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <div className="site-shell">
      <SiteHeader scrolled={scrolled} />

      <main>
        <section className="hero-section" id="home" ref={heroRef}>
          <div className="hero-copy">
            <motion.p
              className="hero-kicker"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06 }}
            >
              HELLO, I&apos;MUJAWAR REHAN.
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              Designing Digital Experiences<br className="desktop-break" /> That Feel Effortless.
            </motion.h1>
            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.78, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              I&apos;m Mujawar Rehan Mohdnisar, a UI/UX Designer passionate about creating intuitive,
              user-centered digital experiences through thoughtful design and simplicity.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
            >
              <a className="button button-dark" href="#projects">Explore My Work <ArrowDown size={15} strokeWidth={1.8} /></a>
              <a className="button button-quiet" href="#contact">Let&apos;s Connect <ArrowUpRight size={16} strokeWidth={1.7} /></a>
            </motion.div>
          </div>

          <HeroArtwork y={heroY} />
          <a className="hero-scroll-cue" href="#about" aria-label="Scroll to about">
            <span>SCROLL TO EXPLORE</span><span className="scroll-line" />
          </a>
        </section>

        <section className="about-section section-space" id="about">
          <div className="content-width about-layout">
            <Reveal className="about-heading">
              <p className="section-kicker">A LITTLE ABOUT ME</p>
              <h2>Design is not just how it looks. <span>It&apos;s how it works.</span></h2>
            </Reveal>
            <Reveal className="about-copy" delay={0.1}>
              <p>
                I&apos;m a B.Sc. Computer Science graduate with a strong interest in UI/UX Design,
                user-centered design, wireframing, prototyping, and creating intuitive digital experiences.
              </p>
              <p>
                I enjoy transforming ideas into meaningful digital experiences by combining visual design
                principles, analytical thinking, research, and problem-solving.
              </p>
              <p>
                My goal is to create clean, accessible, and user-friendly mobile and web interfaces that
                make everyday interactions simpler.
              </p>
            </Reveal>
          </div>
          <div className="content-width highlight-grid">
            {[
              ["01", "User-Centered Thinking", "Start with real needs, then make every decision count."],
              ["02", "Creative Problem Solving", "Bring curiosity and clear reasoning to complex challenges."],
              ["03", "Digital Product Experiences", "Shape thoughtful moments across mobile and web."],
            ].map(([number, title, text], index) => (
              <Reveal className="highlight-item" delay={index * 0.08} key={title}>
                <span className="highlight-number">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="content-width projects-heading">
            <Reveal>
              <p className="section-kicker">A FEW THINGS I&apos;VE BEEN MAKING</p>
              <h2>Selected work, shaped by curiosity.</h2>
              <p className="section-intro">Two independent design concepts for everyday moments, made a little more effortless.</p>
            </Reveal>
          </div>
          {projects.map((project) => (
            <ProjectSection key={project.id} project={project} onOpen={setActiveProject} />
          ))}
        </section>

        <section className="process-section section-space" id="process">
          <div className="content-width">
            <Reveal className="process-heading">
              <p className="section-kicker">A THOUGHTFUL WAY FORWARD</p>
              <h2>Good work comes from good questions.</h2>
              <p className="section-intro">A flexible process keeps the people, the problem, and the details in view.</p>
            </Reveal>
            <div className="process-grid">
              {processSteps.map(({ number, title, description, Icon }, index) => (
                <Reveal className="process-step" key={number} delay={index * 0.07}>
                  <div className="process-marker"><span>{number}</span><Icon size={19} strokeWidth={1.55} /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="skills-section section-space" id="skills">
          <div className="content-width skills-layout">
            <Reveal className="skills-heading">
              <p className="section-kicker">TOOLS FOR THE WORK</p>
              <h2>Thoughtful by design. Curious by nature.</h2>
              <p className="section-intro">A growing toolkit for turning clear thinking into useful digital experiences.</p>
            </Reveal>
            <div className="skill-groups">
              {skillGroups.map(({ title, skills, Icon }, index) => (
                <Reveal className="skill-group" key={title} delay={index * 0.08}>
                  <div className="skill-group-title"><Icon size={18} strokeWidth={1.55} /><h3>{title}</h3></div>
                  <div className="skill-list">
                    {skills.map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="experience-section section-space" id="experience">
          <div className="content-width">
            <Reveal className="experience-heading">
              <p className="section-kicker">WHERE I&apos;VE BEEN</p>
              <h2>Experience with a curious eye.</h2>
            </Reveal>
            <Reveal className="experience-entry" delay={0.08}>
              <div className="experience-meta">
                <span className="timeline-dot" />
                <span className="detail-label">OCTOBER 2025 - AUGUST 2026</span>
                <span className="experience-location"><MapPin size={14} strokeWidth={1.7} /> Mumbai, Maharashtra, India</span>
              </div>
              <div className="experience-content">
                <div className="experience-role"><h3>Freelancer</h3><span>Research &amp; Analysis</span></div>
                <ul className="experience-points">
                  <li>Conducted market research to understand market trends, customer requirements, and competitive information.</li>
                  <li>Collected, organized, and analyzed information to identify patterns.</li>
                  <li>Prepared reports and summarized findings to support project planning.</li>
                  <li>Used Excel and analytical techniques to organize data and improve reporting processes.</li>
                  <li>Developed transferable skills in research, structured problem-solving, and understanding business requirements.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="education-section section-space" id="education">
          <div className="content-width education-layout">
            <Reveal className="education-intro">
              <p className="section-kicker">THE FOUNDATION</p>
              <h2>Learning that keeps moving.</h2>
              <p className="section-intro">A computer science foundation, with a growing focus on people and products.</p>
            </Reveal>
            <div className="education-list">
              <Reveal className="education-row">
                <div><span className="education-period">2022 - 2025</span><h3>Bachelor of Science in Computer Science</h3><p>Maharashtra College</p></div>
                <span className="education-grade">CGPA <b>7.18 / 10</b></span>
              </Reveal>
              <Reveal className="education-row" delay={0.06}>
                <div><span className="education-period">2020 - 2022</span><h3>Higher Secondary Certificate (HSC)</h3><p>Maharashtra State Board</p></div>
                <span className="education-grade">GRADE <b>B</b></span>
              </Reveal>
              <Reveal className="education-row" delay={0.12}>
                <div><span className="education-period">2020</span><h3>Secondary School Certificate (SSC)</h3><p>Maharashtra State Board</p></div>
                <span className="education-grade">GRADE <b>A</b></span>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="certifications-section section-space" id="certifications">
          <div className="content-width certifications-layout">
            <Reveal className="certifications-intro">
              <p className="section-kicker">ALWAYS IN PROGRESS</p>
              <h2>Learning, one layer at a time.</h2>
            </Reveal>
            <div className="certification-list">
              {certifications.map((certification, index) => (
                <Reveal className="certification-row" delay={index * 0.04} key={certification.name}>
                  <span className="certification-index">0{index + 1}</span>
                  <h3>{certification.name}</h3>
                  <span className="certification-issuer">{certification.issuer}</span>
                  <span className="certification-year">{certification.year ?? ""}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="outlook-section section-space" id="outlook">
          <div className="content-width outlook-layout">
            <Reveal className="outlook-intro">
              <p className="section-kicker">WHAT I BRING</p>
              <h2>Curiosity is part of the craft.</h2>
              <p className="section-intro">I keep learning, looking closer, and finding better ways to make the everyday work beautifully.</p>
            </Reveal>
            <Reveal className="outlook-details" delay={0.1}>
              <div className="outlook-list">
                <p>Developed project concepts focused on user-friendly interfaces.</p>
                <p>Explored information hierarchy and consistent visual design.</p>
                <p>Applied analytical thinking and research skills to understand requirements.</p>
                <p>Continuously developing design knowledge through independent learning and projects.</p>
              </div>
              <div className="career-interests">
                <span className="detail-label">CAREER INTERESTS</span>
                <p>UI/UX Designer <i /> Product Designer <i /> UX Designer <i /> UI Designer</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="content-width contact-inner">
            <Reveal className="contact-main">
              <p className="contact-kicker">SOMETHING GOOD STARTS WITH A CONVERSATION</p>
              <h2>Have an idea?<br /><span>Let&apos;s create something meaningful.</span></h2>
              <p className="contact-lede">I&apos;m always interested in connecting with creative people, exploring opportunities, and designing better digital experiences.</p>
              <div className="contact-actions">
                <a className="button button-light" href="mailto:rehanmujawar987@gmail.com">Get In Touch <ArrowUpRight size={16} /></a>
                <a className="contact-behance" href="https://www.behance.net/rehanmujawarin" target="_blank" rel="noreferrer">
                  View Behance <ArrowUpRight size={16} />
                </a>
              </div>
            </Reveal>
            <Reveal className="contact-details" delay={0.12}>
              <div className="contact-person"><span className="detail-label">A NOTE FROM</span><p>Mujawar Rehan Mohdnisar</p></div>
              <div className="contact-person"><span className="detail-label">BASED IN</span><p><MapPin size={14} /> Dubai, United Arab Emirates</p></div>
              <a className="contact-person contact-link" href="tel:+971582640324"><span className="detail-label">PHONE</span><p><Phone size={14} /> +971 58 264 0324 <ArrowUpRight size={13} /></p></a>
              <a className="contact-person contact-link" href="mailto:rehanmujawar987@gmail.com"><span className="detail-label">EMAIL</span><p><Mail size={14} /> rehanmujawar987@gmail.com <ArrowUpRight size={13} /></p></a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="content-width footer-main">
          <a className="footer-wordmark" href="#home"><span>REHAN MUJAWAR</span><span>UI/UX DESIGNER</span></a>
          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <a href="https://www.behance.net/rehanmujawarin" target="_blank" rel="noreferrer">Behance <ArrowUpRight size={12} /></a>
          </nav>
        </div>
        <div className="content-width footer-bottom">
          <span>&copy; 2026 Rehan Mujawar. All rights reserved.</span>
          <a href="#home">Back to top <ArrowUpRight size={12} /></a>
        </div>
      </footer>

      <CaseStudyDialog project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}

export default App;