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
    title: "Voo sobre Neo-Gotham",
    duration: "00:08",
    tone: "media-blue",
    basename: "01-neo-gotham-flight",
    description: "Uma patrulha aérea entre as luzes da cidade do futuro.",
  },
  {
    code: "PROTOCOLO DO TRAJE",
    title: "Batman em ação",
    duration: "00:08",
    tone: "media-red",
    basename: "02-batman-arrival",
    description: "A chegada do novo Batman marca o início de uma nova era.",
  },
  {
    code: "TRANSMISSÃO 02",
    title: "Inque nas alturas",
    duration: "00:08",
    tone: "media-violet",
    basename: "03-inque-rooftop",
    description: "Uma ameaça mutável surge acima das ruas de Neo-Gotham.",
  },
  {
    code: "TRANSMISSÃO 03",
    title: "Curaré em combate",
    duration: "00:08",
    tone: "media-red",
    basename: "04-curare-action",
    description: "Velocidade e precisão em um confronto sem espaço para erros.",
  },
] as const;

const transmissionVideos = [videoClips[0], videoClips[2], videoClips[3]];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<(typeof videoClips)[number] | null>(null);
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
    document.body.style.overflow = activeVideo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

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
          <a href="#cidade" onClick={closeMenu}>Neo-Gotham</a>
          <a href="#traje" onClick={closeMenu}>O traje</a>
          <a href="#personagens" onClick={closeMenu}>Personagens</a>
        </nav>

        <button className="button button-small header-cta" type="button" onClick={() => setActiveVideo(videoClips[1])}>
          Ver cenas <span aria-hidden="true">▶</span>
        </button>
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
            <button className="text-button" type="button" onClick={() => setActiveVideo(videoClips[1])}>
              <span className="play-dot" aria-hidden="true">▶</span> Assistir às cenas
            </button>
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
          <p className="eyebrow"><span>01</span> De rebelde a símbolo</p>
          <h2>Nasce um<br /><em>novo Batman.</em></h2>
          <p>
            Terry McGinnis nunca planejou se tornar um herói. Quando Neo-Gotham precisa novamente de um protetor, ele veste o traje — mas usar o símbolo é apenas o começo.
          </p>
        </div>

        <div className="origin-cards">
          {originSteps.map((step) => (
            <article className="origin-card" key={step.number}>
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

      <section className="transmissions" aria-labelledby="transmissions-title">
        <div className="section-heading row-heading">
          <div>
            <p className="eyebrow"><span>02</span> Arquivo de transmissão</p>
            <h2 id="transmissions-title">Veja o futuro<br /><em>entrar em ação.</em></h2>
          </div>
          <p>Registros interceptados revelam a cidade, o novo Batman e ameaças que transformaram o futuro em um campo de batalha.</p>
        </div>

        <div className="media-grid">
          {transmissionVideos.map((video) => (
            <button
              className={`media-card ${video.tone}`}
              type="button"
              key={video.basename}
              onClick={() => setActiveVideo(video)}
              aria-label={`Assistir à cena: ${video.title}`}
            >
              <video
                className="media-background"
                autoPlay
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
              <span className="media-code">{video.code}</span>
              <span className="media-play" aria-hidden="true">▶</span>
              <span className="media-title">{video.title}</span>
              <span className="media-duration">{video.duration}</span>
              <span className="media-placeholder">Cena disponível</span>
            </button>
          ))}
        </div>
      </section>

      <section className="city" id="cidade">
        <div className="city-copy">
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
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section legacy">
        <div className="legacy-quote">
          <p className="eyebrow"><span>04</span> Carregue o símbolo</p>
          <h2>O homem muda.<br /><em>A missão permanece.</em></h2>
          <blockquote>“O símbolo não pertence ao passado. Ele pertence a quem tiver coragem de defendê-lo.”</blockquote>
        </div>

        <div className="duo">
          <article className="duo-card terry">
            <span className="duo-label">O sucessor</span>
            <div className="duo-monogram">T</div>
            <h3>Terry<br />McGinnis</h3>
            <p>Instinto, velocidade e uma nova forma de lutar pelo futuro.</p>
          </article>
          <article className="duo-card bruce">
            <span className="duo-label">A lenda</span>
            <div className="duo-monogram">B</div>
            <h3>Bruce<br />Wayne</h3>
            <p>Experiência, estratégia e uma missão que nunca terminou.</p>
          </article>
        </div>
      </section>

      <section className="suit" id="traje">
        <div className="suit-title">
          <p className="eyebrow light"><span>05</span> Vista o futuro</p>
          <h2>Muito mais<br />do que <em>uma armadura.</em></h2>
          <p>Criado para uma nova era, o traje combina proteção, mobilidade e poder em um único sistema.</p>
        </div>
        <button
          className="suit-core suit-video"
          type="button"
          onClick={() => setActiveVideo(videoClips[1])}
          aria-label="Assistir à cena: Batman em ação"
        >
          <video autoPlay muted loop playsInline preload="metadata" poster="/videos/02-batman-arrival-poster.jpg" aria-hidden="true">
            <source src="/videos/02-batman-arrival.webm" type="video/webm" />
            <source src="/videos/02-batman-arrival.mp4" type="video/mp4" />
          </video>
          <span className="core-ring" />
          <span className="suit-play" aria-hidden="true">▶</span>
          <span className="core-label">PROTOCOLO<br />BEYOND</span>
        </button>
        <div className="suit-list">
          {suitFeatures.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cast" id="personagens">
        <div className="section-heading row-heading">
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
            <article className="cast-card" key={name}>
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
        <div>
          <p className="eyebrow light"><span>07</span> O legado continua</p>
          <h2>O futuro ainda<br />precisa de <em>um Batman.</em></h2>
        </div>
        <form className="signal-form" onSubmit={submitSignal}>
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
          <a href="/fonts/license.txt">Licença da fonte</a>
        </div>
        <small>
          Projeto conceitual não oficial para portfólio. Batman do Futuro e personagens relacionados pertencem à DC e à Warner Bros. Entertainment.
        </small>
      </footer>

      {activeVideo && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="video-title" onMouseDown={() => setActiveVideo(null)}>
          <div className="modal-card" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setActiveVideo(null)} aria-label="Fechar vídeo">×</button>
            <video
              className="modal-video"
              controls
              autoPlay
              playsInline
              poster={`/videos/${activeVideo.basename}-poster.jpg`}
            >
              <source src={`/videos/${activeVideo.basename}.webm`} type="video/webm" />
              <source src={`/videos/${activeVideo.basename}.mp4`} type="video/mp4" />
              Seu navegador não oferece suporte à reprodução de vídeo.
            </video>
            <div className="modal-caption">
              <p>{activeVideo.code}</p>
              <h2 id="video-title">{activeVideo.title}</h2>
              <span>{activeVideo.description}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
