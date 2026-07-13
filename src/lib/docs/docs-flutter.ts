import type { DocEntry } from "./types";

export const flutterDocs: DocEntry[] = [
  {
    id: "flutter-widgets",
    title: "Widgets & Architecture",
    category: "flutter",
    summary:
      "Everything is a widget — StatelessWidget, StatefulWidget, and the widget tree.",
    content: `In Flutter, **everything is a widget**. Widgets describe what their view should look like given the current configuration and state. **StatelessWidget** is immutable; **StatefulWidget** maintains mutable state via \`setState()\`. The layout rule: **"Constraints flow down. Sizes flow up. Parents set positions."**`,
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
    relatedWeeks: [5, 6],
    tags: [
      "widgets",
      "StatelessWidget",
      "StatefulWidget",
      "widget tree",
      "build",
      "setState",
    ],
    difficulty: "beginner",
  },
  {
    id: "flutter-layout",
    title: "Layout System",
    category: "flutter",
    summary:
      "Row, Column, Stack, Container, Expanded, ListView, GridView, and Slivers.",
    content: `Flutter's layout uses **Row** (horizontal), **Column** (vertical), **Stack** (overlapping), **Container** (flexible box), and **Expanded** (fills available space). For scrolling, use **ListView.builder**, **GridView**, and **CustomScrollView** with **Slivers**.`,
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
    relatedWeeks: [5, 6, 7],
    tags: [
      "layout",
      "Row",
      "Column",
      "Stack",
      "Container",
      "Expanded",
      "ListView",
      "GridView",
      "Slivers",
    ],
    difficulty: "beginner",
  },
  {
    id: "flutter-navigation",
    title: "Navigation & Routing",
    category: "flutter",
    summary:
      "go_router for URL-based routing, deep linking, ShellRoute, and redirect guards.",
    content: `The recommended approach is **go_router** — the official Flutter team package. It provides URL-based routing, deep linking, nested navigation with **ShellRoute**, redirect guards, and path/query parameters. Navigator 1.0 is still available for simpler use cases.`,
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
    relatedWeeks: [7, 8],
    tags: [
      "navigation",
      "routing",
      "go_router",
      "deep linking",
      "ShellRoute",
      "Navigator",
    ],
    difficulty: "intermediate",
  },
  {
    id: "flutter-networking",
    title: "Networking & JSON",
    category: "flutter",
    summary:
      "HTTP requests, JSON serialization, FutureBuilder, and StreamBuilder.",
    content: `For HTTP requests, use the **http** package for simple calls or **Dio** for advanced features (interceptors, file upload/download). JSON serialization can be done manually with \`fromJson\`/\`toJson\` or automated with **json_serializable** + **build_runner**.`,
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
    relatedWeeks: [14, 15, 16],
    tags: [
      "networking",
      "HTTP",
      "JSON",
      "serialization",
      "FutureBuilder",
      "StreamBuilder",
      "API",
    ],
    difficulty: "intermediate",
  },
  {
    id: "flutter-animations",
    title: "Animations",
    category: "flutter",
    summary:
      "Implicit animations, explicit AnimationController, and Hero transitions.",
    content: `Flutter offers **implicit animations** (AnimatedContainer, AnimatedOpacity) for simple property transitions, **explicit animations** (AnimationController) for full control, and **Hero animations** for shared element transitions between routes.`,
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
    relatedWeeks: [8, 9],
    tags: [
      "animations",
      "implicit",
      "explicit",
      "AnimationController",
      "Hero",
      "transitions",
    ],
    difficulty: "advanced",
  },
  {
    id: "flutter-state-management",
    title: "State Management",
    category: "flutter",
    summary:
      "setState, Provider, Riverpod, Bloc, GetX, and MobX — choosing the right approach.",
    content: `Flutter offers multiple state management options: **setState** (local), **Provider** (lightweight), **Riverpod** (compile-safe), **flutter_bloc** (event-driven, scalable), **GetX** (all-in-one), and **MobX** (reactive). Choose based on app complexity and team preference.`,
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
    relatedWeeks: [10, 11, 12, 13],
    tags: [
      "state management",
      "Provider",
      "Riverpod",
      "setState",
      "MobX",
      "GetX",
    ],
    difficulty: "intermediate",
  },
  {
    id: "flutter-theming",
    title: "Theming & Material 3",
    category: "flutter",
    summary:
      "ThemeData, Material 3, colorScheme, dark mode, and dynamic theming.",
    content: `Use \`ThemeData\` with **Material 3** enabled for modern design. Access theme values via \`Theme.of(context).colorScheme\` and \`Theme.of(context).textTheme\`. Support dark mode with \`darkTheme\` and \`themeMode: ThemeMode.system\`.`,
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
    relatedWeeks: [8, 9],
    tags: [
      "theming",
      "Material 3",
      "dark mode",
      "colorScheme",
      "ThemeData",
      "design",
    ],
    difficulty: "intermediate",
  },
  {
    id: "flutter-testing",
    title: "Testing",
    category: "flutter",
    summary:
      "Unit tests, widget tests, integration tests, and the test package.",
    content: `Flutter supports **unit tests** (logic), **widget tests** (UI components), and **integration tests** (full app flows). Use \`test\` package for unit/widget tests and \`integration_test\` package for end-to-end testing.`,
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
    relatedWeeks: [26, 27],
    tags: [
      "testing",
      "unit test",
      "widget test",
      "integration test",
      "TDD",
      "test package",
    ],
    difficulty: "intermediate",
  },
  {
    id: "flutter-cli",
    title: "CLI Commands",
    category: "flutter",
    summary:
      "Essential Flutter CLI commands for project management, building, and testing.",
    content: `Essential Flutter CLI commands for creating projects, running apps, building for different platforms, managing dependencies, and running tests.`,
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
    relatedWeeks: [5, 31, 32],
    tags: ["CLI", "commands", "build", "run", "flutter create", "flutter run"],
    difficulty: "beginner",
  },
];
