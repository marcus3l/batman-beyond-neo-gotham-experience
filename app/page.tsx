"use client";

import { FormEvent, useEffect, useState } from "react";

const originSteps = [
  {
    number: "01",
    title: "Aceite o chamado",
    text: "Uma descoberta inesperada coloca Terry diante de uma escolha capaz de mudar seu destino.",
  },
  {
    number: "02",
    title: "Aprenda com a lenda",
    text: "Guiado por Bruce Wayne, Terry transforma instinto em estratégia e coragem em propósito.",
  },
  {
    number: "03",
    title: "Torne-se o futuro",
    text: "Um novo homem veste o traje. Uma missão que parecia encerrada ganha vida novamente.",
  },
];

const suitFeatures = [
  {
    number: "01",
    title: "Asas retráteis",
    text: "Sustentação, manobra e controle absoluto para dominar o espaço entre os arranha-céus.",
    code: "FLT / W-01",
    source: "ARQ. REBIRTH / 02",
    video: "/videos/suit-wings.mp4",
    poster: "/assets/suit-wings.jpg",
  },
  {
    number: "02",
    title: "Propulsão aérea",
    text: "Velocidade de resposta para atravessar Neo-Gotham antes que a ameaça consiga desaparecer.",
    code: "THR / P-08",
    source: "ARQ. ASCENSION / 13",
    video: "/videos/suit-propulsion.mp4",
    poster: "/assets/suit-propulsion.jpg",
  },
  {
    number: "03",
    title: "Camuflagem ativa",
    text: "O traje refrata o ambiente e apaga a assinatura visual de Terry em território hostil.",
    code: "STL / C-03",
    source: "ARQ. REBIRTH / 02",
    video: "/videos/suit-camouflage.mp4",
    poster: "/assets/suit-camouflage.jpg",
  },
  {
    number: "04",
    title: "Resposta tática",
    text: "Sensores e reflexos assistidos leem o combate em tempo real e antecipam cada movimento.",
    code: "VIS / T-12",
    source: "ARQ. SPELLBOUND / 10",
    video: "/videos/suit-tactical.mp4",
    poster: "/assets/suit-tactical.jpg",
  },
  {
    number: "05",
    title: "Força ampliada",
    text: "Potência, resistência e impacto calibrados para enfrentar múltiplos alvos sem perder mobilidade.",
    code: "PWR / A-05",
    source: "ARQ. REBIRTH / 02",
    video: "/videos/suit-strength.mp4",
    poster: "/assets/suit-strength.jpg",
  },
] as const;

const casts = {
  allies: [
    ["BW", "Bruce Wayne", "O Batman original. Mentor, estrategista e a voz por trás do símbolo."],
    ["MG", "Max Gibson", "Especialista em tecnologia e aliada essencial na vida dupla de Terry."],
    ["BG", "Barbara Gordon", "Uma autoridade em Neo-Gotham que conhece o verdadeiro peso do manto."],
  ],
  villains: [
    ["BL", "Blight", "Um homem consumido pelo próprio poder e transformado em ameaça radioativa."],
    ["IN", "Inque", "Uma adversária mutável que ataca quando — e de onde — menos se espera."],
    ["SH", "Shriek", "Tecnologia sonora convertida em uma arma capaz de estremecer toda a cidade."],
  ],
};

function WingTransition({ tone }: { tone: "light-dark" | "dark-red" | "red-dark" | "dark-light" | "light-red" }) {
  return (
    <div className={`wing-transition wing-${tone}`} data-reveal aria-hidden="true">
      <span className="wing-transition-left" />
      <span className="wing-transition-right" />
      <i />
    </div>
  );
}

const videoClips = [
  {
    code: "VIGÍLIA AÉREA",
    title: ["Neo-Gotham", "Sob vigilância"],
    duration: "00:08",
    tone: "media-blue",
    basename: "01-neo-gotham-flight",
    description: "O perímetro está ativo. O novo Batman assume os céus da cidade.",
  },
  {
    code: "PROTOCOLO DE ASCENSÃO",
    title: ["Símbolo", "Reativado"],
    duration: "00:08",
    tone: "media-red",
    basename: "02-batman-arrival",
    description: "O traje é ativado. Uma nova presença emerge das sombras de Neo-Gotham.",
  },
  {
    code: "ALERTA DE CONTENÇÃO",
    title: ["Inque", "Ruptura"],
    duration: "00:08",
    tone: "media-violet",
    basename: "03-inque-rooftop",
    description: "A ameaça metamorfa rompe o perímetro e transforma o horizonte em território hostil.",
  },
  {
    code: "DIRETRIZ DE COMBATE",
    title: ["Curaré", "Vetor letal"],
    duration: "00:08",
    tone: "media-red",
    basename: "04-curare-action",
    description: "Velocidade, técnica e precisão absoluta em um confronto sem margem para falhas.",
  },
] as const;

const navigationItems = [
  ["01", "Origem", "origem"],
  ["02", "Cenas", "midia"],
  ["03", "Neo-Gotham", "cidade"],
  ["04", "O traje", "traje"],
  ["05", "Personagens", "personagens"],
] as const;

const interceptedSignals = [
  {
    title: "Patrulha aérea",
    detail: "Neo-Gotham / setor norte",
    state: "Ao vivo",
    stateClass: "is-live",
    status: "Sinal ao vivo",
    record: "REC 01",
    text: "Uma patrulha cruza o setor norte. O sistema acompanha altitude, velocidade e ameaças em aproximação.",
    frequency: "FREQ. 88.7",
    location: "SETOR NORTE / 2099",
    bars: [42, 72, 34, 58, 86, 38, 66, 48, 82, 55, 74, 46],
  },
  {
    title: "Protocolo do traje",
    detail: "Telemetria sincronizada",
    state: "Sincronizado",
    stateClass: "is-tracked",
    status: "Traje sincronizado",
    record: "REC 02",
    text: "O traje transmite telemetria em tempo real. Propulsores, sensores e camuflagem respondem dentro dos parâmetros.",
    frequency: "FREQ. 91.2",
    location: "BATCAVERNA / LINK",
    bars: [28, 52, 84, 70, 44, 92, 64, 36, 76, 48, 88, 58],
  },
  {
    title: "Assinatura desconhecida",
    detail: "Origem não identificada",
    state: "Rastreando",
    stateClass: "is-alert",
    status: "Sinal hostil",
    record: "REC 03",
    text: "Uma frequência sem identificação atravessa o distrito baixo. A assinatura muda antes que o sistema consiga bloqueá-la.",
    frequency: "FREQ. 104.6",
    location: "DISTRITO BAIXO / ???",
    bars: [82, 30, 68, 96, 38, 78, 26, 90, 54, 34, 86, 64],
  },
] as const;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cast, setCast] = useState<"allies" | "villains">("allies");
  const [sent, setSent] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [activeSignal, setActiveSignal] = useState(0);
  const [signalAuto, setSignalAuto] = useState(true);
  const [activeSuitFeature, setActiveSuitFeature] = useState(0);
  const [suitAuto, setSuitAuto] = useState(true);
  const [identityOpen, setIdentityOpen] = useState(false);
  const currentSignal = interceptedSignals[activeSignal];
  const currentSuitFeature = suitFeatures[activeSuitFeature];

  useEffect(() => {
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? (window.scrollY / available) * 100 : 0);

      let currentSection = "";
      navigationItems.forEach(([, , id]) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * .42) currentSection = id;
      });
      setActiveSection(currentSection);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!signalAuto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      setActiveSignal((current) => (current + 1) % interceptedSignals.length);
    }, 6500);
    return () => window.clearTimeout(timer);
  }, [activeSignal, signalAuto]);

  useEffect(() => {
    if (!suitAuto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      setActiveSuitFeature((current) => (current + 1) % suitFeatures.length);
    }, 7200);
    return () => window.clearTimeout(timer);
  }, [activeSuitFeature, suitAuto]);

  useEffect(() => {
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("[data-scroll-video]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            void video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.28 },
    );

    videos.forEach((video) => observer.observe(video));
    return () => {
      observer.disconnect();
      videos.forEach((video) => video.pause());
    };
  }, []);

  useEffect(() => {
    const reel = document.querySelector<HTMLElement>(".cinematic-reel");
    const panels = Array.from(document.querySelectorAll<HTMLElement>(".cinematic-panel"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;

    const updateReveals = () => {
      if (!reel || panels.length === 0) return;
      const viewportHeight = window.innerHeight;
      const reelRect = reel.getBoundingClientRect();
      const scrollDistance = Math.max(1, reel.offsetHeight - viewportHeight);
      const reelProgress = Math.min(1, Math.max(0, -reelRect.top / scrollDistance));
      const sequenceProgress = reelProgress * panels.length;
      const reveals = panels.map((_, index) => {
        const revealWindow = index === 0 ? 0.44 : 0.72;
        const linear = Math.min(1, Math.max(0, (sequenceProgress - index) / revealWindow));
        return reduceMotion ? (linear > 0 ? 1 : 0) : linear * linear * (3 - 2 * linear);
      });
      let topLayer = 0;
      reveals.forEach((reveal, index) => {
        if (reveal > 0.001) topLayer = index;
      });

      const progressLabels = Array.from(reel.querySelectorAll<HTMLElement>(".cinematic-progress span"));
      const progressRail = reel.querySelector<HTMLElement>(".cinematic-progress");
      if (progressRail) progressRail.style.opacity = reveals[0].toFixed(3);
      progressLabels.forEach((label, index) => {
        const active = index === topLayer;
        label.classList.toggle("is-active", active);
      });

      panels.forEach((panel, index) => {
        const frame = panel.querySelector<HTMLElement>(".cinematic-frame");
        const frameEdge = panel.querySelector<HTMLElement>(".cinematic-frame-edge");
        const batSignal = panel.querySelector<HTMLElement>(".cinematic-bat-signal");
        const video = panel.querySelector<HTMLVideoElement>(".cinematic-frame video");
        const copy = panel.querySelector<HTMLElement>(".cinematic-copy");
        if (!frame || !video || !copy) return;

        const progress = reveals[index];
        const reverse = index % 2 === 1;
        const edgeIntensity = Math.pow(Math.sin(Math.PI * progress), 0.8) * .46;

        const topLeft = reverse ? 38 * (1 - progress) : 62 * (1 - progress);
        const topRight = reverse ? 62 * (1 - progress) : 38 * (1 - progress);
        const bottomRight = reverse ? 62 + 38 * progress : 38 + 62 * progress;
        const bottomLeft = reverse ? 38 + 62 * progress : 62 + 38 * progress;
        const framePath = `polygon(0 ${topLeft}%, 100% ${topRight}%, 100% ${bottomRight}%, 0 ${bottomLeft}%)`;
        frame.style.clipPath = framePath;
        if (frameEdge) {
          frameEdge.style.clipPath = framePath;
          frameEdge.style.opacity = edgeIntensity.toFixed(3);
        }
        if (batSignal) {
          const signalWindow = reduceMotion
            ? 0
            : Math.max(0, Math.sin(Math.PI * Math.min(1, progress / .48)));
          const signalScale = .52 + progress * 1.8;
          batSignal.style.opacity = signalWindow.toFixed(3);
          batSignal.style.transform = `translate(-50%, -50%) scale(${signalScale}) rotate(${reverse ? 2.5 : -2.5}deg)`;
        }

        const videoShift = 5 - progress * 10;
        video.style.transform = `translateY(${videoShift}%) scale(1.06)`;

        const coveredByNext = index < panels.length - 1 ? reveals[index + 1] : 0;
        const entrance = Math.min(1, Math.max(0, (progress - 0.56) / 0.24));
        const exit = 1 - Math.min(1, Math.max(0, coveredByNext / 0.3));
        const copyProgress = entrance * exit;
        copy.style.opacity = copyProgress.toFixed(3);
        copy.style.transform = `translateY(${(1 - entrance) * 28}px)`;
        const isTopLayer = index === topLayer;
        const isLayerUnderTransition = index === topLayer - 1 && reveals[topLayer] < 0.999;
        panel.style.visibility = isTopLayer || isLayerUnderTransition ? "visible" : "hidden";
        const shouldPlay = isTopLayer || isLayerUnderTransition;
        if (shouldPlay) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      });

      animationFrame = 0;
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateReveals);
    };

    updateReveals();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    let lastScrollY = window.scrollY;
    let scrollDirection: "up" | "down" = "down";
    const updateScrollDirection = () => {
      const nextScrollY = window.scrollY;
      if (Math.abs(nextScrollY - lastScrollY) > 3) {
        scrollDirection = nextScrollY < lastScrollY ? "up" : "down";
        lastScrollY = nextScrollY;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.toggle("reveal-reverse", scrollDirection === "up");
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0, rootMargin: "-4% 0px -10% 0px" },
    );

    window.addEventListener("scroll", updateScrollDirection, { passive: true });
    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [cast]);

  function submitSignal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <header className={progress > .4 ? "site-header is-scrolled" : "site-header"}>
        <a className="brand" href="#inicio" aria-label="Batman do Futuro — início">
          <img src="/assets/batman-beyond-wordmark.svg" alt="Batman do Futuro" />
          <span aria-hidden="true"><i /> Link ativo</span>
        </a>

        <button
          className={menuOpen ? "menu-button is-open" : "menu-button"}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
          <span className="sr-only">Abrir menu</span>
        </button>

        <nav id="main-navigation" className={menuOpen ? "nav is-open" : "nav"} aria-label="Navegação principal">
          {navigationItems.map(([number, label, id]) => (
            <a
              className={activeSection === id ? "is-active" : undefined}
              href={`#${id}`}
              aria-current={activeSection === id ? "location" : undefined}
              onClick={closeMenu}
              key={id}
            >
              <span>{number}</span>
              <strong>{label}</strong>
            </a>
          ))}
        </nav>

        <a className="button button-small header-cta" href="#midia">
          <span><small>Arquivo visual</small><strong>Acessar cenas</strong></span>
          <i aria-hidden="true">↘</i>
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span>Arquivo 01</span> O futuro de Gotham começa agora</p>
          <img className="hero-wordmark" src="/assets/batman-beyond-wordmark.svg" alt="Batman do Futuro" />
          <h1 className="sr-only">Batman do Futuro</h1>
          <p className="hero-lead">
            Em uma cidade dominada pela tecnologia e por novas ameaças, um jovem rebelde assume o símbolo que marcou gerações.
          </p>
          <div className="hero-actions">
            <a className="button" href="#origem">Conheça o novo Batman <span aria-hidden="true">↘</span></a>
            <a className="text-button" href="#midia">Explorar cenas <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-status" aria-label="Status da transmissão">
            <span className="status-dot" />
            <span>Neo-Gotham</span>
            <span>Conexão segura</span>
            <span>Canal 20.99</span>
          </div>
        </div>

        <div className={identityOpen ? "hero-visual identity-open" : "hero-visual"}>
          <div className="hero-moon" aria-hidden="true" />
          <div className="hero-number" aria-hidden="true">2099</div>
          <div className="hero-telemetry" aria-hidden="true">
            <span>NG–ID / VARREDURA 01</span>
            <span>CANAL 20.99 / SEGURO</span>
          </div>
          <img
            src="/assets/hero-legacy-banner.webp"
            alt="Terry McGinnis como Batman do Futuro diante de Bruce Wayne e Neo-Gotham"
            loading="eager"
            fetchPriority="high"
          />
          <div className="hero-target" aria-hidden="true"><span /><i /></div>

          <aside id="terry-identity" className="identity-dossier" aria-hidden={!identityOpen}>
            <div className="identity-dossier-head">
              <span><i /> Identidade confirmada</span>
              <small>NG–ID / 01</small>
            </div>
            <div className="identity-profile">
              <div className="identity-mark" aria-hidden="true">
                <img src="/assets/batman-beyond-bat.png" alt="" />
              </div>
              <div>
                <span>O sucessor</span>
                <strong>Terry<br />McGinnis</strong>
              </div>
            </div>
            <p>Um jovem guiado por instinto, treinado pela lenda e escolhido para carregar o símbolo em uma nova era.</p>
            <dl>
              <div><dt>Designação</dt><dd>Batman</dd></div>
              <div><dt>Mentor</dt><dd>Bruce Wayne</dd></div>
              <div><dt>Jurisdição</dt><dd>Neo-Gotham</dd></div>
            </dl>
            <div className="identity-clearance"><span /><strong>Acesso autorizado</strong><small>100%</small></div>
          </aside>

          <button
            className="identity-trigger"
            type="button"
            aria-expanded={identityOpen}
            aria-controls="terry-identity"
            onClick={() => setIdentityOpen((current) => !current)}
          >
            <span className="identity-trigger-label">
              <small><i /> Identidade</small>
              <strong aria-live="polite">{identityOpen ? "Terry McGinnis" : "Dados criptografados"}</strong>
            </span>
            <span className="identity-trigger-action">{identityOpen ? "Ocultar" : "Revelar"}<i aria-hidden="true">↗</i></span>
          </button>
        </div>

        <a className="scroll-cue" href="#origem"><span>Role para explorar</span><i aria-hidden="true">↓</i></a>
      </section>

      <div className="signal-strip" aria-hidden="true">
        <div>
          <span>Novo herói</span><i>◆</i><span>Nova cidade</span><i>◆</i><span>Mesmo símbolo</span><i>◆</i>
          <span>Novo herói</span><i>◆</i><span>Nova cidade</span><i>◆</i><span>Mesmo símbolo</span><i>◆</i>
        </div>
      </div>

      <section className="section origin" id="origem">
        <div className="section-intro">
          <div className="section-intro-content reveal-mask" data-reveal>
            <p className="eyebrow"><span>01</span> De rebelde a símbolo</p>
            <h2><span className="impact-line">Nasce um</span><br /><em>novo Batman.</em></h2>
            <p className="origin-lead">
              Terry McGinnis não escolheu o símbolo. O símbolo o encontrou. Agora, entre o peso do legado e as ameaças de uma nova era, ele precisa provar que Neo-Gotham ainda pode acreditar no Batman.
            </p>
          </div>
        </div>

        <div className="origin-cards">
          {originSteps.map((step, index) => (
            <article className={`origin-card reveal-rise motion-delay-${index}`} data-reveal key={step.number}>
              <span className="card-index">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              <span className="card-arrow" aria-hidden="true">↗</span>
              <div className="origin-card-progress" aria-label={`Evolução: ${["Instinto", "Estratégia", "Propósito"][index]}`}>
                <span>{["Instinto", "Estratégia", "Propósito"][index]}<b>{[33, 66, 100][index]}%</b></span>
                <i aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        <aside className="origin-dossier reveal-rise motion-delay-2" data-reveal aria-label="Arquivo do sucessor">
          <div className="origin-dossier-mark" aria-hidden="true">
            <img src="/assets/batman-beyond-bat.png" alt="" />
          </div>
          <div className="origin-dossier-content">
            <span>Arquivo do sucessor / 01</span>
            <strong>Terry McGinnis</strong>
            <dl>
              <div><dt>Status</dt><dd>Ativo</dd></div>
              <div><dt>Mentor</dt><dd>Bruce Wayne</dd></div>
              <div><dt>Jurisdição</dt><dd>Neo-Gotham</dd></div>
            </dl>
          </div>
        </aside>
      </section>

      <section className="transmissions" id="midia" aria-labelledby="transmissions-title">
        <div className="section-heading row-heading">
          <div className="transmission-atmosphere" aria-hidden="true">
            <span className="transmission-grid" />
            <span className="transmission-sweep" />
            <span className="transmission-crosshair" />
          </div>
          <div className="transmissions-mark reveal-mark" data-reveal aria-hidden="true">
            <img src="/assets/batman-beyond-bat.png" alt="" />
            <span>IDENTIDADE / BB-01</span>
          </div>
          <div className="transmissions-title-block reveal-mask" data-reveal>
            <p className="eyebrow"><span>02</span> Arquivo de transmissão</p>
            <h2 id="transmissions-title">Veja o futuro<br /><em>entrar em ação.</em></h2>
            <div className="transmission-link" aria-hidden="true"><span />CANAL SEGURO / CONEXÃO ESTABELECIDA</div>
          </div>
          <aside className="transmissions-brief reveal-rise motion-delay-2" data-reveal aria-label="Status da transmissão">
            <div className="brief-head">
              <div className="brief-status"><span aria-hidden="true" />{currentSignal.status} <b>{currentSignal.record}</b></div>
              <div className="signal-controls">
                <div className="signal-selector" role="tablist" aria-label="Selecionar sinal interceptado">
                  {interceptedSignals.map((signal, index) => (
                    <button
                      id={`signal-tab-${index}`}
                      className={activeSignal === index ? "is-active" : undefined}
                      type="button"
                      role="tab"
                      aria-selected={activeSignal === index}
                      aria-controls="signal-panel"
                      onClick={() => setActiveSignal(index)}
                      key={signal.record}
                    >
                      0{index + 1}
                    </button>
                  ))}
                </div>
                <button
                  className="signal-auto"
                  type="button"
                  aria-pressed={signalAuto}
                  aria-label={signalAuto ? "Pausar troca automática de sinais" : "Retomar troca automática de sinais"}
                  title={signalAuto ? "Pausar sinais" : "Retomar sinais"}
                  onClick={() => setSignalAuto((current) => !current)}
                >
                  {signalAuto ? "Ⅱ" : "▶"}
                </button>
              </div>
            </div>

            <div
              className="brief-signal-content"
              id="signal-panel"
              role="tabpanel"
              aria-labelledby={`signal-tab-${activeSignal}`}
              key={currentSignal.record}
            >
              <p>{currentSignal.text}</p>
              <div className="signal-meter" aria-hidden="true">
                {currentSignal.bars.map((height, index) => <i style={{ height: `${height}%` }} key={`${currentSignal.record}-${index}`} />)}
              </div>
              <div className="brief-meta"><span>{currentSignal.frequency}</span><span>{currentSignal.location}</span></div>
            </div>
          </aside>

          <div className="transmission-channel-rail" aria-label="Canais interceptados">
            {interceptedSignals.map((signal, index) => (
              <button
                className={`transmission-channel reveal-rise motion-delay-${index + 1}${activeSignal === index ? " is-active" : ""}`}
                type="button"
                aria-pressed={activeSignal === index}
                onClick={() => setActiveSignal(index)}
                data-reveal
                key={signal.record}
              >
                <span className="channel-number">0{index + 1}</span>
                <span className="channel-copy"><b>{signal.title}</b><small>{signal.detail}</small></span>
                <i className={`channel-state ${signal.stateClass}`}>{signal.state}</i>
              </button>
            ))}
          </div>
        </div>

        <div className="cinematic-reel">
          <div className="cinematic-stage">
            <div className="cinematic-standby" aria-hidden="true">
              <div className="standby-packet">
                <p><span />Próximo pacote</p>
                <strong>Transmissão 01</strong>
                <small>Neo-Gotham sob vigilância</small>
              </div>
              <div className="standby-wave-wrap">
                <span>Recebendo sinal criptografado</span>
                <div className="standby-wave">
                  {Array.from({ length: 28 }, (_, bar) => <i key={bar} />)}
                </div>
              </div>
              <div className="standby-buffer">
                <span>Buffer</span>
                <strong>100%</strong>
                <small>40.7128° N / 74.0060° W</small>
              </div>
            </div>
            {videoClips.map((video, index) => (
              <article className={`cinematic-panel cinematic-panel-${index + 1}`} key={video.basename}>
                <div className="cinematic-frame-edge" aria-hidden="true" />
                <div className="cinematic-bat-signal" aria-hidden="true">
                  <span />
                  <img src="/assets/batman-beyond-bat.png" alt="" />
                  <span />
                </div>
                <div className="cinematic-frame">
                  <video
                    data-stack-video
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={`/videos/${video.basename}-poster.jpg`}
                    aria-hidden="true"
                  >
                    <source src={`/videos/${video.basename}.webm`} type="video/webm" />
                    <source src={`/videos/${video.basename}.mp4`} type="video/mp4" />
                  </video>
                  <span className="cinematic-scan" aria-hidden="true" />
                </div>
                <div className="cinematic-copy">
                  <p>{video.code}<span>{video.duration}</span></p>
                  <h3>{video.title.map((line) => <span className="cinematic-title-line" key={line}>{line}</span>)}</h3>
                  <span>{video.description}</span>
                </div>
              </article>
            ))}
            <div className="cinematic-progress" aria-hidden="true">
              {videoClips.map((_, index) => <span key={index}>0{index + 1}</span>)}
            </div>
          </div>
        </div>
      </section>

      <WingTransition tone="dark-red" />

      <section className="city" id="cidade">
        <div className="city-copy reveal-city" data-reveal>
          <p className="eyebrow light"><span>03</span> Proteja a cidade</p>
          <h2><span>Bem-vindo a</span><em>Neo-Gotham.</em></h2>
          <p className="city-lead">
            Arranha-céus atravessam as nuvens. Veículos cortam o céu. Luzes de neon escondem becos onde tecnologia e crime caminham lado a lado.
          </p>
          <p className="city-statement">
            <span>A cidade mudou.</span>
            <strong>O medo continua o mesmo.</strong>
          </p>
        </div>

        <div className="city-panels">
          <header className="city-panels-header reveal-rise" data-reveal>
            <div>
              <span>Rede de vigilância</span>
              <strong>Perímetro Neo-Gotham</strong>
            </div>
            <p><i aria-hidden="true" /> Sinal ativo <span>NG / 2099</span></p>
          </header>

          <div className="city-route">
          {[
            ["Explore", "Descubra uma metrópole construída sobre as sombras da antiga Gotham.", "SETOR 07"],
            ["Patrulhe", "Cruze os céus e encontre perigos ocultos pela cidade vertical.", "ROTA 12"],
            ["Proteja", "Enfrente criminosos capazes de transformar o futuro em uma arma.", "NÍVEL V"],
          ].map(([title, text, code], index) => (
            <article className={`reveal-rise motion-delay-${index}`} data-reveal key={title}>
              <div className="city-route-index">
                <span>0{index + 1}</span>
                <small>Fase</small>
              </div>
              <div className="city-route-copy">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <strong className="city-route-code">{code}</strong>
            </article>
          ))}
          </div>

          <footer className="city-panels-footer reveal-rise motion-delay-2" data-reveal>
            <span>Altitude 418 M</span>
            <span>Frequência 88.7</span>
            <span>Vigilância contínua</span>
          </footer>
        </div>
      </section>

      <WingTransition tone="red-dark" />

      <figure className="city-panorama-break">
        <img src="/assets/neo-gotham-panorama.jpg" alt="Vista panorâmica noturna de Neo-Gotham" />
        <div className="city-panorama-target" aria-hidden="true">
          <span />
          <div><b>Torre central</b><small>RASTREIO / 07</small></div>
        </div>
        <div className="city-panorama-hud reveal-rise" data-reveal aria-hidden="true">
          <div className="city-panorama-topline">
            <span><i /> Localização confirmada</span>
            <span>VISÃO AÉREA / CANAL 07</span>
          </div>
          <div className="city-panorama-caption">
            <span>Distrito 07 · 23:48</span>
            <strong>Setor Central</strong>
            <small>PERÍMETRO SOB VIGILÂNCIA / ROTA 04</small>
          </div>
          <div className="city-panorama-coordinates">
            <span>ALT. 418 M</span>
            <b>FREQ. 88.7</b>
          </div>
        </div>
        <figcaption className="sr-only">Panorama da cidade de Neo-Gotham observado pelo sistema de vigilância.</figcaption>
      </figure>

      <WingTransition tone="dark-light" />

      <section className="section legacy" id="legado">
        <div className="legacy-quote reveal-mask" data-reveal>
          <p className="eyebrow"><span>04</span> Carregue o símbolo</p>
          <h2><span>O homem muda.</span><em>A missão permanece.</em></h2>
          <p className="legacy-lead">
            O traje evolui, a cidade se transforma e um novo homem assume o símbolo. O compromisso, porém, atravessa gerações.
          </p>

          <figure className="legacy-record reveal-rise motion-delay-1" data-reveal>
            <figcaption>
              <span>Registro da Batcaverna</span>
              <small>ARQ / BW–01</small>
            </figcaption>
            <blockquote>“O símbolo não pertence ao passado. Ele pertence a quem tiver coragem de defendê-lo.”</blockquote>
            <div className="legacy-author">
              <strong>Bruce Wayne</strong>
              <span>Mentor · Protocolo de sucessão</span>
            </div>
          </figure>

          <div className="legacy-status reveal-rise motion-delay-2" data-reveal aria-label="Status do legado">
            <span><i aria-hidden="true" /> Símbolo ativo</span>
            <span>Legado transferido</span>
            <span>Neo-Gotham / 2099</span>
          </div>
        </div>

        <div className="duo">
          <article className="duo-card terry reveal-duo-left" data-reveal>
            <video
              className="duo-media"
              data-scroll-video
              muted
              loop
              playsInline
              preload="metadata"
              poster="/assets/terry-profile.jpg"
              aria-hidden="true"
            >
              <source src="/videos/terry-profile.mp4" type="video/mp4" />
            </video>
            <span className="duo-label">O sucessor</span>
            <span className="duo-signal" aria-hidden="true"><i /> ARQ / TM–01</span>
            <div className="duo-monogram">T</div>
            <h3>Terry<br />McGinnis</h3>
            <p>Instinto, velocidade e uma nova forma de lutar pelo futuro.</p>
          </article>
          <article className="duo-card bruce reveal-duo-right motion-delay-1" data-reveal>
            <video
              className="duo-media"
              data-scroll-video
              muted
              loop
              playsInline
              preload="metadata"
              poster="/assets/bruce-profile.jpg"
              aria-hidden="true"
            >
              <source src="/videos/bruce-profile.mp4" type="video/mp4" />
            </video>
            <span className="duo-label">A lenda</span>
            <span className="duo-signal" aria-hidden="true"><i /> ARQ / BW–01</span>
            <div className="duo-monogram">B</div>
            <h3>Bruce<br />Wayne</h3>
            <p>Experiência, estratégia e uma missão que nunca terminou.</p>
          </article>
        </div>
      </section>

      <WingTransition tone="light-dark" />

      <section className="suit" id="traje">
        <div className="suit-title reveal-mask" data-reveal>
          <p className="eyebrow light"><span>05</span> Vista o futuro</p>
          <h2>Muito mais<br />do que <em>uma armadura.</em></h2>
          <p>O traje não é apenas proteção. É um sistema de voo, infiltração e combate projetado para transformar cada movimento em vantagem.</p>
          <div className="suit-status" aria-label="Estado do traje">
            <span><i /> Sistema operacional</span>
            <strong>100%</strong>
            <small>NG–SUIT / ONLINE</small>
          </div>
        </div>
        <div className="suit-console reveal-scale" data-reveal>
          <div className="suit-viewport">
            <video
              data-scroll-video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              src={currentSuitFeature.video}
              poster={currentSuitFeature.poster}
              onLoadedData={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
                  void event.currentTarget.play().catch(() => undefined);
                } else {
                  event.currentTarget.pause();
                }
              }}
              aria-label={`Demonstração do recurso: ${currentSuitFeature.title}`}
            />
            <span className="suit-screen-grid" aria-hidden="true" />
            <span className="suit-frame-edge" aria-hidden="true" />
            <div className="suit-hud-top">
              <span><i /> Protocolo Beyond</span>
              <strong>{currentSuitFeature.code}</strong>
            </div>
            <div className="suit-hud-copy" aria-live="polite">
              <span>{currentSuitFeature.number} / 05</span>
              <h3>{currentSuitFeature.title}</h3>
              <p>{currentSuitFeature.text}</p>
            </div>
            <div className="suit-hud-bottom">
              <span>{currentSuitFeature.source}</span>
              <span>TELEMETRIA / ATIVA</span>
            </div>
          </div>

          <div className="suit-controls">
            <div className="suit-control-head">
              <div>
                <span>Capacidades registradas</span>
                <strong>Selecione um módulo do traje</strong>
              </div>
              <button
                className={suitAuto ? "is-active" : ""}
                type="button"
                onClick={() => setSuitAuto((current) => !current)}
                aria-pressed={suitAuto}
              >
                <i /> {suitAuto ? "Auto" : "Manual"}
              </button>
            </div>
            <div className="suit-feature-nav" role="tablist" aria-label="Tecnologias do traje">
              {suitFeatures.map((feature, index) => (
                <button
                  className={activeSuitFeature === index ? "is-active" : ""}
                  type="button"
                  role="tab"
                  aria-selected={activeSuitFeature === index}
                  onClick={() => {
                    setActiveSuitFeature(index);
                    setSuitAuto(false);
                  }}
                  key={feature.number}
                >
                  <span>{feature.number}</span>
                  <strong>{feature.title}</strong>
                  <small>{feature.code}</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WingTransition tone="dark-light" />

      <section className="section cast" id="personagens">
        <div className="section-heading row-heading reveal-mask" data-reveal>
          <div>
            <p className="eyebrow"><span>06</span> Dossiês de Neo-Gotham</p>
            <h2>Escolha um<br /><em className="impact-font">lado da história.</em></h2>
          </div>
          <div className="cast-tabs" role="group" aria-label="Filtrar personagens">
            <button className={cast === "allies" ? "active" : ""} type="button" onClick={() => setCast("allies")}>Aliados</button>
            <button className={cast === "villains" ? "active" : ""} type="button" onClick={() => setCast("villains")}>Vilões</button>
          </div>
        </div>

        <div className="cast-grid" aria-live="polite">
          {casts[cast].map(([initials, name, text], index) => (
            <article className={`cast-card cast-${cast} reveal-rise motion-delay-${index}`} data-reveal key={name}>
              <div className="cast-card-head">
                <span className="cast-number">0{index + 1}</span>
                <span className="cast-card-status"><i />{cast === "allies" ? "Canal seguro" : "Alerta ativo"}</span>
              </div>
              <div className="cast-portrait" aria-hidden="true">
                <span>{initials}</span>
                <small>NG–DOSSIÊ / 0{index + 1}</small>
              </div>
              <h3>{name}</h3>
              <p>{text}</p>
              <div className="cast-card-foot" aria-hidden="true">
                <span>Arquivo criptografado</span>
                <i>↗</i>
              </div>
            </article>
          ))}
        </div>
      </section>

      <WingTransition tone="light-red" />

      <section className="signal-form-section">
        <div className="reveal-mask" data-reveal>
          <p className="eyebrow light"><span>07</span> O legado continua</p>
          <h2>O futuro ainda<br />precisa de <em>um Batman.</em></h2>
        </div>
        <form className="signal-form reveal-rise motion-delay-1" data-reveal onSubmit={submitSignal}>
          <div className="signal-form-head">
            <span><i /> Canal aberto</span>
            <small>NG–SIGNAL / 07</small>
          </div>
          <label htmlFor="email">Receba novas transmissões de Neo-Gotham.</label>
          <div className="input-row">
            <input id="email" name="email" type="email" placeholder="SEU E-MAIL" required aria-describedby="privacy-note" />
            <button type="submit" aria-label="Cadastrar e-mail">↗</button>
          </div>
          <div className="signal-form-meta">
            <p id="privacy-note">Sem spam. Apenas sinais importantes do futuro.</p>
            <span>Criptografia ativa</span>
          </div>
          {sent && <p className="form-success" role="status">Sinal recebido. Conexão estabelecida.</p>}
        </form>
      </section>

      <WingTransition tone="red-dark" />

      <footer>
        <img src="/assets/batman-beyond-wordmark.svg" alt="Batman do Futuro" />
        <p>O amanhã pertence ao morcego.</p>
        <div className="footer-links">
          <a href="#inicio">Voltar ao topo ↑</a>
          <a href="/fonts/license.txt">Licença Batman Future</a>
          <a href="/fonts/teko-license.txt">Licença Teko</a>
        </div>
        <small>
          Projeto conceitual não oficial para portfólio. Batman do Futuro e personagens relacionados pertencem à DC e à Warner Bros. Entertainment.
        </small>
      </footer>

    </main>
  );
}
