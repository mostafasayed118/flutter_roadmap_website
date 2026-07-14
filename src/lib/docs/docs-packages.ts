import type { DocEntry } from "./types";

export const packagesDocs: DocEntry[] = [
  {
    id: "pkg-how-to-use",
    title: "How to Use Packages",
    category: "packages",
    summary:
      "Flutter packages from pub.dev extend your app with pre-built functionality. This section covers the essential workflow for adding, installing, and importing packages.",
    content:
      "Flutter's package ecosystem on **pub.dev** has thousands of packages. This document covers the most essential, production-proven packages every Flutter developer should know — covering networking, state management, navigation, storage, UI, and utilities.\n\nTo use a package, first add it to `pubspec.yaml`, install it via `flutter pub get`, then import it in your Dart code.",
    codeSnippets: [
      {
        id: "pkg-add-to-pubspec",
        language: "yaml",
        label: "Add to pubspec.yaml",
        code: "dependencies:\n  package_name: ^1.0.0   # caret = compatible upgrades\n  another_package: any    # any version\n\ndev_dependencies:\n  build_runner: ^2.4.0    # code generation tool",
      },
      {
        id: "pkg-install",
        language: "bash",
        label: "Install packages",
        code: "flutter pub get         # install\nflutter pub upgrade     # upgrade to latest compatible\nflutter pub outdated    # see what's outdated",
      },
      {
        id: "pkg-import",
        language: "dart",
        label: "Import a package",
        code: "import 'package:package_name/package_name.dart';",
      },
    ],
    relatedWeeks: [1, 2, 3],
    tags: ["packages", "pubspec", "pub dev", "dependencies", "install"],
    difficulty: "beginner",
  },
  {
    id: "pkg-dio",
    title: "dio — Powerful HTTP Client",
    category: "packages",
    summary:
      "Dio is the most popular HTTP client for Flutter, offering interceptors, global config, FormData, file upload/download, request cancellation, timeout, retry, and custom adapters.",
    content:
      "> `pub.dev/packages/dio` | Most popular HTTP client for Flutter\n\n**Features:** Interceptors, Global config, FormData, File upload/download, Request cancellation, Timeout, Retry, Custom adapters.",
    codeSnippets: [
      {
        id: "pkg-dio-deps",
        language: "yaml",
        label: "Add dio dependency",
        code: "dependencies:\n  dio: ^5.9.0",
      },
      {
        id: "pkg-dio-setup",
        language: "dart",
        label: "Dio usage examples",
        code: "import 'package:dio/dio.dart';\n\n// Basic GET\nfinal dio = Dio();\nfinal response = await dio.get('https://api.example.com/users');\nprint(response.data);\n\n// POST with JSON\nfinal response = await dio.post(\n  '/users',\n  data: {'name': 'Mustafa', 'email': 'test@test.com'},\n);\n\n// With base options (global config)\nfinal dio = Dio(BaseOptions(\n  baseUrl: 'https://api.example.com',\n  connectTimeout: const Duration(seconds: 10),\n  receiveTimeout: const Duration(seconds: 15),\n  headers: {'Content-Type': 'application/json'},\n));\n\n// Interceptors (auth token, logging, error handling)\ndio.interceptors.add(\n  InterceptorsWrapper(\n    onRequest: (options, handler) {\n      options.headers['Authorization'] = 'Bearer $token';\n      return handler.next(options);\n    },\n    onResponse: (response, handler) {\n      // log or transform response\n      return handler.next(response);\n    },\n    onError: (DioException e, handler) {\n      if (e.response?.statusCode == 401) {\n        // refresh token or logout\n      }\n      return handler.next(e);\n    },\n  ),\n);\n\n// File upload\nfinal formData = FormData.fromMap({\n  'name': 'avatar',\n  'file': await MultipartFile.fromFile('./avatar.png', filename: 'avatar.png'),\n});\nawait dio.post('/upload', data: formData);\n\n// Download file\nawait dio.download(\n  'https://example.com/file.pdf',\n  '/storage/file.pdf',\n  onReceiveProgress: (received, total) {\n    print('${(received / total * 100).toStringAsFixed(0)}%');\n  },\n);\n\n// Cancel request\nfinal cancelToken = CancelToken();\ndio.get('/data', cancelToken: cancelToken);\ncancelToken.cancel('Cancelled by user');",
      },
    ],
    relatedWeeks: [14, 15, 16],
    tags: ["dio", "http", "networking", "api", "rest", "interceptor", "file upload", "download"],
    difficulty: "intermediate",
  },
  {
    id: "pkg-http",
    title: "http — Simple HTTP Client (Official Dart)",
    category: "packages",
    summary:
      "The official Dart HTTP client for making simple GET and POST requests with JSON encoding/decoding.",
    content:
      "The `http` package is the official Dart HTTP client for making simple GET and POST requests with JSON encoding/decoding.",
    codeSnippets: [
      {
        id: "pkg-http-deps",
        language: "yaml",
        label: "Add http dependency",
        code: "dependencies:\n  http: ^1.2.0",
      },
      {
        id: "pkg-http-setup",
        language: "dart",
        label: "http usage examples",
        code: "import 'package:http/http.dart' as http;\nimport 'dart:convert';\n\nfinal response = await http.get(\n  Uri.parse('https://api.example.com/posts'),\n  headers: {'Authorization': 'Bearer $token'},\n);\n\nif (response.statusCode == 200) {\n  final data = jsonDecode(response.body);\n}\n\n// POST\nfinal response = await http.post(\n  Uri.parse('https://api.example.com/posts'),\n  headers: {'Content-Type': 'application/json'},\n  body: jsonEncode({'title': 'Hello', 'body': 'World'}),\n);",
      },
    ],
    relatedWeeks: [14, 15, 16],
    tags: ["http", "dart", "networking", "api", "rest"],
    difficulty: "beginner",
  },
  {
    id: "pkg-go-router",
    title: "go_router — Official Flutter Navigation Package",
    category: "packages",
    summary:
      "Official Flutter navigation package with URL-based routing, deep linking, nested navigation, redirect guards, ShellRoute for persistent navigation bars, and path + query parameters.",
    content:
      "> `pub.dev/packages/go_router` | Officially maintained by Flutter team\n\n**Features:** URL-based routing, deep linking, nested navigation, redirect guards, ShellRoute for persistent navigation bars, path + query parameters.",
    codeSnippets: [
      {
        id: "pkg-go-router-deps",
        language: "yaml",
        label: "Add go_router dependency",
        code: "dependencies:\n  go_router: ^14.0.0",
      },
      {
        id: "pkg-go-router-setup",
        language: "dart",
        label: "go_router navigation setup",
        code: "import 'package:go_router/go_router.dart';\n\n// Define router\nfinal GoRouter router = GoRouter(\n  initialLocation: '/',\n  debugLogDiagnostics: true,\n  redirect: (context, state) {\n    final isLoggedIn = context.read<AuthCubit>().state.isLoggedIn;\n    final goingToLogin = state.matchedLocation == '/login';\n    if (!isLoggedIn && !goingToLogin) return '/login';\n    if (isLoggedIn && goingToLogin) return '/home';\n    return null;\n  },\n  routes: [\n    GoRoute(\n      path: '/login',\n      builder: (context, state) => const LoginPage(),\n    ),\n    ShellRoute(\n      builder: (context, state, child) {\n        return ScaffoldWithBottomNav(child: child);\n      },\n      routes: [\n        GoRoute(\n          path: '/home',\n          builder: (context, state) => const HomePage(),\n        ),\n        GoRoute(\n          path: '/profile',\n          builder: (context, state) => const ProfilePage(),\n          routes: [\n            GoRoute(\n              path: 'edit',\n              builder: (context, state) => const EditProfilePage(),\n            ),\n          ],\n        ),\n        GoRoute(\n          path: '/products/:id',\n          builder: (context, state) {\n            final id = state.pathParameters['id']!;\n            final tab = state.uri.queryParameters['tab'] ?? 'details';\n            return ProductPage(id: id, tab: tab);\n          },\n        ),\n      ],\n    ),\n  ],\n);\n\n// Register with MaterialApp\nMaterialApp.router(\n  routerConfig: router,\n)\n\n// Navigation\ncontext.go('/home');                    // replace current\ncontext.push('/profile');              // push on stack\ncontext.pushReplacement('/login');     // replace top\ncontext.pop();                         // go back\ncontext.goNamed('profile');            // named route\n\n// With parameters\ncontext.go('/products/42?tab=reviews');\n\n// Pass extra data (not in URL)\ncontext.push('/details', extra: myObject);\n// In builder:\nfinal obj = state.extra as MyObject;",
      },
    ],
    relatedWeeks: [7, 8],
    tags: ["go_router", "navigation", "routing", "deep linking", "shell route", "redirect"],
    difficulty: "intermediate",
  },
  {
    id: "pkg-provider",
    title: "provider — Simple & Beginner-Friendly",
    category: "packages",
    summary:
      "Provider is the recommended state management solution for simple Flutter apps, offering ChangeNotifier, MultiProvider, Consumer, and extension methods for reactive UI updates.",
    content:
      "> `pub.dev/packages/provider` | Recommended for simple apps",
    codeSnippets: [
      {
        id: "pkg-provider-deps",
        language: "yaml",
        label: "Add provider dependency",
        code: "dependencies:\n  provider: ^6.1.0",
      },
      {
        id: "pkg-provider-setup",
        language: "dart",
        label: "Provider setup and usage",
        code: "// 1. Model\nclass UserModel extends ChangeNotifier {\n  String _name = '';\n  String get name => _name;\n\n  void updateName(String newName) {\n    _name = newName;\n    notifyListeners();\n  }\n}\n\n// 2. Provide\nMultiProvider(\n  providers: [\n    ChangeNotifierProvider(create: (_) => UserModel()),\n    Provider(create: (_) => ApiService()),\n    FutureProvider<Config>(\n      create: (_) => Config.load(),\n      initialData: Config.defaults,\n    ),\n  ],\n  child: const MyApp(),\n)\n\n// 3. Consume\nConsumer<UserModel>(\n  builder: (context, user, child) => Text(user.name),\n)\n\n// Or with extension\ncontext.watch<UserModel>().name    // rebuilds on change\ncontext.read<UserModel>().updateName('Mustafa')  // no rebuild\ncontext.select<UserModel, String>((u) => u.name) // selective rebuild",
      },
    ],
    relatedWeeks: [8, 9],
    tags: ["provider", "state management", "change notifier", "reactive"],
    difficulty: "beginner",
  },
  {
    id: "pkg-flutter-bloc",
    title: "flutter_bloc — See dedicated Bloc/Cubit docs",
    category: "packages",
    summary:
      "Flutter Bloc package for structured state management using BLoC and Cubit patterns. See the dedicated Bloc documentation for comprehensive examples.",
    content:
      "See the dedicated Bloc/Cubit documentation for comprehensive examples and patterns.",
    codeSnippets: [
      {
        id: "pkg-flutter-bloc-deps",
        language: "yaml",
        label: "Add flutter_bloc dependency",
        code: "dependencies:\n  flutter_bloc: ^9.0.0",
      },
    ],
    relatedWeeks: [8, 9],
    tags: ["flutter_bloc", "bloc", "cubit", "state management"],
    difficulty: "intermediate",
  },
  {
    id: "pkg-riverpod",
    title: "riverpod — Modern, Compile-Safe State Management",
    category: "packages",
    summary:
      "Riverpod is a modern, compile-safe state management solution with code generation support, offering providers, async providers, and ConsumerWidget for reactive UI.",
    content:
      "Riverpod is a modern, compile-safe state management solution with code generation support.",
    codeSnippets: [
      {
        id: "pkg-riverpod-deps",
        language: "yaml",
        label: "Add riverpod dependencies",
        code: "dependencies:\n  flutter_riverpod: ^2.5.0\n  riverpod_annotation: ^2.3.0\ndev_dependencies:\n  riverpod_generator: ^2.4.0\n  build_runner: ^2.4.0",
      },
      {
        id: "pkg-riverpod-setup",
        language: "dart",
        label: "Riverpod usage",
        code: "import 'package:flutter_riverpod/flutter_riverpod.dart';\n\n// 1. Define provider\nfinal counterProvider = StateNotifierProvider<CounterNotifier, int>(\n  (ref) => CounterNotifier(),\n);\n\nclass CounterNotifier extends StateNotifier<int> {\n  CounterNotifier() : super(0);\n  void increment() => state++;\n}\n\n// Async provider\nfinal usersProvider = FutureProvider<List<User>>((ref) async {\n  final api = ref.read(apiProvider);\n  return api.getUsers();\n});\n\n// 2. Wrap app\nvoid main() {\n  runApp(const ProviderScope(child: MyApp()));\n}\n\n// 3. Consume (extend ConsumerWidget or use Consumer)\nclass MyWidget extends ConsumerWidget {\n  @override\n  Widget build(BuildContext context, WidgetRef ref) {\n    final count = ref.watch(counterProvider);\n    return Text('$count');\n  }\n}\n\n// 4. Read and call\nref.read(counterProvider.notifier).increment();",
      },
    ],
    relatedWeeks: [8, 9],
    tags: ["riverpod", "state management", "provider", "compile safe", "code generation"],
    difficulty: "intermediate",
  },
  {
    id: "pkg-get-it",
    title: "get_it — Dependency Injection (Service Locator)",
    category: "packages",
    summary:
      "GetIt is a simple service locator for dependency injection, allowing you to register singletons, lazy singletons, and factories without needing a BuildContext.",
    content:
      "GetIt is a simple service locator for dependency injection.",
    codeSnippets: [
      {
        id: "pkg-get-it-deps",
        language: "yaml",
        label: "Add get_it dependency",
        code: "dependencies:\n  get_it: ^9.0.0",
      },
      {
        id: "pkg-get-it-setup",
        language: "dart",
        label: "GetIt dependency injection",
        code: "import 'package:get_it/get_it.dart';\n\nfinal getIt = GetIt.instance;\n\n// Register (in main or setup file)\nvoid setupDI() {\n  getIt.registerSingleton<ApiService>(ApiService());\n  getIt.registerLazySingleton<AuthRepository>(() => AuthRepository(getIt()));\n  getIt.registerFactory<LoginCubit>(() => LoginCubit(getIt()));\n}\n\n// Use anywhere (no context needed)\nfinal api = getIt<ApiService>();\nfinal cubit = getIt<LoginCubit>();",
      },
    ],
    relatedWeeks: [8, 9],
    tags: ["get_it", "dependency injection", "service locator", "singleton", "factory"],
    difficulty: "intermediate",
  },
  {
    id: "pkg-shared-preferences",
    title: "shared_preferences — Key-Value Store",
    category: "packages",
    summary:
      "SharedPreferences provides simple persistent key-value storage for Flutter apps, supporting strings, ints, bools, and string lists.",
    content:
      "> `pub.dev/packages/shared_preferences` | Simple persistent storage",
    codeSnippets: [
      {
        id: "pkg-shared-prefs-deps",
        language: "yaml",
        label: "Add shared_preferences dependency",
        code: "dependencies:\n  shared_preferences: ^2.3.0",
      },
      {
        id: "pkg-shared-prefs-setup",
        language: "dart",
        label: "SharedPreferences usage",
        code: "import 'package:shared_preferences/shared_preferences.dart';\n\nfinal prefs = await SharedPreferences.getInstance();\n\n// Write\nawait prefs.setString('token', 'abc123');\nawait prefs.setInt('count', 42);\nawait prefs.setBool('isLoggedIn', true);\nawait prefs.setStringList('tags', ['flutter', 'dart']);\n\n// Read\nfinal token = prefs.getString('token') ?? '';\nfinal count = prefs.getInt('count') ?? 0;\nfinal isLoggedIn = prefs.getBool('isLoggedIn') ?? false;\n\n// Delete\nawait prefs.remove('token');\nawait prefs.clear(); // clear all",
      },
    ],
    relatedWeeks: [17, 18],
    tags: ["shared_preferences", "storage", "key value", "persistence", "local storage"],
    difficulty: "beginner",
  },
  {
    id: "pkg-hive",
    title: "hive — Fast NoSQL Database",
    category: "packages",
    summary:
      "Hive is a blazing-fast key-value database for Flutter with typed boxes, type adapters, and reactive UI updates via ValueListenableBuilder.",
    content:
      "> `pub.dev/packages/hive_ce_flutter` | Blazing-fast key-value + typed boxes",
    codeSnippets: [
      {
        id: "pkg-hive-deps",
        language: "yaml",
        label: "Add hive dependency",
        code: "dependencies:\n  hive_ce_flutter: ^2.0.0\ndev_dependencies:\n  hive_ce_generator: ^2.0.0\n  build_runner: ^2.4.0",
      },
      {
        id: "pkg-hive-setup",
        language: "dart",
        label: "Hive usage",
        code: "import 'package:hive_ce_flutter/hive_flutter.dart';\n\n// Initialize\nawait Hive.initFlutter();\n\n// Type adapter for custom objects\n@HiveType(typeId: 0)\nclass User extends HiveObject {\n  @HiveField(0) String name;\n  @HiveField(1) int age;\n  User({required this.name, required this.age});\n}\n\nHive.registerAdapter(UserAdapter());\nfinal box = await Hive.openBox<User>('users');\n\n// CRUD\nbox.put('user1', User(name: 'Mustafa', age: 25));\nfinal user = box.get('user1');\nbox.delete('user1');\nbox.values.toList(); // all values\n\n// React to changes\nValueListenableBuilder(\n  valueListenable: box.listenable(),\n  builder: (context, box, _) => ListView.builder(\n    itemCount: box.length,\n    itemBuilder: (_, i) => Text(box.getAt(i)!.name),\n  ),\n)",
      },
    ],
    relatedWeeks: [17, 18],
    tags: ["hive", "database", "nosql", "key value", "type adapter", "local storage"],
    difficulty: "intermediate",
  },
  {
    id: "pkg-sqflite",
    title: "sqflite — SQLite Database",
    category: "packages",
    summary:
      "sqflite provides full relational SQLite database support for Flutter, including CRUD operations, raw queries, and table creation.",
    content:
      "> `pub.dev/packages/sqflite` | Full relational SQLite for Flutter",
    codeSnippets: [
      {
        id: "pkg-sqflite-deps",
        language: "yaml",
        label: "Add sqflite dependency",
        code: "dependencies:\n  sqflite: ^2.3.0\n  path: ^1.9.0",
      },
      {
        id: "pkg-sqflite-setup",
        language: "dart",
        label: "sqflite usage",
        code: "import 'package:sqflite/sqflite.dart';\nimport 'package:path/path.dart';\n\n// Open database\nfinal db = await openDatabase(\n  join(await getDatabasesPath(), 'app.db'),\n  version: 1,\n  onCreate: (db, version) async {\n    await db.execute('''\n      CREATE TABLE tasks (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        title TEXT NOT NULL,\n        isDone INTEGER NOT NULL DEFAULT 0,\n        createdAt TEXT NOT NULL\n      )\n    ''');\n  },\n);\n\n// Insert\nawait db.insert('tasks', {\n  'title': 'Learn Flutter',\n  'isDone': 0,\n  'createdAt': DateTime.now().toIso8601String(),\n});\n\n// Query\nfinal tasks = await db.query('tasks', orderBy: 'createdAt DESC');\n\n// Update\nawait db.update(\n  'tasks',\n  {'isDone': 1},\n  where: 'id = ?',\n  whereArgs: [taskId],\n);\n\n// Delete\nawait db.delete('tasks', where: 'id = ?', whereArgs: [id]);\n\n// Raw query\nfinal result = await db.rawQuery(\n  'SELECT * FROM tasks WHERE isDone = ? ORDER BY createdAt',\n  [0],\n);",
      },
    ],
    relatedWeeks: [17, 18],
    tags: ["sqflite", "sqlite", "database", "sql", "relational", "local storage"],
    difficulty: "intermediate",
  },
  {
    id: "pkg-json-serializable",
    title: "json_serializable — Code Generation for Models",
    category: "packages",
    summary:
      "json_serializable generates JSON serialization/deserialization code for Dart models using annotations and build_runner.",
    content:
      "json_serializable generates JSON serialization/deserialization code for Dart models using annotations and build_runner.",
    codeSnippets: [
      {
        id: "pkg-json-serializable-deps",
        language: "yaml",
        label: "Add json_serializable dependencies",
        code: "dependencies:\n  json_annotation: ^4.8.0\ndev_dependencies:\n  json_serializable: ^6.7.0\n  build_runner: ^2.4.0",
      },
      {
        id: "pkg-json-serializable-setup",
        language: "dart",
        label: "json_serializable usage",
        code: "import 'package:json_annotation/json_annotation.dart';\n\npart 'user.g.dart'; // generated file\n\n@JsonSerializable()\nclass User {\n  final int id;\n  final String name;\n  @JsonKey(name: 'email_address')\n  final String email;\n  final DateTime? createdAt;\n\n  const User({\n    required this.id,\n    required this.name,\n    required this.email,\n    this.createdAt,\n  });\n\n  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);\n  Map<String, dynamic> toJson() => _$UserToJson(this);\n}",
      },
      {
        id: "pkg-json-serializable-build",
        language: "bash",
        label: "Run build_runner",
        code: "dart run build_runner build          # generate once\ndart run build_runner watch          # watch for changes",
      },
    ],
    relatedWeeks: [23, 24, 25],
    tags: ["json_serializable", "json", "serialization", "code generation", "model"],
    difficulty: "intermediate",
  },
  {
    id: "pkg-freezed",
    title: "freezed — Immutable Data Classes + Union Types",
    category: "packages",
    summary:
      "Freezed is the gold standard for immutable data classes in Dart, providing automatic copyWith, ==, hashCode, toString, and support for union types with pattern matching.",
    content:
      "> `pub.dev/packages/freezed` | The gold standard for data classes in Dart",
    codeSnippets: [
      {
        id: "pkg-freezed-deps",
        language: "yaml",
        label: "Add freezed dependencies",
        code: "dependencies:\n  freezed_annotation: ^3.0.0\ndev_dependencies:\n  freezed: ^3.0.0\n  build_runner: ^2.4.0",
      },
      {
        id: "pkg-freezed-setup",
        language: "dart",
        label: "Freezed usage",
        code: "import 'package:freezed_annotation/freezed_annotation.dart';\n\npart 'user.freezed.dart';\npart 'user.g.dart';  // if using json_serializable\n\n@freezed\nclass User with _$User {\n  const factory User({\n    required int id,\n    required String name,\n    required String email,\n    @Default(false) bool isAdmin,\n    String? avatar,\n  }) = _User;\n\n  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);\n}\n\n// Usage — automatic copyWith, ==, hashCode, toString\nfinal user = User(id: 1, name: 'Mustafa', email: 'test@test.com');\nfinal updated = user.copyWith(name: 'Updated');\n\n// Union types (sealed states)\n@freezed\nclass WeatherState with _$WeatherState {\n  const factory WeatherState.initial() = _Initial;\n  const factory WeatherState.loading() = _Loading;\n  const factory WeatherState.loaded(Weather weather) = _Loaded;\n  const factory WeatherState.error(String message) = _Error;\n}\n\n// Pattern matching\nstate.when(\n  initial: () => const Text('Enter a city'),\n  loading: () => const CircularProgressIndicator(),\n  loaded: (weather) => WeatherWidget(weather),\n  error: (msg) => Text('Error: $msg'),\n)",
      },
    ],
    relatedWeeks: [23, 24, 25],
    tags: ["freezed", "immutable", "data class", "union type", "pattern matching", "copyWith"],
    difficulty: "intermediate",
  },
  {
    id: "pkg-cached-network-image",
    title: "cached_network_image — Image Caching",
    category: "packages",
    summary:
      "CachedNetworkImage provides image caching with placeholder and error widget support for network images.",
    content:
      "CachedNetworkImage provides image caching with placeholder and error widget support for network images.",
    codeSnippets: [
      {
        id: "pkg-cached-network-image-deps",
        language: "yaml",
        label: "Add cached_network_image dependency",
        code: "dependencies:\n  cached_network_image: ^3.3.0",
      },
      {
        id: "pkg-cached-network-image-setup",
        language: "dart",
        label: "CachedNetworkImage usage",
        code: "CachedNetworkImage(\n  imageUrl: 'https://example.com/photo.jpg',\n  placeholder: (context, url) => const CircularProgressIndicator(),\n  errorWidget: (context, url, error) => const Icon(Icons.error),\n  fit: BoxFit.cover,\n  width: 200,\n  height: 200,\n)",
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: ["cached_network_image", "image", "cache", "network image", "ui"],
    difficulty: "beginner",
  },
  {
    id: "pkg-flutter-svg",
    title: "flutter_svg — SVG Support",
    category: "packages",
    summary:
      "flutter_svg provides SVG rendering support for Flutter, including asset and network SVG loading.",
    content:
      "flutter_svg provides SVG rendering support for Flutter, including asset and network SVG loading.",
    codeSnippets: [
      {
        id: "pkg-flutter-svg-deps",
        language: "yaml",
        label: "Add flutter_svg dependency",
        code: "dependencies:\n  flutter_svg: ^2.0.0",
      },
      {
        id: "pkg-flutter-svg-setup",
        language: "dart",
        label: "flutter_svg usage",
        code: "SvgPicture.asset('assets/icon.svg', width: 48, height: 48)\nSvgPicture.network('https://example.com/logo.svg')",
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: ["flutter_svg", "svg", "vector", "image", "icon", "ui"],
    difficulty: "beginner",
  },
  {
    id: "pkg-shimmer",
    title: "shimmer — Loading Skeleton Effect",
    category: "packages",
    summary:
      "Shimmer provides a loading skeleton effect for Flutter widgets using customizable base and highlight colors.",
    content:
      "Shimmer provides a loading skeleton effect for Flutter widgets using customizable base and highlight colors.",
    codeSnippets: [
      {
        id: "pkg-shimmer-deps",
        language: "yaml",
        label: "Add shimmer dependency",
        code: "dependencies:\n  shimmer: ^3.0.0",
      },
      {
        id: "pkg-shimmer-setup",
        language: "dart",
        label: "Shimmer usage",
        code: "Shimmer.fromColors(\n  baseColor: Colors.grey[300]!,\n  highlightColor: Colors.grey[100]!,\n  child: Container(width: 200, height: 16, color: Colors.white),\n)",
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: ["shimmer", "skeleton", "loading", "animation", "ui"],
    difficulty: "beginner",
  },
  {
    id: "pkg-lottie",
    title: "lottie — Lottie Animations",
    category: "packages",
    summary:
      "Lottie provides support for playing Lottie animations from assets or network URLs in Flutter.",
    content:
      "Lottie provides support for playing Lottie animations from assets or network URLs in Flutter.",
    codeSnippets: [
      {
        id: "pkg-lottie-deps",
        language: "yaml",
        label: "Add lottie dependency",
        code: "dependencies:\n  lottie: ^3.0.0",
      },
      {
        id: "pkg-lottie-setup",
        language: "dart",
        label: "Lottie usage",
        code: "Lottie.asset('assets/animation.json')\nLottie.network('https://assets.lottiefiles.com/animation.json')",
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: ["lottie", "animation", "json animation", "ui", "motion"],
    difficulty: "beginner",
  },
  {
    id: "pkg-flutter-screenutil",
    title: "flutter_screenutil — Responsive UI",
    category: "packages",
    summary:
      "flutter_screenutil provides responsive UI utilities with ScreenUtilInit, .w/.h/.sp extensions for responsive width, height, and font sizing.",
    content:
      "flutter_screenutil provides responsive UI utilities with ScreenUtilInit, .w/.h/.sp extensions for responsive width, height, and font sizing.",
    codeSnippets: [
      {
        id: "pkg-flutter-screenutil-deps",
        language: "yaml",
        label: "Add flutter_screenutil dependency",
        code: "dependencies:\n  flutter_screenutil: ^5.9.0",
      },
      {
        id: "pkg-flutter-screenutil-setup",
        language: "dart",
        label: "flutter_screenutil usage",
        code: "// Initialize\nScreenUtilInit(\n  designSize: const Size(375, 812), // iPhone X design size\n  builder: (_, child) => MaterialApp(home: child!),\n)\n\n// Use\nContainer(\n  width: 150.w,    // responsive width\n  height: 80.h,    // responsive height\n  child: Text('Hello', style: TextStyle(fontSize: 14.sp)),\n)",
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: ["flutter_screenutil", "responsive", "screen", "ui", "sizing"],
    difficulty: "beginner",
  },
  {
    id: "pkg-google-fonts",
    title: "google_fonts — 1000+ Google Fonts",
    category: "packages",
    summary:
      "google_fonts provides access to over 1000 Google Fonts for Flutter, usable as inline styles or global theme text styles.",
    content:
      "google_fonts provides access to over 1000 Google Fonts for Flutter, usable as inline styles or global theme text styles.",
    codeSnippets: [
      {
        id: "pkg-google-fonts-deps",
        language: "yaml",
        label: "Add google_fonts dependency",
        code: "dependencies:\n  google_fonts: ^6.2.0",
      },
      {
        id: "pkg-google-fonts-setup",
        language: "dart",
        label: "google_fonts usage",
        code: "Text(\n  'Hello Flutter',\n  style: GoogleFonts.poppins(\n    fontSize: 18,\n    fontWeight: FontWeight.w600,\n  ),\n)\n\n// As theme\nThemeData(\n  textTheme: GoogleFonts.robotoTextTheme(),\n)",
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: ["google_fonts", "fonts", "typography", "text style", "ui"],
    difficulty: "beginner",
  },
  {
    id: "pkg-permission-handler",
    title: "permission_handler — Runtime Permissions",
    category: "packages",
    summary:
      "permission_handler provides a cross-platform API for requesting and checking runtime permissions for camera, microphone, photos, location, and more.",
    content:
      "permission_handler provides a cross-platform API for requesting and checking runtime permissions for camera, microphone, photos, location, and more.",
    codeSnippets: [
      {
        id: "pkg-permission-handler-deps",
        language: "yaml",
        label: "Add permission_handler dependency",
        code: "dependencies:\n  permission_handler: ^11.3.0",
      },
      {
        id: "pkg-permission-handler-setup",
        language: "dart",
        label: "permission_handler usage",
        code: "// Request single permission\nfinal status = await Permission.camera.request();\nif (status.isGranted) {\n  openCamera();\n}\n\n// Request multiple\nfinal statuses = await [\n  Permission.camera,\n  Permission.microphone,\n  Permission.photos,\n].request();\n\n// Check status\nif (await Permission.location.isGranted) { ... }\nif (await Permission.location.isDenied) { ... }\nif (await Permission.location.isPermanentlyDenied) {\n  openAppSettings();\n}",
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: ["permission_handler", "permission", "runtime", "camera", "location", "device"],
    difficulty: "intermediate",
  },
  {
    id: "pkg-image-picker",
    title: "image_picker — Pick Images/Videos",
    category: "packages",
    summary:
      "image_picker provides cross-platform support for picking images and videos from the gallery or camera.",
    content:
      "image_picker provides cross-platform support for picking images and videos from the gallery or camera.",
    codeSnippets: [
      {
        id: "pkg-image-picker-deps",
        language: "yaml",
        label: "Add image_picker dependency",
        code: "dependencies:\n  image_picker: ^1.1.0",
      },
      {
        id: "pkg-image-picker-setup",
        language: "dart",
        label: "image_picker usage",
        code: "final picker = ImagePicker();\n\n// Pick from gallery\nfinal XFile? image = await picker.pickImage(\n  source: ImageSource.gallery,\n  maxWidth: 1920,\n  maxHeight: 1080,\n  imageQuality: 85,\n);\n\n// Take photo\nfinal XFile? photo = await picker.pickImage(source: ImageSource.camera);\n\nif (image != null) {\n  final file = File(image.path);\n  // use file...\n}",
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: ["image_picker", "image", "camera", "gallery", "photo", "device"],
    difficulty: "beginner",
  },
  {
    id: "pkg-path-provider",
    title: "path_provider — File System Paths",
    category: "packages",
    summary:
      "path_provider provides platform-specific file system paths for temporary, documents, support, and external storage directories.",
    content:
      "path_provider provides platform-specific file system paths for temporary, documents, support, and external storage directories.",
    codeSnippets: [
      {
        id: "pkg-path-provider-deps",
        language: "yaml",
        label: "Add path_provider dependency",
        code: "dependencies:\n  path_provider: ^2.1.0",
      },
      {
        id: "pkg-path-provider-setup",
        language: "dart",
        label: "path_provider usage",
        code: "import 'package:path_provider/path_provider.dart';\n\nfinal tempDir = await getTemporaryDirectory();\nfinal appDocDir = await getApplicationDocumentsDirectory();\nfinal extDir = await getExternalStorageDirectory(); // Android only\nfinal supportDir = await getApplicationSupportDirectory();\n\n// Common usage\nfinal filePath = '${appDocDir.path}/user_data.json';\nfinal file = File(filePath);\nawait file.writeAsString(jsonEncode(data));",
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: ["path_provider", "file", "directory", "storage", "device"],
    difficulty: "beginner",
  },
  {
    id: "pkg-connectivity-plus",
    title: "connectivity_plus — Network Status",
    category: "packages",
    summary:
      "connectivity_plus provides cross-platform network connectivity status checking and listening for network changes.",
    content:
      "connectivity_plus provides cross-platform network connectivity status checking and listening for network changes.",
    codeSnippets: [
      {
        id: "pkg-connectivity-plus-deps",
        language: "yaml",
        label: "Add connectivity_plus dependency",
        code: "dependencies:\n  connectivity_plus: ^6.0.0",
      },
      {
        id: "pkg-connectivity-plus-setup",
        language: "dart",
        label: "connectivity_plus usage",
        code: "final connectivity = Connectivity();\n\n// Check current\nfinal result = await connectivity.checkConnectivity();\nif (result.contains(ConnectivityResult.none)) {\n  showNoInternetDialog();\n}\n\n// Listen to changes\nconnectivity.onConnectivityChanged.listen((results) {\n  final isOnline = !results.contains(ConnectivityResult.none);\n  updateNetworkStatus(isOnline);\n});",
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: ["connectivity_plus", "network", "internet", "status", "device"],
    difficulty: "beginner",
  },
  {
    id: "pkg-url-launcher",
    title: "url_launcher — Open URLs, Emails, Phone",
    category: "packages",
    summary:
      "url_launcher provides cross-platform support for opening URLs, emails, phone calls, and SMS in Flutter.",
    content:
      "url_launcher provides cross-platform support for opening URLs, emails, phone calls, and SMS in Flutter.",
    codeSnippets: [
      {
        id: "pkg-url-launcher-deps",
        language: "yaml",
        label: "Add url_launcher dependency",
        code: "dependencies:\n  url_launcher: ^6.3.0",
      },
      {
        id: "pkg-url-launcher-setup",
        language: "dart",
        label: "url_launcher usage",
        code: "import 'package:url_launcher/url_launcher.dart';\n\nawait launchUrl(Uri.parse('https://flutter.dev'));\nawait launchUrl(Uri.parse('mailto:test@example.com?subject=Hello'));\nawait launchUrl(Uri.parse('tel:+201234567890'));\nawait launchUrl(Uri.parse('sms:+201234567890'));",
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: ["url_launcher", "url", "email", "phone", "sms", "device"],
    difficulty: "beginner",
  },
  {
    id: "pkg-share-plus",
    title: "share_plus — Share Content",
    category: "packages",
    summary:
      "share_plus provides cross-platform support for sharing text and files from Flutter apps.",
    content:
      "share_plus provides cross-platform support for sharing text and files from Flutter apps.",
    codeSnippets: [
      {
        id: "pkg-share-plus-deps",
        language: "yaml",
        label: "Add share_plus dependency",
        code: "dependencies:\n  share_plus: ^9.0.0",
      },
      {
        id: "pkg-share-plus-setup",
        language: "dart",
        label: "share_plus usage",
        code: "await Share.share('Check out Flutter: https://flutter.dev');\nawait Share.shareXFiles([XFile('/path/to/image.png')], text: 'My photo');",
      },
    ],
    relatedWeeks: [19, 20, 21, 22],
    tags: ["share_plus", "share", "content", "social", "device"],
    difficulty: "beginner",
  },
  {
    id: "pkg-intl",
    title: "intl — Internationalization & Date Formatting",
    category: "packages",
    summary:
      "intl provides internationalization and localization utilities, including date formatting, number formatting, and plural/gender support.",
    content:
      "intl provides internationalization and localization utilities, including date formatting, number formatting, and plural/gender support.",
    codeSnippets: [
      {
        id: "pkg-intl-deps",
        language: "yaml",
        label: "Add intl dependency",
        code: "dependencies:\n  intl: ^0.19.0",
      },
      {
        id: "pkg-intl-setup",
        language: "dart",
        label: "intl usage",
        code: "import 'package:intl/intl.dart';\n\n// Date formatting\nDateFormat('yyyy-MM-dd').format(DateTime.now());         // 2025-12-31\nDateFormat('MMMM d, yyyy').format(DateTime.now());       // December 31, 2025\nDateFormat('hh:mm a').format(DateTime.now());            // 10:30 AM\nDateFormat.yMd('ar').format(DateTime.now());             // Arabic locale\n\n// Number formatting\nNumberFormat.currency(locale: 'ar', symbol: 'EGP').format(1250.5);\nNumberFormat.compact().format(1500000);  // 1.5M\nNumberFormat('#,##0.00').format(1234567.89);             // 1,234,567.89",
      },
    ],
    relatedWeeks: [23, 24, 25],
    tags: ["intl", "internationalization", "i18n", "date", "number", "format"],
    difficulty: "beginner",
  },
  {
    id: "pkg-logger",
    title: "logger — Beautiful Console Logging",
    category: "packages",
    summary:
      "logger provides beautiful console logging with customizable output, log levels, and PrettyPrinter for formatted output.",
    content:
      "logger provides beautiful console logging with customizable output, log levels, and PrettyPrinter for formatted output.",
    codeSnippets: [
      {
        id: "pkg-logger-deps",
        language: "yaml",
        label: "Add logger dependency",
        code: "dependencies:\n  logger: ^2.4.0",
      },
      {
        id: "pkg-logger-setup",
        language: "dart",
        label: "logger usage",
        code: "final log = Logger();\n\nlog.d('Debug message');\nlog.i('Info message');\nlog.w('Warning message');\nlog.e('Error message', error: exception, stackTrace: stack);\nlog.f('Fatal error');\n\n// Custom output\nfinal log = Logger(\n  printer: PrettyPrinter(\n    methodCount: 2,\n    errorMethodCount: 8,\n    lineLength: 120,\n    colors: true,\n    printEmojis: true,\n  ),\n);",
      },
    ],
    relatedWeeks: [23, 24, 25],
    tags: ["logger", "logging", "debug", "console", "utility"],
    difficulty: "beginner",
  },
  {
    id: "pkg-equatable",
    title: "equatable — Value Equality",
    category: "packages",
    summary:
      "Equatable provides value-based equality comparisons for Dart objects, eliminating the need to override == and hashCode.",
    content:
      "Equatable provides value-based equality comparisons for Dart objects, eliminating the need to override == and hashCode.",
    codeSnippets: [
      {
        id: "pkg-equatable-deps",
        language: "yaml",
        label: "Add equatable dependency",
        code: "dependencies:\n  equatable: ^2.0.5",
      },
      {
        id: "pkg-equatable-setup",
        language: "dart",
        label: "Equatable usage",
        code: "class User extends Equatable {\n  final String name;\n  final int age;\n\n  const User({required this.name, required this.age});\n\n  @override\n  List<Object?> get props => [name, age]; // equality based on these fields\n}\n\n// Now == works correctly for state comparison\nUser('Mustafa', 25) == User('Mustafa', 25); // true",
      },
    ],
    relatedWeeks: [23, 24, 25],
    tags: ["equatable", "equality", "comparison", "value", "utility"],
    difficulty: "beginner",
  },
  {
    id: "pkg-dartz",
    title: "dartz — Functional Programming (Either)",
    category: "packages",
    summary:
      "dartz provides functional programming utilities in Dart, including Either for error handling without exceptions.",
    content:
      "dartz provides functional programming utilities in Dart, including Either for error handling without exceptions.",
    codeSnippets: [
      {
        id: "pkg-dartz-deps",
        language: "yaml",
        label: "Add dartz dependency",
        code: "dependencies:\n  dartz: ^0.10.1",
      },
      {
        id: "pkg-dartz-setup",
        language: "dart",
        label: "dartz usage",
        code: "import 'package:dartz/dartz.dart';\n\n// Return Either failure or success\nFuture<Either<Failure, User>> getUser(int id) async {\n  try {\n    final user = await api.fetchUser(id);\n    return Right(user);\n  } catch (e) {\n    return Left(NetworkFailure(e.toString()));\n  }\n}\n\n// Usage\nfinal result = await getUser(1);\nresult.fold(\n  (failure) => showError(failure.message),\n  (user) => showUser(user),\n);",
      },
    ],
    relatedWeeks: [23, 24, 25],
    tags: ["dartz", "functional", "either", "error handling", "utility"],
    difficulty: "advanced",
  },
  {
    id: "pkg-flutter-secure-storage",
    title: "flutter_secure_storage — Secure Key-Value Storage",
    category: "packages",
    summary:
      "flutter_secure_storage provides encrypted key-value storage for sensitive data like auth tokens, using platform-specific secure enclaves.",
    content:
      "flutter_secure_storage provides encrypted key-value storage for sensitive data like auth tokens, using platform-specific secure enclaves.",
    codeSnippets: [
      {
        id: "pkg-secure-storage-deps",
        language: "yaml",
        label: "Add flutter_secure_storage dependency",
        code: "dependencies:\n  flutter_secure_storage: ^9.2.0",
      },
      {
        id: "pkg-secure-storage-setup",
        language: "dart",
        label: "flutter_secure_storage usage",
        code: "final storage = const FlutterSecureStorage();\n\n// Write (encrypted on device)\nawait storage.write(key: 'auth_token', value: 'Bearer abc123');\n\n// Read\nfinal token = await storage.read(key: 'auth_token');\n\n// Delete\nawait storage.delete(key: 'auth_token');\nawait storage.deleteAll();",
      },
    ],
    relatedWeeks: [17, 18],
    tags: ["flutter_secure_storage", "secure", "encrypted", "storage", "auth"],
    difficulty: "intermediate",
  },
  {
    id: "pkg-mocktail",
    title: "mocktail — Mocking Library",
    category: "packages",
    summary:
      "mocktail is a mocking library for Dart tests, providing Mock class, when/verify for stubbing and verifying interactions.",
    content:
      "mocktail is a mocking library for Dart tests, providing Mock class, when/verify for stubbing and verifying interactions.",
    codeSnippets: [
      {
        id: "pkg-mocktail-deps",
        language: "yaml",
        label: "Add mocktail dependency",
        code: "dev_dependencies:\n  mocktail: ^1.0.0",
      },
      {
        id: "pkg-mocktail-setup",
        language: "dart",
        label: "mocktail usage",
        code: "import 'package:mocktail/mocktail.dart';\nimport 'package:test/test.dart';\n\nclass MockApiService extends Mock implements ApiService {}\n\nvoid main() {\n  final mockApi = MockApiService();\n\n  test('returns users', () async {\n    when(() => mockApi.getUsers())\n        .thenAnswer((_) async => [User(id: 1, name: 'Test')]);\n\n    final result = await mockApi.getUsers();\n    expect(result.length, 1);\n    verify(() => mockApi.getUsers()).called(1);\n  });\n}",
      },
    ],
    relatedWeeks: [26, 27],
    tags: ["mocktail", "mock", "test", "testing", "stub", "verify"],
    difficulty: "intermediate",
  },
  {
    id: "pkg-golden-toolkit",
    title: "golden_toolkit — Golden File Tests",
    category: "packages",
    summary:
      "golden_toolkit provides golden file testing for Flutter widgets, enabling visual regression testing with screenshot comparisons.",
    content:
      "golden_toolkit provides golden file testing for Flutter widgets, enabling visual regression testing with screenshot comparisons.",
    codeSnippets: [
      {
        id: "pkg-golden-toolkit-deps",
        language: "yaml",
        label: "Add golden_toolkit dependency",
        code: "dev_dependencies:\n  golden_toolkit: ^0.15.0",
      },
      {
        id: "pkg-golden-toolkit-setup",
        language: "dart",
        label: "golden_toolkit usage",
        code: "testGoldens('Counter renders correctly', (tester) async {\n  await tester.pumpWidgetBuilder(const CounterWidget());\n  await screenMatchesGolden(tester, 'counter_widget');\n});",
      },
    ],
    relatedWeeks: [26, 27],
    tags: ["golden_toolkit", "golden", "test", "visual", "regression", "screenshot"],
    difficulty: "intermediate",
  },
];
