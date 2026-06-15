import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const seedRoadmap = mutation({
  args: {},
  handler: async (ctx) => {
    const existingPhases = await ctx.db.query("roadmapPhases").collect();
    const existingWeeks = await ctx.db.query("roadmapWeeks").collect();
    if (existingPhases.length > 0 && existingWeeks.length > 0) {
      return {
        message: "Roadmap already seeded",
        phases: existingPhases.length,
        weeks: existingWeeks.length,
      };
    }

    const phases = [
      { order: 1, title: "Dart Programming Language", duration: "3–4 Weeks", period: "Week 1–4" },
      { order: 2, title: "Flutter Fundamentals", duration: "4–5 Weeks", period: "Week 5–9" },
      { order: 3, title: "State Management (Cubit/Bloc)", duration: "3–4 Weeks", period: "Week 10–13" },
      { order: 4, title: "Networking & APIs", duration: "2–3 Weeks", period: "Week 14–16" },
      { order: 5, title: "Local Storage & Database", duration: "2 Weeks", period: "Week 17–18" },
      { order: 6, title: "Advanced Flutter", duration: "3–4 Weeks", period: "Week 19–22" },
      { order: 7, title: "Architecture & Clean Code", duration: "2–3 Weeks", period: "Week 23–25" },
      { order: 8, title: "Testing", duration: "2 Weeks", period: "Week 26–27" },
      { order: 9, title: "Firebase & Backend Services", duration: "2–3 Weeks", period: "Week 28–30" },
      { order: 10, title: "Deployment & Portfolio Projects", duration: "3–4 Weeks", period: "Week 31–34" },
    ];

    const phaseIds: Id<"roadmapPhases">[] = [];
    for (const phase of phases) {
      const id = await ctx.db.insert("roadmapPhases", phase);
      phaseIds.push(id);
    }

    const weekData: Array<{
      phaseIndex: number;
      order: number;
      title: string;
      estimatedHours: string;
      topics: string[];
      projects: string[];
      integratedCourses?: Array<{ title: string; url: string; description: string }>;
    }> = [
      {
        phaseIndex: 0, order: 1, title: "Dart Basics", estimatedHours: "15–20 hours",
        topics: [
          "Introduction to Dart — What is Dart & Why Dart, Dart SDK, DartPad, VS Code / Android Studio setup",
          "Variables & Data Types — var, final, const, int, double, num, String (interpolation, methods), bool, dynamic vs var, type inference",
          "Operators — Arithmetic, Comparison, Logical, Assignment, Null-aware (??, ?., !), Cascade (..)",
          "Control Flow — if / else if / else, switch-case, Ternary operator, for, while, do-while, break & continue, for-in",
        ],
        projects: ["Calculator app (console)", "Number guessing game", "Grade calculator"],
        integratedCourses: [
          { title: "Mastering Programming: A Comprehensive Course in Arabic", url: "https://www.udemy.com/course/mastering-programming-a-comprehensive-course-in-arabic/", description: "Core programming logic, variables, loops, and control flow." },
          { title: "Master Git & GitHub: Essential Skills for Developers in Arabic", url: "https://www.udemy.com/course/master-git-github-essential-skills-for-developersarabic/", description: "Set up Git and GitHub from day one." },
        ],
      },
      {
        phaseIndex: 0, order: 2, title: "Dart Intermediate", estimatedHours: "18–22 hours",
        topics: [
          "Functions — Declaration & calling, Parameters (required, optional, named), Default values, Arrow functions (=>), Anonymous functions, Higher-order functions, Closures, typedef",
          "Collections: List — add, remove, insert, contains, map, where, reduce, fold, sort, spread operator (...)",
          "Collections: Set — union, intersection, difference, contains, add, remove",
          "Collections: Map — Adding, removing, updating, keys, values, entries, forEach, putIfAbsent, update",
          "Collection methods — any, every, firstWhere, lastWhere, expand, take, skip, toList, toSet, toMap",
          "Null Safety — Nullable types (?), Non-nullable types, Null assertion (!), Null-aware access (?.), Null coalescing (??), late keyword, required keyword",
        ],
        projects: ["Student management system (console)", "To-do list (console)", "Contact book (console)"],
      },
      {
        phaseIndex: 0, order: 3, title: "Dart OOP", estimatedHours: "20–25 hours",
        topics: [
          "Classes & Objects — Properties & Methods, Constructors (Default, Named, Factory, Const, Redirecting), this, Getters & Setters, Static members",
          "Encapsulation — Private members (_), Public members, Library-level privacy",
          "Inheritance — extends, super, @override, Multi-level inheritance, Covariant keyword",
          "Polymorphism — Runtime polymorphism, Method overriding, Type checking (is, is!)",
          "Abstraction — Abstract classes, Abstract methods, Interfaces (implements)",
          "Mixins — with, mixin, on (restrictions), Multiple mixins",
          "Enums — Basic enums, Enhanced enums (Dart 2.17+), Enums with values & methods",
        ],
        projects: ["Bank account system", "Shape hierarchy (area, perimeter)", "Employee management system", "Animal kingdom hierarchy"],
      },
      {
        phaseIndex: 0, order: 4, title: "Dart Advanced", estimatedHours: "22–28 hours",
        topics: [
          "Asynchronous Programming: Future — Future.delayed, .then, .catchError, .whenComplete, Future.wait",
          "Asynchronous Programming: async / await",
          "Asynchronous Programming: try-catch-finally (with async)",
          "Asynchronous Programming: Stream — Single subscription, Broadcast, StreamController, listen, cancel, Stream.periodic, async* / yield / yield*, Stream transformers",
          "Isolates (basics)",
          "Exception Handling — try-catch, on keyword, finally, throw, Custom exceptions, rethrow",
          "Generics — Generic functions, Generic classes, Bounded generics (extends), Generic methods",
          "Extensions — Extension methods, Extension on built-in types, Named extensions",
          "Advanced Concepts — Records (Dart 3.0), Patterns (Dart 3.0), Sealed classes (Dart 3.0), RegExp basics, Date & Time, Math library",
        ],
        projects: ["File reader simulation (async)", "API data fetcher (console)", "Generic repository pattern", "Complete console application combining all concepts"],
      },
      {
        phaseIndex: 1, order: 5, title: "Flutter Setup & Basics", estimatedHours: "20–25 hours",
        topics: [
          "Introduction — Flutter architecture, Widget tree, Everything is a Widget, Hot Reload & Hot Restart",
          "Environment Setup — Flutter SDK, Android Studio, VS Code, Emulator/Simulator, flutter doctor",
          "Project Structure — lib/, pubspec.yaml, android/ & ios/, assets, main.dart & runApp()",
          "Basic Widgets — MaterialApp, Scaffold, AppBar, Text, Container (padding, margin, BoxDecoration, gradient, shadow), SizedBox, Icon, Image (asset, network, BoxFit), Buttons (Elevated, Text, Outlined, FAB), Card",
          "StatelessWidget vs StatefulWidget — Lifecycles (initState, build, setState, didUpdateWidget, dispose)",
        ],
        projects: ["Business card app", "Profile page UI", "Simple counter app"],
        integratedCourses: [
          { title: "Best and Complete Flutter Course for Beginners", url: "https://www.udemy.com/course/best-and-complete-flutter-course-for-beginners/", description: "Primary companion for Weeks 5–9. Beginner-friendly walkthrough of Flutter UI, layouts, navigation, and basic state management." },
        ],
      },
      {
        phaseIndex: 1, order: 6, title: "Layouts & UI", estimatedHours: "22–28 hours",
        topics: [
          "Layout Widgets — Column, Row, Stack, Positioned, Wrap, Expanded, Flexible, FractionallySizedBox, AspectRatio, ConstrainedBox, Spacer",
          "Scrollable Widgets: ListView — ListView(), ListView.builder(), ListView.separated()",
          "Scrollable Widgets: GridView — GridView.count(), GridView.builder(), GridView.extent()",
          "Scrollable Widgets: CustomScrollView & Slivers — SliverList, SliverGrid, SliverAppBar, SliverToBoxAdapter",
          "Scrollable Widgets: PageView, ScrollController",
          "Input Widgets — TextField (TextEditingController, InputDecoration, validation), TextFormField, Form, Checkbox, Radio, Switch, Slider, DropdownButton, DatePicker, TimePicker",
          "Padding & Alignment — Padding, Align, Center, EdgeInsets",
        ],
        projects: ["Login / Register page", "Settings page with forms", "Product listing grid", "Chat UI layout"],
      },
      {
        phaseIndex: 1, order: 7, title: "Navigation & Routing", estimatedHours: "18–22 hours",
        topics: [
          "Navigation Basics — Navigator.push / pop, MaterialPageRoute, Named Routes, Passing data, pushReplacement, pushAndRemoveUntil, popUntil, WillPopScope",
          "Advanced Routing (go_router) ⭐ — GoRouter configuration, GoRoute, context.go / push, Path & Query parameters, Nested routes, ShellRoute, Redirect & Guards",
          "Dialogs & Bottom Sheets — AlertDialog, SimpleDialog, showDialog, showModalBottomSheet, SnackBar, Custom dialogs",
          "Tab Navigation — TabBar, TabBarView, BottomNavigationBar, NavigationBar (Material 3), Drawer, NavigationRail",
        ],
        projects: ["Multi-screen app with navigation", "App with bottom navigation bar", "App with drawer navigation", "Auth flow: login → home → profile"],
      },
      {
        phaseIndex: 1, order: 8, title: "Theming, Styling & Animations", estimatedHours: "22–28 hours",
        topics: [
          "Theming — ThemeData, colorScheme, textTheme, Material 3 (useMaterial3), Dark/Light Theme, Theme.of(context), Google Fonts, Color palettes",
          "Responsive Design — MediaQuery, LayoutBuilder, OrientationBuilder, flutter_screenutil, Adaptive widgets",
          "Animations: Implicit — AnimatedContainer, AnimatedOpacity, AnimatedSwitcher, AnimatedSize",
          "Animations: Explicit — AnimationController, Tween, CurvedAnimation, AnimatedBuilder, TickerProviderStateMixin, Staggered animations",
          "Hero Animations, Page Transitions, Lottie animations",
        ],
        projects: ["App with theme switcher (dark/light)", "Responsive dashboard", "Animated login page", "Product card with hero animation"],
      },
      {
        phaseIndex: 1, order: 9, title: "Essential Packages & Utilities", estimatedHours: "18–22 hours",
        topics: [
          "Package: flutter_svg — SVG rendering", "Package: cached_network_image — Image caching",
          "Package: shimmer — Loading effects", "Package: intl — Date/number formatting",
          "Package: url_launcher — Open URLs", "Package: image_picker — Camera & gallery",
          "Package: permission_handler — Permissions", "Package: connectivity_plus — Network status",
          "Flutter DevTools (Widget Inspector, Performance overlay, Debug paint)",
          "Assets Management (images, fonts, JSON, flutter_gen)",
        ],
        projects: ["Image gallery app", "Complete UI clone (Instagram / Twitter / WhatsApp)", "Portfolio app"],
      },
      {
        phaseIndex: 2, order: 10, title: "Cubit Basics", estimatedHours: "22–28 hours",
        topics: [
          "State Management Overview — Ephemeral vs App state, setState limitations, Overview (Provider, Riverpod, Bloc, GetX)",
          "Bloc Pattern Theory — Business Logic Component, Separation of concerns, Unidirectional data flow, Cubit vs Bloc",
          "Cubit Fundamentals: Packages — flutter_bloc, bloc, equatable",
          "Cubit Fundamentals: Creating a Cubit — Cubit class, state definition, emit(), initial state",
          "Cubit Fundamentals: State types — Initial, Loading, Success/Loaded, Error/Failure (using sealed classes)",
          "Cubit Fundamentals: Providing — BlocProvider, MultiBlocProvider, RepositoryProvider",
          "Cubit Fundamentals: Consuming — BlocBuilder (buildWhen), BlocListener (listenWhen), BlocConsumer, context.read / context.watch",
          "Cubit Fundamentals: Lifecycle — onCreate, onChange, onError, close",
        ],
        projects: ["Counter app with Cubit", "Theme switcher with Cubit", "Simple todo app with Cubit"],
        integratedCourses: [
          { title: "Flutter BLoC Pattern From Zero to Hero in Arabic", url: "https://www.udemy.com/course/flutter-bloc-pattern-from-zero-to-hero-in-arabic/", description: "Deep dive into Cubit, Bloc, state emission, and separation of business logic from the UI." },
        ],
      },
      {
        phaseIndex: 2, order: 11, title: "Advanced Cubit Patterns", estimatedHours: "22–26 hours",
        topics: [
          "Complex State Management — Multiple states with abstract classes, copyWith pattern, freezed package (@freezed, auto-generated copyWith, Union types)",
          "Multiple Cubits Communication — Cubit-to-Cubit, StreamSubscription in Cubit, Shared repositories",
          "Cubit with Forms — Form validation state, Real-time validation, formz package",
          "Best Practices & Folder Structure: feature/ (cubit/, view/, widgets/)",
        ],
        projects: ["Login/Register with form validation (Cubit)", "Shopping cart with Cubit", "Multi-step form with Cubit"],
      },
      {
        phaseIndex: 2, order: 12, title: "Bloc (Event-Driven)", estimatedHours: "20–25 hours",
        topics: [
          "Bloc Fundamentals — Events (naming: past tense e.g. LoginButtonPressed), on<Event> handler, Event transformers (sequential, droppable, restartable, concurrent), bloc_concurrency package",
          "When Bloc > Cubit — Complex event handling, Debouncing/throttling, Event transformation, Traceability",
          "Bloc Advanced: BlocObserver — onCreate, onEvent, onChange, onTransition, onError, onClose",
          "Bloc Advanced: HydratedBloc — State persistence, fromJson / toJson",
          "Bloc Advanced: ReplayBloc — Undo/Redo functionality",
        ],
        projects: ["Search with debounce (Bloc)", "Infinite scroll list (Bloc)", "Authentication flow (Bloc)"],
      },
      {
        phaseIndex: 2, order: 13, title: "State Management Mastery", estimatedHours: "20–25 hours",
        topics: [
          "Dependency Injection — get_it (Singleton, LazySingleton, Factory), injectable (@injectable, @singleton, Auto-generated injection)",
          "Advanced Patterns — Repository Pattern with Cubit, Cubit + UseCase, Global vs Local state, Nested BlocProviders",
          "Cubit Testing — bloc_test package, Testing states & methods, mocktail package",
        ],
        projects: ["Complete app with multiple Cubits", "News app with Cubit", "E-commerce product listing with Cubit"],
      },
      {
        phaseIndex: 3, order: 14, title: "HTTP & REST APIs", estimatedHours: "22–28 hours",
        topics: [
          "Networking Concepts — HTTP methods (GET, POST, PUT, DELETE, PATCH), Status codes, Headers, JSON body, Query parameters, REST principles",
          "Dio Package ⭐ — GET/POST/PUT/DELETE, BaseOptions, Interceptors (Request, Response, Error, Logging, Auth Token), Error handling (DioException, Cancel token), File upload/download, FormData",
          "JSON Serialization: Manual — fromJson factory, toJson method",
          "JSON Serialization: json_serializable — @JsonSerializable, @JsonKey, build_runner",
          "JSON Serialization: freezed — @freezed, @JsonSerializable, Auto-generated fromJson/toJson",
        ],
        projects: ["Fetch & display posts from JSONPlaceholder", "Weather app (OpenWeatherMap API)", "User list with CRUD operations"],
      },
      {
        phaseIndex: 3, order: 15, title: "API Integration with Cubit", estimatedHours: "22–28 hours",
        topics: [
          "API Service Layer — ApiClient class (Dio wrapper), Base URL config, Interceptors, Response wrapper",
          "Repository Pattern — Abstract interface, Implementation, Remote & Local data sources, Model mapping",
          "Cubit + API Integration — Loading/Success/Error states, Retry mechanism, Pull to refresh, Pagination (page-based, cursor-based, infinite scroll), Search with debounce",
          "Error Handling Strategy — Custom exceptions, Either type (dartz package — Left for failure, Right for success, fold method)",
        ],
        projects: ["News app with API + Cubit", "Movie app (TMDB API) + Cubit", "GitHub user search + Cubit"],
      },
      {
        phaseIndex: 3, order: 16, title: "Advanced Networking", estimatedHours: "20–25 hours",
        topics: [
          "Authentication — JWT (access token, refresh token), Secure token storage, Auto-refresh mechanism, Auth interceptor, Auth state management with Cubit",
          "Caching Strategies — In-memory cache, Dio cache interceptor, Cache invalidation, Offline-first approach",
          "Image Handling — cached_network_image, Compression, Multipart upload",
          "WebSocket (basics) — web_socket_channel, Connection management, Sending/Receiving messages, Real-time updates",
        ],
        projects: ["App with JWT authentication", "Basic chat app (WebSocket)", "Social media app with image upload"],
      },
      {
        phaseIndex: 4, order: 17, title: "Local Data Storage", estimatedHours: "20–25 hours",
        topics: [
          "SharedPreferences — Save/Read/Remove data (String, int, bool, List), Use cases (preferences, first launch, onboarding)",
          "flutter_secure_storage — Secure tokens/passwords, Encryption",
          "SQLite (sqflite) — DB creation, Table creation, CRUD operations, Migrations, Batch operations, DB helper class",
          "Hive ⭐ — Box concept, TypeAdapters, CRUD, Lazy & Encrypted boxes, hive_flutter setup",
        ],
        projects: ["Preferences app with SharedPreferences", "Notes app with SQLite", "Bookmarks feature with Hive"],
      },
      {
        phaseIndex: 4, order: 18, title: "Advanced Data Persistence", estimatedHours: "18–22 hours",
        topics: [
          "Floor (ORM for SQLite) — Entity classes, DAO, Database class, Type converters, Migrations, Code generation",
          "Drift — Table definitions, Queries, Reactive streams, Migrations",
          "Offline-First Architecture — Local + Remote data sources, Sync strategies, Conflict resolution, Queue operations, Connectivity checking",
          "File System — path_provider, Reading/Writing files, App directories (Documents, Temporary, Cache)",
        ],
        projects: ["Full offline-capable todo app", "Expense tracker with local DB", "App with data sync (local + API)"],
      },
      {
        phaseIndex: 5, order: 19, title: "Advanced UI & Custom Widgets", estimatedHours: "22–28 hours",
        topics: [
          "Custom Widgets — Reusable widgets, Widget composition, Callback functions",
          "CustomPaint & Canvas — CustomPainter, Drawing (drawLine, drawRect, drawCircle, drawPath, drawArc), GestureDetector + CustomPaint",
          "Advanced Animations — Custom page transitions, Staggered animations, Physics-based animations, Rive, Lottie, AnimatedList",
          "Advanced Scrolling — NestedScrollView, CustomScrollView, SliverPersistentHeader, ScrollNotification, Pull to refresh",
        ],
        projects: ["Custom chart widget", "Animated onboarding screen", "Complex scrolling layout"],
      },
      {
        phaseIndex: 5, order: 20, title: "Platform Features", estimatedHours: "22–28 hours",
        topics: [
          "Camera & Media — image_picker, camera, video_player, audioplayers, Image cropping",
          "Location & Maps — geolocator, google_maps_flutter, Markers & Polylines, Geocoding, Permissions",
          "Notifications: flutter_local_notifications — Simple, Scheduled, Notification channels, Actions",
          "Notifications: Firebase Cloud Messaging (FCM) — Push notifications, Foreground/Background handling, Notification navigation",
          "Platform Channels (basics) — MethodChannel, EventChannel, When to use",
        ],
        projects: ["Camera app with filters", "Location tracker with map", "Reminder app with notifications"],
        integratedCourses: [
          { title: "Flutter App Creation: Google Maps Integration Guide in Arabic", url: "https://www.udemy.com/course/flutter-app-creation-google-maps-integration-guide-arabic/", description: "Deep dive into Location & Maps — custom markers, polylines, and device location tracking." },
        ],
      },
      {
        phaseIndex: 5, order: 21, title: "Performance & Optimization", estimatedHours: "18–22 hours",
        topics: [
          "Best Practices — const constructors, Widget rebuild optimization, Keys (ValueKey, ObjectKey, UniqueKey), RepaintBoundary, ListView.builder (lazy loading), Image optimization, Memory management",
          "Flutter DevTools (Advanced) — Performance tab, CPU & Memory profiler, Network profiler, Widget rebuild tracking, Frame rendering analysis",
          "Code Optimization — Lazy loading, Pagination, Debouncing & Throttling, compute() function (isolates), Build modes (debug, profile, release), Tree shaking",
          "App Size Optimization — Reduce asset sizes, Remove unused packages, ProGuard rules, App Bundle vs APK",
        ],
        projects: ["Profile & optimize existing app", "Infinite scroll with optimization", "Heavy list with performance tuning"],
      },
      {
        phaseIndex: 5, order: 22, title: "Internationalization & Accessibility", estimatedHours: "16–20 hours",
        topics: [
          "Localization (l10n) — flutter_localizations, intl package, ARB files, Multi-language support, RTL support (Arabic), easy_localization",
          "Accessibility (a11y) — Semantics widget, ExcludeSemantics, Screen reader support, Contrast, Touch target sizes, Testing accessibility",
          "Flavor / Environment Config — Development, Staging, Production, flutter_dotenv, Build configurations",
        ],
        projects: ["Bilingual app (English + Arabic)", "Accessible app audit & fixes", "App with multiple environments"],
      },
      {
        phaseIndex: 6, order: 23, title: "Clean Architecture", estimatedHours: "25–30 hours",
        topics: [
          "Principles: Separation of Concerns, Dependency Rule, SOLID (SRP, OCP, LSP, ISP, DIP), DRY, KISS, YAGNI",
          "Layers: Presentation — Pages, Widgets, Cubits/Blocs, UI Models",
          "Layers: Domain — Entities, Use Cases, Repository Interfaces, Failures",
          "Layers: Data — Models, Repository Implementations, Data Sources (Remote + Local), Mappers",
          "Project Structure: lib/core/ (constants, errors, network, usecases, theme), lib/features/ (data, domain, presentation), injection_container.dart",
        ],
        projects: ["Refactor existing app to clean architecture", "Build a feature with full clean architecture"],
        integratedCourses: [
          { title: "Deep Dive into Clean Architecture in Flutter 2022 [Arabic]", url: "https://www.udemy.com/course/deep-dive-into-clean-architecture-in-flutter-2022arabic/", description: "Domain, Data, and Presentation layers, SOLID principles, and dependency injection." },
        ],
      },
      {
        phaseIndex: 6, order: 24, title: "Design Patterns & Advanced Architecture", estimatedHours: "22–28 hours",
        topics: [
          "Design Patterns — Repository, Singleton, Factory, Observer, Strategy, Builder, Adapter",
          "Dependency Injection (Advanced) — get_it (environment-based registration, scoped instances), injectable (Modules, Auto registration, Environment filters)",
          "Use Case Pattern — Abstract UseCase class, Params class, No-params use case, Stream use case, Use case with Either",
          "Error Handling Architecture — Result type pattern, Either (dartz), Custom Failure classes, Error mapping, Global error handling",
        ],
        projects: ["Authentication module (clean arch)", "Product catalog module (clean arch)"],
      },
      {
        phaseIndex: 6, order: 25, title: "Code Quality & Best Practices", estimatedHours: "16–20 hours",
        topics: [
          "Code Quality — Linting (analysis_options.yaml, flutter_lints, very_good_analysis), Naming conventions (snake_case files, PascalCase classes, camelCase variables), DartDoc comments (///)",
          "Git Best Practices — Git workflow, Branch naming, Conventional commits, .gitignore, Pull request process",
          "Code Generation — build_runner, freezed, json_serializable, injectable, auto_route, flutter_gen",
          "Project Templates — Very Good CLI, Mason (brick templates), Custom templates",
        ],
        projects: ["Set up a complete project template", "Code review & refactoring exercise"],
        integratedCourses: [
          { title: "Master Git & GitHub: Essential Skills for Developers in Arabic", url: "https://www.udemy.com/course/master-git-github-essential-skills-for-developersarabic/", description: "Version control, branching strategies, pull requests, and team collaboration." },
        ],
      },
      {
        phaseIndex: 7, order: 26, title: "Unit & Widget Testing", estimatedHours: "22–28 hours",
        topics: [
          "Unit Testing — test package, test(), group(), setUp(), tearDown(), expect() & matchers, Testing Cubits with bloc_test, Testing Repositories & Use Cases",
          "Mocking — mocktail package, Mock classes, when / thenReturn / thenAnswer / thenThrow, verify / verifyNever, Fake classes",
          "Widget Testing — flutter_test, testWidgets(), WidgetTester (pumpWidget, pump, pumpAndSettle), Finders (find.text, find.byType, find.byKey), Matchers (findsOneWidget, findsNothing), Testing with BlocProvider, Golden tests",
        ],
        projects: ["Write unit tests for Cubits", "Write unit tests for repositories", "Write widget tests for screens", "Achieve 70%+ code coverage"],
      },
      {
        phaseIndex: 7, order: 27, title: "Integration Testing & CI/CD", estimatedHours: "20–25 hours",
        topics: [
          "Integration Testing — integration_test package, E2E test flows, Testing navigation, Performance testing",
          "CI/CD: GitHub Actions — Workflow file (.yml), Run tests on push/PR, Build APK/IPA, Coverage reporting",
          "CI/CD: Codemagic — Setup, Build configuration, Auto-deploy",
          "CI/CD: Fastlane (basics)",
          "CI/CD: Code coverage with lcov / Codecov",
          "TDD — Red-Green-Refactor cycle, Write test first → Implement → Refactor, TDD with Cubit",
        ],
        projects: ["Integration tests for a complete feature", "Set up GitHub Actions for a project", "TDD: Build a feature test-first"],
      },
      {
        phaseIndex: 8, order: 28, title: "Firebase Core", estimatedHours: "25–30 hours",
        topics: [
          "Firebase Setup — Firebase Console, FlutterFire CLI, firebase_core, Platform-specific setup",
          "Firebase Authentication — Email/Password (sign up, sign in, sign out, reset, verification), Google Sign-In, Phone Auth, Auth state listener, Auth + Cubit integration",
          "Cloud Firestore — Collections & Documents, CRUD, Queries (where, orderBy, limit), Real-time listeners, Pagination, Subcollections, Batch writes, Transactions, Security rules",
        ],
        projects: ["Auth system with Firebase + Cubit", "CRUD app with Firestore + Cubit"],
      },
      {
        phaseIndex: 8, order: 29, title: "Firebase Advanced", estimatedHours: "22–28 hours",
        topics: [
          "Firebase Storage — Upload files (images, documents), Download URL, Delete, Upload progress, Security rules",
          "Firebase Cloud Messaging (FCM) — Setup (Android & iOS), Request permissions, FCM token, Foreground/Background notifications, Topic-based messaging, flutter_local_notifications integration",
          "Firebase Analytics — Log events, Screen tracking, User properties, Debug view",
          "Firebase Crashlytics — Crash reporting, Non-fatal errors, Custom keys, Crash-free statistics",
        ],
        projects: ["Social media app with image upload", "Push notifications implementation", "Analytics & crash reporting setup"],
      },
      {
        phaseIndex: 8, order: 30, title: "Additional Backend Services", estimatedHours: "20–25 hours",
        topics: [
          "Supabase — Setup, Authentication, PostgreSQL Database, Storage, Real-time subscriptions, Edge functions",
          "Google Services — Google Maps, Google Places API, Google Sign-In, In-App Purchases (basics)",
          "Payment Integration (basics) — Stripe, PayPal, Payment flow",
        ],
        projects: ["App with Supabase backend", "App with maps & payment (demo)"],
        integratedCourses: [
          { title: "Flutter Payment Integration (Stripe, PayPal & More) in Arabic", url: "https://www.udemy.com/course/flutter-payment-integration-stripe-paypal-more-arabic/", description: "Integrating Stripe and PayPal SDKs, handling secure transactions and webhooks." },
        ],
      },
      {
        phaseIndex: 9, order: 31, title: "App Deployment", estimatedHours: "18–22 hours",
        topics: [
          "Android: App signing (Keystore, key.properties, Signing config)",
          "Android: Build APK — flutter build apk --split-per-abi",
          "Android: Build App Bundle — flutter build appbundle",
          "Android: Google Play Console (listing, screenshots, ratings, internal → closed → open → production testing)",
          "iOS: Apple Developer account, Certificates & Provisioning",
          "iOS: Build IPA — flutter build ipa",
          "iOS: App Store Connect (listing, screenshots, TestFlight, App Review)",
          "Web (bonus): flutter build web, Firebase Hosting, Netlify, GitHub Pages",
        ],
        projects: ["Deploy an app to Google Play (internal testing)", "Deploy a web app to Firebase Hosting"],
      },
      {
        phaseIndex: 9, order: 32, title: "Project 1: E-Commerce App", estimatedHours: "35–45 hours",
        topics: [
          "Features: Authentication, Product listing + categories, Search & filter, Shopping cart (Cubit), Wishlist, Checkout flow, Order history, User profile, Push notifications",
          "Stack: Clean Architecture, Cubit, REST API or Firebase, Hive/SQLite cache",
        ],
        projects: ["Build complete E-Commerce app with all features"],
      },
      {
        phaseIndex: 9, order: 33, title: "Project 2: Social Media / Chat App", estimatedHours: "40–50 hours",
        topics: [
          "Features: Authentication, User profiles, Post creation (text + image), News feed, Like & comment, Follow/Unfollow, Real-time chat, Push notifications, Search users",
          "Stack: Clean Architecture, Cubit, Firebase (Firestore + Storage), Firestore listeners / WebSocket",
        ],
        projects: ["Build complete Social Media / Chat app with all features"],
      },
      {
        phaseIndex: 9, order: 34, title: "Project 3: Productivity / Task Manager App", estimatedHours: "30–40 hours",
        topics: [
          "Features: Authentication, Task CRUD, Categories & labels, Due dates & reminders, Priority levels, Calendar view, Statistics & charts, Dark/Light theme, Offline support, Multi-language, Local notifications",
          "Stack: Clean Architecture, Cubit, SQLite + SharedPreferences, flutter_local_notifications",
        ],
        projects: ["Build complete Productivity / Task Manager app with all features"],
      },
    ];

    for (const week of weekData) {
      await ctx.db.insert("roadmapWeeks", {
        phaseId: phaseIds[week.phaseIndex],
        order: week.order,
        title: week.title,
        estimatedHours: week.estimatedHours,
        topics: week.topics,
        projects: week.projects,
        integratedCourses: week.integratedCourses,
      });
    }

    return {
      message: "Roadmap seeded successfully",
      phases: phaseIds.length,
      weeks: weekData.length,
    };
  },
});
