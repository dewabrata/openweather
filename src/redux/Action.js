export function GlobalAction(tipe, value) {
  return { type: "SET_GLOBAL", tipeInput: tipe, valueInput: value };
}
