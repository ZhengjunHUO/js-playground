let out1: string = "Rust";
let out2 = "rocks !";
let num: number = 2024;
console.log(out1, out2, num);

let sb1: symbol = Symbol("foo");
let sb2: symbol = Symbol("foo");

function compare(x: symbol, y: symbol): boolean {
  return x == y;
}
console.log(compare(sb1, sb2));
