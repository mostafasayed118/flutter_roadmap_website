# Essential Flutter Packages
> Source: https://pub.dev | Updated: 2026

---

## Overview

Flutter's package ecosystem on **pub.dev** has thousands of packages. This document covers the most essential, production-proven packages every Flutter developer should know — covering networking, state management, navigation, storage, UI, and utilities.

---

## How to Use Packages

### 1. Add to pubspec.yaml

```yaml
dependencies:
  package_name: ^1.0.0   # caret = compatible upgrades
  another_package: any    # any version

dev_dependencies:
  build_runner: ^2.4.0    # code generation tool
```

### 2. Install

```bash
flutter pub get         # install
flutter pub upgrade     # upgrade to latest compatible
flutter pub outdated    # see what's outdated
```

### 3. Import and use

```dart
import 'package:package_name/package_name.dart';
```

---

## Networking

### dio — Powerful HTTP Client

> `pub.dev/packages/dio` | ⭐ Most popular HTTP client for Flutter

```yaml
dependencies:
  dio: ^5.9.0
```

**Features:** Interceptors, Global config, FormData, File upload/download, Request cancellation, Timeout, Retry, Custom adapters.

```dart
import 'package:dio/dio.dart';

// Basic GET
final dio = Dio();
final response = await dio.get('https://api.example.com/users');
print(response.data);

// POST with JSON
final response = await dio.post(
  '/users',
  data: {'name': 'Mustafa', 'email': 'test@test.com'},
);

// With base options (global config)
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
      options.headers['Authorization'] = 'Bearer $token';
      return handler.next(options);
    },
    onResponse: (response, handler) {
      // log or transform response
      return handler.next(response);
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
  'file': await MultipartFile.fromFile('./avatar.png', filename: 'avatar.png'),
});
await dio.post('/upload', data: formData);

// Download file
await dio.download(
  'https://example.com/file.pdf',
  '/storage/file.pdf',
  onReceiveProgress: (received, total) {
    print('${(received / total * 100).toStringAsFixed(0)}%');
  },
);

// Cancel request
final cancelToken = CancelToken();
dio.get('/data', cancelToken: cancelToken);
cancelToken.cancel('Cancelled by user');
```

### http — Simple HTTP Client (Official Dart)

```yaml
dependencies:
  http: ^1.2.0
```

```dart
import 'package:http/http.dart' as http;
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
);
```

---

## Navigation

### go_router — Official Flutter Navigation Package

> `pub.dev/packages/go_router` | ✅ Officially maintained by Flutter team

```yaml
dependencies:
  go_router: ^14.0.0
```

**Features:** URL-based routing, deep linking, nested navigation, redirect guards, ShellRoute for persistent navigation bars, path + query parameters.

```dart
import 'package:go_router/go_router.dart';

// Define router
final GoRouter router = GoRouter(
  initialLocation: '/',
  debugLogDiagnostics: true,
  redirect: (context, state) {
    final isLoggedIn = context.read<AuthCubit>().state.isLoggedIn;
    final goingToLogin = state.matchedLocation == '/login';
    if (!isLoggedIn && !goingToLogin) return '/login';
    if (isLoggedIn && goingToLogin) return '/home';
    return null;
  },
  routes: [
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginPage(),
    ),
    ShellRoute(
      builder: (context, state, child) {
        return ScaffoldWithBottomNav(child: child);
      },
      routes: [
        GoRoute(
          path: '/home',
          builder: (context, state) => const HomePage(),
        ),
        GoRoute(
          path: '/profile',
          builder: (context, state) => const ProfilePage(),
          routes: [
            GoRoute(
              path: 'edit',
              builder: (context, state) => const EditProfilePage(),
            ),
          ],
        ),
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
);

// Register with MaterialApp
MaterialApp.router(
  routerConfig: router,
)

// Navigation
context.go('/home');                    // replace current
context.push('/profile');              // push on stack
context.pushReplacement('/login');     // replace top
context.pop();                         // go back
context.goNamed('profile');            // named route

// With parameters
context.go('/products/42?tab=reviews');

// Pass extra data (not in URL)
context.push('/details', extra: myObject);
// In builder:
final obj = state.extra as MyObject;
```

---

## State Management

### provider — Simple & Beginner-Friendly

> `pub.dev/packages/provider` | Recommended for simple apps

```yaml
dependencies:
  provider: ^6.1.0
```

```dart
// 1. Model
class UserModel extends ChangeNotifier {
  String _name = '';
  String get name => _name;

  void updateName(String newName) {
    _name = newName;
    notifyListeners();
  }
}

// 2. Provide
MultiProvider(
  providers: [
    ChangeNotifierProvider(create: (_) => UserModel()),
    Provider(create: (_) => ApiService()),
    FutureProvider<Config>(
      create: (_) => Config.load(),
      initialData: Config.defaults,
    ),
  ],
  child: const MyApp(),
)

// 3. Consume
Consumer<UserModel>(
  builder: (context, user, child) => Text(user.name),
)

// Or with extension
context.watch<UserModel>().name    // rebuilds on change
context.read<UserModel>().updateName('Mustafa')  // no rebuild
context.select<UserModel, String>((u) => u.name) // selective rebuild
```

### flutter_bloc — See dedicated Bloc/Cubit docs

```yaml
dependencies:
  flutter_bloc: ^9.0.0
```

### riverpod — Modern, Compile-Safe State Management

```yaml
dependencies:
  flutter_riverpod: ^2.5.0
  riverpod_annotation: ^2.3.0
dev_dependencies:
  riverpod_generator: ^2.4.0
  build_runner: ^2.4.0
```

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

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

// 3. Consume (extend ConsumerWidget or use Consumer)
class MyWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    return Text('$count');
  }
}

// 4. Read and call
ref.read(counterProvider.notifier).increment();
```

### get_it — Dependency Injection (Service Locator)

```yaml
dependencies:
  get_it: ^9.0.0
```

```dart
import 'package:get_it/get_it.dart';

final getIt = GetIt.instance;

// Register (in main or setup file)
void setupDI() {
  getIt.registerSingleton<ApiService>(ApiService());
  getIt.registerLazySingleton<AuthRepository>(() => AuthRepository(getIt()));
  getIt.registerFactory<LoginCubit>(() => LoginCubit(getIt()));
}

// Use anywhere (no context needed)
final api = getIt<ApiService>();
final cubit = getIt<LoginCubit>();
```

---

## Local Storage & Persistence

### shared_preferences — Key-Value Store

> `pub.dev/packages/shared_preferences` | Simple persistent storage

```yaml
dependencies:
  shared_preferences: ^2.3.0
```

```dart
import 'package:shared_preferences/shared_preferences.dart';

final prefs = await SharedPreferences.getInstance();

// Write
await prefs.setString('token', 'abc123');
await prefs.setInt('count', 42);
await prefs.setBool('isLoggedIn', true);
await prefs.setStringList('tags', ['flutter', 'dart']);

// Read
final token = prefs.getString('token') ?? '';
final count = prefs.getInt('count') ?? 0;
final isLoggedIn = prefs.getBool('isLoggedIn') ?? false;

// Delete
await prefs.remove('token');
await prefs.clear(); // clear all
```

### hive — Fast NoSQL Database

> `pub.dev/packages/hive_ce_flutter` | Blazing-fast key-value + typed boxes

```yaml
dependencies:
  hive_ce_flutter: ^2.0.0
dev_dependencies:
  hive_ce_generator: ^2.0.0
  build_runner: ^2.4.0
```

```dart
import 'package:hive_ce_flutter/hive_flutter.dart';

// Initialize
await Hive.initFlutter();

// Type adapter for custom objects
@HiveType(typeId: 0)
class User extends HiveObject {
  @HiveField(0) String name;
  @HiveField(1) int age;
  User({required this.name, required this.age});
}

Hive.registerAdapter(UserAdapter());
final box = await Hive.openBox<User>('users');

// CRUD
box.put('user1', User(name: 'Mustafa', age: 25));
final user = box.get('user1');
box.delete('user1');
box.values.toList(); // all values

// React to changes
ValueListenableBuilder(
  valueListenable: box.listenable(),
  builder: (context, box, _) => ListView.builder(
    itemCount: box.length,
    itemBuilder: (_, i) => Text(box.getAt(i)!.name),
  ),
)
```

### sqflite — SQLite Database

> `pub.dev/packages/sqflite` | Full relational SQLite for Flutter

```yaml
dependencies:
  sqflite: ^2.3.0
  path: ^1.9.0
```

```dart
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

// Open database
final db = await openDatabase(
  join(await getDatabasesPath(), 'app.db'),
  version: 1,
  onCreate: (db, version) async {
    await db.execute('''
      CREATE TABLE tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        isDone INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL
      )
    ''');
  },
);

// Insert
await db.insert('tasks', {
  'title': 'Learn Flutter',
  'isDone': 0,
  'createdAt': DateTime.now().toIso8601String(),
});

// Query
final tasks = await db.query('tasks', orderBy: 'createdAt DESC');

// Update
await db.update(
  'tasks',
  {'isDone': 1},
  where: 'id = ?',
  whereArgs: [taskId],
);

// Delete
await db.delete('tasks', where: 'id = ?', whereArgs: [id]);

// Raw query
final result = await db.rawQuery(
  'SELECT * FROM tasks WHERE isDone = ? ORDER BY createdAt',
  [0],
);
```

---

## JSON & Serialization

### json_serializable — Code Generation for Models

```yaml
dependencies:
  json_annotation: ^4.8.0
dev_dependencies:
  json_serializable: ^6.7.0
  build_runner: ^2.4.0
```

```dart
import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart'; // generated file

@JsonSerializable()
class User {
  final int id;
  final String name;
  @JsonKey(name: 'email_address')
  final String email;
  final DateTime? createdAt;

  const User({
    required this.id,
    required this.name,
    required this.email,
    this.createdAt,
  });

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}
```

```bash
dart run build_runner build          # generate once
dart run build_runner watch          # watch for changes
```

### freezed — Immutable Data Classes + Union Types

> `pub.dev/packages/freezed` | The gold standard for data classes in Dart

```yaml
dependencies:
  freezed_annotation: ^3.0.0
dev_dependencies:
  freezed: ^3.0.0
  build_runner: ^2.4.0
```

```dart
import 'package:freezed_annotation/freezed_annotation.dart';

part 'user.freezed.dart';
part 'user.g.dart';  // if using json_serializable

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
  error: (msg) => Text('Error: $msg'),
)
```

---

## UI Enhancement Packages

### cached_network_image — Image Caching

```yaml
dependencies:
  cached_network_image: ^3.3.0
```

```dart
CachedNetworkImage(
  imageUrl: 'https://example.com/photo.jpg',
  placeholder: (context, url) => const CircularProgressIndicator(),
  errorWidget: (context, url, error) => const Icon(Icons.error),
  fit: BoxFit.cover,
  width: 200,
  height: 200,
)
```

### flutter_svg — SVG Support

```yaml
dependencies:
  flutter_svg: ^2.0.0
```

```dart
SvgPicture.asset('assets/icon.svg', width: 48, height: 48)
SvgPicture.network('https://example.com/logo.svg')
```

### shimmer — Loading Skeleton Effect

```yaml
dependencies:
  shimmer: ^3.0.0
```

```dart
Shimmer.fromColors(
  baseColor: Colors.grey[300]!,
  highlightColor: Colors.grey[100]!,
  child: Container(width: 200, height: 16, color: Colors.white),
)
```

### lottie — Lottie Animations

```yaml
dependencies:
  lottie: ^3.0.0
```

```dart
Lottie.asset('assets/animation.json')
Lottie.network('https://assets.lottiefiles.com/animation.json')
```

### flutter_screenutil — Responsive UI

```yaml
dependencies:
  flutter_screenutil: ^5.9.0
```

```dart
// Initialize
ScreenUtilInit(
  designSize: const Size(375, 812), // iPhone X design size
  builder: (_, child) => MaterialApp(home: child!),
)

// Use
Container(
  width: 150.w,    // responsive width
  height: 80.h,    // responsive height
  child: Text('Hello', style: TextStyle(fontSize: 14.sp)),
)
```

### google_fonts — 1000+ Google Fonts

```yaml
dependencies:
  google_fonts: ^6.2.0
```

```dart
Text(
  'Hello Flutter',
  style: GoogleFonts.poppins(
    fontSize: 18,
    fontWeight: FontWeight.w600,
  ),
)

// As theme
ThemeData(
  textTheme: GoogleFonts.robotoTextTheme(),
)
```

---

## Device & Platform Packages

### permission_handler — Runtime Permissions

```yaml
dependencies:
  permission_handler: ^11.3.0
```

```dart
// Request single permission
final status = await Permission.camera.request();
if (status.isGranted) {
  openCamera();
}

// Request multiple
final statuses = await [
  Permission.camera,
  Permission.microphone,
  Permission.photos,
].request();

// Check status
if (await Permission.location.isGranted) { ... }
if (await Permission.location.isDenied) { ... }
if (await Permission.location.isPermanentlyDenied) {
  openAppSettings();
}
```

### image_picker — Pick Images/Videos

```yaml
dependencies:
  image_picker: ^1.1.0
```

```dart
final picker = ImagePicker();

// Pick from gallery
final XFile? image = await picker.pickImage(
  source: ImageSource.gallery,
  maxWidth: 1920,
  maxHeight: 1080,
  imageQuality: 85,
);

// Take photo
final XFile? photo = await picker.pickImage(source: ImageSource.camera);

if (image != null) {
  final file = File(image.path);
  // use file...
}
```

### path_provider — File System Paths

```yaml
dependencies:
  path_provider: ^2.1.0
```

```dart
import 'package:path_provider/path_provider.dart';

final tempDir = await getTemporaryDirectory();
final appDocDir = await getApplicationDocumentsDirectory();
final extDir = await getExternalStorageDirectory(); // Android only
final supportDir = await getApplicationSupportDirectory();

// Common usage
final filePath = '${appDocDir.path}/user_data.json';
final file = File(filePath);
await file.writeAsString(jsonEncode(data));
```

### connectivity_plus — Network Status

```yaml
dependencies:
  connectivity_plus: ^6.0.0
```

```dart
final connectivity = Connectivity();

// Check current
final result = await connectivity.checkConnectivity();
if (result.contains(ConnectivityResult.none)) {
  showNoInternetDialog();
}

// Listen to changes
connectivity.onConnectivityChanged.listen((results) {
  final isOnline = !results.contains(ConnectivityResult.none);
  updateNetworkStatus(isOnline);
});
```

### url_launcher — Open URLs, Emails, Phone

```yaml
dependencies:
  url_launcher: ^6.3.0
```

```dart
import 'package:url_launcher/url_launcher.dart';

await launchUrl(Uri.parse('https://flutter.dev'));
await launchUrl(Uri.parse('mailto:test@example.com?subject=Hello'));
await launchUrl(Uri.parse('tel:+201234567890'));
await launchUrl(Uri.parse('sms:+201234567890'));
```

### share_plus — Share Content

```yaml
dependencies:
  share_plus: ^9.0.0
```

```dart
await Share.share('Check out Flutter: https://flutter.dev');
await Share.shareXFiles([XFile('/path/to/image.png')], text: 'My photo');
```

---

## Utilities

### intl — Internationalization & Date Formatting

```yaml
dependencies:
  intl: ^0.19.0
```

```dart
import 'package:intl/intl.dart';

// Date formatting
DateFormat('yyyy-MM-dd').format(DateTime.now());         // 2025-12-31
DateFormat('MMMM d, yyyy').format(DateTime.now());       // December 31, 2025
DateFormat('hh:mm a').format(DateTime.now());            // 10:30 AM
DateFormat.yMd('ar').format(DateTime.now());             // Arabic locale

// Number formatting
NumberFormat.currency(locale: 'ar', symbol: 'EGP').format(1250.5);
NumberFormat.compact().format(1500000);  // 1.5M
NumberFormat('#,##0.00').format(1234567.89);             // 1,234,567.89
```

### logger — Beautiful Console Logging

```yaml
dependencies:
  logger: ^2.4.0
```

```dart
final log = Logger();

log.d('Debug message');
log.i('Info message');
log.w('Warning message');
log.e('Error message', error: exception, stackTrace: stack);
log.f('Fatal error');

// Custom output
final log = Logger(
  printer: PrettyPrinter(
    methodCount: 2,
    errorMethodCount: 8,
    lineLength: 120,
    colors: true,
    printEmojis: true,
  ),
);
```

### equatable — Value Equality

```yaml
dependencies:
  equatable: ^2.0.5
```

```dart
class User extends Equatable {
  final String name;
  final int age;

  const User({required this.name, required this.age});

  @override
  List<Object?> get props => [name, age]; // equality based on these fields
}

// Now == works correctly for state comparison
User('Mustafa', 25) == User('Mustafa', 25); // true
```

### dartz — Functional Programming (Either)

```yaml
dependencies:
  dartz: ^0.10.1
```

```dart
import 'package:dartz/dartz.dart';

// Return Either failure or success
Future<Either<Failure, User>> getUser(int id) async {
  try {
    final user = await api.fetchUser(id);
    return Right(user);
  } catch (e) {
    return Left(NetworkFailure(e.toString()));
  }
}

// Usage
final result = await getUser(1);
result.fold(
  (failure) => showError(failure.message),
  (user) => showUser(user),
);
```

### flutter_secure_storage — Secure Key-Value Storage

```yaml
dependencies:
  flutter_secure_storage: ^9.2.0
```

```dart
final storage = const FlutterSecureStorage();

// Write (encrypted on device)
await storage.write(key: 'auth_token', value: 'Bearer abc123');

// Read
final token = await storage.read(key: 'auth_token');

// Delete
await storage.delete(key: 'auth_token');
await storage.deleteAll();
```

---

## Testing Packages

### mocktail — Mocking Library

```yaml
dev_dependencies:
  mocktail: ^1.0.0
```

```dart
import 'package:mocktail/mocktail.dart';
import 'package:test/test.dart';

class MockApiService extends Mock implements ApiService {}

void main() {
  final mockApi = MockApiService();

  test('returns users', () async {
    when(() => mockApi.getUsers())
        .thenAnswer((_) async => [User(id: 1, name: 'Test')]);

    final result = await mockApi.getUsers();
    expect(result.length, 1);
    verify(() => mockApi.getUsers()).called(1);
  });
}
```

### golden_toolkit — Golden File Tests

```yaml
dev_dependencies:
  golden_toolkit: ^0.15.0
```

```dart
testGoldens('Counter renders correctly', (tester) async {
  await tester.pumpWidgetBuilder(const CounterWidget());
  await screenMatchesGolden(tester, 'counter_widget');
});
```

---

## Package Summary Table

| Package | Category | pub.dev |
|---------|----------|---------|
| `dio` | Networking | pub.dev/packages/dio |
| `http` | Networking | pub.dev/packages/http |
| `go_router` | Navigation | pub.dev/packages/go_router |
| `provider` | State | pub.dev/packages/provider |
| `flutter_bloc` | State | pub.dev/packages/flutter_bloc |
| `riverpod` | State | pub.dev/packages/flutter_riverpod |
| `get_it` | DI | pub.dev/packages/get_it |
| `shared_preferences` | Storage | pub.dev/packages/shared_preferences |
| `hive_ce_flutter` | Storage | pub.dev/packages/hive_ce_flutter |
| `sqflite` | Storage | pub.dev/packages/sqflite |
| `flutter_secure_storage` | Storage | pub.dev/packages/flutter_secure_storage |
| `json_serializable` | Serialization | pub.dev/packages/json_serializable |
| `freezed` | Models | pub.dev/packages/freezed |
| `equatable` | Equality | pub.dev/packages/equatable |
| `cached_network_image` | UI | pub.dev/packages/cached_network_image |
| `flutter_svg` | UI | pub.dev/packages/flutter_svg |
| `shimmer` | UI | pub.dev/packages/shimmer |
| `lottie` | UI | pub.dev/packages/lottie |
| `google_fonts` | UI | pub.dev/packages/google_fonts |
| `flutter_screenutil` | UI | pub.dev/packages/flutter_screenutil |
| `permission_handler` | Device | pub.dev/packages/permission_handler |
| `image_picker` | Device | pub.dev/packages/image_picker |
| `path_provider` | Device | pub.dev/packages/path_provider |
| `connectivity_plus` | Device | pub.dev/packages/connectivity_plus |
| `url_launcher` | Device | pub.dev/packages/url_launcher |
| `share_plus` | Device | pub.dev/packages/share_plus |
| `intl` | Utils | pub.dev/packages/intl |
| `logger` | Utils | pub.dev/packages/logger |
| `dartz` | Utils | pub.dev/packages/dartz |
| `mocktail` | Testing | pub.dev/packages/mocktail |
| `bloc_test` | Testing | pub.dev/packages/bloc_test |
