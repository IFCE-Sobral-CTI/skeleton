# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Application skeleton for IFCE - Campus Sobral, built with **Laravel 12 + Inertia.js + React**. It provides a ready-to-fork base with authentication, a role/permission system, activity logging, and a FAQ module.

## Commands

### Development (Laravel Sail — Docker)

```sh
sail up -d                        # start containers
sail npm run dev                  # Vite dev server (hot reload)
composer run dev                  # all-in-one: php server + queue + pail + vite
```

### Build & Lint

```sh
npm run build                     # production Vite build
./vendor/bin/pint                 # PHP code style (Laravel Pint)
```

### Database

```sh
sail artisan migrate:fresh --seed # reset DB and seed all seeders
```

### Tests

```sh
composer test                     # clears config cache, then runs PHPUnit
php artisan test --filter MyTest  # run a single test class or method
```

Default admin credentials (from seeder): `ti.sobral@ifce.edu.br` / `qwe123`

## Architecture

### Stack

- **Backend**: Laravel 12, Sanctum, Spatie ActivityLog, Ziggy (route helpers in JS)
- **Frontend**: React 18 (JSX), Inertia.js v2, Tailwind CSS v4, `tw-elements`, `react-simple-wysiwyg`
- **Database**: MariaDB 11 (via Sail), Redis (cache/queues)
- **Dev tooling**: Laravel Sail (Docker), Vite 7, Laravel Pint

### RBAC Authorization System

The permission model is database-driven and boot-time compiled:

```
User → belongs to → Permission → belongs to many → Rule
```

- **Rule**: has a `control` string (e.g. `users.viewAny`) and a `group_id` for grouping.
- **Permission**: a named set of Rules (e.g. "Administrador", "Colaborador").
- **User**: belongs to exactly one Permission.

At boot, `AuthServiceProvider` reads all Rules from the DB and registers a Laravel `Gate` for each `control` string. A `Gate::before` makes the "Administrador" permission bypass all checks (`User::isAdmin()`).

`HandleInertiaRequests` shares an `authorizations` map to the frontend — keys are `viewAny`-type controls (dots replaced by underscores), values are `true`. Use this prop to conditionally render sidebar links.

To check authorization in a controller: `Gate::authorize('users.viewAny')` or `$this->authorize(...)`.  
To check in React: use the `authorizations` prop passed via Inertia shared data.

### Routing

All admin routes live under the `/admin` prefix with `['auth', 'verified']` middleware (`routes/web.php`). Public routes (welcome, faq) are at `/`.

### Frontend Structure

```
resources/js/
  Pages/
    Auth/          # Admin CRUD pages (User, Permission, Rule, Group, Activity)
    Faqs/          # FAQ and Tag CRUD
    Welcome.jsx    # Public landing page
    Faq.jsx        # Public FAQ page
  Components/
    Dashboard/     # Admin UI primitives (Navbar, Sidebar, Panel, Pagination, etc.)
    Public/        # Public site components (Header, Footer, Navbar)
    Form/          # Reusable form inputs (Input, Select, SelectMulti, Textarea)
  Layouts/
    AuthenticatedLayout.jsx   # Admin shell (sidebar + navbar)
    GuestLayout.jsx           # Public/auth shell
  Context/
    AlertContext.js           # Flash alert context used across admin pages
```

Inertia resolves page components from `./Pages/{Name}.jsx` — the `name` passed from the controller maps directly to the file path.

### Models with `scopeSearch`

`User`, `Permission`, `Rule`, `Faq`, `Tag` all implement a `scopeSearch(Builder $query, Request $request)` that returns a structured array (`count`, paginated results, `page`, `termSearch`) consumed directly by their controllers. Pagination uses the `APP_PAGINATION` env variable.

All models use `spatie/laravel-activitylog` (`LogsActivity` trait) and log only dirty, non-empty changes to specified fields.
