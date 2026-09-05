import { ViewTransition } from "react";

/**
 * The two pieces of route-change motion, kept together because they only make
 * sense as a pair.
 *
 * `PageTransition` wraps the body of every route. It is deliberately *not* in
 * the layout: a layout persists across navigations, so its enter and exit
 * animations would never fire. Each page owns its own boundary, unmounts on the
 * way out and mounts on the way in, which is what produces the handoff.
 *
 * `SharedPhoto` names a photograph so the same picture on two different pages
 * is understood by the browser as one object that moved, rather than one that
 * vanished and another that appeared. The animation itself lives in
 * `globals.css` under `::view-transition-*`.
 *
 * Both degrade to nothing: a browser without the View Transitions API renders
 * the ordinary page and skips the animation.
 */

/*
 * The names shared photographs are known by. They live here rather than beside
 * the components that use them because both halves of a pair have to agree, and
 * the two halves are always in different files.
 */

/** A piece of equipment: its card thumbnail, and its lead photograph. */
export function entryPhotoName(slug: string) {
  return `entry-photo-${slug}`;
}

/** A service: its card on the force index, and its page masthead. */
export function forcePhotoName(slug: string) {
  return `force-photo-${slug}`;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {/* A single element for the browser to snapshot. Without it every
          top-level section of a page would become its own transition layer. */}
      <div>{children}</div>
    </ViewTransition>
  );
}

/**
 * `default="none"` stops a named photograph from cross-fading on every
 * unrelated navigation; `share` has to stay explicit alongside it, or the pair
 * silently stops morphing.
 */
export function SharedPhoto({
  name,
  children,
}: {
  /** Must be unique on the page, and identical on both pages of the pair. */
  name: string;
  children: React.ReactNode;
}) {
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
