import type { Measure } from "@/content/schema";

const SMALL_WORDS = new Set(["of", "and", "per", "to", "at"]);

/** launchWeight -> "Launch Weight", rateOfFire -> "Rate of Fire" */
export function labelFor(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(" ")
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (i > 0 && SMALL_WORDS.has(lower)) return lower;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function isMeasure(value: unknown): value is Measure {
  return (
    typeof value === "object" &&
    value !== null &&
    "value" in value &&
    "unit" in value &&
    "confidence" in value
  );
}

const NUMBER = new Intl.NumberFormat("en-IN");

export function formatMeasure(m: Measure): string {
  const high = NUMBER.format(m.value);
  const body = m.min !== undefined ? `${NUMBER.format(m.min)}–${high}` : high;
  return `${body} ${m.unit}`;
}

/** The tooltip text explaining why a figure is or is not solid. */
export function confidenceNote(m: Measure): string {
  const base =
    m.confidence === "official"
      ? "Officially published figure."
      : m.confidence === "reported"
        ? "Widely reported, not officially confirmed."
        : "Estimate. Treat with caution.";
  return m.note ? `${base} ${m.note}` : base;
}

export function formatService(service: string): string {
  return service
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function formatStatus(status: string): string {
  return status === "in-service" ? "In service" : formatService(status);
}
