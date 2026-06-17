# Flutter Roadmap — Documentation Index
> Compiled for: https://flutter-roadmap-website.vercel.app/
> Last Updated: 2026

---

## Files in This Package

| # | File | Topic | Sections |
|---|------|-------|----------|
| 1 | `01_flutter_docs.md` | Flutter Framework | Widgets, Layout, Navigation, State, Animations, Networking, Theming, Testing, CLI |
| 2 | `02_dart_docs.md` | Dart Language | Types, OOP, Async, Null Safety, Generics, Libraries, Effective Dart |
| 3 | `03_bloc_cubit_docs.md` | Bloc / Cubit | Cubit, Bloc, Events, States, Flutter Widgets, Architecture, Testing, hydrated_bloc |
| 4 | `04_flutter_packages.md` | Essential Packages | Networking, Navigation, State, Storage, UI, Device, Utilities, Testing |
| 5 | `05_firebase_flutter_docs.md` | Firebase Flutter | Auth, Firestore, Storage, FCM, Analytics, Crashlytics, Remote Config, Rules |

---

## Quick Topic Reference

### Flutter (01_flutter_docs.md)
- What is Flutter / Architecture
- StatelessWidget vs StatefulWidget
- Widget Catalog (Material, Cupertino, Base)
- Layout: Row, Column, Stack, Expanded, Slivers
- Navigation with go_router
- State Management overview
- Networking & JSON
- Animations (Implicit, Explicit, Hero)
- Local Storage (shared_preferences, sqflite, Hive)
- Responsive & Adaptive Design
- Theming & Material 3
- Assets, Fonts, Images
- DevTools
- Testing (unit, widget, integration)
- Flutter CLI Commands

### Dart (02_dart_docs.md)
- Variables: var, final, const, late
- Built-in Types: String, List, Set, Map, Records
- Operators & Null-aware operators
- Control Flow: if/else, loops, switch/patterns (Dart 3)
- Functions: named, optional, closures, higher-order
- Classes: constructors, inheritance, abstract, mixins
- Enums (enhanced Dart 2.17+)
- Extension Methods
- Null Safety
- Async: Future, Stream, Isolates
- Error Handling: try/catch, custom exceptions
- Generics
- Libraries & pubspec.yaml
- Effective Dart Guidelines
- Core Libraries & CLI Tools

### Bloc / Cubit (03_bloc_cubit_docs.md)
- Why Bloc? Core principles
- Cubit: creation, state, onChange, BlocObserver
- Bloc: Events, Bloc class, onTransition
- Cubit vs Bloc comparison table
- Flutter Bloc Widgets: BlocProvider, BlocBuilder, BlocSelector,
  BlocListener, BlocConsumer, RepositoryProvider
- context.read / context.watch / context.select
- 3-Layer Architecture & folder structure
- Event Transformers (bloc_concurrency)
- State Modeling: sealed classes, copyWith
- Testing with bloc_test & mocktail
- hydrated_bloc for persistence
- Naming conventions
- Complete Counter App example

### Flutter Packages (04_flutter_packages.md)
- **Networking:** dio (interceptors, upload, download), http
- **Navigation:** go_router (ShellRoute, deep links, redirect)
- **State:** provider, flutter_bloc, riverpod, get_it
- **Storage:** shared_preferences, hive, sqflite, flutter_secure_storage
- **Serialization:** json_serializable, freezed
- **UI:** cached_network_image, flutter_svg, shimmer, lottie,
  flutter_screenutil, google_fonts
- **Device:** permission_handler, image_picker, path_provider,
  connectivity_plus, url_launcher, share_plus
- **Utilities:** intl, logger, equatable, dartz
- **Testing:** mocktail, golden_toolkit
- Full summary table with pub.dev links

### Firebase Flutter (05_firebase_flutter_docs.md)
- FlutterFire setup (CLI + flutterfire configure)
- **Firebase Auth:** Email/Password, Google, Apple, Phone, User info
- **Cloud Firestore:** CRUD, Queries, Real-time listeners,
  Batch writes, Transactions, Converters
- **Firebase Storage:** Upload, Download, Progress, List files
- **FCM:** Token, Foreground/Background messages, Topics, Local notifications
- **Firebase Analytics:** Custom events, User properties, Screen tracking
- **Firebase Crashlytics:** Flutter errors, custom keys, logging
- **Remote Config:** Fetch, activate, real-time updates
- **Realtime Database:** Read/Write, Queries, Transactions
- **App Check:** Setup for Android/iOS/Web
- **Security Rules:** Firestore & Storage rules
- Common patterns: Auth-gated routing, Firestore user save, Chat stream
- Firebase Emulator Suite

---

## Recommended Learning Order

```
1. Dart Language         → 02_dart_docs.md
         ↓
2. Flutter Framework     → 01_flutter_docs.md
         ↓
3. Essential Packages    → 04_flutter_packages.md
         ↓
4. Bloc / Cubit          → 03_bloc_cubit_docs.md
         ↓
5. Firebase Flutter      → 05_firebase_flutter_docs.md
```

---

## Official Documentation Sources

| Topic | URL |
|-------|-----|
| Flutter | https://docs.flutter.dev |
| Dart | https://dart.dev |
| Bloc | https://bloclibrary.dev |
| pub.dev | https://pub.dev |
| Firebase Flutter | https://firebase.flutter.dev |
| FlutterFire GitHub | https://github.com/firebase/flutterfire |
