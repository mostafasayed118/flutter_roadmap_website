import type { DocEntry } from "./types";

const ALL_WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
const DART_WEEKS = [1, 2, 3, 4];
const FLUTTER_WEEKS = [5, 6, 7, 8, 9];
const BLOC_WEEKS = [10, 11, 12, 13];
const NETWORKING_WEEKS = [14, 15, 16];
const STORAGE_WEEKS = [17, 18];
const FIREBASE_WEEKS = [28, 29, 30];
const DEPLOYMENT_WEEKS = [31, 32, 33, 34];

export const cheatSheetDocs: DocEntry[] = [
  // ─── DART QUICK REFERENCE ────────────────────────────────────────────
  {
    id: "cs-dart-variables-types",
    title: "Variables & Types",
    category: "cheat-sheet",
    summary: "Dart variable declarations: var, final, const, dynamic, and built-in types.",
    content: `Quick reference for Dart variable declarations and built-in types. Use \`var\` for type inference, \`final\` for runtime constants, \`const\` for compile-time constants, and \`dynamic\` when the type is unknown at compile time.`,
    codeSnippets: [
      {
        id: "cs-dart-variables",
        language: "dart",
        label: "Variables & Types",
        code: `var name = 'Ali';          // type inferred
final name = 'Ali';        // runtime constant
const PI = 3.14;           // compile-time constant
dynamic x = 42;            // any type at runtime
int / double / num / String / bool`,
      },
    ],
    relatedWeeks: DART_WEEKS,
    tags: ["dart", "variables", "types", "var", "final", "const", "dynamic", "inference"],
    difficulty: "beginner",
  },
  {
    id: "cs-dart-null-safety",
    title: "Null Safety",
    category: "cheat-sheet",
    summary: "Dart null safety operators: nullable types, safe call, null coalescing, and late initialization.",
    content: `Dart's null safety system prevents null reference errors at compile time. Use \`?\` for nullable types, \`?.\` for safe member access, \`??\` for defaults, \`!\` for assertion, and \`late\` for deferred initialization.`,
    codeSnippets: [
      {
        id: "cs-null-safety-ops",
        language: "dart",
        label: "Null Safety Operators",
        code: `String? name;              // nullable
String  name = 'Ali';      // non-nullable (default)
name?.length               // safe call → null if name is null
name ?? 'default'          // null coalescing
name!.length               // assert non-null (throws if null)
late String name;          // deferred init (not null, init later)`,
      },
    ],
    relatedWeeks: DART_WEEKS,
    tags: ["dart", "null safety", "nullable", "late", "safe call", "null coalescing"],
    difficulty: "beginner",
  },
  {
    id: "cs-dart-collections",
    title: "Collections",
    category: "cheat-sheet",
    summary: "Dart List, Set, and Map operations — creation, manipulation, and iteration.",
    content: `Dart collections include \`List\` (ordered), \`Set\` (unique), and \`Map\` (key-value). All support common higher-order methods like \`map\`, \`where\`, \`reduce\`, \`any\`, and \`every\`.`,
    codeSnippets: [
      {
        id: "cs-collections-list-set-map",
        language: "dart",
        label: "List, Set, and Map",
        code: `// List
List<int> nums = [1, 2, 3];
nums.add(4); nums.remove(1); nums.map((e) => e*2).toList();
nums.where((e) => e > 1).toList(); nums.reduce((a,b) => a+b);
nums.any((e) => e>2); nums.every((e) => e>0);
nums.firstWhere((e) => e>1); nums.sort();

// Set
Set<int> s = {1, 2, 3};
s.union(other); s.intersection(other); s.difference(other);

// Map
Map<String,int> m = {'a': 1};
m['b'] = 2; m.keys; m.values; m.entries;
m.putIfAbsent('c', () => 3);
m.forEach((k,v) => print('\$k: \$v'));`,
      },
    ],
    relatedWeeks: DART_WEEKS,
    tags: ["dart", "list", "set", "map", "collections", "iteration", "higher-order"],
    difficulty: "beginner",
  },
  {
    id: "cs-dart-functions",
    title: "Functions",
    category: "cheat-sheet",
    summary: "Dart functions: named parameters, arrow functions, higher-order functions, and typedefs.",
    content: `Dart functions support named/positional parameters (required and optional), arrow syntax for single expressions, first-class function values, and \`typedef\` for function type aliases.`,
    codeSnippets: [
      {
        id: "cs-functions-syntax",
        language: "dart",
        label: "Function Syntax",
        code: `// Named params (required)
void greet({required String name}) {}

// Named params (optional)
void greet({String name = 'Ali'}) {}

// Arrow function
int add(int a, int b) => a + b;

// Higher-order
void run(Function() fn) => fn();

// Typedef
typedef Callback = void Function(String);`,
      },
    ],
    relatedWeeks: DART_WEEKS,
    tags: ["dart", "functions", "named parameters", "arrow functions", "higher-order", "typedef"],
    difficulty: "beginner",
  },
  {
    id: "cs-dart-oop",
    title: "OOP Quick Reference",
    category: "cheat-sheet",
    summary: "Dart classes, constructors, inheritance, abstract classes, interfaces, and mixins.",
    content: `Dart OOP includes classes with named constructors, factory constructors, getters/setters, inheritance (\`extends\`), abstract classes, interface implementation (\`implements\`), and mixins (\`with\`).`,
    codeSnippets: [
      {
        id: "cs-oop-class-patterns",
        language: "dart",
        label: "Class, Inheritance, Mixin",
        code: `class Animal {
  final String name;              // property
  Animal(this.name);              // positional constructor
  Animal.create({required this.name});  // named constructor
  factory Animal.fromJson(Map m) => Animal(m['name']);  // factory
  
  String get info => 'Name: $name';  // getter
  set info(String v) { /* ... */ }   // setter
  
  void speak() => print('...');
}

class Dog extends Animal {
  Dog(super.name);
  @override void speak() => print('Woof');
}

abstract class Flyable { void fly(); }

class Bird extends Animal implements Flyable {
  Bird(super.name);
  @override void fly() => print('Flying');
}

mixin Swimmable { void swim() => print('Swimming'); }
class Duck extends Animal with Swimmable { Duck(super.name); }`,
      },
    ],
    relatedWeeks: DART_WEEKS,
    tags: ["dart", "oop", "classes", "inheritance", "abstract", "mixin", "factory", "constructor"],
    difficulty: "beginner",
  },
  {
    id: "cs-dart-async-await",
    title: "Async / Await",
    category: "cheat-sheet",
    summary: "Dart asynchronous programming with Future, async/await, try/catch, and parallel execution.",
    content: `Dart uses \`Future\` for asynchronous results and \`async/await\` for readable async code. Use \`Future.wait\` to run multiple async operations in parallel.`,
    codeSnippets: [
      {
        id: "cs-async-await-pattern",
        language: "dart",
        label: "Future, Async/Await, Parallel",
        code: `Future<String> fetchData() async {
  try {
    final result = await someApi.call();
    return result;
  } catch (e) {
    throw Exception('Failed: $e');
  }
}

// Parallel
final results = await Future.wait([fetchA(), fetchB()]);`,
      },
    ],
    relatedWeeks: DART_WEEKS,
    tags: ["dart", "async", "await", "future", "parallel", "asynchronous"],
    difficulty: "beginner",
  },
  {
    id: "cs-dart-streams",
    title: "Streams",
    category: "cheat-sheet",
    summary: "Dart Streams: async generators, StreamController, and stream subscription patterns.",
    content: `Dart \`Stream\` provides a sequence of asynchronous values. Use \`async*\` generators to create streams and \`StreamController\` for manual stream management.`,
    codeSnippets: [
      {
        id: "cs-streams-async-gen",
        language: "dart",
        label: "Async Generator & StreamController",
        code: `Stream<int> counter() async* {
  for (int i = 0; i < 5; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}

StreamController<int> ctrl = StreamController.broadcast();
ctrl.stream.listen((val) => print(val));
ctrl.add(42);
ctrl.close();`,
      },
    ],
    relatedWeeks: DART_WEEKS,
    tags: ["dart", "streams", "async generator", "StreamController", "broadcast", "yield"],
    difficulty: "beginner",
  },
  {
    id: "cs-dart-generics-extensions",
    title: "Generics & Extensions",
    category: "cheat-sheet",
    summary: "Dart generics for type-safe containers and extensions for adding methods to existing types.",
    content: `Dart generics enable type-safe reusable code. Extensions add methods to existing types without modifying them — a powerful way to augment built-in and third-party types.`,
    codeSnippets: [
      {
        id: "cs-generics-extensions-code",
        language: "dart",
        label: "Generic Class & Extension",
        code: `class Box<T> { T value; Box(this.value); }

extension StringExt on String {
  String get capitalize => '\${this[0].toUpperCase()}\${substring(1)}';
}

'hello'.capitalize;  // → 'Hello'`,
      },
    ],
    relatedWeeks: DART_WEEKS,
    tags: ["dart", "generics", "extensions", "type-safe", "capitalize", "Box"],
    difficulty: "beginner",
  },
  {
    id: "cs-dart-error-handling",
    title: "Error Handling",
    category: "cheat-sheet",
    summary: "Dart try/catch/finally, custom exceptions, and typed exception handling.",
    content: `Dart uses \`try/catch/finally\` for exception handling. Create custom exception classes with \`implements Exception\` and use typed \`on\` clauses for specific error handling.`,
    codeSnippets: [
      {
        id: "cs-error-handling-try-catch",
        language: "dart",
        label: "Custom Exception & Try/Catch",
        code: `class NetworkException implements Exception {
  final String message;
  NetworkException(this.message);
}

try {
  // ...
} on NetworkException catch (e) {
  print(e.message);
} catch (e) {
  print('Unknown: $e');
} finally {
  print('Always runs');
}`,
      },
    ],
    relatedWeeks: DART_WEEKS,
    tags: ["dart", "error handling", "exceptions", "try-catch", "finally", "custom exception"],
    difficulty: "beginner",
  },

  // ─── FLUTTER CORE WIDGETS ───────────────────────────────────────────
  {
    id: "cs-flutter-app-shell",
    title: "App Shell",
    category: "cheat-sheet",
    summary: "Flutter MaterialApp setup, Scaffold structure, AppBar, FAB, NavigationBar, and Drawer.",
    content: `Every Flutter app starts with \`MaterialApp\` providing theme and navigation. \`Scaffold\` provides the standard visual layout structure with AppBar, body, FAB, bottom navigation, and drawer.`,
    codeSnippets: [
      {
        id: "cs-app-shell-material",
        language: "dart",
        label: "MaterialApp & Scaffold",
        code: `void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(useMaterial3: true, colorSchemeSeed: Colors.blue),
      home: const HomePage(),
    );
  }
}

Scaffold(
  appBar: AppBar(title: const Text('Title')),
  body: const Center(child: Text('Hello')),
  floatingActionButton: FloatingActionButton(onPressed: () {}, child: const Icon(Icons.add)),
  bottomNavigationBar: NavigationBar(...),
  drawer: Drawer(...),
)`,
      },
    ],
    relatedWeeks: FLUTTER_WEEKS,
    tags: ["flutter", "MaterialApp", "Scaffold", "AppBar", "FAB", "Drawer", "app shell"],
    difficulty: "beginner",
  },
  {
    id: "cs-flutter-widget-lifecycle",
    title: "StatefulWidget Lifecycle",
    category: "cheat-sheet",
    summary: "StatefulWidget lifecycle: initState, didUpdateWidget, dispose, and build.",
    content: `The \`StatefulWidget\` lifecycle manages mutable state. \`initState\` runs once on creation, \`didUpdateWidget\` on parent rebuild, \`dispose\` for cleanup, and \`build\` for rendering.`,
    codeSnippets: [
      {
        id: "cs-widget-lifecycle-code",
        language: "dart",
        label: "StatefulWidget Lifecycle Methods",
        code: `class MyWidget extends StatefulWidget {
  const MyWidget({super.key});
  @override State<MyWidget> createState() => _MyWidgetState();
}
class _MyWidgetState extends State<MyWidget> {
  @override void initState() { super.initState(); /* init */ }
  @override void didUpdateWidget(MyWidget old) { super.didUpdateWidget(old); }
  @override void dispose() { /* cleanup */ super.dispose(); }
  @override Widget build(BuildContext context) => Container();
}`,
      },
    ],
    relatedWeeks: FLUTTER_WEEKS,
    tags: ["flutter", "StatefulWidget", "lifecycle", "initState", "dispose", "build"],
    difficulty: "beginner",
  },
  {
    id: "cs-flutter-common-widgets",
    title: "Common Widgets",
    category: "cheat-sheet",
    summary: "Essential Flutter widgets: Text, Container, SizedBox, Image, Icon, Card, and buttons.",
    content: `| Widget | Key Props |
|--------|-----------|
| \`Text\` | \`style: TextStyle(fontSize, fontWeight, color)\` |
| \`Container\` | \`width, height, padding, margin, decoration: BoxDecoration(color, borderRadius, boxShadow, gradient)\` |
| \`SizedBox\` | \`width, height\` — spacing & sizing |
| \`Image.network\` | \`url, fit: BoxFit.cover, errorBuilder, loadingBuilder\` |
| \`Image.asset\` | \`'assets/img.png', fit: BoxFit.cover\` |
| \`Icon\` | \`Icons.home, size, color\` |
| \`Card\` | \`elevation, shape, child\` |
| \`ElevatedButton\` | \`onPressed: () {}, child: Text('Click')\` |
| \`TextButton\` | \`onPressed: () {}, child: Text('Click')\` |
| \`OutlinedButton\` | \`onPressed: () {}, child: Text('Click')\` |`,
    codeSnippets: [],
    relatedWeeks: FLUTTER_WEEKS,
    tags: ["flutter", "widgets", "Text", "Container", "Image", "Icon", "Card", "buttons"],
    difficulty: "beginner",
  },
  {
    id: "cs-flutter-column-row",
    title: "Column / Row",
    category: "cheat-sheet",
    summary: "Flutter Column and Row layout with main axis and cross axis alignment.",
    content: `Flutter's \`Column\` (vertical) and \`Row\` (horizontal) use \`mainAxisAlignment\` and \`crossAxisAlignment\` for positioning children along their respective axes.`,
    codeSnippets: [
      {
        id: "cs-column-row-layout",
        language: "dart",
        label: "Column & Row Alignment",
        code: `Column(
  mainAxisAlignment: MainAxisAlignment.center,   // vertical axis
  crossAxisAlignment: CrossAxisAlignment.start,  // horizontal axis
  children: [ Widget1(), Widget2() ],
)
// Row: mainAxis = horizontal, crossAxis = vertical`,
      },
    ],
    relatedWeeks: FLUTTER_WEEKS,
    tags: ["flutter", "Column", "Row", "layout", "alignment", "mainAxis", "crossAxis"],
    difficulty: "beginner",
  },
  {
    id: "cs-flutter-stack-positioning",
    title: "Stack & Positioning",
    category: "cheat-sheet",
    summary: "Flutter Stack widget with Positioned for layered layouts.",
    content: `Flutter's \`Stack\` layers widgets on top of each other. Use \`Positioned\` for absolute placement of children within the stack.`,
    codeSnippets: [
      {
        id: "cs-stack-positioned-layout",
        language: "dart",
        label: "Stack with Positioned",
        code: `Stack(
  alignment: Alignment.center,
  children: [
    BackgroundWidget(),
    Positioned(top: 10, right: 10, child: BadgeWidget()),
  ],
)`,
      },
    ],
    relatedWeeks: FLUTTER_WEEKS,
    tags: ["flutter", "Stack", "Positioned", "layout", "layered", "overlay"],
    difficulty: "beginner",
  },
  {
    id: "cs-flutter-flex-expanded",
    title: "Flex — Expanded / Flexible",
    category: "cheat-sheet",
    summary: "Flutter Expanded and Flexible for proportional sizing in Row/Column.",
    content: `Use \`Expanded\` to fill available space proportionally and \`Flexible\` to allow a child to be smaller than its allocated space.`,
    codeSnippets: [
      {
        id: "cs-flex-expanded-flexible",
        language: "dart",
        label: "Expanded & Flexible",
        code: `Row(children: [
  Expanded(flex: 2, child: RedBox()),   // takes 2/3 space
  Flexible(flex: 1, child: BlueBox()),  // takes 1/3, can be smaller
])`,
      },
    ],
    relatedWeeks: FLUTTER_WEEKS,
    tags: ["flutter", "Expanded", "Flexible", "flex", "Row", "Column", "proportional"],
    difficulty: "beginner",
  },
  {
    id: "cs-flutter-scrollable-widgets",
    title: "Scrollable Widgets",
    category: "cheat-sheet",
    summary: "Flutter ListView.builder, GridView.builder, and CustomScrollView with Slivers.",
    content: `Use \`ListView.builder\` for efficient lazy lists, \`GridView.builder\` for grid layouts, and \`CustomScrollView\` with slivers for complex scroll effects like collapsing app bars.`,
    codeSnippets: [
      {
        id: "cs-scrollable-list-grid-custom",
        language: "dart",
        label: "ListView, GridView, CustomScrollView",
        code: `// List (lazy, efficient)
ListView.builder(
  itemCount: items.length,
  itemBuilder: (ctx, i) => ListTile(title: Text(items[i])),
)

// Grid
GridView.builder(
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2, childAspectRatio: 1.5,
  ),
  itemCount: items.length,
  itemBuilder: (ctx, i) => ItemCard(items[i]),
)

// Custom scroll
CustomScrollView(slivers: [
  SliverAppBar(expandedHeight: 200, pinned: true),
  SliverList(delegate: SliverChildBuilderDelegate((ctx, i) => Item(i))),
])`,
      },
    ],
    relatedWeeks: FLUTTER_WEEKS,
    tags: ["flutter", "ListView", "GridView", "CustomScrollView", "SliverAppBar", "scroll", "lazy"],
    difficulty: "beginner",
  },
  {
    id: "cs-flutter-input-widgets",
    title: "Input Widgets",
    category: "cheat-sheet",
    summary: "Flutter TextFormField with validation, controllers, and form handling.",
    content: `Use \`TextEditingController\` for reading/clearing input, \`GlobalKey<FormState>\` for form-level operations, and \`validator\` for input validation.`,
    codeSnippets: [
      {
        id: "cs-input-form-validation",
        language: "dart",
        label: "Form with TextFormField & Validation",
        code: `final _ctrl = TextEditingController();
final _formKey = GlobalKey<FormState>();

Form(
  key: _formKey,
  child: TextFormField(
    controller: _ctrl,
    decoration: const InputDecoration(labelText: 'Email', hintText: 'Enter email'),
    validator: (v) => v!.isEmpty ? 'Required' : null,
  ),
)

// Submit
if (_formKey.currentState!.validate()) { /* proceed */ }`,
      },
    ],
    relatedWeeks: FLUTTER_WEEKS,
    tags: ["flutter", "TextFormField", "form", "validation", "controller", "input"],
    difficulty: "beginner",
  },

  // ─── NAVIGATION (go_router) ─────────────────────────────────────────
  {
    id: "cs-navigation-setup",
    title: "Navigation Setup (go_router)",
    category: "cheat-sheet",
    summary: "go_router configuration with routes, nested routes, path parameters, and redirects.",
    content: `Configure \`GoRouter\` with routes, nested routes for hierarchical navigation, path parameters like \`:id\`, and redirect logic for auth guards.`,
    codeSnippets: [
      {
        id: "cs-gorouter-setup",
        language: "dart",
        label: "GoRouter Configuration",
        code: `final router = GoRouter(
  initialLocation: '/home',
  redirect: (ctx, state) => isLoggedIn ? null : '/login',
  routes: [
    GoRoute(path: '/login', builder: (ctx, state) => const LoginPage()),
    GoRoute(
      path: '/home',
      builder: (ctx, state) => const HomePage(),
      routes: [
        GoRoute(
          path: 'detail/:id',
          builder: (ctx, state) {
            final id = state.pathParameters['id']!;
            return DetailPage(id: id);
          },
        ),
      ],
    ),
  ],
);

// In MaterialApp:
MaterialApp.router(routerConfig: router)`,
      },
    ],
    relatedWeeks: FLUTTER_WEEKS,
    tags: ["flutter", "go_router", "navigation", "routes", "redirect", "path parameters"],
    difficulty: "beginner",
  },
  {
    id: "cs-navigation-methods",
    title: "Navigation Methods",
    category: "cheat-sheet",
    summary: "go_router navigation: go, push, pop, and query parameters.",
    content: `Use \`context.go\` to replace the navigation stack, \`context.push\` to add to the stack, \`context.pop\` to go back, and query parameters for passing data.`,
    codeSnippets: [
      {
        id: "cs-gorouter-methods",
        language: "dart",
        label: "go, push, pop, Query Params",
        code: `context.go('/home');                     // replace stack
context.push('/detail/42');             // push onto stack
context.pop();                           // go back
context.go('/detail/42?tab=info');       // query params
state.uri.queryParameters['tab'];        // read query param`,
      },
    ],
    relatedWeeks: FLUTTER_WEEKS,
    tags: ["flutter", "go_router", "go", "push", "pop", "query parameters", "navigation"],
    difficulty: "beginner",
  },
  {
    id: "cs-navigation-dialogs-sheets",
    title: "Dialogs & Sheets",
    category: "cheat-sheet",
    summary: "Flutter AlertDialog, showModalBottomSheet, and SnackBar patterns.",
    content: `Use \`showDialog\` for modal alerts, \`showModalBottomSheet\` for bottom panels, and \`ScaffoldMessenger.showSnackBar\` for brief notifications.`,
    codeSnippets: [
      {
        id: "cs-dialogs-sheets-snackbar",
        language: "dart",
        label: "AlertDialog, BottomSheet, SnackBar",
        code: `// Alert dialog
showDialog(context: context, builder: (_) => AlertDialog(
  title: const Text('Confirm'),
  actions: [
    TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
    ElevatedButton(onPressed: () {}, child: const Text('OK')),
  ],
));

// Bottom sheet
showModalBottomSheet(context: context, builder: (_) => Container(height: 200));

// SnackBar
ScaffoldMessenger.of(context).showSnackBar(
  const SnackBar(content: Text('Done!'), duration: Duration(seconds: 2)),
);`,
      },
    ],
    relatedWeeks: FLUTTER_WEEKS,
    tags: ["flutter", "AlertDialog", "BottomSheet", "SnackBar", "dialog", "modal"],
    difficulty: "beginner",
  },

  // ─── THEMING & RESPONSIVE ───────────────────────────────────────────
  {
    id: "cs-theming-theme",
    title: "Theme",
    category: "cheat-sheet",
    summary: "Flutter ThemeData configuration with Material 3, color schemes, and text themes.",
    content: `Configure \`ThemeData\` with Material 3, custom color schemes, and text themes. Access theme properties via \`Theme.of(context)\` in widgets.`,
    codeSnippets: [
      {
        id: "cs-theme-data-config",
        language: "dart",
        label: "ThemeData & Theme Access",
        code: `ThemeData(
  useMaterial3: true,
  colorSchemeSeed: Colors.blue,
  brightness: Brightness.light,
  textTheme: const TextTheme(
    headlineLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
    bodyMedium: TextStyle(fontSize: 14),
  ),
)

// Access in widget:
Theme.of(context).colorScheme.primary
Theme.of(context).textTheme.headlineLarge`,
      },
    ],
    relatedWeeks: FLUTTER_WEEKS,
    tags: ["flutter", "theme", "ThemeData", "Material3", "color scheme", "text theme"],
    difficulty: "beginner",
  },
  {
    id: "cs-theming-responsive",
    title: "Responsive",
    category: "cheat-sheet",
    summary: "Flutter responsive design with MediaQuery, LayoutBuilder, and OrientationBuilder.",
    content: `Use \`MediaQuery\` for screen dimensions, \`LayoutBuilder\` for constraint-based layouts, and \`OrientationBuilder\` for landscape/portrait switching.`,
    codeSnippets: [
      {
        id: "cs-responsive-layout-builder",
        language: "dart",
        label: "MediaQuery, LayoutBuilder, OrientationBuilder",
        code: `// Screen size
final size = MediaQuery.of(context).size;
final width = size.width;

// Constraint-based layout
LayoutBuilder(
  builder: (ctx, constraints) {
    if (constraints.maxWidth > 600) return WideLayout();
    return NarrowLayout();
  },
)

// Orientation
OrientationBuilder(
  builder: (ctx, orientation) {
    return orientation == Orientation.landscape
        ? LandscapeLayout()
        : PortraitLayout();
  },
)`,
      },
    ],
    relatedWeeks: FLUTTER_WEEKS,
    tags: ["flutter", "responsive", "MediaQuery", "LayoutBuilder", "OrientationBuilder"],
    difficulty: "beginner",
  },
  {
    id: "cs-theming-animations",
    title: "Animations",
    category: "cheat-sheet",
    summary: "Flutter implicit animations, explicit AnimationController, and Hero transitions.",
    content: `Flutter offers implicit animations (AnimatedContainer, AnimatedOpacity) for automatic transitions, explicit AnimationController for manual control, and Hero for shared element transitions.`,
    codeSnippets: [
      {
        id: "cs-animations-implicit-explicit-hero",
        language: "dart",
        label: "Implicit, Explicit, and Hero Animations",
        code: `// Implicit (automatic)
AnimatedContainer(duration: const Duration(milliseconds: 300), width: _width, color: _color)
AnimatedOpacity(duration: const Duration(milliseconds: 200), opacity: _opacity, child: child)
AnimatedSwitcher(duration: const Duration(milliseconds: 300), child: _widget)

// Explicit (manual control)
class _MyState extends State<MyWidget> with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double> _anim;
  
  @override void initState() {
    super.initState();
    _ctrl = AnimationController(vsync: this, duration: const Duration(seconds: 1));
    _anim = Tween<double>(begin: 0, end: 1).animate(CurvedAnimation(parent: _ctrl, curve: Curves.easeInOut));
    _ctrl.forward();
  }
  @override void dispose() { _ctrl.dispose(); super.dispose(); }
}

// Hero animation
Hero(tag: 'product-1', child: Image.network(url))  // same tag on both screens`,
      },
    ],
    relatedWeeks: FLUTTER_WEEKS,
    tags: ["flutter", "animation", "AnimatedContainer", "AnimationController", "Hero", "implicit", "explicit"],
    difficulty: "beginner",
  },

  // ─── STATE MANAGEMENT — CUBIT / BLOC ────────────────────────────────
  {
    id: "cs-cubit-setup",
    title: "Cubit Setup",
    category: "cheat-sheet",
    summary: "Cubit creation with sealed state classes, BlocProvider, and MultiBlocProvider.",
    content: `Create Cubits with sealed state classes for exhaustive pattern matching. Provide them via \`BlocProvider\` or \`MultiBlocProvider\` at the widget tree root.`,
    codeSnippets: [
      {
        id: "cs-cubit-sealed-state-provider",
        language: "dart",
        label: "Sealed State, Cubit, Provider",
        code: `// State (use sealed class)
sealed class CounterState {}
class CounterInitial extends CounterState {}
class CounterLoaded extends CounterState {
  final int count;
  CounterLoaded(this.count);
}

// Cubit
class CounterCubit extends Cubit<CounterState> {
  CounterCubit() : super(CounterInitial());
  void increment() => emit(CounterLoaded((state is CounterLoaded) ? (state as CounterLoaded).count + 1 : 1));
}

// Provide
BlocProvider(create: (_) => CounterCubit(), child: MyApp())

// Multiple providers
MultiBlocProvider(providers: [
  BlocProvider(create: (_) => CounterCubit()),
  BlocProvider(create: (_) => AuthCubit()),
], child: MyApp())`,
      },
    ],
    relatedWeeks: BLOC_WEEKS,
    tags: ["flutter", "bloc", "cubit", "sealed class", "BlocProvider", "state management"],
    difficulty: "beginner",
  },
  {
    id: "cs-cubit-consuming",
    title: "Consuming Cubit",
    category: "cheat-sheet",
    summary: "BlocBuilder, BlocListener, BlocConsumer, context.read, and context.watch.",
    content: `Use \`BlocBuilder\` to rebuild UI on state changes, \`BlocListener\` for side effects, \`BlocConsumer\` for both, and \`context.read\`/\`context.watch\` for direct access.`,
    codeSnippets: [
      {
        id: "cs-blocbuilder-listener-consumer",
        language: "dart",
        label: "BlocBuilder, BlocListener, BlocConsumer",
        code: `// Rebuild UI on state change
BlocBuilder<CounterCubit, CounterState>(
  buildWhen: (prev, curr) => prev != curr,  // optional optimization
  builder: (ctx, state) {
    return switch (state) {
      CounterInitial() => const Text('0'),
      CounterLoaded(:final count) => Text('$count'),
    };
  },
)

// Side effects (navigation, snackbar)
BlocListener<AuthCubit, AuthState>(
  listener: (ctx, state) {
    if (state is AuthSuccess) ctx.go('/home');
    if (state is AuthError) ScaffoldMessenger.of(ctx).showSnackBar(...);
  },
)

// Both rebuild + side effects
BlocConsumer<AuthCubit, AuthState>(
  builder: (ctx, state) => ...,
  listener: (ctx, state) => ...,
)

// One-time call (no listen)
context.read<CounterCubit>().increment();
// Watch + rebuild
context.watch<CounterCubit>().state;`,
      },
    ],
    relatedWeeks: BLOC_WEEKS,
    tags: ["flutter", "bloc", "BlocBuilder", "BlocListener", "BlocConsumer", "context.read", "context.watch"],
    difficulty: "beginner",
  },
  {
    id: "cs-cubit-copywith-freezed",
    title: "copyWith Pattern with freezed",
    category: "cheat-sheet",
    summary: "Immutable state classes with freezed for copyWith and union types.",
    content: `Use \`@freezed\` to generate immutable state classes with \`copyWith\` for ergonomic state updates. Works seamlessly with Cubit/Bloc.`,
    codeSnippets: [
      {
        id: "cs-freezed-copywith",
        language: "dart",
        label: "Freezed State with copyWith",
        code: `@freezed
class UserState with _$UserState {
  const factory UserState({
    required String name,
    required bool isLoading,
    String? error,
  }) = _UserState;
}

// Usage
emit(state.copyWith(isLoading: true));
emit(state.copyWith(isLoading: false, name: 'Ali'));`,
      },
    ],
    relatedWeeks: BLOC_WEEKS,
    tags: ["flutter", "freezed", "copyWith", "immutable", "union", "code generation"],
    difficulty: "beginner",
  },
  {
    id: "cs-bloc-event-driven",
    title: "Bloc (Event-Driven)",
    category: "cheat-sheet",
    summary: "Bloc with sealed event classes, event handlers, and async transformers.",
    content: `Bloc uses events to trigger state changes. Define sealed event classes, register handlers with \`on<Event>\`, and use transformers like \`droppable()\` to prevent concurrent events.`,
    codeSnippets: [
      {
        id: "cs-bloc-events-handlers",
        language: "dart",
        label: "Sealed Events, Bloc Handlers",
        code: `// Events
sealed class AuthEvent {}
class LoginPressed extends AuthEvent { final String email, password; LoginPressed(this.email, this.password); }
class LogoutPressed extends AuthEvent {}

// Bloc
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc() : super(AuthInitial()) {
    on<LoginPressed>(_onLogin, transformer: droppable());  // ignore while busy
    on<LogoutPressed>(_onLogout);
  }
  
  Future<void> _onLogin(LoginPressed event, Emitter<AuthState> emit) async {
    emit(AuthLoading());
    try {
      final user = await _repo.login(event.email, event.password);
      emit(AuthSuccess(user));
    } catch (e) {
      emit(AuthError(e.toString()));
    }
  }
}`,
      },
    ],
    relatedWeeks: BLOC_WEEKS,
    tags: ["flutter", "bloc", "events", "sealed class", "handler", "transformer", "droppable"],
    difficulty: "beginner",
  },
  {
    id: "cs-bloc-global-observer",
    title: "Global Observer",
    category: "cheat-sheet",
    summary: "BlocObserver for global state change logging and error tracking.",
    content: `Implement \`BlocObserver\` to globally monitor all Bloc/Cubit state changes and errors for debugging and analytics.`,
    codeSnippets: [
      {
        id: "cs-bloc-observer",
        language: "dart",
        label: "BlocObserver Implementation",
        code: `class AppBlocObserver extends BlocObserver {
  @override void onChange(BlocBase b, Change c) { super.onChange(b, c); print(c); }
  @override void onError(BlocBase b, Object e, StackTrace s) { super.onError(b, e, s); }
}
// In main:
Bloc.observer = AppBlocObserver();`,
      },
    ],
    relatedWeeks: BLOC_WEEKS,
    tags: ["flutter", "bloc", "BlocObserver", "logging", "debugging", "state changes"],
    difficulty: "beginner",
  },
  {
    id: "cs-dependency-injection",
    title: "Dependency Injection (get_it + injectable)",
    category: "cheat-sheet",
    summary: "get_it and injectable for service locator pattern and DI code generation.",
    content: `Use \`get_it\` as a service locator with \`injectable\` for code-generated dependency registration. Annotate classes with \`@injectable\`, \`@singleton\`, or \`@lazySingleton\`.`,
    codeSnippets: [
      {
        id: "cs-getit-injectable",
        language: "dart",
        label: "get_it + injectable Setup",
        code: `final getIt = GetIt.instance;

@InjectableInit()
void configureDependencies() => getIt.init();

@injectable  class UserRepository { ... }
@singleton   class AuthService { ... }
@lazySingleton class ApiClient { ... }

// Usage
getIt<UserRepository>()`,
      },
    ],
    relatedWeeks: BLOC_WEEKS,
    tags: ["flutter", "get_it", "injectable", "dependency injection", "singleton", "service locator"],
    difficulty: "beginner",
  },

  // ─── NETWORKING (DIO) ───────────────────────────────────────────────
  {
    id: "cs-dio-setup",
    title: "DIO Setup",
    category: "cheat-sheet",
    summary: "Dio HTTP client configuration with base options, logging, and auth interceptors.",
    content: `Configure \`Dio\` with base URL, timeouts, and headers. Add interceptors for logging and automatic auth token injection with refresh logic.`,
    codeSnippets: [
      {
        id: "cs-dio-interceptors",
        language: "dart",
        label: "Dio Configuration & Interceptors",
        code: `final dio = Dio(BaseOptions(
  baseUrl: 'https://api.example.com',
  connectTimeout: const Duration(seconds: 10),
  receiveTimeout: const Duration(seconds: 30),
  headers: {'Content-Type': 'application/json'},
));

// Logging interceptor
dio.interceptors.add(LogInterceptor(responseBody: true));

// Auth interceptor
dio.interceptors.add(InterceptorsWrapper(
  onRequest: (options, handler) {
    options.headers['Authorization'] = 'Bearer $token';
    handler.next(options);
  },
  onError: (error, handler) async {
    if (error.response?.statusCode == 401) {
      await refreshToken();
      handler.resolve(await dio.fetch(error.requestOptions));
    } else {
      handler.next(error);
    }
  },
));`,
      },
    ],
    relatedWeeks: NETWORKING_WEEKS,
    tags: ["flutter", "dio", "http", "interceptors", "auth", "logging", "timeout"],
    difficulty: "beginner",
  },
  {
    id: "cs-dio-http-methods",
    title: "HTTP Methods",
    category: "cheat-sheet",
    summary: "Dio GET, POST, PUT, PATCH, DELETE, and file upload with FormData.",
    content: `Dio provides methods for all HTTP verbs: \`get\`, \`post\`, \`put\`, \`patch\`, \`delete\`. Use \`FormData\` for file uploads.`,
    codeSnippets: [
      {
        id: "cs-dio-get-post-put-delete",
        language: "dart",
        label: "GET, POST, PUT, PATCH, DELETE, Upload",
        code: `// GET
final res = await dio.get('/users', queryParameters: {'page': 1});

// POST
final res = await dio.post('/users', data: {'name': 'Ali', 'email': 'ali@example.com'});

// PUT / PATCH
await dio.put('/users/1', data: {'name': 'Updated'});
await dio.patch('/users/1', data: {'name': 'Partial'});

// DELETE
await dio.delete('/users/1');

// File upload
final form = FormData.fromMap({
  'file': await MultipartFile.fromFile('/path/to/file.jpg', filename: 'photo.jpg'),
});
await dio.post('/upload', data: form);`,
      },
    ],
    relatedWeeks: NETWORKING_WEEKS,
    tags: ["flutter", "dio", "GET", "POST", "PUT", "DELETE", "upload", "FormData"],
    difficulty: "beginner",
  },
  {
    id: "cs-json-serialization",
    title: "JSON Serialization (json_serializable)",
    category: "cheat-sheet",
    summary: "json_serializable code generation for model classes with @JsonKey.",
    content: `Use \`@JsonSerializable\` for automatic \`fromJson\`/\`toJson\` code generation. Customize field mapping with \`@JsonKey\`. Run \`build_runner\` to generate code.`,
    codeSnippets: [
      {
        id: "cs-json-serializable-model",
        language: "dart",
        label: "JsonSerializable Model",
        code: `@JsonSerializable()
class User {
  final int id;
  @JsonKey(name: 'first_name')
  final String firstName;
  
  const User({required this.id, required this.firstName});
  
  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}
// Generate: dart run build_runner build`,
      },
    ],
    relatedWeeks: NETWORKING_WEEKS,
    tags: ["flutter", "json_serializable", "JSON", "serialization", "code generation", "build_runner"],
    difficulty: "beginner",
  },
  {
    id: "cs-error-handling-either",
    title: "Error Handling (Either)",
    category: "cheat-sheet",
    summary: "Functional error handling with dartz Either type for Left(failure) / Right(success).",
    content: `Use dartz \`Either<Failure, Success>\` to handle errors functionally. Return \`Left\` for failures and \`Right\` for success. Consume with \`fold\`.`,
    codeSnippets: [
      {
        id: "cs-dartz-either-pattern",
        language: "dart",
        label: "Either with dartz",
        code: `// Using dartz
Future<Either<Failure, User>> getUser(int id) async {
  try {
    final res = await _dio.get('/users/$id');
    return Right(User.fromJson(res.data));
  } on DioException catch (e) {
    return Left(ServerFailure(e.message ?? 'Server error'));
  }
}

// Consuming
final result = await repo.getUser(1);
result.fold(
  (failure) => emit(UserError(failure.message)),
  (user)    => emit(UserLoaded(user)),
);`,
      },
    ],
    relatedWeeks: NETWORKING_WEEKS,
    tags: ["flutter", "dartz", "Either", "functional", "error handling", "Left", "Right", "Failure"],
    difficulty: "beginner",
  },

  // ─── LOCAL STORAGE ──────────────────────────────────────────────────
  {
    id: "cs-shared-preferences",
    title: "SharedPreferences",
    category: "cheat-sheet",
    summary: "SharedPreferences for simple key-value persistent storage.",
    content: `Use \`SharedPreferences\` for simple key-value storage (strings, bools, ints). Suitable for settings and small data. Not encrypted.`,
    codeSnippets: [
      {
        id: "cs-shared-prefs-crud",
        language: "dart",
        label: "SharedPreferences CRUD",
        code: `final prefs = await SharedPreferences.getInstance();

await prefs.setString('token', 'abc123');
await prefs.setBool('isDark', true);
await prefs.setInt('count', 5);

prefs.getString('token');    // → 'abc123' | null
prefs.getBool('isDark');     // → true | null
await prefs.remove('token');
await prefs.clear();`,
      },
    ],
    relatedWeeks: STORAGE_WEEKS,
    tags: ["flutter", "shared_preferences", "key-value", "storage", "settings"],
    difficulty: "beginner",
  },
  {
    id: "cs-hive",
    title: "Hive",
    category: "cheat-sheet",
    summary: "Hive NoSQL database with TypeAdapters for typed local storage.",
    content: `Hive is a fast NoSQL database. Use \`TypeAdapter\` for custom object serialization. Run \`build_runner\` to generate adapters.`,
    codeSnippets: [
      {
        id: "cs-hive-setup-crud",
        language: "dart",
        label: "Hive Setup & CRUD",
        code: `// Setup (main)
await Hive.initFlutter();
Hive.registerAdapter(UserAdapter());
final box = await Hive.openBox<User>('users');

// CRUD
box.put('user1', User(name: 'Ali'));    // write
box.get('user1');                        // read
box.delete('user1');                     // delete
box.values.toList();                     // all values

// TypeAdapter (run build_runner to generate)
@HiveType(typeId: 0)
class User {
  @HiveField(0) final String name;
  @HiveField(1) final int age;
  User({required this.name, required this.age});
}`,
      },
    ],
    relatedWeeks: STORAGE_WEEKS,
    tags: ["flutter", "hive", "NoSQL", "TypeAdapter", "local database", "storage"],
    difficulty: "beginner",
  },
  {
    id: "cs-secure-storage",
    title: "flutter_secure_storage",
    category: "cheat-sheet",
    summary: "Encrypted storage for sensitive data like tokens and credentials.",
    content: `Use \`FlutterSecureStorage\` for encrypted key-value storage. Ideal for auth tokens, API keys, and other sensitive data.`,
    codeSnippets: [
      {
        id: "cs-secure-storage-ops",
        language: "dart",
        label: "Secure Storage Operations",
        code: `const storage = FlutterSecureStorage();
await storage.write(key: 'token', value: 'Bearer xyz');
final token = await storage.read(key: 'token');
await storage.delete(key: 'token');
await storage.deleteAll();`,
      },
    ],
    relatedWeeks: STORAGE_WEEKS,
    tags: ["flutter", "secure storage", "encrypted", "tokens", "credentials", "security"],
    difficulty: "beginner",
  },
  {
    id: "cs-sqlite",
    title: "SQLite (sqflite)",
    category: "cheat-sheet",
    summary: "sqflite for SQLite database with table creation, CRUD, and queries.",
    content: `Use \`sqflite\` for full SQLite database support. Create tables with \`onCreate\`, perform CRUD with \`insert\`, \`query\`, \`update\`, \`delete\`.`,
    codeSnippets: [
      {
        id: "cs-sqflite-setup-crud",
        language: "dart",
        label: "sqflite Database & CRUD",
        code: `final db = await openDatabase('app.db', version: 1,
  onCreate: (db, version) async {
    await db.execute('''CREATE TABLE users (
      id INTEGER PRIMARY KEY, name TEXT, email TEXT)''');
  },
);

// CRUD
await db.insert('users', {'name': 'Ali', 'email': 'ali@ex.com'});
final rows = await db.query('users', where: 'id = ?', whereArgs: [1]);
await db.update('users', {'name': 'Updated'}, where: 'id = ?', whereArgs: [1]);
await db.delete('users', where: 'id = ?', whereArgs: [1]);`,
      },
    ],
    relatedWeeks: STORAGE_WEEKS,
    tags: ["flutter", "sqflite", "SQLite", "database", "SQL", "CRUD", "table"],
    difficulty: "beginner",
  },

  // ─── CLEAN ARCHITECTURE ─────────────────────────────────────────────
  {
    id: "cs-clean-architecture-folder",
    title: "Clean Architecture Folder Structure",
    category: "cheat-sheet",
    summary: "Standard Clean Architecture folder layout with core, features, data, domain, and presentation layers.",
    content: `\`\`\`
lib/
├── core/
│   ├── constants/
│   ├── errors/         # Failure classes
│   ├── network/        # Dio client, interceptors
│   ├── usecases/       # Abstract UseCase<T,P>
│   └── theme/
├── features/
│   └── auth/
│       ├── data/
│       │   ├── datasources/    # remote_data_source.dart
│       │   ├── models/         # user_model.dart (extends entity)
│       │   └── repositories/   # auth_repo_impl.dart
│       ├── domain/
│       │   ├── entities/       # user.dart
│       │   ├── repositories/   # auth_repository.dart (abstract)
│       │   └── usecases/       # login_usecase.dart
│       └── presentation/
│           ├── cubit/          # auth_cubit.dart + auth_state.dart
│           ├── pages/          # login_page.dart
│           └── widgets/
├── injection_container.dart
└── main.dart
\`\`\``,
    codeSnippets: [],
    relatedWeeks: ALL_WEEKS,
    tags: ["clean architecture", "folder structure", "project structure", "core", "features", "layers"],
    difficulty: "beginner",
  },
  {
    id: "cs-clean-architecture-layers",
    title: "Clean Architecture Layers Responsibility",
    category: "cheat-sheet",
    summary: "Layer responsibilities: Presentation knows Domain, Domain knows nothing, Data knows Domain.",
    content: `| Layer | Knows About | Contains |
|-------|-------------|----------|
| **Presentation** | Domain only | Cubits, Pages, Widgets |
| **Domain** | Nothing | Entities, UseCase interfaces, Repo interfaces, Failures |
| **Data** | Domain only | Models, Repo implementations, Data sources |`,
    codeSnippets: [],
    relatedWeeks: ALL_WEEKS,
    tags: ["clean architecture", "layers", "presentation", "domain", "data", "separation of concerns"],
    difficulty: "beginner",
  },
  {
    id: "cs-usecase-pattern",
    title: "UseCase Pattern",
    category: "cheat-sheet",
    summary: "Abstract UseCase<Type, Params> with Either return type and NoParams sentinel.",
    content: `Define a generic \`UseCase<Type, Params>\` abstract class. Each business logic operation is a concrete UseCase that returns \`Either<Failure, Type>\`.`,
    codeSnippets: [
      {
        id: "cs-usecase-abstract-concrete",
        language: "dart",
        label: "UseCase Abstract & Concrete Implementation",
        code: `abstract class UseCase<Type, Params> {
  Future<Either<Failure, Type>> call(Params params);
}

class NoParams extends Equatable {
  @override List<Object?> get props => [];
}

class LoginUseCase extends UseCase<User, LoginParams> {
  final AuthRepository repository;
  LoginUseCase(this.repository);
  
  @override
  Future<Either<Failure, User>> call(LoginParams params) {
    return repository.login(params.email, params.password);
  }
}`,
      },
    ],
    relatedWeeks: ALL_WEEKS,
    tags: ["clean architecture", "UseCase", "Either", "business logic", "NoParams", "repository"],
    difficulty: "beginner",
  },
  {
    id: "cs-failure-classes",
    title: "Failure Classes",
    category: "cheat-sheet",
    summary: "Abstract Failure class with ServerFailure, CacheFailure, and NetworkFailure subclasses.",
    content: `Define an abstract \`Failure\` class extending \`Equatable\`. Create specific failure types for different error sources.`,
    codeSnippets: [
      {
        id: "cs-failure-hierarchy",
        language: "dart",
        label: "Failure Class Hierarchy",
        code: `abstract class Failure extends Equatable {
  final String message;
  const Failure(this.message);
  @override List<Object?> get props => [message];
}

class ServerFailure   extends Failure { const ServerFailure(super.message); }
class CacheFailure    extends Failure { const CacheFailure(super.message); }
class NetworkFailure  extends Failure { const NetworkFailure(super.message); }`,
      },
    ],
    relatedWeeks: ALL_WEEKS,
    tags: ["clean architecture", "Failure", "ServerFailure", "CacheFailure", "NetworkFailure", "error handling"],
    difficulty: "beginner",
  },

  // ─── FIREBASE ───────────────────────────────────────────────────────
  {
    id: "cs-firebase-setup",
    title: "Firebase Setup",
    category: "cheat-sheet",
    summary: "Firebase CLI installation, FlutterFire CLI, and project configuration.",
    content: `Install Firebase tools globally and use FlutterFire CLI to configure your Flutter project for Firebase services.`,
    codeSnippets: [
      {
        id: "cs-firebase-cli-setup",
        language: "bash",
        label: "Firebase CLI & FlutterFire Configure",
        code: `# Install CLI
npm install -g firebase-tools
dart pub global activate flutterfire_cli

# Configure project
flutterfire configure`,
      },
    ],
    relatedWeeks: FIREBASE_WEEKS,
    tags: ["firebase", "setup", "CLI", "flutterfire", "configuration"],
    difficulty: "beginner",
  },
  {
    id: "cs-firebase-auth",
    title: "Firebase Auth",
    category: "cheat-sheet",
    summary: "Firebase Authentication: email/password, auth state listener, and current user.",
    content: `Use \`FirebaseAuth\` for email/password sign-up, sign-in, sign-out, password reset, and real-time auth state listening.`,
    codeSnippets: [
      {
        id: "cs-firebase-auth-methods",
        language: "dart",
        label: "Email/Password Auth & State",
        code: `// Email / Password
await FirebaseAuth.instance.createUserWithEmailAndPassword(email: e, password: p);
await FirebaseAuth.instance.signInWithEmailAndPassword(email: e, password: p);
await FirebaseAuth.instance.signOut();
await FirebaseAuth.instance.sendPasswordResetEmail(email: e);

// Listen to auth state
FirebaseAuth.instance.authStateChanges().listen((user) {
  if (user == null) { /* logged out */ } else { /* logged in */ }
});

// Current user
final user = FirebaseAuth.instance.currentUser;
user?.uid; user?.email; user?.displayName;`,
      },
    ],
    relatedWeeks: FIREBASE_WEEKS,
    tags: ["firebase", "auth", "authentication", "email", "password", "sign-in", "sign-out"],
    difficulty: "beginner",
  },
  {
    id: "cs-firestore-crud",
    title: "Firestore CRUD",
    category: "cheat-sheet",
    summary: "Cloud Firestore: create, read, update, delete, queries, real-time, and batch operations.",
    content: `Cloud Firestore provides document-based NoSQL storage with real-time listeners, queries with \`where\`/\`orderBy\`/\`limit\`, and batch operations.`,
    codeSnippets: [
      {
        id: "cs-firestore-crud-ops",
        language: "dart",
        label: "Firestore CRUD, Queries, Real-time, Batch",
        code: `final db = FirebaseFirestore.instance;
final col = db.collection('users');

// Create
await col.add({'name': 'Ali', 'createdAt': FieldValue.serverTimestamp()});
await col.doc('user1').set({'name': 'Ali'});

// Read
final snap = await col.doc('user1').get();
snap.data(); snap.id;

// Query
final query = await col
    .where('age', isGreaterThan: 18)
    .orderBy('name')
    .limit(20)
    .get();
query.docs.map((d) => User.fromJson(d.data())).toList();

// Real-time
col.snapshots().listen((snap) {
  final users = snap.docs.map((d) => User.fromJson(d.data())).toList();
});

// Update
await col.doc('user1').update({'name': 'Updated'});

// Delete
await col.doc('user1').delete();

// Batch
final batch = db.batch();
batch.set(col.doc('a'), {'name': 'A'});
batch.update(col.doc('b'), {'name': 'B'});
await batch.commit();`,
      },
    ],
    relatedWeeks: FIREBASE_WEEKS,
    tags: ["firebase", "Firestore", "CRUD", "queries", "real-time", "batch", "collection", "document"],
    difficulty: "beginner",
  },
  {
    id: "cs-firebase-storage",
    title: "Firebase Storage",
    category: "cheat-sheet",
    summary: "Firebase Storage: file upload with progress tracking and download URL retrieval.",
    content: `Use \`FirebaseStorage\` for file uploads with progress monitoring via \`snapshotEvents\`. Get download URLs with \`getDownloadURL\`.`,
    codeSnippets: [
      {
        id: "cs-firebase-storage-upload",
        language: "dart",
        label: "Upload, Progress, Download URL, Delete",
        code: `final ref = FirebaseStorage.instance.ref('uploads/photo.jpg');

// Upload
final task = ref.putFile(File('/path/to/photo.jpg'));
task.snapshotEvents.listen((snap) {
  final progress = snap.bytesTransferred / snap.totalBytes;
});
await task;
final url = await ref.getDownloadURL();

// Delete
await ref.delete();`,
      },
    ],
    relatedWeeks: FIREBASE_WEEKS,
    tags: ["firebase", "storage", "upload", "download", "file", "progress", "URL"],
    difficulty: "beginner",
  },
  {
    id: "cs-fcm-push-notifications",
    title: "FCM Push Notifications",
    category: "cheat-sheet",
    summary: "Firebase Cloud Messaging: permission, token, foreground messages, and background navigation.",
    content: `Firebase Cloud Messaging (FCM) handles push notifications. Request permission, get device token, handle foreground messages, and navigate on background taps.`,
    codeSnippets: [
      {
        id: "cs-fcm-permission-token-listener",
        language: "dart",
        label: "FCM Permission, Token, Listeners",
        code: `// Request permission (iOS)
await FirebaseMessaging.instance.requestPermission();

// Get token
final token = await FirebaseMessaging.instance.getToken();

// Foreground messages
FirebaseMessaging.onMessage.listen((msg) {
  FlutterLocalNotificationsPlugin().show(0, msg.notification?.title, msg.notification?.body, ...);
});

// Background tap navigation
FirebaseMessaging.onMessageOpenedApp.listen((msg) {
  context.go('/detail/\${msg.data['id']}');
});`,
      },
    ],
    relatedWeeks: FIREBASE_WEEKS,
    tags: ["firebase", "FCM", "push notifications", "messaging", "token", "foreground", "background"],
    difficulty: "beginner",
  },

  // ─── TESTING ────────────────────────────────────────────────────────
  {
    id: "cs-unit-tests",
    title: "Unit Tests",
    category: "cheat-sheet",
    summary: "Dart unit tests with group, setUp/tearDown, expect, and blocTest.",
    content: `Use \`group\` to organize tests, \`setUp\`/\`tearDown\` for lifecycle, \`expect\` for assertions, and \`blocTest\` for Cubit/Bloc testing.`,
    codeSnippets: [
      {
        id: "cs-unit-test-bloc-test",
        language: "dart",
        label: "Unit Test & blocTest",
        code: `void main() {
  group('CounterCubit', () {
    late CounterCubit cubit;
    
    setUp(() => cubit = CounterCubit());
    tearDown(() => cubit.close());
    
    test('initial state is 0', () {
      expect(cubit.state, const CounterInitial());
    });
    
    blocTest<CounterCubit, CounterState>(
      'emits [CounterLoaded(1)] when increment called',
      build: () => CounterCubit(),
      act: (c) => c.increment(),
      expect: () => [const CounterLoaded(1)],
    );
  });
}`,
      },
    ],
    relatedWeeks: ALL_WEEKS,
    tags: ["testing", "unit test", "blocTest", "group", "setUp", "tearDown", "expect"],
    difficulty: "beginner",
  },
  {
    id: "cs-mocking",
    title: "Mocking (mocktail)",
    category: "cheat-sheet",
    summary: "mocktail for creating mocks, stubbing with when, and verification.",
    content: `Use \`mocktail\` to create mock objects. Stub methods with \`when\`, verify calls with \`verify\`, and check non-calls with \`verifyNever\`.`,
    codeSnippets: [
      {
        id: "cs-mocktail-when-verify",
        language: "dart",
        label: "Mock, When, Verify",
        code: `class MockUserRepository extends Mock implements UserRepository {}

final mockRepo = MockUserRepository();

when(() => mockRepo.getUser(1)).thenAnswer((_) async => Right(fakeUser));
when(() => mockRepo.getUser(0)).thenThrow(NetworkException('No connection'));

verify(() => mockRepo.getUser(1)).called(1);
verifyNever(() => mockRepo.deleteUser(any()));`,
      },
    ],
    relatedWeeks: ALL_WEEKS,
    tags: ["testing", "mocktail", "mock", "when", "verify", "stubbing", "test doubles"],
    difficulty: "beginner",
  },
  {
    id: "cs-widget-tests",
    title: "Widget Tests",
    category: "cheat-sheet",
    summary: "Flutter widget tests with pumpWidget, pumpAndSettle, find, and assertions.",
    content: `Use \`testWidgets\` for widget testing. \`pumpWidget\` renders the widget, \`pumpAndSettle\` waits for animations, and \`find\` locates widgets for assertions.`,
    codeSnippets: [
      {
        id: "cs-widget-test-pattern",
        language: "dart",
        label: "Widget Test with BlocProvider",
        code: `testWidgets('shows user name', (tester) async {
  await tester.pumpWidget(
    BlocProvider(
      create: (_) => UserCubit()..loadUser(1),
      child: const MaterialApp(home: UserPage()),
    ),
  );
  await tester.pumpAndSettle();
  
  expect(find.text('Ali'), findsOneWidget);
  expect(find.byType(CircularProgressIndicator), findsNothing);
  
  await tester.tap(find.byKey(const Key('editButton')));
  await tester.pumpAndSettle();
  expect(find.text('Edit Profile'), findsOneWidget);
});`,
      },
    ],
    relatedWeeks: ALL_WEEKS,
    tags: ["testing", "widget test", "testWidgets", "pumpWidget", "find", "tester"],
    difficulty: "beginner",
  },

  // ─── DEPLOYMENT ─────────────────────────────────────────────────────
  {
    id: "cs-android-deployment",
    title: "Android Deployment",
    category: "cheat-sheet",
    summary: "Android keystore generation, APK/AAB builds, key.properties, and Gradle signing config.",
    content: `Generate a keystore for release signing, configure \`key.properties\`, and set up Gradle signing config for release builds.`,
    codeSnippets: [
      {
        id: "cs-android-keystore-build",
        language: "bash",
        label: "Keystore Generation & Build Commands",
        code: `# Generate keystore (once)
keytool -genkey -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload

# Build
flutter build apk --split-per-abi        # APK per architecture
flutter build appbundle                  # .aab for Play Store (preferred)`,
      },
      {
        id: "cs-android-key-properties",
        language: "properties",
        label: "key.properties",
        code: `# android/key.properties
storePassword=...
keyPassword=...
keyAlias=upload
storeFile=../upload-keystore.jks`,
      },
      {
        id: "cs-android-build-gradle",
        language: "groovy",
        label: "android/app/build.gradle Signing Config",
        code: `// android/app/build.gradle
def keyProps = new Properties()
keyProps.load(new FileInputStream(rootProject.file("key.properties")))

android {
  signingConfigs {
    release {
      keyAlias keyProps['keyAlias']
      keyPassword keyProps['keyPassword']
      storeFile file(keyProps['storeFile'])
      storePassword keyProps['storePassword']
    }
  }
  buildTypes {
    release { signingConfig signingConfigs.release }
  }
}`,
      },
    ],
    relatedWeeks: DEPLOYMENT_WEEKS,
    tags: ["deployment", "android", "keystore", "APK", "AAB", "Gradle", "signing", "Play Store"],
    difficulty: "beginner",
  },
  {
    id: "cs-ios-deployment",
    title: "iOS Deployment",
    category: "cheat-sheet",
    summary: "Flutter iOS build with flutter build ipa and Xcode/Transporter upload.",
    content: `Build the iOS release with \`flutter build ipa\`, then upload via Xcode Organizer or the Transporter app.`,
    codeSnippets: [
      {
        id: "cs-ios-build-ipa",
        language: "bash",
        label: "Build IPA for iOS",
        code: `flutter build ipa`,
      },
    ],
    relatedWeeks: DEPLOYMENT_WEEKS,
    tags: ["deployment", "iOS", "ipa", "Xcode", "Transporter", "App Store"],
    difficulty: "beginner",
  },
  {
    id: "cs-web-deployment",
    title: "Web Deployment",
    category: "cheat-sheet",
    summary: "Flutter web build and Firebase Hosting deployment.",
    content: `Build the Flutter web app and deploy to Firebase Hosting.`,
    codeSnippets: [
      {
        id: "cs-web-build-deploy",
        language: "bash",
        label: "Build Web & Deploy to Firebase Hosting",
        code: `flutter build web --release
firebase deploy --only hosting`,
      },
    ],
    relatedWeeks: DEPLOYMENT_WEEKS,
    tags: ["deployment", "web", "Firebase Hosting", "build", "release"],
    difficulty: "beginner",
  },

  // ─── KEY PACKAGES REFERENCE ─────────────────────────────────────────
  {
    id: "cs-key-packages",
    title: "Key Packages Reference",
    category: "cheat-sheet",
    summary: "Essential Flutter packages for state management, networking, storage, testing, and UI.",
    content: `| Package | Purpose | Usage |
|---------|---------|-------|
| \`flutter_bloc\` | State management | \`BlocProvider\`, \`BlocBuilder\` |
| \`equatable\` | Value equality | \`extends Equatable\`, override \`props\` |
| \`freezed\` | Immutable state / unions | \`@freezed\`, \`copyWith\`, sealed classes |
| \`get_it\` | Dependency injection | \`GetIt.instance.get<T>()\` |
| \`injectable\` | DI code generation | \`@injectable\`, \`@singleton\` |
| \`dio\` | HTTP client | \`Dio().get/post/put/delete\` |
| \`json_serializable\` | JSON codegen | \`@JsonSerializable()\`, \`build_runner\` |
| \`dartz\` | Functional types | \`Either<Failure, Success>\` |
| \`go_router\` | Navigation | \`GoRouter\`, \`context.go()\` |
| \`hive_flutter\` | NoSQL local DB | \`Box\`, \`TypeAdapter\` |
| \`sqflite\` | SQLite | \`openDatabase\`, CRUD |
| \`shared_preferences\` | Simple key-value | \`setString\`, \`getString\` |
| \`flutter_secure_storage\` | Encrypted storage | \`write\`, \`read\`, \`delete\` |
| \`cached_network_image\` | Image caching | \`CachedNetworkImage(imageUrl)\` |
| \`shimmer\` | Loading skeleton | \`Shimmer.fromColors(...)\` |
| \`intl\` | Dates & numbers | \`DateFormat\`, \`NumberFormat\` |
| \`bloc_test\` | Test Cubits/Blocs | \`blocTest<C,S>(...)\` |
| \`mocktail\` | Mock dependencies | \`Mock\`, \`when\`, \`verify\` |
| \`flutter_localizations\` | i18n | ARB files, \`Localizations.of()\` |
| \`connectivity_plus\` | Network status | \`Connectivity().checkConnectivity()\` |
| \`permission_handler\` | Runtime permissions | \`Permission.camera.request()\` |
| \`image_picker\` | Camera / gallery | \`ImagePicker().pickImage(source)\` |
| \`geolocator\` | GPS location | \`Geolocator.getCurrentPosition()\` |
| \`google_maps_flutter\` | Maps widget | \`GoogleMap(markers, polylines)\` |
| \`flutter_local_notifications\` | Local notifications | \`show\`, \`schedule\` |
| \`url_launcher\` | Open URLs | \`launchUrl(Uri.parse(url))\` |`,
    codeSnippets: [],
    relatedWeeks: ALL_WEEKS,
    tags: ["packages", "dependencies", "flutter_bloc", "dio", "go_router", "hive", "sqflite", "testing"],
    difficulty: "beginner",
  },

  // ─── USEFUL COMMANDS ────────────────────────────────────────────────
  {
    id: "cs-useful-commands",
    title: "Useful Commands",
    category: "cheat-sheet",
    summary: "Flutter and Dart CLI commands for project management, code generation, building, and diagnostics.",
    content: `Essential CLI commands for Flutter development: project creation, dependency management, code generation, building, testing, and diagnostics.`,
    codeSnippets: [
      {
        id: "cs-flutter-cli-commands",
        language: "bash",
        label: "Flutter & Dart CLI Commands",
        code: `# Project
flutter create my_app
flutter pub get
flutter pub upgrade
flutter pub outdated

# Code generation
dart run build_runner build --delete-conflicting-outputs
dart run build_runner watch

# Run & build
flutter run
flutter run --release
flutter build apk --split-per-abi
flutter build appbundle
flutter build ipa
flutter build web

# Diagnostics
flutter doctor
flutter analyze
flutter test
flutter test --coverage

# Clean
flutter clean && flutter pub get`,
      },
    ],
    relatedWeeks: ALL_WEEKS,
    tags: ["commands", "CLI", "flutter create", "pub get", "build_runner", "flutter analyze", "flutter test"],
    difficulty: "beginner",
  },

  // ─── QUICK CHECKLIST ────────────────────────────────────────────────
  {
    id: "cs-quick-checklist",
    title: "Quick Checklist",
    category: "cheat-sheet",
    summary: "Essential Flutter best practices: const, ListView.builder, Keys, dispose, and performance tips.",
    content: `- [ ] \`const\` on all widgets that don't change → fewer rebuilds
- [ ] \`ListView.builder\` not \`ListView\` for long lists
- [ ] \`Key\` on dynamic list items (\`ValueKey(item.id)\`)
- [ ] \`dispose()\` controllers, streams, animations
- [ ] \`BlocBuilder\` with \`buildWhen\` to minimize rebuilds
- [ ] Sealed classes for exhaustive state handling
- [ ] \`Either\` for all repo methods → no silent failures
- [ ] \`flutter_secure_storage\` for tokens, never \`SharedPreferences\`
- [ ] \`const\` constructors for Theme colors & text styles
- [ ] \`RepaintBoundary\` around expensive custom paint widgets
- [ ] \`compute()\` for heavy sync operations (JSON parsing, image processing)
- [ ] PRO TIP: Run \`flutter analyze\` before every commit`,
    codeSnippets: [],
    relatedWeeks: ALL_WEEKS,
    tags: ["checklist", "best practices", "performance", "const", "ListView.builder", "dispose", "analyze"],
    difficulty: "beginner",
  },
];
