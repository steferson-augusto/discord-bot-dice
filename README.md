<h1 align="center">
  <img src="./github/logo.png" alt="Ícone" width="48" />
  <br>
  BOT DE ROLAGENS DE DADOS PARA DISCORD
</h1>
<p>
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/steferson-augusto/discord-bot-dice"/>

  <img alt="GitHub" src="https://img.shields.io/github/license/steferson-augusto/discord-bot-dice"/>
</p>

<h4 align="center">
  <a href="#description" >
    Descrição
  </a>
  |
  <a href="#commands" >
    Comandos
  </a>
  |
  <a href="#license" >
    Licença
  </a>
</h4>

<p align="center">
  <img src="./github/discord.png" style="border-radius: 6px;" alt="Printscreen" width="240" >
</p>

<br/>
<h2 name="description">💡 Descrição</h2>
<p>
  Bot para a plataforma <a href="https://discord.com/" target="_blank">Discord</a> que possui comandos para efetuar rolagem de dados para um RPG de mesa.
</p>
<p>
  Para que o bot funcione é necessário que o arquivo "index.js" esteja em execução (mesmo que seja em um servidor local).
</p>

<p align="center">
  <img src="./github/animation.gif" alt="Animação" width="640" >
</p>

<br/>
<h2 name="commands">🚀 Comandos</h2>
<h3>d!roll [...dados]</h3>

<p>
  Todo conteúdo após "d!roll" é tratado como parâmetro. Palavras com inicial "d" são usadas como dados, caso contrário, são tratadas como modificadores fixos/bônus e são somadas/subtraídas do resultado final.
</p>

> d!roll d12 d6 +5 -1

<p align="center">
  <img src="./github/roll.png" style="border-radius: 6px;" alt="Rolagem comum" width="640" >
</p>

<h3>d!mroll dificuldade quantidade [...dados]</h3>

<p>
O primeiro parâmetro é a quantidade de tentativas, o segundo parâmetro é a dificuldade das rolagens e o restante são os dados das rolagens.
</p>

> d!mroll 20 8 d6 +5 -1

<p align="center">
  <img src="./github/mroll.png" style="border-radius: 6px;" alt="Rolagem comum" width="240" >
</p>

<h3>d!anel quantidade [...dados]</h3>

<p>
  O primeiro parâmetro é quantidade de tentativas desejada e todo o restante faz parte dos dados que compõem a rolagem. Palavras com inicial "d" são usadas como dados, caso contrário, são tratadas como modificadores fixos/bônus e são somadas/subtraídas do resultado final.
</p>

> d!anel 80 d8 d8 +1 -1

<p align="center">
  <img src="./github/anel.png" style="border-radius: 6px;" alt="Forja de anéis espaciais" width="640" >
</p>

<h3>d!status {...params}</h3>
<p>
  Exibe o status de seu respectivo personagem.
</p>

> d!status

<p align="center">
  <img src="./github/status.png" style="border-radius: 6px;" alt="Exibir status" width="640" >
</p>

---

<p>
  Altera o tamanho máximo da respectiva barra ou cria uma nova barra caso não exista.
</p>

> d!status hp:pool=60

<p align="center">
  <img src="./github/status_pool.png" style="border-radius: 6px;" alt="Aumentar pool" width="640" >
</p>

---

<p>
  Soma ou subtrai o parâmetro da respectiva barra.
</p>

> d!status hp:add=5

<p align="center">
  <img src="./github/status_add.png" style="border-radius: 6px;" alt="Adicionar status" width="640" >
</p>

---

<p>
  Altera o valor corrente da respectiva barra para o valor passado como parâmetro.
</p>

> d!status hp:current=20

<p align="center">
  <img src="./github/status_current.png" style="border-radius: 6px;" alt="Alterar valor" width="640" >
</p>

<h3>d!forja_arma quantidade grau peso tempo_dedicado [...dados]</h3>

<b>quantidade</b> é a quantidade de tentativas realizadas<br><b>grau</b> é o grau da arma desejada<br><b>peso</b> é o peso da arma desejada<br><b>tempo_dedicado</b> é o tempo a mais ou a menos de dedicação para construção daquela arma, de maneira que cada unidade representa 30 minutos e influncia na dificuldade da rolagem

> d!forja_arma 50 2 3 1 5d12 2d4 12

<p align="center">
  <img src="./github/forja_arma.png" style="border-radius: 6px;" alt="Forja de anéis espaciais" width="360" >
</p>


<br/>
<h2 name="license">📝 Licença</h2>
<p>Este projeto está sob uma licença MIT. Veja mais informações em <a href="https://github.com/steferson-augusto/discord-bot-dice/blob/master/LICENSE" target="_blank">LICENSE</a>.</p>

---

<p>👻 Criado por <a href="https://www.linkedin.com/in/st%C3%A9ferson-augusto-4b0b9b124/" target="_blank">Stéferson Augusto</a></p>
