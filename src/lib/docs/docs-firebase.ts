import type { DocEntry } from "./types";

export const firebaseDocs: DocEntry[] = [
  {
    id: "fb-what-is-firebase",
    title: "What is Firebase?",
    category: "firebase",
    summary:
      "Firebase is Google's Backend-as-a-Service (BaaS) platform providing cloud services for mobile and web apps, with official FlutterFire Dart packages.",
    content: `Firebase is Google's **Backend-as-a-Service (BaaS)** platform that provides a suite of cloud services for mobile and web apps. With **FlutterFire**, all Firebase services have official Dart packages maintained by the Firebase and Flutter teams.

### Why Firebase with Flutter?

| Benefit | Description |
|---------|-------------|
| **Zero backend code** | Authentication, database, storage out of the box |
| **Real-time by default** | Firestore and RTDB stream data changes live |
| **Scalable** | Auto-scales from 0 to millions of users |
| **Cross-platform** | Same Firebase project works for iOS, Android, Web, Desktop |
| **Official support** | Maintained by Google / Firebase team |`,
    codeSnippets: [],
    relatedWeeks: [28, 29, 30],
    tags: ["Firebase", "BaaS", "FlutterFire", "backend", "Google"],
    difficulty: "beginner",
    sourceUrl: "https://firebase.flutter.dev",
  },
  {
    id: "fb-flutterfire-packages",
    title: "FlutterFire Packages Overview",
    category: "firebase",
    summary:
      "Complete list of official FlutterFire packages for core, auth, Firestore, storage, messaging, analytics, crashlytics, remote config, app check, performance, and functions.",
    content: `| Package | Firebase Product | pub.dev |
|---------|-----------------|---------|
| \`firebase_core\` | Core (required) | pub.dev/packages/firebase_core |
| \`firebase_auth\` | Authentication | pub.dev/packages/firebase_auth |
| \`cloud_firestore\` | Firestore Database | pub.dev/packages/cloud_firestore |
| \`firebase_database\` | Realtime Database | pub.dev/packages/firebase_database |
| \`firebase_storage\` | Cloud Storage | pub.dev/packages/firebase_storage |
| \`firebase_messaging\` | Cloud Messaging (FCM) | pub.dev/packages/firebase_messaging |
| \`firebase_analytics\` | Analytics | pub.dev/packages/firebase_analytics |
| \`firebase_crashlytics\` | Crashlytics | pub.dev/packages/firebase_crashlytics |
| \`firebase_remote_config\` | Remote Config | pub.dev/packages/firebase_remote_config |
| \`firebase_app_check\` | App Check | pub.dev/packages/firebase_app_check |
| \`firebase_performance\` | Performance Monitoring | pub.dev/packages/firebase_performance |
| \`cloud_functions\` | Cloud Functions | pub.dev/packages/cloud_functions |`,
    codeSnippets: [],
    relatedWeeks: [28, 29, 30],
    tags: [
      "FlutterFire",
      "packages",
      "firebase_core",
      "firebase_auth",
      "cloud_firestore",
      "firebase_storage",
      "firebase_messaging",
      "firebase_analytics",
      "firebase_crashlytics",
      "firebase_remote_config",
      "firebase_app_check",
      "firebase_performance",
      "cloud_functions",
    ],
    difficulty: "beginner",
    sourceUrl: "https://firebase.flutter.dev",
  },
  {
    id: "fb-setup",
    title: "Setup & Initialization",
    category: "firebase",
    summary:
      "FlutterFire CLI setup, Firebase.initializeApp, and firebase_options.dart generation.",
    content: `### Step 1 — Install FlutterFire CLI

### Step 2 — Create Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project**
3. Follow the setup wizard

### Step 3 — Configure Flutter App

This command:
- Registers your app with Firebase (iOS, Android, Web)
- Downloads \`google-services.json\` (Android) and \`GoogleService-Info.plist\` (iOS)
- Generates \`lib/firebase_options.dart\` automatically

### Step 4 — Add Dependencies

### Step 5 — Initialize Firebase in main.dart`,
    codeSnippets: [
      {
        id: "fb-setup-install-cli",
        language: "bash",
        label: "Install FlutterFire CLI",
        code: `# Install FlutterFire CLI
dart pub global activate flutterfire_cli

# Install Firebase CLI
npm install -g firebase-tools
firebase login`,
      },
      {
        id: "fb-setup-configure-app",
        language: "bash",
        label: "Configure Flutter App",
        code: `# In your Flutter project root
flutterfire configure`,
      },
      {
        id: "fb-setup-dependencies",
        language: "yaml",
        label: "pubspec.yaml Dependencies",
        code: `# pubspec.yaml
dependencies:
  firebase_core: ^3.0.0
  firebase_auth: ^5.0.0
  cloud_firestore: ^5.0.0
  firebase_storage: ^12.0.0
  firebase_messaging: ^15.0.0
  firebase_analytics: ^11.0.0
  firebase_crashlytics: ^4.0.0`,
      },
      {
        id: "fb-setup-pub-get",
        language: "bash",
        label: "Install Dependencies",
        code: `flutter pub get`,
      },
      {
        id: "fb-setup-initialize",
        language: "dart",
        label: "Firebase Initialization in main.dart",
        code: `import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart'; // auto-generated by flutterfire

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(const MyApp());
}`,
      },
    ],
    relatedWeeks: [28, 29, 30],
    tags: [
      "Firebase",
      "setup",
      "initialization",
      "flutterfire",
      "CLI",
      "firebase_options",
      "Firebase.initializeApp",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://firebase.flutter.dev",
  },
  {
    id: "fb-auth",
    title: "Firebase Authentication",
    category: "firebase",
    summary:
      "Email/Password, Google, Apple, Phone sign-in, auth state streams, user info, and error handling with Firebase Auth.",
    content: `> \`firebase_auth: ^5.0.0\`

Firebase Auth supports Email/Password, Google, Apple, Phone, Facebook, GitHub, Twitter, and anonymous sign-in.

### Setup

### Listen to Auth State

### Email & Password

### Google Sign-In

### Apple Sign-In

### Phone Authentication

### Current User Info`,
    codeSnippets: [
      {
        id: "fb-auth-setup",
        language: "dart",
        label: "Firebase Auth Setup",
        code: `import 'package:firebase_auth/firebase_auth.dart';

final FirebaseAuth _auth = FirebaseAuth.instance;`,
      },
      {
        id: "fb-auth-state-listener",
        language: "dart",
        label: "Listen to Auth State",
        code: `// Stream of auth changes (listen across app lifetime)
FirebaseAuth.instance.authStateChanges().listen((User? user) {
  if (user == null) {
    print('User is signed out');
  } else {
    print('User is signed in: \${user.email}');
  }
});

// One-time check
final User? user = FirebaseAuth.instance.currentUser;`,
      },
      {
        id: "fb-auth-email-password",
        language: "dart",
        label: "Email & Password Auth",
        code: `// Register
Future<UserCredential> signUp(String email, String password) async {
  try {
    return await FirebaseAuth.instance.createUserWithEmailAndPassword(
      email: email,
      password: password,
    );
  } on FirebaseAuthException catch (e) {
    switch (e.code) {
      case 'weak-password':
        throw Exception('Password is too weak');
      case 'email-already-in-use':
        throw Exception('Email already registered');
      default:
        throw Exception(e.message);
    }
  }
}

// Sign In
Future<UserCredential> signIn(String email, String password) async {
  try {
    return await FirebaseAuth.instance.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
  } on FirebaseAuthException catch (e) {
    switch (e.code) {
      case 'user-not-found':
        throw Exception('No user found for this email');
      case 'wrong-password':
        throw Exception('Wrong password');
      case 'user-disabled':
        throw Exception('This account has been disabled');
      default:
        throw Exception(e.message);
    }
  }
}

// Sign Out
await FirebaseAuth.instance.signOut();

// Password Reset
await FirebaseAuth.instance.sendPasswordResetEmail(email: email);

// Update Profile
await FirebaseAuth.instance.currentUser?.updateDisplayName('Mustafa');
await FirebaseAuth.instance.currentUser?.updatePhotoURL('https://...');

// Email Verification
await FirebaseAuth.instance.currentUser?.sendEmailVerification();
final isVerified = FirebaseAuth.instance.currentUser?.emailVerified ?? false;`,
      },
      {
        id: "fb-auth-google-deps",
        language: "yaml",
        label: "Google Sign-In Dependencies",
        code: `dependencies:
  google_sign_in: ^6.2.0`,
      },
      {
        id: "fb-auth-google-sign-in",
        language: "dart",
        label: "Google Sign-In",
        code: `import 'package:google_sign_in/google_sign_in.dart';

Future<UserCredential?> signInWithGoogle() async {
  // Trigger the authentication flow
  final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
  if (googleUser == null) return null; // User cancelled

  // Obtain the auth details
  final GoogleSignInAuthentication googleAuth =
      await googleUser.authentication;

  // Create credential
  final credential = GoogleAuthProvider.credential(
    accessToken: googleAuth.accessToken,
    idToken: googleAuth.idToken,
  );

  // Sign in to Firebase
  return await FirebaseAuth.instance.signInWithCredential(credential);
}`,
      },
      {
        id: "fb-auth-apple-deps",
        language: "yaml",
        label: "Apple Sign-In Dependencies",
        code: `dependencies:
  sign_in_with_apple: ^6.0.0`,
      },
      {
        id: "fb-auth-apple-sign-in",
        language: "dart",
        label: "Apple Sign-In",
        code: `import 'package:sign_in_with_apple/sign_in_with_apple.dart';

Future<UserCredential> signInWithApple() async {
  final appleCredential = await SignInWithApple.getAppleIDCredential(
    scopes: [
      AppleIDAuthorizationScopes.email,
      AppleIDAuthorizationScopes.fullName,
    ],
  );

  final oauthCredential = OAuthProvider('apple.com').credential(
    idToken: appleCredential.identityToken,
    accessToken: appleCredential.authorizationCode,
  );

  return await FirebaseAuth.instance.signInWithCredential(oauthCredential);
}`,
      },
      {
        id: "fb-auth-phone",
        language: "dart",
        label: "Phone Authentication",
        code: `// Step 1 — Send OTP
await FirebaseAuth.instance.verifyPhoneNumber(
  phoneNumber: '+201234567890',
  verificationCompleted: (PhoneAuthCredential credential) async {
    // Auto-retrieval (Android only)
    await FirebaseAuth.instance.signInWithCredential(credential);
  },
  verificationFailed: (FirebaseAuthException e) {
    print('Verification failed: \${e.message}');
  },
  codeSent: (String verificationId, int? resendToken) {
    // Store verificationId to use after user enters OTP
    myVerificationId = verificationId;
  },
  codeAutoRetrievalTimeout: (String verificationId) {},
);

// Step 2 — Verify OTP
final credential = PhoneAuthProvider.credential(
  verificationId: myVerificationId,
  smsCode: userEnteredOTP,
);
await FirebaseAuth.instance.signInWithCredential(credential);`,
      },
      {
        id: "fb-auth-user-info",
        language: "dart",
        label: "Current User Info",
        code: `final user = FirebaseAuth.instance.currentUser!;
print(user.uid);            // unique user ID
print(user.email);          // email
print(user.displayName);    // display name
print(user.photoURL);       // profile photo URL
print(user.emailVerified);  // bool
print(user.phoneNumber);    // phone number
print(user.isAnonymous);    // bool
print(user.metadata.creationTime); // when account was created
print(user.providerData);   // list of sign-in providers`,
      },
    ],
    relatedWeeks: [28, 29, 30],
    tags: [
      "firebase_auth",
      "authentication",
      "Email",
      "Google",
      "Apple",
      "Phone",
      "sign in",
      "sign up",
      "auth state",
      "FirebaseAuthException",
      "oauth",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://firebase.flutter.dev",
  },
  {
    id: "fb-firestore",
    title: "Cloud Firestore",
    category: "firebase",
    summary:
      "NoSQL real-time database — data model, CRUD operations, queries, real-time listeners, batch writes, transactions, and type-safe converters.",
    content: `> \`cloud_firestore: ^5.0.0\`

Firestore is a **NoSQL, real-time, cloud-hosted document database** organized in collections and documents.

### Data Model

### Setup

### CRUD Operations

### Queries & Filters

### Real-Time Listeners (Streams)

### Batch Writes & Transactions

### Data Modeling with Converter`,
    codeSnippets: [
      {
        id: "fb-firestore-data-model",
        language: "bash",
        label: "Firestore Data Model",
        code: `Firestore
├── users/                      ← Collection
│   ├── userId123/              ← Document
│   │   ├── name: "Mustafa"     ← Field
│   │   ├── age: 25
│   │   └── orders/             ← Subcollection
│   │       └── order1/
│   └── userId456/
└── products/
    └── productId789/`,
      },
      {
        id: "fb-firestore-setup",
        language: "dart",
        label: "Firestore Setup",
        code: `import 'package:cloud_firestore/cloud_firestore.dart';

final db = FirebaseFirestore.instance;

// Optional: enable offline persistence (enabled by default on mobile)
db.settings = const Settings(persistenceEnabled: true, cacheSizeBytes: Settings.CACHE_SIZE_UNLIMITED);`,
      },
      {
        id: "fb-firestore-crud",
        language: "dart",
        label: "Firestore CRUD Operations",
        code: `// CREATE — add document (auto-generated ID)
final docRef = await db.collection('users').add({
  'name': 'Mustafa',
  'age': 25,
  'email': 'mustafa@example.com',
  'createdAt': FieldValue.serverTimestamp(),
});
print('Created with ID: \${docRef.id}');

// CREATE — set document with known ID
await db.collection('users').doc('userId123').set({
  'name': 'Mustafa',
  'age': 25,
});

// SET with merge (merge=true won't overwrite existing fields)
await db.collection('users').doc('userId123').set(
  {'email': 'new@email.com'},
  SetOptions(merge: true),
);

// READ — get single document
final docSnap = await db.collection('users').doc('userId123').get();
if (docSnap.exists) {
  final data = docSnap.data() as Map<String, dynamic>;
  print(data['name']); // Mustafa
}

// READ — get all documents in collection
final querySnap = await db.collection('users').get();
for (final doc in querySnap.docs) {
  print('\${doc.id}: \${doc.data()}');
}

// UPDATE — update specific fields only
await db.collection('users').doc('userId123').update({
  'age': 26,
  'updatedAt': FieldValue.serverTimestamp(),
});

// DELETE — delete document
await db.collection('users').doc('userId123').delete();

// DELETE — delete a field
await db.collection('users').doc('userId123').update({
  'temporaryField': FieldValue.delete(),
});`,
      },
      {
        id: "fb-firestore-queries",
        language: "dart",
        label: "Firestore Queries & Filters",
        code: `// Where clause
final query = await db
    .collection('users')
    .where('age', isGreaterThan: 18)
    .where('isActive', isEqualTo: true)
    .get();

// whereIn
final query = await db
    .collection('products')
    .where('category', whereIn: ['electronics', 'phones'])
    .get();

// Order and limit
final query = await db
    .collection('posts')
    .orderBy('createdAt', descending: true)
    .limit(10)
    .get();

// Pagination with startAfterDocument
QueryDocumentSnapshot? lastDoc;

Future<List<QueryDocumentSnapshot>> fetchNextPage() async {
  Query query = db.collection('posts').orderBy('createdAt').limit(10);
  if (lastDoc != null) {
    query = query.startAfterDocument(lastDoc!);
  }
  final snap = await query.get();
  if (snap.docs.isNotEmpty) lastDoc = snap.docs.last;
  return snap.docs;
}

// Array contains
db.collection('posts')
    .where('tags', arrayContains: 'flutter')
    .get();

// Composite index (must be created in Firebase Console)
db.collection('posts')
    .where('authorId', isEqualTo: userId)
    .orderBy('createdAt', descending: true)
    .limit(20)
    .get();`,
      },
      {
        id: "fb-firestore-realtime",
        language: "dart",
        label: "Firestore Real-Time Listeners",
        code: `// Listen to a document
db.collection('users').doc('userId123').snapshots().listen((snapshot) {
  if (snapshot.exists) {
    final data = snapshot.data()!;
    print('Name: \${data['name']}');
  }
});

// Listen to a collection query
db
    .collection('messages')
    .where('chatId', isEqualTo: chatId)
    .orderBy('createdAt')
    .snapshots()
    .listen((QuerySnapshot snapshot) {
  for (final change in snapshot.docChanges) {
    switch (change.type) {
      case DocumentChangeType.added:
        print('New message: \${change.doc.data()}');
      case DocumentChangeType.modified:
        print('Modified: \${change.doc.id}');
      case DocumentChangeType.removed:
        print('Removed: \${change.doc.id}');
    }
  }
});

// Use with StreamBuilder in Flutter
StreamBuilder<DocumentSnapshot>(
  stream: db.collection('users').doc(userId).snapshots(),
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return const CircularProgressIndicator();
    }
    if (!snapshot.hasData || !snapshot.data!.exists) {
      return const Text('No data');
    }
    final data = snapshot.data!.data() as Map<String, dynamic>;
    return Text('Hello, \${data['name']}');
  },
)`,
      },
      {
        id: "fb-firestore-batch-transaction",
        language: "dart",
        label: "Batch Writes & Transactions",
        code: `// Batch — multiple writes atomically (no reads)
final batch = db.batch();

batch.set(db.collection('users').doc('user1'), {'name': 'Alice'});
batch.update(db.collection('users').doc('user2'), {'score': 100});
batch.delete(db.collection('users').doc('user3'));

await batch.commit(); // all or nothing

// Transaction — read then write atomically
await db.runTransaction((transaction) async {
  final docRef = db.collection('products').doc('prod1');
  final snapshot = await transaction.get(docRef);

  if (!snapshot.exists) throw Exception('Product not found');

  final currentStock = snapshot.data()!['stock'] as int;
  if (currentStock < 1) throw Exception('Out of stock');

  transaction.update(docRef, {'stock': currentStock - 1});
});`,
      },
      {
        id: "fb-firestore-converter",
        language: "dart",
        label: "Data Modeling with Converter",
        code: `class UserModel {
  final String id;
  final String name;
  final int age;

  const UserModel({required this.id, required this.name, required this.age});

  factory UserModel.fromFirestore(
      DocumentSnapshot<Map<String, dynamic>> snap, _) {
    final data = snap.data()!;
    return UserModel(id: snap.id, name: data['name'], age: data['age']);
  }

  Map<String, Object?> toFirestore() => {'name': name, 'age': age};
}

// Typed collection reference
final usersRef = db.collection('users').withConverter<UserModel>(
  fromFirestore: UserModel.fromFirestore,
  toFirestore: (user, _) => user.toFirestore(),
);

// Now use with type safety
final snap = await usersRef.doc('userId123').get();
final user = snap.data(); // UserModel?`,
      },
    ],
    relatedWeeks: [28, 29, 30],
    tags: [
      "cloud_firestore",
      "Firestore",
      "NoSQL",
      "CRUD",
      "real-time",
      "queries",
      "batch writes",
      "transactions",
      "converter",
      "StreamBuilder",
      "pagination",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://firebase.flutter.dev",
  },
  {
    id: "fb-storage",
    title: "Firebase Storage",
    category: "firebase",
    summary:
      "File upload/download with progress tracking, download URLs, file listing, and upload control (pause/resume/cancel).",
    content: `> \`firebase_storage: ^12.0.0\`

Cloud Storage stores files (images, videos, documents) with fine-grained access control.`,
    codeSnippets: [
      {
        id: "fb-storage-operations",
        language: "dart",
        label: "Storage Upload, Download, Delete & List",
        code: `import 'package:firebase_storage/firebase_storage.dart';
import 'dart:io';

final storageRef = FirebaseStorage.instance.ref();

// UPLOAD — from File
Future<String> uploadFile(File file, String path) async {
  final ref = storageRef.child(path); // e.g. 'avatars/userId123.jpg'

  final uploadTask = ref.putFile(
    file,
    SettableMetadata(contentType: 'image/jpeg'),
  );

  // Track progress
  uploadTask.snapshotEvents.listen((TaskSnapshot snap) {
    final progress = snap.bytesTransferred / snap.totalBytes;
    print('Upload: \${(progress * 100).toStringAsFixed(0)}%');
  });

  final snapshot = await uploadTask;
  return await snapshot.ref.getDownloadURL();
}

// UPLOAD — from bytes
await storageRef.child('files/data.json').putData(
  Uint8List.fromList(utf8.encode(jsonString)),
  SettableMetadata(contentType: 'application/json'),
);

// DOWNLOAD — get URL
final downloadURL = await storageRef
    .child('avatars/userId123.jpg')
    .getDownloadURL();

// DOWNLOAD — to file
final file = File('/local/path/file.jpg');
await storageRef.child('remote/file.jpg').writeToFile(file);

// DELETE
await storageRef.child('avatars/userId123.jpg').delete();

// LIST files
final result = await storageRef.child('avatars').listAll();
for (final item in result.items) {
  print(item.name);
  print(await item.getDownloadURL());
}

// Resume / pause / cancel upload
final task = ref.putFile(file);
task.pause();
task.resume();
task.cancel();`,
      },
    ],
    relatedWeeks: [28, 29, 30],
    tags: [
      "firebase_storage",
      "file upload",
      "file download",
      "download URL",
      "progress",
      "storage",
      "putFile",
      "getDownloadURL",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://firebase.flutter.dev",
  },
  {
    id: "fb-messaging",
    title: "Cloud Messaging (FCM)",
    category: "firebase",
    summary:
      "Push notifications for Android/iOS/Web — foreground, background, topics, tokens, and local notifications integration.",
    content: `> \`firebase_messaging: ^15.0.0\`

Push notifications for Android, iOS, and Web.

### Local Notifications (flutter_local_notifications)`,
    codeSnippets: [
      {
        id: "fb-messaging-setup",
        language: "dart",
        label: "FCM Setup & Handlers",
        code: `import 'package:firebase_messaging/firebase_messaging.dart';

// Initialize
final messaging = FirebaseMessaging.instance;

// Request permission (iOS / Web)
final settings = await messaging.requestPermission(
  alert: true,
  badge: true,
  sound: true,
  provisional: false,
);
print('Permission: \${settings.authorizationStatus}');

// Get FCM token (send this to your server)
final token = await messaging.getToken();
print('FCM Token: \$token');

// Token refresh
messaging.onTokenRefresh.listen((newToken) {
  // Update token on your server
  saveTokenToServer(newToken);
});

// Foreground messages
FirebaseMessaging.onMessage.listen((RemoteMessage message) {
  print('Got a message in foreground!');
  print('Title: \${message.notification?.title}');
  print('Body: \${message.notification?.body}');
  print('Data: \${message.data}');

  // Show local notification using flutter_local_notifications
  showLocalNotification(message);
});

// Background message handler (top-level function — required)
@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  print('Background message: \${message.messageId}');
}

// Register background handler in main
FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

// App opened from notification (terminated state)
final initialMessage = await FirebaseMessaging.instance.getInitialMessage();
if (initialMessage != null) {
  handleNotificationTap(initialMessage);
}

// App opened from notification (background state)
FirebaseMessaging.onMessageOpenedApp.listen(handleNotificationTap);

// Subscribe to topic
await messaging.subscribeToTopic('news');
await messaging.unsubscribeFromTopic('news');`,
      },
      {
        id: "fb-messaging-local-deps",
        language: "yaml",
        label: "Local Notifications Dependencies",
        code: `dependencies:
  flutter_local_notifications: ^18.0.0`,
      },
      {
        id: "fb-messaging-local-notifications",
        language: "dart",
        label: "Local Notifications Setup & Show",
        code: `final flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();

// Initialize
await flutterLocalNotificationsPlugin.initialize(
  const InitializationSettings(
    android: AndroidInitializationSettings('@mipmap/ic_launcher'),
    iOS: DarwinInitializationSettings(),
  ),
  onDidReceiveNotificationResponse: (details) {
    // handle tap
  },
);

// Show notification
await flutterLocalNotificationsPlugin.show(
  0,
  message.notification?.title ?? 'New message',
  message.notification?.body ?? '',
  const NotificationDetails(
    android: AndroidNotificationDetails(
      'channel_id',
      'channel_name',
      importance: Importance.max,
      priority: Priority.high,
    ),
    iOS: DarwinNotificationDetails(),
  ),
);`,
      },
    ],
    relatedWeeks: [28, 29, 30],
    tags: [
      "FCM",
      "firebase_messaging",
      "push notifications",
      "topics",
      "tokens",
      "background handler",
      "flutter_local_notifications",
      "foreground messages",
    ],
    difficulty: "advanced",
    sourceUrl: "https://firebase.flutter.dev",
  },
  {
    id: "fb-analytics",
    title: "Firebase Analytics",
    category: "firebase",
    summary:
      "Track user behavior with custom events, user IDs, screen views, pre-defined events, and automatic screen tracking.",
    content: `> \`firebase_analytics: ^11.0.0\`

Track user behavior and app usage automatically and with custom events.`,
    codeSnippets: [
      {
        id: "fb-analytics-events",
        language: "dart",
        label: "Analytics Events & Tracking",
        code: `import 'package:firebase_analytics/firebase_analytics.dart';

final analytics = FirebaseAnalytics.instance;

// Auto-tracked events: first_open, session_start, screen_view, etc.

// Log custom event
await analytics.logEvent(
  name: 'purchase',
  parameters: {
    'item_id': 'prod_123',
    'item_name': 'Flutter Course',
    'value': 49.99,
    'currency': 'USD',
  },
);

// Set user ID (for cross-device tracking)
await analytics.setUserId(id: FirebaseAuth.instance.currentUser?.uid);

// Set user property
await analytics.setUserProperty(name: 'plan', value: 'premium');

// Log screen view
await analytics.logScreenView(
  screenName: 'Home',
  screenClass: 'HomePage',
);

// Pre-defined events (recommended for consistency)
await analytics.logLogin(loginMethod: 'google');
await analytics.logSignUp(signUpMethod: 'email');
await analytics.logSearch(searchTerm: 'flutter tutorial');
await analytics.logShare(
  contentType: 'article',
  itemId: 'article_123',
  method: 'Twitter',
);

// Use NavigatorObserver for automatic screen tracking
MaterialApp(
  navigatorObservers: [
    FirebaseAnalyticsObserver(analytics: analytics),
  ],
)`,
      },
    ],
    relatedWeeks: [28, 29, 30],
    tags: [
      "firebase_analytics",
      "analytics",
      "events",
      "tracking",
      "user properties",
      "screen views",
      "logEvent",
      "FirebaseAnalyticsObserver",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://firebase.flutter.dev",
  },
  {
    id: "fb-crashlytics",
    title: "Firebase Crashlytics",
    category: "firebase",
    summary:
      "Real-time crash reporting with Flutter error capture, custom keys, user info, and collection toggle.",
    content: `> \`firebase_crashlytics: ^4.0.0\`

Real-time crash reporting and monitoring.`,
    codeSnippets: [
      {
        id: "fb-crashlytics-setup",
        language: "dart",
        label: "Crashlytics Setup & Reporting",
        code: `import 'package:firebase_crashlytics/firebase_crashlytics.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  // Pass all Flutter errors to Crashlytics
  FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterFatalError;

  // Pass async errors outside Flutter framework
  PlatformDispatcher.instance.onError = (error, stack) {
    FirebaseCrashlytics.instance.recordError(error, stack, fatal: true);
    return true;
  };

  runApp(const MyApp());
}

// Manual crash reporting
try {
  await riskyOperation();
} catch (e, stack) {
  FirebaseCrashlytics.instance.recordError(e, stack);
}

// Set user info for better crash context
FirebaseCrashlytics.instance.setUserIdentifier(userId);
FirebaseCrashlytics.instance.setCustomKey('plan', 'premium');
FirebaseCrashlytics.instance.setCustomKey('last_screen', 'checkout');

// Add custom log before a crash
FirebaseCrashlytics.instance.log('User clicked checkout');

// Force a test crash
FirebaseCrashlytics.instance.crash();

// Toggle collection (e.g. respect user privacy)
await FirebaseCrashlytics.instance.setCrashlyticsCollectionEnabled(true);`,
      },
    ],
    relatedWeeks: [28, 29, 30],
    tags: [
      "firebase_crashlytics",
      "Crashlytics",
      "crash reporting",
      "error tracking",
      "fatal errors",
      "debugging",
      "FlutterError",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://firebase.flutter.dev",
  },
  {
    id: "fb-remote-config",
    title: "Firebase Remote Config",
    category: "firebase",
    summary:
      "Change app behavior without publishing updates — defaults, fetch, activate, and listen to real-time config updates.",
    content: `> \`firebase_remote_config: ^5.0.0\`

Change app behavior and appearance without publishing an update.`,
    codeSnippets: [
      {
        id: "fb-remote-config-setup",
        language: "dart",
        label: "Remote Config Setup & Usage",
        code: `import 'package:firebase_remote_config/firebase_remote_config.dart';

final remoteConfig = FirebaseRemoteConfig.instance;

// Setup with defaults and fetch settings
await remoteConfig.setConfigSettings(RemoteConfigSettings(
  fetchTimeout: const Duration(minutes: 1),
  minimumFetchInterval: const Duration(hours: 1),
));

// Set default values (used when offline or before first fetch)
await remoteConfig.setDefaults({
  'welcome_message': 'Welcome to my app!',
  'feature_dark_mode': false,
  'max_items_per_page': 20,
  'maintenance_mode': false,
});

// Fetch and activate
await remoteConfig.fetchAndActivate();

// Read values
final welcomeMsg = remoteConfig.getString('welcome_message');
final darkMode = remoteConfig.getBool('feature_dark_mode');
final maxItems = remoteConfig.getInt('max_items_per_page');
final maintenanceMode = remoteConfig.getBool('maintenance_mode');

// Listen to real-time updates
remoteConfig.onConfigUpdated.listen((event) async {
  await remoteConfig.activate();
  // Re-read updated values
  print('Config updated: \${event.updatedKeys}');
});`,
      },
    ],
    relatedWeeks: [28, 29, 30],
    tags: [
      "firebase_remote_config",
      "Remote Config",
      "feature flags",
      "A/B testing",
      "configuration",
      "remote configuration",
      "fetchAndActivate",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://firebase.flutter.dev",
  },
  {
    id: "fb-realtime-database",
    title: "Firebase Realtime Database",
    category: "firebase",
    summary:
      "JSON-based real-time database for low-latency, high-frequency updates — write, read, listen, delete, transactions, and queries.",
    content: `> \`firebase_database: ^11.0.0\`

A NoSQL cloud database that stores and syncs data in **JSON** format in real time.

> Use **Firestore** for new projects. Realtime Database is better for very low-latency, high-frequency updates (e.g. chat, gaming).`,
    codeSnippets: [
      {
        id: "fb-rtdb-operations",
        language: "dart",
        label: "Realtime Database Operations",
        code: `import 'package:firebase_database/firebase_database.dart';

final db = FirebaseDatabase.instance;

// Write
await db.ref('users/userId123').set({
  'name': 'Mustafa',
  'age': 25,
});

// Update specific fields
await db.ref('users/userId123').update({'age': 26});

// Read once
final snapshot = await db.ref('users/userId123').get();
if (snapshot.exists) {
  print(snapshot.value);
}

// Listen to value changes (real-time)
db.ref('users/userId123').onValue.listen((DatabaseEvent event) {
  final data = event.snapshot.value as Map<dynamic, dynamic>?;
  print(data?['name']);
});

// Listen to child events
db.ref('messages/chatId').onChildAdded.listen((event) {
  print('New message: \${event.snapshot.value}');
});

// Delete
await db.ref('users/userId123').remove();

// Server timestamp
await db.ref('messages').push().set({
  'text': 'Hello',
  'timestamp': ServerValue.timestamp,
});

// Transaction (atomic update)
await db.ref('counters/views').runTransaction((value) {
  return Transaction.success((value as int? ?? 0) + 1);
});

// Queries
await db.ref('products')
    .orderByChild('price')
    .limitToFirst(10)
    .get();

await db.ref('products')
    .orderByChild('price')
    .startAt(100)
    .endAt(500)
    .get();`,
      },
    ],
    relatedWeeks: [28, 29, 30],
    tags: [
      "firebase_database",
      "Realtime Database",
      "RTDB",
      "JSON",
      "real-time",
      "onValue",
      "onChildAdded",
      "ServerValue",
      "Transaction",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://firebase.flutter.dev",
  },
  {
    id: "fb-app-check",
    title: "Firebase App Check",
    category: "firebase",
    summary:
      "Protect Firebase resources from abuse by verifying calls come from your legitimate app using debug or attestation providers.",
    content: `> \`firebase_app_check: ^0.3.0\`

Protects your Firebase resources from abuse by verifying that calls come from your legitimate app.`,
    codeSnippets: [
      {
        id: "fb-app-check-setup",
        language: "dart",
        label: "App Check Activation",
        code: `import 'package:firebase_app_check/firebase_app_check.dart';

// Initialize before Firebase services
await FirebaseAppCheck.instance.activate(
  // Use debug provider in debug mode, attestation in release
  androidProvider: AndroidProvider.debug, // or .playIntegrity
  appleProvider: AppleProvider.debug,     // or .deviceCheck / .appAttest
  webProvider: ReCaptchaV3Provider('your-site-key'),
);`,
      },
    ],
    relatedWeeks: [28, 29, 30],
    tags: [
      "firebase_app_check",
      "App Check",
      "security",
      "abuse prevention",
      "attestation",
      "ReCaptcha",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://firebase.flutter.dev",
  },
  {
    id: "fb-security-rules",
    title: "Security Rules",
    category: "firebase",
    summary:
      "Protect Firestore and Storage with request.auth, resource.data, validation, and admin-only access patterns.",
    content: `### Firestore Rules

### Storage Rules`,
    codeSnippets: [
      {
        id: "fb-rules-firestore",
        language: "javascript",
        label: "Firestore Security Rules",
        code: `// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can only read/write their own document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Public read, authenticated write
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
      allow delete: if request.auth != null &&
                    request.auth.uid == resource.data.authorId;
    }

    // Validate data
    match /products/{productId} {
      allow create: if request.auth != null
        && request.resource.data.price is number
        && request.resource.data.price > 0
        && request.resource.data.name is string
        && request.resource.data.name.size() > 0;
    }

    // Admin-only
    match /admin/{document=**} {
      allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}`,
      },
      {
        id: "fb-rules-storage",
        language: "javascript",
        label: "Storage Security Rules",
        code: `// storage.rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Avatars — users can only upload their own
    match /avatars/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024    // 5MB max
                   && request.resource.contentType.matches('image/.*');
    }

    // Public files — anyone can read
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`,
      },
    ],
    relatedWeeks: [28, 29, 30],
    tags: [
      "security rules",
      "Firestore rules",
      "Storage rules",
      "authorization",
      "data protection",
      "request.auth",
      "resource.data",
      "validation",
      "admin",
    ],
    difficulty: "advanced",
    sourceUrl: "https://firebase.flutter.dev",
  },
  {
    id: "fb-patterns",
    title: "Common Patterns",
    category: "firebase",
    summary:
      "Auth-gated routing with go_router, saving user documents after sign-up, and chat message streams with Firestore.",
    content: `### Auth-Gated App with go_router

### Save User to Firestore After Sign-Up

### Chat App Message Stream`,
    codeSnippets: [
      {
        id: "fb-patterns-auth-router",
        language: "dart",
        label: "Auth-Gated App with go_router",
        code: `final GoRouter router = GoRouter(
  redirect: (context, state) {
    final isLoggedIn = FirebaseAuth.instance.currentUser != null;
    final goingToLogin = state.matchedLocation == '/login';

    if (!isLoggedIn && !goingToLogin) return '/login';
    if (isLoggedIn && goingToLogin) return '/home';
    return null;
  },
  routes: [...],
);

// Refresh router on auth state changes
class AuthRefreshStream extends ChangeNotifier {
  AuthRefreshStream(Stream<dynamic> stream) {
    stream.asBroadcastStream().listen((_) => notifyListeners());
  }
}

GoRouter(
  refreshListenable: AuthRefreshStream(
    FirebaseAuth.instance.authStateChanges(),
  ),
  redirect: ...,
  routes: [...],
)`,
      },
      {
        id: "fb-patterns-save-user",
        language: "dart",
        label: "Save User to Firestore After Sign-Up",
        code: `Future<void> createUserDocument(User user) async {
  final userDoc = FirebaseFirestore.instance.collection('users').doc(user.uid);

  await userDoc.set({
    'uid': user.uid,
    'email': user.email,
    'displayName': user.displayName ?? '',
    'photoURL': user.photoURL ?? '',
    'createdAt': FieldValue.serverTimestamp(),
    'isAdmin': false,
    'plan': 'free',
  }, SetOptions(merge: true));
}

// Call after successful sign-in/sign-up
final credential = await FirebaseAuth.instance.createUserWithEmailAndPassword(...);
await createUserDocument(credential.user!);`,
      },
      {
        id: "fb-patterns-chat-stream",
        language: "dart",
        label: "Chat App Message Stream",
        code: `class ChatRepository {
  final _db = FirebaseFirestore.instance;

  Stream<List<Message>> getMessages(String chatId) {
    return _db
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('createdAt', descending: false)
        .snapshots()
        .map((snap) => snap.docs
            .map((doc) => Message.fromFirestore(doc))
            .toList());
  }

  Future<void> sendMessage(String chatId, Message message) async {
    await _db
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add(message.toFirestore());

    // Update last message preview
    await _db.collection('chats').doc(chatId).update({
      'lastMessage': message.text,
      'lastMessageAt': FieldValue.serverTimestamp(),
    });
  }
}`,
      },
    ],
    relatedWeeks: [28, 29, 30],
    tags: [
      "patterns",
      "auth-gated",
      "routing",
      "go_router",
      "chat",
      "streams",
      "real-time",
      "user document",
      "ChatRepository",
      "merge",
    ],
    difficulty: "advanced",
    sourceUrl: "https://firebase.flutter.dev",
  },
  {
    id: "fb-emulator",
    title: "Firebase Emulator Suite (Local Development)",
    category: "firebase",
    summary:
      "Run Firebase locally with the Emulator Suite for Auth, Firestore, Storage, and Realtime Database during development.",
    content: ``,
    codeSnippets: [
      {
        id: "fb-emulator-cli",
        language: "bash",
        label: "Firebase Emulator CLI Setup",
        code: `# Install Firebase CLI
npm install -g firebase-tools

# Init emulators
firebase init emulators

# Start emulators
firebase emulators:start`,
      },
      {
        id: "fb-emulator-connect",
        language: "dart",
        label: "Connect to Emulators in Dart",
        code: `// Connect to emulators in main.dart (dev only)
if (kDebugMode) {
  await FirebaseAuth.instance.useAuthEmulator('localhost', 9099);
  FirebaseFirestore.instance.useFirestoreEmulator('localhost', 8080);
  await FirebaseStorage.instance.useStorageEmulator('localhost', 9199);
  FirebaseDatabase.instance.useDatabaseEmulator('localhost', 9000);
}`,
      },
    ],
    relatedWeeks: [28, 29, 30],
    tags: [
      "Emulator Suite",
      "local development",
      "firebase-tools",
      "emulator",
      "localhost",
      "kDebugMode",
      "testing",
    ],
    difficulty: "intermediate",
    sourceUrl: "https://firebase.flutter.dev",
  },
  {
    id: "fb-docs-links",
    title: "Key Docs Links",
    category: "firebase",
    summary:
      "Official FlutterFire documentation links for all Firebase services, setup guides, and the GitHub repository.",
    content: `| Topic | URL |
|-------|-----|
| FlutterFire Home | https://firebase.flutter.dev |
| FlutterFire Setup | https://firebase.flutter.dev/docs/overview |
| Firebase Console | https://console.firebase.google.com |
| Firebase Auth | https://firebase.flutter.dev/docs/auth/overview |
| Cloud Firestore | https://firebase.flutter.dev/docs/firestore/overview |
| Realtime Database | https://firebase.flutter.dev/docs/database/overview |
| Firebase Storage | https://firebase.flutter.dev/docs/storage/overview |
| Cloud Messaging | https://firebase.flutter.dev/docs/messaging/overview |
| Analytics | https://firebase.flutter.dev/docs/analytics/overview |
| Crashlytics | https://firebase.flutter.dev/docs/crashlytics/overview |
| Remote Config | https://firebase.flutter.dev/docs/remote-config/overview |
| Security Rules | https://firebase.google.com/docs/rules |
| Emulator Suite | https://firebase.google.com/docs/emulator-suite |
| FlutterFire GitHub | https://github.com/firebase/flutterfire |`,
    codeSnippets: [],
    relatedWeeks: [28, 29, 30],
    tags: [
      "documentation",
      "FlutterFire",
      "Firebase Console",
      "GitHub",
      "reference",
      "links",
    ],
    difficulty: "beginner",
    sourceUrl: "https://firebase.flutter.dev",
  },
];
