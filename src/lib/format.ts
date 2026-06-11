export const formatPrice = (n: number) => `Rs.${n.toLocaleString("en-PK")}`;

export const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");
