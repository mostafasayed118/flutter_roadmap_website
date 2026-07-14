import type { DocEntry } from "./types";

export const flutterDocs: DocEntry[] = [
  {
    id: "flutter-what-is-flutter",
    title: "What is Flutter?",
    category: "flutter",
    summary:
      "Flutter is Google's open-source UI SDK for building natively compiled apps for mobile, web, desktop, and embedded from a single Dart codebase.",
    content: `Flutter is Google's open-source UI software development kit for building natively compiled, beautifully designed applications for **mobile, web, desktop, and embedded** platforms — all from a **single codebase** written in Dart.\n\nFlutter widgets are built using a modern framework inspired by React. Everything is a widget. Widgets describe what their view should look like given the current configuration and state.`,
    codeSnippets: [],
    relatedWeeks: [5, 6],
    tags: ["flutter", "dart", "cross-platform", "ui", "sdk", "google"],
    difficulty: "beginner",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-getting-started-quick-setup",
    title: "Getting Started > Quick Setup Options",
    category: "flutter",
    summary:
      "Multiple ways to start using Flutter: VS Code Quick Start, Custom Setup with full SDK, or try it online via DartPad.",
    content: `| Method | Description |\n|--------|-------------|\n| **VS Code Quick Start** | Fastest setup using VS Code / Code OSS-based editor |\n| **Custom Setup** | Full Flutter SDK installation with manual platform config |\n| **Online** | Try Flutter on the web via DartPad (no local install needed) |`,
    codeSnippets: [],
    relatedWeeks: [5, 6],
    tags: ["setup", "installation", "vs-code", "dartpad", "quick-start"],
    difficulty: "beginner",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-getting-started-installation",
    title: "Getting Started > Installation",
    category: "flutter",
    summary:
      "Step-by-step guide to download the Flutter SDK, add it to PATH, verify installation with flutter doctor, and create your first project.",
    content: `### Installation (Custom)`,
    codeSnippets: [
      {
        id: "flutter-installation-setup",
        language: "bash",
        label: "Flutter SDK Installation & First Project",
        code: `# 1. Download the Flutter SDK from docs.flutter.dev/install
# 2. Add flutter/bin to your PATH
export PATH="$PATH:/path/to/flutter/bin"

# 3. Verify installation
flutter doctor

# 4. Create a new project
flutter create my_app
cd my_app
flutter run`,
      },
    ],
    relatedWeeks: [5, 6],
    tags: ["installation", "flutter-sdk", "path", "flutter-doctor", "setup"],
    difficulty: "beginner",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-getting-started-channels",
    title: "Getting Started > Flutter Channels",
    category: "flutter",
    summary:
      "Flutter release channels: stable for production, beta for pre-release features, and main for the latest commits.",
    content: `### Flutter Channels\n\n| Channel | Description |\n|---------|-------------|\n| **stable** | Most stable builds — recommended for production |\n| **beta** | Pre-release features, more frequent updates |\n| **main** | Latest commits, may be unstable |`,
    codeSnippets: [],
    relatedWeeks: [5, 6],
    tags: ["stable", "beta", "main", "channels", "releases", "versions"],
    difficulty: "beginner",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-architecture-widgets",
    title: "Flutter Architecture: Widgets",
    category: "flutter",
    summary:
      "Everything in Flutter is a widget. StatelessWidget is immutable; StatefulWidget maintains mutable state. The layout rule: constraints flow down, sizes flow up, parents set positions.",
    content: `> "In Flutter, everything is a widget."\n\n### Widget Tree Concept\n\n### StatelessWidget vs StatefulWidget\n\n### Layout Rule\n> **"Constraints flow down. Sizes flow up. Parents set positions."**`,
    codeSnippets: [
      {
        id: "flutter-widgets-tree-concept",
        language: "dart",
        label: "Widget Tree Structure",
        code: `MaterialApp
  └── Scaffold
        ├── AppBar
        │     └── Text("Title")
        └── Body
              └── Column
                    ├── Text("Hello")
                    └── ElevatedButton`,
      },
      {
        id: "flutter-widgets-stateless-stateful",
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
    relatedWeeks: [5, 6],
    tags: [
      "widgets",
      "stateless",
      "stateful",
      "widget-tree",
      "build",
      "setState",
    ],
    difficulty: "beginner",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-widget-catalog-design-systems",
    title: "Widget Catalog > Design Systems",
    category: "flutter",
    summary:
      "Flutter provides two design system widget sets: Material Components for Android/cross-platform and Cupertino for iOS-style UI.",
    content: `### Design Systems\n\n#### Material Components (Android/Cross-platform)\n- \`MaterialApp\`, \`Scaffold\`, \`AppBar\`\n- \`ElevatedButton\`, \`TextButton\`, \`OutlinedButton\`, \`FloatingActionButton\`\n- \`TextField\`, \`Form\`, \`DropdownButton\`\n- \`ListView\`, \`GridView\`, \`Card\`, \`Chip\`\n- \`Dialog\`, \`SnackBar\`, \`BottomSheet\`\n- \`NavigationBar\`, \`NavigationRail\`, \`Drawer\`\n- \`ThemeData\`, \`ColorScheme\` (Material 3)\n\n#### Cupertino (iOS-style)\n- \`CupertinoApp\`, \`CupertinoPageScaffold\`\n- \`CupertinoButton\`, \`CupertinoTextField\`\n- \`CupertinoNavigationBar\`, \`CupertinoTabBar\`\n- \`CupertinoAlertDialog\`, \`CupertinoActionSheet\``,
    codeSnippets: [],
    relatedWeeks: [5, 6],
    tags: [
      "material",
      "cupertino",
      "design-system",
      "material-3",
      "ios",
      "android",
    ],
    difficulty: "beginner",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-widget-catalog-categories",
    title: "Widget Catalog > Base Widget Categories",
    category: "flutter",
    summary:
      "Flutter widgets organized by category: Layout, Scrolling, Input, Interaction, Animation, Async, Text, Assets, Painting, and Accessibility.",
    content: `### Base Widget Categories\n\n| Category | Key Widgets |\n|----------|-------------|\n| **Layout** | \`Row\`, \`Column\`, \`Stack\`, \`Flex\`, \`Wrap\`, \`Expanded\`, \`SizedBox\`, \`Container\`, \`Padding\`, \`Center\`, \`Align\` |\n| **Scrolling** | \`ListView\`, \`GridView\`, \`SingleChildScrollView\`, \`CustomScrollView\`, \`Sliver*\` |\n| **Input** | \`TextField\`, \`Checkbox\`, \`Radio\`, \`Switch\`, \`Slider\`, \`Form\` |\n| **Interaction** | \`GestureDetector\`, \`InkWell\`, \`Dismissible\`, \`Draggable\` |\n| **Animation** | \`AnimatedContainer\`, \`AnimatedOpacity\`, \`Hero\`, \`AnimationController\` |\n| **Async** | \`FutureBuilder\`, \`StreamBuilder\` |\n| **Text** | \`Text\`, \`RichText\`, \`DefaultTextStyle\` |\n| **Assets** | \`Image\`, \`Icon\`, \`AssetImage\`, \`NetworkImage\` |\n| **Painting** | \`CustomPaint\`, \`ClipRRect\`, \`DecoratedBox\`, \`BackdropFilter\` |\n| **Accessibility** | \`Semantics\`, \`MergeSemantics\`, \`ExcludeSemantics\` |`,
    codeSnippets: [],
    relatedWeeks: [5, 6],
    tags: [
      "layout",
      "scrolling",
      "input",
      "animation",
      "async",
      "text",
      "assets",
      "widget-catalog",
    ],
    difficulty: "beginner",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-layout-common-widgets",
    title: "Layout System > Common Layout Widgets",
    category: "flutter",
    summary:
      "Row, Column, Stack, Container, and Expanded are the fundamental layout widgets for building Flutter UIs.",
    content: `### Common Layout Widgets`,
    codeSnippets: [
      {
        id: "flutter-layout-row-column-stack-container",
        language: "dart",
        label: "Row, Column, Stack, Container & Expanded",
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

// Container — flexible box
Container(
  width: 200,
  height: 100,
  padding: const EdgeInsets.all(16),
  margin: const EdgeInsets.symmetric(vertical: 8),
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(12),
    boxShadow: [BoxShadow(blurRadius: 4)],
  ),
  child: Text('Hello'),
)

// Expanded — fills available space
Row(children: [
  Expanded(flex: 2, child: WidgetA()),
  Expanded(flex: 1, child: WidgetB()),
])`,
      },
    ],
    relatedWeeks: [6, 7],
    tags: [
      "row",
      "column",
      "stack",
      "container",
      "expanded",
      "flex",
      "layout",
    ],
    difficulty: "beginner",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-layout-scrolling-slivers",
    title: "Layout System > Scrolling & Slivers",
    category: "flutter",
    summary:
      "ListView.builder, GridView.builder, and CustomScrollView with Slivers provide efficient scrolling for large or complex lists.",
    content: `### Scrolling & Slivers`,
    codeSnippets: [
      {
        id: "flutter-layout-listview-gridview-slivers",
        language: "dart",
        label: "ListView, GridView & CustomScrollView with Slivers",
        code: `// Basic ListView
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) => ListTile(title: Text(items[index])),
)

// GridView
GridView.builder(
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,
    childAspectRatio: 1.5,
  ),
  itemBuilder: (context, index) => Card(...),
)

// CustomScrollView with Slivers
CustomScrollView(
  slivers: [
    SliverAppBar(expandedHeight: 200, floating: true, pinned: true),
    SliverList(delegate: SliverChildBuilderDelegate(...)),
    SliverGrid(delegate: ..., gridDelegate: ...),
  ],
)`,
      },
    ],
    relatedWeeks: [6, 7],
    tags: [
      "listview",
      "gridview",
      "sliver",
      "customscrollview",
      "scrolling",
      "sliverappbar",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-navigation-go-router",
    title: "Navigation & Routing > go_router",
    category: "flutter",
    summary:
      "go_router is the official Flutter team package for URL-based routing with deep linking, ShellRoute for nested navigation, and path parameters.",
    content: `### go_router (Recommended — Official Flutter team package)`,
    codeSnippets: [
      {
        id: "flutter-navigation-go-router-pubspec",
        language: "yaml",
        label: "go_router Dependency",
        code: `# pubspec.yaml
dependencies:
  go_router: ^14.0.0`,
      },
      {
        id: "flutter-navigation-go-router-setup",
        language: "dart",
        label: "go_router Configuration & Usage",
        code: `import 'package:go_router/go_router.dart';

final GoRouter _router = GoRouter(
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

// Usage
context.go('/details/42');
context.push('/settings');
context.pop();`,
      },
    ],
    relatedWeeks: [7, 8],
    tags: [
      "go_router",
      "routing",
      "navigation",
      "go-route",
      "shell-route",
      "deep-linking",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-navigation-navigator-1",
    title: "Navigation & Routing > Navigator 1.0",
    category: "flutter",
    summary:
      "Navigator 1.0 provides basic imperative navigation with push, pop, and named routes for simpler use cases.",
    content: `### Navigator 1.0 (Basic)`,
    codeSnippets: [
      {
        id: "flutter-navigation-navigator-push-pop",
        language: "dart",
        label: "Navigator Push, Pop & Named Routes",
        code: `// Push
Navigator.push(context, MaterialPageRoute(builder: (_) => DetailsPage()));

// Push with data
Navigator.push(context, MaterialPageRoute(
  builder: (_) => DetailsPage(data: myData),
));

// Pop with result
Navigator.pop(context, 'result');

// Named routes
Navigator.pushNamed(context, '/details', arguments: {'id': 42});`,
      },
    ],
    relatedWeeks: [7, 8],
    tags: [
      "navigator",
      "push",
      "pop",
      "named-routes",
      "navigation",
      "imperative",
    ],
    difficulty: "beginner",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-state-management-types",
    title: "State Management > Types of State",
    category: "flutter",
    summary:
      "Flutter distinguishes between Ephemeral (UI) State which is local to a widget and App State which is shared across multiple widgets.",
    content: `### Types of State\n\n| Type | Description | Example |\n|------|-------------|---------|\n| **Ephemeral (UI) State** | Local to a widget, short-lived | \`_isExpanded\`, \`_tabIndex\` |\n| **App State** | Shared across multiple widgets | User session, cart, theme |`,
    codeSnippets: [],
    relatedWeeks: [8, 9],
    tags: [
      "ephemeral",
      "app-state",
      "ui-state",
      "state",
      "local-state",
    ],
    difficulty: "beginner",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-state-management-setstate",
    title: "State Management > setState",
    category: "flutter",
    summary:
      "setState is Flutter's built-in method for updating local widget state, triggering a rebuild of the widget tree.",
    content: `### Built-in: setState`,
    codeSnippets: [
      {
        id: "flutter-state-management-setstate-basic",
        language: "dart",
        label: "setState Usage",
        code: `setState(() {
  _count++;
});`,
      },
    ],
    relatedWeeks: [8, 9],
    tags: ["setstate", "mutable-state", "state", "basic", "local"],
    difficulty: "beginner",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-state-management-provider",
    title: "State Management > Provider",
    category: "flutter",
    summary:
      "Provider uses ChangeNotifier to manage app state with a define-provide-consume pattern. Use Consumer or context extensions to access state.",
    content: `### Provider (Simple App State)`,
    codeSnippets: [
      {
        id: "flutter-state-management-provider-pattern",
        language: "dart",
        label: "Provider: ChangeNotifier, Provide & Consume",
        code: `// 1. Define a ChangeNotifier
class CounterModel extends ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
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

// Or with context.watch
context.watch<CounterModel>().count
context.read<CounterModel>().increment()`,
      },
    ],
    relatedWeeks: [8, 9],
    tags: [
      "provider",
      "change-notifier",
      "consumer",
      "state-management",
      "context",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-state-management-options",
    title: "State Management > Options",
    category: "flutter",
    summary:
      "Comparison of state management packages: setState, Provider, Riverpod, flutter_bloc, GetX, and MobX for different use cases.",
    content: `### State Management Options\n\n| Package | Use Case |\n|---------|----------|\n| \`setState\` | Simple local state |\n| \`Provider\` | Lightweight, beginner-friendly |\n| \`Riverpod\` | Advanced, compile-safe, testable |\n| \`flutter_bloc\` | Event-driven, scalable, enterprise |\n| \`GetX\` | All-in-one (state + routing + DI) |\n| \`MobX\` | Reactive, observable state |`,
    codeSnippets: [],
    relatedWeeks: [8, 9],
    tags: [
      "riverpod",
      "bloc",
      "getx",
      "mobx",
      "provider",
      "comparison",
      "state-management",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-networking-http",
    title: "Networking > http package",
    category: "flutter",
    summary:
      "The http package provides a simple way to make HTTP GET, POST, PUT, DELETE requests and handle JSON responses in Flutter.",
    content: `### http package (Simple)`,
    codeSnippets: [
      {
        id: "flutter-networking-http-fetch",
        language: "dart",
        label: "HTTP GET Request with jsonDecode",
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
}`,
      },
    ],
    relatedWeeks: [14, 15, 16],
    tags: ["http", "api", "rest", "get", "networking", "json"],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-networking-dio",
    title: "Networking > Dio",
    category: "flutter",
    summary:
      "Dio is an advanced HTTP client with interceptors, file upload/download, request cancellation, and custom configuration.",
    content: `### Dio (Advanced — See packages doc)\n\nFor advanced HTTP features like interceptors, file upload/download, and request cancellation, use the **Dio** package.`,
    codeSnippets: [],
    relatedWeeks: [14, 15, 16],
    tags: ["dio", "http-client", "networking", "advanced", "interceptors"],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-networking-json",
    title: "Networking > JSON Serialization",
    category: "flutter",
    summary:
      "JSON serialization in Flutter can be done manually with fromJson/toJson factories or automated with json_serializable and build_runner.",
    content: `### JSON Serialization`,
    codeSnippets: [
      {
        id: "flutter-networking-json-serialization",
        language: "dart",
        label: "Manual & json_serializable JSON Serialization",
        code: `// Manual
class User {
  final String name;
  final int age;

  User({required this.name, required this.age});

  factory User.fromJson(Map<String, dynamic> json) => User(
        name: json['name'] as String,
        age: json['age'] as int,
      );

  Map<String, dynamic> toJson() => {'name': name, 'age': age};
}

// With json_serializable + build_runner
@JsonSerializable()
class User {
  final String name;
  final int age;

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}`,
      },
    ],
    relatedWeeks: [14, 15, 16],
    tags: [
      "json",
      "serialization",
      "fromJson",
      "toJson",
      "build-runner",
      "json_serializable",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-networking-future-stream",
    title: "Networking > FutureBuilder & StreamBuilder",
    category: "flutter",
    summary:
      "FutureBuilder and StreamBuilder rebuild UI automatically when async data completes or a stream emits new values.",
    content: `### FutureBuilder & StreamBuilder`,
    codeSnippets: [
      {
        id: "flutter-networking-future-builder",
        language: "dart",
        label: "FutureBuilder with Loading, Error & Data States",
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
    relatedWeeks: [14, 15, 16],
    tags: [
      "futurebuilder",
      "streambuilder",
      "async",
      "snapshot",
      "stream",
      "future",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-animations-implicit",
    title: "Animations > Implicit Animations",
    category: "flutter",
    summary:
      "Implicit animations like AnimatedContainer and AnimatedOpacity automatically animate property changes over a specified duration.",
    content: `### Implicit Animations (Simple)`,
    codeSnippets: [
      {
        id: "flutter-animations-implicit-container-opacity",
        language: "dart",
        label: "AnimatedContainer & AnimatedOpacity",
        code: `AnimatedContainer(
  duration: const Duration(milliseconds: 300),
  curve: Curves.easeInOut,
  width: _expanded ? 200 : 100,
  color: _expanded ? Colors.blue : Colors.red,
)

AnimatedOpacity(
  opacity: _visible ? 1.0 : 0.0,
  duration: const Duration(milliseconds: 500),
  child: MyWidget(),
)`,
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: [
      "animated",
      "implicit",
      "animation",
      "duration",
      "curve",
      "container",
      "opacity",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-animations-explicit",
    title: "Animations > Explicit Animations",
    category: "flutter",
    summary:
      "Explicit animations use AnimationController with SingleTickerProviderStateMixin for full control over animation timing, repetition, and disposal.",
    content: `### Explicit Animations`,
    codeSnippets: [
      {
        id: "flutter-animations-explicit-controller",
        language: "dart",
        label: "AnimationController with RotationTransition",
        code: `class SpinningWidget extends StatefulWidget { ... }

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
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}`,
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: [
      "animation-controller",
      "explicit",
      "tween",
      "rotation",
      "ticker",
      "single-ticker",
    ],
    difficulty: "advanced",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-animations-hero",
    title: "Animations > Hero",
    category: "flutter",
    summary:
      "Hero animations create shared element transitions between routes using matching tags on source and destination screens.",
    content: `### Hero Animations`,
    codeSnippets: [
      {
        id: "flutter-animations-hero-source-destination",
        language: "dart",
        label: "Hero Animation Source & Destination Screens",
        code: `// Source screen
Hero(
  tag: 'hero-image-\${item.id}',
  child: Image.network(item.imageUrl),
)

// Destination screen (same tag)
Hero(
  tag: 'hero-image-\${item.id}',
  child: Image.network(item.imageUrl, fit: BoxFit.cover),
)`,
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: [
      "hero",
      "animation",
      "transition",
      "shared-element",
      "route-transition",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-persistence-shared-preferences",
    title: "Persistence > shared_preferences",
    category: "flutter",
    summary:
      "shared_preferences provides a simple key-value storage API for persisting small amounts of data like user settings.",
    content: `### shared_preferences (Key-Value)`,
    codeSnippets: [
      {
        id: "flutter-persistence-shared-preferences-usage",
        language: "dart",
        label: "SharedPreferences Set, Get & Default",
        code: `final prefs = await SharedPreferences.getInstance();
await prefs.setString('username', 'mustafa');
final name = prefs.getString('username') ?? 'Guest';`,
      },
    ],
    relatedWeeks: [17, 18],
    tags: [
      "shared-preferences",
      "key-value",
      "storage",
      "persistence",
      "settings",
    ],
    difficulty: "beginner",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-persistence-sqflite",
    title: "Persistence > sqflite",
    category: "flutter",
    summary:
      "sqflite provides SQLite database access for structured data storage with SQL queries, table creation, insert, and query operations.",
    content: `### sqflite (SQLite)`,
    codeSnippets: [
      {
        id: "flutter-persistence-sqflite-database",
        language: "dart",
        label: "sqflite Database Create, Insert & Query",
        code: `final db = await openDatabase('app.db', version: 1,
  onCreate: (db, version) {
    return db.execute('CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT)');
  },
);

await db.insert('items', {'name': 'Task 1'});
final List<Map<String, dynamic>> rows = await db.query('items');`,
      },
    ],
    relatedWeeks: [17, 18],
    tags: ["sqflite", "sqlite", "database", "sql", "persistence", "query"],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-persistence-hive",
    title: "Persistence > Hive",
    category: "flutter",
    summary:
      "Hive is a fast, lightweight NoSQL database for Flutter with key-value storage and optional encryption support.",
    content: `### Hive (Fast NoSQL)`,
    codeSnippets: [
      {
        id: "flutter-persistence-hive-usage",
        language: "dart",
        label: "Hive Init, Open Box, Put & Get",
        code: `await Hive.initFlutter();
final box = await Hive.openBox('settings');
box.put('darkMode', true);
final darkMode = box.get('darkMode', defaultValue: false);`,
      },
    ],
    relatedWeeks: [17, 18],
    tags: ["hive", "nosql", "key-value", "fast", "persistence", "box"],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-adaptive-responsive",
    title: "Adaptive & Responsive Design",
    category: "flutter",
    summary:
      "Build responsive layouts using MediaQuery, LayoutBuilder, SafeArea, and breakpoint logic for mobile, tablet, and desktop.",
    content: `## Adaptive & Responsive Design`,
    codeSnippets: [
      {
        id: "flutter-adaptive-mediaquery-layoutbuilder",
        language: "dart",
        label: "MediaQuery, LayoutBuilder, SafeArea & Breakpoints",
        code: `// MediaQuery
final size = MediaQuery.of(context).size;
final screenWidth = size.width;

// LayoutBuilder
LayoutBuilder(
  builder: (context, constraints) {
    if (constraints.maxWidth > 600) {
      return WideLayout();
    }
    return NarrowLayout();
  },
)

// SafeArea
SafeArea(
  child: Scaffold(...),
)

// Breakpoints (example)
bool get isMobile => screenWidth < 600;
bool get isTablet => screenWidth >= 600 && screenWidth < 1200;
bool get isDesktop => screenWidth >= 1200;`,
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: [
      "responsive",
      "adaptive",
      "mediaquery",
      "layoutbuilder",
      "breakpoints",
      "safe-area",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-accessibility",
    title: "Accessibility",
    category: "flutter",
    summary:
      "Make Flutter apps accessible with Semantics widgets, semantic labels, color contrast, dynamic font sizes, and screen reader testing.",
    content: `## Accessibility\n\nKey practices:\n- Always provide semantic labels for images and icons\n- Use sufficient color contrast ratios\n- Support dynamic font sizes via \`TextScaler\`\n- Test with TalkBack (Android) and VoiceOver (iOS)`,
    codeSnippets: [
      {
        id: "flutter-accessibility-semantics",
        language: "dart",
        label: "Semantics Widget for Screen Readers",
        code: `Semantics(
  label: 'Submit form button',
  button: true,
  child: ElevatedButton(
    onPressed: onSubmit,
    child: const Text('Submit'),
  ),
)`,
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: [
      "accessibility",
      "a11y",
      "semantics",
      "talkback",
      "voiceover",
      "screen-reader",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-internationalization",
    title: "Internationalization (i18n)",
    category: "flutter",
    summary:
      "Set up internationalization with flutter_localizations, intl package, AppLocalizations delegates, and supported locales.",
    content: `## Internationalization (i18n)`,
    codeSnippets: [
      {
        id: "flutter-i18n-pubspec",
        language: "yaml",
        label: "i18n Dependencies in pubspec.yaml",
        code: `# pubspec.yaml
dependencies:
  flutter_localizations:
    sdk: flutter
  intl: any

flutter:
  generate: true`,
      },
      {
        id: "flutter-i18n-material-app",
        language: "dart",
        label: "MaterialApp Localization & Usage",
        code: `// MaterialApp
MaterialApp(
  localizationsDelegates: AppLocalizations.localizationsDelegates,
  supportedLocales: AppLocalizations.supportedLocales,
)

// Usage
Text(AppLocalizations.of(context)!.helloWorld)`,
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: [
      "i18n",
      "localization",
      "intl",
      "translations",
      "multi-language",
      "locales",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-theming",
    title: "Theming",
    category: "flutter",
    summary:
      "Configure ThemeData with Material 3, ColorScheme.fromSeed, custom text themes, and dark mode support using ThemeMode.",
    content: `## Theming`,
    codeSnippets: [
      {
        id: "flutter-theming-material3",
        language: "dart",
        label: "Material 3 ThemeData & Dark Mode",
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
    relatedWeeks: [19, 20, 21, 22],
    tags: [
      "theme",
      "material-3",
      "colorscheme",
      "dark-mode",
      "design",
      "themedata",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-assets-images",
    title: "Assets & Images",
    category: "flutter",
    summary:
      "Configure assets, fonts, and images in pubspec.yaml, then load them with Image.asset, Image.network, or CachedNetworkImage.",
    content: `## Assets & Images`,
    codeSnippets: [
      {
        id: "flutter-assets-pubspec",
        language: "yaml",
        label: "Assets & Fonts Configuration in pubspec.yaml",
        code: `# pubspec.yaml
flutter:
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
        id: "flutter-assets-image-loading",
        language: "dart",
        label: "Image.asset, Image.network & CachedNetworkImage",
        code: `// Load asset image
Image.asset('assets/images/logo.png')

// Load from network
Image.network('https://example.com/image.jpg')

// Cached network image (package)
CachedNetworkImage(imageUrl: url, placeholder: (_, __) => CircularProgressIndicator())`,
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: [
      "assets",
      "images",
      "fonts",
      "network-image",
      "cached-network-image",
      "pubspec",
    ],
    difficulty: "beginner",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-devtools",
    title: "DevTools",
    category: "flutter",
    summary:
      "Flutter DevTools suite includes Widget Inspector, Performance, CPU Profiler, Memory, Network, Logging, and Layout Explorer for debugging.",
    content: `## DevTools\n\nFlutter DevTools is a suite of performance and debugging tools:\n\n| Tool | Purpose |\n|------|---------|\n| **Widget Inspector** | Visualize widget tree and properties |\n| **Performance** | Frame rendering, jank detection |\n| **CPU Profiler** | Identify slow code |\n| **Memory** | Track memory usage and leaks |\n| **Network** | Monitor HTTP requests |\n| **Logging** | View print statements and errors |\n| **Layout Explorer** | Debug layout constraints |`,
    codeSnippets: [
      {
        id: "flutter-devtools-launch",
        language: "bash",
        label: "Launch DevTools",
        code: `# Launch DevTools
flutter run --debug
# Then open link printed in terminal, or:
dart devtools`,
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: [
      "devtools",
      "debugging",
      "performance",
      "inspector",
      "profiler",
      "layout-explorer",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-testing",
    title: "Testing",
    category: "flutter",
    summary:
      "Flutter supports unit tests for logic, widget tests for UI components, and integration tests for full app flows.",
    content: `## Testing`,
    codeSnippets: [
      {
        id: "flutter-testing-unit-widget-integration",
        language: "dart",
        label: "Unit, Widget & Integration Test Patterns",
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
});

// Integration test
// test_driver/integration_test.dart`,
      },
    ],
    relatedWeeks: [26, 27],
    tags: [
      "testing",
      "unit-test",
      "widget-test",
      "integration-test",
      "test",
      "tdd",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-cli-commands",
    title: "Useful CLI Commands",
    category: "flutter",
    summary:
      "Essential Flutter CLI commands for creating projects, running apps, building for platforms, managing dependencies, and code analysis.",
    content: `## Useful CLI Commands`,
    codeSnippets: [
      {
        id: "flutter-cli-all-commands",
        language: "bash",
        label: "Flutter CLI Commands Reference",
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
flutter test                     # Run tests
flutter gen-l10n                 # Generate localization files`,
      },
    ],
    relatedWeeks: [26, 27],
    tags: [
      "cli",
      "commands",
      "flutter-run",
      "build",
      "pub",
      "doctor",
      "create",
    ],
    difficulty: "beginner",
    sourceUrl: "https://flutter.dev",
  },
  {
    id: "flutter-key-docs-links",
    title: "Key Docs Links",
    category: "flutter",
    summary:
      "Official Flutter documentation links covering main docs, widget catalog, API reference, cookbook, learning pathway, and migration guides.",
    content: `## Key Docs Links\n\n| Topic | URL |\n|-------|-----|\n| Main Docs | https://docs.flutter.dev |\n| Widget Catalog | https://docs.flutter.dev/ui/widgets |\n| API Reference | https://api.flutter.dev |\n| Cookbook | https://docs.flutter.dev/cookbook |\n| Learning Pathway | https://docs.flutter.dev/get-started/fundamentals |\n| Migration Guides | https://docs.flutter.dev/release/breaking-changes |\n| What's New | https://docs.flutter.dev/release/whats-new |`,
    codeSnippets: [],
    relatedWeeks: [5, 6, 7, 8, 9],
    tags: ["docs", "links", "api", "cookbook", "migration", "official"],
    difficulty: "beginner",
    sourceUrl: "https://flutter.dev",
  },
];
