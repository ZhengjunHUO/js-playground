// (1) default param & optional param
function calc(
  init: number,
  scale: number = 1,
  doubled: boolean = false,
  add?: number,
) {
  let rslt = init * scale;

  if (add !== undefined) {
    rslt += add;
  }

  if (doubled) {
    rslt *= 2;
  }
  return rslt;
}

const c1 = calc(10_000);
console.log(c1);
const c2 = calc(10_000, 1.5);
console.log(c2);
const c3 = calc(10_000, 0.8, true);
console.log(c3);
// use the default value for `scale`
const c4 = calc(10_000, undefined, true);
console.log(c4);
// use optional param
const c5 = calc(10_000, undefined, true, 5_000);
console.log(c5);

// (2) rest params: variadic function
function showList(tag: string, ...contents: string[]) {
  if (contents.length === 0) return tag;
  else return tag + ": " + contents.join(", ");
}

const l1 = showList("standalone");
console.log(l1);
const l2 = showList("language", "rust", "cpp", "ts");
console.log(l2);

// (3) lambda
const combine = (left: string, right: string): string => left + " " + right;
console.log(combine("Rust", "rocks!"));

const names = ["rust", "rusty", "rustacean"];
names.forEach((n) => console.log(n.toUpperCase()));
