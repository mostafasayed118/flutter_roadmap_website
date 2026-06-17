# 🗺️ Flutter Development Roadmap
### Dart · Cubit/Bloc · Clean Architecture · Firebase · Deployment

---

## 📋 Overview & Timeline

| Phase | Topic | Duration | Period |
|-------|-------|----------|--------|
| Phase 1 | Dart Programming Language | 3–4 Weeks | Week 1–4 |
| Phase 2 | Flutter Fundamentals | 4–5 Weeks | Week 5–9 |
| Phase 3 | State Management (Cubit/Bloc) | 3–4 Weeks | Week 10–13 |
| Phase 4 | Networking & APIs | 2–3 Weeks | Week 14–16 |
| Phase 5 | Local Storage & Database | 2 Weeks | Week 17–18 |
| Phase 6 | Advanced Flutter | 3–4 Weeks | Week 19–22 |
| Phase 7 | Architecture & Clean Code | 2–3 Weeks | Week 23–25 |
| Phase 8 | Testing | 2 Weeks | Week 26–27 |
| Phase 9 | Firebase & Backend Services | 2–3 Weeks | Week 28–30 |
| Phase 10 | Deployment & Portfolio Projects | 3–4 Weeks | Week 31–34 |

> ⏰ **Total Estimated Time:** 7–8 Months · 28–30 hours/week · 3–4 hours/day

---

## ⏰ Daily Study Schedule

**Weekdays — 3–4 hours/day**

| Time | Activity |
|------|----------|
| 1 hour | Theory & Concepts (reading/watching) |
| 1.5 hours | Hands-on Coding (practice) |
| 0.5 hour | Review & Notes |
| 1 hour *(optional)* | Side project |

**Weekends — 5–6 hours/day**

| Time | Activity |
|------|----------|
| 2 hours | Deep dive into complex topics |
| 3 hours | Project work |
| 1 hour | Review week's learning |

---

## 🔷 PHASE 1: Dart Programming Language
*Weeks 1–4 · Foundation*

---

### Week 1 — Dart Basics
> ⏰ 15–20 hours

**Topics:**
- **Introduction to Dart** — What is Dart & Why Dart, Dart SDK, DartPad, VS Code / Android Studio setup
- **Variables & Data Types** — `var`, `final`, `const`, `int`, `double`, `num`, `String` (interpolation, methods), `bool`, `dynamic` vs `var`, type inference
- **Operators** — Arithmetic, Comparison, Logical, Assignment, Null-aware (`??`, `?.`, `!`), Cascade (`..`)
- **Control Flow** — `if / else if / else`, `switch-case`, Ternary operator, `for`, `while`, `do-while`, `break` & `continue`, `for-in`

📚 **Integrated Udemy Courses:**
- **[Mastering Programming: A Comprehensive Course in Arabic](https://www.udemy.com/course/mastering-programming-a-comprehensive-course-in-arabic/)** — Core programming logic, variables, loops, and control flow. Ideal for building a logical foundation before diving into Dart.
- **[Master Git & GitHub: Essential Skills for Developers in Arabic](https://www.udemy.com/course/master-git-github-essential-skills-for-developersarabic/)** — Set up Git and GitHub in Week 1 so you can push every practice project from day one.

🎯 **Practice Projects:**
- Calculator app (console)
- Number guessing game
- Grade calculator

---

### Week 2 — Dart Intermediate
> ⏰ 18–22 hours

**Topics:**
- **Functions** — Declaration & calling, Parameters (required, optional, named), Default values, Arrow functions (`=>`), Anonymous functions, Higher-order functions, Closures, `typedef`
- **Collections:**
  - `List` — `add`, `remove`, `insert`, `contains`, `map`, `where`, `reduce`, `fold`, `sort`, spread operator (`...`)
  - `Set` — `union`, `intersection`, `difference`, `contains`, `add`, `remove`
  - `Map` — Adding, removing, updating, `keys`, `values`, `entries`, `forEach`, `putIfAbsent`, `update`
  - **Collection methods** — `any`, `every`, `firstWhere`, `lastWhere`, `expand`, `take`, `skip`, `toList`, `toSet`, `toMap`
- **Null Safety** — Nullable types (`?`), Non-nullable types, Null assertion (`!`), Null-aware access (`?.`), Null coalescing (`??`), `late` keyword, `required` keyword

🎯 **Practice Projects:**
- Student management system (console)
- To-do list (console)
- Contact book (console)

---

### Week 3 — Dart OOP
> ⏰ 20–25 hours

**Topics:**
- **Classes & Objects** — Properties & Methods, Constructors (Default, Named, Factory, Const, Redirecting), `this`, Getters & Setters, Static members
- **Encapsulation** — Private members (`_`), Public members, Library-level privacy
- **Inheritance** — `extends`, `super`, `@override`, Multi-level inheritance, Covariant keyword
- **Polymorphism** — Runtime polymorphism, Method overriding, Type checking (`is`, `is!`)
- **Abstraction** — Abstract classes, Abstract methods, Interfaces (`implements`)
- **Mixins** — `with`, `mixin`, `on` (restrictions), Multiple mixins
- **Enums** — Basic enums, Enhanced enums (Dart 2.17+), Enums with values & methods

🎯 **Practice Projects:**
- Bank account system
- Shape hierarchy (area, perimeter)
- Employee management system
- Animal kingdom hierarchy

---

### Week 4 — Dart Advanced
> ⏰ 22–28 hours

**Topics:**
- **Asynchronous Programming:**
  - `Future` — `Future.delayed`, `.then`, `.catchError`, `.whenComplete`, `Future.wait`
  - `async / await`
  - `try-catch-finally` (with async)
  - `Stream` — Single subscription, Broadcast, `StreamController`, `listen`, `cancel`, `Stream.periodic`, `async* / yield / yield*`, Stream transformers
  - Isolates (basics)
- **Exception Handling** — `try-catch`, `on` keyword, `finally`, `throw`, Custom exceptions, `rethrow`
- **Generics** — Generic functions, Generic classes, Bounded generics (`extends`), Generic methods
- **Extensions** — Extension methods, Extension on built-in types, Named extensions
- **Advanced Concepts** — Records (Dart 3.0), Patterns (Dart 3.0), Sealed classes (Dart 3.0), `RegExp` basics, Date & Time, Math library

🎯 **Practice Projects:**
- File reader simulation (async)
- API data fetcher (console)
- Generic repository pattern
- Complete console application combining all concepts

---

## 🔷 PHASE 2: Flutter Fundamentals
*Weeks 5–9*

📚 **Integrated Udemy Course for Phase 2:**
**[Best and Complete Flutter Course for Beginners](https://www.udemy.com/course/best-and-complete-flutter-course-for-beginners/)** — Your primary companion for Weeks 5–9. A complete, beginner-friendly walkthrough of Flutter UI, layouts, navigation, and basic state management.

---

### Week 5 — Flutter Setup & Basics
> ⏰ 20–25 hours

**Topics:**
- **Introduction** — Flutter architecture, Widget tree, "Everything is a Widget", Hot Reload & Hot Restart
- **Environment Setup** — Flutter SDK, Android Studio, VS Code, Emulator/Simulator, `flutter doctor`
- **Project Structure** — `lib/`, `pubspec.yaml`, `android/` & `ios/`, assets, `main.dart` & `runApp()`
- **Basic Widgets** — `MaterialApp`, `Scaffold`, `AppBar`, `Text`, `Container` (padding, margin, BoxDecoration, gradient, shadow), `SizedBox`, `Icon`, `Image` (asset, network, BoxFit), Buttons (Elevated, Text, Outlined, FAB), `Card`
- **StatelessWidget vs StatefulWidget** — Lifecycles (`initState`, `build`, `setState`, `didUpdateWidget`, `dispose`)

🎯 **Practice Projects:**
- Business card app
- Profile page UI
- Simple counter app

---

### Week 6 — Layouts & UI
> ⏰ 22–28 hours

**Topics:**
- **Layout Widgets** — `Column`, `Row`, `Stack`, `Positioned`, `Wrap`, `Expanded`, `Flexible`, `FractionallySizedBox`, `AspectRatio`, `ConstrainedBox`, `Spacer`
- **Scrollable Widgets:**
  - `ListView` — `ListView()`, `ListView.builder()`, `ListView.separated()`
  - `GridView` — `GridView.count()`, `GridView.builder()`, `GridView.extent()`
  - `CustomScrollView` & Slivers — `SliverList`, `SliverGrid`, `SliverAppBar`, `SliverToBoxAdapter`
  - `PageView`, `ScrollController`
- **Input Widgets** — `TextField` (TextEditingController, InputDecoration, validation), `TextFormField`, `Form`, `Checkbox`, `Radio`, `Switch`, `Slider`, `DropdownButton`, `DatePicker`, `TimePicker`
- **Padding & Alignment** — `Padding`, `Align`, `Center`, `EdgeInsets`

🎯 **Practice Projects:**
- Login / Register page
- Settings page with forms
- Product listing grid
- Chat UI layout

---

### Week 7 — Navigation & Routing
> ⏰ 18–22 hours

**Topics:**
- **Navigation Basics** — `Navigator.push / pop`, `MaterialPageRoute`, Named Routes, Passing data, `pushReplacement`, `pushAndRemoveUntil`, `popUntil`, `WillPopScope`
- **Advanced Routing (`go_router`) ⭐** — `GoRouter` configuration, `GoRoute`, `context.go / push`, Path & Query parameters, Nested routes, `ShellRoute`, Redirect & Guards
- **Dialogs & Bottom Sheets** — `AlertDialog`, `SimpleDialog`, `showDialog`, `showModalBottomSheet`, `SnackBar`, Custom dialogs
- **Tab Navigation** — `TabBar`, `TabBarView`, `BottomNavigationBar`, `NavigationBar` (Material 3), `Drawer`, `NavigationRail`

🎯 **Practice Projects:**
- Multi-screen app with navigation
- App with bottom navigation bar
- App with drawer navigation
- Auth flow: login → home → profile

---

### Week 8 — Theming, Styling & Animations
> ⏰ 22–28 hours

**Topics:**
- **Theming** — `ThemeData`, `colorScheme`, `textTheme`, Material 3 (`useMaterial3`), Dark/Light Theme, `Theme.of(context)`, Google Fonts, Color palettes
- **Responsive Design** — `MediaQuery`, `LayoutBuilder`, `OrientationBuilder`, `flutter_screenutil`, Adaptive widgets
- **Animations:**
  - *Implicit* — `AnimatedContainer`, `AnimatedOpacity`, `AnimatedSwitcher`, `AnimatedSize`
  - *Explicit* — `AnimationController`, `Tween`, `CurvedAnimation`, `AnimatedBuilder`, `TickerProviderStateMixin`, Staggered animations
  - Hero Animations, Page Transitions, Lottie animations

🎯 **Practice Projects:**
- App with theme switcher (dark/light)
- Responsive dashboard
- Animated login page
- Product card with hero animation

---

### Week 9 — Essential Packages & Utilities
> ⏰ 18–22 hours

**Key Packages:**

| Package | Purpose |
|---------|---------|
| `flutter_svg` | SVG rendering |
| `cached_network_image` | Image caching |
| `shimmer` | Loading effects |
| `intl` | Date/number formatting |
| `url_launcher` | Open URLs |
| `image_picker` | Camera & gallery |
| `permission_handler` | Permissions |
| `connectivity_plus` | Network status |

**Topics:** Flutter DevTools (Widget Inspector, Performance overlay, Debug paint), Assets Management (images, fonts, JSON, `flutter_gen`)

🎯 **Practice Projects:**
- Image gallery app
- Complete UI clone (Instagram / Twitter / WhatsApp)
- Portfolio app

---

## 🔷 PHASE 3: State Management — Cubit/Bloc
*Weeks 10–13*

📚 **Integrated Udemy Course for Phase 3:**
**[Flutter BLoC Pattern From Zero to Hero in Arabic](https://www.udemy.com/course/flutter-bloc-pattern-from-zero-to-hero-in-arabic/)** — Deep dive into Cubit, Bloc, state emission, and separation of business logic from the UI. Your primary resource for Weeks 10–13.

---

### Week 10 — Cubit Basics
> ⏰ 22–28 hours

**Topics:**
- **State Management Overview** — Ephemeral vs App state, `setState` limitations, Overview (Provider, Riverpod, Bloc, GetX)
- **Bloc Pattern Theory** — Business Logic Component, Separation of concerns, Unidirectional data flow, Cubit vs Bloc
- **Cubit Fundamentals:**
  - Packages: `flutter_bloc`, `bloc`, `equatable`
  - Creating a Cubit: `Cubit` class, state definition, `emit()`, initial state
  - State types: Initial, Loading, Success/Loaded, Error/Failure (using sealed classes)
  - Providing: `BlocProvider`, `MultiBlocProvider`, `RepositoryProvider`
  - Consuming: `BlocBuilder` (buildWhen), `BlocListener` (listenWhen), `BlocConsumer`, `context.read / context.watch`
  - Lifecycle: `onCreate`, `onChange`, `onError`, `close`

🎯 **Practice Projects:**
- Counter app with Cubit
- Theme switcher with Cubit
- Simple todo app with Cubit

---

### Week 11 — Advanced Cubit Patterns
> ⏰ 22–26 hours

**Topics:**
- **Complex State Management** — Multiple states with abstract classes, `copyWith` pattern, `freezed` package (`@freezed`, auto-generated `copyWith`, Union types)
- **Multiple Cubits Communication** — Cubit-to-Cubit, `StreamSubscription` in Cubit, Shared repositories
- **Cubit with Forms** — Form validation state, Real-time validation, `formz` package
- **Best Practices & Folder Structure:**

```
feature/
├── cubit/
│   ├── feature_cubit.dart
│   └── feature_state.dart
├── view/
│   └── feature_page.dart
└── widgets/
    └── feature_widget.dart
```

🎯 **Practice Projects:**
- Login/Register with form validation (Cubit)
- Shopping cart with Cubit
- Multi-step form with Cubit

---

### Week 12 — Bloc (Event-Driven)
> ⏰ 20–25 hours

**Topics:**
- **Bloc Fundamentals** — Events (naming: past tense e.g. `LoginButtonPressed`), `on<Event>` handler, Event transformers (`sequential`, `droppable`, `restartable`, `concurrent`), `bloc_concurrency` package
- **When Bloc > Cubit** — Complex event handling, Debouncing/throttling, Event transformation, Traceability
- **Bloc Advanced:**
  - `BlocObserver` — `onCreate`, `onEvent`, `onChange`, `onTransition`, `onError`, `onClose`
  - `HydratedBloc` — State persistence, `fromJson / toJson`
  - `ReplayBloc` — Undo/Redo functionality

🎯 **Practice Projects:**
- Search with debounce (Bloc)
- Infinite scroll list (Bloc)
- Authentication flow (Bloc)

---

### Week 13 — State Management Mastery
> ⏰ 20–25 hours

**Topics:**
- **Dependency Injection** — `get_it` (Singleton, LazySingleton, Factory), `injectable` (`@injectable`, `@singleton`, Auto-generated injection)
- **Advanced Patterns** — Repository Pattern with Cubit, Cubit + UseCase, Global vs Local state, Nested BlocProviders
- **Cubit Testing** — `bloc_test` package, Testing states & methods, `mocktail` package

🎯 **Practice Projects:**
- Complete app with multiple Cubits
- News app with Cubit
- E-commerce product listing with Cubit

---

## 🔷 PHASE 4: Networking & APIs
*Weeks 14–16*

---

### Week 14 — HTTP & REST APIs
> ⏰ 22–28 hours

**Topics:**
- **Networking Concepts** — HTTP methods (GET, POST, PUT, DELETE, PATCH), Status codes, Headers, JSON body, Query parameters, REST principles
- **Dio Package ⭐** — GET/POST/PUT/DELETE, `BaseOptions`, Interceptors (Request, Response, Error, Logging, Auth Token), Error handling (`DioException`, Cancel token), File upload/download, `FormData`
- **JSON Serialization:**
  - Manual: `fromJson` factory, `toJson` method
  - `json_serializable` — `@JsonSerializable`, `@JsonKey`, `build_runner`
  - `freezed` — `@freezed`, `@JsonSerializable`, Auto-generated `fromJson/toJson`

🎯 **Practice Projects:**
- Fetch & display posts from JSONPlaceholder
- Weather app (OpenWeatherMap API)
- User list with CRUD operations

---

### Week 15 — API Integration with Cubit
> ⏰ 22–28 hours

**Topics:**
- **API Service Layer** — `ApiClient` class (Dio wrapper), Base URL config, Interceptors, Response wrapper
- **Repository Pattern** — Abstract interface, Implementation, Remote & Local data sources, Model mapping
- **Cubit + API Integration** — Loading/Success/Error states, Retry mechanism, Pull to refresh, Pagination (page-based, cursor-based, infinite scroll), Search with debounce
- **Error Handling Strategy** — Custom exceptions, `Either` type (`dartz` package — `Left` for failure, `Right` for success, `fold` method)

🎯 **Practice Projects:**
- News app with API + Cubit
- Movie app (TMDB API) + Cubit
- GitHub user search + Cubit

---

### Week 16 — Advanced Networking
> ⏰ 20–25 hours

**Topics:**
- **Authentication** — JWT (access token, refresh token), Secure token storage, Auto-refresh mechanism, Auth interceptor, Auth state management with Cubit
- **Caching Strategies** — In-memory cache, Dio cache interceptor, Cache invalidation, Offline-first approach
- **Image Handling** — `cached_network_image`, Compression, Multipart upload
- **WebSocket (basics)** — `web_socket_channel`, Connection management, Sending/Receiving messages, Real-time updates

🎯 **Practice Projects:**
- App with JWT authentication
- Basic chat app (WebSocket)
- Social media app with image upload

---

## 🔷 PHASE 5: Local Storage & Database
*Weeks 17–18*

---

### Week 17 — Local Data Storage
> ⏰ 20–25 hours

**Topics:**
- **SharedPreferences** — Save/Read/Remove data (String, int, bool, List), Use cases (preferences, first launch, onboarding)
- **flutter_secure_storage** — Secure tokens/passwords, Encryption
- **SQLite (`sqflite`)** — DB creation, Table creation, CRUD operations, Migrations, Batch operations, DB helper class
- **Hive ⭐** — Box concept, TypeAdapters, CRUD, Lazy & Encrypted boxes, `hive_flutter` setup

🎯 **Practice Projects:**
- Preferences app with SharedPreferences
- Notes app with SQLite
- Bookmarks feature with Hive

---

### Week 18 — Advanced Data Persistence
> ⏰ 18–22 hours

**Topics:**
- **Floor (ORM for SQLite)** — Entity classes, DAO, Database class, Type converters, Migrations, Code generation
- **Drift** — Table definitions, Queries, Reactive streams, Migrations
- **Offline-First Architecture** — Local + Remote data sources, Sync strategies, Conflict resolution, Queue operations, Connectivity checking
- **File System** — `path_provider`, Reading/Writing files, App directories (Documents, Temporary, Cache)

🎯 **Practice Projects:**
- Full offline-capable todo app
- Expense tracker with local DB
- App with data sync (local + API)

---

## 🔷 PHASE 6: Advanced Flutter
*Weeks 19–22*

---

### Week 19 — Advanced UI & Custom Widgets
> ⏰ 22–28 hours

**Topics:**
- **Custom Widgets** — Reusable widgets, Widget composition, Callback functions
- **CustomPaint & Canvas** — `CustomPainter`, Drawing (`drawLine`, `drawRect`, `drawCircle`, `drawPath`, `drawArc`), `GestureDetector + CustomPaint`
- **Advanced Animations** — Custom page transitions, Staggered animations, Physics-based animations, Rive, Lottie, `AnimatedList`
- **Advanced Scrolling** — `NestedScrollView`, `CustomScrollView`, `SliverPersistentHeader`, `ScrollNotification`, Pull to refresh

🎯 **Practice Projects:**
- Custom chart widget
- Animated onboarding screen
- Complex scrolling layout

---

### Week 20 — Platform Features
> ⏰ 22–28 hours

**Topics:**
- **Camera & Media** — `image_picker`, `camera`, `video_player`, `audioplayers`, Image cropping
- **Location & Maps** — `geolocator`, `google_maps_flutter`, Markers & Polylines, Geocoding, Permissions
- **Notifications:**
  - `flutter_local_notifications` — Simple, Scheduled, Notification channels, Actions
  - Firebase Cloud Messaging (FCM) — Push notifications, Foreground/Background handling, Notification navigation
- **Platform Channels (basics)** — `MethodChannel`, `EventChannel`, When to use

📚 **Integrated Udemy Course:**
**[Flutter App Creation: Google Maps Integration Guide in Arabic](https://www.udemy.com/course/flutter-app-creation-google-maps-integration-guide-arabic/)** — Deep dive into the "Location & Maps" topic. Custom markers, polylines, and device location tracking.

🎯 **Practice Projects:**
- Camera app with filters
- Location tracker with map
- Reminder app with notifications

---

### Week 21 — Performance & Optimization
> ⏰ 18–22 hours

**Topics:**
- **Best Practices** — `const` constructors, Widget rebuild optimization, `Keys` (ValueKey, ObjectKey, UniqueKey), `RepaintBoundary`, `ListView.builder` (lazy loading), Image optimization, Memory management
- **Flutter DevTools (Advanced)** — Performance tab, CPU & Memory profiler, Network profiler, Widget rebuild tracking, Frame rendering analysis
- **Code Optimization** — Lazy loading, Pagination, Debouncing & Throttling, `compute()` function (isolates), Build modes (debug, profile, release), Tree shaking
- **App Size Optimization** — Reduce asset sizes, Remove unused packages, ProGuard rules, App Bundle vs APK

🎯 **Practice Projects:**
- Profile & optimize existing app
- Infinite scroll with optimization
- Heavy list with performance tuning

---

### Week 22 — Internationalization & Accessibility
> ⏰ 16–20 hours

**Topics:**
- **Localization (l10n)** — `flutter_localizations`, `intl` package, ARB files, Multi-language support, RTL support (Arabic), `easy_localization`
- **Accessibility (a11y)** — `Semantics` widget, `ExcludeSemantics`, Screen reader support, Contrast, Touch target sizes, Testing accessibility
- **Flavor / Environment Config** — Development, Staging, Production, `flutter_dotenv`, Build configurations

🎯 **Practice Projects:**
- Bilingual app (English + Arabic)
- Accessible app audit & fixes
- App with multiple environments

---

## 🔷 PHASE 7: Architecture & Clean Code
*Weeks 23–25*

📚 **Integrated Udemy Course for Phase 7:**
**[Deep Dive into Clean Architecture in Flutter 2022 [Arabic]](https://www.udemy.com/course/deep-dive-into-clean-architecture-in-flutter-2022arabic/)** — Your ultimate guide for Weeks 23–25. Domain, Data, and Presentation layers, SOLID principles, and dependency injection in real-world Flutter apps.

---

### Week 23 — Clean Architecture
> ⏰ 25–30 hours

**Principles:** Separation of Concerns · Dependency Rule · SOLID (SRP, OCP, LSP, ISP, DIP) · DRY · KISS · YAGNI

**Layers:**

| Layer | Contents |
|-------|---------|
| Presentation | Pages, Widgets, Cubits/Blocs, UI Models |
| Domain | Entities, Use Cases, Repository Interfaces, Failures |
| Data | Models, Repository Implementations, Data Sources (Remote + Local), Mappers |

**Project Structure:**

```
lib/
├── core/
│   ├── constants/
│   ├── errors/          (exceptions.dart, failures.dart)
│   ├── network/         (api_client.dart, network_info.dart)
│   ├── usecases/
│   └── theme/
├── features/
│   └── auth/
│       ├── data/        (models/, datasources/, repositories/)
│       ├── domain/      (entities/, repositories/, usecases/)
│       └── presentation/ (cubit/, pages/, widgets/)
├── injection_container.dart
└── main.dart
```

🎯 **Practice Projects:**
- Refactor existing app to clean architecture
- Build a feature with full clean architecture

---

### Week 24 — Design Patterns & Advanced Architecture
> ⏰ 22–28 hours

**Topics:**
- **Design Patterns** — Repository, Singleton, Factory, Observer, Strategy, Builder, Adapter
- **Dependency Injection (Advanced)** — `get_it` (environment-based registration, scoped instances), `injectable` (Modules, Auto registration, Environment filters)
- **Use Case Pattern** — Abstract UseCase class, Params class, No-params use case, Stream use case, Use case with Either
- **Error Handling Architecture** — Result type pattern, Either (dartz), Custom Failure classes, Error mapping, Global error handling

🎯 **Practice Projects:**
- Authentication module (clean arch)
- Product catalog module (clean arch)

---

### Week 25 — Code Quality & Best Practices
> ⏰ 16–20 hours

**Topics:**
- **Code Quality** — Linting (`analysis_options.yaml`, `flutter_lints`, `very_good_analysis`), Naming conventions (`snake_case` files, `PascalCase` classes, `camelCase` variables), DartDoc comments (`///`)
- **Git Best Practices** — Git workflow, Branch naming, Conventional commits, `.gitignore`, Pull request process
- **Code Generation** — `build_runner`, `freezed`, `json_serializable`, `injectable`, `auto_route`, `flutter_gen`
- **Project Templates** — Very Good CLI, Mason (brick templates), Custom templates

📚 **Integrated Udemy Course:**
**[Master Git & GitHub: Essential Skills for Developers in Arabic](https://www.udemy.com/course/master-git-github-essential-skills-for-developersarabic/)** — Version control, branching strategies, pull requests, and team collaboration.

🎯 **Practice Projects:**
- Set up a complete project template
- Code review & refactoring exercise

---

## 🔷 PHASE 8: Testing
*Weeks 26–27*

---

### Week 26 — Unit & Widget Testing
> ⏰ 22–28 hours

**Topics:**
- **Unit Testing** — `test` package, `test()`, `group()`, `setUp()`, `tearDown()`, `expect()` & matchers, Testing Cubits with `bloc_test`, Testing Repositories & Use Cases
- **Mocking** — `mocktail` package, Mock classes, `when / thenReturn / thenAnswer / thenThrow`, `verify / verifyNever`, Fake classes
- **Widget Testing** — `flutter_test`, `testWidgets()`, `WidgetTester` (pumpWidget, pump, pumpAndSettle), Finders (`find.text`, `find.byType`, `find.byKey`), Matchers (`findsOneWidget`, `findsNothing`), Testing with BlocProvider, Golden tests

🎯 **Practice Projects:**
- Write unit tests for Cubits
- Write unit tests for repositories
- Write widget tests for screens
- Achieve 70%+ code coverage

---

### Week 27 — Integration Testing & CI/CD
> ⏰ 20–25 hours

**Topics:**
- **Integration Testing** — `integration_test` package, E2E test flows, Testing navigation, Performance testing
- **CI/CD:**
  - GitHub Actions — Workflow file (`.yml`), Run tests on push/PR, Build APK/IPA, Coverage reporting
  - Codemagic — Setup, Build configuration, Auto-deploy
  - Fastlane (basics)
  - Code coverage with `lcov` / Codecov
- **TDD** — Red-Green-Refactor cycle, Write test first → Implement → Refactor, TDD with Cubit

🎯 **Practice Projects:**
- Integration tests for a complete feature
- Set up GitHub Actions for a project
- TDD: Build a feature test-first

---

## 🔷 PHASE 9: Firebase & Backend Services
*Weeks 28–30*

---

### Week 28 — Firebase Core
> ⏰ 25–30 hours

**Topics:**
- **Firebase Setup** — Firebase Console, FlutterFire CLI, `firebase_core`, Platform-specific setup
- **Firebase Authentication** — Email/Password (sign up, sign in, sign out, reset, verification), Google Sign-In, Phone Auth, Auth state listener, Auth + Cubit integration
- **Cloud Firestore** — Collections & Documents, CRUD, Queries (`where`, `orderBy`, `limit`), Real-time listeners, Pagination, Subcollections, Batch writes, Transactions, Security rules

🎯 **Practice Projects:**
- Auth system with Firebase + Cubit
- CRUD app with Firestore + Cubit

---

### Week 29 — Firebase Advanced
> ⏰ 22–28 hours

**Topics:**
- **Firebase Storage** — Upload files (images, documents), Download URL, Delete, Upload progress, Security rules
- **Firebase Cloud Messaging (FCM)** — Setup (Android & iOS), Request permissions, FCM token, Foreground/Background notifications, Topic-based messaging, `flutter_local_notifications` integration
- **Firebase Analytics** — Log events, Screen tracking, User properties, Debug view
- **Firebase Crashlytics** — Crash reporting, Non-fatal errors, Custom keys, Crash-free statistics

🎯 **Practice Projects:**
- Social media app with image upload
- Push notifications implementation
- Analytics & crash reporting setup

---

### Week 30 — Additional Backend Services
> ⏰ 20–25 hours

**Topics:**
- **Supabase** — Setup, Authentication, PostgreSQL Database, Storage, Real-time subscriptions, Edge functions
- **Google Services** — Google Maps, Google Places API, Google Sign-In, In-App Purchases (basics)
- **Payment Integration (basics)** — Stripe, PayPal, Payment flow

📚 **Integrated Udemy Course:**
**[Flutter Payment Integration (Stripe, PayPal & More) in Arabic](https://www.udemy.com/course/flutter-payment-integration-stripe-paypal-more-arabic/)** — Integrating Stripe and PayPal SDKs, handling secure transactions and webhooks. Adds real-world e-commerce monetization skills.

🎯 **Practice Projects:**
- App with Supabase backend
- App with maps & payment (demo)

---

## 🔷 PHASE 10: Deployment & Portfolio
*Weeks 31–34*

---

### Week 31 — App Deployment
> ⏰ 18–22 hours

**Android:**
- App signing (Keystore, `key.properties`, Signing config)
- Build APK: `flutter build apk --split-per-abi`
- Build App Bundle: `flutter build appbundle`
- Google Play Console (listing, screenshots, ratings, internal → closed → open → production testing)

**iOS:**
- Apple Developer account, Certificates & Provisioning
- Build IPA: `flutter build ipa`
- App Store Connect (listing, screenshots, TestFlight, App Review)

**Web *(bonus)*:**
- `flutter build web`, Firebase Hosting, Netlify, GitHub Pages

🎯 **Practice:**
- Deploy an app to Google Play (internal testing)
- Deploy a web app to Firebase Hosting

---

### Week 32 — Project 1: E-Commerce App 🏆
> ⏰ 35–45 hours

**Features:** Authentication · Product listing + categories · Search & filter · Shopping cart (Cubit) · Wishlist · Checkout flow · Order history · User profile · Push notifications

**Stack:** Clean Architecture · Cubit · REST API or Firebase · Hive/SQLite cache

---

### Week 33 — Project 2: Social Media / Chat App 🏆
> ⏰ 40–50 hours

**Features:** Authentication · User profiles · Post creation (text + image) · News feed · Like & comment · Follow/Unfollow · Real-time chat · Push notifications · Search users

**Stack:** Clean Architecture · Cubit · Firebase (Firestore + Storage) · Firestore listeners / WebSocket

---

### Week 34 — Project 3: Productivity / Task Manager App 🏆
> ⏰ 30–40 hours

**Features:** Authentication · Task CRUD · Categories & labels · Due dates & reminders · Priority levels · Calendar view · Statistics & charts · Dark/Light theme · Offline support · Multi-language · Local notifications

**Stack:** Clean Architecture · Cubit · SQLite + SharedPreferences · `flutter_local_notifications`

---

## 📊 Skills Checklist

### Dart
- [ ] Write clean, null-safe Dart code
- [ ] Use OOP principles effectively
- [ ] Handle async operations (Future, Stream)
- [ ] Use generics and extensions
- [ ] Handle errors properly

### Flutter UI
- [ ] Build complex, responsive layouts
- [ ] Create custom widgets
- [ ] Implement animations
- [ ] Theme and style applications
- [ ] Handle navigation (go_router)

### State Management
- [ ] Manage state with Cubit
- [ ] Handle complex state scenarios
- [ ] Use BlocBuilder, BlocListener, BlocConsumer
- [ ] Implement Bloc (event-driven)
- [ ] Test Cubits/Blocs

### Networking
- [ ] Make API calls with Dio
- [ ] Handle JSON serialization
- [ ] Implement authentication flow
- [ ] Handle errors & loading states
- [ ] Implement pagination

### Data Storage
- [ ] Use SharedPreferences
- [ ] Work with SQLite/Hive
- [ ] Implement offline-first approach
- [ ] Secure storage for tokens

### Architecture
- [ ] Implement Clean Architecture
- [ ] Use Repository Pattern
- [ ] Apply SOLID principles
- [ ] Use Dependency Injection
- [ ] Write maintainable code

### Testing
- [ ] Write unit tests
- [ ] Write widget tests
- [ ] Test Cubits with bloc_test
- [ ] Mock dependencies
- [ ] Set up CI/CD

### Firebase
- [ ] Authentication
- [ ] Cloud Firestore
- [ ] Storage
- [ ] Cloud Messaging
- [ ] Analytics & Crashlytics

### Deployment
- [ ] Deploy to Google Play Store
- [ ] Deploy to App Store
- [ ] CI/CD pipeline

---

## 📚 Learning Resources

### 🎥 YouTube Channels

| Channel | Notes |
|---------|-------|
| Vandad Nahavandipoor | Comprehensive Dart & Flutter |
| Reso Coder | Clean Architecture focus |
| Flutter (Official) | Official channel |
| The Net Ninja | Beginner-friendly |
| Code With Andrea | Advanced patterns |
| FilledStacks | Architecture & best practices |
| Tharwat Samy | Arabic content |

### 📖 Integrated Udemy Courses (by Phase)

| Phase | Course |
|-------|--------|
| Phase 1 — Week 1 | [Mastering Programming: A Comprehensive Course in Arabic](https://www.udemy.com/course/mastering-programming-a-comprehensive-course-in-arabic/) |
| Phase 1 — Week 1 | [Master Git & GitHub: Essential Skills for Developers in Arabic](https://www.udemy.com/course/master-git-github-essential-skills-for-developersarabic/) |
| Phase 2 — Weeks 5–9 | [Best and Complete Flutter Course for Beginners](https://www.udemy.com/course/best-and-complete-flutter-course-for-beginners/) |
| Phase 3 — Weeks 10–13 | [Flutter BLoC Pattern From Zero to Hero in Arabic](https://www.udemy.com/course/flutter-bloc-pattern-from-zero-to-hero-in-arabic/) |
| Phase 6 — Week 20 | [Flutter App Creation: Google Maps Integration Guide in Arabic](https://www.udemy.com/course/flutter-app-creation-google-maps-integration-guide-arabic/) |
| Phase 7 — Weeks 23–25 | [Deep Dive into Clean Architecture in Flutter 2022 [Arabic]](https://www.udemy.com/course/deep-dive-into-clean-architecture-in-flutter-2022arabic/) |
| Phase 9 — Week 30 | [Flutter Payment Integration (Stripe, PayPal & More) in Arabic](https://www.udemy.com/course/flutter-payment-integration-stripe-paypal-more-arabic/) |

### 📘 Official Documentation

| Resource | URL |
|---------|-----|
| Flutter | flutter.dev |
| Dart | dart.dev |
| Bloc/Cubit | bloclibrary.dev |
| Packages | pub.dev |
| Firebase Flutter | firebase.flutter.dev |

### 🛠️ Tools
- VS Code + Flutter Extension
- Android Studio
- Postman / Thunder Client
- Git & GitHub
- Figma (design reference)
- Firebase Console

---

## 🎯 Final Tips

| | Tip |
|-|-----|
| 🔥 | **Code EVERY DAY** — consistency beats intensity |
| 📱 | **Build projects**, don't just follow tutorials |
| 🐛 | **Debug on your own** before asking for help |
| 📖 | **Read official documentation** |
| 👥 | **Join Flutter communities** (Discord, Reddit, Twitter) |
| 💼 | **Push everything to GitHub** |
| 📝 | **Document your learning journey** |
| 🔄 | **Review and refactor** old code |
| 🎨 | **Focus on UI/UX quality** |
| 🚀 | **Deploy at least 2 apps** to stores |

---

*Generated from Flutter Roadmap — 34 Weeks · 7–8 Months · ~1,000 hours*
