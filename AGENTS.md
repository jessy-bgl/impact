# Agent Instructions

## Project Overview

- **Type**: React Native app built with Expo
- **Language**: TypeScript (strict mode enabled)
- **Package Manager**: npm
- **Assets**: Stored in `assets/` directory
- **Source Code**: Located in `src/` directory

## Build/Test/Lint Commands

- **Run tests**: `npm test`
- **Run single test**: `npm test -- <path/to/test.test.ts>`
- **Run tests with coverage**: `npm run test:cov`
- **Lint**: `npm run lint` (runs ESLint + typecheck)
- **Typecheck only**: `npm run typecheck`
- **Format**: `npm run format <file>`

## Code Style & Standards

- **Commits**: Follow conventional commit format
- **Imports**: Use path aliases defined in `tsconfig.json`
- **Components**: Functional components with TypeScript types for all props
- **Formatting**: Prettier with trailing commas, ESLint config expo
- **Naming**: PascalCase for components/types, camelCase for functions/variables
- **State Management**: Zustand for global state, React Context API for dependency injection
- **Forms**: React Hook Form with Zod for schema validation
- **Internationalization**: i18next
- **UI Components**: react-native-paper for Material Design components and icons
- **Tests**: Jest + React Testing Library, use fake repositories for unit tests

## Architecture

- **Pattern**: Clean Architecture - isolate business logic from UI
- **Structure**: `app/` (pages, navigation), `domain/` (entities, usecases, repositories), `data/` (implementations), `view/` (screens, components), `common/` (store, translations, contexts)
- **Principles**: SOLID, single-responsibility, dependency injection via Repository pattern

### Adding a New Feature - Step-by-Step Guide

When adding a new feature, follow this Clean Architecture pattern:

#### 1. Create Feature Folder Structure

```
src/features/<feature-name>/
├── domain/
│   ├── entities/          (business objects, if needed)
│   ├── repositories/      (repository interfaces)
│   └── usecases/          (business logic)
├── data/
│   └── repositories/      (repository implementations)
└── view/
    ├── screens/           (screen components)
    ├── components/        (UI components)
    └── hooks/             (custom hooks, if needed)
```

#### 2. Define Repository Interface

Create interface in `domain/repositories/<name>.repository.ts`:

```typescript
export interface FeatureRepository {
  getData(): DataType;
  saveData(data: DataType): void;
}
```

#### 3. Implement Repository

Create implementation in `data/repositories/<name>.store.repository.ts`:

```typescript
import { FeatureRepository } from "@features/<feature-name>/domain/repositories/<name>.repository";
import { useAppStore } from "@common/store/useStore";

export class FeatureStoreRepository implements FeatureRepository {
  constructor(private store: typeof useAppStore) {}

  getData(): DataType {
    return this.store.getState().someData;
  }

  saveData(data: DataType): void {
    this.store.setState((state) => ({
      ...state,
      someData: data,
    }));
  }
}
```

The example above use the `store`, but it could be any external service like an API.

#### 4. Create Use Cases

Create use cases in `domain/usecases/<action>.ts`:

```typescript
import { FeatureRepository } from "@features/<feature-name>/domain/repositories/<name>.repository";

export const createDoSomething = (repository: FeatureRepository) => {
  const doSomething = (param: unknown) => {
    const data = repository.getData();
    // Business logic here
    repository.saveData(newData);
  };

  return { doSomething };
};
```

#### 5. Register in UsecasesContext

Update `src/common/context/UsecasesContext.ts`:

a. Import repository interface and implementation:

```typescript
import { FeatureRepository } from "@features/<feature-name>/domain/repositories/<name>.repository";
import { FeatureStoreRepository } from "@features/<feature-name>/data/repositories/<name>.store.repository";
import { createDoSomething } from "@features/<feature-name>/domain/usecases/<action>";
```

b. Add to `Repositories` interface:

```typescript
export interface Repositories {
  // ... existing repositories
  featureRepository: FeatureRepository;
}
```

c. Add to `initRealRepositories` and `initFakeRepositories`:

```typescript
const initRealRepositories = () => ({
  // ... existing repositories
  featureRepository: new FeatureStoreRepository(useAppStore),
});
```

d. Add to `initUsecases`:

```typescript
const initUsecases = (repositories: Repositories) => {
  const { /* ... existing */, featureRepository } = repositories;

  return {
    // ... existing usecases
    ...createDoSomething(featureRepository),
  };
};
```

#### 6. Use in Components or Hooks

In your component, use the use case from context:

```typescript
import { useContext } from "react";
import { UsecasesContext } from "@common/context/UsecasesContext";

export const MyComponent = () => {
  const { doSomething } = useContext(UsecasesContext);

  const handleAction = () => {
    doSomething("parameter");
  };

  // ...
};
```

#### 7. Path Aliases

Use the appropriate path alias and add new feature aliases to `tsconfig.json` if needed.

### Key Principles to Remember

1. **Never access store directly from views** - Always use usecases from `UsecasesContext`
2. **Repository pattern** - Data access logic belongs in repositories, not usecases or views
3. **Use cases contain business logic** - Keep them pure and testable
4. **Views are dumb** - They only handle presentation and user interactions
5. **Dependency injection** - Inject dependencies through constructors/function parameters
6. **Type safety** - Always define proper TypeScript interfaces/types
7. **Testing** - Write unit tests for usecases with fake repositories
