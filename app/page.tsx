export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <span className="hero-badge animate">Curadoria local • experiências autênticas</span>
            <h1 className="hero-title animate delay-1">
              VamoAli conecta você ao <span>melhor da cidade</span> em tempo real.
            </h1>
            <p className="hero-desc animate delay-2">
              Uma plataforma de experiências locais pensada para quem quer viver a cidade com
              intensidade. Roteiros dinâmicos, hosts apaixonados e encontros que viram memória.
            </p>
            <div className="hero-actions animate delay-3">
              <a className="button button-primary" href="#agendar">
                Quero experimentar
              </a>
              <a className="button button-secondary" href="#como-funciona">
                Ver como funciona
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orbit-card animate delay-2">
              <h2 className="orbit-title">Radar vivo de experiências</h2>
              <p className="hero-desc">
                Um fluxo curado com sinais culturais, agendas instantâneas e lugares que ainda não
                apareceram nos roteiros óbvios.
              </p>
              <div className="orbit-list">
                <div className="orbit-item">
                  <span className="orbit-dot" />
                  <span>Experiências em grupos pequenos</span>
                </div>
                <div className="orbit-item">
                  <span className="orbit-dot" />
                  <span>Hosts verificados e avaliados</span>
                </div>
                <div className="orbit-item">
                  <span className="orbit-dot" />
                  <span>Recomendações contextuais por horário</span>
                </div>
              </div>
              <div className="metrics">
                <div className="metric">
                  <strong>120+</strong>
                  <span>experiências ativas</span>
                </div>
                <div className="metric">
                  <strong>4,9/5</strong>
                  <span>satisfação média</span>
                </div>
                <div className="metric">
                  <strong>48h</strong>
                  <span>para entrar no ar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sections" id="como-funciona">
        <div className="container">
          <div className="section-grid">
            <article className="section-card animate">
              <h3>Curadoria sensível</h3>
              <p>
                Selecionamos experiências pelo impacto cultural, diversidade de histórias e pelo
                cuidado com as pessoas envolvidas.
              </p>
            </article>
            <article className="section-card animate delay-1">
              <h3>Roteiros vivos</h3>
              <p>
                Cada roteiro se adapta ao clima, horário e vibe da cidade. Nada de programação
                engessada: você vive o agora.
              </p>
            </article>
            <article className="section-card animate delay-2">
              <h3>Comunidade pulsante</h3>
              <p>
                Construa conexões reais com hosts, artistas e pessoas que enxergam a cidade com
                olhos curiosos.
              </p>
            </article>
          </div>

          <div className="cta" id="agendar">
            <div>
              <h2>Pronto para viver a cidade de outro jeito?</h2>
              <p className="hero-desc">
                Reserve sua primeira experiência e receba um roteiro personalizado em menos de 24
                horas.
              </p>
            </div>
            <a className="button button-primary" href="mailto:contato@vamoali.com">
              Falar com a equipe
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <span>© 2026 VamoAli. Feito para quem gosta de cidade com alma.</span>
        </div>
      </footer>
    </main>
  );
}
