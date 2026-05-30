import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "action",    label: "Экшн",        icon: "Swords",    count: 142 },
  { id: "puzzle",    label: "Головоломки",  icon: "Puzzle",    count: 98  },
  { id: "arcade",    label: "Аркады",       icon: "Gamepad2",  count: 211 },
  { id: "strategy",  label: "Стратегии",    icon: "Brain",     count: 67  },
  { id: "racing",    label: "Гонки",        icon: "Car",       count: 54  },
  { id: "shooter",   label: "Шутеры",       icon: "Crosshair", count: 89  },
  { id: "rpg",       label: "РПГ",          icon: "Shield",    count: 33  },
  { id: "sport",     label: "Спорт",        icon: "Trophy",    count: 45  },
];

const TAGS = [
  "Мультиплеер", "Одиночная", "2D", "3D", "Пиксель-арт", "Физика",
  "Карты", "Война", "Зомби", "Фэнтези", "Космос", "Новинка",
];

const POPULAR_GAMES = [
  { id: 1, title: "Neon Racer",    category: "Гонки",       rating: 4.8, plays: "120K", emoji: "🏎️" },
  { id: 2, title: "Tower Wars",    category: "Стратегии",   rating: 4.6, plays: "98K",  emoji: "🏰" },
  { id: 3, title: "Pixel Shooter", category: "Шутеры",      rating: 4.9, plays: "215K", emoji: "🎯" },
  { id: 4, title: "Block Puzzle",  category: "Головоломки", rating: 4.5, plays: "74K",  emoji: "🧩" },
  { id: 5, title: "Arena Fight",   category: "Экшн",        rating: 4.7, plays: "180K", emoji: "⚔️" },
];

const GAME_CARDS = [
  { id: 1, title: "Snake Classic",   category: "Аркады",       rating: 4.3, plays: "55K",  emoji: "🐍", isNew: false },
  { id: 2, title: "Space Invaders",  category: "Шутеры",       rating: 4.6, plays: "88K",  emoji: "👾", isNew: false },
  { id: 3, title: "Tetris HD",       category: "Головоломки",  rating: 4.8, plays: "201K", emoji: "🟦", isNew: false },
  { id: 4, title: "Zombie Rush",     category: "Экшн",         rating: 4.4, plays: "63K",  emoji: "🧟", isNew: true  },
  { id: 5, title: "Moto Madness",    category: "Гонки",        rating: 4.2, plays: "41K",  emoji: "🏍️", isNew: false },
  { id: 6, title: "Chess Master",    category: "Стратегии",    rating: 4.9, plays: "112K", emoji: "♟️", isNew: false },
  { id: 7, title: "Fruit Slash",     category: "Аркады",       rating: 4.1, plays: "79K",  emoji: "🍉", isNew: true  },
  { id: 8, title: "Dragon Quest",    category: "РПГ",          rating: 4.7, plays: "34K",  emoji: "🐉", isNew: true  },
];

const NAV_ITEMS = [
  { id: "home",  label: "Главная", icon: "Home"       },
  { id: "games", label: "Игры",    icon: "Gamepad2"   },
  { id: "news",  label: "Новости", icon: "Newspaper"  },
  { id: "help",  label: "Помощь",  icon: "HelpCircle" },
];

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} width="10" height="10" viewBox="0 0 10 10" fill="none">
          <polygon
            points="5,1 6.2,3.8 9.5,4 7.2,6 8,9.5 5,7.5 2,9.5 2.8,6 0.5,4 3.8,3.8"
            fill={s <= Math.round(rating) ? "#DE3B3B" : "#2E2E2E"}
          />
        </svg>
      ))}
      <span className="ml-1 text-xs" style={{ color: "#888" }}>{rating}</span>
    </div>
  );
}

// ─── Game Card ────────────────────────────────────────────────────────────────
function GameCard({ game, delay = 0 }: { game: typeof GAME_CARDS[0]; delay?: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="cursor-pointer rounded-lg overflow-hidden"
      style={{
        animationDelay: `${delay}ms`,
        background: "var(--ink-soft)",
        border: "1px solid var(--hairline)",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.22)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: 120, background: "linear-gradient(135deg, #111 0%, #1A1A1A 100%)" }}
      >
        <span style={{ fontSize: 48, lineHeight: 1, transition: "transform 0.2s", transform: hovered ? "scale(1.1)" : "scale(1)" }}>
          {game.emoji}
        </span>
        {game.isNew && (
          <span
            className="absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded"
            style={{ background: "var(--accent)", color: "#fff", fontFamily: "'Oswald'", letterSpacing: "0.05em" }}
          >
            NEW
          </span>
        )}
        {hovered && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(222,59,59,0.15)" }}>
            <div
              className="flex items-center gap-2 rounded-full px-4 py-2"
              style={{ background: "var(--oxblood)", color: "#fff" }}
            >
              <Icon name="Play" size={14} />
              <span className="text-sm font-semibold" style={{ fontFamily: "'Oswald'" }}>Играть</span>
            </div>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-semibold mb-1 truncate" style={{ color: "var(--paper)", fontFamily: "'Oswald'" }}>
          {game.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "#888" }}>{game.category}</span>
          <StarRating rating={game.rating} />
        </div>
        <div className="flex items-center gap-1 mt-1">
          <Icon name="Users" size={10} style={{ color: "#666" }} />
          <span className="text-xs" style={{ color: "#666" }}>{game.plays} сыграно</span>
        </div>
      </div>
    </div>
  );
}

// ─── Popular Slider ───────────────────────────────────────────────────────────
function PopularSlider() {
  const [active, setActive] = useState(0);
  const g = POPULAR_GAMES[active];
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "var(--ink)", border: "1px solid var(--hairline)" }}>
      <div className="relative flex items-end p-6" style={{ height: 200 }}>
        <div className="absolute right-8 top-6" style={{ fontSize: 80, lineHeight: 1, opacity: 0.85 }}>
          {g.emoji}
        </div>
        <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl" style={{ background: "var(--oxblood)" }} />
        <div className="relative z-10">
          <div className="text-xs mb-1 font-medium" style={{ color: "var(--oxblood)", fontFamily: "'Oswald'", letterSpacing: "0.1em" }}>
            {g.category.toUpperCase()} · #{active + 1} ПОПУЛЯРНОЕ
          </div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: "var(--paper)", fontFamily: "'Oswald'" }}>
            {g.title}
          </h2>
          <div className="flex items-center gap-4">
            <StarRating rating={g.rating} />
            <span className="text-xs" style={{ color: "#888" }}>
              {g.plays} сыграно
            </span>
          </div>
          <button
            className="mt-3 px-4 py-1.5 rounded-md text-sm font-semibold flex items-center gap-2 transition-all"
            style={{ background: "var(--oxblood)", color: "#fff", fontFamily: "'Oswald'" }}
          >
            <Icon name="Play" size={14} />
            Играть сейчас
          </button>
        </div>
      </div>
      <div className="flex gap-2 px-4 pb-4">
        {POPULAR_GAMES.map((game, i) => (
          <button
            key={game.id}
            onClick={() => setActive(i)}
            className="flex-1 rounded-md p-2 text-center text-xs font-medium transition-all"
            style={{
              background: active === i ? "var(--oxblood)" : "var(--ink-lift)",
              color: active === i ? "#fff" : "#888",
              border: `1px solid ${active === i ? "var(--oxblood)" : "var(--hairline)"}`,
              fontFamily: "'Oswald'",
            }}
          >
            <div style={{ fontSize: 16 }}>{game.emoji}</div>
            <div className="mt-0.5 truncate">{game.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const Index = () => {
  const [activePage, setActivePage]         = useState("home");
  const [searchQuery, setSearchQuery]       = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag]           = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen]       = useState(true);
  const [chatOpen, setChatOpen]             = useState(false);
  const [chatMsg, setChatMsg]               = useState("");
  const [chatMessages, setChatMessages]     = useState([
    { id: 1, user: "Алекс", text: "Кто в Arena Fight играет?",  time: "14:22", self: false },
    { id: 2, user: "Маша",  text: "Я! Уже 3 часа сижу 😄",     time: "14:23", self: false },
    { id: 3, user: "Вы",    text: "Присоединяюсь!",             time: "14:24", self: true  },
  ]);

  const currentNavItem = NAV_ITEMS.find(n => n.id === activePage);

  const filteredGames = GAME_CARDS.filter(g => {
    const q = searchQuery.toLowerCase();
    const matchSearch   = !q || g.title.toLowerCase().includes(q) || g.category.toLowerCase().includes(q);
    const matchCategory = !activeCategory || g.category === CATEGORIES.find(c => c.id === activeCategory)?.label;
    return matchSearch && matchCategory;
  });

  function sendChat() {
    if (!chatMsg.trim()) return;
    setChatMessages(prev => [...prev, {
      id: Date.now(),
      user: "Вы",
      text: chatMsg,
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      self: true,
    }]);
    setChatMsg("");
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--paper)" }}>
      <div className="flex h-full" style={{ maxWidth: 1080, margin: "0 auto", flex: 1, minWidth: 0 }}>

      {/* ── SIDEBAR ─────────────────────────────────────────────── */}
      <aside
        className="flex flex-col shrink-0 transition-all duration-300"
        style={{
          width: sidebarOpen ? 220 : 64,
          background: "var(--ink)",
          borderRight: "1px solid var(--hairline)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: "1px solid var(--hairline)" }}>
          <div
            className="shrink-0 flex items-center justify-center rounded-md font-bold"
            style={{
              width: 36, height: 36,
              background: "var(--oxblood)",
              color: "#fff",
              fontFamily: "'Oswald'",
              fontSize: 16,
              boxShadow: "0 0 0 0 rgba(229,23,63,0.4)",
              animation: "pulse-red 2s ease-in-out infinite",
            }}
          >
            GH
          </div>
          {sidebarOpen && (
            <div style={{ overflow: "hidden" }}>
              <div className="text-base font-bold leading-none" style={{ color: "var(--paper)", fontFamily: "'Oswald'", letterSpacing: "0.05em" }}>
                GAMEHUB
              </div>
              <div className="text-xs mt-0.5" style={{ color: "#666" }}>
                {currentNavItem?.label ?? "Платформа"}
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all"
              style={{
                background: activePage === item.id ? "var(--oxblood)" : "transparent",
                color: activePage === item.id ? "#fff" : "#888",
              }}
            >
              <Icon name={item.icon} size={18} />
              {sidebarOpen && <span className="text-sm font-medium truncate">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-2 pb-4 space-y-1" style={{ borderTop: "1px solid var(--hairline)", paddingTop: 12 }}>
          {[
            { icon: "Download", label: "Скачать" },
            { icon: "Settings", label: "Настройки" },
          ].map(item => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all"
              style={{ color: "#888" }}
            >
              <Icon name={item.icon} size={18} />
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all"
            style={{ color: "#888" }}
            onClick={() => setSidebarOpen(v => !v)}
          >
            <Icon name={sidebarOpen ? "ChevronLeft" : "ChevronRight"} size={18} />
            {sidebarOpen && <span className="text-sm">Свернуть</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN ────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header
          className="flex items-center gap-4 px-6 py-3 shrink-0"
          style={{ background: "var(--ink-soft)", borderBottom: "1px solid var(--hairline)" }}
        >
          {/* Search */}
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background: "var(--ink-lift)", border: "1px solid var(--hairline)", flex: "1 1 0", maxWidth: 480 }}
          >
            <Icon name="Search" size={16} style={{ color: "#666" }} />
            <input
              type="text"
              placeholder="Поиск игр, жанров..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "var(--paper)", fontFamily: "'Golos Text'" }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <Icon name="X" size={14} style={{ color: "#666" }} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* XP Bar */}
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-1.5"
              style={{ background: "var(--ink-lift)", border: "1px solid var(--hairline)" }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: "var(--oxblood)", animation: "pulse-red 2s ease-in-out infinite" }} />
              <span className="text-xs font-semibold" style={{ color: "var(--paper)", fontFamily: "'Oswald'", letterSpacing: "0.05em" }}>
                1 240 XP
              </span>
            </div>

            {/* Chat button */}
            <button
              onClick={() => setChatOpen(v => !v)}
              className="relative flex items-center justify-center w-9 h-9 rounded-lg transition-all"
              style={{
                background: chatOpen ? "var(--oxblood)" : "var(--ink-lift)",
                border: "1px solid var(--hairline)",
                color: "#fff",
              }}
            >
              <Icon name="MessageCircle" size={16} />
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center font-bold"
                style={{ background: "var(--oxblood)", color: "#fff", fontSize: 9 }}
              >
                3
              </span>
            </button>

            {/* Add game */}
            <button
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all"
              style={{ background: "var(--oxblood)", color: "#fff", fontFamily: "'Oswald'", letterSpacing: "0.04em" }}
            >
              <Icon name="Plus" size={14} />
              Добавить игру
            </button>

            {/* Profile */}
            <button
              className="flex items-center gap-2 rounded-lg px-2 py-1 transition-all"
              style={{ background: "var(--ink-lift)", border: "1px solid var(--hairline)" }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: "var(--oxblood)", color: "#fff", fontFamily: "'Oswald'" }}
              >
                А
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-medium" style={{ color: "var(--paper)" }}>Алексей</div>
                <div className="text-xs" style={{ color: "#666" }}>Уровень 12</div>
              </div>
              <Icon name="ChevronDown" size={14} style={{ color: "#666" }} />
            </button>
          </div>
        </header>

        {/* Content + Chat */}
        <div className="flex flex-1 overflow-hidden">

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

            {/* Popular Slider */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold" style={{ color: "var(--ink)", fontFamily: "'Oswald'" }}>
                  🔥 Популярные игры
                </h2>
                <button className="text-xs font-medium" style={{ color: "var(--oxblood)" }}>
                  Смотреть все →
                </button>
              </div>
              <PopularSlider />
            </section>

            {/* Categories */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold" style={{ color: "var(--ink)", fontFamily: "'Oswald'" }}>
                  Категории
                </h2>
                <button className="text-xs font-medium" style={{ color: "var(--oxblood)" }}>
                  Все категории →
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 lg:grid-cols-8">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                    className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg transition-all"
                    style={{
                      background: activeCategory === cat.id ? "var(--oxblood)" : "var(--ink-soft)",
                      border: `1px solid ${activeCategory === cat.id ? "var(--oxblood)" : "var(--hairline)"}`,
                      color: activeCategory === cat.id ? "#fff" : "#888",
                    }}
                  >
                    <Icon name={cat.icon} size={20} />
                    <span className="text-xs font-medium text-center leading-tight">{cat.label}</span>
                    <span className="text-xs" style={{ color: activeCategory === cat.id ? "rgba(255,255,255,0.7)" : "#555" }}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Tags */}
            <section>
              <h2 className="text-xs font-semibold mb-2" style={{ color: "#888", fontFamily: "'Oswald'", letterSpacing: "0.06em" }}>
                ТЕГИ
              </h2>
              <div className="flex flex-wrap gap-2">
                {TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: activeTag === tag ? "var(--oxblood)" : "transparent",
                      color: activeTag === tag ? "#fff" : "#888",
                      border: `1px solid ${activeTag === tag ? "var(--oxblood)" : "var(--hairline)"}`,
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </section>

            {/* Games Grid */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold" style={{ color: "var(--ink)", fontFamily: "'Oswald'" }}>
                  {activeCategory
                    ? CATEGORIES.find(c => c.id === activeCategory)?.label
                    : searchQuery
                      ? `Результаты: «${searchQuery}»`
                      : "Все игры"}
                  <span className="ml-2 text-sm font-normal" style={{ color: "#888" }}>
                    {filteredGames.length} игр
                  </span>
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded"
                    style={{ color: "#888", border: "1px solid var(--hairline)", background: "var(--ink-soft)" }}
                  >
                    <Icon name="ArrowUpDown" size={12} />
                    По рейтингу
                  </button>
                  <button
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded"
                    style={{ color: "#888", border: "1px solid var(--hairline)", background: "var(--ink-soft)" }}
                  >
                    <Icon name="SlidersHorizontal" size={12} />
                    Фильтры
                  </button>
                </div>
              </div>

              {filteredGames.length === 0 ? (
                <div className="py-16 text-center" style={{ color: "#666" }}>
                  <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Игры не найдены</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredGames.map((game, i) => (
                    <GameCard key={game.id} game={game} delay={i * 50} />
                  ))}
                </div>
              )}
            </section>

            <div className="h-6" />
          </div>

          {/* ── CHAT PANEL ──────────────────────────────────────── */}
          {chatOpen && (
            <aside
              className="flex flex-col shrink-0"
              style={{
                width: 280,
                background: "var(--ink)",
                borderLeft: "1px solid var(--hairline)",
              }}
            >
              {/* Chat header */}
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--hairline)" }}>
                <div>
                  <div className="text-sm font-bold" style={{ color: "var(--paper)", fontFamily: "'Oswald'" }}>
                    Общий чат
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: "#4CAF50" }} />
                    <span className="text-xs" style={{ color: "#888" }}>247 онлайн</span>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} style={{ color: "#888" }}>
                  <Icon name="X" size={16} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`flex flex-col ${msg.self ? "items-end" : "items-start"}`}>
                    {!msg.self && (
                      <span className="text-xs mb-1 ml-1" style={{ color: "var(--oxblood)", fontFamily: "'Oswald'" }}>
                        {msg.user}
                      </span>
                    )}
                    <div
                      className="px-3 py-2 rounded-lg text-sm"
                      style={{
                        maxWidth: "90%",
                        background: msg.self ? "var(--oxblood)" : "var(--ink-lift)",
                        color: msg.self ? "#fff" : "var(--paper)",
                        border: msg.self ? "none" : "1px solid var(--hairline)",
                      }}
                    >
                      {msg.text}
                    </div>
                    <span className="text-xs mt-1 mx-1" style={{ color: "#555" }}>{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3" style={{ borderTop: "1px solid var(--hairline)" }}>
                <div
                  className="flex items-center gap-2 rounded-lg px-3 py-2"
                  style={{ background: "var(--ink-lift)", border: "1px solid var(--hairline)" }}
                >
                  <input
                    type="text"
                    placeholder="Написать..."
                    value={chatMsg}
                    onChange={e => setChatMsg(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendChat()}
                    className="flex-1 bg-transparent outline-none text-sm"
                    style={{ color: "var(--paper)", fontFamily: "'Golos Text'" }}
                  />
                  <button onClick={sendChat} style={{ color: "var(--oxblood)" }}>
                    <Icon name="Send" size={16} />
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>
      </div>
    </div>
  );
};

export default Index;