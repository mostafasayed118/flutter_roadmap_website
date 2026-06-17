# ⚡ Flutter Cheat Sheet
> Dart · Cubit/Bloc · Clean Architecture · Firebase · Deployment

---

## 🎯 DART QUICK REFERENCE

### Variables & Types
```dart
var name = 'Ali';          // type inferred
final name = 'Ali';        // runtime constant
const PI = 3.14;           // compile-time constant
dynamic x = 42;            // any type at runtime
int / double / num / String / bool
```

### Null Safety
```dart
String? name;              // nullable
String  name = 'Ali';      // non-nullable (default)
name?.length               // safe call → null if name is null
name ?? 'default'          // null coalescing
name!.length               // assert non-null (throws if null)
late String name;          // deferred init (not null, init later)
```

### Collections
```dart
// List
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
m.forEach((k,v) => print('$k: $v'));
```

### Functions
```dart
// Named params (required)
void greet({required String name}) {}

// Named params (optional)
void greet({String name = 'Ali'}) {}

// Arrow function
int add(int a, int b) => a + b;

// Higher-order
void run(Function() fn) => fn();

// Typedef
typedef Callback = void Function(String);
```

### OOP Quick Ref
```dart
class Animal {
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
class Duck extends Animal with Swimmable { Duck(super.name); }
```

### Async / Await
```dart
Future<String> fetchData() async {
  try {
    final result = await someApi.call();
    return result;
  } catch (e) {
    throw Exception('Failed: $e');
  }
}

// Parallel
final results = await Future.wait([fetchA(), fetchB()]);
```

### Streams
```dart
Stream<int> counter() async* {
  for (int i = 0; i < 5; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}

StreamController<int> ctrl = StreamController.broadcast();
ctrl.stream.listen((val) => print(val));
ctrl.add(42);
ctrl.close();
```

### Generics & Extensions
```dart
class Box<T> { T value; Box(this.value); }

extension StringExt on String {
  String get capitalize => '${this[0].toUpperCase()}${substring(1)}';
}

'hello'.capitalize;  // → 'Hello'
```

### Error Handling
```dart
class NetworkException implements Exception {
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
}
```

---

## 🐦 FLUTTER CORE WIDGETS

### App Shell
```dart
void main() => runApp(const MyApp());

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
)
```

### StatefulWidget Lifecycle
```dart
class MyWidget extends StatefulWidget {
  const MyWidget({super.key});
  @override State<MyWidget> createState() => _MyWidgetState();
}
class _MyWidgetState extends State<MyWidget> {
  @override void initState() { super.initState(); /* init */ }
  @override void didUpdateWidget(MyWidget old) { super.didUpdateWidget(old); }
  @override void dispose() { /* cleanup */ super.dispose(); }
  @override Widget build(BuildContext context) => Container();
}
```

### Common Widgets
| Widget | Key Props |
|--------|-----------|
| `Text` | `style: TextStyle(fontSize, fontWeight, color)` |
| `Container` | `width, height, padding, margin, decoration: BoxDecoration(color, borderRadius, boxShadow, gradient)` |
| `SizedBox` | `width, height` — spacing & sizing |
| `Image.network` | `url, fit: BoxFit.cover, errorBuilder, loadingBuilder` |
| `Image.asset` | `'assets/img.png', fit: BoxFit.cover` |
| `Icon` | `Icons.home, size, color` |
| `Card` | `elevation, shape, child` |
| `ElevatedButton` | `onPressed: () {}, child: Text('Click')` |
| `TextButton` | `onPressed: () {}, child: Text('Click')` |
| `OutlinedButton` | `onPressed: () {}, child: Text('Click')` |

---

## 📐 LAYOUT WIDGETS

### Column / Row
```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,   // vertical axis
  crossAxisAlignment: CrossAxisAlignment.start,  // horizontal axis
  children: [ Widget1(), Widget2() ],
)
// Row: mainAxis = horizontal, crossAxis = vertical
```

### Stack & Positioning
```dart
Stack(
  alignment: Alignment.center,
  children: [
    BackgroundWidget(),
    Positioned(top: 10, right: 10, child: BadgeWidget()),
  ],
)
```

### Flex — Expanded / Flexible
```dart
Row(children: [
  Expanded(flex: 2, child: RedBox()),   // takes 2/3 space
  Flexible(flex: 1, child: BlueBox()),  // takes 1/3, can be smaller
])
```

### Scrollable Widgets
```dart
// List (lazy, efficient)
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
])
```

### Input Widgets
```dart
final _ctrl = TextEditingController();
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
if (_formKey.currentState!.validate()) { /* proceed */ }
```

---

## 🗺 NAVIGATION (go_router)

### Setup
```dart
final router = GoRouter(
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
MaterialApp.router(routerConfig: router)
```

### Navigation Methods
```dart
context.go('/home');                     // replace stack
context.push('/detail/42');             // push onto stack
context.pop();                           // go back
context.go('/detail/42?tab=info');       // query params
state.uri.queryParameters['tab'];        // read query param
```

### Dialogs & Sheets
```dart
// Alert dialog
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
);
```

---

## 🎨 THEMING & RESPONSIVE

### Theme
```dart
ThemeData(
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
Theme.of(context).textTheme.headlineLarge
```

### Responsive
```dart
// Screen size
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
)
```

### Animations
```dart
// Implicit (automatic)
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
Hero(tag: 'product-1', child: Image.network(url))  // same tag on both screens
```

---

## 🧊 STATE MANAGEMENT — CUBIT / BLOC

### Cubit Setup
```dart
// State (use sealed class)
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
], child: MyApp())
```

### Consuming Cubit
```dart
// Rebuild UI on state change
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
context.watch<CounterCubit>().state;
```

### copyWith Pattern with freezed
```dart
@freezed
class UserState with _$UserState {
  const factory UserState({
    required String name,
    required bool isLoading,
    String? error,
  }) = _UserState;
}

// Usage
emit(state.copyWith(isLoading: true));
emit(state.copyWith(isLoading: false, name: 'Ali'));
```

### Bloc (Event-Driven)
```dart
// Events
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
}
```

### Global Observer
```dart
class AppBlocObserver extends BlocObserver {
  @override void onChange(BlocBase b, Change c) { super.onChange(b, c); print(c); }
  @override void onError(BlocBase b, Object e, StackTrace s) { super.onError(b, e, s); }
}
// In main:
Bloc.observer = AppBlocObserver();
```

### Dependency Injection (get_it + injectable)
```dart
final getIt = GetIt.instance;

@InjectableInit()
void configureDependencies() => getIt.init();

@injectable  class UserRepository { ... }
@singleton   class AuthService { ... }
@lazySingleton class ApiClient { ... }

// Usage
getIt<UserRepository>()
```

---

## 🌐 NETWORKING (DIO)

### Setup
```dart
final dio = Dio(BaseOptions(
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
));
```

### HTTP Methods
```dart
// GET
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
await dio.post('/upload', data: form);
```

### JSON Serialization (json_serializable)
```dart
@JsonSerializable()
class User {
  final int id;
  @JsonKey(name: 'first_name')
  final String firstName;
  
  const User({required this.id, required this.firstName});
  
  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}
// Generate: dart run build_runner build
```

### Error Handling (Either)
```dart
// Using dartz
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
);
```

---

## 💾 LOCAL STORAGE

### SharedPreferences
```dart
final prefs = await SharedPreferences.getInstance();

await prefs.setString('token', 'abc123');
await prefs.setBool('isDark', true);
await prefs.setInt('count', 5);

prefs.getString('token');    // → 'abc123' | null
prefs.getBool('isDark');     // → true | null
await prefs.remove('token');
await prefs.clear();
```

### Hive
```dart
// Setup (main)
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
}
```

### flutter_secure_storage
```dart
const storage = FlutterSecureStorage();
await storage.write(key: 'token', value: 'Bearer xyz');
final token = await storage.read(key: 'token');
await storage.delete(key: 'token');
await storage.deleteAll();
```

### SQLite (sqflite)
```dart
final db = await openDatabase('app.db', version: 1,
  onCreate: (db, version) async {
    await db.execute('''CREATE TABLE users (
      id INTEGER PRIMARY KEY, name TEXT, email TEXT)''');
  },
);

// CRUD
await db.insert('users', {'name': 'Ali', 'email': 'ali@ex.com'});
final rows = await db.query('users', where: 'id = ?', whereArgs: [1]);
await db.update('users', {'name': 'Updated'}, where: 'id = ?', whereArgs: [1]);
await db.delete('users', where: 'id = ?', whereArgs: [1]);
```

---

## 🏗 CLEAN ARCHITECTURE

### Folder Structure
```
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
```

### Layers Responsibility
| Layer | Knows About | Contains |
|-------|-------------|----------|
| **Presentation** | Domain only | Cubits, Pages, Widgets |
| **Domain** | Nothing | Entities, UseCase interfaces, Repo interfaces, Failures |
| **Data** | Domain only | Models, Repo implementations, Data sources |

### UseCase Pattern
```dart
abstract class UseCase<Type, Params> {
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
}
```

### Failure Classes
```dart
abstract class Failure extends Equatable {
  final String message;
  const Failure(this.message);
  @override List<Object?> get props => [message];
}

class ServerFailure   extends Failure { const ServerFailure(super.message); }
class CacheFailure    extends Failure { const CacheFailure(super.message); }
class NetworkFailure  extends Failure { const NetworkFailure(super.message); }
```

---

## 🔥 FIREBASE

### Setup
```bash
# Install CLI
npm install -g firebase-tools
dart pub global activate flutterfire_cli

# Configure project
flutterfire configure
```

### Auth
```dart
// Email / Password
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
user?.uid; user?.email; user?.displayName;
```

### Firestore CRUD
```dart
final db = FirebaseFirestore.instance;
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
await batch.commit();
```

### Firebase Storage
```dart
final ref = FirebaseStorage.instance.ref('uploads/photo.jpg');

// Upload
final task = ref.putFile(File('/path/to/photo.jpg'));
task.snapshotEvents.listen((snap) {
  final progress = snap.bytesTransferred / snap.totalBytes;
});
await task;
final url = await ref.getDownloadURL();

// Delete
await ref.delete();
```

### FCM (Push Notifications)
```dart
// Request permission (iOS)
await FirebaseMessaging.instance.requestPermission();

// Get token
final token = await FirebaseMessaging.instance.getToken();

// Foreground messages
FirebaseMessaging.onMessage.listen((msg) {
  FlutterLocalNotificationsPlugin().show(0, msg.notification?.title, msg.notification?.body, ...);
});

// Background tap navigation
FirebaseMessaging.onMessageOpenedApp.listen((msg) {
  context.go('/detail/${msg.data['id']}');
});
```

---

## 🧪 TESTING

### Unit Tests
```dart
void main() {
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
}
```

### Mocking (mocktail)
```dart
class MockUserRepository extends Mock implements UserRepository {}

final mockRepo = MockUserRepository();

when(() => mockRepo.getUser(1)).thenAnswer((_) async => Right(fakeUser));
when(() => mockRepo.getUser(0)).thenThrow(NetworkException('No connection'));

verify(() => mockRepo.getUser(1)).called(1);
verifyNever(() => mockRepo.deleteUser(any()));
```

### Widget Tests
```dart
testWidgets('shows user name', (tester) async {
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
});
```

---

## 🚀 DEPLOYMENT

### Android
```bash
# Generate keystore (once)
keytool -genkey -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload

# Build
flutter build apk --split-per-abi        # APK per architecture
flutter build appbundle                  # .aab for Play Store (preferred)
```

```properties
# android/key.properties
storePassword=...
keyPassword=...
keyAlias=upload
storeFile=../upload-keystore.jks
```

```groovy
// android/app/build.gradle
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
}
```

### iOS
```bash
flutter build ipa
```
> Upload via Xcode → Organizer or Transporter app.

### Web
```bash
flutter build web --release
firebase deploy --only hosting
```

---

## 📦 KEY PACKAGES REFERENCE

| Package | Purpose | Usage |
|---------|---------|-------|
| `flutter_bloc` | State management | `BlocProvider`, `BlocBuilder` |
| `equatable` | Value equality | `extends Equatable`, override `props` |
| `freezed` | Immutable state / unions | `@freezed`, `copyWith`, sealed classes |
| `get_it` | Dependency injection | `GetIt.instance.get<T>()` |
| `injectable` | DI code generation | `@injectable`, `@singleton` |
| `dio` | HTTP client | `Dio().get/post/put/delete` |
| `json_serializable` | JSON codegen | `@JsonSerializable()`, `build_runner` |
| `dartz` | Functional types | `Either<Failure, Success>` |
| `go_router` | Navigation | `GoRouter`, `context.go()` |
| `hive_flutter` | NoSQL local DB | `Box`, `TypeAdapter` |
| `sqflite` | SQLite | `openDatabase`, CRUD |
| `shared_preferences` | Simple key-value | `setString`, `getString` |
| `flutter_secure_storage` | Encrypted storage | `write`, `read`, `delete` |
| `cached_network_image` | Image caching | `CachedNetworkImage(imageUrl)` |
| `shimmer` | Loading skeleton | `Shimmer.fromColors(...)` |
| `intl` | Dates & numbers | `DateFormat`, `NumberFormat` |
| `bloc_test` | Test Cubits/Blocs | `blocTest<C,S>(...)` |
| `mocktail` | Mock dependencies | `Mock`, `when`, `verify` |
| `flutter_localizations` | i18n | ARB files, `Localizations.of()` |
| `connectivity_plus` | Network status | `Connectivity().checkConnectivity()` |
| `permission_handler` | Runtime permissions | `Permission.camera.request()` |
| `image_picker` | Camera / gallery | `ImagePicker().pickImage(source)` |
| `geolocator` | GPS location | `Geolocator.getCurrentPosition()` |
| `google_maps_flutter` | Maps widget | `GoogleMap(markers, polylines)` |
| `flutter_local_notifications` | Local notifications | `show`, `schedule` |
| `url_launcher` | Open URLs | `launchUrl(Uri.parse(url))` |

---

## ⚙️ USEFUL COMMANDS

```bash
# Project
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
flutter clean && flutter pub get
```

---

## ✅ QUICK CHECKLIST

- [ ] `const` on all widgets that don't change → fewer rebuilds
- [ ] `ListView.builder` not `ListView` for long lists
- [ ] `Key` on dynamic list items (`ValueKey(item.id)`)
- [ ] `dispose()` controllers, streams, animations
- [ ] `BlocBuilder` with `buildWhen` to minimize rebuilds
- [ ] Sealed classes for exhaustive state handling
- [ ] `Either` for all repo methods → no silent failures
- [ ] `flutter_secure_storage` for tokens, never `SharedPreferences`
- [ ] `const` constructors for Theme colors & text styles
- [ ] `RepaintBoundary` around expensive custom paint widgets
- [ ] `compute()` for heavy sync operations (JSON parsing, image processing)
- [ ] PRO TIP: Run `flutter analyze` before every commit

---

*Flutter Cheat Sheet · Dart · Cubit/Bloc · Clean Architecture · Firebase*
