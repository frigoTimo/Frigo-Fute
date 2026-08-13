export const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
export const hasAny = (list, targets) => list.some((i) => targets.includes(i));
export const arrondir = (n) => (n < 10 ? Math.round(n * 2) / 2 : Math.round(n / 5) * 5);

export const formatQty = (ing, portions) => {
  if (ing.qty == null) return null;
  const scaled = arrondir((ing.qty * portions) / 2);
  return `${scaled % 1 === 0 ? scaled : scaled.toFixed(1)}${ing.unite ? " " + ing.unite : ""}`;
};
