/**
 * PARIS MAGIC PLAN — JAVASCRIPT PURO (VANILLA JS)
 * Gestión de navegación, submenú desplegable, menú móvil, acordeones FAQ,
 * modales interactivos, validación de formularios y animaciones al hacer scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. HEADER SCROLL & NAVEGACIÓN DESKTOP / MÓVIL
     ========================================================================== */
  const siteHeader = document.getElementById('site-header');
  const navDropdown = document.getElementById('nav-dropdown-disneyland');
  const navDropdownTrigger = document.getElementById('nav-dropdown-trigger');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileSubTrigger = document.getElementById('mobile-sub-trigger');
  const mobileSubmenu = document.getElementById('mobile-submenu');
  const iconMenuOpen = document.getElementById('icon-menu-open');
  const iconMenuClose = document.getElementById('icon-menu-close');

  const handleScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 16) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Submenú Desktop Disneyland Paris
  const setDesktopDropdown = (open) => {
    if (!navDropdown || !navDropdownTrigger) return;
    navDropdown.classList.toggle('is-open', open);
    navDropdownTrigger.setAttribute('aria-expanded', String(open));
  };

  if (navDropdown && navDropdownTrigger) {
    navDropdown.addEventListener('mouseenter', () => setDesktopDropdown(true));
    navDropdown.addEventListener('mouseleave', () => setDesktopDropdown(false));
    navDropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navDropdown.classList.contains('is-open');
      setDesktopDropdown(!isOpen);
    });
  }

  // Menú Móvil / Tablet
  const setMobileMenu = (open) => {
    if (!mobileDrawer || !mobileMenuBtn) return;
    mobileDrawer.classList.toggle('is-open', open);
    mobileMenuBtn.setAttribute('aria-expanded', String(open));
    mobileMenuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (iconMenuOpen && iconMenuClose) {
      iconMenuOpen.style.display = open ? 'none' : 'block';
      iconMenuClose.style.display = open ? 'block' : 'none';
    }
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('is-open');
      setMobileMenu(!isOpen);
    });
  }

  if (mobileSubTrigger && mobileSubmenu) {
    mobileSubTrigger.addEventListener('click', () => {
      const isOpen = mobileSubmenu.classList.contains('is-open');
      mobileSubmenu.classList.toggle('is-open', !isOpen);
      mobileSubTrigger.setAttribute('aria-expanded', String(!isOpen));
      const chevron = mobileSubTrigger.querySelector('.nav-dropdown__icon');
      if (chevron) {
        chevron.style.transform = !isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  }

  // Cerrar menú móvil al hacer clic en enlaces de ancla internos
  document.querySelectorAll('[data-close-mobile]').forEach((link) => {
    link.addEventListener('click', () => {
      setMobileMenu(false);
      setDesktopDropdown(false);
    });
  });

  // Cerrar dropdown al hacer clic fuera
  document.addEventListener('mousedown', (e) => {
    if (navDropdown && !navDropdown.contains(e.target)) {
      setDesktopDropdown(false);
    }
  });

  /* ==========================================================================
     2. ACORDEONES DE PREGUNTAS FRECUENTES (FAQ)
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-item__trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isCurrentlyOpen = item.classList.contains('is-open');

      // Cerrar otros acordeones y alternar el actual
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove('is-open');
        const otherTrigger = otherItem.querySelector('.faq-item__trigger');
        if (otherTrigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (!isCurrentlyOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ==========================================================================
     3. MODALES INTERACTIVOS (PLANIFICACIÓN / CONTACTO, SUBMENÚ E INFO)
     ========================================================================== */
  const modalPlanning = document.getElementById('modal-planning');
  const modalPlanningTitle = document.getElementById('modal-planning-title');
  const modalPlanningIntro = document.getElementById('modal-planning-intro');
  const tabBtnPlan = document.getElementById('tab-btn-plan');
  const tabBtnQuestion = document.getElementById('tab-btn-question');
  const planExtraFields = document.getElementById('plan-extra-fields');
  const questionExtraFields = document.getElementById('question-extra-fields');
  const labelMessage = document.getElementById('label-pmp-message');
  const submitBtnLabel = document.getElementById('submit-btn-label');

  const planningForm = document.getElementById('pmp-planning-form');
  const planningSuccess = document.getElementById('modal-planning-success');
  const formErrorBox = document.getElementById('pmp-form-error');
  const inputName = document.getElementById('pmp-name');
  const inputEmail = document.getElementById('pmp-email');
  const inputPhone = document.getElementById('pmp-phone');
  const inputDates = document.getElementById('pmp-dates');
  const inputTravelers = document.getElementById('pmp-travelers');
  const inputBudget = document.getElementById('pmp-budget');
  const inputMessage = document.getElementById('pmp-message');
  const successUserName = document.getElementById('success-user-name');
  const successUserEmail = document.getElementById('success-user-email');

  const modalSubmenu = document.getElementById('modal-submenu');
  const submenuModalTitle = document.getElementById('submenu-modal-title');
  const submenuModalStrong = document.getElementById('submenu-modal-strong');
  const submenuBtnQuestion = document.getElementById('submenu-btn-question');
  const submenuBtnPlan = document.getElementById('submenu-btn-plan');

  const modalInfo = document.getElementById('modal-info');
  const infoModalSubtitle = document.getElementById('info-modal-subtitle');
  const infoModalTitle = document.getElementById('info-modal-title');
  const infoModalBody = document.getElementById('info-modal-body');
  const infoBtnPlan = document.getElementById('info-btn-plan');

  let currentMode = 'plan'; // 'plan' | 'question'
  let currentSubmenuTopic = '';

  const closeAllModals = () => {
    [modalPlanning, modalSubmenu, modalInfo].forEach((m) => {
      if (m) m.classList.remove('is-open');
    });
  };

  const setPlanningMode = (mode, preselectedTopic = '') => {
    currentMode = mode;
    if (formErrorBox) {
      formErrorBox.classList.remove('is-visible');
      formErrorBox.textContent = '';
    }
    if (planningForm && planningSuccess) {
      planningForm.style.display = 'block';
      planningSuccess.style.display = 'none';
    }

    const isPlan = mode === 'plan';

    if (modalPlanningTitle) {
      modalPlanningTitle.textContent = isPlan
        ? 'Quiero planificar mi viaje'
        : 'Pregunta cualquier duda';
    }

    if (modalPlanningIntro) {
      modalPlanningIntro.textContent = isPlan
        ? '1. Cuéntanos cómo imaginas tu viaje: Fechas, viajeros, edades, preferencias y presupuesto.'
        : 'Cuéntanos cómo imaginas vuestro viaje y nosotros empezaremos a darle forma.';
    }

    if (tabBtnPlan && tabBtnQuestion) {
      tabBtnPlan.classList.toggle('is-active', isPlan);
      tabBtnQuestion.classList.toggle('is-active', !isPlan);
    }

    if (planExtraFields && questionExtraFields) {
      planExtraFields.style.display = isPlan ? 'grid' : 'none';
      questionExtraFields.style.display = isPlan ? 'none' : 'block';
    }

    if (labelMessage) {
      labelMessage.textContent = isPlan
        ? 'Preferencias de hotel, comidas, personajes o detalles de vuestro viaje'
        : 'Escribe tu duda o consulta *';
    }

    if (submitBtnLabel) {
      submitBtnLabel.textContent = isPlan
        ? 'Quiero planificar mi viaje'
        : 'Pregunta cualquier duda';
    }

    if (preselectedTopic && inputMessage) {
      inputMessage.value = `Consulta relacionada con: ${preselectedTopic}\n`;
    }
  };

  const openPlanningModal = (mode = 'plan', preselectedTopic = '') => {
    closeAllModals();
    setMobileMenu(false);
    setDesktopDropdown(false);
    setPlanningMode(mode, preselectedTopic);
    if (modalPlanning) {
      modalPlanning.classList.add('is-open');
    }
  };

  const openSubmenuModal = (topicLabel) => {
    closeAllModals();
    setMobileMenu(false);
    setDesktopDropdown(false);
    currentSubmenuTopic = topicLabel;
    if (submenuModalTitle) submenuModalTitle.textContent = topicLabel;
    if (submenuModalStrong) submenuModalStrong.textContent = `“${topicLabel}”`;
    if (modalSubmenu) {
      modalSubmenu.classList.add('is-open');
    }
  };

  const openInfoModal = (title, subtitle, body) => {
    closeAllModals();
    setMobileMenu(false);
    setDesktopDropdown(false);
    if (infoModalTitle) infoModalTitle.textContent = title;
    if (infoModalSubtitle) infoModalSubtitle.textContent = subtitle || '';
    if (infoModalBody) infoModalBody.textContent = body;
    if (modalInfo) {
      modalInfo.classList.add('is-open');
    }
  };

  // Botones que abren el modal de Planificación o Dudas
  document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const mode = trigger.getAttribute('data-open-modal') || 'plan';
      openPlanningModal(mode);
    });
  });

  // Pestañas dentro del modal de Planificación / Dudas
  if (tabBtnPlan) {
    tabBtnPlan.addEventListener('click', () => setPlanningMode('plan'));
  }
  if (tabBtnQuestion) {
    tabBtnQuestion.addEventListener('click', () => setPlanningMode('question'));
  }

  // Enlaces del submenú Disneyland Paris (Header, Móvil y Footer)
  document.querySelectorAll('[data-submenu-topic]').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const topic = item.getAttribute('data-submenu-topic') || '';
      openSubmenuModal(topic);
    });
  });

  if (submenuBtnQuestion) {
    submenuBtnQuestion.addEventListener('click', () => {
      openPlanningModal('question', currentSubmenuTopic);
    });
  }

  if (submenuBtnPlan) {
    submenuBtnPlan.addEventListener('click', () => {
      openPlanningModal('plan', currentSubmenuTopic);
    });
  }

  // Artículos del Blog
  document.querySelectorAll('[data-blog-article]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-blog-title') || '';
      const meta = btn.getAttribute('data-blog-meta') || '';
      const excerpt = btn.getAttribute('data-blog-excerpt') || '';
      openInfoModal(
        title,
        meta,
        `${excerpt} [Vista previa del artículo del blog preparada para conectarse con el CMS de Paris Magic Plan.]`
      );
    });
  });

  // Enlaces Legales del Footer
  document.querySelectorAll('[data-legal-link]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const legalId = btn.getAttribute('data-legal-id') || '';
      const label = btn.getAttribute('data-legal-label') || '';
      openInfoModal(
        label,
        'Información legal · Paris Magic Plan',
        `[Espacio reservado para el documento oficial de "${label}" (${legalId}). Pendiente de incorporar los textos legales definitivos proporcionados por el cliente.]`
      );
    });
  });

  if (infoBtnPlan) {
    infoBtnPlan.addEventListener('click', () => {
      openPlanningModal('plan');
    });
  }

  // Cerrar modales con botón X, botón Cancelar o clic en el fondo oscuro
  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => closeAllModals());
  });

  [modalPlanning, modalSubmenu, modalInfo].forEach((backdrop) => {
    if (!backdrop) return;
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeAllModals();
      }
    });
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      setDesktopDropdown(false);
      setMobileMenu(false);
    }
  });

  /* ==========================================================================
     4. VALIDACIÓN Y ENVÍO DEL FORMULARIO
     ========================================================================== */
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const showError = (msg) => {
    if (!formErrorBox) return;
    formErrorBox.textContent = msg;
    formErrorBox.classList.add('is-visible');
  };

  if (planningForm) {
    planningForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formErrorBox) {
        formErrorBox.classList.remove('is-visible');
      }

      const nameVal = inputName ? inputName.value.trim() : '';
      const emailVal = inputEmail ? inputEmail.value.trim() : '';
      const datesVal = inputDates ? inputDates.value.trim() : '';
      const travelersVal = inputTravelers ? inputTravelers.value.trim() : '';
      const messageVal = inputMessage ? inputMessage.value.trim() : '';

      if (!nameVal) {
        showError('Por favor, introduce tu nombre.');
        return;
      }

      if (!validateEmail(emailVal)) {
        showError('Por favor, introduce un correo electrónico válido.');
        return;
      }

      if (currentMode === 'plan' && !datesVal && !travelersVal) {
        showError(
          'Por favor, indícanos fechas aproximadas o número de viajeros para empezar a darle forma a tu viaje.'
        );
        return;
      }

      if (currentMode === 'question' && !messageVal) {
        showError('Por favor, escribe tu duda o consulta.');
        return;
      }

      // Mostrar confirmación
      if (successUserName) successUserName.textContent = nameVal;
      if (successUserEmail) successUserEmail.textContent = emailVal;

      planningForm.style.display = 'none';
      if (planningSuccess) {
        planningSuccess.style.display = 'block';
      }

      // Limpiar campos opcionales para próximas aperturas
      if (inputPhone) inputPhone.value = '';
      if (inputDates) inputDates.value = '';
      if (inputTravelers) inputTravelers.value = '';
      if (inputBudget) inputBudget.value = '';
      if (inputMessage) inputMessage.value = '';
    });
  }

  /* ==========================================================================
     5. ANIMACIONES SUAVES AL HACER SCROLL (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* ==========================================================================
     6. ASISTENTE VIRTUAL IA (CHAT FLOTANTE PARIS MAGIC PLAN)
     ========================================================================== */
  const chatToggleBtn = document.getElementById('chat-toggle-btn');
  const chatWindow = document.getElementById('chat-window');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatTyping = document.getElementById('chat-typing-indicator');
  const chatAlertBanner = document.getElementById('chat-alert-banner');
  const chatAlertMessage = document.getElementById('chat-alert-message');
  const chatSuggestions = document.getElementById('chat-suggestions');
  const chatCharCounter = document.getElementById('chat-char-counter');
  const iconChatOpen = document.querySelector('.chat-toggle-btn__icon--open');
  const iconChatClose = document.querySelector('.chat-toggle-btn__icon--close');

  // Historial seguro en memoria de la sesión
  const chatHistory = [];
  let isChatBusy = false;

  const scrollChatToBottom = () => {
    if (!chatMessages) return;
    requestAnimationFrame(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  };

  const setChatWindowOpen = (open) => {
    if (!chatWindow || !chatToggleBtn) return;
    chatWindow.classList.toggle('is-open', open);
    chatToggleBtn.setAttribute('aria-expanded', String(open));
    chatToggleBtn.setAttribute(
      'aria-label',
      open ? 'Cerrar asistente virtual' : 'Abrir asistente virtual de Paris Magic Plan'
    );

    if (iconChatOpen && iconChatClose) {
      iconChatOpen.style.display = open ? 'none' : 'block';
      iconChatClose.style.display = open ? 'block' : 'none';
    }

    if (open) {
      scrollChatToBottom();
      if (chatInput && window.innerWidth > 640) {
        setTimeout(() => chatInput.focus(), 200);
      }
    }
  };

  if (chatToggleBtn) {
    chatToggleBtn.addEventListener('click', () => {
      const isOpen = chatWindow && chatWindow.classList.contains('is-open');
      setChatWindowOpen(!isOpen);
    });
  }

  if (chatCloseBtn) {
    chatCloseBtn.addEventListener('click', () => {
      setChatWindowOpen(false);
    });
  }

  // Enlazar todos los botones con data-open-chat (Hero, menú móvil/tablet, etc.)
  document.querySelectorAll('[data-open-chat]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setChatWindowOpen(true);
    });
  });

  // Sanitizador y formateador ligero de Markdown seguro
  const escapeHTML = (str) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const formatBotMarkdown = (markdown) => {
    let clean = escapeHTML(markdown);

    // Negritas: **texto**
    clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Listas: líneas que empiezan por * o -
    const lines = clean.split('\n');
    let inList = false;
    let html = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const listMatch = line.match(/^[\*\-]\s+(.*)$/);

      if (listMatch) {
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        html += `<li>${listMatch[1]}</li>`;
      } else {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        if (line.length > 0) {
          html += `<p>${line}</p>`;
        }
      }
    }
    if (inList) {
      html += '</ul>';
    }

    // Detección de botones de acción recomendados
    const lower = markdown.toLowerCase();
    let actionButtons = '';
    if (lower.includes('planificar') || lower.includes('presupuesto')) {
      actionButtons += `<button type="button" class="chat-msg__action-btn" data-chat-modal="plan">Abrir formulario: Planificar viaje</button> `;
    }
    if (lower.includes('duda') || lower.includes('contacto') || lower.includes('equipo')) {
      actionButtons += `<button type="button" class="chat-msg__action-btn" data-chat-modal="question">Pregunta cualquier duda</button>`;
    }

    if (actionButtons) {
      html += `<div style="margin-top: 10px;">${actionButtons}</div>`;
    }

    return html || `<p>${clean}</p>`;
  };

  const appendChatMessage = (role, rawText) => {
    if (!chatMessages) return;

    const msgEl = document.createElement('div');
    msgEl.className = `chat-msg chat-msg--${role}`;

    if (role === 'assistant') {
      msgEl.innerHTML = `
        <div class="chat-msg__avatar">
          <img src="assets/images/marca-grafica-pmp-simbolo-01.svg" alt="" aria-hidden="true" />
        </div>
        <div class="chat-msg__bubble">
          ${formatBotMarkdown(rawText)}
        </div>
      `;

      // Enlazar los botones de acción rápida dentro de la burbuja
      msgEl.querySelectorAll('[data-chat-modal]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const mode = btn.getAttribute('data-chat-modal') || 'plan';
          setChatWindowOpen(false);
          openPlanningModal(mode);
        });
      });
    } else {
      msgEl.innerHTML = `
        <div class="chat-msg__bubble">
          <p>${escapeHTML(rawText)}</p>
        </div>
      `;
    }

    chatMessages.appendChild(msgEl);
    scrollChatToBottom();
  };

  const sendChatMessage = async (userMessage) => {
    const text = (userMessage || '').trim();
    if (!text || isChatBusy) return;

    // Validación de longitud
    if (text.length > 1000) {
      if (chatAlertBanner && chatAlertMessage) {
        chatAlertMessage.textContent = 'El mensaje no puede superar los 1000 caracteres.';
        chatAlertBanner.style.display = 'flex';
      }
      return;
    }

    // Ocultar alertas previas
    if (chatAlertBanner) {
      chatAlertBanner.style.display = 'none';
    }

    // Limpiar campo de texto y reiniciar altura
    if (chatInput) {
      chatInput.value = '';
      chatInput.style.height = 'auto';
    }
    if (chatCharCounter) {
      chatCharCounter.textContent = '0/1000';
    }

    // Añadir mensaje del usuario en la interfaz y en el historial
    appendChatMessage('user', text);
    chatHistory.push({ role: 'user', text });

    // Estado ocupado y mostrar indicador de escribiendo
    isChatBusy = true;
    if (chatSendBtn) chatSendBtn.disabled = true;
    if (chatTyping) chatTyping.style.display = 'flex';
    scrollChatToBottom();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: chatHistory.slice(-8), // Enviar máximo los últimos 8 mensajes
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      let data = {};
      let isJson = false;

      if (contentType.includes('application/json')) {
        try {
          data = await response.json();
          isJson = true;
        } catch (jsonErr) {
          console.error('Error al analizar JSON devuelto por /api/chat:', jsonErr);
        }
      }

      // Si la respuesta no es JSON (ej. Vercel sirvió HTML estático por mala ruta o error de servidor)
      if (!isJson) {
        console.warn('El endpoint /api/chat no devolvió JSON. Status:', response.status, 'Content-Type:', contentType);
        if (chatAlertBanner && chatAlertMessage) {
          chatAlertMessage.textContent = 'Función de servidor /api/chat no detectada como JSON en Vercel.';
          chatAlertBanner.style.display = 'flex';
        }
        appendChatMessage(
          'assistant',
          '⚠️ **Error de comunicación con el servidor**: El endpoint `/api/chat` devolvió un formato no compatible (posiblemente la función serverless de Vercel está iniciándose o la ruta fue interceptada por el servidor estático).\n\nAsegúrate de haber desplegado los cambios con el nuevo `vercel.json` y de configurar `GEMINI_API_KEY` en Vercel.'
        );
        return;
      }

      if (!response.ok) {
        // Manejar caso específico de API Key no configurada o error del backend
        if (data.configured === false || data.code === 'MISSING_API_KEY') {
          if (chatAlertBanner && chatAlertMessage) {
            chatAlertMessage.textContent = 'Clave GEMINI_API_KEY pendiente de configurar en Vercel.';
            chatAlertBanner.style.display = 'flex';
          }
          appendChatMessage(
            'assistant',
            '⚠️ **Aviso de configuración**: La variable de entorno `GEMINI_API_KEY` aún no está configurada en el servidor de Vercel.\n\nPara activar las respuestas automáticas de Google Gemini en tiempo real, añade tu clave en el panel de **Vercel** (`Settings > Environment Variables`).\n\nMientras tanto, puedes consultar las opciones oficiales directamente o solicitar tu presupuesto personalizado con nuestros Travel Planners:'
          );
          return;
        }

        if (response.status === 401 || data.code === 'INVALID_API_KEY') {
          appendChatMessage(
            'assistant',
            '🔑 **Clave no válida**: La clave `GEMINI_API_KEY` configurada en el servidor no es válida o ha caducado. Por favor, actualízala en el panel de Vercel (`Settings > Environment Variables`).'
          );
          return;
        }

        if (response.status === 429 || data.code === 'QUOTA_EXCEEDED') {
          appendChatMessage(
            'assistant',
            '⏳ **Límite temporal alcanzado**: Se ha alcanzado temporalmente la cuota de consultas de la API de Gemini. Por favor, espera unos instantes o consulta directamente con el equipo de Paris Magic Plan.'
          );
          return;
        }

        const errorMsg = data.error || 'No se pudo obtener respuesta del asistente en este momento.';
        appendChatMessage('assistant', `Disculpa, ha ocurrido un problema al consultar: ${errorMsg}\n\nPuedes pulsar en **"Pregunta cualquier duda"** para que nuestro equipo te atienda directamente.`);
        return;
      }

      if (data.reply && data.reply.trim()) {
        appendChatMessage('assistant', data.reply);
        chatHistory.push({ role: 'model', text: data.reply });
      } else {
        appendChatMessage(
          'assistant',
          'Disculpa, el asistente no ha generado una respuesta de texto. Por favor, formula tu pregunta de nuevo o consulta con nuestro equipo.'
        );
      }
    } catch (err) {
      console.error('Error de red al conectar con /api/chat:', err);
      appendChatMessage(
        'assistant',
        'No se ha podido conectar con el servidor del asistente. Por favor, comprueba tu conexión a internet o utiliza el formulario de contacto de la página.'
      );
    } finally {
      isChatBusy = false;
      if (chatSendBtn) chatSendBtn.disabled = false;
      if (chatTyping) chatTyping.style.display = 'none';
      scrollChatToBottom();
    }
  };

  // Manejo del formulario de envío
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (chatInput) {
        sendChatMessage(chatInput.value);
      }
    });
  }

  // Enviar con Enter (y salto de línea con Shift+Enter)
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatMessage(chatInput.value);
      }
    });

    chatInput.addEventListener('input', () => {
      // Ajuste automático de altura
      chatInput.style.height = 'auto';
      chatInput.style.height = `${Math.min(chatInput.scrollHeight, 90)}px`;

      // Contador de caracteres
      if (chatCharCounter) {
        const count = chatInput.value.length;
        chatCharCounter.textContent = `${count}/1000`;
        chatCharCounter.style.color = count > 950 ? '#dc2626' : 'rgba(35, 57, 117, 0.6)';
      }
    });
  }

  // Manejo de chips de preguntas frecuentes sugeridas
  document.querySelectorAll('.chat-chip').forEach((chip) => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const question = chip.getAttribute('data-question') || chip.textContent.trim();
      sendChatMessage(question);
    });
  });
});

