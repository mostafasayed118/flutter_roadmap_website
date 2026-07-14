import type { DocEntry } from "./types";

export const dartDocs: DocEntry[] = [
  {
    id: "dart-what-is-dart",
    title: "What is Dart?",
    category: "dart",
    summary:
      "Dart is a client-optimized, type-safe, object-oriented language for developing fast apps on any platform.",
    content: `Dart is a **client-optimized, type-safe, object-oriented language** for developing fast apps on any platform. It is the language that powers Flutter and is optimized for:

- **Fast development** — sub-second stateful hot reload
- **High-quality production** — compiles to native ARM, x64, JavaScript, and WebAssembly
- **Multi-platform** — mobile, web, desktop, server

> Dart is designed for a technical envelope that's particularly suited to client development. It forms the foundation of Flutter.`,
    codeSnippets: [],
    relatedWeeks: [1],
    tags: ["dart", "language", "overview", "flutter", "client-optimized", "multi-platform"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-hello-world",
    title: "Hello World",
    category: "dart",
    summary:
      "Every Dart app requires a top-level main() function as the entry point.",
    content: `Every Dart app requires a top-level \`main()\` function as the entry point.`,
    codeSnippets: [
      {
        id: "dart-hello-world-main",
        language: "dart",
        label: "Hello World Entry Point",
        code: `void main() {
  print('Hello, World!');
}`,
      },
    ],
    relatedWeeks: [1],
    tags: ["hello world", "main", "entry point", "basics", "print"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-variables",
    title: "Variables",
    category: "dart",
    summary:
      "Master Dart's type system: var, final, const, late, and explicit type declarations.",
    content: `Dart supports type inference with \`var\`, immutable bindings with \`final\`, compile-time constants with \`const\`, and deferred initialization with \`late\`.`,
    codeSnippets: [
      {
        id: "dart-variables-declarations",
        language: "dart",
        label: "Variable Declarations",
        code: `// Type inference
var name = 'Mustafa';       // String
var age = 25;               // int
var score = 9.5;            // double
var isActive = true;        // bool

// Explicit types
String city = 'Cairo';
int year = 2025;
double pi = 3.14159;
bool isLoggedIn = false;

// Final (set once, runtime constant)
final String token = getToken();

// Const (compile-time constant)
const double gravity = 9.81;
const List<String> colors = ['red', 'green', 'blue'];

// Late (initialized later)
late String description;
description = 'Initialized later';`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: ["var", "final", "const", "late", "types", "inference", "dart basics"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-numbers",
    title: "Numbers",
    category: "dart",
    summary:
      "Dart provides int, double, and num types for numeric values with parsing and conversion methods.",
    content: `Dart's numeric types include \`int\` for integers, \`double\` for floating-point numbers, and \`num\` as a supertype that can be either. Use \`parse()\` to convert strings to numbers and \`toString()\` for the reverse.`,
    codeSnippets: [
      {
        id: "dart-numbers-example",
        language: "dart",
        label: "Number Types & Parsing",
        code: `int count = 42;
double price = 19.99;
num value = 3;    // can be int or double

// Parsing
int.parse('42');
double.parse('3.14');
42.toString();`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: ["numbers", "int", "double", "num", "parsing", "conversion"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-strings",
    title: "Strings",
    category: "dart",
    summary:
      "Dart strings support interpolation, multi-line literals, and a rich set of built-in operations.",
    content: `Dart strings support **interpolation** with \`$\`\`, **multi-line literals** with triple quotes, and common operations like \`toUpperCase()\`, \`trim()\`, \`split()\`, \`contains()\`, \`replaceAll()\`, and \`length\`.`,
    codeSnippets: [
      {
        id: "dart-strings-operations",
        language: "dart",
        label: "String Operations",
        code: `String name = 'Flutter';
String message = "Hello, $name!";           // interpolation
String multi = '''
  Multi-line
  string
''';

// Operations
'hello'.toUpperCase();      // 'HELLO'
'  hello  '.trim();         // 'hello'
'hello world'.split(' ');   // ['hello', 'world']
'hello'.contains('ell');    // true
'hello'.replaceAll('l', 'r'); // 'herro'
'hello'.length;             // 5`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: ["strings", "interpolation", "multi-line", "operations", "toUpperCase", "trim"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-booleans",
    title: "Booleans",
    category: "dart",
    summary:
      "Dart booleans represent true/false values used in conditional logic.",
    content: `Dart's \`bool\` type has two values: \`true\` and \`false\`. Boolean expressions are commonly used in conditional statements and assertions.`,
    codeSnippets: [
      {
        id: "dart-booleans-example",
        language: "dart",
        label: "Boolean Values",
        code: `bool isTrue = true;
bool isFalse = false;

// Conditional
bool result = 5 > 3;        // true
assert(result == true);`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: ["booleans", "bool", "true", "false", "conditional", "assert"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-lists",
    title: "Lists (Arrays)",
    category: "dart",
    summary:
      "Ordered collections with rich operations: add, filter, map, sort, spread, and generate.",
    content: `Dart lists are **ordered collections** that can hold duplicate values. They support operations like \`add()\`, \`addAll()\`, \`remove()\`, \`where()\` (filter), \`map()\` (transform), \`fold()\` (reduce), \`sort()\`, and the **spread operator** (\`...\`) for combining lists.`,
    codeSnippets: [
      {
        id: "dart-lists-operations",
        language: "dart",
        label: "List Operations",
        code: `// Fixed type list
List<String> fruits = ['apple', 'banana', 'mango'];

// Dynamic list
var numbers = [1, 2, 3, 4, 5];

// Operations
fruits.add('cherry');
fruits.addAll(['grape', 'kiwi']);
fruits.remove('banana');
fruits.removeAt(0);
fruits.length;          // count
fruits.isEmpty;         // false
fruits.contains('mango');
fruits.indexOf('mango');
fruits.sort();
fruits.reversed.toList();
fruits.where((f) => f.length > 4).toList();  // filter
fruits.map((f) => f.toUpperCase()).toList();  // transform
fruits.fold(0, (sum, f) => sum + f.length);  // reduce

// Spread operator
var combined = [...fruits, ...['melon']];

// List.generate
var squares = List.generate(5, (i) => i * i);`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: ["lists", "arrays", "collection", "spread", "filter", "map", "fold", "generate"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-sets",
    title: "Sets",
    category: "dart",
    summary:
      "Unordered collections of unique values with set operations like intersection, union, and difference.",
    content: `Dart sets are **unordered collections of unique values**. They automatically prevent duplicates and provide mathematical set operations like \`intersection()\`, \`union()\`, and \`difference()\`.`,
    codeSnippets: [
      {
        id: "dart-sets-operations",
        language: "dart",
        label: "Set Operations",
        code: `Set<String> tags = {'flutter', 'dart', 'mobile'};
tags.add('web');
tags.contains('dart');   // true
// No duplicates!
tags.add('flutter');     // ignored, already exists

Set<String> a = {'a', 'b', 'c'};
Set<String> b = {'b', 'c', 'd'};
a.intersection(b);       // {'b', 'c'}
a.union(b);              // {'a', 'b', 'c', 'd'}
a.difference(b);         // {'a'}`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: ["sets", "unique", "intersection", "union", "difference", "no duplicates"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-maps",
    title: "Maps (Dictionaries)",
    category: "dart",
    summary:
      "Key-value pair collections with rich lookup, iteration, and creation methods.",
    content: `Dart maps store **key-value pairs** where each key is unique. They support lookup by key, adding/removing entries, checking for keys/values, and iteration over keys, values, or entries.`,
    codeSnippets: [
      {
        id: "dart-maps-operations",
        language: "dart",
        label: "Map Operations",
        code: `Map<String, int> scores = {
  'Alice': 95,
  'Bob': 87,
  'Charlie': 91,
};

scores['Alice'];          // 95
scores['Unknown'];        // null
scores['Diana'] = 88;     // add entry
scores.remove('Bob');
scores.containsKey('Alice');
scores.containsValue(95);
scores.keys.toList();
scores.values.toList();
scores.entries.forEach((e) => print('\${e.key}: \${e.value}'));

// Map.fromIterable
var map = Map.fromIterable(
  [1, 2, 3],
  key: (e) => 'key\$e',
  value: (e) => e * e,
);`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: ["maps", "dictionaries", "key-value", "entries", "fromIterable"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-records",
    title: "Records (Dart 3+)",
    category: "dart",
    summary:
      "Anonymous immutable value types introduced in Dart 3 for returning multiple values.",
    content: `Dart 3 introduced **Records** — anonymous immutable value types that can hold named or positional fields. They're useful for returning multiple values from functions and destructuring data.`,
    codeSnippets: [
      {
        id: "dart-records-example",
        language: "dart",
        label: "Records & Destructuring",
        code: `// Records — anonymous immutable value types
var point = (x: 10, y: 20);
print(point.x); // 10
print(point.y); // 20

// Positional records
var rgb = (255, 128, 0);
print(rgb.\$1); // 255

// Function returning multiple values
(String, int) getUserInfo() => ('Mustafa', 25);
var (name, age) = getUserInfo();`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: ["records", "named", "positional", "destructuring", "dart 3", "multiple values"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-operators",
    title: "Operators",
    category: "dart",
    summary:
      "Arithmetic, comparison, logical, null-aware, cascade, and spread operators.",
    content: `Dart supports standard arithmetic, comparison, logical, and assignment operators. Key features include **null-aware operators** (\`??\`, \`?.\`, \`??=\`), the **cascade** operator (\`..\`) for chained method calls, the **spread** operator (\`...\`) for expanding collections, and **type test** operators (\`is\`, \`is!\`, \`as\`).`,
    codeSnippets: [
      {
        id: "dart-operators-all",
        language: "dart",
        label: "All Operator Types",
        code: `// Arithmetic
+  -  *  /  ~/  %    // ~/ is integer division

// Comparison
==  !=  <  >  <=  >=

// Logical
&&  ||  !

// Assignment
=  +=  -=  *=  /=  ~/=  %=

// Null-aware
int? value = null;
value ??= 42;           // assign if null
value ?? 'default';     // fallback if null
value?.toString();      // safe call if not null

// Cascade
final paint = Paint()
  ..color = Colors.blue
  ..strokeWidth = 2.0
  ..style = PaintingStyle.stroke;

// Spread
var list = [1, ...otherList, 2];

// Type test
if (obj is String) { ... }    // true if obj is String
if (obj is! int) { ... }      // true if NOT int
obj as String;                // type cast (throws if wrong type)`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: ["arithmetic", "comparison", "logical", "null-aware", "cascade", "spread", "type test"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-if-else",
    title: "If / Else",
    category: "dart",
    summary:
      "Conditional statements for branching logic including ternary expressions.",
    content: `Dart supports standard \`if\`/\`else if\`/\`else\` chains for conditional branching, along with the **ternary operator** (\`?\`) for concise single-expression conditionals.`,
    codeSnippets: [
      {
        id: "dart-if-else-example",
        language: "dart",
        label: "If / Else & Ternary",
        code: `if (score >= 90) {
  print('A');
} else if (score >= 80) {
  print('B');
} else {
  print('C');
}

// Ternary
String grade = score >= 60 ? 'Pass' : 'Fail';`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: ["if", "else", "ternary", "conditional", "branching"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-loops",
    title: "Loops",
    category: "dart",
    summary:
      "for, for-in, forEach, while, do-while loops with break and continue control.",
    content: `Dart provides multiple loop constructs: \`for\` loops with counters, \`for-in\` for iterating over iterables, \`forEach\` for functional iteration, \`while\` and \`do-while\` for conditional repetition, and \`break\`/\`continue\` for flow control.`,
    codeSnippets: [
      {
        id: "dart-loops-all",
        language: "dart",
        label: "All Loop Types",
        code: `// for loop
for (int i = 0; i < 5; i++) {
  print(i);
}

// for-in
for (final fruit in fruits) {
  print(fruit);
}

// forEach
fruits.forEach(print);

// while
int i = 0;
while (i < 3) {
  print(i++);
}

// do-while
do {
  print('At least once');
} while (false);

// break & continue
for (var i = 0; i < 10; i++) {
  if (i == 5) break;
  if (i % 2 == 0) continue;
  print(i);
}`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: ["for", "for-in", "forEach", "while", "do-while", "break", "continue"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-switch-patterns",
    title: "Switch / Patterns (Dart 3+)",
    category: "dart",
    summary:
      "Classic switch statements, enhanced switch expressions, and pattern matching for destructuring.",
    content: `Dart 3 introduced **enhanced switch expressions** that can return values, and **pattern matching** that enables destructuring complex types directly in switch cases.`,
    codeSnippets: [
      {
        id: "dart-switch-classic",
        language: "dart",
        label: "Classic Switch",
        code: `// Classic switch
switch (command) {
  case 'start':
    startEngine();
    break;
  case 'stop':
    stopEngine();
    break;
  default:
    print('Unknown command');
}`,
      },
      {
        id: "dart-switch-enhanced",
        language: "dart",
        label: "Enhanced Switch Expression (Dart 3)",
        code: `// Enhanced switch (Dart 3 — expression)
String label = switch (status) {
  200 => 'OK',
  404 => 'Not Found',
  500 => 'Server Error',
  _ => 'Unknown',
};`,
      },
      {
        id: "dart-switch-pattern-match",
        language: "dart",
        label: "Pattern Matching",
        code: `// Pattern matching
switch (shape) {
  case Circle(radius: var r):
    print('Circle with radius \$r');
  case Rectangle(width: var w, height: var h):
    print('Rectangle \$w x \$h');
}`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: ["switch", "pattern matching", "expression", "destructuring", "dart 3"],
    difficulty: "intermediate",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-functions",
    title: "Functions",
    category: "dart",
    summary:
      "Named parameters, optional positional, closures, and higher-order functions.",
    content: `Dart functions support **named parameters**, **optional positional parameters**, **closures**, and **higher-order functions** (functions as first-class citizens). Use \`=>\` for concise single-expression bodies.`,
    codeSnippets: [
      {
        id: "dart-functions-patterns",
        language: "dart",
        label: "Function Patterns",
        code: `// Named function
int add(int a, int b) => a + b;

// Optional positional parameters
String greet(String name, [String? title]) {
  return 'Hello, \${title ?? ''} \$name';
}

// Named parameters
void createUser({
  required String name,
  int age = 18,
  String? email,
}) {
  print('\$name, \$age');
}
createUser(name: 'Mustafa', age: 25);

// First-class functions
var square = (int x) => x * x;
List<int> nums = [1, 2, 3, 4];
nums.map(square).toList(); // [1, 4, 9, 16]

// Higher-order functions
void runCallback(void Function() cb) => cb();
runCallback(() => print('callback!'));

// Closures
Function multiplier(int factor) {
  return (int value) => value * factor;
}
var triple = multiplier(3);
triple(5); // 15`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: [
      "functions",
      "named parameters",
      "optional positional",
      "closures",
      "higher-order",
      "arrow functions",
    ],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-classes-oop",
    title: "Classes & OOP",
    category: "dart",
    summary:
      "Classes with constructors, methods, getters/setters, and static members.",
    content: `Dart supports **classes** with named constructors, methods, getters/setters, static members, and the \`toString()\` override. Use \`required\` for mandatory named parameters and \`this\` for constructor parameter forwarding.`,
    codeSnippets: [
      {
        id: "dart-classes-example",
        language: "dart",
        label: "Class Definition & Usage",
        code: `class Animal {
  String name;
  int age;

  // Constructor
  Animal({required this.name, required this.age});

  // Named constructor
  Animal.unnamed() : name = 'Unknown', age = 0;

  // Method
  void speak() => print('\$name makes a sound');

  // Getter / Setter
  String get info => '\$name (\$age years)';
  set petName(String n) => name = n;

  // Static
  static String species = 'Animal';
  static String classify() => 'Living being';

  // toString override
  @override
  String toString() => 'Animal(\$name, \$age)';
}

// Usage
final dog = Animal(name: 'Rex', age: 3);
dog.speak();
print(dog.info);`,
      },
    ],
    relatedWeeks: [2, 3],
    tags: ["classes", "constructors", "methods", "getters", "setters", "static", "OOP"],
    difficulty: "intermediate",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-inheritance",
    title: "Inheritance",
    category: "dart",
    summary:
      "Extending classes with super, overriding methods, and adding new functionality.",
    content: `Dart supports single inheritance with \`extends\`. Use \`@override\` to override parent methods and \`super\` to access parent constructors and methods.`,
    codeSnippets: [
      {
        id: "dart-inheritance-example",
        language: "dart",
        label: "Inheritance with extends",
        code: `class Dog extends Animal {
  String breed;

  Dog({required super.name, required super.age, required this.breed});

  @override
  void speak() => print('\$name barks!');

  void fetch() => print('\$name fetches the ball!');
}

final labrador = Dog(name: 'Buddy', age: 2, breed: 'Labrador');
labrador.speak();   // overridden
labrador.fetch();   // own method`,
      },
    ],
    relatedWeeks: [2, 3],
    tags: ["inheritance", "extends", "override", "super", "subclass"],
    difficulty: "intermediate",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-abstract-interfaces",
    title: "Abstract Classes & Interfaces",
    category: "dart",
    summary:
      "Abstract classes define contracts; every class implicitly defines an interface via implements.",
    content: `Dart uses **abstract classes** to define contracts that must be implemented by subclasses. Every class in Dart implicitly defines an **interface**, so you can use \`implements\` on any class — not just those marked \`abstract\`.`,
    codeSnippets: [
      {
        id: "dart-abstract-class",
        language: "dart",
        label: "Abstract Class",
        code: `abstract class Shape {
  double get area;
  double get perimeter;
  void draw();
}

class Circle extends Shape {
  final double radius;
  Circle(this.radius);

  @override
  double get area => 3.14159 * radius * radius;

  @override
  double get perimeter => 2 * 3.14159 * radius;

  @override
  void draw() => print('Drawing circle with radius \$radius');
}`,
      },
      {
        id: "dart-interface-implements",
        language: "dart",
        label: "Interface with implements",
        code: `// Interface (implements, not extends)
class Printable {
  void printInfo() {}
}

class Dog extends Animal implements Printable {
  @override
  void printInfo() => print('Dog: \$name');
}`,
      },
    ],
    relatedWeeks: [2, 3],
    tags: ["abstract", "interfaces", "implements", "contracts", "Shape"],
    difficulty: "intermediate",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-mixins",
    title: "Mixins",
    category: "dart",
    summary:
      "Reusable behavior composition using the mixin keyword and with clause.",
    content: `Dart **mixins** allow you to add reusable behavior to classes without using inheritance. Define behavior with \`mixin\` and apply it with \`with\`. A class can use multiple mixins.`,
    codeSnippets: [
      {
        id: "dart-mixins-example",
        language: "dart",
        label: "Mixin Definition & Usage",
        code: `mixin Swimmer {
  void swim() => print('Swimming!');
}

mixin Runner {
  void run() => print('Running!');
}

class Triathlete extends Person with Swimmer, Runner {
  // now has swim() and run()
}`,
      },
    ],
    relatedWeeks: [2, 3],
    tags: ["mixins", "with", "reusable", "composition", "behavior"],
    difficulty: "intermediate",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-enums",
    title: "Enums (Enhanced — Dart 2.17+)",
    category: "dart",
    summary:
      "Enhanced enums with fields, constructors, methods, and getters.",
    content: `Dart 2.17 introduced **enhanced enums** that can have fields, constructors, methods, and getters — just like regular classes. Basic enums remain simple value lists.`,
    codeSnippets: [
      {
        id: "dart-enums-basic",
        language: "dart",
        label: "Basic & Enhanced Enums",
        code: `enum Direction { north, south, east, west }

// Enhanced enum
enum Planet {
  mercury(mass: 3.3e23, radius: 2.44e6),
  earth(mass: 5.97e24, radius: 6.37e6);

  const Planet({required this.mass, required this.radius});

  final double mass;
  final double radius;

  double get gravity => 6.67e-11 * mass / (radius * radius);
}

// Usage
print(Planet.earth.gravity);`,
      },
    ],
    relatedWeeks: [2, 3],
    tags: ["enums", "enhanced", "properties", "methods", "dart 2.17", "Planet"],
    difficulty: "intermediate",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-extension-methods",
    title: "Extension Methods",
    category: "dart",
    summary:
      "Add methods to existing types without modifying their source code.",
    content: `Dart **extension methods** let you add functionality to existing types without modifying their source code. Define them with the \`extension\` keyword on a target type.`,
    codeSnippets: [
      {
        id: "dart-extension-methods-example",
        language: "dart",
        label: "String Extension Methods",
        code: `extension StringExtensions on String {
  String get capitalize =>
      isEmpty ? this : '\${this[0].toUpperCase()}\${substring(1)}';

  bool get isEmail => contains('@') && contains('.');
}

// Usage
'hello'.capitalize;       // 'Hello'
'test@email.com'.isEmail; // true`,
      },
    ],
    relatedWeeks: [2, 3],
    tags: ["extension methods", "String", "capitalize", "isEmail", "existing types"],
    difficulty: "intermediate",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-null-safety",
    title: "Null Safety",
    category: "dart",
    summary:
      "Nullable vs non-nullable types, null-aware operators, and the null assertion operator.",
    content: `Dart's **null safety** system distinguishes between nullable (\`String?\`) and non-nullable (\`String\`) types. Use the **null-aware operators** (\`??\`, \`?.\`, \`??=\`) for safe operations and the **null assertion** operator (\`!\`) only when you're certain a value isn't null.`,
    codeSnippets: [
      {
        id: "dart-null-safety-patterns",
        language: "dart",
        label: "Null Safety Patterns",
        code: `// Nullable types
String? nullableName;        // can be null
int? nullableAge;

// Non-nullable (default)
String name = 'Mustafa';    // cannot be null

// Null checks
if (nullableName != null) {
  print(nullableName.length); // auto-promoted to String
}

// Null-aware operators
String result = nullableName ?? 'Default';     // fallback
int? len = nullableName?.length;               // safe call
nullableName ??= 'Assigned if null';           // conditional assign

// Null assertion (use with caution!)
String forced = nullableName!;  // throws if null`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: [
      "null safety",
      "nullable",
      "null-aware",
      "assertion",
      "type system",
      "optional",
    ],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-futures",
    title: "Futures",
    category: "dart",
    summary:
      "async/await, Future chaining, and waiting for multiple concurrent operations.",
    content: `Dart **Futures** represent a potential value or error that will be available at some time in the future. Use \`async\`/\`await\` for clean asynchronous code, or chain with \`.then()\`, \`.catchError()\`, and \`.whenComplete()\`. Use \`Future.wait()\` to run multiple futures concurrently.`,
    codeSnippets: [
      {
        id: "dart-futures-async-await",
        language: "dart",
        label: "async/await",
        code: `// async / await
Future<String> fetchData() async {
  final response = await http.get(Uri.parse('https://api.example.com/data'));
  return response.body;
}

// Calling async functions
void main() async {
  try {
    final data = await fetchData();
    print(data);
  } catch (e) {
    print('Error: \$e');
  }
}`,
      },
      {
        id: "dart-futures-chaining",
        language: "dart",
        label: "Future Chaining & Multiple Futures",
        code: `// Future chaining
fetchData()
  .then((data) => processData(data))
  .catchError((e) => handleError(e))
  .whenComplete(() => hideLoader());

// Wait for multiple futures
final results = await Future.wait([fetchA(), fetchB(), fetchC()]);`,
      },
    ],
    relatedWeeks: [3, 4],
    tags: ["futures", "async", "await", "Future.wait", "chaining", "then", "catchError"],
    difficulty: "intermediate",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-streams",
    title: "Streams",
    category: "dart",
    summary:
      "Async generators, StreamController, and broadcast streams for handling sequences of data.",
    content: `Dart **Streams** provide a sequence of asynchronous data events. Create them with **async generators** (\`async*\`/ \`yield\`), consume with \`await for\`, or use **StreamController** for manual event management. **Broadcast streams** allow multiple listeners.`,
    codeSnippets: [
      {
        id: "dart-streams-async-generator",
        language: "dart",
        label: "Async Generator & Consumer",
        code: `// Creating a stream
Stream<int> countStream(int max) async* {
  for (int i = 0; i < max; i++) {
    await Future.delayed(const Duration(seconds: 1));
    yield i;
  }
}

// Consuming a stream
void main() async {
  await for (final value in countStream(5)) {
    print(value); // 0, 1, 2, 3, 4 (one per second)
  }
}`,
      },
      {
        id: "dart-streams-controller",
        language: "dart",
        label: "StreamController & Broadcast",
        code: `// StreamController
final controller = StreamController<String>();
controller.stream.listen((event) => print('Received: \$event'));
controller.sink.add('Hello');
controller.close();

// broadcast stream
final broadcast = StreamController<String>.broadcast();`,
      },
    ],
    relatedWeeks: [3, 4],
    tags: ["streams", "StreamController", "broadcast", "async*", "yield", "await for"],
    difficulty: "intermediate",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-isolates",
    title: "Isolates (Concurrency)",
    category: "dart",
    summary:
      "True concurrency without shared memory using Isolate.run() and Flutter's compute().",
    content: `Dart **Isolates** provide true concurrency without shared memory. Each isolate has its own memory heap and communicates via message passing. Use \`Isolate.run()\` for raw Dart or \`compute()\` from Flutter's foundation for convenient isolate usage.`,
    codeSnippets: [
      {
        id: "dart-isolates-example",
        language: "dart",
        label: "Isolate & compute()",
        code: `import 'dart:isolate';

// Run heavy work in a separate isolate
Future<int> computeHeavyWork(int input) async {
  return await Isolate.run(() => heavyComputation(input));
}

// Compute (Flutter's built-in)
import 'package:flutter/foundation.dart';
final result = await compute(heavyComputation, inputData);`,
      },
    ],
    relatedWeeks: [3, 4],
    tags: ["isolates", "concurrency", "compute", "Isolate.run", "parallel", "message passing"],
    difficulty: "advanced",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-error-handling",
    title: "Error Handling",
    category: "dart",
    summary:
      "try-catch-finally, typed exceptions, and custom exception classes.",
    content: `Dart uses **try-catch-finally** for exception handling with typed catch clauses (\`on FormatException\`). You can create **custom exceptions** by implementing the \`Exception\` interface and throw them with the \`throw\` keyword.`,
    codeSnippets: [
      {
        id: "dart-error-handling-try-catch",
        language: "dart",
        label: "try-catch-finally",
        code: `// try-catch-finally
try {
  final result = int.parse(userInput);
  print(result);
} on FormatException catch (e) {
  print('Bad format: \$e');
} on RangeError catch (e, stackTrace) {
  print('Range error: \$e');
  print(stackTrace);
} catch (e) {
  print('Unknown error: \$e');
} finally {
  print('Always runs');
}`,
      },
      {
        id: "dart-error-handling-custom",
        language: "dart",
        label: "Custom Exceptions",
        code: `// Custom exceptions
class NetworkException implements Exception {
  final String message;
  final int statusCode;

  const NetworkException(this.message, this.statusCode);

  @override
  String toString() => 'NetworkException(\$statusCode): \$message';
}

// Throwing
throw NetworkException('Not found', 404);
throw AssertionError('Value must be positive');`,
      },
    ],
    relatedWeeks: [3, 4],
    tags: [
      "error handling",
      "exceptions",
      "try-catch",
      "custom exceptions",
      "throw",
      "finally",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-generics",
    title: "Generics",
    category: "dart",
    summary:
      "Type-safe reusable code with generic classes, functions, and bounded types.",
    content: `Generics enable you to write **reusable, type-safe** code. Define generic classes (\`Box<T>\`), generic functions (\`T first<T>(List<T>)\`), and use **bounded generics** (\`<T extends num>\`) to constrain type parameters. Dart 3 patterns work with generic types.`,
    codeSnippets: [
      {
        id: "dart-generics-class-function",
        language: "dart",
        label: "Generic Classes & Functions",
        code: `// Generic class
class Box<T> {
  T value;
  Box(this.value);

  T getValue() => value;
}

Box<int> intBox = Box(42);
Box<String> strBox = Box('Hello');

// Generic function
T first<T>(List<T> list) => list.first;

// Bounded generics
class NumberBox<T extends num> {
  T value;
  NumberBox(this.value);
  double get doubled => value * 2;
}

// Dart 3 Patterns with generics
switch (obj) {
  case Box<int>(:var value):
    print('Int box: \$value');
  case Box<String>(:var value):
    print('String box: \$value');
}`,
      },
    ],
    relatedWeeks: [3, 4],
    tags: ["generics", "type parameters", "bounded", "patterns", "reusable", "type safety"],
    difficulty: "intermediate",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-libraries",
    title: "Libraries & Packages",
    category: "dart",
    summary:
      "Import patterns for standard libraries, pub packages, and local files.",
    content: `Dart uses \`import\` to bring in standard libraries (\`dart:math\`, \`dart:convert\`, \`dart:async\`, \`dart:io\`), pub packages (\`package:http\`, \`package:flutter\`), and local files. Use \`show\` to import specific names, \`hide\` to exclude names, and \`export\` to re-export libraries.`,
    codeSnippets: [
      {
        id: "dart-libraries-imports",
        language: "dart",
        label: "Import Patterns",
        code: `// Import standard library
import 'dart:math';
import 'dart:convert';
import 'dart:async';
import 'dart:io';

// Import pub package
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

// Import own file
import 'utils/helpers.dart';
import 'models/user.dart';

// Partial import
import 'package:collection/collection.dart' show ListEquality;
import 'dart:math' hide Random;  // exclude

// Export
export 'src/user.dart';
export 'src/product.dart';`,
      },
    ],
    relatedWeeks: [1, 2, 4],
    tags: ["imports", "standard library", "pub packages", "show", "hide", "export"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-pubspec",
    title: "pubspec.yaml",
    category: "dart",
    summary:
      "Project configuration with dependencies, dev_dependencies, assets, and fonts.",
    content: `The \`pubspec.yaml\` file is the central configuration for Dart/Flutter projects. It declares the project name, version, SDK constraints, **dependencies**, **dev_dependencies**, Flutter-specific settings like assets and fonts.`,
    codeSnippets: [
      {
        id: "dart-pubspec-structure",
        language: "yaml",
        label: "pubspec.yaml Structure",
        code: `name: my_flutter_app
description: A Flutter application
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'
  flutter: '>=3.10.0'

dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.0
  provider: ^6.1.0
  shared_preferences: ^2.2.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^4.0.0
  build_runner: ^2.4.0
  json_serializable: ^6.7.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
  fonts:
    - family: Roboto
      fonts:
        - asset: fonts/Roboto-Regular.ttf`,
      },
    ],
    relatedWeeks: [1, 2, 4],
    tags: ["pubspec", "dependencies", "dev_dependencies", "flutter", "assets", "fonts"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-effective-dart",
    title: "Effective Dart Guidelines",
    category: "dart",
    summary:
      "Coding conventions for style, usage, and design to write idiomatic Dart code.",
    content: `Follow **Effective Dart** guidelines for consistent, readable code.

### Style
- Use \`lowerCamelCase\` for variables, functions, parameters
- Use \`UpperCamelCase\` for classes, enums, typedefs
- Use \`lowercase_with_underscores\` for file names and library names
- Use \`SCREAMING_CAPS\` for constants (optional, \`lowerCamelCase\` also accepted)
- Prefer single quotes for strings
- Format code with \`dart format\`

### Usage
- Prefer \`var\` when type is obvious from the right-hand side
- Use \`final\` for variables that don't change
- Use \`const\` for compile-time constants
- Prefer \`??\` and \`?.\` over explicit null checks
- Use \`is\` for type checks, avoid \`as\` casts when possible
- Prefer \`async/await\` over raw Future chains
- Always await futures — don't ignore them

### Design
- Prefer making fields and top-level variables \`final\`
- Avoid exposing mutable state
- Use named parameters for 3+ parameters
- Document all public APIs`,
    codeSnippets: [],
    relatedWeeks: [1, 4],
    tags: ["effective dart", "style", "naming", "conventions", "best practices", "formatting"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-core-libraries",
    title: "Core Libraries",
    category: "dart",
    summary:
      "Essential Dart libraries: core, async, math, convert, io, isolate, collection, and js_interop.",
    content: `Dart provides a set of **core libraries** for common tasks:

| Library | Purpose |
|---------|---------|
| \`dart:core\` | Built-in types (String, List, Map, DateTime, etc.) |
| \`dart:async\` | Async programming (Future, Stream, StreamController) |
| \`dart:math\` | Math functions (sqrt, pow, Random, pi, e) |
| \`dart:convert\` | Encoding/decoding (jsonEncode, jsonDecode, utf8, base64) |
| \`dart:io\` | File/socket/process I/O (non-web) |
| \`dart:isolate\` | Isolates for true concurrency |
| \`dart:collection\` | Additional collection types (Queue, LinkedHashMap) |
| \`dart:js_interop\` | JavaScript interop for web |`,
    codeSnippets: [],
    relatedWeeks: [1, 2, 3, 4],
    tags: [
      "core libraries",
      "dart:core",
      "dart:async",
      "dart:math",
      "dart:convert",
      "dart:io",
      "dart:isolate",
      "dart:collection",
    ],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-cli-tools",
    title: "Dart CLI Tools",
    category: "dart",
    summary:
      "Essential command-line tools for creating, running, analyzing, and publishing Dart projects.",
    content: `Dart provides a comprehensive set of **CLI tools** for project management, code analysis, testing, and publishing.`,
    codeSnippets: [
      {
        id: "dart-cli-commands",
        language: "bash",
        label: "Dart CLI Commands",
        code: `dart --version                   # Check Dart version
dart create my_app               # Create a new Dart project
dart run                         # Run a Dart file
dart compile exe bin/main.dart   # Compile to native executable
dart analyze                     # Static analysis / linting
dart format lib/                 # Auto-format code
dart test                        # Run tests
dart pub get                     # Install dependencies
dart pub upgrade                 # Upgrade packages
dart pub publish                 # Publish to pub.dev
dart doc .                       # Generate API docs
dart fix --apply                 # Auto-fix lint issues`,
      },
    ],
    relatedWeeks: [1, 4],
    tags: [
      "CLI",
      "dart create",
      "dart run",
      "dart analyze",
      "dart format",
      "dart test",
      "dart pub",
    ],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
  {
    id: "dart-key-links",
    title: "Key Docs Links",
    category: "dart",
    summary:
      "Official Dart documentation links for language, libraries, tools, and API reference.",
    content: `Official **Dart documentation** links for reference:

| Topic | URL |
|-------|-----|
| Language Intro | https://dart.dev/language |
| Dart Overview | https://dart.dev/overview |
| Core Libraries | https://dart.dev/libraries |
| Async Programming | https://dart.dev/libraries/async/async-await |
| Null Safety | https://dart.dev/null-safety |
| Effective Dart | https://dart.dev/effective-dart |
| Packages | https://dart.dev/tools/pub/packages |
| API Reference | https://api.dart.dev |
| DartPad (Online) | https://dartpad.dev |`,
    codeSnippets: [],
    relatedWeeks: [1, 2, 3, 4],
    tags: ["documentation", "links", "dart.dev", "API reference", "DartPad", "overview"],
    difficulty: "beginner",
    sourceUrl: "https://dart.dev",
  },
];
