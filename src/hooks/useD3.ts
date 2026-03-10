"use client";

import { useRef, useEffect, type DependencyList } from "react";
import * as d3 from "d3";

export function useD3<T>(
  renderFn: (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    data: T
  ) => void,
  data: T,
  deps: DependencyList
) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    // Clear previous render
    svg.selectAll("*").remove();
    // Call render function
    renderFn(svg, data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
