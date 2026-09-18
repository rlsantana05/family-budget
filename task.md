# Paycheck Planner Feature Implementation Tasks

> **Status Legend:** 📌 Not Started | 🔄 In Progress | ✅ Completed | ⏭️ Blocked (Waiting)

---

## 📌 Priority 1: Critical Fixes (Must Do)

### Task 1.1: Add `index.ts` files to feature modules
- [x] Create `src/features/planner/index.ts`
- [x] Create `src/shared/components/index.ts`
- [x] Create `src/shared/lib/index.ts`
- [x] Update `src/shared/types/index.ts` (exists and exports types)
- ✅ **Status:** COMPLETED
- ✅ **Build:** PASSING
- ✅ **TypeScript:** NO ERRORS
- **ETA:** 15 minutes

### Task 1.2: Remove `as any` casting in planner page
- [x] Update `src/app/planner/page.tsx` line 44
- [x] Remove the `as any` cast
- [x] Verified TypeScript accepts proper types
- ✅ **Status:** COMPLETED
- ✅ **Build:** PASSING
- ✅ **TypeScript:** NO ERRORS

---

## 📌 Priority 2: High-Impact Improvements (Should Do)

### Task 2.1: Evaluate Framer Motion dependency
- [x] Audit current animation usage
- [x] Decision: **Keep Framer Motion** (meaningfully used in ledger-table.tsx for row animations)
- [x] Remove unused import from summary-cards.tsx (was importing motion but never using it)
- ✅ **Status:** COMPLETED
- ✅ **Decision:** Keep Framer Motion for table row entrance animations
- ✅ **Build:** PASSING
- ✅ **TypeScript:** NO ERRORS
- **ETA:** 20 minutes

### Task 2.2: Optimize component boundaries - Client vs Server
- [ ] Identify components that can be Server Components
- [ ] Remove unnecessary `"use client"` from selected components
- [ ] Move animations to Server Components if possible
- [ ] Test hydration
- **ETA:** 30 minutes

---

## 📌 Priority 3: Medium Improvements (Could Do)

### Task 3.1: Add `api/` folder structure to planner feature
- [ ] Create `src/features/planner/api/` directory
- [ ] Move fetch logic there if applicable
- [ ] Update imports
- **ETA:** 20 minutes

### Task 3.2: Add `actions/` folder structure to planner feature
- [ ] Move server actions to `src/features/planner/actions/`
- [ ] Update `src/app/planner/actions.ts` to re-export
- [ ] Keep app-level actions thin
- [ ] Update imports
- **ETA:** 15 minutes

### Task 3.3: Add TypeScript strictness
- [ ] Fix potential `undefined` accesses with optional chaining
- [ ] Add comprehensive JSDoc comments
- [ ] Enable full TypeScript strict mode checks
- **ETA:** 20 minutes

---

## 📌 Priority 4: Low-Priority Enhancements (Nice to Have)

### Task 4.1: Create unit tests for cashFlow logic
- [ ] Create `src/lib/__tests__/cashflow.test.ts`
- [ ] Test edge cases (empty inputs, same-day transactions, negative balance)
- [ ] Test timeline generation
- [ ] Integrate with test runner
- **ETA:** 30 minutes

### Task 4.2: Document known limitations
- [ ] Add README section about PoC limitations
- [ ] Add TODO comments in code for future features
- [ ] Create DEVELOPMENT.md for contributor docs
- **ETA:** 15 minutes

---

## 📊 Current Code Analysis

### Files Needing Review
- [ ] `src/app/layout.tsx` - Navigation import correct
- [ ] `src/app/page.tsx` - Clean, but could use feature export
- [ ] `src/app/planner/page.tsx` - Needs type fix
- [ ] `src/app/planner/actions.ts` - Should delegate to feature
- [ ] `src/app/planner/_components/*` - All client components

### Compliance Check: AGENTS.md Rules
- [ ] Rule 1: `app/` routing only - ✅ Mostly followed
- [ ] Rule 2: Features self-contained - ⚠️ Missing index.ts, api/, hooks/
- [ ] Rule 3: Cross-feature imports - ⚠️ Using direct paths instead of index.ts
- [ ] Rule 4: Shared code in correct location - ✅ Current location good
- [ ] Rule 5: One feature = one deletable unit - ⚠️ Missing proper isolation

---

## 🚀 Execution Order

1. ✅ **Task 1.1:** Add index.ts files (START HERE)
2. ✅ **Task 1.2:** Remove type casts
3. ✅ **Task 2.1:** Audit animations/transition decisions
4. ✅ **Task 2.2:** Optimize component boundaries
5. ✅ **Task 3.1:** Restructure API layer
6. ✅ **Task 3.3:** Add type strictness
7. ✅ **Task 4.1:** Add tests (if time permits)
8. ✅ **Task 4.2:** Documentation

---

## 📝 Notes

- Build must pass after each task
- TypeScript must have no errors
- AGENTS.md compliance must be verified after each task
- All changes should be committed with clear messages