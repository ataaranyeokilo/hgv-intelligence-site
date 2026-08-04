import {
  HERO_MOCK_BASE,
  HERO_TREND_LINE_POINTS,
  HERO_TREND_MONTHS,
} from "@/components/sections/home/home-hero-mock-data";

const TREND_BLUE = "#587db5";
const TREND_LABEL = "#8fa4bc";
const CHART_HEIGHT = 40;

type HomeHeroMarketTrendCardProps = {
  className?: string;
};

function parseTrendPoints(points: string) {
  return points.split(" ").map((pair) => {
    const [x, y] = pair.split(",").map(Number);
    return { x, y };
  });
}

const trendPoints = parseTrendPoints(HERO_TREND_LINE_POINTS);
const trendFillPoints = `${HERO_TREND_LINE_POINTS} 200,${CHART_HEIGHT} 0,${CHART_HEIGHT}`;
const lastPoint = trendPoints[trendPoints.length - 1];

export function HomeHeroMarketTrendCard({
  className = "",
}: HomeHeroMarketTrendCardProps) {
  return (
    <div
      className={`flex items-end gap-4 sm:gap-5 ${className}`.trim()}
      aria-hidden
    >
      <div className="w-[min(100%,19rem)] shrink-0 rounded-md border border-neutral-200 bg-white px-3 pb-2 pt-2.5 shadow-sm">
        <p
          className="text-[9px] font-semibold uppercase tracking-wide"
          style={{ color: TREND_LABEL }}
        >
          New Operator Licences (12 months)
        </p>
        <svg viewBox="0 0 200 44" className="mt-2 h-[3.25rem] w-full" aria-hidden>
          <defs>
            <linearGradient
              id="heroMarketTrendFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={TREND_BLUE} stopOpacity="0.28" />
              <stop offset="100%" stopColor={TREND_BLUE} stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {[8, 16, 24, 32].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="200"
              y2={y}
              stroke="#eceef1"
              strokeWidth="0.75"
            />
          ))}
          <polygon points={trendFillPoints} fill="url(#heroMarketTrendFill)" />
          <polyline
            points={HERO_TREND_LINE_POINTS}
            fill="none"
            stroke={TREND_BLUE}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r="3.5"
            fill={TREND_BLUE}
            stroke="#fff"
            strokeWidth="1.5"
          />
        </svg>
        <div className="mt-0.5 flex justify-between text-[7px] uppercase tracking-wide text-neutral-400">
          {HERO_TREND_MONTHS.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>

      <div className="min-w-[6.5rem] shrink-0 pb-0.5">
        <p
          className="text-[1.75rem] font-semibold leading-none tabular-nums"
          style={{ color: TREND_BLUE }}
        >
          +{HERO_MOCK_BASE.trendPercent}%
          <span className="ml-0.5 text-lg" aria-hidden>
            ↗
          </span>
        </p>
        <p className="mt-1 text-xs text-neutral-500">vs last 12 months</p>
        <p className="mt-3 font-mono text-[11px] leading-snug text-neutral-800">
          52.4862° N, 1.8904° W
        </p>
        <p className="mt-2.5 text-[9px] uppercase tracking-[0.2em] text-neutral-400">
          Data • Signal • Intelligence
        </p>
      </div>
    </div>
  );
}
