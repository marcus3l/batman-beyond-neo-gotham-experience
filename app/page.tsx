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
  ["01", "Asas retráteis", "Controle e liberdade para cruzar os céus de Neo-Gotham."],
  ["02", "Propulsores", "Velocidade para alcançar qualquer ponto da cidade antes que seja tarde."],
  ["03", "Camuflagem", "Tecnologia furtiva que transforma cada sombra em uma oportunidade."],
  ["04", "Visão e sensores", "Análise de ambientes e comunicação em tempo real com a Batcaverna."],
  ["05", "Amplificação física", "Mais força, velocidade e resistência contra ameaças aprimoradas."],
];

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

const videoClips = [
  {
    code: "TRANSMISSÃO 01",
    title: ["Voo sobre", "Neo-Gotham"],
    duration: "00:08",
    tone: "media-blue",
    basename: "01-neo-gotham-flight",
    description: "Uma patrulha aérea entre as luzes da cidade do futuro.",
  },
  {
    code: "PROTOCOLO DO TRAJE",
    title: ["Batman", "Em ação"],
    duration: "00:08",
    tone: "media-red",
    basename: "02-batman-arrival",
    description: "A chegada do novo Batman marca o início de uma nova era.",
  },
  {
    code: "TRANSMISSÃO 02",
    title: ["Inque nas alturas"],
    duration: "00:08",
    tone: "media-violet",
    basename: "03-inque-rooftop",
    description: "Uma ameaça mutável surge acima das ruas de Neo-Gotham.",
  },
  {
    code: "TRANSMISSÃO 03",
    title: ["Curaré em combate"],
    duration: "00:08",
    tone: "media-red",
    basename: "04-curare-action",
    description: "Velocidade e precisão em um confronto sem espaço para erros.",
  },
] as const;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cast, setCast] = useState<"allies" | "villains">("allies");
  const [sent, setSent] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? (window.scrollY / available) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      const sequenceProgress = reelProgress * (panels.length - 1);
      const reveals = panels.map((_, index) => {
        if (index === 0) return 1;
        const linear = Math.min(1, Math.max(0, (sequenceProgress - (index - 1)) / 0.72));
        return reduceMotion ? (linear > 0 ? 1 : 0) : linear * linear * (3 - 2 * linear);
      });
      let topLayer = 0;
      reveals.forEach((reveal, index) => {
        if (reveal > 0.001) topLayer = index;
      });

      const progressLabels = Array.from(reel.querySelectorAll<HTMLElement>(".cinematic-progress span"));
      progressLabels.forEach((label, index) => {
        const active = index === topLayer;
        label.style.color = active ? "#ffffff" : "rgba(255,255,255,.35)";
        label.style.borderColor = active ? "#e11c2b" : "rgba(255,255,255,.25)";
        label.style.background = active ? "#e11c2b" : "rgba(5,5,7,.28)";
      });

      panels.forEach((panel, index) => {
        const frame = panel.querySelector<HTMLElement>(".cinematic-frame");
        const video = panel.querySelector<HTMLVideoElement>(".cinematic-frame video");
        const copy = panel.querySelector<HTMLElement>(".cinematic-copy");
        if (!frame || !video || !copy) return;

        const progress = reveals[index];
        const reverse = index % 2 === 1;

        const topLeft = reverse ? 38 * (1 - progress) : 62 * (1 - progress);
        const topRight = reverse ? 62 * (1 - progress) : 38 * (1 - progress);
        const bottomRight = reverse ? 62 + 38 * progress : 38 + 62 * progress;
        const bottomLeft = reverse ? 38 + 62 * progress : 62 + 38 * progress;
        frame.style.clipPath = `polygon(0 ${topLeft}%, 100% ${topRight}%, 100% ${bottomRight}%, 0 ${bottomLeft}%)`;

        const videoShift = 5 - progress * 10;
        video.style.transform = `translateY(${videoShift}%) scale(1.06)`;

        const coveredByNext = index < panels.length - 1 ? reveals[index + 1] : 0;
        const entrance = index === 0 ? 1 : Math.min(1, Math.max(0, (progress - 0.56) / 0.24));
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: "-4% 0px -10% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
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

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Batman do Futuro — início">
          <img src="/assets/batman-beyond-wordmark.svg" alt="Batman do Futuro" />
        </a>

        <button
          className="menu-button"
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
          <a href="#origem" onClick={closeMenu}>Origem</a>
          <a href="#midia" onClick={closeMenu}>Cenas</a>
          <a href="#cidade" onClick={closeMenu}>Neo-Gotham</a>
          <a href="#traje" onClick={closeMenu}>O traje</a>
          <a href="#personagens" onClick={closeMenu}>Personagens</a>
        </nav>

        <a className="button button-small header-cta" href="#midia">
          Ver cenas <span aria-hidden="true">↓</span>
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

        <div className="hero-visual">
          <div className="hero-moon" aria-hidden="true" />
          <div className="hero-number" aria-hidden="true">2099</div>
          <img src="/assets/neo-gotham-hero.png" alt="Silhueta estilizada do Batman do Futuro diante de Neo-Gotham" />
          <div className="visual-caption"><span>IDENTIDADE</span> Terry McGinnis</div>
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
            <p>
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
            </article>
          ))}
        </div>
      </section>

      <section className="transmissions" id="midia" aria-labelledby="transmissions-title">
        <div className="transmissions-mark reveal-mark" data-reveal aria-hidden="true">
          <img src="/assets/batman-beyond-bat.png" alt="" />
        </div>
        <div className="section-heading row-heading">
          <div>
            <p className="eyebrow"><span>02</span> Arquivo de transmissão</p>
            <h2 id="transmissions-title">Veja o futuro<br /><em>entrar em ação.</em></h2>
          </div>
          <p>Registros interceptados revelam a cidade, o novo Batman e ameaças que transformaram o futuro em um campo de batalha.</p>
        </div>

        <div className="cinematic-reel">
          <div className="cinematic-stage">
            {videoClips.map((video, index) => (
              <article className={`cinematic-panel cinematic-panel-${index + 1}`} key={video.basename}>
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

      <section className="city" id="cidade">
        <div className="city-copy reveal-city" data-reveal>
          <p className="eyebrow light"><span>03</span> Proteja a cidade</p>
          <h2>Bem-vindo a<br /><em>Neo-Gotham.</em></h2>
          <p className="city-lead">
            Arranha-céus atravessam as nuvens. Veículos cortam o céu. Luzes de neon escondem becos onde tecnologia e crime caminham lado a lado.
          </p>
          <p className="city-statement">A cidade mudou.<br />O medo continua o mesmo.</p>
        </div>

        <div className="city-panels">
          {[
            ["Explore", "Descubra uma metrópole construída sobre as sombras da antiga Gotham."],
            ["Patrulhe", "Cruze os céus e encontre perigos ocultos pela cidade vertical."],
            ["Proteja", "Enfrente criminosos capazes de transformar o futuro em uma arma."],
          ].map(([title, text], index) => (
            <article className={`reveal-rise motion-delay-${index}`} data-reveal key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section legacy">
        <div className="legacy-quote reveal-mask" data-reveal>
          <p className="eyebrow"><span>04</span> Carregue o símbolo</p>
          <h2>O homem muda.<br /><em>A missão permanece.</em></h2>
          <blockquote>“O símbolo não pertence ao passado. Ele pertence a quem tiver coragem de defendê-lo.”</blockquote>
        </div>

        <div className="duo">
          <article className="duo-card terry reveal-duo-left" data-reveal>
            <span className="duo-label">O sucessor</span>
            <div className="duo-monogram">T</div>
            <h3>Terry<br />McGinnis</h3>
            <p>Instinto, velocidade e uma nova forma de lutar pelo futuro.</p>
          </article>
          <article className="duo-card bruce reveal-duo-right motion-delay-1" data-reveal>
            <span className="duo-label">A lenda</span>
            <div className="duo-monogram">B</div>
            <h3>Bruce<br />Wayne</h3>
            <p>Experiência, estratégia e uma missão que nunca terminou.</p>
          </article>
        </div>
      </section>

      <section className="suit" id="traje">
        <div className="suit-title reveal-mask" data-reveal>
          <p className="eyebrow light"><span>05</span> Vista o futuro</p>
          <h2>Muito mais<br />do que <em>uma armadura.</em></h2>
          <p>Criado para uma nova era, o traje combina proteção, mobilidade e poder em um único sistema.</p>
        </div>
        <div className="suit-core suit-video reveal-scale" data-reveal aria-hidden="true">
          <video data-scroll-video muted loop playsInline preload="metadata" poster="/videos/02-batman-arrival-poster.jpg" aria-hidden="true">
            <source src="/videos/02-batman-arrival.webm" type="video/webm" />
            <source src="/videos/02-batman-arrival.mp4" type="video/mp4" />
          </video>
          <span className="core-ring" />
          <span className="core-label">PROTOCOLO<br />BEYOND</span>
        </div>
        <div className="suit-list">
          {suitFeatures.map(([number, title, text], index) => (
            <article className={`reveal-rise motion-delay-${Math.min(index, 4)}`} data-reveal key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cast" id="personagens">
        <div className="section-heading row-heading reveal-mask" data-reveal>
          <div>
            <p className="eyebrow"><span>06</span> Dossiês de Neo-Gotham</p>
            <h2>Escolha um<br /><em>lado da história.</em></h2>
          </div>
          <div className="cast-tabs" role="group" aria-label="Filtrar personagens">
            <button className={cast === "allies" ? "active" : ""} type="button" onClick={() => setCast("allies")}>Aliados</button>
            <button className={cast === "villains" ? "active" : ""} type="button" onClick={() => setCast("villains")}>Vilões</button>
          </div>
        </div>

        <div className="cast-grid" aria-live="polite">
          {casts[cast].map(([initials, name, text], index) => (
            <article className={`cast-card reveal-rise motion-delay-${index}`} data-reveal key={name}>
              <span className="cast-number">0{index + 1}</span>
              <div className="cast-portrait" aria-hidden="true"><span>{initials}</span></div>
              <h3>{name}</h3>
              <p>{text}</p>
              <span className="cast-line" />
            </article>
          ))}
        </div>
      </section>

      <section className="signal-form-section">
        <div className="reveal-mask" data-reveal>
          <p className="eyebrow light"><span>07</span> O legado continua</p>
          <h2>O futuro ainda<br />precisa de <em>um Batman.</em></h2>
        </div>
        <form className="signal-form reveal-rise motion-delay-1" data-reveal onSubmit={submitSignal}>
          <label htmlFor="email">Receba novas transmissões de Neo-Gotham.</label>
          <div className="input-row">
            <input id="email" name="email" type="email" placeholder="SEU E-MAIL" required aria-describedby="privacy-note" />
            <button type="submit" aria-label="Cadastrar e-mail">↗</button>
          </div>
          <p id="privacy-note">Sem spam. Apenas sinais importantes do futuro.</p>
          {sent && <p className="form-success" role="status">Sinal recebido. Conexão estabelecida.</p>}
        </form>
      </section>

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
