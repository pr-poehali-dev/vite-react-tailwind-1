import { useState } from "react";
import Icon from "@/components/ui/icon";

type Game = {
  id: number;
  title: string;
  author: string;
  genre: string;
  plays: string;
  liked: boolean;
  span: "tall" | "wide" | "normal" | "large";
  color: string;
  emoji: string;
};

const GAMES: Game[] = [
  { id: 1,  title: "Neon Snake",        author: "pixelkid",    genre: "Аркада",      plays: "12K", liked: false, span: "tall",   color: "#e8f4f8", emoji: "🐍" },
  { id: 2,  title: "Tower Defense X",   author: "strateg42",   genre: "Стратегия",   plays: "8K",  liked: true,  span: "normal", color: "#f0f0e8", emoji: "🏰" },
  { id: 3,  title: "Pixel Racer",       author: "motodev",     genre: "Гонки",       plays: "34K", liked: false, span: "wide",   color: "#f8f0e8", emoji: "🏎️" },
  { id: 4,  title: "Zombie Horde",      author: "darkcode",    genre: "Экшн",        plays: "21K", liked: true,  span: "large",  color: "#f0e8f0", emoji: "🧟" },
  { id: 5,  title: "Chess Blitz",       author: "gmmaster",    genre: "Настольная",  plays: "55K", liked: false, span: "normal", color: "#e8f0e8", emoji: "♟️" },
  { id: 6,  title: "Bubble Pop",        author: "funstudio",   genre: "Головоломка", plays: "7K",  liked: false, span: "tall",   color: "#f8e8f0", emoji: "🫧" },
  { id: 7,  title: "Space Invaders 2",  author: "retrodev",    genre: "Шутер",       plays: "18K", liked: true,  span: "normal", color: "#e8f8f0", emoji: "👾" },
  { id: 8,  title: "Fruit Ninja Web",   author: "slashme",     genre: "Аркада",      plays: "9K",  liked: false, span: "wide",   color: "#fff0e0", emoji: "🍉" },
  { id: 9,  title: "Dungeon Crawler",   author: "rpgfan",      genre: "РПГ",         plays: "3K",  liked: false, span: "normal", color: "#f0f8ff", emoji: "🐉" },
  { id: 10, title: "Flappy Clone",      author: "copykid",     genre: "Аркада",      plays: "42K", liked: true,  span: "tall",   color: "#fffbe8", emoji: "🐦" },
  { id: 11, title: "Memory Match",      author: "braindev",    genre: "Головоломка", plays: "6K",  liked: false, span: "normal", color: "#f0f0ff", emoji: "🃏" },
  { id: 12, title: "Mini Golf",         author: "sportcoder",  genre: "Спорт",       plays: "11K", liked: false, span: "large",  color: "#e8ffe8", emoji: "⛳" },
  { id: 13, title: "Tetris Ultra",      author: "blockbuild",  genre: "Головоломка", plays: "88K", liked: true,  span: "normal", color: "#f8f0ff", emoji: "🟦" },
  { id: 14, title: "Angry Birds JS",    author: "slingshoter", genre: "Физика",      plays: "23K", liked: false, span: "wide",   color: "#fff0f0", emoji: "🐥" },
  { id: 15, title: "2048 Pro",          author: "numberdev",   genre: "Головоломка", plays: "65K", liked: false, span: "normal", color: "#f5f5dc", emoji: "🔢" },
  { id: 16, title: "Platformer Zero",   author: "jumpking",    genre: "Платформер",  plays: "4K",  liked: true,  span: "tall",   color: "#e8f4e8", emoji: "🦘" },
];

const NAV_TOP = [
  { id: "explore",  label: "Исследовать", icon: "Compass"  },
  { id: "play",     label: "Играть",      icon: "Play"     },
  { id: "add",      label: "Добавить",    icon: "Plus"     },
  { id: "favorite", label: "Избранное",   icon: "Heart"    },
];

const NAV_SECTIONS = [
  {
    title: "ЖАНРЫ",
    items: [
      { id: "arcade",   label: "Аркады",      icon: "Gamepad2"  },
      { id: "puzzle",   label: "Головоломки", icon: "Puzzle"    },
      { id: "strategy", label: "Стратегии",   icon: "Brain"     },
      { id: "action",   label: "Экшн",        icon: "Swords"    },
    ],
  },
  {
    title: "СООБЩЕСТВО",
    items: [
      { id: "top",    label: "Топ недели", icon: "TrendingUp"    },
      { id: "new",    label: "Новинки",    icon: "Sparkles"      },
      { id: "chat",   label: "Чат",        icon: "MessageCircle" },
    ],
  },
];

const NAV_BOTTOM = [
  { id: "help",     label: "Помощь",       icon: "HelpCircle" },
  { id: "updates",  label: "Обновления",   icon: "Bell"       },
  { id: "settings", label: "Настройки",    icon: "Settings"   },
  { id: "account",  label: "Мой аккаунт", icon: "User"       },
];

const TABS = ["Лучшее", "Новинки", "Лайки"];
const GENRES = ["Все", "Аркада", "Головоломка", "Экшн", "Стратегия", "Гонки", "РПГ", "Шутер", "Спорт"];

function cardHeight(span: Game["span"]) {
  return { tall: 380, wide: 220, normal: 260, large: 320 }[span];
}

function GameCard({ game, delay }: { game: Game; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(game.liked);
  const h = cardHeight(game.span);

  return (
    <div
      className="masonry-item rounded-xl overflow-hidden cursor-pointer animate-fade-up"
      style={{ animationDelay: `${delay}ms`, boxShadow: hovered ? "0 4px 20px rgba(0,0,0,0.09)" : "0 1px 4px rgba(0,0,0,0.05)", transition: "box-shadow 0.2s" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ height: h, background: game.color, transition: "filter 0.2s", filter: hovered ? "brightness(0.93)" : "brightness(1)" }}
      >
        <span style={{ fontSize: h * 0.36, lineHeight: 1, transition: "transform 0.2s", transform: hovered ? "scale(1.1)" : "scale(1)" }}>
          {game.emoji}
        </span>

        {hovered && (
          <div className="absolute inset-0 flex flex-col justify-between p-3">
            <div className="flex justify-end">
              <button
                onClick={e => { e.stopPropagation(); setLiked(v => !v); }}
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.85)" }}
              >
                <Icon name="Heart" size={13} style={{ color: liked ? "#e53e3e" : "#999", fill: liked ? "#e53e3e" : "none" }} />
              </button>
            </div>
            <button
              className="w-full py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            >
              ▶ Играть
            </button>
          </div>
        )}

        {liked && !hovered && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.8)" }}>
            <Icon name="Heart" size={11} style={{ color: "#e53e3e", fill: "#e53e3e" }} />
          </div>
        )}
      </div>

      <div className="bg-white px-3 py-2 border-t border-gray-100">
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{game.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">@{game.author} · {game.genre}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0 pt-0.5">
            <Icon name="Play" size={10} style={{ color: "#ccc" }} />
            <span className="text-xs text-gray-400">{game.plays}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const Index = () => {
  const [activeNav, setActiveNav]     = useState("explore");
  const [activeTab, setActiveTab]     = useState("Лучшее");
  const [activeGenre, setActiveGenre] = useState("Все");
  const [search, setSearch]           = useState("");

  const filteredGames = GAMES.filter(g => {
    const q = search.toLowerCase();
    const matchSearch = !q || g.title.toLowerCase().includes(q) || g.genre.toLowerCase().includes(q) || g.author.toLowerCase().includes(q);
    const matchGenre  = activeGenre === "Все" || g.genre === activeGenre;
    return matchSearch && matchGenre;
  });

  function NavBtn({ item }: { item: { id: string; label: string; icon: string } }) {
    const active = activeNav === item.id;
    return (
      <button
        onClick={() => setActiveNav(item.id)}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all"
        style={{
          background: active ? "#fff0f0" : "transparent",
          color: active ? "#e53e3e" : "#555",
          fontWeight: active ? 600 : 400,
        }}
      >
        <Icon name={item.icon} size={16} />
        {item.label}
      </button>
    );
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">

      {/* ── SIDEBAR ───────────────────────────────────────────── */}
      <aside className="flex flex-col h-full shrink-0 overflow-y-auto" style={{ width: 240, borderRight: "1px solid #f0f0f0" }}>
        <div className="px-4 py-5">
          <span className="text-base font-bold text-gray-900">🎮 GameHub</span>
        </div>

        <nav className="px-2 space-y-0.5">
          {NAV_TOP.map(item => <NavBtn key={item.id} item={item} />)}
        </nav>

        {NAV_SECTIONS.map(section => (
          <div key={section.title} className="mt-4 px-2">
            <p className="px-3 mb-1 text-xs font-semibold text-gray-300 tracking-widest">{section.title}</p>
            <div className="space-y-0.5">
              {section.items.map(item => <NavBtn key={item.id} item={item} />)}
            </div>
          </div>
        ))}

        <div className="flex-1" />

        <div className="px-2 pb-4 space-y-0.5 border-t border-gray-100 pt-3 mt-3">
          {NAV_BOTTOM.map(item => <NavBtn key={item.id} item={item} />)}
        </div>
      </aside>

      {/* ── CONTENT ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 shrink-0">
          <div
            className="flex-1 flex items-center gap-2 rounded-xl px-4 py-2.5"
            style={{ background: "#f7f7f7", border: "1px solid #ebebeb" }}
          >
            <Icon name="Search" size={15} style={{ color: "#ccc" }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Найти игру, автора или жанр..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-300"
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <Icon name="X" size={13} style={{ color: "#ccc" }} />
              </button>
            )}
          </div>

          <button
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0"
            style={{ background: "#e53e3e" }}
          >
            <Icon name="Upload" size={14} />
            Добавить игру
          </button>

          <button className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#f7f7f7", border: "1px solid #ebebeb" }}>
            <Icon name="Bell" size={16} style={{ color: "#aaa" }} />
          </button>

          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer shrink-0" style={{ background: "#e53e3e" }}>
            А
          </div>
        </header>

        {/* Tabs */}
        <div className="px-5 pt-4 pb-0 shrink-0">
          <div className="flex items-center gap-6">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="text-sm font-semibold pb-3 border-b-2 transition-all"
                style={{
                  borderColor: activeTab === tab ? "#e53e3e" : "transparent",
                  color: activeTab === tab ? "#1a1a1a" : "#bbb",
                }}
              >
                {tab}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2 pb-3">
              {[
                { label: "Стили",  icon: "Palette"  },
                { label: "Игры",   icon: "Gamepad2" },
                { label: "Видео",  icon: "Film"     },
              ].map(f => (
                <button
                  key={f.label}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all"
                  style={{ background: "white", borderColor: "#e8e8e8", color: "#777" }}
                >
                  <Icon name={f.icon} size={12} />
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Genre filters */}
          <div className="flex flex-wrap gap-2 py-3 border-t border-gray-100">
            {GENRES.map(g => (
              <button
                key={g}
                onClick={() => setActiveGenre(g)}
                className="px-3 py-1 rounded-full text-xs font-medium border transition-all"
                style={{
                  background: activeGenre === g ? "#e53e3e" : "white",
                  borderColor: activeGenre === g ? "#e53e3e" : "#e8e8e8",
                  color: activeGenre === g ? "white" : "#666",
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {filteredGames.length === 0 ? (
            <div className="py-20 text-center">
              <Icon name="SearchX" size={36} className="mx-auto mb-3" style={{ color: "#ddd" }} />
              <p className="text-sm text-gray-400">Игры не найдены</p>
            </div>
          ) : (
            <div className="masonry">
              {filteredGames.map((game, i) => (
                <GameCard key={game.id} game={game} delay={i * 35} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;