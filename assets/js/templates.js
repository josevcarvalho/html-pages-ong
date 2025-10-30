// Simple JS templates for SPA views
// Exposes global TEMPLATES with functions returning HTML strings
(function (global) {
  const home = () => `
    <div class="container">
      <section class="grid-12 items-center">
        <div class="col-12 col-md-7">
          <h2 class="h2">Bem-vindo à ONG Esperança Viva</h2>
          <p>Nossa missão é transformar vidas por meio da solidariedade e do engajamento social.</p>
          <div class="flex gap-2 mt-2">
            <a class="btn" href="projetos.html">Conhecer projetos</a>
            <a class="btn btn--light" href="cadastro.html">Quero participar</a>
          </div>
        </div>
        <div class="col-12 col-md-5">
          <img src="./assets/imgs/acao.png" alt="Ação social da ONG" />
        </div>
      </section>

      <section>
        <h3 class="h3 mb-2">Nossos pilares</h3>
        <div class="grid-12">
          <div class="col-12 col-md-4">
            <div class="card"><div class="card__body">
              <h4 class="card__title">Educação</h4>
              <p class="card__text">Projetos de reforço escolar, bolsas e capacitação profissional.</p>
            </div></div>
          </div>
          <div class="col-12 col-md-4">
            <div class="card"><div class="card__body">
              <h4 class="card__title">Saúde</h4>
              <p class="card__text">Campanhas de saúde preventiva e acesso a atendimentos.</p>
            </div></div>
          </div>
          <div class="col-12 col-md-4">
            <div class="card"><div class="card__body">
              <h4 class="card__title">Sustentabilidade</h4>
              <p class="card__text">Ações de reciclagem, hortas comunitárias e educação ambiental.</p>
            </div></div>
          </div>
        </div>
      </section>

      <div class="alert alert--info mb-3" role="alert">
        <span>Inscrições abertas para o mutirão do fim de semana!</span>
        <button class="alert__close" aria-label="Fechar alerta">×</button>
      </div>

      <div class="flex gap-2">
        <button class="btn" data-open-modal="#doacaoModal">Quero doar</button>
      </div>
    </div>
  `;

  const projetos = () => `
    <div class="container">
      <article class="mb-3">
        <h2 class="h2">Projetos Sociais</h2>
        <p>Conheça nossos projetos e veja como você pode contribuir para um mundo melhor.</p>
      </article>

      <section id="educacao">
        <h3 class="h3 mb-2">Educação</h3>
        <div class="grid-12">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card">
              <div class="card__media"><img src="./assets/imgs/voluntariado.png" alt="Reforço escolar"/></div>
              <div class="card__body">
                <h4 class="card__title">Reforço escolar</h4>
                <p class="card__text">Aulas de apoio para crianças e adolescentes.</p>
                <div class="card__footer"><span class="badge badge--success">Ativo</span><span class="tag tag--primary">Educação</span></div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card">
              <div class="card__media"><img src="./assets/imgs/acao.png" alt="Capacitação"/></div>
              <div class="card__body">
                <h4 class="card__title">Capacitação profissional</h4>
                <p class="card__text">Cursos rápidos focados em empregabilidade.</p>
                <div class="card__footer"><span class="badge badge--warning">Inscrições</span><span class="tag tag--primary">Educação</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="saude">
        <h3 class="h3 mb-2">Saúde</h3>
        <div class="grid-12">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card">
              <div class="card__media"><img src="./assets/imgs/acao.png" alt="Campanhas de vacinação"/></div>
              <div class="card__body">
                <h4 class="card__title">Campanhas de vacinação</h4>
                <p class="card__text">Apoio logístico e mobilização comunitária.</p>
                <div class="card__footer"><span class="badge badge--success">Ativo</span><span class="tag tag--primary">Saúde</span></div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card">
              <div class="card__media"><img src="./assets/imgs/doacoes.png" alt="Mutirões de saúde"/></div>
              <div class="card__body">
                <h4 class="card__title">Mutirões de saúde</h4>
                <p class="card__text">Atendimentos básicos em comunidades.</p>
                <div class="card__footer"><span class="badge badge--warning">Em breve</span><span class="tag tag--primary">Saúde</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="meio-ambiente">
        <h3 class="h3 mb-2">Meio ambiente</h3>
        <div class="grid-12">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card">
              <div class="card__media"><img src="./assets/imgs/acao.png" alt="Horta comunitária"/></div>
              <div class="card__body">
                <h4 class="card__title">Horta comunitária</h4>
                <p class="card__text">Produção local de alimentos e oficinas.</p>
                <div class="card__footer"><span class="badge badge--success">Ativo</span><span class="tag tag--primary">Sustentabilidade</span></div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card">
              <div class="card__media"><img src="./assets/imgs/voluntariado.png" alt="Recicla bairro"/></div>
              <div class="card__body">
                <h4 class="card__title">Recicla bairro</h4>
                <p class="card__text">Pontos de coleta, triagem e educação ambiental.</p>
                <div class="card__footer"><span class="badge badge--danger">Precisa de doações</span><span class="tag tag--primary">Meio ambiente</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  const cadastro = () => `
    <div class="container">
      <section>
        <h2 class="h2">Cadastro de Voluntário / Doador</h2>
        <form id="form-cadastro" action="#" method="post" novalidate>
          <div class="grid-12">
            <fieldset class="col-12 col-md-6">
              <legend>Dados Pessoais</legend>
              <label for="nome">Nome Completo:</label>
              <input type="text" id="nome" name="nome" required />
              <small class="field-error">Informe seu nome.</small>

              <label for="email">E-mail:</label>
              <input type="email" id="email" name="email" required />
              <small class="field-error">E-mail inválido.</small>

              <label for="cpf">CPF:</label>
              <input type="text" id="cpf" name="cpf" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" required />
              <small class="field-error">Use o formato 000.000.000-00.</small>

              <label for="telefone">Telefone:</label>
              <input type="tel" id="telefone" name="telefone" pattern="\\(\\d{2}\\)\\s\\d{5}-\\d{4}" placeholder="(11) 91234-5678" required />
              <small class="field-error">Use o formato (11) 91234-5678.</small>

              <label for="nascimento">Data de Nascimento:</label>
              <input type="date" id="nascimento" name="nascimento" required />
            </fieldset>

            <fieldset class="col-12 col-md-6">
              <legend>Endereço</legend>
              <label for="endereco">Endereço:</label>
              <input type="text" id="endereco" name="endereco" required />

              <label for="cep">CEP:</label>
              <input type="text" id="cep" name="cep" pattern="\\d{5}-\\d{3}" placeholder="00000-000" required />
              <small class="field-error">Use o formato 00000-000.</small>

              <label for="cidade">Cidade:</label>
              <input type="text" id="cidade" name="cidade" required />

              <label for="estado">Estado:</label>
              <input type="text" id="estado" name="estado" maxlength="2" placeholder="SP" required />
            </fieldset>

            <fieldset class="col-12">
              <legend>Interesse</legend>
              <label><input type="radio" name="tipo" value="voluntario" required /> Quero ser Voluntário</label>
              <label><input type="radio" name="tipo" value="doador" /> Quero ser Doador</label>
            </fieldset>
          </div>
          <div class="mt-2">
            <button class="btn" type="submit">Enviar Cadastro</button>
          </div>
        </form>
      </section>
    </div>
  `;

  global.TEMPLATES = { home, projetos, cadastro };
})(window);
