# STACK.md

# Stack

Frontend:

* Next.js
* TypeScript
* Tailwind CSS

Backend:

* Supabase

Database:

* PostgreSQL via Supabase

Storage:

* Supabase Storage

Deployment:

* Cloudflare Workers (OpenNext via `@opennextjs/cloudflare`, Wrangler)

Email:

* Resend later

# Why

This stack is:

* fast to build with
* simple to maintain
* cheap for MVPs
* easy to deploy
* well documented
* good with Cursor and AI workflows

# Frontend Rules

Keep the frontend:

* clean
* responsive
* simple
* professional

Avoid:

* animation-heavy UI
* bloated component systems
* unnecessary libraries

# Backend Rules

Keep backend logic simple.

The MVP only needs:

* email capture
* report uploads
* report downloads
* basic analytics

Do not build:

* microservices
* complex APIs
* enterprise architecture
* unnecessary abstractions

# Code Style

Prefer:

* readable code
* small components
* clear naming
* modular structure
* small safe changes

Avoid:

* giant files
* magic helper functions everywhere
* premature optimisation
* overengineering

# Deployment

Deploy early.

Keep changes:

* small
* reversible
* easy to debug

The goal is fast reliable iteration, not perfect architecture.
