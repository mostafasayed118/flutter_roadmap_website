import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Smartphone,
  Layers,
  Package,
  Flame,
} from "lucide-react";

export interface CodeSnippet {
  language: string;
  code: string;
  label?: string;
}

export interface DocSection {
  id: string;
  title: string;
  content: string;
  codeSnippets?: CodeSnippet[];
  relatedWeeks?: number[];
  tags?: string[];
}

export interface DocCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  relatedWeeks?: number[];
  tags?: string[];
  sections: DocSection[];
}

export const docsData: DocCategory[] = [
  {
    id: "dart-core",
    title: "Dart Core Concepts",
    icon: Code2,
    description:
      "Master the Dart language — types, OOP, async, null safety, generics, and effective Dart guidelines.",
    relatedWeeks: [1, 2, 3, 4],
    tags: ["dart", "language", "fundamentals", "types", "null-safety", "async", "generics", "oop"],
    sections: [
      {
        id: "dart-hello-world",
        title: "Hello World",
        content: `Every Dart app requires a top-level \`main()\` function as the entry point. Dart is a **client-optimized, type-safe, object-oriented language** that powers Flutter and is optimized for fast development with sub-second hot reload, high-quality production compilation to native ARM/x64/JavaScript/WebAssembly, and multi-platform support.`,
        relatedWeeks: [1],
        tags: ["dart", "hello-world", "main", "entry-point"],
        codeSnippets: [
          {
            language: "dart",
            label: "Hello World",
            code: `void main() {
  print('Hello, World!');
}`,
          },
        ],
      },
      {
        id: "dart-variables",
        title: "Variables & Types",
        content: `Dart is a **client-optimized, type-safe, object-oriented language** that powers Flutter. It uses type inference with \`var\`, immutable bindings with \`final\`, compile-time constants with \`const\`, and deferred initialization with \`late\`.`,
        relatedWeeks: [1],
        tags: ["dart", "variables", "types", "inference", "final", "const", "late"],
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
      },
      {
        id: "dart-built-in-types",
        title: "Built-in Types",
        content: `Dart provides **Numbers** (\`int\`, \`double\`, \`num\`), **Strings** with interpolation and multi-line support, **Booleans**, **Lists** (ordered collections), **Sets** (unordered unique), **Maps** (key-value pairs), and Dart 3+ **Records** (anonymous immutable value types).`,
        relatedWeeks: [1],
        tags: ["dart", "numbers", "strings", "lists", "sets", "maps", "records"],
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
      },
      {
        id: "dart-operators",
        title: "Operators",
        content: `Dart supports standard arithmetic, comparison, logical, and assignment operators. Key features include **null-aware operators** (\`??\`, \`?.\`, \`??=\`), the **cascade** operator (\`..\`) for chained method calls, and the **spread** operator (\`...\`) for expanding collections.`,
        relatedWeeks: [1],
        tags: ["dart", "operators", "null-aware", "cascade", "spread", "type-test"],
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
      },
      {
        id: "dart-functions",
        title: "Functions",
        content: `Dart functions support **named parameters**, **optional positional parameters**, **closures**, and **higher-order functions** (functions as first-class citizens). Use \`=>\` for concise single-expression bodies.`,
        relatedWeeks: [1],
        tags: ["dart", "functions", "named-parameters", "closures", "higher-order"],
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
      },
      {
        id: "dart-classes-oop",
        title: "Classes & OOP",
        content: `Dart supports **classes** with constructors (named, factory), **inheritance** (\`extends\`), **abstract classes**, **interfaces** (\`implements\`), **mixins** (\`mixin\`), **enhanced enums** (Dart 2.17+), and **extension methods** for adding functionality to existing types.`,
        relatedWeeks: [2],
        tags: ["dart", "classes", "oop", "inheritance", "mixins", "interfaces", "enums", "extensions"],
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
      },
      {
        id: "dart-null-safety",
        title: "Null Safety",
        content: `Dart's **null safety** system distinguishes between nullable (\`String?\`) and non-nullable (\`String\`) types. Use the **null-aware operators** (\`??\`, \`?.\`, \`??=\`) for safe operations and the **null assertion** operator (\`!\`) only when you're certain a value isn't null.`,
        relatedWeeks: [2],
        tags: ["dart", "null-safety", "nullable", "null-aware", "type-safety"],
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
      },
      {
        id: "dart-async",
        title: "Asynchronous Programming",
        content: `Dart provides **Futures** (single async values), **Streams** (sequences of async data), and **Isolates** (true concurrency without shared memory). Use \`async\`/\`await\` for clean asynchronous code and \`Isolate.run()\` or \`compute()\` for heavy computations.`,
        relatedWeeks: [3],
        tags: ["dart", "async", "futures", "streams", "isolates", "concurrency"],
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
      },
      {
        id: "dart-error-handling",
        title: "Error Handling",
        content: `Dart uses **try-catch-finally** for exception handling with typed catch clauses (\`on FormatException\`). You can create **custom exceptions** by implementing the \`Exception\` interface and throw them with the \`throw\` keyword.`,
        relatedWeeks: [3],
        tags: ["dart", "error-handling", "try-catch", "exceptions", "custom-exceptions"],
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
      },
      {
        id: "dart-generics",
        title: "Generics",
        content: `Generics enable you to write **reusable, type-safe** code. Define generic classes (\`Box<T>\`), generic functions (\`T first<T>(List<T>)\`), and use **bounded generics** (\`<T extends num>\`) to constrain type parameters.`,
        relatedWeeks: [3],
        tags: ["dart", "generics", "type-safety", "bounded-generics"],
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
      },
      {
        id: "dart-control-flow",
        title: "Control Flow",
        content: `Dart supports standard **if/else**, **loops** (for, for-in, while, do-while), and Dart 3+ **enhanced switch** with expression syntax and **pattern matching** for destructuring complex types.`,
        relatedWeeks: [1],
        tags: ["dart", "control-flow", "if-else", "loops", "switch", "pattern-matching"],
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
      },
      {
        id: "dart-libraries",
        title: "Libraries & Packages",
        content: `Dart uses \`import\` to bring in standard libraries (\`dart:math\`, \`dart:convert\`, \`dart:async\`), pub packages (\`package:http\`), and local files. The \`pubspec.yaml\` file declares dependencies, assets, and fonts for your project.`,
        relatedWeeks: [4],
        tags: ["dart", "libraries", "packages", "imports", "pubspec", "dependencies"],
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
      },
      {
        id: "dart-effective-dart",
        title: "Effective Dart & CLI",
        content: `Follow **Effective Dart** guidelines: use \`lowerCamelCase\` for variables/functions, \`UpperCamelCase\` for classes, single quotes for strings, and prefer \`final\`/\`const\` over \`var\`. Key CLI tools include \`dart analyze\`, \`dart format\`, \`dart test\`, and \`dart fix --apply\`.`,
        relatedWeeks: [4],
        tags: ["dart", "effective-dart", "style-guide", "cli", "linting", "formatting"],
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
      },
      {
        id: "dart-enhanced-enums",
        title: "Enhanced Enums & Extension Methods",
        content: `Dart 2.17+ introduces **enhanced enums** that can have fields, constructors, and methods. **Extension methods** add functionality to existing types without modifying them.`,
        relatedWeeks: [2],
        tags: ["dart", "enums", "extension-methods", "enhanced-enums"],
        codeSnippets: [
          {
            language: "dart",
            label: "Enhanced Enums & Extensions",
            code: `// Enhanced Enum
enum Planet {
  mercury(mass: 3.3e23, radius: 2.44e6),
  earth(mass: 5.97e24, radius: 6.37e6);

  const Planet({required this.mass, required this.radius});
  final double mass;
  final double radius;
  double get gravity => 6.67e-11 * mass / (radius * radius);
}

print(Planet.earth.gravity); // 9.8

// Extension Methods
extension StringExtensions on String {
  String get capitalize =>
      isEmpty ? this : '\${this[0].toUpperCase()}\${substring(1)}';
  bool get isEmail => contains('@') && contains('.');
}

'hello'.capitalize;       // 'Hello'
'test@email.com'.isEmail; // true`,
          },
        ],
      },
      {
        id: "dart-core-libraries",
        title: "Core Libraries",
        content: `Dart provides essential core libraries for common operations. Understanding these libraries is fundamental to effective Dart programming.`,
        relatedWeeks: [3],
        tags: ["dart", "core-libraries", "dart-async", "dart-math", "dart-convert", "dart-io"],
        codeSnippets: [
          {
            language: "text",
            label: "Core Libraries Reference",
            code: `| Library         | Purpose                                              |
|-----------------|------------------------------------------------------|
| dart:core       | Built-in types (String, List, Map, DateTime, etc.)   |
| dart:async      | Async programming (Future, Stream, StreamController) |
| dart:math       | Math functions (sqrt, pow, Random, pi, e)            |
| dart:convert    | Encoding/decoding (jsonEncode, jsonDecode, utf8)     |
| dart:io         | File/socket/process I/O (non-web)                    |
| dart:isolate    | Isolates for true concurrency                        |
| dart:collection | Additional collection types (Queue, LinkedHashMap)   |
| dart:js_interop | JavaScript interop for web                           |`,
          },
        ],
      },
    ],
  },
  {
    id: "flutter-core",
    title: "Flutter UI & Core",
    icon: Smartphone,
    description:
      "Widgets, layout system, navigation, state management, animations, theming, and testing in Flutter.",
    relatedWeeks: [5, 6, 7, 8, 9],
    tags: ["flutter", "widgets", "layout", "navigation", "animations", "state", "theming", "testing"],
    sections: [
      {
        id: "flutter-widgets",
        title: "Widgets & Architecture",
        content: `In Flutter, **everything is a widget**. Widgets describe what their view should look like given the current configuration and state. **StatelessWidget** is immutable; **StatefulWidget** maintains mutable state via \`setState()\`. The layout rule: **"Constraints flow down. Sizes flow up. Parents set positions."**`,
        relatedWeeks: [5],
        tags: ["flutter", "widgets", "stateless", "stateful", "widget-tree", "architecture"],
        codeSnippets: [
          {
            language: "dart",
            label: "StatelessWidget vs StatefulWidget",
            code: `// StatelessWidget — no mutable state
class MyText extends StatelessWidget {
  const MyText({super.key});
  @override
  Widget build(BuildContext context) {
    return const Text('Hello, Flutter!');
  }
}

// StatefulWidget — has mutable state
class Counter extends StatefulWidget {
  const Counter({super.key});
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => setState(() => _count++),
      child: Text('Count: \$_count'),
    );
  }
}`,
          },
        ],
      },
      {
        id: "flutter-layout",
        title: "Layout System",
        content: `Flutter's layout uses **Row** (horizontal), **Column** (vertical), **Stack** (overlapping), **Container** (flexible box), and **Expanded** (fills available space). For scrolling, use **ListView.builder**, **GridView**, and **CustomScrollView** with **Slivers**.`,
        relatedWeeks: [5],
        tags: ["flutter", "layout", "row", "column", "stack", "container", "slivers"],
        codeSnippets: [
          {
            language: "dart",
            label: "Common Layout Widgets",
            code: `// Row — horizontal layout
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [Widget1(), Widget2(), Widget3()],
)

// Column — vertical layout
Column(
  mainAxisSize: MainAxisSize.min,
  children: [Widget1(), Widget2()],
)

// Stack — overlapping widgets
Stack(
  alignment: Alignment.center,
  children: [BackgroundWidget(), ForegroundWidget()],
)

// Expanded — fills available space
Row(children: [
  Expanded(flex: 2, child: WidgetA()),
  Expanded(flex: 1, child: WidgetB()),
])

// Container — flexible box
Container(
  width: 200, height: 100,
  padding: const EdgeInsets.all(16),
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(12),
  ),
  child: Text('Hello'),
)`,
          },
          {
            language: "dart",
            label: "Slivers & CustomScrollView",
            code: `CustomScrollView(
  slivers: [
    SliverAppBar(expandedHeight: 200, floating: true, pinned: true),
    SliverList(delegate: SliverChildBuilderDelegate(...)),
    SliverGrid(delegate: ..., gridDelegate: ...),
  ],
)

// GridView
GridView.builder(
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,
    childAspectRatio: 1.5,
  ),
  itemBuilder: (context, index) => Card(...),
)`,
          },
        ],
      },
      {
        id: "flutter-navigation",
        title: "Navigation & Routing",
        content: `The recommended approach is **go_router** — the official Flutter team package. It provides URL-based routing, deep linking, nested navigation with **ShellRoute**, redirect guards, and path/query parameters. Navigator 1.0 is still available for simpler use cases.`,
        relatedWeeks: [6],
        tags: ["flutter", "navigation", "routing", "go-router", "shell-route", "deep-linking"],
        codeSnippets: [
          {
            language: "dart",
            label: "go_router Setup",
            code: `final GoRouter _router = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: '/details/:id',
      builder: (context, state) {
        final id = state.pathParameters['id']!;
        return DetailsScreen(id: id);
      },
    ),
    ShellRoute(
      builder: (context, state, child) => ScaffoldWithNav(child: child),
      routes: [
        GoRoute(path: '/home', builder: ...),
        GoRoute(path: '/profile', builder: ...),
      ],
    ),
  ],
);

// Navigation
context.go('/details/42');       // replace current
context.push('/profile');        // push on stack
context.pop();                   // go back
context.goNamed('profile');      // named route`,
          },
        ],
      },
      {
        id: "flutter-networking",
        title: "Networking & JSON",
        content: `For HTTP requests, use the **http** package for simple calls or **Dio** for advanced features (interceptors, file upload/download). JSON serialization can be done manually with \`fromJson\`/\`toJson\` or automated with **json_serializable** + **build_runner**.`,
        relatedWeeks: [6],
        tags: ["flutter", "networking", "http", "dio", "json", "serialization"],
        codeSnippets: [
          {
            language: "dart",
            label: "HTTP & JSON Serialization",
            code: `import 'package:http/http.dart' as http;
import 'dart:convert';

Future<List<Post>> fetchPosts() async {
  final response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/posts'),
  );
  if (response.statusCode == 200) {
    final List<dynamic> jsonList = jsonDecode(response.body);
    return jsonList.map((json) => Post.fromJson(json)).toList();
  } else {
    throw Exception('Failed to load posts');
  }
}

// Manual JSON serialization
class User {
  final String name;
  final int age;
  User({required this.name, required this.age});
  factory User.fromJson(Map<String, dynamic> json) => User(
    name: json['name'] as String,
    age: json['age'] as int,
  );
  Map<String, dynamic> toJson() => {'name': name, 'age': age};
}`,
          },
          {
            language: "dart",
            label: "FutureBuilder & StreamBuilder",
            code: `FutureBuilder<List<Post>>(
  future: fetchPosts(),
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return const CircularProgressIndicator();
    }
    if (snapshot.hasError) return Text('Error: \${snapshot.error}');
    if (!snapshot.hasData) return const Text('No data');
    return ListView.builder(
      itemCount: snapshot.data!.length,
      itemBuilder: (_, i) => ListTile(title: Text(snapshot.data![i].title)),
    );
  },
)`,
          },
        ],
      },
      {
        id: "flutter-animations",
        title: "Animations",
        content: `Flutter offers **implicit animations** (AnimatedContainer, AnimatedOpacity) for simple property transitions, **explicit animations** (AnimationController) for full control, and **Hero animations** for shared element transitions between routes.`,
        relatedWeeks: [7],
        tags: ["flutter", "animations", "implicit", "explicit", "animation-controller", "hero"],
        codeSnippets: [
          {
            language: "dart",
            label: "Animation Patterns",
            code: `// Implicit — AnimatedContainer
AnimatedContainer(
  duration: const Duration(milliseconds: 300),
  curve: Curves.easeInOut,
  width: _expanded ? 200 : 100,
  color: _expanded ? Colors.blue : Colors.red,
)

// Explicit — AnimationController
class _SpinningWidgetState extends State<SpinningWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat();
  }
  @override
  Widget build(BuildContext context) {
    return RotationTransition(
      turns: _controller,
      child: const Icon(Icons.refresh, size: 48),
    );
  }
  @override
  void dispose() { _controller.dispose(); super.dispose(); }
}

// Hero animation (same tag on source & destination)
Hero(tag: 'hero-image-\${item.id}', child: Image.network(item.imageUrl))`,
          },
        ],
      },
      {
        id: "flutter-state-management",
        title: "State Management",
        content: `Flutter offers multiple state management options: **setState** (local), **Provider** (lightweight), **Riverpod** (compile-safe), **flutter_bloc** (event-driven, scalable), **GetX** (all-in-one), and **MobX** (reactive). Choose based on app complexity and team preference.`,
        relatedWeeks: [8],
        tags: ["flutter", "state-management", "provider", "riverpod", "bloc", "getx", "mobx"],
        codeSnippets: [
          {
            language: "dart",
            label: "Provider Pattern",
            code: `// 1. Define a ChangeNotifier
class CounterModel extends ChangeNotifier {
  int _count = 0;
  int get count => _count;
  void increment() { _count++; notifyListeners(); }
}

// 2. Provide it
ChangeNotifierProvider(
  create: (_) => CounterModel(),
  child: MyApp(),
)

// 3. Consume it
Consumer<CounterModel>(
  builder: (context, counter, _) => Text('\${counter.count}'),
)

// Or with context extensions
context.watch<CounterModel>().count    // rebuilds on change
context.read<CounterModel>().increment()  // no rebuild`,
          },
        ],
      },
      {
        id: "flutter-theming",
        title: "Theming & Material 3",
        content: `Use \`ThemeData\` with **Material 3** enabled for modern design. Access theme values via \`Theme.of(context).colorScheme\` and \`Theme.of(context).textTheme\`. Support dark mode with \`darkTheme\` and \`themeMode: ThemeMode.system\`.`,
        relatedWeeks: [7],
        tags: ["flutter", "theming", "material3", "color-scheme", "dark-mode"],
        codeSnippets: [
          {
            language: "dart",
            label: "Material 3 Theming",
            code: `MaterialApp(
  theme: ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
    textTheme: const TextTheme(
      bodyLarge: TextStyle(fontSize: 16, fontFamily: 'Roboto'),
    ),
  ),
  darkTheme: ThemeData.dark(useMaterial3: true),
  themeMode: ThemeMode.system,
)

// Use theme values
Theme.of(context).colorScheme.primary
Theme.of(context).textTheme.headlineMedium`,
          },
        ],
      },
      {
        id: "flutter-testing",
        title: "Testing",
        content: `Flutter supports **unit tests** (logic), **widget tests** (UI components), and **integration tests** (full app flows). Use \`test\` package for unit/widget tests and \`integration_test\` package for end-to-end testing.`,
        relatedWeeks: [9],
        tags: ["flutter", "testing", "unit-test", "widget-test", "integration-test"],
        codeSnippets: [
          {
            language: "dart",
            label: "Test Patterns",
            code: `// Unit test
test('Counter increments', () {
  final counter = Counter();
  counter.increment();
  expect(counter.value, 1);
});

// Widget test
testWidgets('MyWidget shows title', (tester) async {
  await tester.pumpWidget(const MyWidget());
  expect(find.text('Hello'), findsOneWidget);
  await tester.tap(find.byType(ElevatedButton));
  await tester.pump();
  expect(find.text('Tapped'), findsOneWidget);
});`,
          },
        ],
      },
      {
        id: "flutter-cli",
        title: "CLI Commands",
        content: `Essential Flutter CLI commands for creating projects, running apps, building for different platforms, managing dependencies, and running tests.`,
        relatedWeeks: [5],
        tags: ["flutter", "cli", "commands", "build", "run", "debug"],
        codeSnippets: [
          {
            language: "bash",
            label: "Flutter CLI",
            code: `flutter create my_app            # Create new project
flutter run                      # Run on connected device
flutter run -d chrome            # Run on web
flutter build apk                # Build Android APK
flutter build ios                # Build iOS
flutter build web                # Build web
flutter pub get                  # Install dependencies
flutter pub upgrade              # Upgrade packages
flutter pub outdated             # Show outdated packages
flutter clean                    # Clean build cache
flutter doctor                   # Check environment
flutter analyze                  # Run Dart analyzer
flutter test                     # Run tests`,
          },
        ],
      },
      {
        id: "flutter-widget-catalog",
        title: "Widget Catalog",
        content: `Flutter provides a comprehensive widget catalog organized by design system (**Material** for Android/Cross-platform, **Cupertino** for iOS-style) and by category (Layout, Scrolling, Input, Interaction, Animation, Async, Text, Assets, Painting, Accessibility).`,
        relatedWeeks: [5],
        tags: ["flutter", "widget-catalog", "material", "cupertino", "design-system"],
        codeSnippets: [
          {
            language: "text",
            label: "Widget Catalog Overview",
            code: `Material Components: MaterialApp, Scaffold, AppBar, ElevatedButton, TextButton,
  OutlinedButton, FloatingActionButton, TextField, Form, DropdownButton,
  ListView, GridView, Card, Chip, Dialog, SnackBar, BottomSheet,
  NavigationBar, NavigationRail, Drawer, ThemeData, ColorScheme

Cupertino: CupertinoApp, CupertinoPageScaffold, CupertinoButton,
  CupertinoTextField, CupertinoNavigationBar, CupertinoTabBar,
  CupertinoAlertDialog, CupertinoActionSheet

Categories:
  Layout:       Row, Column, Stack, Flex, Wrap, Expanded, SizedBox, Container, Padding, Center, Align
  Scrolling:     ListView, GridView, SingleChildScrollView, CustomScrollView, Sliver*
  Input:         TextField, Checkbox, Radio, Switch, Slider, Form
  Interaction:   GestureDetector, InkWell, Dismissible, Draggable
  Animation:     AnimatedContainer, AnimatedOpacity, Hero, AnimationController
  Async:         FutureBuilder, StreamBuilder
  Text:          Text, RichText, DefaultTextStyle
  Assets:        Image, Icon, AssetImage, NetworkImage
  Painting:      CustomPaint, ClipRRect, DecoratedBox, BackdropFilter
  Accessibility: Semantics, MergeSemantics, ExcludeSemantics`,
          },
        ],
      },
      {
        id: "flutter-adaptive-design",
        title: "Adaptive & Responsive Design",
        content: `Flutter supports adaptive and responsive design through **MediaQuery** for screen dimensions, **LayoutBuilder** for constraint-based layouts, **SafeArea** for notch/cutout handling, and breakpoint-based layouts for mobile/tablet/desktop.`,
        relatedWeeks: [8],
        tags: ["flutter", "adaptive", "responsive", "layout-builder", "media-query", "breakpoints"],
        codeSnippets: [
          {
            language: "dart",
            label: "Adaptive Layout Patterns",
            code: `// MediaQuery for screen size
final size = MediaQuery.of(context).size;
final screenWidth = size.width;

// LayoutBuilder for constraint-based layout
LayoutBuilder(
  builder: (context, constraints) {
    if (constraints.maxWidth > 600) {
      return WideLayout();
    }
    return NarrowLayout();
  },
)

// SafeArea for notch handling
SafeArea(child: Scaffold(...))

// Breakpoints
bool get isMobile => screenWidth < 600;
bool get isTablet => screenWidth >= 600 && screenWidth < 1200;
bool get isDesktop => screenWidth >= 1200;`,
          },
        ],
      },
      {
        id: "flutter-accessibility",
        title: "Accessibility",
        content: `Flutter provides built-in accessibility support through **Semantics** widgets, dynamic font sizing via **TextScaler**, and platform-specific screen reader support (TalkBack on Android, VoiceOver on iOS).`,
        relatedWeeks: [9],
        tags: ["flutter", "accessibility", "semantics", "a11y", "screen-reader", "contrast"],
        codeSnippets: [
          {
            language: "dart",
            label: "Accessibility Patterns",
            code: `Semantics(
  label: 'Submit form button',
  button: true,
  child: ElevatedButton(
    onPressed: onSubmit,
    child: const Text('Submit'),
  ),
)

// Key practices:
// - Always provide semantic labels for images and icons
// - Use sufficient color contrast ratios
// - Support dynamic font sizes via TextScaler
// - Test with TalkBack (Android) and VoiceOver (iOS)`,
          },
        ],
      },
      {
        id: "flutter-internationalization",
        title: "Internationalization (i18n)",
        content: `Flutter supports internationalization through **flutter_localizations** and the **intl** package. Use code generation for type-safe translations.`,
        relatedWeeks: [9],
        tags: ["flutter", "i18n", "internationalization", "localization", "translations"],
        codeSnippets: [
          {
            language: "yaml",
            label: "pubspec.yaml for i18n",
            code: `dependencies:
  flutter_localizations:
    sdk: flutter
  intl: any

flutter:
  generate: true`,
          },
          {
            language: "dart",
            label: "Using Localizations",
            code: `MaterialApp(
  localizationsDelegates: AppLocalizations.localizationsDelegates,
  supportedLocales: AppLocalizations.supportedLocales,
)

Text(AppLocalizations.of(context)!.helloWorld)`,
          },
        ],
      },
      {
        id: "flutter-assets-images",
        title: "Assets & Images",
        content: `Flutter supports asset images, network images, and custom fonts through the \`pubspec.yaml\` configuration. Use **cached_network_image** for efficient image caching.`,
        relatedWeeks: [5],
        tags: ["flutter", "assets", "images", "fonts", "cached-network-image"],
        codeSnippets: [
          {
            language: "yaml",
            label: "pubspec.yaml Assets",
            code: `flutter:
  assets:
    - assets/images/logo.png
    - assets/icons/
  fonts:
    - family: MyFont
      fonts:
        - asset: assets/fonts/MyFont-Regular.ttf
        - asset: assets/fonts/MyFont-Bold.ttf
          weight: 700`,
          },
          {
            language: "dart",
            label: "Loading Assets",
            code: `Image.asset('assets/images/logo.png')
Image.network('https://example.com/image.jpg')
CachedNetworkImage(imageUrl: url, placeholder: (_, __) => CircularProgressIndicator())`,
          },
        ],
      },
      {
        id: "flutter-devtools",
        title: "Flutter DevTools",
        content: `Flutter DevTools is a suite of performance and debugging tools including Widget Inspector, Performance profiler, CPU Profiler, Memory tracker, Network monitor, Logging, and Layout Explorer.`,
        relatedWeeks: [9],
        tags: ["flutter", "devtools", "debugging", "performance", "profiling"],
        codeSnippets: [
          {
            language: "bash",
            label: "Launching DevTools",
            code: `flutter run --debug
# Then open link printed in terminal, or:
dart devtools`,
          },
          {
            language: "text",
            label: "DevTools Tools",
            code: `| Tool             | Purpose                              |
|------------------|--------------------------------------|
| Widget Inspector | Visualize widget tree and properties |
| Performance      | Frame rendering, jank detection      |
| CPU Profiler     | Identify slow code                   |
| Memory           | Track memory usage and leaks         |
| Network          | Monitor HTTP requests                |
| Logging          | View print statements and errors     |
| Layout Explorer  | Debug layout constraints             |`,
          },
        ],
      },
      {
        id: "flutter-local-storage",
        title: "Local Storage",
        content: `Flutter offers several local storage options: **shared_preferences** for simple key-value storage, **sqflite** for full SQLite relational database, **Hive** for fast NoSQL with typed boxes, and **flutter_secure_storage** for encrypted key-value storage.`,
        relatedWeeks: [6],
        tags: ["flutter", "storage", "shared-preferences", "sqflite", "hive", "secure-storage"],
        codeSnippets: [
          {
            language: "dart",
            label: "shared_preferences",
            code: `final prefs = await SharedPreferences.getInstance();
await prefs.setString('username', 'mustafa');
final name = prefs.getString('username') ?? 'Guest';`,
          },
          {
            language: "dart",
            label: "sqflite (SQLite)",
            code: `final db = await openDatabase('app.db', version: 1,
  onCreate: (db, version) {
    return db.execute('CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT)');
  },
);
await db.insert('items', {'name': 'Task 1'});
final List<Map<String, dynamic>> rows = await db.query('items');`,
          },
          {
            language: "dart",
            label: "Hive (Fast NoSQL)",
            code: `await Hive.initFlutter();
final box = await Hive.openBox('settings');
box.put('darkMode', true);
final darkMode = box.get('darkMode', defaultValue: false);`,
          },
        ],
      },
    ],
  },
  {
    id: "bloc-cubit",
    title: "Bloc & Cubit State Management",
    icon: Layers,
    description:
      "Predictable state management with Cubit (simple) and Bloc (event-driven), Flutter widgets, architecture patterns, and testing.",
    relatedWeeks: [10, 11, 12, 13],
    tags: ["bloc", "cubit", "state-management", "event-driven", "flutter-bloc", "hydrated-bloc"],
    sections: [
      {
        id: "bloc-why",
        title: "Why Bloc?",
        content: `**Bloc** (Business Logic Component) separates presentation from business logic, making apps easier to test, maintain, and scale. It provides **separation of concerns**, **testability** via pure functions, **predictability** (same event → same state), and **traceability** (every state change is logged).`,
        relatedWeeks: [10],
        tags: ["bloc", "architecture", "separation-of-concerns", "testability"],
        codeSnippets: [],
      },
      {
        id: "bloc-cubit-concept",
        title: "Cubit: Simple State Management",
        content: `A **Cubit** extends \`BlocBase\` and exposes **functions** to trigger state changes (no events needed). The flow is: **UI → calls Cubit function → Cubit emits new state → UI rebuilds**. Use \`onChange\` and \`BlocObserver\` for debugging.`,
        relatedWeeks: [10],
        tags: ["bloc", "cubit", "state", "emit", "bloc-observer"],
        codeSnippets: [
          {
            language: "dart",
            label: "Creating a Cubit",
            code: `class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0); // initial state = 0
  void increment() => emit(state + 1);
  void decrement() => emit(state - 1);
  void reset() => emit(0);
}

// Complex state with copyWith
class AuthCubit extends Cubit<AuthState> {
  AuthCubit() : super(const AuthState());
  Future<void> login(String username, String password) async {
    try {
      emit(state.copyWith(isLoggedIn: false, error: null));
      await Future.delayed(const Duration(seconds: 1));
      emit(state.copyWith(isLoggedIn: true, username: username));
    } catch (e) {
      emit(state.copyWith(error: e.toString()));
    }
  }
}

// Observing
@override
void onChange(Change<int> change) {
  super.onChange(change);
  print('\${change.currentState} → \${change.nextState}');
}`,
          },
        ],
      },
      {
        id: "bloc-event-concept",
        title: "Bloc: Event-Driven State",
        content: `A **Bloc** uses **Events** instead of functions. Events are dispatched from the UI → Bloc maps them to states. This provides better traceability and supports advanced event handling with **transformers** (debounce, throttle, sequential).`,
        relatedWeeks: [11],
        tags: ["bloc", "events", "event-driven", "traceability"],
        codeSnippets: [
          {
            language: "dart",
            label: "Creating a Bloc",
            code: `// Define Events
abstract class CounterEvent {}
class CounterIncrementPressed extends CounterEvent {}
class CounterDecrementPressed extends CounterEvent {}

// Create the Bloc
class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<CounterIncrementPressed>((event, emit) => emit(state + 1));
    on<CounterDecrementPressed>((event, emit) => emit(state - 1));
  }
}

// Async events with states
abstract class WeatherState {}
class WeatherInitial extends WeatherState {}
class WeatherLoading extends WeatherState {}
class WeatherLoaded extends WeatherState {
  final Weather weather;
  const WeatherLoaded(this.weather);
}
class WeatherError extends WeatherState {
  final String message;
  const WeatherError(this.message);
}`,
          },
        ],
      },
      {
        id: "bloc-vs-cubit",
        title: "Cubit vs Bloc",
        content: `**Cubit** is simpler with less boilerplate — best for simple state (toggle, counter, form fields). **Bloc** provides event traceability, advanced event handling (transformers), and structured testing — best for complex flows and large teams.`,
        relatedWeeks: [10],
        tags: ["bloc", "cubit", "comparison", "trade-offs"],
        codeSnippets: [],
      },
      {
        id: "bloc-widgets",
        title: "Flutter Bloc Widgets",
        content: `**BlocProvider** provides a Bloc/Cubit to the widget tree. **BlocBuilder** rebuilds UI on state changes. **BlocSelector** rebuilds only when a specific value changes. **BlocListener** reacts without rebuilding (for side effects). **BlocConsumer** combines Builder + Listener. **RepositoryProvider** provides data layer dependencies.`,
        relatedWeeks: [11],
        tags: ["bloc", "widgets", "bloc-provider", "bloc-builder", "bloc-listener", "bloc-consumer"],
        codeSnippets: [
          {
            language: "dart",
            label: "BlocProvider & BlocBuilder",
            code: `// Providing a Cubit/Bloc
BlocProvider(
  create: (context) => CounterCubit(),
  child: const CounterPage(),
)

// Multiple providers
MultiBlocProvider(
  providers: [
    BlocProvider(create: (_) => CounterCubit()),
    BlocProvider(create: (_) => AuthCubit()),
  ],
  child: const MyApp(),
)

// Builder — rebuilds on state changes
BlocBuilder<CounterCubit, int>(
  builder: (context, state) {
    return Text('Count: \$state');
  },
)

// Conditional rebuild
BlocBuilder<WeatherBloc, WeatherState>(
  buildWhen: (previous, current) => current is WeatherLoaded,
  builder: (context, state) {
    if (state is WeatherLoaded) return WeatherWidget(state.weather);
    return const SizedBox.shrink();
  },
)`,
          },
          {
            language: "dart",
            label: "BlocListener & BlocConsumer",
            code: `// Listener — side effects without rebuild
BlocListener<AuthCubit, AuthState>(
  listener: (context, state) {
    if (state.isLoggedIn) {
      Navigator.pushReplacementNamed(context, '/home');
    }
    if (state.error != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(state.error!)),
      );
    }
  },
  child: const LoginForm(),
)

// Consumer — Builder + Listener combined
BlocConsumer<AuthCubit, AuthState>(
  listenWhen: (prev, curr) => curr.isLoggedIn != prev.isLoggedIn,
  listener: (context, state) {
    if (state.isLoggedIn) context.go('/home');
  },
  buildWhen: (prev, curr) => curr.error != prev.error,
  builder: (context, state) {
    if (state.error != null) return ErrorWidget(state.error!);
    return const LoginForm();
  },
)`,
          },
          {
            language: "dart",
            label: "Context Extensions",
            code: `// context.read — access WITHOUT listening (in callbacks)
ElevatedButton(
  onPressed: () => context.read<CounterCubit>().increment(),
  child: const Text('Increment'),
)

// context.watch — access AND rebuild (in build())
final count = context.watch<CounterCubit>().state;

// context.select — rebuild only when specific field changes
final username = context.select<AuthCubit, String>(
  (cubit) => cubit.state.username ?? 'Guest',
);`,
          },
        ],
      },
      {
        id: "bloc-architecture",
        title: "3-Layer Architecture",
        content: `Recommended architecture: **Presentation Layer** (Widgets, Pages, BlocBuilders) → **Business Logic Layer** (Bloc / Cubit) → **Data Layer** (Repositories, APIs, Local DB). Use a feature-based folder structure with separate files for bloc, cubit, state, event, and view.`,
        relatedWeeks: [12],
        tags: ["bloc", "architecture", "clean-architecture", "folder-structure", "layers"],
        codeSnippets: [
          {
            language: "text",
            label: "Folder Structure",
            code: `lib/
├── app/
│   ├── app.dart               # Root widget with providers
│   └── router.dart            # Navigation setup
├── features/
│   └── counter/
│       ├── data/
│       │   └── counter_repository.dart
│       ├── bloc/
│       │   ├── counter_bloc.dart
│       │   ├── counter_event.dart
│       │   └── counter_state.dart
│       └── view/
│           ├── counter_page.dart
│           └── counter_view.dart
├── core/
│   ├── network/
│   └── utils/
└── main.dart`,
          },
        ],
      },
      {
        id: "bloc-event-transformers",
        title: "Event Transformers",
        content: `Use **bloc_concurrency** to control how concurrent events are handled: **sequential** (queue), **droppable** (ignore new), **restartable** (cancel and restart), and **concurrent** (parallel, default). Common pattern: debounce for search queries.`,
        relatedWeeks: [13],
        tags: ["bloc", "event-transformers", "bloc-concurrency", "debounce", "sequential"],
        codeSnippets: [
          {
            language: "dart",
            label: "Event Transformers",
            code: `import 'package:bloc_concurrency/bloc_concurrency.dart';

class SearchBloc extends Bloc<SearchEvent, SearchState> {
  SearchBloc() : super(SearchInitial()) {
    // Sequential — queue events
    on<SearchEvent>(_onSearch, transformer: sequential());
    // Droppable — ignore new while processing
    on<SearchEvent>(_onSearch, transformer: droppable());
    // Restartable — cancel and restart (debounce)
    on<SearchEvent>(_onSearch, transformer: restartable());
  }
}

// Practical: search with debounce
on<SearchQueryChanged>(
  _onSearchQueryChanged,
  transformer: (events, mapper) => events
      .debounceTime(const Duration(milliseconds: 300))
      .switchMap(mapper),
);`,
          },
        ],
      },
      {
        id: "bloc-state-modeling",
        title: "State Modeling",
        content: `Use **sealed classes** (Dart 3+) for exhaustive pattern matching in UI, or a **single class with copyWith** for simpler states. Sealed classes ensure you handle every possible state in the UI.`,
        relatedWeeks: [12],
        tags: ["bloc", "state-modeling", "sealed-classes", "pattern-matching", "copyWith"],
        codeSnippets: [
          {
            language: "dart",
            label: "Sealed Classes & copyWith",
            code: `// Sealed classes — exhaustive matching
sealed class WeatherState {}
final class WeatherInitial extends WeatherState {}
final class WeatherLoading extends WeatherState {}
final class WeatherLoaded extends WeatherState {
  final Weather weather;
  const WeatherLoaded(this.weather);
}

// UI with exhaustive switch
BlocBuilder<WeatherBloc, WeatherState>(
  builder: (context, state) => switch (state) {
    WeatherInitial() => const Text('Enter a city'),
    WeatherLoading() => const CircularProgressIndicator(),
    WeatherLoaded(:var weather) => WeatherWidget(weather),
    WeatherError(:var message) => Text('Error: \$message'),
  },
)

// Single class with copyWith
class CounterState {
  final int count;
  final bool isLoading;
  const CounterState({this.count = 0, this.isLoading = false});
  CounterState copyWith({int? count, bool? isLoading}) {
    return CounterState(
      count: count ?? this.count,
      isLoading: isLoading ?? this.isLoading,
    );
  }
}`,
          },
        ],
      },
      {
        id: "bloc-testing",
        title: "Testing with bloc_test",
        content: `Use **bloc_test** and **mocktail** for testing Bloc/Cubit. The \`blocTest\` function validates the exact sequence of emitted states, with \`build\`, \`act\`, \`expect\`, and optional \`verify\` callbacks.`,
        relatedWeeks: [13],
        tags: ["bloc", "testing", "bloc-test", "mocktail", "unit-test"],
        codeSnippets: [
          {
            language: "dart",
            label: "Bloc Testing",
            code: `import 'package:bloc_test/bloc_test.dart';
import 'package:mocktail/mocktail.dart';

class MockWeatherRepository extends Mock implements WeatherRepository {}

blocTest<CounterCubit, int>(
  'emits [1] when increment is called',
  build: () => CounterCubit(),
  act: (cubit) => cubit.increment(),
  expect: () => [1],
);

blocTest<WeatherBloc, WeatherState>(
  'emits [Loading, Loaded] when WeatherRequested succeeds',
  setUp: () {
    when(() => mockRepository.fetchWeather('Cairo'))
        .thenAnswer((_) async => const Weather(temperature: 30));
  },
  build: () => WeatherBloc(mockRepository),
  act: (bloc) => bloc.add(const WeatherRequested('Cairo')),
  expect: () => [isA<WeatherLoading>(), isA<WeatherLoaded>()],
);`,
          },
        ],
      },
      {
        id: "bloc-hydrated",
        title: "hydrated_bloc (Persistence)",
        content: `Use **hydrated_bloc** to automatically save and restore Bloc/Cubit state across app restarts. Extend \`HydratedCubit\` instead of \`Cubit\` and implement \`fromJson\`/\`toJson\`.`,
        relatedWeeks: [13],
        tags: ["bloc", "hydrated-bloc", "persistence", "state-restoration"],
        codeSnippets: [
          {
            language: "dart",
            label: "hydrated_bloc Setup",
            code: `// Initialize in main
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  HydratedBloc.storage = await HydratedStorage.build(
    storageDirectory: kIsWeb
        ? HydratedStorage.webStorageDirectory
        : await getTemporaryDirectory(),
  );
  runApp(const MyApp());
}

// Extend HydratedCubit
class ThemeCubit extends HydratedCubit<ThemeMode> {
  ThemeCubit() : super(ThemeMode.system);
  void toggleTheme() => emit(
    state == ThemeMode.light ? ThemeMode.dark : ThemeMode.light,
  );
  @override
  ThemeMode fromJson(Map<String, dynamic> json) =>
      ThemeMode.values[json['themeMode'] as int];
  @override
  Map<String, dynamic> toJson(ThemeMode state) =>
      {'themeMode': state.index};
}`,
          },
        ],
      },
      {
        id: "bloc-naming",
        title: "Naming Conventions",
        content: `Follow consistent naming: \`<Feature>Cubit\` / \`<Feature>Bloc\` for classes, \`<Feature>Event\` for events, \`<Feature>State\` for state. Concrete events: \`<Feature><Action>\` (e.g., \`WeatherRequested\`). Concrete states: \`<Feature><Status>\` (e.g., \`WeatherLoading\`).`,
        relatedWeeks: [10],
        tags: ["bloc", "naming-conventions", "best-practices"],
        codeSnippets: [],
      },
      {
        id: "bloc-installation",
        title: "Installation & Setup",
        content: `Install **flutter_bloc** for Flutter apps or **bloc** for pure Dart. The packages include Cubit, Bloc, and all Flutter widgets.`,
        relatedWeeks: [10],
        tags: ["bloc", "installation", "setup", "dependencies"],
        codeSnippets: [
          {
            language: "yaml",
            label: "pubspec.yaml",
            code: `dependencies:
  flutter_bloc: ^9.0.0

# or for pure Dart (no Flutter)
dependencies:
  bloc: ^9.0.0`,
          },
          {
            language: "bash",
            label: "Install Commands",
            code: `flutter pub get
# Or add directly
dart pub add bloc
dart pub add flutter_bloc`,
          },
        ],
      },
      {
        id: "bloc-streams-concept",
        title: "Core Concept: Streams",
        content: `Bloc is built on top of Dart **Streams** — sequences of asynchronous data. Understanding streams is essential for working with Bloc effectively.`,
        relatedWeeks: [10],
        tags: ["bloc", "streams", "async", "dart"],
        codeSnippets: [
          {
            language: "dart",
            label: "Streams with Bloc",
            code: `// Creating a stream
Stream<int> countStream(int max) async* {
  for (int i = 0; i < max; i++) {
    yield i;
  }
}

// Consuming a stream
Future<int> sumStream(Stream<int> stream) async {
  int sum = 0;
  await for (final value in stream) {
    sum += value;
  }
  return sum;
}`,
          },
        ],
      },
      {
        id: "bloc-complete-example",
        title: "Complete Example: Counter App",
        content: `A complete Flutter counter app using Bloc/Cubit with BlocProvider, BlocBuilder, and context extensions.`,
        relatedWeeks: [10],
        tags: ["bloc", "example", "counter", "complete-app"],
        codeSnippets: [
          {
            language: "dart",
            label: "Full Counter App with Bloc",
            code: `// counter_cubit.dart
class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0);
  void increment() => emit(state + 1);
  void decrement() => emit(state - 1);
}

// main.dart
void main() {
  runApp(
    BlocProvider(
      create: (_) => CounterCubit(),
      child: const MyApp(),
    ),
  );
}

// counter_page.dart
class CounterPage extends StatelessWidget {
  const CounterPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Counter')),
      body: Center(
        child: BlocBuilder<CounterCubit, int>(
          builder: (context, count) {
            return Text(
              '$count',
              style: Theme.of(context).textTheme.displayLarge,
            );
          },
        ),
      ),
      floatingActionButton: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          FloatingActionButton(
            onPressed: () => context.read<CounterCubit>().increment(),
            child: const Icon(Icons.add),
          ),
          const SizedBox(height: 8),
          FloatingActionButton(
            onPressed: () => context.read<CounterCubit>().decrement(),
            child: const Icon(Icons.remove),
          ),
        ],
      ),
    );
  }
}`,
          },
        ],
      },
    ],
  },
  {
    id: "flutter-packages",
    title: "Essential Packages",
    icon: Package,
    description:
      "Production-proven packages for networking (Dio), navigation (go_router), state, storage (Hive), serialization (Freezed), UI, and device APIs.",
    relatedWeeks: [14, 15, 16],
    tags: ["packages", "dio", "go-router", "riverpod", "hive", "freezed", "ui", "device"],
    sections: [
      {
        id: "pkg-dio",
        title: "Dio — HTTP Client",
        content: `**Dio** is the most popular HTTP client for Flutter with interceptors, global config, FormData, file upload/download, request cancellation, timeout, and retry support.`,
        relatedWeeks: [14],
        tags: ["packages", "dio", "http", "interceptors", "networking"],
        codeSnippets: [
          {
            language: "dart",
            label: "Dio Setup & Interceptors",
            code: `import 'package:dio/dio.dart';

final dio = Dio(BaseOptions(
  baseUrl: 'https://api.example.com',
  connectTimeout: const Duration(seconds: 10),
  receiveTimeout: const Duration(seconds: 15),
  headers: {'Content-Type': 'application/json'},
));

// Interceptors (auth token, logging, error handling)
dio.interceptors.add(
  InterceptorsWrapper(
    onRequest: (options, handler) {
      options.headers['Authorization'] = 'Bearer \$token';
      return handler.next(options);
    },
    onError: (DioException e, handler) {
      if (e.response?.statusCode == 401) {
        // refresh token or logout
      }
      return handler.next(e);
    },
  ),
);

// File upload
final formData = FormData.fromMap({
  'name': 'avatar',
  'file': await MultipartFile.fromFile('./avatar.png'),
});
await dio.post('/upload', data: formData);`,
          },
        ],
      },
      {
        id: "pkg-go-router",
        title: "go_router — Navigation",
        content: `**go_router** is the official Flutter navigation package with URL-based routing, deep linking, nested navigation via **ShellRoute**, redirect guards, and path/query parameters.`,
        relatedWeeks: [14],
        tags: ["packages", "go-router", "navigation", "routing", "deep-linking"],
        codeSnippets: [
          {
            language: "dart",
            label: "go_router with Redirect & ShellRoute",
            code: `final GoRouter router = GoRouter(
  initialLocation: '/',
  redirect: (context, state) {
    final isLoggedIn = context.read<AuthCubit>().state.isLoggedIn;
    final goingToLogin = state.matchedLocation == '/login';
    if (!isLoggedIn && !goingToLogin) return '/login';
    if (isLoggedIn && goingToLogin) return '/home';
    return null;
  },
  routes: [
    GoRoute(path: '/login', builder: (context, state) => const LoginPage()),
    ShellRoute(
      builder: (context, state, child) => ScaffoldWithBottomNav(child: child),
      routes: [
        GoRoute(path: '/home', builder: (context, state) => const HomePage()),
        GoRoute(
          path: '/products/:id',
          builder: (context, state) {
            final id = state.pathParameters['id']!;
            final tab = state.uri.queryParameters['tab'] ?? 'details';
            return ProductPage(id: id, tab: tab);
          },
        ),
      ],
    ),
  ],
);`,
          },
        ],
      },
      {
        id: "pkg-state",
        title: "State Management Packages",
        content: `**Provider** for lightweight apps, **flutter_bloc** for event-driven scalable apps, **Riverpod** for compile-safe modern state, and **get_it** as a service locator for dependency injection.`,
        relatedWeeks: [15],
        tags: ["packages", "provider", "riverpod", "get-it", "state-management", "dependency-injection"],
        codeSnippets: [
          {
            language: "dart",
            label: "Riverpod & get_it",
            code: `// Riverpod
final counterProvider = StateNotifierProvider<CounterNotifier, int>(
  (ref) => CounterNotifier(),
);
class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);
  void increment() => state++;
}
// Consume
class MyWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    return Text('\$count');
  }
}

// get_it — Service Locator
final getIt = GetIt.instance;
void setupDI() {
  getIt.registerSingleton<ApiService>(ApiService());
  getIt.registerLazySingleton<AuthRepository>(() => AuthRepository(getIt()));
  getIt.registerFactory<LoginCubit>(() => LoginCubit(getIt()));
}
final api = getIt<ApiService>();`,
          },
        ],
      },
      {
        id: "pkg-storage",
        title: "Local Storage",
        content: `**shared_preferences** for simple key-value storage, **hive** for fast NoSQL with typed boxes, **sqflite** for full SQLite relational database, and **flutter_secure_storage** for encrypted key-value storage.`,
        relatedWeeks: [15],
        tags: ["packages", "shared-preferences", "hive", "sqflite", "secure-storage", "storage"],
        codeSnippets: [
          {
            language: "dart",
            label: "Hive & shared_preferences",
            code: `// shared_preferences
final prefs = await SharedPreferences.getInstance();
await prefs.setString('token', 'abc123');
final token = prefs.getString('token') ?? '';

// Hive — Fast NoSQL
await Hive.initFlutter();
@HiveType(typeId: 0)
class User extends HiveObject {
  @HiveField(0) String name;
  @HiveField(1) int age;
  User({required this.name, required this.age});
}
Hive.registerAdapter(UserAdapter());
final box = await Hive.openBox<User>('users');
box.put('user1', User(name: 'Mustafa', age: 25));
final user = box.get('user1');

// flutter_secure_storage
final storage = const FlutterSecureStorage();
await storage.write(key: 'auth_token', value: 'Bearer abc123');
final token = await storage.read(key: 'auth_token');`,
          },
        ],
      },
      {
        id: "pkg-serialization",
        title: "JSON & Freezed",
        content: `**json_serializable** generates \`fromJson\`/\`toJson\` with \`build_runner\`. **Freezed** provides immutable data classes with \`copyWith\`, \`==\`, \`hashCode\`, \`toString\`, and union types (sealed states) — the gold standard for data classes in Dart.`,
        relatedWeeks: [16],
        tags: ["packages", "json-serializable", "freezed", "serialization", "immutable", "data-classes"],
        codeSnippets: [
          {
            language: "dart",
            label: "Freezed Data Classes",
            code: `import 'package:freezed_annotation/freezed_annotation.dart';
part 'user.freezed.dart';
part 'user.g.dart';

@freezed
class User with _$User {
  const factory User({
    required int id,
    required String name,
    required String email,
    @Default(false) bool isAdmin,
    String? avatar,
  }) = _User;
  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
}

// Usage — automatic copyWith, ==, hashCode, toString
final user = User(id: 1, name: 'Mustafa', email: 'test@test.com');
final updated = user.copyWith(name: 'Updated');

// Union types (sealed states)
@freezed
class WeatherState with _$WeatherState {
  const factory WeatherState.initial() = _Initial;
  const factory WeatherState.loading() = _Loading;
  const factory WeatherState.loaded(Weather weather) = _Loaded;
  const factory WeatherState.error(String message) = _Error;
}

// Pattern matching
state.when(
  initial: () => const Text('Enter a city'),
  loading: () => const CircularProgressIndicator(),
  loaded: (weather) => WeatherWidget(weather),
  error: (msg) => Text('Error: \$msg'),
)`,
          },
        ],
      },
      {
        id: "pkg-ui",
        title: "UI Enhancement",
        content: `**cached_network_image** for image caching, **flutter_svg** for SVG rendering, **shimmer** for loading skeletons, **lottie** for animations, **flutter_screenutil** for responsive UI, and **google_fonts** for 1000+ Google Fonts.`,
        relatedWeeks: [16],
        tags: ["packages", "cached-network-image", "flutter-svg", "shimmer", "lottie", "google-fonts", "ui"],
        codeSnippets: [
          {
            language: "dart",
            label: "UI Packages",
            code: `// cached_network_image
CachedNetworkImage(
  imageUrl: 'https://example.com/photo.jpg',
  placeholder: (context, url) => const CircularProgressIndicator(),
  errorWidget: (context, url, error) => const Icon(Icons.error),
)

// flutter_svg
SvgPicture.asset('assets/icon.svg', width: 48, height: 48)

// shimmer
Shimmer.fromColors(
  baseColor: Colors.grey[300]!,
  highlightColor: Colors.grey[100]!,
  child: Container(width: 200, height: 16, color: Colors.white),
)

// lottie
Lottie.asset('assets/animation.json')

// google_fonts
Text('Hello', style: GoogleFonts.poppins(fontSize: 18, fontWeight: FontWeight.w600))`,
          },
        ],
      },
      {
        id: "pkg-device",
        title: "Device & Platform",
        content: `**permission_handler** for runtime permissions, **image_picker** for gallery/camera access, **path_provider** for file system paths, **connectivity_plus** for network status, **url_launcher** for opening URLs, and **share_plus** for sharing content.`,
        relatedWeeks: [16],
        tags: ["packages", "permission-handler", "image-picker", "path-provider", "connectivity-plus", "device"],
        codeSnippets: [
          {
            language: "dart",
            label: "Device APIs",
            code: `// permission_handler
final status = await Permission.camera.request();
if (status.isGranted) openCamera();

// image_picker
final picker = ImagePicker();
final image = await picker.pickImage(source: ImageSource.gallery);

// path_provider
final appDocDir = await getApplicationDocumentsDirectory();
final filePath = '\${appDocDir.path}/user_data.json';

// connectivity_plus
final result = await connectivity.checkConnectivity();
if (result.contains(ConnectivityResult.none)) showNoInternetDialog();

// url_launcher
await launchUrl(Uri.parse('https://flutter.dev'));
await launchUrl(Uri.parse('mailto:test@example.com'));

// share_plus
await Share.share('Check out Flutter: https://flutter.dev');`,
          },
        ],
      },
      {
        id: "pkg-utilities",
        title: "Utilities & Testing",
        content: `**intl** for internationalization and date formatting, **logger** for beautiful console output, **equatable** for value equality, **dartz** for functional programming (Either), **mocktail** for mocking in tests, and **golden_toolkit** for golden file tests.`,
        relatedWeeks: [16],
        tags: ["packages", "intl", "logger", "equatable", "dartz", "mocktail", "testing"],
        codeSnippets: [
          {
            language: "dart",
            label: "Utilities & Testing",
            code: `// intl — Date formatting
DateFormat('yyyy-MM-dd').format(DateTime.now());
NumberFormat.currency(locale: 'ar', symbol: 'EGP').format(1250.5);

// logger
final log = Logger();
log.d('Debug message');
log.e('Error message', error: exception, stackTrace: stack);

// equatable — value equality
class User extends Equatable {
  final String name;
  final int age;
  const User({required this.name, required this.age});
  @override
  List<Object?> get props => [name, age];
}

// dartz — Either for error handling
Future<Either<Failure, User>> getUser(int id) async {
  try {
    final user = await api.fetchUser(id);
    return Right(user);
  } catch (e) {
    return Left(NetworkFailure(e.toString()));
  }
}

// mocktail
class MockApiService extends Mock implements ApiService {}
final mockApi = MockApiService();
when(() => mockApi.getUsers()).thenAnswer((_) async => [User(id: 1, name: 'Test')]);`,
          },
        ],
      },
      {
        id: "pkg-http",
        title: "http — Simple HTTP Client",
        content: `The **http** package is the official Dart HTTP client for simple requests. It provides a straightforward API for GET, POST, PUT, DELETE operations with JSON encoding.`,
        relatedWeeks: [14],
        tags: ["packages", "http", "networking", "official"],
        codeSnippets: [
          {
            language: "dart",
            label: "http Package Usage",
            code: `import 'package:http/http.dart' as http;
import 'dart:convert';

final response = await http.get(
  Uri.parse('https://api.example.com/posts'),
  headers: {'Authorization': 'Bearer $token'},
);

if (response.statusCode == 200) {
  final data = jsonDecode(response.body);
}

// POST
final response = await http.post(
  Uri.parse('https://api.example.com/posts'),
  headers: {'Content-Type': 'application/json'},
  body: jsonEncode({'title': 'Hello', 'body': 'World'}),
);`,
          },
        ],
      },
      {
        id: "pkg-riverpod",
        title: "Riverpod — Modern State Management",
        content: `**Riverpod** is a compile-safe, testable state management solution. It provides providers that don't depend on widgets, making them reusable across the app.`,
        relatedWeeks: [15],
        tags: ["packages", "riverpod", "state-management", "compile-safe", "providers"],
        codeSnippets: [
          {
            language: "dart",
            label: "Riverpod Setup",
            code: `import 'package:flutter_riverpod/flutter_riverpod.dart';

// 1. Define provider
final counterProvider = StateNotifierProvider<CounterNotifier, int>(
  (ref) => CounterNotifier(),
);

class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);
  void increment() => state++;
}

// Async provider
final usersProvider = FutureProvider<List<User>>((ref) async {
  final api = ref.read(apiProvider);
  return api.getUsers();
});

// 2. Wrap app
void main() {
  runApp(const ProviderScope(child: MyApp()));
}

// 3. Consume
class MyWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    return Text('$count');
  }
}`,
          },
        ],
      },
      {
        id: "pkg-get-it",
        title: "get_it — Service Locator / DI",
        content: `**get_it** is a simple service locator for dependency injection. It allows you to register and retrieve objects without context, useful for non-widget code.`,
        relatedWeeks: [15],
        tags: ["packages", "get-it", "dependency-injection", "service-locator"],
        codeSnippets: [
          {
            language: "dart",
            label: "get_it Setup",
            code: `import 'package:get_it/get_it.dart';

final getIt = GetIt.instance;

// Register (in main or setup file)
void setupDI() {
  getIt.registerSingleton<ApiService>(ApiService());
  getIt.registerLazySingleton<AuthRepository>(() => AuthRepository(getIt()));
  getIt.registerFactory<LoginCubit>(() => LoginCubit(getIt()));
}

// Use anywhere (no context needed)
final api = getIt<ApiService>();
final cubit = getIt<LoginCubit>();`,
          },
        ],
      },
    ],
  },
  {
    id: "firebase",
    title: "Firebase Integration",
    icon: Flame,
    description:
      "FlutterFire setup, Authentication, Firestore, Storage, FCM, Analytics, Crashlytics, Remote Config, and Security Rules.",
    relatedWeeks: [28, 29, 30],
    tags: ["firebase", "flutterfire", "authentication", "firestore", "storage", "fcm", "analytics", "crashlytics"],
    sections: [
      {
        id: "firebase-setup",
        title: "Setup & Initialization",
        content: `Use **FlutterFire CLI** to configure Firebase. Run \`flutterfire configure\` to register your app, download config files, and generate \`lib/firebase_options.dart\`. Initialize Firebase in \`main.dart\` with \`Firebase.initializeApp()\`.`,
        relatedWeeks: [28],
        tags: ["firebase", "setup", "flutterfire-cli", "initialization"],
        codeSnippets: [
          {
            language: "bash",
            label: "FlutterFire CLI Setup",
            code: `# Install FlutterFire CLI
dart pub global activate flutterfire_cli

# Install Firebase CLI
npm install -g firebase-tools
firebase login

# Configure Flutter app
flutterfire configure`,
          },
          {
            language: "dart",
            label: "Firebase Initialization",
            code: `import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart'; // auto-generated by flutterfire

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}`,
          },
        ],
      },
      {
        id: "firebase-auth",
        title: "Firebase Authentication",
        content: `**firebase_auth** supports Email/Password, Google, Apple, Phone, and anonymous sign-in. Listen to auth state changes with \`authStateChanges()\` stream. Handle errors with typed \`FirebaseAuthException\` catch clauses.`,
        relatedWeeks: [28],
        tags: ["firebase", "authentication", "email-password", "google-sign-in", "phone-auth"],
        codeSnippets: [
          {
            language: "dart",
            label: "Email/Password Auth",
            code: `// Listen to auth state
FirebaseAuth.instance.authStateChanges().listen((User? user) {
  if (user == null) {
    print('User is signed out');
  } else {
    print('User is signed in: \${user.email}');
  }
});

// Register
Future<UserCredential> signUp(String email, String password) async {
  try {
    return await FirebaseAuth.instance.createUserWithEmailAndPassword(
      email: email,
      password: password,
    );
  } on FirebaseAuthException catch (e) {
    switch (e.code) {
      case 'weak-password':
        throw Exception('Password is too weak');
      case 'email-already-in-use':
        throw Exception('Email already registered');
      default:
        throw Exception(e.message);
    }
  }
}

// Sign In
await FirebaseAuth.instance.signInWithEmailAndPassword(
  email: email, password: password,
);

// Sign Out
await FirebaseAuth.instance.signOut();

// Password Reset
await FirebaseAuth.instance.sendPasswordResetEmail(email: email);`,
          },
          {
            language: "dart",
            label: "Google & Phone Auth",
            code: `// Google Sign-In
Future<UserCredential?> signInWithGoogle() async {
  final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
  if (googleUser == null) return null;
  final googleAuth = await googleUser.authentication;
  final credential = GoogleAuthProvider.credential(
    accessToken: googleAuth.accessToken,
    idToken: googleAuth.idToken,
  );
  return await FirebaseAuth.instance.signInWithCredential(credential);
}

// Phone Authentication
await FirebaseAuth.instance.verifyPhoneNumber(
  phoneNumber: '+201234567890',
  verificationCompleted: (PhoneAuthCredential credential) async {
    await FirebaseAuth.instance.signInWithCredential(credential);
  },
  codeSent: (String verificationId, int? resendToken) {
    myVerificationId = verificationId;
  },
);

// Verify OTP
final credential = PhoneAuthProvider.credential(
  verificationId: myVerificationId,
  smsCode: userEnteredOTP,
);
await FirebaseAuth.instance.signInWithCredential(credential);`,
          },
        ],
      },
      {
        id: "firebase-firestore",
        title: "Cloud Firestore",
        content: `**cloud_firestore** is a NoSQL, real-time, cloud-hosted document database organized in collections and documents. Supports CRUD operations, queries with filters, real-time listeners, batch writes, transactions, and type-safe converters.`,
        relatedWeeks: [29],
        tags: ["firebase", "firestore", "nosql", "realtime", "crud", "queries", "transactions"],
        codeSnippets: [
          {
            language: "dart",
            label: "Firestore CRUD",
            code: `final db = FirebaseFirestore.instance;

// CREATE — add document (auto-generated ID)
final docRef = await db.collection('users').add({
  'name': 'Mustafa',
  'age': 25,
  'createdAt': FieldValue.serverTimestamp(),
});

// CREATE — set with known ID
await db.collection('users').doc('userId123').set({
  'name': 'Mustafa', 'age': 25,
});

// READ — get single document
final docSnap = await db.collection('users').doc('userId123').get();
if (docSnap.exists) {
  final data = docSnap.data() as Map<String, dynamic>;
  print(data['name']);
}

// UPDATE
await db.collection('users').doc('userId123').update({
  'age': 26,
  'updatedAt': FieldValue.serverTimestamp(),
});

// DELETE
await db.collection('users').doc('userId123').delete();`,
          },
          {
            language: "dart",
            label: "Queries & Real-Time Listeners",
            code: `// Queries
final query = await db.collection('users')
    .where('age', isGreaterThan: 18)
    .where('isActive', isEqualTo: true)
    .orderBy('createdAt', descending: true)
    .limit(10)
    .get();

// Real-time listener
db.collection('messages')
    .where('chatId', isEqualTo: chatId)
    .orderBy('createdAt')
    .snapshots()
    .listen((QuerySnapshot snapshot) {
  for (final change in snapshot.docChanges) {
    switch (change.type) {
      case DocumentChangeType.added:
        print('New message: \${change.doc.data()}');
      case DocumentChangeType.modified:
        print('Modified: \${change.doc.id}');
      case DocumentChangeType.removed:
        print('Removed: \${change.doc.id}');
    }
  }
});

// Batch writes
final batch = db.batch();
batch.set(db.collection('users').doc('user1'), {'name': 'Alice'});
batch.update(db.collection('users').doc('user2'), {'score': 100});
batch.delete(db.collection('users').doc('user3'));
await batch.commit();`,
          },
        ],
      },
      {
        id: "firebase-storage",
        title: "Firebase Storage",
        content: `**firebase_storage** stores files (images, videos, documents) with fine-grained access control. Supports upload from File/bytes, download URL retrieval, progress tracking, and file listing.`,
        relatedWeeks: [29],
        tags: ["firebase", "storage", "file-upload", "download", "images"],
        codeSnippets: [
          {
            language: "dart",
            label: "Storage Upload & Download",
            code: `final storageRef = FirebaseStorage.instance.ref();

// UPLOAD — from File with progress
Future<String> uploadFile(File file, String path) async {
  final ref = storageRef.child(path);
  final uploadTask = ref.putFile(
    file,
    SettableMetadata(contentType: 'image/jpeg'),
  );
  uploadTask.snapshotEvents.listen((TaskSnapshot snap) {
    final progress = snap.bytesTransferred / snap.totalBytes;
    print('Upload: \${(progress * 100).toStringAsFixed(0)}%');
  });
  final snapshot = await uploadTask;
  return await snapshot.ref.getDownloadURL();
}

// DOWNLOAD — get URL
final downloadURL = await storageRef
    .child('avatars/userId123.jpg')
    .getDownloadURL();

// LIST files
final result = await storageRef.child('avatars').listAll();
for (final item in result.items) {
  print(item.name);
}`,
          },
        ],
      },
      {
        id: "firebase-fcm",
        title: "Cloud Messaging (FCM)",
        content: `**firebase_messaging** handles push notifications for Android, iOS, and Web. Supports foreground/background messages, topic subscriptions, token management, and integration with **flutter_local_notifications** for local notifications.`,
        relatedWeeks: [30],
        tags: ["firebase", "fcm", "push-notifications", "messaging", "topics"],
        codeSnippets: [
          {
            language: "dart",
            label: "FCM Setup",
            code: `final messaging = FirebaseMessaging.instance;

// Request permission (iOS / Web)
final settings = await messaging.requestPermission(
  alert: true, badge: true, sound: true,
);

// Get FCM token
final token = await messaging.getToken();

// Foreground messages
FirebaseMessaging.onMessage.listen((RemoteMessage message) {
  print('Title: \${message.notification?.title}');
  print('Body: \${message.notification?.body}');
  print('Data: \${message.data}');
  showLocalNotification(message);
});

// Background message handler (top-level function)
@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(
  RemoteMessage message,
) async {
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
}
FirebaseMessaging.onBackgroundMessage(
  _firebaseMessagingBackgroundHandler,
);

// Subscribe to topic
await messaging.subscribeToTopic('news');`,
          },
        ],
      },
      {
        id: "firebase-analytics",
        title: "Firebase Analytics",
        content: `**firebase_analytics** tracks user behavior automatically (first_open, session_start, screen_view) and with custom events. Set user ID and properties for cross-device tracking.`,
        relatedWeeks: [30],
        tags: ["firebase", "analytics", "events", "user-tracking", "screen-views"],
        codeSnippets: [
          {
            language: "dart",
            label: "Analytics Events",
            code: `final analytics = FirebaseAnalytics.instance;

// Log custom event
await analytics.logEvent(
  name: 'purchase',
  parameters: {
    'item_id': 'prod_123',
    'item_name': 'Flutter Course',
    'value': 49.99,
    'currency': 'USD',
  },
);

// Set user ID
await analytics.setUserId(
  id: FirebaseAuth.instance.currentUser?.uid,
);

// Log screen view
await analytics.logScreenView(screenName: 'Home', screenClass: 'HomePage');

// Pre-defined events
await analytics.logLogin(loginMethod: 'google');
await analytics.logSearch(searchTerm: 'flutter tutorial');`,
          },
        ],
      },
      {
        id: "firebase-crashlytics",
        title: "Firebase Crashlytics",
        content: `**firebase_crashlytics** provides real-time crash reporting. Pass all Flutter errors to Crashlytics in \`main.dart\`, set user info for context, and use custom keys and logs for debugging.`,
        relatedWeeks: [30],
        tags: ["firebase", "crashlytics", "crash-reporting", "error-tracking", "debugging"],
        codeSnippets: [
          {
            language: "dart",
            label: "Crashlytics Setup",
            code: `void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  // Pass all Flutter errors to Crashlytics
  FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterFatalError;

  // Pass async errors outside Flutter framework
  PlatformDispatcher.instance.onError = (error, stack) {
    FirebaseCrashlytics.instance.recordError(error, stack, fatal: true);
    return true;
  };

  runApp(const MyApp());
}

// Manual crash reporting
try {
  await riskyOperation();
} catch (e, stack) {
  FirebaseCrashlytics.instance.recordError(e, stack);
}

// Set user info
FirebaseCrashlytics.instance.setUserIdentifier(userId);
FirebaseCrashlytics.instance.setCustomKey('plan', 'premium');
FirebaseCrashlytics.instance.log('User clicked checkout');`,
          },
        ],
      },
      {
        id: "firebase-remote-config",
        title: "Remote Config",
        content: `**firebase_remote_config** lets you change app behavior and appearance without publishing an update. Set defaults, fetch and activate configs, and listen to real-time updates.`,
        relatedWeeks: [30],
        tags: ["firebase", "remote-config", "feature-flags", "a-b-testing", "config"],
        codeSnippets: [
          {
            language: "dart",
            label: "Remote Config",
            code: `final remoteConfig = FirebaseRemoteConfig.instance;

await remoteConfig.setConfigSettings(RemoteConfigSettings(
  fetchTimeout: const Duration(minutes: 1),
  minimumFetchInterval: const Duration(hours: 1),
));

await remoteConfig.setDefaults({
  'welcome_message': 'Welcome to my app!',
  'feature_dark_mode': false,
  'max_items_per_page': 20,
});

await remoteConfig.fetchAndActivate();

final welcomeMsg = remoteConfig.getString('welcome_message');
final darkMode = remoteConfig.getBool('feature_dark_mode');

// Listen to real-time updates
remoteConfig.onConfigUpdated.listen((event) async {
  await remoteConfig.activate();
  print('Config updated: \${event.updatedKeys}');
});`,
          },
        ],
      },
      {
        id: "firebase-security-rules",
        title: "Security Rules",
        content: `Write **Firestore** and **Storage** rules to protect your data. Use \`request.auth\` to verify authentication, \`resource.data\` to access existing data, and \`request.resource.data\` for incoming data validation.`,
        relatedWeeks: [29],
        tags: ["firebase", "security-rules", "firestore-rules", "storage-rules", "access-control"],
        codeSnippets: [
          {
            language: "javascript",
            label: "Firestore & Storage Rules",
            code: `// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null
        && request.auth.uid == userId;
    }
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
      allow delete: if request.auth != null
        && request.auth.uid == resource.data.authorId;
    }
  }
}

// storage.rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.uid == userId
        && request.resource.size < 5 * 1024 * 1024
        && request.resource.contentType.matches('image/.*');
    }
  }
}`,
          },
        ],
      },
      {
        id: "firebase-patterns",
        title: "Common Patterns",
        content: `Common Firebase patterns include **auth-gated routing** with go_router, **saving user documents** after sign-up, and **chat message streams** with real-time Firestore listeners.`,
        relatedWeeks: [30],
        tags: ["firebase", "patterns", "auth-gated", "chat", "realtime-streams"],
        codeSnippets: [
          {
            language: "dart",
            label: "Auth-Gated Router & Chat Stream",
            code: `// Auth-gated routing
final GoRouter router = GoRouter(
  refreshListenable: AuthRefreshStream(
    FirebaseAuth.instance.authStateChanges(),
  ),
  redirect: (context, state) {
    final isLoggedIn = FirebaseAuth.instance.currentUser != null;
    final goingToLogin = state.matchedLocation == '/login';
    if (!isLoggedIn && !goingToLogin) return '/login';
    if (isLoggedIn && goingToLogin) return '/home';
    return null;
  },
  routes: [...],
);

// Chat message stream
Stream<List<Message>> getMessages(String chatId) {
  return _db.collection('chats').doc(chatId)
      .collection('messages')
      .orderBy('createdAt', descending: false)
      .snapshots()
      .map((snap) => snap.docs
          .map((doc) => Message.fromFirestore(doc))
          .toList());
}`,
          },
        ],
      },
      {
        id: "firebase-realtime-db",
        title: "Realtime Database",
        content: `**firebase_database** is a NoSQL cloud database that stores and syncs data in JSON format in real time. Better suited for very low-latency, high-frequency updates (e.g. chat, gaming) compared to Firestore.`,
        relatedWeeks: [29],
        tags: ["firebase", "realtime-database", "nosql", "json", "realtime", "chat"],
        codeSnippets: [
          {
            language: "dart",
            label: "Realtime Database CRUD",
            code: `final db = FirebaseDatabase.instance;

// Write
await db.ref('users/userId123').set({'name': 'Mustafa', 'age': 25});

// Update
await db.ref('users/userId123').update({'age': 26});

// Read once
final snapshot = await db.ref('users/userId123').get();
if (snapshot.exists) print(snapshot.value);

// Listen to changes (real-time)
db.ref('users/userId123').onValue.listen((DatabaseEvent event) {
  final data = event.snapshot.value as Map<dynamic, dynamic>?;
  print(data?['name']);
});

// Delete
await db.ref('users/userId123').remove();

// Transaction
await db.ref('counters/views').runTransaction((value) {
  return Transaction.success((value as int? ?? 0) + 1);
});`,
          },
        ],
      },
      {
        id: "firebase-apple-auth",
        title: "Apple Sign-In",
        content: `**sign_in_with_apple** enables Apple Sign-In for iOS and Web. It works with Firebase Auth to create or link Apple credentials.`,
        relatedWeeks: [28],
        tags: ["firebase", "apple-sign-in", "ios", "authentication", "oauth"],
        codeSnippets: [
          {
            language: "dart",
            label: "Apple Sign-In",
            code: `import 'package:sign_in_with_apple/sign_in_with_apple.dart';

Future<UserCredential> signInWithApple() async {
  final appleCredential = await SignInWithApple.getAppleIDCredential(
    scopes: [
      AppleIDAuthorizationScopes.email,
      AppleIDAuthorizationScopes.fullName,
    ],
  );

  final oauthCredential = OAuthProvider('apple.com').credential(
    idToken: appleCredential.identityToken,
    accessToken: appleCredential.authorizationCode,
  );

  return await FirebaseAuth.instance.signInWithCredential(oauthCredential);
}`,
          },
        ],
      },
      {
        id: "firebase-emulator",
        title: "Firebase Emulator Suite",
        content: `The Firebase Emulator Suite lets you run Firebase services locally for development and testing without affecting production data.`,
        relatedWeeks: [28],
        tags: ["firebase", "emulator", "local-development", "testing", "debugging"],
        codeSnippets: [
          {
            language: "bash",
            label: "Emulator Setup",
            code: `npm install -g firebase-tools
firebase init emulators
firebase emulators:start`,
          },
          {
            language: "dart",
            label: "Connect to Emulators",
            code: `if (kDebugMode) {
  await FirebaseAuth.instance.useAuthEmulator('localhost', 9099);
  FirebaseFirestore.instance.useFirestoreEmulator('localhost', 8080);
  await FirebaseStorage.instance.useStorageEmulator('localhost', 9199);
  FirebaseDatabase.instance.useDatabaseEmulator('localhost', 9000);
}`,
          },
        ],
      },
      {
        id: "firebase-user-info",
        title: "Current User Info",
        content: `Access the currently signed-in user's properties including UID, email, display name, photo URL, and provider data.`,
        relatedWeeks: [28],
        tags: ["firebase", "user-info", "profile", "current-user"],
        codeSnippets: [
          {
            language: "dart",
            label: "User Properties",
            code: `final user = FirebaseAuth.instance.currentUser!;
print(user.uid);            // unique user ID
print(user.email);          // email
print(user.displayName);    // display name
print(user.photoURL);       // profile photo URL
print(user.emailVerified);  // bool
print(user.phoneNumber);    // phone number
print(user.isAnonymous);    // bool
print(user.metadata.creationTime);
print(user.providerData);   // list of sign-in providers`,
          },
        ],
      },
      {
        id: "firebase-data-converter",
        title: "Data Modeling with Converter",
        content: `Firestore's **withConverter** method provides type-safe document access by mapping between Firestore documents and Dart model classes.`,
        relatedWeeks: [29],
        tags: ["firebase", "firestore", "converter", "type-safe", "data-modeling"],
        codeSnippets: [
          {
            language: "dart",
            label: "Firestore Converter",
            code: `class UserModel {
  final String id;
  final String name;
  final int age;

  const UserModel({required this.id, required this.name, required this.age});

  factory UserModel.fromFirestore(
      DocumentSnapshot<Map<String, dynamic>> snap, _) {
    final data = snap.data()!;
    return UserModel(id: snap.id, name: data['name'], age: data['age']);
  }

  Map<String, Object?> toFirestore() => {'name': name, 'age': age};
}

// Typed collection reference
final usersRef = db.collection('users').withConverter<UserModel>(
  fromFirestore: UserModel.fromFirestore,
  toFirestore: (user, _) => user.toFirestore(),
);

// Type-safe usage
final snap = await usersRef.doc('userId123').get();
final user = snap.data(); // UserModel?`,
          },
        ],
      },
      {
        id: "firebase-local-notifications",
        title: "Local Notifications",
        content: `**flutter_local_notifications** enables displaying local notifications on Android, iOS, and macOS. Works with FCM to show notifications when the app is in the foreground.`,
        relatedWeeks: [30],
        tags: ["firebase", "local-notifications", "flutter-local-notifications", "android", "ios"],
        codeSnippets: [
          {
            language: "dart",
            label: "Local Notifications Setup",
            code: `final flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();

// Initialize
await flutterLocalNotificationsPlugin.initialize(
  const InitializationSettings(
    android: AndroidInitializationSettings('@mipmap/ic_launcher'),
    iOS: DarwinInitializationSettings(),
  ),
  onDidReceiveNotificationResponse: (details) {
    // handle tap
  },
);

// Show notification
await flutterLocalNotificationsPlugin.show(
  0,
  'New message',
  'You have a new notification',
  const NotificationDetails(
    android: AndroidNotificationDetails(
      'channel_id', 'channel_name',
      importance: Importance.max, priority: Priority.high,
    ),
    iOS: DarwinNotificationDetails(),
  ),
);`,
          },
        ],
      },
    ],
  },
];
