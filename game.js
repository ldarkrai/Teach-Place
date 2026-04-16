/* ============================================
   TEACH PLACE – game.js
   Lógica completa del juego educativo
   ============================================ */

"use strict";

/* ═══════════════════════════════════════════
   ░░  DATOS: MUNDOS Y NIVELES  ░░
   ═══════════════════════════════════════════ */
const WORLDS = [
  {
    id: 1,
    icon: "🤖",
    name: "Fundamentos de Discord y Bots",
    color: "#5865F2",
    desc: "Comprende qué es Discord, la API de bots y el ecosistema necesario para empezar.",
    intro: "Antes de escribir una sola línea de código, necesitas entender qué es Discord a fondo, cómo funciona su API y por qué los bots son tan poderosos dentro de esta plataforma.",
    key: "Un Bot de Discord es una cuenta especial controlada por un programa externo que interactúa con la API de Discord para leer mensajes, responder, gestionar servidores y mucho más.",
    concepts: [
      { icon: "💬", name: "Discord API", desc: "Interfaz que permite a aplicaciones externas comunicarse con Discord." },
      { icon: "🔑", name: "Token de Bot", desc: "Credencial única y secreta que autentica tu bot ante la API." },
      { icon: "🌐", name: "Gateway", desc: "Conexión WebSocket que recibe eventos en tiempo real de Discord." },
      { icon: "📋", name: "Intents", desc: "Permisos que definen qué eventos recibirá tu bot del gateway." },
    ],
    levels: [
      {
        mission: "Misión 1 · Conceptos Base",
        question: "¿Cuál es la función principal de un Bot de Discord?",
        fragment: "Un Bot de Discord es una cuenta automatizada que puede leer y enviar mensajes, reaccionar a eventos y ejecutar acciones dentro de un servidor.",
        hint: "Piensa en automatización e interacción.",
        options: ["Almacenar archivos multimedia del servidor", "Ejecutar acciones automáticas a través de la API de Discord", "Gestionar el servidor de DNS de Discord", "Diseñar la interfaz gráfica de Discord"],
        correct: 1,
        explanation: "Un bot interactúa con la API de Discord para ejecutar acciones automáticamente: responder mensajes, moderar, reproducir música, etc.",
        remember: "📌 Los bots no 'hackean' Discord; usan una API oficial y documentada.",
        goal: "Comprender qué es un bot",
        time: 60,
      },
      {
        mission: "Misión 2 · El Token",
        question: "¿Por qué el Token del bot debe mantenerse en secreto?",
        fragment: "TOKEN=MTEwMjM0NTY3ODk...\n// ⚠️ NUNCA expongas este valor en GitHub o código público.",
        hint: "El token es como la contraseña de tu bot.",
        options: ["Porque ocupa mucha memoria RAM", "Porque Discord lo regenera cada hora", "Porque quien lo tenga puede controlar el bot completamente", "Porque está cifrado con AES-256"],
        correct: 2,
        explanation: "Con el token cualquier persona puede autenticarse como tu bot, enviar mensajes, banear usuarios o destruir el servidor. ¡Trátalo como una contraseña!",
        remember: "📌 Usa variables de entorno (.env) para proteger tu token.",
        goal: "Entender la seguridad del token",
        time: 60,
      },
      {
        mission: "Misión 3 · Gateway e Intents",
        question: "¿Qué son los 'Intents' en la API de Discord?",
        fragment: "const client = new Client({\n  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]\n});",
        hint: "Observa que se declaran al crear el cliente.",
        options: ["Comandos de texto que el bot escucha", "Permisos que dicen qué eventos recibirá el bot", "Archivos de configuración del servidor", "Módulos del lenguaje JavaScript"],
        correct: 1,
        explanation: "Los Intents son declaraciones que le dicen a Discord qué tipo de eventos (mensajes, presencia, miembros) quieres recibir. Sin el intent correcto, el evento no llega a tu bot.",
        remember: "📌 Los Privileged Intents (GuildMembers, MessageContent) deben activarse en el Portal de Discord.",
        goal: "Comprender Intents del Gateway",
        time: 60,
      },
      {
        mission: "Misión 4 · Escenario",
        question: "Tu bot no recibe el contenido de los mensajes aunque el código parece correcto. ¿Cuál es la causa más probable?",
        fragment: "// El bot conecta sin errores pero message.content siempre es string vacío\nconsole.log(message.content); // → ''",
        hint: "Revisa los Intents privilegiados en el Developer Portal.",
        options: ["El servidor de Discord está caído", "Falta activar el Intent 'Message Content' en el Portal de Desarrolladores", "El bot no tiene rol de administrador", "Se debe usar Python en lugar de JavaScript"],
        correct: 1,
        explanation: "Desde 2022, 'Message Content' es un Privileged Intent. Debes activarlo manualmente en el Discord Developer Portal y declararlo en tu código.",
        remember: "📌 Portal → Tu App → Bot → Privileged Gateway Intents → Message Content Intent ✓",
        goal: "Diagnosticar errores de Intent",
        time: 75,
      },
      {
        mission: "Misión 5 · Clasificación",
        question: "¿Qué tipo de conexión utiliza el Gateway de Discord para enviar eventos en tiempo real?",
        fragment: "// Discord envía eventos (MESSAGE_CREATE, GUILD_MEMBER_ADD, etc.) a través de...",
        hint: "Es diferente a una petición HTTP normal.",
        options: ["REST HTTP polling cada segundo", "FTP seguro (SFTP)", "WebSocket persistente", "Bluetooth Low Energy"],
        correct: 2,
        explanation: "El Gateway usa WebSockets, una conexión persistente bidireccional. Esto permite recibir eventos instantáneamente sin necesidad de hacer peticiones HTTP repetidas.",
        remember: "📌 REST se usa para acciones (enviar mensajes), WebSocket para eventos (recibir mensajes).",
        goal: "Identificar protocolos de Discord",
        time: 60,
      },
      {
        mission: "Misión 6 · Quiz Final Mundo 1",
        question: "¿En qué sección del Discord Developer Portal se genera el Token de un bot?",
        fragment: "Accede a: https://discord.com/developers/applications\n→ Selecciona tu aplicación\n→ ¿Qué pestaña?",
        hint: "No es la sección de OAuth2 ni de General Information.",
        options: ["General Information", "Rich Presence", "Bot", "OAuth2 → Scopes"],
        correct: 2,
        explanation: "En la pestaña 'Bot' del Developer Portal puedes crear el bot de tu aplicación, ver/regenerar su token y configurar sus Intents privilegiados.",
        remember: "📌 Si regeneras el token, el antiguo deja de funcionar inmediatamente.",
        goal: "Navegar el Developer Portal",
        time: 60,
      },
    ]
  },

  {
    id: 2,
    icon: "🛠️",
    name: "Configuración del Entorno",
    color: "#57F287",
    desc: "Instala Node.js, configura discord.js y prepara tu proyecto con buenas prácticas.",
    intro: "Un entorno bien configurado es la diferencia entre un proyecto estable y uno lleno de bugs. Aprenderás a instalar las herramientas necesarias y estructurar tu proyecto correctamente.",
    key: "discord.js es la librería oficial de Node.js para interactuar con la API de Discord. Es el puente entre tu código JavaScript y los servidores de Discord.",
    concepts: [
      { icon: "🟢", name: "Node.js", desc: "Entorno de ejecución JavaScript del lado del servidor." },
      { icon: "📦", name: "npm/pnpm", desc: "Gestores de paquetes para instalar dependencias." },
      { icon: "📁", name: "Estructura", desc: "Organización de carpetas: commands/, events/, utils/." },
      { icon: "🔒", name: ".env", desc: "Archivo para variables de entorno sensibles (token, IDs)." },
    ],
    levels: [
      {
        mission: "Misión 1 · Instalación",
        question: "¿Qué comando instala discord.js en un proyecto Node.js?",
        fragment: "$ _______________\n\nAdds 1 package, 32 dependencies...\ndiscord.js@14.x.x",
        hint: "Usa npm o pnpm para instalar paquetes.",
        options: ["npm install discord", "npm install discord.js", "node install discord.js", "pip install discord.py"],
        correct: 1,
        explanation: "El paquete correcto es 'discord.js'. El simple 'discord' es un paquete diferente y desactualizado. pip es para Python, no Node.js.",
        remember: "📌 Verifica que tengas Node.js 16.9.0 o superior para discord.js v14.",
        goal: "Instalar discord.js correctamente",
        time: 60,
      },
      {
        mission: "Misión 2 · Variables de Entorno",
        question: "¿Qué archivo se usa para guardar el Token y otras credenciales de forma segura?",
        fragment: "TOKEN=tu_token_aqui\nCLIENT_ID=123456789\nGUILD_ID=987654321\n\n// En tu código:\nprocess.env.TOKEN",
        hint: "Este archivo nunca debe subirse a GitHub.",
        options: ["config.json", "settings.xml", ".env", "secrets.js"],
        correct: 2,
        explanation: "El archivo .env (con el paquete dotenv) guarda variables de entorno. Debes añadir '.env' a tu .gitignore para que nunca se suba al repositorio.",
        remember: "📌 npm install dotenv → require('dotenv').config() → usa process.env.VARIABLE",
        goal: "Manejar credenciales de forma segura",
        time: 60,
      },
      {
        mission: "Misión 3 · Estructura del Proyecto",
        question: "¿Cuál es una estructura de carpetas recomendada para un bot de Discord escalable?",
        fragment: "Proyecto/\n├── commands/\n├── events/\n├── utils/\n├── index.js\n├── .env\n└── package.json",
        hint: "Piensa en separación de responsabilidades.",
        options: ["Poner todo en un único archivo index.js", "Separar comandos, eventos y utilidades en carpetas", "Usar solo archivos .txt para configuración", "Crear una carpeta por cada mensaje del bot"],
        correct: 1,
        explanation: "Separar comandos, eventos y utilidades facilita el mantenimiento, la depuración y la colaboración. Es una práctica estándar en proyectos Node.js.",
        remember: "📌 commands/ → lógica de comandos | events/ → oyentes de eventos | utils/ → funciones reutilizables",
        goal: "Estructurar proyectos escalables",
        time: 60,
      },
      {
        mission: "Misión 4 · Análisis de Código",
        question: "¿Qué hace este bloque de código al inicio de un bot?",
        fragment: "require('dotenv').config();\nconst { Client, GatewayIntentBits } = require('discord.js');\nconst client = new Client({\n  intents: [GatewayIntentBits.Guilds]\n});\nclient.login(process.env.TOKEN);",
        hint: "Sigue el flujo línea a línea.",
        options: ["Crea un servidor web con Express.js", "Carga el .env, crea el cliente de Discord y lo conecta con el token", "Descarga la librería discord.js automáticamente", "Envía un mensaje de bienvenida al servidor"],
        correct: 1,
        explanation: "1) dotenv carga las variables del .env, 2) se importa y crea el cliente con los intents necesarios, 3) client.login autentica el bot con el token de forma segura.",
        remember: "📌 client.login() devuelve una Promise. Los errores de token incorrecto se capturan con .catch()",
        goal: "Interpretar código de inicialización",
        time: 75,
      },
      {
        mission: "Misión 5 · Diagnóstico",
        question: "Al ejecutar tu bot aparece: 'Error: Used disallowed intents'. ¿Qué debes hacer?",
        fragment: "Error [DisallowedIntents]: Privileged intent provided is not enabled or whitelisted.\n    at WebSocketShard.onPacket",
        hint: "El error menciona 'privileged intent'.",
        options: ["Reinstalar Node.js desde cero", "Activar el Intent privilegiado en el Discord Developer Portal", "Cambiar el nombre del bot", "Usar una versión anterior de discord.js"],
        correct: 1,
        explanation: "Los Privileged Intents (GuildPresences, GuildMembers, MessageContent) deben habilitarse manualmente en el Developer Portal de Discord antes de usarlos en código.",
        remember: "📌 Developer Portal → Tu App → Bot → Privileged Gateway Intents → Activar los necesarios.",
        goal: "Resolver errores de intent",
        time: 75,
      },
      {
        mission: "Misión 6 · package.json",
        question: "¿Qué campo en package.json define el archivo principal que se ejecuta con 'node .'?",
        fragment: '{\n  "name": "mi-bot",\n  "version": "1.0.0",\n  "___": "index.js",\n  "scripts": { "start": "node index.js" }\n}',
        hint: "Es un campo de una sola palabra.",
        options: ["start", "main", "entry", "init"],
        correct: 1,
        explanation: "El campo 'main' define el punto de entrada del proyecto. Al ejecutar 'node .' Node.js busca y ejecuta el archivo indicado en este campo.",
        remember: "📌 También puedes usar 'npm start' si defines el script en 'scripts.start'.",
        goal: "Entender package.json",
        time: 60,
      },
      {
        mission: "Misión 7 · Cierre Mundo 2",
        question: "¿Qué archivo debes añadir siempre a .gitignore para no exponer credenciales?",
        fragment: "# .gitignore\nnode_modules/\n________\n*.log",
        hint: "Es el archivo que contiene tus variables de entorno secretas.",
        options: ["package.json", "index.js", ".env", "README.md"],
        correct: 2,
        explanation: "El archivo .env contiene el Token del bot y otros secretos. Si lo subes a un repositorio público, cualquiera puede robar tu bot. ¡Siempre añádelo a .gitignore!",
        remember: "📌 GitHub tiene bots que escanean tokens de Discord expuestos y los reportan automáticamente.",
        goal: "Seguridad en repositorios",
        time: 60,
      },
    ]
  },

  {
    id: 3,
    icon: "⚡",
    name: "Eventos y Comandos",
    color: "#FEE75C",
    desc: "Aprende a escuchar eventos del Gateway y crear comandos slash interactivos.",
    intro: "Los eventos son el corazón de un bot. Desde que un usuario envía un mensaje hasta que alguien se une al servidor, Discord notifica a tu bot en tiempo real. Los Slash Commands modernos reemplazaron a los prefijos de texto.",
    key: "Los Slash Commands (/) son la forma moderna y recomendada de interactuar con bots. Discord los registra y muestra autocompletado al usuario, mejorando la experiencia.",
    concepts: [
      { icon: "📡", name: "client.on()", desc: "Método para escuchar eventos del Gateway de Discord." },
      { icon: "✴️", name: "Slash Commands", desc: "Comandos que comienzan con / y Discord gestiona nativamente." },
      { icon: "🔄", name: "interactionCreate", desc: "Evento que se dispara cuando un usuario usa un comando slash." },
      { icon: "📝", name: "CommandBuilder", desc: "Clase para construir la estructura de un slash command." },
    ],
    levels: [
      {
        mission: "Misión 1 · Evento Ready",
        question: "¿Qué evento indica que el bot se conectó correctamente a Discord?",
        fragment: "client.on('_____', () => {\n  console.log(`✅ Bot listo: ${client.user.tag}`);\n});",
        hint: "Es el primer evento que se dispara al conectar.",
        options: ["messageCreate", "ready", "connect", "login"],
        correct: 1,
        explanation: "El evento 'ready' se dispara una vez que el bot ha iniciado sesión y está listo para recibir eventos. Es el punto ideal para inicializar recursos.",
        remember: "📌 Usa client.once('ready') en lugar de client.on('ready') para que solo se ejecute una vez.",
        goal: "Conocer el evento ready",
        time: 60,
      },
      {
        mission: "Misión 2 · Escuchar Mensajes",
        question: "¿Qué evento de discord.js se dispara cuando un usuario envía un mensaje en un canal?",
        fragment: "client.on('________', message => {\n  if (message.content === '!ping') {\n    message.reply('Pong!');\n  }\n});",
        hint: "El nombre describe la acción: crear un mensaje.",
        options: ["message", "messageCreate", "onMessage", "newMessage"],
        correct: 1,
        explanation: "En discord.js v14, el evento correcto es 'messageCreate'. El antiguo 'message' fue deprecado. Necesitas el Intent GuildMessages y MessageContent activado.",
        remember: "📌 message.author.bot para verificar si el autor es un bot y evitar bucles infinitos.",
        goal: "Usar el evento messageCreate",
        time: 60,
      },
      {
        mission: "Misión 3 · Slash Command",
        question: "¿Qué clase de discord.js se usa para construir la definición de un Slash Command?",
        fragment: "const { SlashCommandBuilder } = require('discord.js');\n\nmodule.exports = {\n  data: new _______.setName('ping').setDescription('Responde pong'),\n  async execute(interaction) { await interaction.reply('Pong!'); }\n};",
        hint: "El nombre de la clase está en el fragmento de código.",
        options: ["CommandFactory", "SlashCommandBuilder", "ApplicationCommand", "MessageCommand"],
        correct: 1,
        explanation: "SlashCommandBuilder es la clase oficial de discord.js para construir slash commands con nombre, descripción, opciones y subcomandos de forma programática.",
        remember: "📌 Después de definir el comando debes registrarlo en Discord con la REST API usando el método put().",
        goal: "Crear Slash Commands",
        time: 60,
      },
      {
        mission: "Misión 4 · Responder Interacciones",
        question: "¿Cuál es la diferencia entre interaction.reply() e interaction.deferReply()?",
        fragment: "// Opción A: Respuesta inmediata\nawait interaction.reply('Hecho!');\n\n// Opción B: Respuesta diferida\nawait interaction.deferReply();\n// ... proceso largo ...\nawait interaction.editReply('Listo!');",
        hint: "Piensa en procesos que tardan más de 3 segundos.",
        options: ["No hay diferencia, ambos hacen lo mismo", "reply() es para mensajes públicos, deferReply() para privados", "deferReply() evita el timeout de 3s para procesos largos", "deferReply() solo funciona en canales de voz"],
        correct: 2,
        explanation: "Discord requiere una respuesta en menos de 3 segundos. Si tu proceso tarda más, usa deferReply() para mostrar 'pensando...' y luego editReply() con el resultado.",
        remember: "📌 deferReply({ ephemeral: true }) hace que solo el usuario que usó el comando vea la respuesta.",
        goal: "Manejar respuestas de interacción",
        time: 75,
      },
      {
        mission: "Misión 5 · Caso Práctico",
        question: "Tu bot responde correctamente al primer comando slash pero luego lanza 'InteractionAlreadyReplied'. ¿Qué ocurrió?",
        fragment: "async execute(interaction) {\n  await interaction.reply('Procesando...');\n  // ... código ...\n  await interaction.reply('¡Listo!'); // ← Error aquí\n}",
        hint: "Lee el código con atención: ¿cuántas veces se llama reply()?",
        options: ["El bot perdió conexión al gateway", "Se está llamando reply() dos veces en la misma interacción", "El token del bot expiró", "El usuario no tiene permiso para usar comandos"],
        correct: 1,
        explanation: "A una interacción solo puedes responder una vez con reply(). Si necesitas actualizar la respuesta, usa editReply(). Si quieres enviar más mensajes, usa followUp().",
        remember: "📌 reply() → primera respuesta | editReply() → actualizar | followUp() → mensaje adicional",
        goal: "Depurar errores de interacción",
        time: 75,
      },
      {
        mission: "Misión 6 · Opciones en Comandos",
        question: "¿Cómo se agrega una opción de tipo texto a un Slash Command?",
        fragment: "new SlashCommandBuilder()\n  .setName('saludo')\n  .setDescription('Saluda a alguien')\n  .________(option =>\n    option.setName('usuario')\n          .setDescription('¿A quién saludar?')\n          .setRequired(true)\n  )",
        hint: "El tipo de dato es 'String'.",
        options: [".addTextOption()", ".addStringOption()", ".addInputOption()", ".addMessageOption()"],
        correct: 1,
        explanation: "addStringOption() agrega una opción de texto. También existen addIntegerOption(), addUserOption(), addBooleanOption(), addChannelOption() etc., según el tipo de dato esperado.",
        remember: "📌 Accede al valor con: interaction.options.getString('usuario')",
        goal: "Agregar opciones a comandos",
        time: 60,
      },
      {
        mission: "Misión 7 · Registro de Comandos",
        question: "¿Cuándo deben registrarse los Slash Commands en Discord?",
        fragment: "// Comando de deploy separado (deploy-commands.js)\nconst rest = new REST().setToken(process.env.TOKEN);\nawait rest.put(Routes.applicationCommands(clientId), { body: commands });",
        hint: "No es en cada arranque del bot.",
        options: ["Cada vez que el bot inicia (en el evento ready)", "Solo una vez al crear el bot, o cuando se modifica el comando", "Cada vez que un usuario usa el comando", "Automáticamente sin necesidad de código"],
        correct: 1,
        explanation: "Los comandos deben registrarse solo cuando los creas o modificas. Registrarlos en cada arranque puede causar rate limiting. Usa un script deploy-commands.js separado.",
        remember: "📌 Comandos globales tardan hasta 1 hora en propagarse. Comandos de guild (GUILD_ID) son instantáneos.",
        goal: "Registrar comandos correctamente",
        time: 75,
      },
      {
        mission: "Misión 8 · Cierre Mundo 3",
        question: "¿Cuál de estos elementos NO forma parte de la definición básica de un Slash Command?",
        fragment: "module.exports = {\n  data: new SlashCommandBuilder()\n    .setName('ejemplo')\n    .setDescription('Ejemplo básico'),\n  async execute(interaction) { ... }\n};",
        hint: "Mira lo que tiene y lo que le falta.",
        options: ["setName()", "setDescription()", "execute()", "setPrefix()"],
        correct: 3,
        explanation: "Los Slash Commands no usan prefijos (como ! o ?). Eso era del sistema antiguo de comandos de texto. Los slash commands son reconocidos por Discord directamente con la barra /.",
        remember: "📌 El sistema de prefijos está obsoleto. Discord recomienda migrar todo a Slash Commands.",
        goal: "Consolidar conocimiento de comandos",
        time: 60,
      },
    ]
  },

  {
    id: 4,
    icon: "🎨",
    name: "Embeds y UI Rica",
    color: "#EB459E",
    desc: "Crea mensajes visuales con Embeds, Botones, Menús y Modales de Discord.",
    intro: "Los bots modernos no solo responden con texto plano. Discord ofrece componentes ricos: Embeds con colores e imágenes, Botones interactivos, Menús desplegables y Modales (formularios). Esto transforma la experiencia del usuario.",
    key: "Los MessageComponents (botones, menús) disparan el evento interactionCreate con interaction.isButton() o interaction.isStringSelectMenu(), permitiendo lógica dinámica sin nuevos slash commands.",
    concepts: [
      { icon: "🖼️", name: "EmbedBuilder", desc: "Construye mensajes enriquecidos con título, color, campos e imágenes." },
      { icon: "🔘", name: "ButtonBuilder", desc: "Agrega botones clicables con estilos y IDs personalizados." },
      { icon: "📋", name: "SelectMenu", desc: "Menú desplegable con múltiples opciones seleccionables." },
      { icon: "📝", name: "ModalBuilder", desc: "Formulario emergente para recopilar texto del usuario." },
    ],
    levels: [
      {
        mission: "Misión 1 · EmbedBuilder",
        question: "¿Qué método de EmbedBuilder define el color de la barra lateral del embed?",
        fragment: "const embed = new EmbedBuilder()\n  .setTitle('Hola Mundo')\n  ._______(0x5865F2)\n  .setDescription('Mi primer embed');",
        hint: "El método hace referencia explícita al 'color'.",
        options: [".setBackground()", ".setColor()", ".setStyle()", ".setBorderColor()"],
        correct: 1,
        explanation: "setColor() acepta un número hexadecimal (0x5865F2), un string de color ('#5865F2') o constantes como 'Blurple'. Define el color de la barra lateral izquierda del embed.",
        remember: "📌 Los colores se definen como hex: 0x57F287 (verde), 0xED4245 (rojo), 0xFEE75C (amarillo).",
        goal: "Crear embeds básicos",
        time: 60,
      },
      {
        mission: "Misión 2 · Campos del Embed",
        question: "¿Qué método agrega un campo de nombre y valor a un EmbedBuilder?",
        fragment: "const embed = new EmbedBuilder()\n  .setTitle('Estadísticas')\n  .______('Usuarios', '1,234', true)\n  .______('Servidores', '56', true);",
        hint: "Agrega (add) un campo (field).",
        options: [".addField()", ".addFields()", ".setField()", ".insertField()"],
        correct: 1,
        explanation: "En discord.js v14, el método es addFields() (en plural) y acepta un objeto {name, value, inline} o un array de ellos. El booleano 'true' al final indica que el campo es inline.",
        remember: "📌 addFields([{name:'A',value:'1'},{name:'B',value:'2'}]) para múltiples campos en una llamada.",
        goal: "Añadir campos a embeds",
        time: 60,
      },
      {
        mission: "Misión 3 · Botones",
        question: "¿Qué propiedad identifica de forma única a un botón para procesarlo en el evento interactionCreate?",
        fragment: "new ButtonBuilder()\n  .set_____('confirmar_accion')\n  .setLabel('✅ Confirmar')\n  .setStyle(ButtonStyle.Success)",
        hint: "Es como el 'nombre' del botón para el código.",
        options: [".setId()", ".setCustomId()", ".setName()", ".setKey()"],
        correct: 1,
        explanation: "setCustomId() asigna un identificador único al botón. En el handler: if(interaction.customId === 'confirmar_accion') { ... } Para distinguir qué botón pulsó el usuario.",
        remember: "📌 Los customId deben ser únicos por mensaje. Puedes incluir datos dinámicos: 'ban_' + userId",
        goal: "Implementar botones interactivos",
        time: 60,
      },
      {
        mission: "Misión 4 · ActionRow",
        question: "¿Por qué los botones y menús deben ir dentro de un ActionRowBuilder?",
        fragment: "const row = new ActionRowBuilder().addComponents(boton1, boton2);\nawait interaction.reply({ embeds: [embed], components: [row] });",
        hint: "Discord organiza los componentes en filas.",
        options: ["Porque ActionRow aplica el estilo CSS de Discord", "Porque Discord requiere que los componentes estén agrupados en filas", "Porque es la única forma de renderizar texto en botones", "ActionRow no es necesario, es solo convención"],
        correct: 1,
        explanation: "Discord organiza la UI en filas (ActionRows). Cada ActionRow puede contener hasta 5 botones o 1 menú. Un mensaje puede tener hasta 5 ActionRows.",
        remember: "📌 5 ActionRows × 5 botones = hasta 25 botones por mensaje. Con selectmenus, 1 por fila.",
        goal: "Usar ActionRowBuilder",
        time: 60,
      },
      {
        mission: "Misión 5 · Identificar Interacción",
        question: "¿Cómo verificas en el evento interactionCreate que la interacción viene de un botón?",
        fragment: "client.on('interactionCreate', async interaction => {\n  if (interaction.______()) {\n    // Es un botón\n  }\n});",
        hint: "Existe un método específico de verificación de tipo.",
        options: ["interaction.type === 'button'", "interaction.isButton()", "interaction.componentType === 'BUTTON'", "interaction.isComponent('button')"],
        correct: 1,
        explanation: "interaction.isButton() es el método idiomático de discord.js para verificar el tipo. También existen: isChatInputCommand(), isStringSelectMenu(), isModalSubmit(), etc.",
        remember: "📌 Siempre verifica el tipo antes de procesar la interacción para evitar errores inesperados.",
        goal: "Manejar tipos de interacción",
        time: 60,
      },
      {
        mission: "Misión 6 · Modales",
        question: "¿Cuál es el evento que debes escuchar para procesar el envío de un Modal (formulario)?",
        fragment: "client.on('interactionCreate', async interaction => {\n  if (interaction._____()) {\n    const texto = interaction.fields.getTextInputValue('mi_campo');\n  }\n});",
        hint: "El modal fue enviado (submitted).",
        options: ["isFormSubmit()", "isModalSubmit()", "isInputReceived()", "isDialogClose()"],
        correct: 1,
        explanation: "isModalSubmit() detecta cuando el usuario envió un modal. Los valores de los campos se acceden con interaction.fields.getTextInputValue('customId_del_campo').",
        remember: "📌 Muestra el modal con interaction.showModal(modal) desde un comando o botón.",
        goal: "Implementar formularios con modales",
        time: 75,
      },
      {
        mission: "Misión 7 · Diagnóstico Visual",
        question: "El embed de tu bot no muestra el footer ni el timestamp. ¿Qué métodos agregan esos elementos?",
        fragment: "const embed = new EmbedBuilder()\n  .setTitle('Reporte')\n  .setColor(0x5865F2)\n  // Falta footer y timestamp",
        hint: "Los métodos tienen nombres muy descriptivos en inglés.",
        options: [".setBottom() y .setDate()", ".setFooter() y .setTimestamp()", ".addFooter() y .addTime()", ".setCaption() y .setCreatedAt()"],
        correct: 1,
        explanation: "setFooter({text:'Texto', iconURL:'url'}) agrega el pie del embed. setTimestamp() agrega la fecha/hora actual automáticamente (o pasa un Date personalizado).",
        remember: "📌 setAuthor({name, iconURL, url}) agrega el autor en la parte superior del embed.",
        goal: "Completar embeds avanzados",
        time: 60,
      },
    ]
  },

  {
    id: 5,
    icon: "🗄️",
    name: "Base de Datos e Integración",
    color: "#ED4245",
    desc: "Persiste datos con JSON, SQLite o MongoDB y conecta APIs externas en tu bot.",
    intro: "Un bot útil necesita recordar información: configuraciones, puntos, advertencias, preferencias. La persistencia de datos transforma un bot simple en una herramienta poderosa. También aprenderás a consumir APIs externas.",
    key: "Para proyectos pequeños usa JSON o SQLite. Para proyectos con miles de usuarios, MongoDB o PostgreSQL son más escalables. La elección correcta depende del volumen de datos y la concurrencia.",
    concepts: [
      { icon: "📄", name: "JSON Storage", desc: "Almacenamiento simple en archivo .json para datos pequeños." },
      { icon: "🗃️", name: "SQLite", desc: "Base de datos relacional local, sin servidor, ideal para bots medianos." },
      { icon: "🍃", name: "MongoDB", desc: "Base de datos NoSQL, flexible y escalable para datos estructurados." },
      { icon: "🌐", name: "Fetch API", desc: "Consumo de APIs REST externas para datos dinámicos." },
    ],
    levels: [
      {
        mission: "Misión 1 · JSON Simple",
        question: "¿Por qué usar JSON como base de datos tiene limitaciones en bots con muchos usuarios?",
        fragment: "// Leer todo el archivo, modificar, reescribir completo\nconst data = JSON.parse(fs.readFileSync('data.json'));\ndata.users[userId] = { points: 100 };\nfs.writeFileSync('data.json', JSON.stringify(data));",
        hint: "Piensa en lo que pasa si 100 usuarios actúan al mismo tiempo.",
        options: ["JSON no soporta strings en sus valores", "No hay problemas, JSON escala perfectamente", "Las escrituras concurrentes pueden corromper el archivo", "JSON solo admite 100 registros"],
        correct: 2,
        explanation: "Si múltiples eventos intentan reescribir el JSON simultáneamente, los datos pueden corromperse. Además, leer/escribir todo el archivo para cada operación es muy ineficiente a escala.",
        remember: "📌 JSON está bien para config. Para datos de usuarios, prefiere SQLite o MongoDB.",
        goal: "Entender limitaciones del almacenamiento JSON",
        time: 60,
      },
      {
        mission: "Misión 2 · SQLite con better-sqlite3",
        question: "¿Cuál es la ventaja de better-sqlite3 sobre el módulo sqlite3 tradicional?",
        fragment: "// better-sqlite3: síncrono, más simple\nconst row = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);\n\n// sqlite3 tradicional: callbacks/Promises\ndb.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {});",
        hint: "Observa la diferencia en el estilo del código.",
        options: ["better-sqlite3 soporta más tipos de datos SQL", "better-sqlite3 es síncrono y más sencillo de usar sin callbacks", "better-sqlite3 incluye soporte para PostgreSQL", "No hay diferencia real entre ambos módulos"],
        correct: 1,
        explanation: "better-sqlite3 opera de forma síncrona (bloqueante), lo que simplifica enormemente el código al no necesitar callbacks ni async/await para cada consulta.",
        remember: "📌 npm install better-sqlite3 → const db = require('better-sqlite3')('bot.db')",
        goal: "Elegir el módulo correcto para SQLite",
        time: 75,
      },
      {
        mission: "Misión 3 · Consumir API Externa",
        question: "¿Qué función moderna de Node.js 18+ permite hacer peticiones HTTP sin instalar paquetes adicionales?",
        fragment: "const res = await ____('https://api.example.com/data');\nconst json = await res.json();\nconsole.log(json);",
        hint: "Es el mismo nombre que la API del navegador.",
        options: ["http.get()", "axios()", "fetch()", "request()"],
        correct: 2,
        explanation: "Desde Node.js 18, fetch() está disponible de forma nativa, igual que en el navegador. Para versiones anteriores se usaba node-fetch o axios.",
        remember: "📌 Siempre maneja errores: try/catch o .catch() en las peticiones fetch.",
        goal: "Consumir APIs con fetch()",
        time: 60,
      },
      {
        mission: "Misión 4 · MongoDB con Mongoose",
        question: "¿Para qué sirve un Schema de Mongoose al usar MongoDB?",
        fragment: "const userSchema = new mongoose.Schema({\n  userId: String,\n  guild: String,\n  points: { type: Number, default: 0 },\n  warnings: [String]\n});",
        hint: "Piensa en estructura y validación.",
        options: ["Para definir la estructura y tipos de datos de un documento", "Para conectarse al servidor de MongoDB", "Para hacer consultas SQL en MongoDB", "Para encriptar los datos automáticamente"],
        correct: 0,
        explanation: "Un Schema define la estructura esperada de los documentos: qué campos existen, sus tipos, valores por defecto y validaciones. Mongoose usa el Schema para crear el Model.",
        remember: "📌 Schema → Model → Model.find() / Model.save() para CRUD completo.",
        goal: "Usar Mongoose con MongoDB",
        time: 75,
      },
      {
        mission: "Misión 5 · Cooldowns",
        question: "¿Por qué es importante implementar cooldowns en los comandos del bot?",
        fragment: "const cooldowns = new Map();\n// Si el usuario usó el comando hace menos de 5s → rechazar\nif (cooldowns.has(userId) && Date.now() - cooldowns.get(userId) < 5000) {\n  return interaction.reply({ content: 'Espera 5 segundos', ephemeral: true });\n}",
        hint: "Piensa en usuarios malintencionados.",
        options: ["Para mejorar la calidad visual del bot", "Para evitar spam y proteger el rate limit de la API de Discord", "Porque Discord lo requiere obligatoriamente", "Para reducir el uso de memoria RAM"],
        correct: 1,
        explanation: "Sin cooldowns, usuarios pueden spamear comandos causando rate limiting por parte de Discord (ban temporal del bot) y posibles abusos. Los cooldowns protegen tanto al bot como a la API.",
        remember: "📌 La API de Discord tiene rate limits: máximo 50 peticiones por segundo por bot.",
        goal: "Implementar protección anti-spam",
        time: 60,
      },
      {
        mission: "Misión 6 · Variables de Entorno en Producción",
        question: "Al desplegar tu bot en un servidor de producción (Heroku, Railway, VPS), ¿cómo se manejan las variables de entorno?",
        fragment: "// En local: archivo .env\n// En producción: ????",
        hint: "No puedes subir el .env a producción.",
        options: ["Hardcodeando el token directamente en el código", "Usando las variables de entorno del panel de configuración del hosting", "Enviando el .env por email al servidor", "El bot no funciona sin .env local"],
        correct: 1,
        explanation: "Plataformas como Railway, Heroku o Render tienen paneles donde configuras las variables de entorno de forma segura. process.env.TOKEN funciona igual que con el .env local.",
        remember: "📌 Nunca hardcodees credenciales. En VPS, usa pm2 ecosystem.config.js con env vars.",
        goal: "Desplegar bots de forma segura",
        time: 60,
      },
      {
        mission: "Misión 7 · Análisis de Falla",
        question: "Tu bot falla con 'MongoServerError: bad auth'. ¿Cuál es la causa más probable?",
        fragment: "mongoose.connect(process.env.MONGO_URI)\n  .catch(err => console.error('Error MongoDB:', err));",
        hint: "El error dice 'bad auth'.",
        options: ["El servidor de MongoDB está offline", "La URI de conexión tiene usuario/contraseña incorrectos", "La colección no existe en la base de datos", "Mongoose no es compatible con MongoDB Atlas"],
        correct: 1,
        explanation: "MongoServerError bad auth significa que las credenciales en la URI de conexión son incorrectas. Verifica usuario, contraseña y el nombre de la base de datos en la URI de Atlas.",
        remember: "📌 URI correcta: mongodb+srv://user:password@cluster.mongodb.net/dbname",
        goal: "Diagnosticar errores de MongoDB",
        time: 60,
      },
    ]
  },

  {
    id: 6,
    icon: "🚀",
    name: "Despliegue y Buenas Prácticas",
    color: "#57F287",
    desc: "Despliega tu bot 24/7, maneja errores, logs y aplica estándares de producción.",
    intro: "Un bot en producción debe ser robusto, estar siempre activo y manejarse con seguridad. Aprenderás sobre hosting, manejo de errores global, logging y las mejores prácticas que separan un bot amateur de uno profesional.",
    key: "Un bot en producción nunca debería caerse por errores no manejados. El evento 'unhandledRejection' de Node.js captura todas las promesas rechazadas sin catch, evitando crashes inesperados.",
    concepts: [
      { icon: "🖥️", name: "PM2", desc: "Process manager que mantiene tu bot corriendo y lo reinicia si falla." },
      { icon: "☁️", name: "Cloud Hosting", desc: "Railway, Render, Heroku o VPS para bot 24/7." },
      { icon: "📊", name: "Logging", desc: "Registro de eventos y errores para monitoreo y debugging." },
      { icon: "🛡️", name: "Error Handling", desc: "Captura global de errores para evitar crashes del proceso." },
    ],
    levels: [
      {
        mission: "Misión 1 · PM2",
        question: "¿Cuál es la ventaja principal de usar PM2 para ejecutar tu bot?",
        fragment: "$ pm2 start index.js --name mi-bot\n$ pm2 logs mi-bot\n$ pm2 restart mi-bot\n$ pm2 startup  # Auto-inicio al reiniciar el servidor",
        hint: "Piensa en qué pasa si el bot se cuelga a las 3am.",
        options: ["PM2 escribe el código del bot automáticamente", "PM2 reinicia el bot automáticamente si falla y persiste entre reinicios", "PM2 gestiona la base de datos del bot", "PM2 es obligatorio para usar discord.js"],
        correct: 1,
        explanation: "PM2 actúa como guardián del proceso: si el bot crashea, PM2 lo reinicia automáticamente. Con pm2 startup, el bot vuelve a arrancar incluso si el servidor se reinicia.",
        remember: "📌 pm2 logs --lines 100 muestra los últimos 100 logs. pm2 monit para panel en tiempo real.",
        goal: "Usar PM2 en producción",
        time: 60,
      },
      {
        mission: "Misión 2 · Manejo Global de Errores",
        question: "¿Qué evento de Node.js captura las Promesas rechazadas que no tienen .catch()?",
        fragment: "process.on('________', (reason, promise) => {\n  console.error('Promesa rechazada sin manejar:', reason);\n});",
        hint: "El nombre describe exactamente lo que hace: promesa sin manejar que fue rechazada.",
        options: ["uncaughtException", "unhandledRejection", "promiseError", "asyncFail"],
        correct: 1,
        explanation: "unhandledRejection captura todas las promesas rechazadas sin .catch(). Sin esto, en versiones antiguas de Node.js el proceso podría crashear silenciosamente.",
        remember: "📌 También usa uncaughtException para errores síncronos, pero siempre registra y reinicia el proceso.",
        goal: "Implementar error handling global",
        time: 60,
      },
      {
        mission: "Misión 3 · Rate Limits",
        question: "Tu bot empieza a recibir errores 429 de Discord. ¿Qué significa y cómo se previene?",
        fragment: "DiscordAPIError[20016]: You are being rate limited.\nHTTP Status: 429\nRetry-After: 2.5s",
        hint: "El código 429 en HTTP significa 'Too Many Requests'.",
        options: ["El bot superó el límite de usuarios permitidos", "El bot está haciendo demasiadas peticiones en poco tiempo", "El token del bot venció", "El servidor de Discord está saturado"],
        correct: 1,
        explanation: "El error 429 significa que el bot excedió los rate limits de la API de Discord. discord.js maneja esto automáticamente con reintentos, pero debes evitar bucles de peticiones masivas.",
        remember: "📌 Usa Queue o throttle para operaciones masivas. No hagas miles de peticiones en segundos.",
        goal: "Entender y prevenir rate limiting",
        time: 60,
      },
      {
        mission: "Misión 4 · Logging Profesional",
        question: "¿Por qué es mejor usar una librería de logging como Winston en lugar de console.log()?",
        fragment: "// console.log: solo terminal, sin persistencia\nconsole.log('Bot iniciado');\n\n// Winston: niveles, archivos, timestamps automáticos\nlogger.info('Bot iniciado');\nlogger.error('Fallo en comando', { error, userId });",
        hint: "Piensa en revisar errores de hace 3 días.",
        options: ["console.log no funciona en Node.js", "Winston permite niveles de log, persistencia en archivos y formatos estructurados", "Winston es más rápido que console.log en un 50%", "No hay diferencia, console.log es suficiente"],
        correct: 1,
        explanation: "Winston ofrece niveles (error, warn, info, debug), escribe logs en archivos persistentes, permite formatos JSON para análisis y puede enviar alertas a servicios externos.",
        remember: "📌 npm install winston → logs en error.log y combined.log para revisión posterior.",
        goal: "Implementar logging profesional",
        time: 60,
      },
      {
        mission: "Misión 5 · Permisos del Bot",
        question: "Al invitar tu bot al servidor, ¿dónde se definen los permisos que tendrá?",
        fragment: "https://discord.com/api/oauth2/authorize\n?client_id=TU_ID\n&permissions=_____\n&scope=bot+applications.commands",
        hint: "Se usa durante la invitación con OAuth2.",
        options: ["En el archivo config.json del bot", "En el parámetro 'permissions' de la URL de invitación OAuth2", "Editando directamente la base de datos de Discord", "Los bots siempre tienen todos los permisos"],
        correct: 1,
        explanation: "Los permisos del bot se calculan como un número bitfield y se incluyen en la URL de OAuth2. Herramientas como el Discord Permissions Calculator ayudan a generar este número.",
        remember: "📌 Usa el scope 'applications.commands' para habilitar Slash Commands en el servidor.",
        goal: "Configurar permisos del bot",
        time: 60,
      },
      {
        mission: "Misión 6 · ShardingManager",
        question: "¿Cuándo necesita un bot de Discord implementar Sharding?",
        fragment: "const manager = new ShardingManager('./index.js', {\n  token: process.env.TOKEN\n});\nmanager.spawn();",
        hint: "Hay un límite específico de servidores.",
        options: ["Cuando el bot tiene más de 100 comandos slash", "Cuando el bot supera los 2,500 servidores", "Cuando el bot usa MongoDB en lugar de SQLite", "El sharding es siempre necesario desde el inicio"],
        correct: 1,
        explanation: "Discord requiere Sharding cuando el bot supera los 2,500 servidores. Cada Shard es un proceso independiente que gestiona una fracción de los guilds del bot.",
        remember: "📌 discord.js incluye ShardingManager nativo. Para bots muy grandes existe discord-hybrid-sharding.",
        goal: "Conocer el concepto de Sharding",
        time: 60,
      },
      {
        mission: "Misión 7 · Checklist de Producción",
        question: "¿Cuál de estos elementos NO debe estar en el código de producción de un bot?",
        fragment: "// Revisión antes de desplegar:\n☑ Token en variable de entorno\n☑ .env en .gitignore\n☑ Manejo de errores global\n☐ _______",
        hint: "Busca la práctica de desarrollo que no debe estar en producción.",
        options: ["Manejo de rate limits", "console.log con información sensible del usuario", "Logs persistentes en archivo", "Cooldowns en comandos"],
        correct: 1,
        explanation: "Los console.log con información sensible (tokens, datos privados de usuarios) son una vulnerabilidad de seguridad. En producción, usa loggers con niveles apropiados y nunca expongas datos privados.",
        remember: "📌 GDPR/LOPD: registrar datos personales de usuarios sin consentimiento puede ser ilegal.",
        goal: "Aplicar checklist de producción",
        time: 60,
      },
      {
        mission: "Misión 8 · Quiz Final – Maestro del Bot",
        question: "Un usuario reporta que el bot responde con un error genérico. Para depurarlo, ¿cuál es el primer paso?",
        fragment: "// El usuario ve: 'Hubo un error inesperado'\n// Tú necesitas ver el error real...",
        hint: "Los errores están guardados en algún lugar.",
        options: ["Reinvitar al bot al servidor", "Revisar los logs del bot (pm2 logs o archivo de log)", "Regenerar el token del bot", "Reinstalar discord.js desde cero"],
        correct: 1,
        explanation: "Los logs son la primera fuente de información para depurar. pm2 logs muestra los últimos eventos, y si tienes Winston configurado, tendrás el stack trace completo del error.",
        remember: "📌 Un buen sistema de logging es la diferencia entre depurar en 5 minutos o en 5 horas.",
        goal: "Aplicar metodología de debugging",
        time: 75,
      },
    ]
  },
];

/* ═══════════════════════════════════════════
   ░░  ICONOS AMBIENTALES  ░░
   ═══════════════════════════════════════════ */
const AMBIENT_ICONS = ["⚙️","💻","🤖","🔧","📡","⚡","🖥️","💾","🔌","📦","🌐","🔑","🛠️","📋","🗄️","🔒","🚀","💡"];

/* ═══════════════════════════════════════════
   ░░  ESTADO GLOBAL  ░░
   ═══════════════════════════════════════════ */
let state = {
  soundOn: true,
  theme: 'dark',
  currentWorld: null,
  currentLevelIndex: 0,
  score: 0,
  lives: 3,
  timerInterval: null,
  timerSeconds: 60,
  timerMax: 60,
  answered: false,
};

let audioCtx = null;

/* ═══════════════════════════════════════════
   ░░  AUDIO (Web Audio API)  ░░
   ═══════════════════════════════════════════ */
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(freq, type, duration, volume = 0.2, delay = 0) {
  if (!state.soundOn) return;
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  } catch(e) {}
}

const SFX = {
  start: () => { playTone(440, 'sine', .15, .15); playTone(554, 'sine', .15, .12, .15); playTone(659, 'sine', .25, .1, .3); },
  select: () => { playTone(300, 'triangle', .08, .12); },
  correct: () => { playTone(523, 'sine', .12, .15); playTone(659, 'sine', .12, .12, .12); playTone(784, 'sine', .2, .1, .24); },
  wrong: () => { playTone(220, 'sawtooth', .1, .15); playTone(185, 'sawtooth', .2, .12, .12); },
  alert: () => { playTone(880, 'square', .06, .08); playTone(880, 'square', .06, .08, .12); },
  worldDone: () => {
    [523,659,784,1047].forEach((f,i) => playTone(f, 'sine', .2, .1, i*.12));
  },
};

/* ═══════════════════════════════════════════
   ░░  CONFETTI  ░░
   ═══════════════════════════════════════════ */
const canvas = document.getElementById('confettiCanvas');
const ctx2d = canvas.getContext('2d');
let confettiPieces = [];
let confettiAnim = null;

function startConfetti() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  confettiPieces = Array.from({length: 90}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -200,
    r: Math.random() * 8 + 4,
    d: Math.random() + 1,
    color: ['#5865F2','#57F287','#FEE75C','#ED4245','#EB459E','#fff'][Math.floor(Math.random()*6)],
    tilt: Math.random() * 10 - 10,
    tiltSpeed: Math.random() * 0.1 + 0.05,
    speed: Math.random() * 3 + 1,
  }));
  if (confettiAnim) cancelAnimationFrame(confettiAnim);
  drawConfetti();
  setTimeout(stopConfetti, 3000);
}

function drawConfetti() {
  ctx2d.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach(p => {
    ctx2d.beginPath();
    ctx2d.ellipse(p.x, p.y, p.r, p.r / 2, p.tilt, 0, 2 * Math.PI);
    ctx2d.fillStyle = p.color;
    ctx2d.fill();
    p.y += p.speed;
    p.tilt += p.tiltSpeed;
    p.x += Math.sin(p.tilt) * .5;
  });
  confettiPieces = confettiPieces.filter(p => p.y < canvas.height + 20);
  if (confettiPieces.length) confettiAnim = requestAnimationFrame(drawConfetti);
}

function stopConfetti() {
  if (confettiAnim) cancelAnimationFrame(confettiAnim);
  ctx2d.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces = [];
}

/* ═══════════════════════════════════════════
   ░░  AMBIENT ICONS  ░░
   ═══════════════════════════════════════════ */
function buildAmbient() {
  const layer = document.getElementById('ambientLayer');
  layer.innerHTML = '';
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('span');
    el.className = 'ambient-icon';
    el.textContent = AMBIENT_ICONS[i % AMBIENT_ICONS.length];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (20 + Math.random() * 30) + 's';
    el.style.animationDelay = -(Math.random() * 30) + 's';
    el.style.fontSize = (1.2 + Math.random() * 2) + 'rem';
    layer.appendChild(el);
  }
}

/* ═══════════════════════════════════════════
   ░░  THEME & SOUND TOGGLE  ░░
   ═══════════════════════════════════════════ */
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  document.getElementById('btnTheme').textContent = state.theme === 'dark' ? '🌙' : '☀️';
}

function toggleSound(btn) {
  state.soundOn = !state.soundOn;
  btn.textContent = state.soundOn ? '🔊' : '🔇';
  document.getElementById('btnGameSound').textContent = btn.textContent;
}

/* ═══════════════════════════════════════════
   ░░  SCREEN MANAGEMENT  ░░
   ═══════════════════════════════════════════ */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

/* ═══════════════════════════════════════════
   ░░  HOME SCREEN  ░░
   ═══════════════════════════════════════════ */
function buildHome() {
  const grid = document.getElementById('worldsGrid');
  grid.innerHTML = '';
  WORLDS.forEach(w => {
    const card = document.createElement('div');
    card.className = 'world-card';
    card.style.setProperty('--accent-local', w.color);
    card.innerHTML = `
      <span class="world-icon">${w.icon}</span>
      <div class="world-num">Mundo ${w.id}</div>
      <div class="world-name">${w.name}</div>
      <div class="world-desc">${w.desc}</div>
      <div class="world-levels-badge">🎮 ${w.levels.length} niveles</div>
    `;
    card.addEventListener('click', () => openLesson(w));
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════
   ░░  LESSON SCREEN  ░░
   ═══════════════════════════════════════════ */
function openLesson(world) {
  SFX.start();
  state.currentWorld = world;
  state.currentLevelIndex = 0;
  state.score = 0;
  state.lives = 3;

  document.getElementById('lessonBadge').textContent = world.icon;
  document.getElementById('lessonTitle').textContent = `Mundo ${world.id}: ${world.name}`;
  document.getElementById('lessonIntro').textContent = world.intro;
  document.getElementById('lessonKeyText').textContent = world.key;

  const grid = document.getElementById('conceptsGrid');
  grid.innerHTML = '';
  world.concepts.forEach(c => {
    const chip = document.createElement('div');
    chip.className = 'concept-chip';
    chip.innerHTML = `<div class="c-icon">${c.icon}</div><div class="c-name">${c.name}</div><div class="c-desc">${c.desc}</div>`;
    grid.appendChild(chip);
  });

  showScreen('screenLesson');
}

/* ═══════════════════════════════════════════
   ░░  GAME SCREEN  ░░
   ═══════════════════════════════════════════ */
function startGame() {
  showScreen('screenGame');
  loadLevel();
}

function loadLevel() {
  const world = state.currentWorld;
  const lvl = world.levels[state.currentLevelIndex];
  state.answered = false;

  // Topbar
  document.getElementById('gameWorldLabel').textContent = `${world.icon} Mundo ${world.id}`;
  document.getElementById('gameLevelLabel').textContent = `Nivel ${state.currentLevelIndex + 1} / ${world.levels.length}`;

  // Progress
  const pct = (state.currentLevelIndex / world.levels.length) * 100;
  document.getElementById('progressFill').style.width = pct + '%';

  // HUD
  updateHUD();

  // Card
  document.getElementById('missionTag').textContent = lvl.mission;
  document.getElementById('gameQuestion').textContent = lvl.question;
  document.getElementById('gameFragment').textContent = lvl.fragment;
  document.getElementById('hintText').textContent = lvl.hint;

  // Options
  const grid = document.getElementById('optionsGrid');
  grid.innerHTML = '';
  const letters = ['A','B','C','D'];
  lvl.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="opt-letter">${letters[i]}</span>${opt}`;
    btn.addEventListener('click', () => { SFX.select(); selectAnswer(i, btn); });
    grid.appendChild(btn);
  });

  // Timer
  clearInterval(state.timerInterval);
  state.timerSeconds = lvl.time || 60;
  state.timerMax = state.timerSeconds;
  updateTimerUI();
  state.timerInterval = setInterval(tickTimer, 1000);
}

function tickTimer() {
  state.timerSeconds--;
  updateTimerUI();
  if (state.timerSeconds <= 10) {
    SFX.alert();
    document.getElementById('timerDisplay').classList.add('urgent');
    document.getElementById('timerFill').classList.add('urgent');
  }
  if (state.timerSeconds <= 0) {
    clearInterval(state.timerInterval);
    if (!state.answered) {
      state.lives--;
      updateHUD();
      showFeedback(false, '⏰ Tiempo agotado', 'No respondiste a tiempo. Has perdido una vida.', state.currentWorld.levels[state.currentLevelIndex].remember, true);
    }
  }
}

function updateTimerUI() {
  const pct = (state.timerSeconds / state.timerMax) * 100;
  document.getElementById('timerFill').style.width = pct + '%';
  document.getElementById('timerDisplay').textContent = state.timerSeconds;
  if (state.timerSeconds > 10) {
    document.getElementById('timerDisplay').classList.remove('urgent');
    document.getElementById('timerFill').classList.remove('urgent');
  }
}

function updateHUD() {
  document.getElementById('scoreDisplay').textContent = state.score;
  const livesEl = document.getElementById('livesDisplay');
  livesEl.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const heart = document.createElement('span');
    heart.textContent = i < state.lives ? '❤️' : '🖤';
    livesEl.appendChild(heart);
  }
}

function selectAnswer(idx, btn) {
  if (state.answered) return;
  state.answered = true;
  clearInterval(state.timerInterval);

  const lvl = state.currentWorld.levels[state.currentLevelIndex];
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);
  allBtns[lvl.correct].classList.add('correct');

  if (idx === lvl.correct) {
    const timeBonus = Math.floor(state.timerSeconds * 1.5);
    state.score += 100 + timeBonus;
    btn.classList.add('correct');
    SFX.correct();
    startConfetti();
    showFeedback(true, '✅ ¡Correcto!', lvl.explanation, lvl.remember, false);
  } else {
    btn.classList.add('wrong');
    state.lives--;
    SFX.wrong();
    updateHUD();
    showFeedback(false, '❌ Incorrecto', lvl.explanation, lvl.remember, false);
  }
}

/* ═══════════════════════════════════════════
   ░░  FEEDBACK MODAL  ░░
   ═══════════════════════════════════════════ */
function showFeedback(correct, title, body, remember, timeOut) {
  const modal = document.getElementById('feedbackModal');
  const card = document.getElementById('modalCard');

  document.getElementById('modalEmoji').textContent = correct ? '🎉' : (timeOut ? '⏰' : '💡');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').textContent = body;
  document.getElementById('modalRemember').textContent = remember || '';

  card.className = 'modal-card ' + (correct ? 'correct-modal' : 'wrong-modal');

  const isLast = state.currentLevelIndex >= state.currentWorld.levels.length - 1;
  const isDead = state.lives <= 0;
  const btnNext = document.getElementById('btnModalNext');

  if (isDead) {
    btnNext.textContent = '💀 Sin vidas — Reintentar mundo';
  } else if (isLast) {
    btnNext.textContent = '🏆 ¡Completar Mundo!';
  } else {
    btnNext.textContent = '→ Siguiente nivel';
  }

  modal.classList.remove('hidden');
}

document.getElementById('btnModalNext').addEventListener('click', () => {
  document.getElementById('feedbackModal').classList.add('hidden');
  stopConfetti();

  if (state.lives <= 0) {
    // Reiniciar mundo
    state.lives = 3;
    state.score = 0;
    state.currentLevelIndex = 0;
    loadLevel();
    return;
  }

  state.currentLevelIndex++;

  if (state.currentLevelIndex >= state.currentWorld.levels.length) {
    // Mundo completado
    SFX.worldDone();
    startConfetti();
    document.getElementById('worldDoneMsg').textContent =
      `¡Completaste "${state.currentWorld.name}" con ${state.score} puntos! 🚀`;
    document.getElementById('worldDoneModal').classList.remove('hidden');
  } else {
    loadLevel();
  }
});

document.getElementById('btnWorldDone').addEventListener('click', () => {
  document.getElementById('worldDoneModal').classList.add('hidden');
  stopConfetti();
  clearInterval(state.timerInterval);
  showScreen('screenHome');
});

/* ═══════════════════════════════════════════
   ░░  NAVIGATION BUTTONS  ░░
   ═══════════════════════════════════════════ */
document.getElementById('btnLessonBack').addEventListener('click', () => showScreen('screenHome'));
document.getElementById('btnStartWorld').addEventListener('click', startGame);
document.getElementById('btnGameHome').addEventListener('click', () => {
  clearInterval(state.timerInterval);
  showScreen('screenHome');
});

document.getElementById('btnTheme').addEventListener('click', toggleTheme);
document.getElementById('btnSound').addEventListener('click', function() { toggleSound(this); });
document.getElementById('btnGameSound').addEventListener('click', function() {
  state.soundOn = !state.soundOn;
  this.textContent = state.soundOn ? '🔊' : '🔇';
  document.getElementById('btnSound').textContent = this.textContent;
});

/* ═══════════════════════════════════════════
   ░░  INIT  ░░
   ═══════════════════════════════════════════ */
function init() {
  buildAmbient();
  buildHome();
  showScreen('screenHome');
}

init();
