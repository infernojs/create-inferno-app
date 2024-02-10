import { type ReportHandler } from 'web-vitals';

export default function reportWebVitals(onPerfEntry?: ReportHandler): void {
  if (onPerfEntry != null && typeof onPerfEntry === 'function') {
    void import('web-vitals').then(
      ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      },
    );
  }
}
