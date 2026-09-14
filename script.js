const weddingDate = new Date("2026-10-15T16:00:00+06:00");

const countdownEls = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const distance = weddingDate.getTime() - Date.now();
  const safeDistance = Math.max(distance, 0);

  const days = Math.floor(safeDistance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safeDistance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safeDistance / (1000 * 60)) % 60);
  const seconds = Math.floor((safeDistance / 1000) % 60);

  countdownEls.days.textContent = pad(days);
  countdownEls.hours.textContent = pad(hours);
  countdownEls.minutes.textContent = pad(minutes);
  countdownEls.seconds.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

function setupSignatureTitle(titleTextOverride) {
  const title = document.querySelector(".intro h1");
  if (!title) {
    return;
  }

  const titleText = (titleTextOverride || title.textContent).trim();
  title.setAttribute("aria-label", titleText);
  title.innerHTML = Array.from(titleText)
    .map((letter, index) => {
      const safeLetter = letter === " " ? "&nbsp;" : letter;
      return `<span class="title-letter" style="--letter-delay: ${index * 0.09}s">${safeLetter}</span>`;
    })
    .join("");
}

function setupPetals() {
  const shell = document.querySelector(".page-shell");
  if (!shell || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const layer = document.createElement("div");
  layer.className = "petal-layer";
  layer.setAttribute("aria-hidden", "true");

  const petalCount = 22;
  for (let index = 0; index < petalCount; index += 1) {
    const petal = document.createElement("span");
    const drift = index % 2 === 0 ? 24 + index * 3 : -22 - index * 2;
    const rotate = -40 + index * 19;

    petal.style.setProperty("--x", `${(index * 37) % 100}%`);
    petal.style.setProperty("--size", `${9 + (index % 5) * 2}px`);
    petal.style.setProperty("--delay", `${index * -0.74}s`);
    petal.style.setProperty("--duration", `${13 + (index % 7) * 1.1}s`);
    petal.style.setProperty("--drift", `${drift}px`);
    petal.style.setProperty("--drift-end", `${drift * -0.55}px`);
    petal.style.setProperty("--rotate", `${rotate}deg`);
    petal.style.setProperty("--rotate-mid", `${rotate + 130}deg`);
    petal.style.setProperty("--rotate-end", `${rotate + 270}deg`);

    layer.appendChild(petal);
  }

  shell.prepend(layer);
}

let currentLanguage = "ky";

const translations = {
  ky: {
    documentTitle: "Амина - кыз узатуу",
    introName: "Амина",
    pageLabel: "Аминанын кыз узатуу чакыруусу",
    languageLabel: "Тил тандоо",
    songText: "Ырды иштетүү",
    songPauseText: "Ырды токтотуу",
    songMissingText: "MP3 файл керек",
    musicPromptTitle: "Музыканы баштоо",
    musicPromptText: "Телефондо үн чыгышы үчүн бир жолу басыңыз",
    songLabel: "Ырды иштетүү",
    introSubtitle: "Кыз узатуу",
    messageTitle: "Урматтуу<br />коноктор!",
    messageFirst:
      "Бул күн биз үчүн өзгөчө маанилүү. Биз бул кубанычтуу көз ирмемди эң жакын, сүйүктүү адамдардын жана досторубуздун курчоосунда өткөргүбүз келет.",
    dateTitle: "Той<br />салтанаты",
    dateText: "15-октябрь 2026 жыл",
    timeText: "саат 16:00",
    calendarLabel: "Октябрь айынын календары",
    venueTitle: "Мекен-жайыбыз:",
    venueName: "«Соно»",
    venueAddress: "рестораны, Каракол шаары",
    mapText: "Картадан<br />кароо",
    map2GisText: "2ГИСтен<br />кароо",
    countdownTitle: "Тойго чейин:",
    timeParts: ["күн", "саат", "мүнөт", "секунд"],
    rsvpTitle: "Катышуу",
    rsvpIntro: "Катышууңузду WhatsApp аркылуу ырастап коюуну өтүнөбүз",
    nameLabel: "Аты-жөнүңүздү жазыңыз",
    namePlaceholder: "Мисалы: Айбек-Айдана",
    guestCountLabel: "Конок саны",
    guestOptions: ["1 конок", "2 конок", "3 конок", "4 конок", "5 же андан көп"],
    attendanceLegend: "Катышууңуз",
    attendanceOptions: [
      "Албетте, келем!",
      "Тилекке каршы, келе албайм!",
    ],
    wishLabel: "Каалоо-тилек, билдирүү",
    wishPlaceholder: "Каалоо-тилегиңизди же билдирүүңүздү жазыңыз",
    submitText: "WhatsApp аркылуу жөнөтүү",
    closingText:
      "Терең урматтоо менен,<br />Аминанын үй-бүлөсү<br /><br />Биз сизди майрамыбызда көрүүгө абдан кубанычтабыз!",
    validationText: "Атыңызды, конок санын жана катышууңузду белгилеп коюңуз.",
    successText: "WhatsApp ачылды. Даяр билдирүүнү жөнөтүп коюңуз.",
    popupText: "WhatsApp ачылбаса, браузердин popup уруксатын текшериңиз.",
    whatsAppLines: {
      greeting: "Саламатсыздарбы!",
      title: "Аминанын кыз узатуу тоюна жооп:",
      name: "Аты-жөнүм",
      attendance: "Катышуум",
      guestCount: "Конок саны",
      wish: "Каалоо-тилек/билдирүү",
    },
  },
  ru: {
    documentTitle: "Амина - проводы невесты",
    introName: "Амина",
    pageLabel: "Приглашение на проводы невесты Амины",
    languageLabel: "Выбор языка",
    songText: "Включить песню",
    songPauseText: "Остановить песню",
    songMissingText: "Нужен MP3 файл",
    musicPromptTitle: "Включить музыку",
    musicPromptText: "Нажмите один раз, чтобы включить звук",
    songLabel: "Включить песню",
    introSubtitle: "Проводы невесты",
    messageTitle: "Уважаемые<br />гости!",
    messageFirst:
      "Этот день особенно важен для нас. Мы хотим провести этот радостный момент в кругу самых близких, любимых людей и друзей.",
    dateTitle: "Торжество",
    dateText: "15 октября 2026 года",
    timeText: "в 16:00",
    calendarLabel: "Календарь октября",
    venueTitle: "Адрес:",
    venueName: "«Соно»",
    venueAddress: "ресторан, город Каракол",
    mapText: "Открыть<br />карту",
    map2GisText: "Открыть<br />2ГИС",
    countdownTitle: "До торжества:",
    timeParts: ["дней", "часов", "минут", "секунд"],
    rsvpTitle: "Участие",
    rsvpIntro: "Просим подтвердить ваше участие через WhatsApp",
    nameLabel: "Введите имя и фамилию",
    namePlaceholder: "Например: Айбек-Айдана",
    guestCountLabel: "Количество гостей",
    guestOptions: ["1 гость", "2 гостя", "3 гостя", "4 гостя", "5 и более"],
    attendanceLegend: "Ваше участие",
    attendanceOptions: [
      "Конечно, приду!",
      "К сожалению, не смогу прийти!",
    ],
    wishLabel: "Пожелание, сообщение",
    wishPlaceholder: "Напишите пожелание или сообщение",
    submitText: "Отправить через WhatsApp",
    closingText:
      "С глубоким уважением,<br />семья Амины<br /><br />Будем очень рады видеть вас на нашем празднике!",
    validationText: "Введите имя, количество гостей и отметьте участие.",
    successText: "WhatsApp открыт. Отправьте готовое сообщение.",
    popupText: "Если WhatsApp не открылся, проверьте разрешение popup в браузере.",
    whatsAppLines: {
      greeting: "Здравствуйте!",
      title: "Ответ на проводы невесты Амины:",
      name: "Имя и фамилия",
      attendance: "Участие",
      guestCount: "Количество гостей",
      wish: "Пожелание/сообщение",
    },
  },
  tr: {
    documentTitle: "Amina - gelin uğurlama",
    introName: "Amina",
    pageLabel: "Amina'nın gelin uğurlama davetiyesi",
    languageLabel: "Dil seçimi",
    songText: "Şarkıyı aç",
    songPauseText: "Şarkıyı durdur",
    songMissingText: "MP3 dosyası gerekli",
    musicPromptTitle: "Müziği başlat",
    musicPromptText: "Sesi açmak için bir kez dokunun",
    songLabel: "Şarkıyı aç",
    introSubtitle: "Gelin uğurlama",
    messageTitle: "Değerli<br />misafirler!",
    messageFirst:
      "Bu gün bizim için çok özel ve anlamlı. Bu mutlu anı en yakınlarımız, sevdiklerimiz ve dostlarımızın arasında geçirmek istiyoruz.",
    dateTitle: "Tören",
    dateText: "15 Ekim 2026",
    timeText: "saat 16:00",
    calendarLabel: "Ekim takvimi",
    venueTitle: "Adresimiz:",
    venueName: "«Sono»",
    venueAddress: "restoran, Karakol şehri",
    mapText: "Haritayı<br />aç",
    map2GisText: "2GIS'te<br />aç",
    countdownTitle: "Törene kalan:",
    timeParts: ["gün", "saat", "dakika", "saniye"],
    rsvpTitle: "Katılım",
    rsvpIntro: "Katılımınızı WhatsApp üzerinden onaylamanızı rica ederiz",
    nameLabel: "Adınızı ve soyadınızı yazınız",
    namePlaceholder: "Örnek: Aybek-Aydana",
    guestCountLabel: "Misafir sayısı",
    guestOptions: ["1 misafir", "2 misafir", "3 misafir", "4 misafir", "5 ve üzeri"],
    attendanceLegend: "Katılımınız",
    attendanceOptions: [
      "Elbette geleceğim!",
      "Maalesef gelemeyeceğim!",
    ],
    wishLabel: "Dilek, mesaj",
    wishPlaceholder: "Dileğinizi veya mesajınızı yazınız",
    submitText: "WhatsApp ile gönder",
    closingText:
      "Derin saygılarımızla,<br />Amina'nın ailesi<br /><br />Sizi bayramımızda görmekten büyük mutluluk duyarız!",
    validationText: "Adınızı, misafir sayısını ve katılım durumunuzu belirtiniz.",
    successText: "WhatsApp açıldı. Hazır mesajı gönderebilirsiniz.",
    popupText: "WhatsApp açılmazsa tarayıcınızın popup iznini kontrol ediniz.",
    whatsAppLines: {
      greeting: "Merhaba!",
      title: "Amina'nın gelin uğurlama töreni için cevap:",
      name: "Ad soyad",
      attendance: "Katılım",
      guestCount: "Misafir sayısı",
      wish: "Dilek/mesaj",
    },
  },
  en: {
    documentTitle: "Amina - bride send-off",
    introName: "Amina",
    pageLabel: "Invitation to Amina's bride send-off",
    languageLabel: "Language selection",
    songText: "Play song",
    songPauseText: "Pause song",
    songMissingText: "MP3 file needed",
    musicPromptTitle: "Start music",
    musicPromptText: "Tap once to enable sound",
    songLabel: "Play song",
    introSubtitle: "Bride send-off",
    messageTitle: "Dear<br />guests!",
    messageFirst:
      "This day is especially meaningful to us. We would love to share this joyful moment surrounded by our closest loved ones and friends.",
    dateTitle: "Celebration",
    dateText: "October 15, 2026",
    timeText: "at 16:00",
    calendarLabel: "October calendar",
    venueTitle: "Venue:",
    venueName: "«Sono»",
    venueAddress: "restaurant, Karakol city",
    mapText: "Open<br />map",
    map2GisText: "Open<br />2GIS",
    countdownTitle: "Until the celebration:",
    timeParts: ["days", "hours", "minutes", "seconds"],
    rsvpTitle: "RSVP",
    rsvpIntro: "Please confirm your attendance via WhatsApp",
    nameLabel: "Enter your full name",
    namePlaceholder: "Example: Aybek-Aydana",
    guestCountLabel: "Number of guests",
    guestOptions: ["1 guest", "2 guests", "3 guests", "4 guests", "5 or more"],
    attendanceLegend: "Your attendance",
    attendanceOptions: [
      "Of course, I will come!",
      "Unfortunately, I cannot come!",
    ],
    wishLabel: "Wish or message",
    wishPlaceholder: "Write your wish or message",
    submitText: "Send via WhatsApp",
    closingText:
      "With deep respect,<br />Amina's family<br /><br />We will be very happy to see you at our celebration!",
    validationText: "Please enter your name, guest count, and attendance choice.",
    successText: "WhatsApp opened. Please send the prepared message.",
    popupText: "If WhatsApp did not open, please check your browser popup permission.",
    whatsAppLines: {
      greeting: "Hello!",
      title: "RSVP for Amina's bride send-off:",
      name: "Full name",
      attendance: "Attendance",
      guestCount: "Number of guests",
      wish: "Wish/message",
    },
  },
};

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value;
  }
}

function setHtml(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.innerHTML = value;
  }
}

const textAnimationSelectors = [
  ".intro h1",
  ".intro p",
  ".intro time",
  ".message-block h2",
  ".message-block p",
  ".date-block h2",
  ".date-block p",
  ".calendar",
  ".venue-block h2",
  ".venue-block h3",
  ".venue-block p",
  ".map-button",
  ".countdown-block h2",
  ".countdown",
  ".rsvp-block h2",
  ".rsvp-block > p",
  "form label",
  "fieldset legend",
  "fieldset label",
  "input",
  "select",
  "textarea",
  ".submit-button",
  ".closing-block p",
];

function getAnimatedTextElements() {
  return Array.from(
    new Set(
      textAnimationSelectors.flatMap((selector) =>
        Array.from(document.querySelectorAll(selector))
      )
    )
  );
}

function setupTextAnimations() {
  const elements = getAnimatedTextElements();

  elements.forEach((element, index) => {
    element.classList.add("text-reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index * 0.045, 0.65)}s`);
  });

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((element) => observer.observe(element));
}

function refreshTextAnimations() {
  getAnimatedTextElements().forEach((element, index) => {
    window.setTimeout(() => {
      element.classList.remove("language-refresh");
      void element.offsetWidth;
      element.classList.add("language-refresh");
    }, index * 18);
  });
}

const songButton = document.querySelector(".song-link");
const songAudio = document.getElementById("weddingSong");
let isSongPlaying = false;
let isSongMissing = false;
let shouldAutoPlaySong = true;
let musicPrompt;

function updateSongButton() {
  if (!songButton) {
    return;
  }

  const text = translations[currentLanguage];

  if (isSongMissing) {
    songButton.classList.add("is-missing");
    songButton.classList.remove("is-playing");
    songButton.setAttribute("aria-label", text.songMissingText);
    setText(".song-text", text.songMissingText);
    return;
  }

  songButton.classList.remove("is-missing");
  songButton.classList.toggle("is-playing", isSongPlaying);
  songButton.setAttribute("aria-label", isSongPlaying ? text.songPauseText : text.songLabel);
  setText(".song-text", isSongPlaying ? text.songPauseText : text.songText);
}

function updateMusicPromptText() {
  if (!musicPrompt) {
    return;
  }

  const text = translations[currentLanguage];
  musicPrompt.querySelector(".music-prompt-title").textContent = text.musicPromptTitle;
  musicPrompt.querySelector(".music-prompt-text").textContent = text.musicPromptText;
}

function showMusicPrompt() {
  if (isSongPlaying || isSongMissing) {
    return;
  }

  if (!musicPrompt) {
    musicPrompt = document.createElement("button");
    musicPrompt.type = "button";
    musicPrompt.className = "music-prompt";
    musicPrompt.innerHTML = `
      <span class="music-prompt-note" aria-hidden="true">♪</span>
      <span>
        <span class="music-prompt-title"></span>
        <span class="music-prompt-text"></span>
      </span>
    `;
    musicPrompt.addEventListener("click", () => {
      shouldAutoPlaySong = true;
      playSong();
    });
    document.body.appendChild(musicPrompt);
  }

  updateMusicPromptText();
  musicPrompt.classList.add("is-visible");
}

function hideMusicPrompt() {
  if (musicPrompt) {
    musicPrompt.classList.remove("is-visible");
  }
}

async function playSong({ showPromptOnBlock = true } = {}) {
  if (!songAudio || isSongMissing) {
    return false;
  }

  try {
    songAudio.muted = false;
    songAudio.volume = 1;
    await songAudio.play();
    isSongPlaying = true;
    updateSongButton();
    hideMusicPrompt();
    return true;
  } catch (error) {
    isSongPlaying = false;
    updateSongButton();
    if (showPromptOnBlock) {
      showMusicPrompt();
    }
    return false;
  }
}

function pauseSong() {
  if (!songAudio) {
    return;
  }

  songAudio.pause();
  isSongPlaying = false;
  updateSongButton();
  hideMusicPrompt();
}

function applyLanguage(language) {
  currentLanguage = language;
  const text = translations[language];

  document.documentElement.lang = language;
  document.title = text.documentTitle;
  document.querySelector(".invitation").setAttribute("aria-label", text.pageLabel);
  document.querySelector(".language-switch").setAttribute("aria-label", text.languageLabel);
  if (songButton) {
    songButton.setAttribute("aria-label", text.songLabel);
  }

  setupSignatureTitle(text.introName);
  updateSongButton();
  updateMusicPromptText();
  setText(".intro p", text.introSubtitle);
  setHtml(".message-block h2", text.messageTitle);
  setText(".message-block p:nth-of-type(1)", text.messageFirst);
  setHtml(".date-block h2", text.dateTitle);
  setText(".date-block p:nth-of-type(1)", text.dateText);
  setText(".date-block p:nth-of-type(2)", text.timeText);
  document.querySelector(".calendar").setAttribute("aria-label", text.calendarLabel);
  setText(".venue-block h2", text.venueTitle);
  setText(".venue-block h3", text.venueName);
  setText(".venue-block p", text.venueAddress);
  setHtml(".map-button-google", text.mapText);
  setHtml(".map-button-2gis", text.map2GisText);
  setText(".countdown-block h2", text.countdownTitle);
  document.querySelectorAll(".time-part span").forEach((item, index) => {
    item.textContent = text.timeParts[index];
  });
  setText(".rsvp-block h2", text.rsvpTitle);
  setText(".rsvp-block > p", text.rsvpIntro);
  setText('label[for="guestName"]', text.nameLabel);
  document.getElementById("guestName").placeholder = text.namePlaceholder;
  setText('label[for="guestCount"]', text.guestCountLabel);
  document.querySelectorAll("#guestCount option").forEach((option, index) => {
    option.textContent = text.guestOptions[index];
  });
  setText("fieldset legend", text.attendanceLegend);
  document.querySelectorAll('input[name="attendance"]').forEach((input, index) => {
    input.value = text.attendanceOptions[index];
    input.nextElementSibling.textContent = text.attendanceOptions[index];
  });
  setText('label[for="wishText"]', text.wishLabel);
  document.getElementById("wishText").placeholder = text.wishPlaceholder;
  setText(".submit-button", text.submitText);
  setHtml(".closing-block p", text.closingText);
  formStatus.textContent = "";

  document.querySelectorAll(".language-switch button").forEach((item) => {
    item.classList.toggle("active", item.dataset.lang === language);
  });

  refreshTextAnimations();
}

const form = document.getElementById("rsvpForm");
const formStatus = document.getElementById("formStatus");
const whatsAppPhone = "996755626866";

setupSignatureTitle();
setupPetals();
setupTextAnimations();
updateSongButton();

if (songAudio) {
  songAudio.autoplay = true;
  songAudio.loop = true;
  songAudio.preload = "auto";
  songAudio.load();

  songAudio.addEventListener("play", () => {
    isSongPlaying = true;
    updateSongButton();
  });

  songAudio.addEventListener("pause", () => {
    isSongPlaying = false;
    updateSongButton();
  });

  songAudio.addEventListener("error", () => {
    isSongMissing = true;
    isSongPlaying = false;
    updateSongButton();
  });

  document.addEventListener("DOMContentLoaded", () => {
    if (shouldAutoPlaySong) {
      playSong();
    }
  });

  window.addEventListener("load", () => {
    if (shouldAutoPlaySong) {
      playSong();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && shouldAutoPlaySong && !isSongPlaying) {
      playSong();
    }
  });

  document.addEventListener(
    "pointerdown",
    () => {
      if (shouldAutoPlaySong && !isSongPlaying && !isSongMissing) {
        playSong();
      }
    },
    { once: true }
  );

  document.addEventListener(
    "touchstart",
    () => {
      if (shouldAutoPlaySong && !isSongPlaying && !isSongMissing) {
        playSong({ showPromptOnBlock: false });
      }
    },
    { once: true, passive: true }
  );

  document.addEventListener(
    "click",
    () => {
      if (shouldAutoPlaySong && !isSongPlaying && !isSongMissing) {
        playSong({ showPromptOnBlock: false });
      }
    },
    { once: true }
  );

  document.addEventListener(
    "keydown",
    () => {
      if (shouldAutoPlaySong && !isSongPlaying && !isSongMissing) {
        playSong({ showPromptOnBlock: false });
      }
    },
    { once: true }
  );
}

if (songButton) {
  songButton.addEventListener("click", () => {
    if (isSongPlaying) {
      shouldAutoPlaySong = false;
      pauseSong();
      return;
    }

    shouldAutoPlaySong = true;
    playSong();
  });
}

document.querySelectorAll(".language-switch button").forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const text = translations[currentLanguage];
  const guestName = String(formData.get("guestName") || "").trim();
  const guestCount = formData.get("guestCount");
  const guestCountLabel = document.querySelector("#guestCount option:checked").textContent.trim();
  const attendance = formData.get("attendance");
  const wishText = String(formData.get("wishText") || "").trim();

  if (!guestName || !guestCount || !attendance) {
    formStatus.textContent = text.validationText;
    formStatus.style.color = "#9b5659";
    return;
  }

  const whatsAppMessage = [
    text.whatsAppLines.greeting,
    text.whatsAppLines.title,
    `${text.whatsAppLines.name}: ${guestName}`,
    `${text.whatsAppLines.attendance}: ${attendance}`,
    `${text.whatsAppLines.guestCount}: ${guestCountLabel}`,
    wishText ? `${text.whatsAppLines.wish}: ${wishText}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  localStorage.setItem(
    "amina-rsvp",
    JSON.stringify({
      guestName,
      guestCount,
      attendance,
      wishText,
      savedAt: new Date().toISOString(),
    })
  );

  const whatsAppUrl = `https://wa.me/${whatsAppPhone}?text=${encodeURIComponent(whatsAppMessage)}`;
  const whatsAppWindow = window.open(whatsAppUrl, "_blank", "noopener");

  formStatus.textContent = whatsAppWindow
    ? text.successText
    : text.popupText;
  formStatus.style.color = "#7f8f74";
});
