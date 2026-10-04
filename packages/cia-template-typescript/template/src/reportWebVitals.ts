import type { MetricType } from 'web-vitals';

export default function reportWebVitals(
  onPerfEntry?: (metric: MetricType) => void,
): void {
  if (onPerfEntry != null && typeof onPerfEntry === 'function') {
    void import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onINP(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
}
