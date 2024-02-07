// array
let a1: Array<number>;
a1 = [5, 8, 16];
console.log("a1:", a1);

// tuple
let tp1: [number, boolean];
tp1 = [88, true];
console.log("tp1:", tp1);

// enum type
enum Color {
  R = 2,
  G,
  B,
}
let cg: Color = Color.G;
console.log("cg:", cg);

enum Mode {
  R = "red",
  G = "green",
  B = "blue",
}
let mr: Mode = Mode.R;
console.log("mr:", mr);

// union type
let option1: string | undefined;
option1 = "foo";
console.log(option1);
option1 = undefined;
console.log(option1);
