// fetch css style of element
export function getStyle(el: HTMLElement, styleProp: string): string {
  return window.getComputedStyle(el).getPropertyValue(styleProp);
}
// number randomizing in range (including these numbers) 
export function randomRange(start: number, end: number): number {
  if (start < 0 && end > 0) return Math.round(start + Math.random()*(end-start));
  return Math.floor(Math.random() * (end - start + 1)) + start;
}