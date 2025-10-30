# ONG Esperança Viva — Site institucional

Site estático responsivo com recursos de acessibilidade nível AA (WCAG 2.1), navegação otimizada por teclado e modos de exibição inclusivos (Modo Escuro e Alto Contraste).

## Visão geral

Este repositório contém as páginas públicas da ONG Esperança Viva:

- Página inicial (index)
- Listagem de projetos
- Cadastro de voluntários/doadores

O projeto é 100% estático (HTML/CSS/JS) e pode ser aberto diretamente no navegador. Há também um modo SPA leve para navegação sem recarregar página, baseado em templates HTML em `assets/js/templates.js`.

## Principais recursos

- Layout responsivo (grid de 12 colunas e utilitários CSS)
- Componentes reutilizáveis: Navbar com submenu, Cards, Badges/Tags, Alerts, Toasts e Modal
- Formulário de cadastro com máscaras (CPF/Telefone/CEP), validação e feedback visual
- Preferências do usuário persistentes (LocalStorage):
  - Modo escuro (`data-theme="dark"`)
  - Alto contraste (`data-contrast="high"`)
- Navegação SPA opcional (interceptação de links internos via `templates.js`)

## Acessibilidade (WCAG 2.1 Nível AA)

Implementações-chave para conformidade:

- Estrutura semântica e Landmarks: uso de `header`, `nav`, `main`, `footer` e títulos hierárquicos.
- Skip link: link "Pular para o conteúdo principal" visível ao foco, apontando para o `main`.
- Navegação por teclado: tudo é operável via teclado, incluindo:
  - Menubar/Submenus (Enter/Espaço abre/fecha, Setas navegam, Esc fecha)
  - Modal com trap de foco (Tab circula, Esc fecha, restaura foco ao gatilho)
- Foco visível: outline consistente e com alto contraste em todos os elementos interativos.
- Leitores de tela:
  - Estados ARIA em navegação (`aria-expanded`, `aria-current`) e botões de preferência (`aria-pressed`).
  - Formulário com `aria-invalid`, `aria-describedby` e live region para mensagens.
  - Toasters e status com `aria-live`.
- Contraste mínimo: cores de texto, foco e contornos revisadas para AA em modo claro e escuro.
- Alto contraste: tema específico que maximiza a legibilidade com bordas e focos reforçados.

## Como executar

Sem dependências. Basta abrir o arquivo `index.html` em um navegador moderno (Chrome, Edge, Firefox, Safari).

Para uma experiência de desenvolvimento mais fluida, recomenda-se usar a extensão "Live Server" do VS Code (ou qualquer servidor estático leve).

## Estrutura do projeto

```
projeto/
├─ index.html          # Página inicial
├─ projetos.html       # Listagem de projetos
├─ cadastro.html       # Formulário de voluntário/doador
└─ assets/
   ├─ css/
   │  └─ style.css     # Estilos, variáveis CSS e temas (claro/escuro/alto contraste)
   ├─ imgs/            # Imagens (logo, ilustrações)
   └─ js/
      ├─ main.js       # Interações: menu, modal, toasts, máscaras, tema/contraste
      └─ templates.js  # Templates para modo SPA e renderização de seções
```

## Temas e personalização

- Variáveis de cor e espaçamento em `:root` (`assets/css/style.css`):
  - `--cor-principal`, `--cor-secundaria`, `--cor-texto`, `--cor-fundo`, etc.
  - Foco: `--focus-ring`
- Temas:
  - Escuro: adicionado com `data-theme="dark"` em `<html>`
  - Alto contraste: `data-contrast="high"` em `<html>`
- Os botões de alternância no cabeçalho trocam essas preferências e as persistem no `localStorage`.

## Guia de contribuição

1. Crie uma branch a partir de `main`.
2. Faça alterações focadas e com commits descritivos.
3. Garanta que o teclado navega por todos os novos componentes e que o foco seja visível.
4. Verifique contraste (texto e foco) e a leitura por leitores de tela (NVDA/JAWS/VoiceOver).
5. Abra um Pull Request descrevendo a mudança, impacto e como testar.

### Padrões de código

- HTML: semântico, sem `tabindex` positivo; usar `aria-` apenas quando necessário.
- CSS: utilizar variáveis existentes; preservar tokens de tema; evitar `!important` quando possível.
- JS: sem dependências externas; priorizar delegação de eventos e compatibilidade; manter suporte de teclado.

## Checklist de QA (manual)

- Teclado
  - [ ] Tab do topo foca o link de pular conteúdo; Enter salta para o `main`.
  - [ ] Navbar: usar Setas Esquerda/Direita entre itens e Baixo/Cima no submenu; Esc fecha.
  - [ ] Modal: abre pelo botão, Tab circula internamente, Esc fecha e devolve foco ao botão.
- Formulário
  - [ ] Campos inválidos recebem `aria-invalid` e mensagens associadas por `aria-describedby`.
  - [ ] Live region anuncia erros e sucesso no envio.
- Contraste e tema
  - [ ] Verificar contraste de texto/ícones/foco em modo claro e escuro (AA ≥ 4.5:1 para texto normal).
  - [ ] Alto contraste com bordas e foco visíveis e texto legível.
- Leitores de tela
  - [ ] Navbar anuncia item atual (`aria-current="page"`).
  - [ ] Mensagens de status (toasts/toggles) são lidas.

## Compatibilidade

- Navegadores modernos (últimas versões de Chrome, Edge, Firefox, Safari). Não há polyfills inclusos.
- Mobile e desktop com layout responsivo (breakpoints em 480px, 768px, 1024px, 1280px, 1536px).

## Licença

Nenhuma licença foi definida neste repositório. Sugestão: adotar [MIT](https://opensource.org/licenses/MIT) ou outra adequada ao projeto e adicionar um arquivo `LICENSE`.

## Créditos

- Conteúdo e identidade: ONG Esperança Viva (placeholders)
- Ícones e imagens: recursos locais em `assets/imgs/`

---

Dúvidas ou sugestões? Abra uma issue ou envie um PR — feedback é muito bem-vindo!
