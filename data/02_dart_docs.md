# Dart Language Documentation
> Source: https://dart.dev | Version: Dart 3.12.0

---

## What is Dart?

Dart is a **client-optimized, type-safe, object-oriented language** for developing fast apps on any platform. It is the language that powers Flutter and is optimized for:

- **Fast development** — sub-second stateful hot reload
- **High-quality production** — compiles to native ARM, x64, JavaScript, and WebAssembly
- **Multi-platform** — mobile, web, desktop, server

> Dart is designed for a technical envelope that's particularly suited to client development. It forms the foundation of Flutter.

---

## Hello World

```dart
void main() {
  print('Hello, World!');
}
```

Every Dart app requires a top-level `main()` function as the entry point.

---

## Variables

```dart
// Type inference
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
description = 'Initialized later';
```

---

## Built-in Types

### Numbers

```dart
int count = 42;
double price = 19.99;
num value = 3;    // can be int or double

// Parsing
int.parse('42');
double.parse('3.14');
42.toString();
```

### Strings

```dart
String name = 'Flutter';
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
'hello'.length;             // 5
```

### Booleans

```dart
bool isTrue = true;
bool isFalse = false;

// Conditional
bool result = 5 > 3;        // true
assert(result == true);
```

### Lists (Arrays)

```dart
// Fixed type list
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
var squares = List.generate(5, (i) => i * i);
```

### Sets

```dart
Set<String> tags = {'flutter', 'dart', 'mobile'};
tags.add('web');
tags.contains('dart');   // true
// No duplicates!
tags.add('flutter');     // ignored, already exists

Set<String> a = {'a', 'b', 'c'};
Set<String> b = {'b', 'c', 'd'};
a.intersection(b);       // {'b', 'c'}
a.union(b);              // {'a', 'b', 'c', 'd'}
a.difference(b);         // {'a'}
```

### Maps (Dictionaries)

```dart
Map<String, int> scores = {
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
scores.entries.forEach((e) => print('${e.key}: ${e.value}'));

// Map.fromIterable
var map = Map.fromIterable(
  [1, 2, 3],
  key: (e) => 'key$e',
  value: (e) => e * e,
);
```

### Records (Dart 3+)

```dart
// Records — anonymous immutable value types
var point = (x: 10, y: 20);
print(point.x); // 10
print(point.y); // 20

// Positional records
var rgb = (255, 128, 0);
print(rgb.$1); // 255

// Function returning multiple values
(String, int) getUserInfo() => ('Mustafa', 25);
var (name, age) = getUserInfo();
```

---

## Operators

```dart
// Arithmetic
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
obj as String;                // type cast (throws if wrong type)
```

---

## Control Flow

### If / Else

```dart
if (score >= 90) {
  print('A');
} else if (score >= 80) {
  print('B');
} else {
  print('C');
}

// Ternary
String grade = score >= 60 ? 'Pass' : 'Fail';
```

### Loops

```dart
// for loop
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
}
```

### Switch / Patterns (Dart 3+)

```dart
// Classic switch
switch (command) {
  case 'start':
    startEngine();
    break;
  case 'stop':
    stopEngine();
    break;
  default:
    print('Unknown command');
}

// Enhanced switch (Dart 3 — expression)
String label = switch (status) {
  200 => 'OK',
  404 => 'Not Found',
  500 => 'Server Error',
  _ => 'Unknown',
};

// Pattern matching
switch (shape) {
  case Circle(radius: var r):
    print('Circle with radius $r');
  case Rectangle(width: var w, height: var h):
    print('Rectangle $w x $h');
}
```

---

## Functions

```dart
// Named function
int add(int a, int b) => a + b;

// Optional positional parameters
String greet(String name, [String? title]) {
  return 'Hello, ${title ?? ''} $name';
}

// Named parameters
void createUser({
  required String name,
  int age = 18,
  String? email,
}) {
  print('$name, $age');
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
triple(5); // 15
```

---

## Classes & OOP

```dart
class Animal {
  String name;
  int age;

  // Constructor
  Animal({required this.name, required this.age});

  // Named constructor
  Animal.unnamed() : name = 'Unknown', age = 0;

  // Method
  void speak() => print('$name makes a sound');

  // Getter / Setter
  String get info => '$name ($age years)';
  set petName(String n) => name = n;

  // Static
  static String species = 'Animal';
  static String classify() => 'Living being';

  // toString override
  @override
  String toString() => 'Animal($name, $age)';
}

// Usage
final dog = Animal(name: 'Rex', age: 3);
dog.speak();
print(dog.info);
```

### Inheritance

```dart
class Dog extends Animal {
  String breed;

  Dog({required super.name, required super.age, required this.breed});

  @override
  void speak() => print('$name barks!');

  void fetch() => print('$name fetches the ball!');
}

final labrador = Dog(name: 'Buddy', age: 2, breed: 'Labrador');
labrador.speak();   // overridden
labrador.fetch();   // own method
```

### Abstract Classes & Interfaces

```dart
abstract class Shape {
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
  void draw() => print('Drawing circle with radius $radius');
}

// Interface (implements, not extends)
class Printable {
  void printInfo() {}
}

class Dog extends Animal implements Printable {
  @override
  void printInfo() => print('Dog: $name');
}
```

### Mixins

```dart
mixin Swimmer {
  void swim() => print('Swimming!');
}

mixin Runner {
  void run() => print('Running!');
}

class Triathlete extends Person with Swimmer, Runner {
  // now has swim() and run()
}
```

### Enums (Enhanced — Dart 2.17+)

```dart
enum Direction { north, south, east, west }

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
print(Planet.earth.gravity);
```

### Extension Methods

```dart
extension StringExtensions on String {
  String get capitalize =>
      isEmpty ? this : '${this[0].toUpperCase()}${substring(1)}';

  bool get isEmail => contains('@') && contains('.');
}

// Usage
'hello'.capitalize;       // 'Hello'
'test@email.com'.isEmail; // true
```

---

## Null Safety

```dart
// Nullable types
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
String forced = nullableName!;  // throws if null
```

---

## Asynchronous Programming

### Futures

```dart
// async / await
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
    print('Error: $e');
  }
}

// Future chaining
fetchData()
  .then((data) => processData(data))
  .catchError((e) => handleError(e))
  .whenComplete(() => hideLoader());

// Wait for multiple futures
final results = await Future.wait([fetchA(), fetchB(), fetchC()]);
```

### Streams

```dart
// Creating a stream
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
}

// StreamController
final controller = StreamController<String>();
controller.stream.listen((event) => print('Received: $event'));
controller.sink.add('Hello');
controller.close();

// broadcast stream
final broadcast = StreamController<String>.broadcast();
```

### Isolates (Concurrency)

```dart
import 'dart:isolate';

// Run heavy work in a separate isolate
Future<int> computeHeavyWork(int input) async {
  return await Isolate.run(() => heavyComputation(input));
}

// Compute (Flutter's built-in)
import 'package:flutter/foundation.dart';
final result = await compute(heavyComputation, inputData);
```

---

## Error Handling

```dart
// try-catch-finally
try {
  final result = int.parse(userInput);
  print(result);
} on FormatException catch (e) {
  print('Bad format: $e');
} on RangeError catch (e, stackTrace) {
  print('Range error: $e');
  print(stackTrace);
} catch (e) {
  print('Unknown error: $e');
} finally {
  print('Always runs');
}

// Custom exceptions
class NetworkException implements Exception {
  final String message;
  final int statusCode;

  const NetworkException(this.message, this.statusCode);

  @override
  String toString() => 'NetworkException($statusCode): $message';
}

// Throwing
throw NetworkException('Not found', 404);
throw AssertionError('Value must be positive');
```

---

## Generics

```dart
// Generic class
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
    print('Int box: $value');
  case Box<String>(:var value):
    print('String box: $value');
}
```

---

## Libraries & Packages

```dart
// Import standard library
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
export 'src/product.dart';
```

### pubspec.yaml

```yaml
name: my_flutter_app
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
        - asset: fonts/Roboto-Regular.ttf
```

---

## Effective Dart Guidelines

### Style
- Use `lowerCamelCase` for variables, functions, parameters
- Use `UpperCamelCase` for classes, enums, typedefs
- Use `lowercase_with_underscores` for file names and library names
- Use `SCREAMING_CAPS` for constants (optional, `lowerCamelCase` also accepted)
- Prefer single quotes for strings
- Format code with `dart format`

### Usage
- Prefer `var` when type is obvious from the right-hand side
- Use `final` for variables that don't change
- Use `const` for compile-time constants
- Prefer `??` and `?.` over explicit null checks
- Use `is` for type checks, avoid `as` casts when possible
- Prefer `async/await` over raw Future chains
- Always await futures — don't ignore them

### Design
- Prefer making fields and top-level variables `final`
- Avoid exposing mutable state
- Use named parameters for 3+ parameters
- Document all public APIs

---

## Core Libraries

| Library | Purpose |
|---------|---------|
| `dart:core` | Built-in types (String, List, Map, DateTime, etc.) |
| `dart:async` | Async programming (Future, Stream, StreamController) |
| `dart:math` | Math functions (sqrt, pow, Random, pi, e) |
| `dart:convert` | Encoding/decoding (jsonEncode, jsonDecode, utf8, base64) |
| `dart:io` | File/socket/process I/O (non-web) |
| `dart:isolate` | Isolates for true concurrency |
| `dart:collection` | Additional collection types (Queue, LinkedHashMap) |
| `dart:js_interop` | JavaScript interop for web |

---

## Dart CLI Tools

```bash
dart --version                   # Check Dart version
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
dart fix --apply                 # Auto-fix lint issues
```

---

## Key Docs Links

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
| DartPad (Online) | https://dartpad.dev |
