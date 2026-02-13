//© Zero - Código libre no comercial

// ===============================
// Cargar el SVG y animar corazones
// ===============================
fetch('Img/treelove.svg')
  .then(res => res.text())
  .then(svgText => {
    const container = document.getElementById('tree-container');
    container.innerHTML = svgText;
    const svg = container.querySelector('svg');
    if (!svg) return;

    const allPaths = Array.from(svg.querySelectorAll('path'));

    allPaths.forEach(path => {
      path.style.stroke = '#222';
      path.style.strokeWidth = '2.5';
      path.style.fillOpacity = '0';
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = 'none';
    });

    setTimeout(() => {
      allPaths.forEach((path, i) => {
        path.style.transition =
          `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i * 0.08}s,
           fill-opacity 0.5s ${0.9 + i * 0.08}s`;
        path.style.strokeDashoffset = 0;

        setTimeout(() => {
          path.style.fillOpacity = '1';
          path.style.stroke = '';
          path.style.strokeWidth = '';
        }, 1200 + i * 80);
      });

      const totalDuration = 1200 + (allPaths.length - 1) * 80 + 500;

      setTimeout(() => {
        svg.classList.add('move-and-scale');

        setTimeout(() => {
          showDedicationText();
          startFloatingObjects();
          showCountdown();
        }, 1200);

      }, totalDuration);

    }, 50);
  });


// ===============================
// Utilidad parámetros URL
// ===============================
function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}


// ===============================
// Texto máquina de escribir
// ===============================
function showDedicationText() {
  let text = getURLParam('text');

  if (!text) {
    text = `Para la persona más importante en mi mundo:\n\nNunca llegue a pensar que podria llegar a querer tanto a alguien. Tu risa, tu voz, tu forma de ser conmigo… todo en ti me hace sentir feliz, me hace sentir que por primera vez alguien me quiere.\n\nGracias por permitirme ser parte de tu vida, por alegrarme mis dias, y por ser la lucesita que ilumina mis dias.\n\nTe quiero más de lo que las palabras pueden expresar.`;
  } else {
    text = decodeURIComponent(text).replace(/\\n/g, '\n');
  }

  const container = document.getElementById('dedication-text');
  container.classList.add('typing');

  let i = 0;

  function type() {
    if (i <= text.length) {
      container.textContent = text.slice(0, i);
      i++;
      setTimeout(type, text[i - 2] === '\n' ? 350 : 45);
    } else {
      setTimeout(showSignature, 600);
    }
  }

  type();
}


// ===============================
// Firma animada
// ===============================
function showSignature() {
  const dedication = document.getElementById('dedication-text');

  let signature = dedication.querySelector('#signature');
  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }

  let firma = getURLParam('firma');
  signature.textContent = firma ? decodeURIComponent(firma) : "Con cariño, Cardo";
  signature.classList.add('visible');
}


// ===============================
// Objetos flotantes
// ===============================
function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  let count = 0;

  function spawn() {
    let el = document.createElement('div');
    el.className = 'floating-petal';
    el.style.left = `${Math.random() * 90 + 2}%`;
    el.style.top = `${100 + Math.random() * 10}%`;
    el.style.opacity = 0.7 + Math.random() * 0.3;

    container.appendChild(el);

    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 60;

    setTimeout(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
      el.style.transform =
        `translate(${drift}px, -110vh)
         scale(${0.8 + Math.random() * 0.6})
         rotate(${Math.random() * 360}deg)`;
      el.style.opacity = 0.2;
    }, 30);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, duration + 2000);

    if (count++ < 32)
      setTimeout(spawn, 350 + Math.random() * 500);
    else
      setTimeout(spawn, 1200 + Math.random() * 1200);
  }

  spawn();
}


// ===============================
// Cuenta regresiva
// ===============================
function showCountdown() {
  const container = document.getElementById('countdown');

  let startDate = new Date('2025-11-13T00:00:00');
  let eventDate = new Date('2026-11-13T00:00:00');

  function update() {
    const now = new Date();

    let days = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    let diff = eventDate - now;

    let eventDays = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    let eventHours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
    let eventMinutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
    let eventSeconds = Math.max(0, Math.floor((diff / 1000) % 60));

    container.innerHTML =
      `Dias de amistad: <b>${days}</b> días<br>
       Para un año de amigos:
       <b>${eventDays}d ${eventHours}h ${eventMinutes}m ${eventSeconds}s</b>`;

    container.classList.add('visible');
  }

  update();
  setInterval(update, 1000);
}


// ===============================
// 🎵 MÚSICA (VERSIÓN DEFINITIVA)
// ===============================
function setupMusicSystem() {

  const audio = document.getElementById('bg-music');
  if (!audio) return;

  audio.volume = 0.7;
  audio.loop = true;

  // Crear botón
  let btn = document.createElement('button');
  btn.id = 'music-btn';
  btn.textContent = '🔊 Música';
  btn.style.position = 'fixed';
  btn.style.bottom = '18px';
  btn.style.right = '18px';
  btn.style.zIndex = 99;
  btn.style.background = 'rgba(255,255,255,0.85)';
  btn.style.border = 'none';
  btn.style.borderRadius = '24px';
  btn.style.padding = '10px 18px';
  btn.style.fontSize = '1.1em';
  btn.style.cursor = 'pointer';

  document.body.appendChild(btn);

  btn.onclick = () => {
    if (audio.paused) {
      audio.play();
      btn.textContent = '🔊 Música';
    } else {
      audio.pause();
      btn.textContent = '🔈 Música';
    }
  };

  // Activar música en el primer clic del usuario
  document.addEventListener('click', function activarMusica() {
    if (audio.paused) {
      audio.play().catch(() => {});
    }
    document.removeEventListener('click', activarMusica);
  });
}


// Inicializar sistema de música al cargar
window.addEventListener('DOMContentLoaded', setupMusicSystem);

