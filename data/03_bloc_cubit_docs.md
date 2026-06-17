# Bloc / Cubit Documentation
> Source: https://bloclibrary.dev | Version: bloc v9.2.1

---

## What is Bloc?

**Bloc** (Business Logic Component) is a predictable state management library for Dart and Flutter. It separates presentation from business logic, making apps easier to test, maintain, and scale.

> BLoC is a **design pattern**, not just a package. The `bloc` and `flutter_bloc` packages implement this pattern.

### Why Bloc?

| Goal | How Bloc Helps |
|------|----------------|
| Separation of concerns | Business logic is isolated from UI |
| Testability | Pure functions and streams are easy to unit test |
| Predictability | Same event always produces same state |
| Scalability | Scales from small to large enterprise apps |
| Traceability | Every state change is observable and logged |

### Packages Overview

| Package | Description |
|---------|-------------|
| `bloc` | Core Dart package — Cubit and Bloc |
| `flutter_bloc` | Flutter widgets for Bloc/Cubit integration |
| `hydrated_bloc` | Persist and restore Bloc/Cubit state automatically |
| `replay_bloc` | Undo/redo support for Bloc/Cubit |
| `bloc_test` | Testing utilities for Bloc/Cubit |
| `bloc_concurrency` | Event transformers (sequential, droppable, restartable) |

---

## Installation

```yaml
# pubspec.yaml
dependencies:
  flutter_bloc: ^9.0.0

# or for pure Dart (no Flutter)
dependencies:
  bloc: ^9.0.0
```

```bash
# Install
flutter pub get

# Or add directly
dart pub add bloc
dart pub add flutter_bloc
```

---

## Core Concept: Streams

Bloc is built on top of Dart **Streams** — sequences of asynchronous data.

```dart
// Creating a stream
Stream<int> countStream(int max) async* {
  for (int i = 0; i < max; i++) {
    yield i;
  }
}

// Consuming a stream
Future<int> sumStream(Stream<int> stream) async {
  int sum = 0;
  await for (final value in stream) {
    sum += value;
  }
  return sum;
}

void main() async {
  final stream = countStream(10);
  final sum = await sumStream(stream);
  print(sum); // 45
}
```

---

## Cubit

A **Cubit** is the simpler abstraction in the bloc library. It extends `BlocBase` and exposes **functions** to trigger state changes (no events needed).

```
UI → calls Cubit function → Cubit emits new state → UI rebuilds
```

### Creating a Cubit

```dart
import 'package:bloc/bloc.dart';

class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0); // initial state = 0

  void increment() => emit(state + 1);
  void decrement() => emit(state - 1);
  void reset() => emit(0);
}
```

### Cubit with Complex State

```dart
// State class
class AuthState {
  final bool isLoggedIn;
  final String? username;
  final String? error;

  const AuthState({
    this.isLoggedIn = false,
    this.username,
    this.error,
  });

  AuthState copyWith({
    bool? isLoggedIn,
    String? username,
    String? error,
  }) {
    return AuthState(
      isLoggedIn: isLoggedIn ?? this.isLoggedIn,
      username: username ?? this.username,
      error: error ?? this.error,
    );
  }
}

// Cubit
class AuthCubit extends Cubit<AuthState> {
  AuthCubit() : super(const AuthState());

  Future<void> login(String username, String password) async {
    try {
      emit(state.copyWith(isLoggedIn: false, error: null));
      // simulate network
      await Future.delayed(const Duration(seconds: 1));
      emit(state.copyWith(isLoggedIn: true, username: username));
    } catch (e) {
      emit(state.copyWith(error: e.toString()));
    }
  }

  void logout() => emit(const AuthState());
}
```

### Using a Cubit (Basic — Dart only)

```dart
void main() async {
  final cubit = CounterCubit();

  print(cubit.state);  // 0

  cubit.increment();
  print(cubit.state);  // 1

  // Stream usage
  final sub = cubit.stream.listen(print); // prints future states
  cubit.increment(); // prints 2
  cubit.increment(); // prints 3

  await sub.cancel();
  await cubit.close(); // always close!
}
```

### Observing a Cubit

```dart
class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0);

  void increment() => emit(state + 1);

  @override
  void onChange(Change<int> change) {
    super.onChange(change);
    // called before state is updated
    print('${change.currentState} → ${change.nextState}');
  }

  @override
  void onError(Object error, StackTrace stackTrace) {
    print('Error: $error');
    super.onError(error, stackTrace);
  }
}
```

### BlocObserver — Global Observer

```dart
class AppBlocObserver extends BlocObserver {
  @override
  void onCreate(BlocBase bloc) {
    super.onCreate(bloc);
    print('onCreate: ${bloc.runtimeType}');
  }

  @override
  void onChange(BlocBase bloc, Change change) {
    super.onChange(bloc, change);
    print('onChange: ${bloc.runtimeType} $change');
  }

  @override
  void onError(BlocBase bloc, Object error, StackTrace stackTrace) {
    print('onError: ${bloc.runtimeType} $error');
    super.onError(bloc, error, stackTrace);
  }

  @override
  void onClose(BlocBase bloc) {
    super.onClose(bloc);
    print('onClose: ${bloc.runtimeType}');
  }
}

// Register globally in main()
void main() {
  Bloc.observer = AppBlocObserver();
  runApp(const MyApp());
}
```

---

## Bloc

A **Bloc** is a more advanced class that uses **Events** instead of functions to trigger state changes. Events are dispatched from the UI → Bloc maps them to states.

```
UI → adds Event → Bloc maps Event to State → emits new State → UI rebuilds
```

### Creating a Bloc

```dart
// 1. Define Events
abstract class CounterEvent {}
class CounterIncrementPressed extends CounterEvent {}
class CounterDecrementPressed extends CounterEvent {}
class CounterResetPressed extends CounterEvent {}

// 2. Define State (can be simple or complex)
// Using int as state here

// 3. Create the Bloc
class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<CounterIncrementPressed>((event, emit) => emit(state + 1));
    on<CounterDecrementPressed>((event, emit) => emit(state - 1));
    on<CounterResetPressed>((event, emit) => emit(0));
  }
}
```

### Bloc with Async Events

```dart
// Events
abstract class WeatherEvent {}

class WeatherRequested extends WeatherEvent {
  final String city;
  const WeatherRequested(this.city);
}

class WeatherRefreshed extends WeatherEvent {
  final String city;
  const WeatherRefreshed(this.city);
}

// States
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
}

// Bloc
class WeatherBloc extends Bloc<WeatherEvent, WeatherState> {
  final WeatherRepository _repository;

  WeatherBloc(this._repository) : super(WeatherInitial()) {
    on<WeatherRequested>(_onWeatherRequested);
    on<WeatherRefreshed>(_onWeatherRefreshed);
  }

  Future<void> _onWeatherRequested(
    WeatherRequested event,
    Emitter<WeatherState> emit,
  ) async {
    emit(WeatherLoading());
    try {
      final weather = await _repository.fetchWeather(event.city);
      emit(WeatherLoaded(weather));
    } catch (e) {
      emit(WeatherError(e.toString()));
    }
  }

  Future<void> _onWeatherRefreshed(
    WeatherRefreshed event,
    Emitter<WeatherState> emit,
  ) async {
    // similar to above but maybe with different behavior
    await _onWeatherRequested(WeatherRequested(event.city), emit);
  }
}
```

### Using a Bloc (Basic — Dart only)

```dart
void main() async {
  final bloc = CounterBloc();

  print(bloc.state);   // 0

  bloc.add(CounterIncrementPressed());
  await Future.delayed(Duration.zero);
  print(bloc.state);   // 1

  bloc.add(CounterIncrementPressed());
  bloc.add(CounterIncrementPressed());
  await Future.delayed(Duration.zero);
  print(bloc.state);   // 3

  await bloc.close();
}
```

### Observing a Bloc (onTransition)

```dart
class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<CounterIncrementPressed>((event, emit) => emit(state + 1));
  }

  @override
  void onEvent(CounterEvent event) {
    super.onEvent(event);
    print('Event: $event');
  }

  @override
  void onTransition(Transition<CounterEvent, int> transition) {
    super.onTransition(transition);
    // currentState, event, nextState
    print('Transition: $transition');
  }

  @override
  void onError(Object error, StackTrace stackTrace) {
    print('Error: $error');
    super.onError(error, stackTrace);
  }
}
```

---

## Cubit vs Bloc

| Feature | Cubit | Bloc |
|---------|-------|------|
| Trigger | Function calls | Events |
| Boilerplate | Less | More |
| Traceability | Change only | Event + Transition |
| Testing | Simple | More structured |
| Best for | Simple/medium features | Complex flows, event history needed |
| Advanced event handling | ❌ | ✅ (transformers) |

### When to use Cubit:
- Simple state (toggle, counter, form fields)
- No need to trace what triggered a state change
- Smaller features or teams new to Bloc

### When to use Bloc:
- Complex event flows (search with debounce, pagination)
- Need to log, replay, or audit every user action
- Large teams with strict architecture requirements

---

## Flutter Bloc Widgets

All widgets from `flutter_bloc` work with **both** Cubit and Bloc instances.

### BlocProvider

Provides a Bloc/Cubit to the widget tree. Acts as a **dependency injection** widget. Automatically closes the Bloc when removed from the tree.

```dart
// Providing a Cubit/Bloc
BlocProvider(
  create: (context) => CounterCubit(),
  child: const CounterPage(),
)

// Multiple providers
MultiBlocProvider(
  providers: [
    BlocProvider(create: (_) => CounterCubit()),
    BlocProvider(create: (_) => AuthCubit()),
    BlocProvider(create: (_) => WeatherBloc(WeatherRepository())),
  ],
  child: const MyApp(),
)

// Provide existing bloc to a new route (won't auto-close it)
BlocProvider.value(
  value: context.read<CounterCubit>(),
  child: const AnotherPage(),
)
```

### BlocBuilder

Rebuilds the UI whenever a new state is emitted.

```dart
BlocBuilder<CounterCubit, int>(
  builder: (context, state) {
    return Text('Count: $state');
  },
)

// With bloc specified explicitly
BlocBuilder<CounterCubit, int>(
  bloc: myLocalCubit,
  builder: (context, state) => Text('$state'),
)

// Conditional rebuild (optimization)
BlocBuilder<WeatherBloc, WeatherState>(
  buildWhen: (previous, current) {
    // Only rebuild when going from Loading to Loaded
    return current is WeatherLoaded;
  },
  builder: (context, state) {
    if (state is WeatherLoaded) return WeatherWidget(state.weather);
    return const SizedBox.shrink();
  },
)
```

### BlocSelector

More granular than BlocBuilder — only rebuilds when a specific **selected value** changes.

```dart
// Only rebuilds when count changes, not when other fields change
BlocSelector<ProfileBloc, ProfileState, String>(
  selector: (state) => state.username,
  builder: (context, username) {
    return Text('Hello, $username');
  },
)
```

### BlocListener

Reacts to state changes **without rebuilding** the UI. Use for one-time side effects: navigation, showing dialogs, SnackBars.

```dart
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

// Conditional listening
BlocListener<WeatherBloc, WeatherState>(
  listenWhen: (previous, current) => current is WeatherError,
  listener: (context, state) {
    if (state is WeatherError) {
      showDialog(
        context: context,
        builder: (_) => AlertDialog(content: Text(state.message)),
      );
    }
  },
  child: const WeatherDisplay(),
)

// Multiple listeners
MultiBlocListener(
  listeners: [
    BlocListener<AuthCubit, AuthState>(listener: _handleAuth),
    BlocListener<WeatherBloc, WeatherState>(listener: _handleWeather),
  ],
  child: const HomePage(),
)
```

### BlocConsumer

Combines `BlocBuilder` + `BlocListener` in a single widget.

```dart
BlocConsumer<AuthCubit, AuthState>(
  listenWhen: (prev, curr) => curr.isLoggedIn != prev.isLoggedIn,
  listener: (context, state) {
    if (state.isLoggedIn) {
      context.go('/home');
    }
  },
  buildWhen: (prev, curr) => curr.error != prev.error,
  builder: (context, state) {
    if (state.error != null) {
      return ErrorWidget(state.error!);
    }
    return const LoginForm();
  },
)
```

### RepositoryProvider

Provides a **repository** (data layer) to the widget tree via dependency injection.

```dart
RepositoryProvider(
  create: (_) => WeatherRepository(),
  child: BlocProvider(
    create: (context) => WeatherBloc(context.read<WeatherRepository>()),
    child: const WeatherPage(),
  ),
)

// Multiple repositories
MultiRepositoryProvider(
  providers: [
    RepositoryProvider(create: (_) => WeatherRepository()),
    RepositoryProvider(create: (_) => UserRepository()),
    RepositoryProvider(create: (_) => AuthRepository()),
  ],
  child: const MyApp(),
)
```

---

## Context Extension Methods

```dart
// context.read — access bloc/cubit WITHOUT listening (use in callbacks)
ElevatedButton(
  onPressed: () => context.read<CounterCubit>().increment(),
  child: const Text('Increment'),
)

// context.watch — access bloc/cubit AND rebuild on changes (inside build())
final count = context.watch<CounterCubit>().state;
Text('Count: $count')

// context.select — access a specific field and rebuild only when IT changes
final username = context.select<AuthCubit, String>(
  (cubit) => cubit.state.username ?? 'Guest',
);

// Dispatch events
context.read<WeatherBloc>().add(WeatherRequested('Cairo'));
```

> **Rule:** Use `context.read` in callbacks/handlers. Use `context.watch` or `BlocBuilder` in `build()`.

---

## Architecture

### Recommended 3-Layer Architecture

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│    (Widgets, Pages, BlocBuilders)   │
└──────────────┬──────────────────────┘
               │ Events / Functions
┌──────────────▼──────────────────────┐
│         Business Logic Layer        │
│           (Bloc / Cubit)            │
└──────────────┬──────────────────────┘
               │ Calls
┌──────────────▼──────────────────────┐
│            Data Layer               │
│  (Repositories, APIs, Local DB)     │
└─────────────────────────────────────┘
```

### Folder Structure

```
lib/
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
│       ├── cubit/
│       │   └── counter_cubit.dart
│       └── view/
│           ├── counter_page.dart
│           └── counter_view.dart
├── core/
│   ├── network/
│   └── utils/
└── main.dart
```

---

## Event Transformers (bloc_concurrency)

Control how concurrent events are handled:

```yaml
dependencies:
  bloc_concurrency: ^0.3.0
```

```dart
import 'package:bloc_concurrency/bloc_concurrency.dart';

class SearchBloc extends Bloc<SearchEvent, SearchState> {
  SearchBloc() : super(SearchInitial()) {
    // Sequential — process events one at a time, queue others
    on<SearchEvent>(_onSearch, transformer: sequential());

    // Droppable — ignore new events while processing one
    on<SearchEvent>(_onSearch, transformer: droppable());

    // Restartable — cancel current and restart with new event (debounce)
    on<SearchEvent>(_onSearch, transformer: restartable());

    // Concurrent (default) — all events processed in parallel
    on<SearchEvent>(_onSearch, transformer: concurrent());
  }
}

// Practical: search with debounce
on<SearchQueryChanged>(
  _onSearchQueryChanged,
  transformer: (events, mapper) => events
      .debounceTime(const Duration(milliseconds: 300))
      .switchMap(mapper),
);
```

---

## State Modeling

### Sealed Classes (Dart 3+) — Recommended

```dart
// Define all states as a sealed class
sealed class WeatherState {}

final class WeatherInitial extends WeatherState {}

final class WeatherLoading extends WeatherState {}

final class WeatherLoaded extends WeatherState {
  final Weather weather;
  const WeatherLoaded(this.weather);
}

final class WeatherError extends WeatherState {
  final String message;
  const WeatherError(this.message);
}

// Exhaustive pattern matching in UI
BlocBuilder<WeatherBloc, WeatherState>(
  builder: (context, state) => switch (state) {
    WeatherInitial() => const Text('Enter a city'),
    WeatherLoading() => const CircularProgressIndicator(),
    WeatherLoaded(:var weather) => WeatherWidget(weather),
    WeatherError(:var message) => Text('Error: $message'),
  },
)
```

### Single Class with copyWith

```dart
class CounterState {
  final int count;
  final bool isLoading;
  final String? error;

  const CounterState({
    this.count = 0,
    this.isLoading = false,
    this.error,
  });

  CounterState copyWith({
    int? count,
    bool? isLoading,
    String? error,
  }) {
    return CounterState(
      count: count ?? this.count,
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
    );
  }

  @override
  bool operator ==(Object other) =>
      other is CounterState &&
      other.count == count &&
      other.isLoading == isLoading &&
      other.error == error;

  @override
  int get hashCode => Object.hash(count, isLoading, error);
}
```

---

## Testing with bloc_test

```yaml
dev_dependencies:
  bloc_test: ^9.0.0
  mocktail: ^1.0.0
```

```dart
import 'package:bloc_test/bloc_test.dart';
import 'package:test/test.dart';
import 'package:mocktail/mocktail.dart';

class MockWeatherRepository extends Mock implements WeatherRepository {}

void main() {
  group('CounterCubit', () {
    late CounterCubit cubit;

    setUp(() => cubit = CounterCubit());
    tearDown(() => cubit.close());

    test('initial state is 0', () {
      expect(cubit.state, equals(0));
    });

    blocTest<CounterCubit, int>(
      'emits [1] when increment is called',
      build: () => CounterCubit(),
      act: (cubit) => cubit.increment(),
      expect: () => [1],
    );

    blocTest<CounterCubit, int>(
      'emits [1, 2, 3] when increment called 3 times',
      build: () => CounterCubit(),
      act: (cubit) {
        cubit.increment();
        cubit.increment();
        cubit.increment();
      },
      expect: () => [1, 2, 3],
    );
  });

  group('WeatherBloc', () {
    late MockWeatherRepository mockRepository;
    late WeatherBloc bloc;

    setUp(() {
      mockRepository = MockWeatherRepository();
      bloc = WeatherBloc(mockRepository);
    });

    tearDown(() => bloc.close());

    blocTest<WeatherBloc, WeatherState>(
      'emits [Loading, Loaded] when WeatherRequested succeeds',
      setUp: () {
        when(() => mockRepository.fetchWeather('Cairo'))
            .thenAnswer((_) async => const Weather(temperature: 30));
      },
      build: () => WeatherBloc(mockRepository),
      act: (bloc) => bloc.add(const WeatherRequested('Cairo')),
      expect: () => [
        isA<WeatherLoading>(),
        isA<WeatherLoaded>(),
      ],
    );

    blocTest<WeatherBloc, WeatherState>(
      'emits [Loading, Error] when WeatherRequested fails',
      setUp: () {
        when(() => mockRepository.fetchWeather(any()))
            .thenThrow(Exception('Network error'));
      },
      build: () => WeatherBloc(mockRepository),
      act: (bloc) => bloc.add(const WeatherRequested('InvalidCity')),
      expect: () => [
        isA<WeatherLoading>(),
        isA<WeatherError>(),
      ],
    );
  });
}
```

---

## hydrated_bloc (Persist State)

Automatically saves and restores state across app restarts.

```yaml
dependencies:
  hydrated_bloc: ^10.0.0
  path_provider: ^2.0.0
```

```dart
import 'package:hydrated_bloc/hydrated_bloc.dart';

// Initialize in main
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  HydratedBloc.storage = await HydratedStorage.build(
    storageDirectory: kIsWeb
        ? HydratedStorage.webStorageDirectory
        : await getTemporaryDirectory(),
  );
  runApp(const MyApp());
}

// Extend HydratedCubit instead of Cubit
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
}
```

---

## Naming Conventions

| Concept | Convention | Example |
|---------|------------|---------|
| Cubit class | `<Feature>Cubit` | `CounterCubit`, `AuthCubit` |
| Bloc class | `<Feature>Bloc` | `WeatherBloc`, `SearchBloc` |
| Event (abstract) | `<Feature>Event` | `WeatherEvent` |
| Event (concrete) | `<Feature><Action>` | `WeatherRequested`, `WeatherRefreshed` |
| State (abstract) | `<Feature>State` | `WeatherState` |
| State (concrete) | `<Feature><Status>` | `WeatherInitial`, `WeatherLoading`, `WeatherLoaded`, `WeatherError` |
| State file | `<feature>_state.dart` | `weather_state.dart` |
| Event file | `<feature>_event.dart` | `weather_event.dart` |
| Bloc file | `<feature>_bloc.dart` | `weather_bloc.dart` |
| Cubit file | `<feature>_cubit.dart` | `auth_cubit.dart` |

---

## Complete Example: Counter App

```dart
// counter_cubit.dart
class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0);
  void increment() => emit(state + 1);
  void decrement() => emit(state - 1);
}

// main.dart
void main() {
  runApp(
    BlocProvider(
      create: (_) => CounterCubit(),
      child: const MyApp(),
    ),
  );
}

// counter_page.dart
class CounterPage extends StatelessWidget {
  const CounterPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Counter')),
      body: Center(
        child: BlocBuilder<CounterCubit, int>(
          builder: (context, count) {
            return Text(
              '$count',
              style: Theme.of(context).textTheme.displayLarge,
            );
          },
        ),
      ),
      floatingActionButton: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          FloatingActionButton(
            onPressed: () => context.read<CounterCubit>().increment(),
            child: const Icon(Icons.add),
          ),
          const SizedBox(height: 8),
          FloatingActionButton(
            onPressed: () => context.read<CounterCubit>().decrement(),
            child: const Icon(Icons.remove),
          ),
        ],
      ),
    );
  }
}
```

---

## Key Docs Links

| Topic | URL |
|-------|-----|
| Official Docs | https://bloclibrary.dev |
| Why Bloc? | https://bloclibrary.dev/why-bloc |
| Bloc Concepts | https://bloclibrary.dev/bloc-concepts |
| Flutter Bloc Concepts | https://bloclibrary.dev/flutter-bloc-concepts |
| Architecture | https://bloclibrary.dev/architecture |
| Testing | https://bloclibrary.dev/testing |
| Naming Conventions | https://bloclibrary.dev/naming-conventions |
| flutter_bloc pub.dev | https://pub.dev/packages/flutter_bloc |
| bloc pub.dev | https://pub.dev/packages/bloc |
| hydrated_bloc | https://pub.dev/packages/hydrated_bloc |
| bloc_test | https://pub.dev/packages/bloc_test |
| Counter Tutorial | https://bloclibrary.dev/tutorials/flutter-counter |
| Login Tutorial | https://bloclibrary.dev/tutorials/flutter-login |
| Firebase Login Tutorial | https://bloclibrary.dev/tutorials/flutter-firebase-login |
