import type { Entry } from "@/content/schema";
import {
  confidenceNote,
  formatMeasure,
  isMeasure,
  labelFor,
} from "@/lib/format";
import type { Measure } from "@/content/schema";

export function MeasureValue({ m }: { m: Measure }) {
  return (
    <span
      className={`tabular conf-${m.confidence}`}
      title={confidenceNote(m)}
      aria-label={`${formatMeasure(m)}. ${confidenceNote(m)}`}
    >
      {formatMeasure(m)}
      {m.confidence === "estimated" && (
        <span className="text-signal ml-1" aria-hidden>
          ~
        </span>
      )}
    </span>
  );
}

function SpecValue({ value }: { value: unknown }) {
  if (isMeasure(value)) return <MeasureValue m={value} />;

  if (Array.isArray(value)) {
    return (
      <ul className="flex flex-col gap-1">
        {value.map((v, i) => (
          <li key={i}>{String(v)}</li>
        ))}
      </ul>
    );
  }

  if (typeof value === "number") {
    return <span className="tabular">{value}</span>;
  }

  return <span>{String(value)}</span>;
}

/**
 * Renders whichever spec block the entry carries. Because every block is a flat
 * object of known field types, one component covers every category — and the
 * same iteration is what the comparison table will reuse.
 */
export function SpecTable({ entry }: { entry: Entry }) {
  const specs = entry.specs;

  // The generic block is a label/value list rather than named fields.
  if ("fields" in specs) {
    return (
      <dl className="divide-y divide-rule-soft border-y border-rule">
        {specs.fields.map((f, i) => (
          <div key={i} className="grid grid-cols-[minmax(0,10rem)_1fr] gap-4 py-3">
            <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3 pt-0.5">
              {f.label}
            </dt>
            <dd className="text-[15px]">
              {f.value}
              {f.note && (
                <span className="block text-ink-3 text-[13px] mt-0.5">{f.note}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  const rows = Object.entries(specs).filter(([key]) => key !== "category");

  return (
    <dl className="divide-y divide-rule-soft border-y border-rule">
      {rows.map(([key, value]) => (
        <div key={key} className="grid grid-cols-[minmax(0,10rem)_1fr] gap-4 py-3">
          <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3 pt-0.5">
            {labelFor(key)}
          </dt>
          <dd className="text-[15px]">
            <SpecValue value={value} />
            {isMeasure(value) && value.note && (
              <span className="block text-ink-3 text-[13px] mt-0.5">{value.note}</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
