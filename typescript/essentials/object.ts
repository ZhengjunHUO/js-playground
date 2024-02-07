// type alias; with an optional and union property
type Fullname = {
  first: string;
  last: string;
  alias?: string | number;
};

// object destructuring
function printName({ first, last, alias }: Fullname) {
  let rslt = `The name is ${first} ${last}`;
  let optional = alias === undefined ? "." : `, also called ${alias}.`;
  console.log(rslt + optional);
}

printName({ first: "Foo", last: "Bar" });
printName({ first: "Baz", last: "Bar", alias: "BB" });
printName({ first: "Sept", last: "Bar", alias: "7" });
