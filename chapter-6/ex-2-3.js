class Group {
  constructor() {
    this.values = {};
  }

  add(value) {
    this.values[value] = true;
  }

  delete(value) {
    if (this.values[value]) {
      delete this.values[value];
    }
  }

  has(value) {
    return !!this.values[value];
  }

  static from(object) {
    const output = new Group();
    for (let el of object) {
      output.add(el);
    }
    return output;
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false
console.log(group);

class GroupIterator {
  constructor(group) {
    this.index = 0;
    this.group = group;
  }

  next() {
    let values = Object.keys(this.group.values);
    if (this.index >= values.length) return { done: true };
    let value = values[this.index];
    this.index++;
    return { value, done: false };
  }
}

Group.prototype[Symbol.iterator] = function () {
  return new GroupIterator(this);
};

for (let value of Group.from(['a', 'b', 'c'])) {
  console.log(value);
}
