import type { DocEntry } from "./types";

export const blocDocs: DocEntry[] = [
  {
    id: "bloc-why",
    title: "Why Bloc?",
    category: "bloc",
    summary:
      "Separation of concerns, testability, predictability, and traceability.",
    content: `**Bloc** (Business Logic Component) separates presentation from business logic, making apps easier to test, maintain, and scale. It provides **separation of concerns**, **testability** via pure functions, **predictability** (same event → same state), and **traceability** (every state change is logged).`,
    codeSnippets: [],
    relatedWeeks: [10],
    tags: [
      "bloc",
      "business logic",
      "separation of concerns",
      "testability",
      "predictability",
    ],
    difficulty: "intermediate",
  },
  {
    id: "bloc-cubit-concept",
    title: "Cubit: Simple State Management",
    category: "bloc",
    summary:
      "Cubit extends BlocBase with functions to trigger state changes — no events needed.",
    content: `A **Cubit** extends \`BlocBase\` and exposes **functions** to trigger state changes (no events needed). The flow is: **UI → calls Cubit function → Cubit emits new state → UI rebuilds**. Use \`onChange\` and \`BlocObserver\` for debugging.`,
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
    relatedWeeks: [10, 11],
    tags: [
      "Cubit",
      "BlocBase",
      "emit",
      "state",
      "onChange",
      "simple state",
    ],
    difficulty: "intermediate",
  },
  {
    id: "bloc-event-concept",
    title: "Bloc: Event-Driven State",
    category: "bloc",
    summary:
      "Events dispatched from UI, mapped to states — better traceability and transformers.",
    content: `A **Bloc** uses **Events** instead of functions. Events are dispatched from the UI → Bloc maps them to states. This provides better traceability and supports advanced event handling with **transformers** (debounce, throttle, sequential).`,
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
    relatedWeeks: [10, 11, 12],
    tags: [
      "Bloc",
      "events",
      "event-driven",
      "dispatch",
      "mapEventToState",
      "transformers",
    ],
    difficulty: "intermediate",
  },
  {
    id: "bloc-vs-cubit",
    title: "Cubit vs Bloc",
    category: "bloc",
    summary:
      "When to use Cubit (simple) vs Bloc (event-driven, traceable, transformers).",
    content: `**Cubit** is simpler with less boilerplate — best for simple state (toggle, counter, form fields). **Bloc** provides event traceability, advanced event handling (transformers), and structured testing — best for complex flows and large teams.`,
    codeSnippets: [],
    relatedWeeks: [10, 11, 12, 13],
    tags: [
      "Cubit vs Bloc",
      "comparison",
      "when to use",
      "boilerplate",
      "complexity",
    ],
    difficulty: "intermediate",
  },
  {
    id: "bloc-widgets",
    title: "Flutter Bloc Widgets",
    category: "bloc",
    summary:
      "BlocProvider, BlocBuilder, BlocSelector, BlocListener, BlocConsumer, RepositoryProvider.",
    content: `**BlocProvider** provides a Bloc/Cubit to the widget tree. **BlocBuilder** rebuilds UI on state changes. **BlocSelector** rebuilds only when a specific value changes. **BlocListener** reacts without rebuilding (for side effects). **BlocConsumer** combines Builder + Listener. **RepositoryProvider** provides data layer dependencies.`,
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
    relatedWeeks: [10, 11, 12, 13],
    tags: [
      "BlocProvider",
      "BlocBuilder",
      "BlocListener",
      "BlocConsumer",
      "BlocSelector",
      "RepositoryProvider",
      "widgets",
    ],
    difficulty: "intermediate",
  },
  {
    id: "bloc-architecture",
    title: "3-Layer Architecture",
    category: "bloc",
    summary:
      "Presentation → Business Logic → Data layer with feature-based folder structure.",
    content: `Recommended architecture: **Presentation Layer** (Widgets, Pages, BlocBuilders) → **Business Logic Layer** (Bloc / Cubit) → **Data Layer** (Repositories, APIs, Local DB). Use a feature-based folder structure with separate files for bloc, cubit, state, event, and view.`,
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
    relatedWeeks: [23, 24, 25],
    tags: [
      "architecture",
      "clean architecture",
      "folder structure",
      "3-layer",
      "feature-based",
      "SOLID",
    ],
    difficulty: "advanced",
  },
  {
    id: "bloc-event-transformers",
    title: "Event Transformers",
    category: "bloc",
    summary:
      "Sequential, droppable, restartable, and concurrent event handling with bloc_concurrency.",
    content: `Use **bloc_concurrency** to control how concurrent events are handled: **sequential** (queue), **droppable** (ignore new), **restartable** (cancel and restart), and **concurrent** (parallel, default). Common pattern: debounce for search queries.`,
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
    relatedWeeks: [12, 13],
    tags: [
      "transformers",
      "bloc_concurrency",
      "debounce",
      "throttle",
      "sequential",
      "droppable",
      "restartable",
    ],
    difficulty: "advanced",
  },
  {
    id: "bloc-state-modeling",
    title: "State Modeling",
    category: "bloc",
    summary:
      "Sealed classes for exhaustive matching vs single class with copyWith.",
    content: `Use **sealed classes** (Dart 3+) for exhaustive pattern matching in UI, or a **single class with copyWith** for simpler states. Sealed classes ensure you handle every possible state in the UI.`,
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
    relatedWeeks: [11, 12, 13],
    tags: [
      "state modeling",
      "sealed classes",
      "copyWith",
      "pattern matching",
      "exhaustive",
    ],
    difficulty: "advanced",
  },
  {
    id: "bloc-testing",
    title: "Testing with bloc_test",
    category: "bloc",
    summary:
      "Validate state sequences with blocTest and mock dependencies with mocktail.",
    content: `Use **bloc_test** and **mocktail** for testing Bloc/Cubit. The \`blocTest\` function validates the exact sequence of emitted states, with \`build\`, \`act\`, \`expect\`, and optional \`verify\` callbacks.`,
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
    relatedWeeks: [12, 13, 26, 27],
    tags: [
      "bloc_test",
      "mocktail",
      "testing",
      "blocTest",
      "state verification",
    ],
    difficulty: "advanced",
  },
  {
    id: "bloc-hydrated",
    title: "hydrated_bloc (Persistence)",
    category: "bloc",
    summary:
      "Automatically save and restore Bloc/Cubit state across app restarts.",
    content: `Use **hydrated_bloc** to automatically save and restore Bloc/Cubit state across app restarts. Extend \`HydratedCubit\` instead of \`Cubit\` and implement \`fromJson\`/\`toJson\`.`,
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
    relatedWeeks: [13, 17, 18],
    tags: [
      "hydrated_bloc",
      "persistence",
      "state persistence",
      "fromJson",
      "toJson",
      "storage",
    ],
    difficulty: "advanced",
  },
  {
    id: "bloc-naming",
    title: "Naming Conventions",
    category: "bloc",
    summary:
      "Consistent naming for Cubits, Blocs, Events, States, and concrete variants.",
    content: `Follow consistent naming: \`<Feature>Cubit\` / \`<Feature>Bloc\` for classes, \`<Feature>Event\` for events, \`<Feature>State\` for state. Concrete events: \`<Feature><Action>\` (e.g., \`WeatherRequested\`). Concrete states: \`<Feature><Status>\` (e.g., \`WeatherLoading\`).`,
    codeSnippets: [],
    relatedWeeks: [10, 11, 12, 13, 23, 24, 25],
    tags: [
      "naming conventions",
      "naming",
      "best practices",
      "code style",
      "conventions",
    ],
    difficulty: "intermediate",
  },
];
