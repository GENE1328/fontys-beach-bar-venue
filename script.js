(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  const page = document.body.dataset.page;
  if (page) {
    const current = document.querySelector(`[data-nav="${page}"]`);
    if (current) current.setAttribute('aria-current', 'page');
  }

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const reservationForm = document.querySelector('[data-reservation-form]');
  if (reservationForm) {
    reservationForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(reservationForm);
      const get = (name) => String(data.get(name) || '').trim();
      const bookingType = get('bookingType') || 'Table reservation';
      const intro = bookingType === 'Private event'
        ? "Hello Fonty's, I'd like to enquire about booking a private event."
        : "Hello Fonty's, I'd like to enquire about a table reservation.";
      const message = [
        intro,
        `Booking type: ${bookingType}`,
        `Name: ${get('name')}`,
        `Contact number: ${get('phone')}`,
        `Preferred date: ${get('date')}`,
        `Preferred time: ${get('time')}`,
        `Number of guests: ${get('guests')}`,
        `Occasion or event type: ${get('eventType') || 'Not specified'}`,
        `Additional message: ${get('message') || 'None'}`
      ].join('\n');
      const status = document.querySelector('[data-form-status]');
      if (status) {
        status.textContent = 'Opening WhatsApp with your booking enquiry…';
        status.classList.add('is-visible');
      }
      window.open(`https://wa.me/67577113314?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });
  }

  const calendar = document.querySelector('[data-calendar]');
  if (calendar) {
    const label = calendar.querySelector('[data-calendar-label]');
    const grid = calendar.querySelector('[data-calendar-grid]');
    const previous = calendar.querySelector('[data-calendar-prev]');
    const next = calendar.querySelector('[data-calendar-next]');
    const empty = document.querySelector('[data-calendar-empty]');
    const now = new Date();
    let cursor = new Date(now.getFullYear(), now.getMonth(), 1);
    // Add confirmed dates here as YYYY-MM-DD: 'Event title' when the venue supplies them.
    const confirmedEvents = {};

    const pad = (value) => String(value).padStart(2, '0');
    const dateKey = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const render = () => {
      const year = cursor.getFullYear();
      const month = cursor.getMonth();
      label.textContent = cursor.toLocaleDateString('en', { month: 'long', year: 'numeric' });
      grid.innerHTML = '';
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const previousMonthDays = new Date(year, month, 0).getDate();
      const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

      for (let index = 0; index < totalCells; index += 1) {
        const dayOffset = index - firstDay + 1;
        const cellDate = new Date(year, month, dayOffset);
        const button = document.createElement('div');
        button.className = 'calendar-day';
        button.setAttribute('role', 'gridcell');
        if (dayOffset < 1 || dayOffset > daysInMonth) button.classList.add('calendar-day--outside');
        if (dateKey(cellDate) === dateKey(now)) button.classList.add('calendar-day--today');
        const shownDay = dayOffset < 1 ? previousMonthDays + dayOffset : dayOffset > daysInMonth ? dayOffset - daysInMonth : dayOffset;
        button.innerHTML = `<span class="calendar-day__number">${shownDay}</span>`;
        const event = confirmedEvents[dateKey(cellDate)];
        if (event && dayOffset >= 1 && dayOffset <= daysInMonth) {
          button.innerHTML += `<span class="calendar-day__event">${event}</span>`;
        }
        grid.appendChild(button);
      }

      if (empty) empty.hidden = Object.keys(confirmedEvents).length > 0;
    };

    previous.addEventListener('click', () => { cursor.setMonth(cursor.getMonth() - 1); render(); });
    next.addEventListener('click', () => { cursor.setMonth(cursor.getMonth() + 1); render(); });
    render();
  }
})();
