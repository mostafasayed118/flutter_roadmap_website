import type { DocEntry } from "./types";

export const packagesDocs: DocEntry[] = [
  {
    id: "pkg-dio",
    title: "Dio — HTTP Client",
    category: "packages",
    summary:
      "Powerful HTTP client with interceptors, FormData, file upload/download, and retry.",
    content: `**Dio** is the most popular HTTP client for Flutter with interceptors, global config, FormData, file upload/download, request cancellation, timeout, and retry support.`,
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
    relatedWeeks: [14, 15, 16],
    tags: [
      "Dio",
      "HTTP",
      "interceptors",
      "networking",
      "API client",
      "FormData",
      "file upload",
    ],
    difficulty: "intermediate",
  },
  {
    id: "pkg-go-router",
    title: "go_router — Navigation",
    category: "packages",
    summary:
      "Official Flutter routing with URL-based routes, deep linking, ShellRoute, and redirects.",
    content: `**go_router** is the official Flutter navigation package with URL-based routing, deep linking, nested navigation via **ShellRoute**, redirect guards, and path/query parameters.`,
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
    relatedWeeks: [7, 8],
    tags: [
      "go_router",
      "navigation",
      "routing",
      "deep linking",
      "ShellRoute",
      "redirect",
    ],
    difficulty: "intermediate",
  },
  {
    id: "pkg-state",
    title: "State Management Packages",
    category: "packages",
    summary:
      "Provider, flutter_bloc, Riverpod, and get_it for dependency injection.",
    content: `**Provider** for lightweight apps, **flutter_bloc** for event-driven scalable apps, **Riverpod** for compile-safe modern state, and **get_it** as a service locator for dependency injection.`,
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
    relatedWeeks: [10, 11, 12, 13],
    tags: [
      "state management",
      "Provider",
      "Riverpod",
      "get_it",
      "dependency injection",
      "service locator",
    ],
    difficulty: "intermediate",
  },
  {
    id: "pkg-storage",
    title: "Local Storage",
    category: "packages",
    summary:
      "shared_preferences, Hive (NoSQL), sqflite (SQLite), and flutter_secure_storage.",
    content: `**shared_preferences** for simple key-value storage, **hive** for fast NoSQL with typed boxes, **sqflite** for full SQLite relational database, and **flutter_secure_storage** for encrypted key-value storage.`,
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
    relatedWeeks: [17, 18],
    tags: [
      "shared_preferences",
      "Hive",
      "sqflite",
      "secure storage",
      "local storage",
      "persistence",
      "database",
    ],
    difficulty: "intermediate",
  },
  {
    id: "pkg-serialization",
    title: "JSON & Freezed",
    category: "packages",
    summary:
      "json_serializable for code gen, Freezed for immutable data classes with copyWith and unions.",
    content: `**json_serializable** generates \`fromJson\`/\`toJson\` with \`build_runner\`. **Freezed** provides immutable data classes with \`copyWith\`, \`==\`, \`hashCode\`, \`toString\`, and union types (sealed states) — the gold standard for data classes in Dart.`,
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
    relatedWeeks: [14, 15, 16],
    tags: [
      "Freezed",
      "json_serializable",
      "code generation",
      "immutable",
      "data classes",
      "copyWith",
      "union types",
    ],
    difficulty: "advanced",
  },
  {
    id: "pkg-ui",
    title: "UI Enhancement",
    category: "packages",
    summary:
      "cached_network_image, flutter_svg, shimmer, lottie, screenutil, and google_fonts.",
    content: `**cached_network_image** for image caching, **flutter_svg** for SVG rendering, **shimmer** for loading skeletons, **lottie** for animations, **flutter_screenutil** for responsive UI, and **google_fonts** for 1000+ Google Fonts.`,
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
    relatedWeeks: [5, 6, 7, 8, 9],
    tags: [
      "cached_network_image",
      "flutter_svg",
      "shimmer",
      "lottie",
      "screenutil",
      "google_fonts",
      "UI",
    ],
    difficulty: "beginner",
  },
  {
    id: "pkg-device",
    title: "Device & Platform",
    category: "packages",
    summary:
      "permission_handler, image_picker, path_provider, connectivity_plus, url_launcher, share_plus.",
    content: `**permission_handler** for runtime permissions, **image_picker** for gallery/camera access, **path_provider** for file system paths, **connectivity_plus** for network status, **url_launcher** for opening URLs, and **share_plus** for sharing content.`,
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
    relatedWeeks: [19, 20, 21, 22],
    tags: [
      "permissions",
      "image picker",
      "path provider",
      "connectivity",
      "url launcher",
      "share",
      "device APIs",
    ],
    difficulty: "intermediate",
  },
  {
    id: "pkg-utilities",
    title: "Utilities & Testing",
    category: "packages",
    summary:
      "intl, logger, equatable, dartz (Either), mocktail, and golden_toolkit.",
    content: `**intl** for internationalization and date formatting, **logger** for beautiful console output, **equatable** for value equality, **dartz** for functional programming (Either), **mocktail** for mocking in tests, and **golden_toolkit** for golden file tests.`,
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
    relatedWeeks: [26, 27],
    tags: [
      "intl",
      "logger",
      "equatable",
      "dartz",
      "Either",
      "mocktail",
      "golden_toolkit",
      "utilities",
    ],
    difficulty: "intermediate",
  },
];
