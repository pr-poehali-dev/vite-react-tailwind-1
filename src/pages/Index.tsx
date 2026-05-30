import { useState } from "react";
import Icon from "@/components/ui/icon";

// ── Mock Data ──────────────────────────────────────────────────────────────
type Game = {
  id: number;
  title: string;
  emoji: string;
  color: string;
  h: number; // height px
};

// Группы как в Midjourney — по 3 изображения на группу
const GROUPS: Game[][] = [
  [
    { id: 1,  title: "Neon Snake",       emoji: "🐍", color: "#d4e8d0", h: 200 },
    { id: 2,  title: "Cactus World",     emoji: "🌵", color: "#e8d4c0", h: 200 },
    { id: 3,  title: "Cup Runner",       emoji: "☕", color: "#c8d8e8", h: 200 },
    { id: 4,  title: "Pixel Face",       emoji: "👤", color: "#e0d0c8", h: 200 },
  ],
  [
    { id: 5,  title: "Zombie Horde",     emoji: "🧟", color: "#d8e4d0", h: 260 },
    { id: 6,  title: "Bubble Pop",       emoji: "🫧", color: "#b8d8e8", h: 260 },
    { id: 7,  title: "Cherry Plates",    emoji: "🍒", color: "#c0d8f0", h: 260 },
  ],
  [
    { id: 8,  title: "Space Shooter",    emoji: "👾", color: "#f0e8d0", h: 230 },
    { id: 9,  title: "Sticker Quest",    emoji: "🌈", color: "#e8d4c0", h: 230 },
    { id: 10, title: "Fruit Ninja",      emoji: "🍉", color: "#d0e8d8", h: 230 },
  ],
  [
    { id: 11, title: "Ink Warrior",      emoji: "🖋️", color: "#e8e8e8", h: 250 },
    { id: 12, title: "Desert Dash",      emoji: "🏜️", color: "#f0e0c8", h: 250 },
    { id: 13, title: "Plant Shop",       emoji: "🌿", color: "#d0e8c8", h: 250 },
  ],
  [
    { id: 14, title: "Chess Blitz",      emoji: "♟️", color: "#d8e8f0", h: 220 },
    { id: 15, title: "Mini Golf",        emoji: "⛳", color: "#c8f0d0", h: 220 },
    { id: 16, title: "Tetris Ultra",     emoji: "🟦", color: "#e0d0f0", h: 220 },
  ],
  [
    { id: 17, title: "Flappy Clone",     emoji: "🐦", color: "#f8f0c0", h: 240 },
    { id: 18, title: "Angry Birds JS",   emoji: "🐥", color: "#ffe0e0", h: 240 },
    { id: 19, title: "Dragon Quest",     emoji: "🐉", color: "#e8d8f0", h: 240 },
  ],
];

const NAV_MAIN = [
  { id: "explore",  label: "Исследовать", icon: "Compass"  },
  { id: "create",   label: "Создать",     icon: "Plus"     },
  { id: "edit",     label: "Редактировать",icon: "Pencil"  },
  { id: "organize", label: "Организовать",icon: "Grid3x3"  },
];

const NAV_AESTHETIC = [
  { id: "personal", label: "Персонализация",   icon: "User"       },
  { id: "boards",   label: "Доски настроения", icon: "LayoutGrid" },
  { id: "style",    label: "Создатель стиля",  icon: "Wand2"      },
];

const NAV_COMMUNITY = [
  { id: "tasks",    label: "Задачи",    icon: "CheckSquare" },
  { id: "sub",      label: "Подписка",  icon: "Star"        },
];

const NAV_BOTTOM = [
  { id: "help",     label: "Справка",        icon: "HelpCircle" },
  { id: "updates",  label: "Обновления",     icon: "Bell"       },
  { id: "theme",    label: "Световой режим", icon: "Sun"        },
  { id: "account",  label: "Мой аккаунт",   icon: "User"       },
];

const TABS = ["Лучший день", "Лайки"];
const VIEW_BTNS = [
  { label: "Стили",      icon: "Palette"  },
  { label: "Изображения",icon: "Image"    },
  { label: "Видео",      icon: "Film"     },
];

// ── Group Card ─────────────────────────────────────────────────────────────
function GameGroup({ group, delay }: { group: Game[]; delay: number }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Layout: 4 images → 2+2 grid; 3 images → 1 big + 2 stacked
  const is4 = group.length === 4;

  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        animationDelay: `${delay}ms`,
        animation: "fade-up 0.35s ease both",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      }}
    >
      {is4 ? (
        // 2×2 grid
        <div className="grid grid-cols-2 gap-0.5 bg-gray-200">
          {group.map(g => (
            <div
              key={g.id}
              className="relative flex items-center justify-center"
              style={{ height: g.h, background: g.color }}
              onMouseEnter={() => setHoveredId(g.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <span style={{ fontSize: g.h * 0.3, lineHeight: 1, transition: "transform 0.2s", transform: hoveredId === g.id ? "scale(1.08)" : "scale(1)" }}>
                {g.emoji}
              </span>
              {hoveredId === g.id && (
                <div className="absolute inset-0 flex items-end justify-center pb-3" style={{ background: "rgba(0,0,0,0.08)" }}>
                  <button className="px-4 py-1.5 rounded-full text-xs font-semibold text-white" style={{ background: "rgba(0,0,0,0.55)" }}>
                    ▶ Играть
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // 1 big left + 2 stacked right
        <div className="flex gap-0.5 bg-gray-200">
          <div
            className="relative flex items-center justify-center flex-1"
            style={{ height: group[0].h, background: group[0].color }}
            onMouseEnter={() => setHoveredId(group[0].id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <span style={{ fontSize: group[0].h * 0.32, lineHeight: 1, transition: "transform 0.2s", transform: hoveredId === group[0].id ? "scale(1.08)" : "scale(1)" }}>
              {group[0].emoji}
            </span>
            {hoveredId === group[0].id && (
              <div className="absolute inset-0 flex items-end justify-center pb-3" style={{ background: "rgba(0,0,0,0.08)" }}>
                <button className="px-4 py-1.5 rounded-full text-xs font-semibold text-white" style={{ background: "rgba(0,0,0,0.55)" }}>▶ Играть</button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            {group.slice(1).map(g => (
              <div
                key={g.id}
                className="relative flex items-center justify-center"
                style={{ height: group[0].h / 2 - 0.5, background: g.color }}
                onMouseEnter={() => setHoveredId(g.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <span style={{ fontSize: (group[0].h / 2) * 0.28, lineHeight: 1, transition: "transform 0.2s", transform: hoveredId === g.id ? "scale(1.08)" : "scale(1)" }}>
                  {g.emoji}
                </span>
                {hoveredId === g.id && (
                  <div className="absolute inset-0 flex items-end justify-center pb-2" style={{ background: "rgba(0,0,0,0.08)" }}>
                    <button className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "rgba(0,0,0,0.55)" }}>▶</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom bar like MJ */}
      <div className="flex items-center justify-between px-3 py-2 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs">🎮</div>
          <span className="text-xs text-gray-500">{group[0].title} и ещё {group.length - 1}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <Icon name="Heart" size={14} style={{ color: "#ccc" }} />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Icon name="Share2" size={14} style={{ color: "#ccc" }} />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Icon name="MoreHorizontal" size={14} style={{ color: "#ccc" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
const Index = () => {
  const [activeNav, setActiveNav] = useState("explore");
  const [activeTab, setActiveTab] = useState("Лучший день");
  const [activeView, setActiveView] = useState("Стили");

  function NavBtn({ item }: { item: { id: string; label: string; icon: string } }) {
    const active = activeNav === item.id;
    return (
      <button
        onClick={() => setActiveNav(item.id)}
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all text-left"
        style={{
          background: active ? "#fff0f0" : "transparent",
          color: active ? "#e53e3e" : "#374151",
          fontWeight: active ? 600 : 400,
        }}
      >
        <Icon name={item.icon} size={16} style={{ color: active ? "#e53e3e" : "#9ca3af" }} />
        {item.label}
      </button>
    );
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* ── SIDEBAR ───────────────────────────────────────────────── */}
      <aside
        className="flex flex-col h-full shrink-0 overflow-y-auto"
        style={{ width: 210, borderRight: "1px solid #f3f4f6" }}
      >
        {/* Logo */}
        <div className="px-4 pt-5 pb-3">
          <span className="text-base font-bold text-gray-900">Миджурни</span>
        </div>

        {/* Main nav */}
        <nav className="px-2 space-y-0.5">
          {NAV_MAIN.map(item => <NavBtn key={item.id} item={item} />)}
        </nav>

        {/* Эстетика */}
        <div className="mt-4 px-2">
          <p className="px-3 py-1 text-xs font-semibold text-gray-400 tracking-wider uppercase">Эстетика</p>
          <div className="space-y-0.5">
            {NAV_AESTHETIC.map(item => <NavBtn key={item.id} item={item} />)}
          </div>
        </div>

        {/* Сообщество */}
        <div className="mt-4 px-2">
          <p className="px-3 py-1 text-xs font-semibold text-gray-400 tracking-wider uppercase">Сообщество</p>
          <div className="space-y-0.5">
            {NAV_COMMUNITY.map(item => <NavBtn key={item.id} item={item} />)}
          </div>
        </div>

        <div className="flex-1" />

        {/* Bottom */}
        <div className="px-2 pb-3 space-y-0.5" style={{ borderTop: "1px solid #f3f4f6", paddingTop: 8 }}>
          {NAV_BOTTOM.map(item => <NavBtn key={item.id} item={item} />)}
        </div>
      </aside>

      {/* ── RIGHT SIDE ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar — строка поиска на всю ширину как в MJ */}
        <div className="px-5 py-3 flex items-center gap-3" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div
            className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
          >
            <Icon name="PlusCircle" size={18} style={{ color: "#d1d5db" }} />
            <input
              placeholder="Подпишитесь, чтобы начать создавать..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-400 placeholder-gray-400"
              readOnly
            />
            <Icon name="SlidersHorizontal" size={18} style={{ color: "#d1d5db" }} />
          </div>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-xl shrink-0"
            style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
          >
            <Icon name="Zap" size={18} style={{ color: "#d1d5db" }} />
          </button>
        </div>

        {/* Tabs + View switcher */}
        <div className="flex items-center justify-between px-5 pt-4 pb-0 shrink-0">
          {/* Tabs */}
          <div className="flex items-center gap-6">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="text-sm pb-3 border-b-2 transition-all"
                style={{
                  borderColor: activeTab === tab ? "#111827" : "transparent",
                  color: activeTab === tab ? "#111827" : "#9ca3af",
                  fontWeight: activeTab === tab ? 600 : 400,
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* View buttons — как в MJ: Стили / Изображения / Видео */}
          <div className="flex items-center gap-2 pb-3">
            {VIEW_BTNS.map(v => (
              <button
                key={v.label}
                onClick={() => setActiveView(v.label)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                style={{
                  background: activeView === v.label ? "#fff0f0" : "white",
                  borderColor: activeView === v.label ? "#e53e3e" : "#e5e7eb",
                  color: activeView === v.label ? "#e53e3e" : "#6b7280",
                }}
              >
                <Icon name={v.icon} size={13} />
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#f3f4f6", margin: "0 20px" }} />

        {/* Gallery — 3 колонки групп как в MJ */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div style={{ columns: 3, columnGap: 12 }}>
            {GROUPS.map((group, i) => (
              <div key={i} style={{ breakInside: "avoid", marginBottom: 12 }}>
                <GameGroup group={group} delay={i * 60} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
