import type { DocEntry } from "./types";

export const dartDocs: DocEntry[] = [
  {
    id: "dart-variables",
    title: "Variables & Types",
    category: "dart",
    summary:
      "Master Dart's type system: var, final, const, late, and explicit type declarations.",
    content: `Dart is a **client-optimized, type-safe, object-oriented language** that powers Flutter. It uses type inference with \`var\`, immutable bindings with \`final\`, compile-time constants with \`const\`, and deferred initialization with \`late\`.`,
    codeSnippets: [
      {
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
  },
  {
    id: "dart-built-in-types",
    title: "Built-in Types",
    category: "dart",
    summary:
      "Numbers, strings, booleans, lists, sets, maps, and Dart 3+ records.",
    content: `Dart provides **Numbers** (\`int\`, \`double\`, \`num\`), **Strings** with interpolation and multi-line support, **Booleans**, **Lists** (ordered collections), **Sets** (unordered unique), **Maps** (key-value pairs), and Dart 3+ **Records** (anonymous immutable value types).`,
    codeSnippets: [
      {
        language: "dart",
        label: "Lists, Sets, Maps & Records",
        code: `// Lists
List<String> fruits = ['apple', 'banana', 'mango'];
fruits.add('cherry');
fruits.where((f) => f.length > 4).toList();  // filter
fruits.map((f) => f.toUpperCase()).toList();  // transform
var combined = [...fruits, ...['melon']];     // spread

// Sets (no duplicates)
Set<String> tags = {'flutter', 'dart', 'mobile'};
a.intersection(b);  a.union(b);  a.difference(b);

// Maps
Map<String, int> scores = {'Alice': 95, 'Bob': 87};
scores.keys.toList();
scores.values.toList();

// Records (Dart 3+)
var point = (x: 10, y: 20);
print(point.x); // 10
var (name, age) = ('Mustafa', 25);`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: [
      "list",
      "set",
      "map",
      "record",
      "collections",
      "arrays",
      "dart types",
    ],
    difficulty: "beginner",
  },
  {
    id: "dart-operators",
    title: "Operators",
    category: "dart",
    summary:
      "Arithmetic, comparison, logical, null-aware, cascade, and spread operators.",
    content: `Dart supports standard arithmetic, comparison, logical, and assignment operators. Key features include **null-aware operators** (\`??\`, \`?.\`, \`??=\`), the **cascade** operator (\`..\`) for chained method calls, and the **spread** operator (\`...\`) for expanding collections.`,
    codeSnippets: [
      {
        language: "dart",
        label: "Null-aware & Cascade Operators",
        code: `// Null-aware
int? value = null;
value ??= 42;           // assign if null
value ?? 'default';     // fallback if null
value?.toString();      // safe call if not null

// Cascade
final paint = Paint()
  ..color = Colors.blue
  ..strokeWidth = 2.0
  ..style = PaintingStyle.stroke;

// Type test
if (obj is String) { ... }    // true if obj is String
if (obj is! int) { ... }      // true if NOT int
obj as String;                // type cast`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: [
      "null-aware",
      "cascade",
      "spread",
      "operators",
      "type cast",
      "null safety",
    ],
    difficulty: "beginner",
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

// First-class functions
var square = (int x) => x * x;
List<int> nums = [1, 2, 3, 4];
nums.map(square).toList(); // [1, 4, 9, 16]

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
      "closures",
      "higher-order",
      "arrow functions",
    ],
    difficulty: "beginner",
  },
  {
    id: "dart-classes-oop",
    title: "Classes & OOP",
    category: "dart",
    summary:
      "Classes, inheritance, abstract classes, interfaces, mixins, and extension methods.",
    content: `Dart supports **classes** with constructors (named, factory), **inheritance** (\`extends\`), **abstract classes**, **interfaces** (\`implements\`), **mixins** (\`mixin\`), **enhanced enums** (Dart 2.17+), and **extension methods** for adding functionality to existing types.`,
    codeSnippets: [
      {
        language: "dart",
        label: "Classes, Inheritance & Mixins",
        code: `class Animal {
  String name;
  int age;
  Animal({required this.name, required this.age});
  Animal.unnamed() : name = 'Unknown', age = 0;
  void speak() => print('\\$name makes a sound');
  String get info => '\\$name (\\$age years)';
}

class Dog extends Animal {
  String breed;
  Dog({required super.name, required super.age, required this.breed});
  @override
  void speak() => print('\\$name barks!');
}

// Abstract class
abstract class Shape {
  double get area;
  void draw();
}

// Mixins
mixin Swimmer { void swim() => print('Swimming!'); }
mixin Runner { void run() => print('Running!'); }
class Triathlete extends Person with Swimmer, Runner {}

// Extension Methods
extension StringExtensions on String {
  String get capitalize =>
      isEmpty ? this : '\${this[0].toUpperCase()}\${substring(1)}';
  bool get isEmail => contains('@') && contains('.');
}`,
      },
    ],
    relatedWeeks: [2, 3],
    tags: [
      "classes",
      "inheritance",
      "abstract",
      "mixins",
      "interfaces",
      "extension methods",
      "OOP",
    ],
    difficulty: "intermediate",
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
      "optional",
      "late",
      "type system",
    ],
    difficulty: "beginner",
  },
  {
    id: "dart-async",
    title: "Asynchronous Programming",
    category: "dart",
    summary: "Futures, Streams, async/await, and Isolates for concurrency.",
    content: `Dart provides **Futures** (single async values), **Streams** (sequences of async data), and **Isolates** (true concurrency without shared memory). Use \`async\`/\`await\` for clean asynchronous code and \`Isolate.run()\` or \`compute()\` for heavy computations.`,
    codeSnippets: [
      {
        language: "dart",
        label: "Futures & Streams",
        code: `// async / await
Future<String> fetchData() async {
  final response = await http.get(Uri.parse('https://api.example.com/data'));
  return response.body;
}

// Wait for multiple futures
final results = await Future.wait([fetchA(), fetchB(), fetchC()]);

// Stream
Stream<int> countStream(int max) async* {
  for (int i = 0; i < max; i++) {
    await Future.delayed(const Duration(seconds: 1));
    yield i;
  }
}

// Consume a stream
await for (final value in countStream(5)) {
  print(value); // 0, 1, 2, 3, 4
}

// Isolate (heavy computation)
final result = await compute(heavyComputation, inputData);`,
      },
    ],
    relatedWeeks: [3, 4],
    tags: [
      "async",
      "await",
      "future",
      "stream",
      "isolate",
      "concurrency",
      "async programming",
    ],
    difficulty: "intermediate",
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
        language: "dart",
        label: "Exception Handling",
        code: `try {
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
}

// Custom exceptions
class NetworkException implements Exception {
  final String message;
  final int statusCode;
  const NetworkException(this.message, this.statusCode);
  @override
  String toString() => 'NetworkException(\$statusCode): \$message';
}
throw NetworkException('Not found', 404);`,
      },
    ],
    relatedWeeks: [3, 4],
    tags: [
      "error handling",
      "exceptions",
      "try-catch",
      "custom exceptions",
      "throw",
    ],
    difficulty: "intermediate",
  },
  {
    id: "dart-generics",
    title: "Generics",
    category: "dart",
    summary:
      "Type-safe reusable code with generic classes, functions, and bounded types.",
    content: `Generics enable you to write **reusable, type-safe** code. Define generic classes (\`Box<T>\`), generic functions (\`T first<T>(List<T>)\`), and use **bounded generics** (\`<T extends num>\`) to constrain type parameters.`,
    codeSnippets: [
      {
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
    tags: ["generics", "type parameters", "bounded", "reusable", "type safety"],
    difficulty: "intermediate",
  },
  {
    id: "dart-control-flow",
    title: "Control Flow",
    category: "dart",
    summary:
      "if/else, loops, enhanced switch expressions, and Dart 3 pattern matching.",
    content: `Dart supports standard **if/else**, **loops** (for, for-in, while, do-while), and Dart 3+ **enhanced switch** with expression syntax and **pattern matching** for destructuring complex types.`,
    codeSnippets: [
      {
        language: "dart",
        label: "Enhanced Switch & Pattern Matching",
        code: `// Enhanced switch (Dart 3 — expression)
String label = switch (status) {
  200 => 'OK',
  404 => 'Not Found',
  500 => 'Server Error',
  _ => 'Unknown',
};

// Pattern matching
switch (shape) {
  case Circle(radius: var r):
    print('Circle with radius \$r');
  case Rectangle(width: var w, height: var h):
    print('Rectangle \$w x \$h');
}

// Ternary
String grade = score >= 60 ? 'Pass' : 'Fail';`,
      },
    ],
    relatedWeeks: [1, 2],
    tags: [
      "control flow",
      "switch",
      "pattern matching",
      "if-else",
      "loops",
      "for",
      "while",
    ],
    difficulty: "beginner",
  },
  {
    id: "dart-libraries",
    title: "Libraries & Packages",
    category: "dart",
    summary:
      "Import patterns, pubspec.yaml, standard libraries, and package management.",
    content: `Dart uses \`import\` to bring in standard libraries (\`dart:math\`, \`dart:convert\`, \`dart:async\`), pub packages (\`package:http\`), and local files. The \`pubspec.yaml\` file declares dependencies, assets, and fonts for your project.`,
    codeSnippets: [
      {
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

dev_dependencies:
  flutter_test:
    sdk: flutter
  build_runner: ^2.4.0
  json_serializable: ^6.7.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/`,
      },
      {
        language: "dart",
        label: "Import Patterns",
        code: `// Standard library
import 'dart:math';
import 'dart:convert';
import 'dart:async';

// Pub package
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

// Own file
import 'utils/helpers.dart';
import 'models/user.dart';

// Partial import
import 'package:collection/collection.dart' show ListEquality;
import 'dart:math' hide Random;`,
      },
    ],
    relatedWeeks: [1, 2, 4],
    tags: [
      "imports",
      "pubspec",
      "packages",
      "dependencies",
      "dart libraries",
      "pub",
    ],
    difficulty: "beginner",
  },
  {
    id: "dart-effective-dart",
    title: "Effective Dart & CLI",
    category: "dart",
    summary:
      "Coding conventions, naming rules, and essential Dart CLI commands.",
    content: `Follow **Effective Dart** guidelines: use \`lowerCamelCase\` for variables/functions, \`UpperCamelCase\` for classes, single quotes for strings, and prefer \`final\`/\`const\` over \`var\`. Key CLI tools include \`dart analyze\`, \`dart format\`, \`dart test\`, and \`dart fix --apply\`.`,
    codeSnippets: [
      {
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
dart fix --apply                 # Auto-fix lint issues`,
      },
    ],
    relatedWeeks: [1, 4],
    tags: [
      "effective dart",
      "naming conventions",
      "CLI",
      "linting",
      "formatting",
      "analysis",
    ],
    difficulty: "beginner",
  },
];
