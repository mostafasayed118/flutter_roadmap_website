import type { DocEntry } from "./types";

export const cheatSheetDocs: DocEntry[] = [
  {
    id: "cheat-dart-quick",
    title: "Dart Quick Reference",
    category: "cheat-sheet",
    summary:
      "Variables, null safety, collections, functions, classes, and async at a glance.",
    content: `Quick reference for Dart fundamentals — variables, null safety, collections, functions, classes, async, and error handling. Copy-paste ready snippets for everyday use.`,
    codeSnippets: [
      {
        language: "dart",
        label: "Variables & Null Safety",
        code: `var name = 'Ali';          // type inferred
final name = 'Ali';        // runtime constant
const PI = 3.14;           // compile-time constant
dynamic x = 42;            // any type at runtime
int / double / num / String / bool

// Null Safety
String? name;              // nullable
String  name = 'Ali';      // non-nullable (default)
name?.length               // safe call → null if name is null
name ?? 'default'          // null coalescing
name!.length               // assert non-null (throws if null)
late String name;          // deferred init (not null, init later)`,
      },
      {
        language: "dart",
        label: "Collections",
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
      {
        language: "dart",
        label: "Functions",
        code: `// Named params (required)
void greet({required String name}) {}

// Optional positional
String greet(String name, [String? title]) {}

// Arrow function
int add(int a, int b) => a + b;

// First-class
var square = (int x) => x * x;
nums.map(square).toList();

// Closure
Function multiplier(int factor) {
  return (int value) => value * factor;
}`,
      },
    ],
    relatedWeeks: [1, 2, 3, 4],
    tags: [
      "cheat sheet",
      "quick reference",
      "Dart",
      "variables",
      "collections",
      "functions",
    ],
    difficulty: "beginner",
  },
  {
    id: "cheat-flutter-widgets",
    title: "Flutter Widget Cheatsheet",
    category: "cheat-sheet",
    summary:
      "Material widgets, layout, styling, navigation, and state management patterns.",
    content: `Quick reference for Flutter widgets — Material Design widgets, layout system, styling, navigation patterns, and state management approaches.`,
    codeSnippets: [
      {
        language: "dart",
        label: "Material Widgets",
        code: `// Text
Text('Hello', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold))

// Button
ElevatedButton(onPressed: () {}, child: Text('Press'))
TextButton(onPressed: () {}, child: Text('Press'))
IconButton(onPressed: () {}, icon: Icon(Icons.add))

// Image
Image.asset('assets/image.png')
Image.network('https://url.com/image.jpg', fit: BoxFit.cover)

// Card
Card(child: Padding(padding: EdgeInsets.all(16), child: Text('Content')))

// TextField
TextField(decoration: InputDecoration(labelText: 'Name', hintText: 'Enter name'))

// ListView
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) => ListTile(title: Text(items[index])),
)`,
      },
      {
        language: "dart",
        label: "Layout Widgets",
        code: `// Row / Column
Row(children: [Widget1(), Widget2()])
Column(children: [Widget1(), Widget2()])

// Stack
Stack(children: [Background(), Foreground()])

// Expanded / Flexible
Row(children: [Expanded(child: WidgetA()), Flexible(child: WidgetB())])

// Padding / Center / Align
Padding(padding: EdgeInsets.all(16), child: child)
Center(child: child)
Align(alignment: Alignment.center, child: child)

// SizedBox / Container
SizedBox(width: 100, height: 100, child: child)
Container(
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.all(8),
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(12),
    boxShadow: [BoxShadow(blurRadius: 8)],
  ),
  child: child,
)`,
      },
      {
        language: "dart",
        label: "Navigation & State",
        code: `// Navigator 1.0
Navigator.push(context, MaterialPageRoute(builder: (_) => Page()))
Navigator.pop(context)

// go_router
context.go('/home')
context.push('/details/42')
context.pop()

// setState (local state)
setState(() => _counter++)

// Provider
context.watch<CounterModel>().count    // rebuilds
context.read<CounterModel>().increment()  // no rebuild

// Bloc
BlocBuilder<CounterCubit, int>(
  builder: (context, state) => Text('\$state'),
)`,
      },
    ],
    relatedWeeks: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    tags: [
      "cheat sheet",
      "quick reference",
      "Flutter",
      "widgets",
      "layout",
      "navigation",
      "state management",
    ],
    difficulty: "beginner",
  },
  {
    id: "cheat-bloc-cubit",
    title: "Bloc/Cubit Quick Reference",
    category: "cheat-sheet",
    summary:
      "Cubit, Bloc, BlocProvider, BlocBuilder, BlocListener, and context extensions.",
    content: `Quick reference for Bloc/Cubit state management — creating Cubits and Blocs, using widgets (BlocProvider, BlocBuilder, BlocListener, BlocConsumer), and context extensions.`,
    codeSnippets: [
      {
        language: "dart",
        label: "Cubit & Bloc Patterns",
        code: `// Cubit
class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0);
  void increment() => emit(state + 1);
}

// Bloc
class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<Increment>((event, emit) => emit(state + 1));
  }
}

// BlocProvider
BlocProvider(
  create: (_) => CounterCubit(),
  child: MyWidget(),
)

// BlocBuilder
BlocBuilder<CounterCubit, int>(
  builder: (context, state) => Text('\$state'),
)

// BlocListener
BlocListener<AuthCubit, AuthState>(
  listener: (context, state) {
    if (state.isLoggedIn) context.go('/home');
  },
  child: LoginForm(),
)

// Context extensions
context.read<Cubit>().method()  // no rebuild
context.watch<Cubit>().state     // rebuilds
context.select<Cubit, T>((c) => c.state.field)  // selective rebuild`,
      },
    ],
    relatedWeeks: [10, 11, 12, 13],
    tags: [
      "cheat sheet",
      "quick reference",
      "Bloc",
      "Cubit",
      "state management",
      "flutter_bloc",
    ],
    difficulty: "intermediate",
  },
  {
    id: "cheat-firebase",
    title: "Firebase Quick Reference",
    category: "cheat-sheet",
    summary:
      "Auth, Firestore, Storage, FCM, and Analytics — essential patterns at a glance.",
    content: `Quick reference for Firebase integration — Authentication (Email, Google, Phone), Firestore CRUD and queries, Storage upload/download, FCM push notifications, and Analytics events.`,
    codeSnippets: [
      {
        language: "dart",
        label: "Firebase Auth",
        code: `// Email/Password
await FirebaseAuth.instance.signInWithEmailAndPassword(email: e, password: p);
await FirebaseAuth.instance.createUserWithEmailAndPassword(email: e, password: p);
await FirebaseAuth.instance.signOut();

// Google
final googleUser = await GoogleSignIn().signIn();
final credential = GoogleAuthProvider.credential(
  accessToken: googleAuth.accessToken, idToken: googleAuth.idToken,
);
await FirebaseAuth.instance.signInWithCredential(credential);

// Auth state
FirebaseAuth.instance.authStateChanges().listen((User? user) { ... });`,
      },
      {
        language: "dart",
        label: "Firestore CRUD",
        code: `final db = FirebaseFirestore.instance;

// Create
await db.collection('users').add({'name': 'Ali', 'age': 25});
await db.collection('users').doc('id').set({'name': 'Ali'});

// Read
final doc = await db.collection('users').doc('id').get();
final docs = await db.collection('users').where('age', isGreaterThan: 18).get();

// Update
await db.collection('users').doc('id').update({'age': 26});

// Delete
await db.collection('users').doc('id').delete();

// Real-time
db.collection('users').snapshots().listen((snap) { ... });`,
      },
    ],
    relatedWeeks: [28, 29, 30],
    tags: [
      "cheat sheet",
      "quick reference",
      "Firebase",
      "Auth",
      "Firestore",
      "Storage",
      "FCM",
    ],
    difficulty: "intermediate",
  },
  {
    id: "cheat-deployment",
    title: "Deployment & Testing Cheatsheet",
    category: "cheat-sheet",
    summary:
      "Build commands, signing, app store submission, CI/CD, and test commands.",
    content: `Quick reference for building, signing, and deploying Flutter apps to Android, iOS, and Web. Includes build commands, signing setup, and CI/CD configuration patterns.`,
    codeSnippets: [
      {
        language: "bash",
        label: "Build & Deploy",
        code: `# Build
flutter build apk --release
flutter build appbundle --release
flutter build ios --release
flutter build web --release

# Run
flutter run --release
flutter run -d chrome
flutter run -d <device-id>

# Clean
flutter clean
flutter pub get

# Test
flutter test
flutter test --coverage
flutter test integration_test/

# Analyze
flutter analyze
dart format --set-exit-if-changed .`,
      },
      {
        language: "yaml",
        label: "GitHub Actions CI/CD",
        code: `name: Flutter CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.24.0'
          channel: 'stable'
      - run: flutter pub get
      - run: flutter analyze
      - run: flutter test
      - run: flutter build apk --release
      - uses: actions/upload-artifact@v4
        with:
          name: release-apk
          path: build/app/outputs/flutter-apk/app-release.apk`,
      },
    ],
    relatedWeeks: [31, 32, 33, 34],
    tags: [
      "cheat sheet",
      "quick reference",
      "deployment",
      "build",
      "CI/CD",
      "testing",
      "Android",
      "iOS",
      "web",
    ],
    difficulty: "intermediate",
  },
];
