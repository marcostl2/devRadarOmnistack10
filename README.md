# DevRadar

Encontre desenvolvedores próximos que trabalham com as tecnologias que você procura. O cadastro é feito pela web; no celular, a busca aparece em um mapa e permite abrir o perfil de cada pessoa no GitHub.

Projeto desenvolvido durante a Semana OmniStack 10, da Rocketseat.

## Como funciona

1. Na web, informe o usuário do GitHub, as tecnologias e a localização. O formulário tenta preencher as coordenadas pela geolocalização do navegador.
2. A API consulta o GitHub para obter nome, foto e bio, e salva o cadastro no MongoDB.
3. No aplicativo, pesquise por tecnologias para encontrar desenvolvedores em um raio de até 10 km.

O mobile também recebe novos cadastros por Socket.IO quando eles correspondem às tecnologias buscadas e à distância da conexão. Ao tocar no perfil de um marcador, a página do GitHub abre dentro do aplicativo.

## Tecnologias

| Parte | Tecnologias |
| --- | --- |
| Web | React 16, Create React App, Axios e CSS |
| Mobile | React Native, Expo SDK 36, React Navigation, React Native Maps e WebView |
| API | Node.js, Express, Mongoose e Socket.IO |
| Dados | MongoDB com índice geoespacial `2dsphere` |

## Organização

```text
backend/
  src/controllers/   Cadastro, listagem e busca por proximidade
  src/models/        Desenvolvedor e coordenadas geográficas
  src/websocket.js   Conexões e envio de novos cadastros
web/
  src/components/    Formulário de cadastro e cards de desenvolvedores
mobile/
  src/pages/         Mapa de busca e perfil do GitHub
  src/services/      Clientes HTTP e Socket.IO
```

## API

| Método | Rota | Uso |
| --- | --- | --- |
| GET | `/devs` | Listar os desenvolvedores cadastrados |
| POST | `/devs` | Cadastrar um desenvolvedor pelo usuário do GitHub |
| GET | `/search` | Buscar por tecnologias e localização |

O cadastro recebe `github_username`, `techs`, `latitude` e `longitude`. As tecnologias são informadas em uma string separada por vírgulas. Se o usuário já estiver cadastrado, a API retorna o registro existente.

A busca usa `latitude`, `longitude` e `techs` como parâmetros de consulta. Ela retorna desenvolvedores com pelo menos uma das tecnologias solicitadas, dentro do limite de 10 km.

## Configuração e execução

A API usa a porta `3333`. Antes de executá-la, configure uma conexão MongoDB própria em [backend/src/index.js](backend/src/index.js).

Os endereços dos clientes estão definidos nestes arquivos:

- [Web: api.js](web/src/services/api.js), apontando para `localhost:3333`.
- [Mobile: api.js](mobile/src/services/api.js), para as requisições HTTP.
- [Mobile: socket.js](mobile/src/services/socket.js), para as atualizações em tempo real.

No celular, os dois endereços precisam apontar para uma API acessível pelo aparelho.

Instale as dependências separadamente em `backend/`, `web/` e `mobile/`. Depois, execute cada parte em seu próprio terminal:

| Diretório | Comando |
| --- | --- |
| `backend/` | `npm run dev` |
| `web/` | `npm start` |
| `mobile/` | `npm start` |

O repositório mantém as dependências da edição original do curso. Os comandos foram conferidos nos arquivos do projeto, sem instalação ou teste de execução em um ambiente atual.
