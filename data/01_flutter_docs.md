# Flutter Documentation
> Source: https://docs.flutter.dev | Version: Flutter 3.44.0

---

## What is Flutter?

Flutter is Google's open-source UI software development kit for building natively compiled, beautifully designed applications for **mobile, web, desktop, and embedded** platforms — all from a **single codebase** written in Dart.

Flutter widgets are built using a modern framework inspired by React. Everything is a widget. Widgets describe what their view should look like given the current configuration and state.

---

## Getting Started

### Quick Setup Options

| Method | Description |
|--------|-------------|
| **VS Code Quick Start** | Fastest setup using VS Code / Code OSS-based editor |
| **Custom Setup** | Full Flutter SDK installation with manual platform config |
| **Online** | Try Flutter on the web via DartPad (no local install needed) |

### Installation (Custom)

```bash
# 1. Download the Flutter SDK from docs.flutter.dev/install
# 2. Add flutter/bin to your PATH
export PATH="$PATH:/path/to/flutter/bin"

# 3. Verify installation
flutter doctor

# 4. Create a new project
flutter create my_app
cd my_app
flutter run
```

### Flutter Channels

| Channel | Description |
|---------|-------------|
| **stable** | Most stable builds — recommended for production |
| **beta** | Pre-release features, more frequent updates |
| **main** | Latest commits, may be unstable |

---

## Flutter Architecture: Widgets

> "In Flutter, everything is a widget."

### Widget Tree Concept

```
MaterialApp
  └── Scaffold
        ├── AppBar
        │     └── Text("Title")
        └── Body
              └── Column
                    ├── Text("Hello")
                    └── ElevatedButton
```

### StatelessWidget vs StatefulWidget

```dart
// StatelessWidget — no mutable state
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
      child: Text('Count: $_count'),
    );
  }
}
```

### Layout Rule
> **"Constraints flow down. Sizes flow up. Parents set positions."**

---

## Widget Catalog

### Design Systems

#### Material Components (Android/Cross-platform)
- `MaterialApp`, `Scaffold`, `AppBar`
- `ElevatedButton`, `TextButton`, `OutlinedButton`, `FloatingActionButton`
- `TextField`, `Form`, `DropdownButton`
- `ListView`, `GridView`, `Card`, `Chip`
- `Dialog`, `SnackBar`, `BottomSheet`
- `NavigationBar`, `NavigationRail`, `Drawer`
- `ThemeData`, `ColorScheme` (Material 3)

#### Cupertino (iOS-style)
- `CupertinoApp`, `CupertinoPageScaffold`
- `CupertinoButton`, `CupertinoTextField`
- `CupertinoNavigationBar`, `CupertinoTabBar`
- `CupertinoAlertDialog`, `CupertinoActionSheet`

### Base Widget Categories

| Category | Key Widgets |
|----------|-------------|
| **Layout** | `Row`, `Column`, `Stack`, `Flex`, `Wrap`, `Expanded`, `SizedBox`, `Container`, `Padding`, `Center`, `Align` |
| **Scrolling** | `ListView`, `GridView`, `SingleChildScrollView`, `CustomScrollView`, `Sliver*` |
| **Input** | `TextField`, `Checkbox`, `Radio`, `Switch`, `Slider`, `Form` |
| **Interaction** | `GestureDetector`, `InkWell`, `Dismissible`, `Draggable` |
| **Animation** | `AnimatedContainer`, `AnimatedOpacity`, `Hero`, `AnimationController` |
| **Async** | `FutureBuilder`, `StreamBuilder` |
| **Text** | `Text`, `RichText`, `DefaultTextStyle` |
| **Assets** | `Image`, `Icon`, `AssetImage`, `NetworkImage` |
| **Painting** | `CustomPaint`, `ClipRRect`, `DecoratedBox`, `BackdropFilter` |
| **Accessibility** | `Semantics`, `MergeSemantics`, `ExcludeSemantics` |

---

## Layout System

### Common Layout Widgets

```dart
// Row — horizontal layout
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
])
```

### Scrolling & Slivers

```dart
// Basic ListView
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
)
```

---

## Navigation & Routing

### go_router (Recommended — Official Flutter team package)

```yaml
# pubspec.yaml
dependencies:
  go_router: ^14.0.0
```

```dart
import 'package:go_router/go_router.dart';

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
context.pop();
```

### Navigator 1.0 (Basic)

```dart
// Push
Navigator.push(context, MaterialPageRoute(builder: (_) => DetailsPage()));

// Push with data
Navigator.push(context, MaterialPageRoute(
  builder: (_) => DetailsPage(data: myData),
));

// Pop with result
Navigator.pop(context, 'result');

// Named routes
Navigator.pushNamed(context, '/details', arguments: {'id': 42});
```

---

## State Management

### Types of State

| Type | Description | Example |
|------|-------------|---------|
| **Ephemeral (UI) State** | Local to a widget, short-lived | `_isExpanded`, `_tabIndex` |
| **App State** | Shared across multiple widgets | User session, cart, theme |

### Built-in: setState

```dart
setState(() {
  _count++;
});
```

### Provider (Simple App State)

```dart
// 1. Define a ChangeNotifier
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
  builder: (context, counter, _) => Text('${counter.count}'),
)

// Or with context.watch
context.watch<CounterModel>().count
context.read<CounterModel>().increment()
```

### State Management Options

| Package | Use Case |
|---------|----------|
| `setState` | Simple local state |
| `Provider` | Lightweight, beginner-friendly |
| `Riverpod` | Advanced, compile-safe, testable |
| `flutter_bloc` | Event-driven, scalable, enterprise |
| `GetX` | All-in-one (state + routing + DI) |
| `MobX` | Reactive, observable state |

---

## Networking & HTTP

### http package (Simple)

```dart
import 'package:http/http.dart' as http;
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
```

### Dio (Advanced — See packages doc)

### JSON Serialization

```dart
// Manual
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
}
```

### FutureBuilder & StreamBuilder

```dart
FutureBuilder<List<Post>>(
  future: fetchPosts(),
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return const CircularProgressIndicator();
    }
    if (snapshot.hasError) return Text('Error: ${snapshot.error}');
    if (!snapshot.hasData) return const Text('No data');
    return ListView.builder(
      itemCount: snapshot.data!.length,
      itemBuilder: (_, i) => ListTile(title: Text(snapshot.data![i].title)),
    );
  },
)
```

---

## Animations

### Implicit Animations (Simple)

```dart
AnimatedContainer(
  duration: const Duration(milliseconds: 300),
  curve: Curves.easeInOut,
  width: _expanded ? 200 : 100,
  color: _expanded ? Colors.blue : Colors.red,
)

AnimatedOpacity(
  opacity: _visible ? 1.0 : 0.0,
  duration: const Duration(milliseconds: 500),
  child: MyWidget(),
)
```

### Explicit Animations

```dart
class SpinningWidget extends StatefulWidget { ... }

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
}
```

### Hero Animations

```dart
// Source screen
Hero(
  tag: 'hero-image-${item.id}',
  child: Image.network(item.imageUrl),
)

// Destination screen (same tag)
Hero(
  tag: 'hero-image-${item.id}',
  child: Image.network(item.imageUrl, fit: BoxFit.cover),
)
```

---

## Persistence / Local Storage

### shared_preferences (Key-Value)

```dart
final prefs = await SharedPreferences.getInstance();
await prefs.setString('username', 'mustafa');
final name = prefs.getString('username') ?? 'Guest';
```

### sqflite (SQLite)

```dart
final db = await openDatabase('app.db', version: 1,
  onCreate: (db, version) {
    return db.execute('CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT)');
  },
);

await db.insert('items', {'name': 'Task 1'});
final List<Map<String, dynamic>> rows = await db.query('items');
```

### Hive (Fast NoSQL)

```dart
await Hive.initFlutter();
final box = await Hive.openBox('settings');
box.put('darkMode', true);
final darkMode = box.get('darkMode', defaultValue: false);
```

---

## Adaptive & Responsive Design

```dart
// MediaQuery
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
bool get isDesktop => screenWidth >= 1200;
```

---

## Accessibility

```dart
Semantics(
  label: 'Submit form button',
  button: true,
  child: ElevatedButton(
    onPressed: onSubmit,
    child: const Text('Submit'),
  ),
)
```

Key practices:
- Always provide semantic labels for images and icons
- Use sufficient color contrast ratios
- Support dynamic font sizes via `TextScaler`
- Test with TalkBack (Android) and VoiceOver (iOS)

---

## Internationalization (i18n)

```yaml
# pubspec.yaml
dependencies:
  flutter_localizations:
    sdk: flutter
  intl: any

flutter:
  generate: true
```

```dart
// MaterialApp
MaterialApp(
  localizationsDelegates: AppLocalizations.localizationsDelegates,
  supportedLocales: AppLocalizations.supportedLocales,
)

// Usage
Text(AppLocalizations.of(context)!.helloWorld)
```

---

## Theming

```dart
MaterialApp(
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
Theme.of(context).textTheme.headlineMedium
```

---

## Assets & Images

```yaml
# pubspec.yaml
flutter:
  assets:
    - assets/images/logo.png
    - assets/icons/
  fonts:
    - family: MyFont
      fonts:
        - asset: assets/fonts/MyFont-Regular.ttf
        - asset: assets/fonts/MyFont-Bold.ttf
          weight: 700
```

```dart
// Load asset image
Image.asset('assets/images/logo.png')

// Load from network
Image.network('https://example.com/image.jpg')

// Cached network image (package)
CachedNetworkImage(imageUrl: url, placeholder: (_, __) => CircularProgressIndicator())
```

---

## DevTools

Flutter DevTools is a suite of performance and debugging tools:

| Tool | Purpose |
|------|---------|
| **Widget Inspector** | Visualize widget tree and properties |
| **Performance** | Frame rendering, jank detection |
| **CPU Profiler** | Identify slow code |
| **Memory** | Track memory usage and leaks |
| **Network** | Monitor HTTP requests |
| **Logging** | View print statements and errors |
| **Layout Explorer** | Debug layout constraints |

```bash
# Launch DevTools
flutter run --debug
# Then open link printed in terminal, or:
dart devtools
```

---

## Testing

```dart
// Unit test
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
// test_driver/integration_test.dart
```

---

## Useful CLI Commands

```bash
flutter create my_app            # Create new project
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
flutter gen-l10n                 # Generate localization files
```

---

## Key Docs Links

| Topic | URL |
|-------|-----|
| Main Docs | https://docs.flutter.dev |
| Widget Catalog | https://docs.flutter.dev/ui/widgets |
| API Reference | https://api.flutter.dev |
| Cookbook | https://docs.flutter.dev/cookbook |
| Learning Pathway | https://docs.flutter.dev/get-started/fundamentals |
| Migration Guides | https://docs.flutter.dev/release/breaking-changes |
| What's New | https://docs.flutter.dev/release/whats-new |
