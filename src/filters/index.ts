export function calcTime(time: number): string {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return `${hours}h ${mins}m`;
}

export function convertMoney(money: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  return formatter.format(money);
}

export function overviewShorter(value: string): string {
  if (value.length <= 291) {
    return value;
  }

  return value.slice(0, 288) + '...';
}
