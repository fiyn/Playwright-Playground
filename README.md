# Playwright-Playground

# Playwright Automation Playground

A structured, hands-on repository dedicated to mastering modern web test automation using **Playwright (JavaScript)**. This framework is being developed sequentially over a 12-week roadmap, transitioning from core scripting foundations to advanced architectural patterns.

## Target Practice Site
* **Platform:** [SauceDemo E-Commerce](https://www.saucedemo.com/)
* **Focus Area:** Authentication, Cart Management, Checkout Funnels, and Boundary Input Validation.

---

## Current Project Progress: Weeks 1 - 6
This repository is a structured learning project. It is currently completed up to **Week 6 (Intermediate Concepts)**, focusing heavily on baseline framework architecture and design patterns.

### Key Technical Architectures Implemented So Far:
1. **Page Object Model (POM):** Clean separation of concerns. Page structural locators and component methods are isolated from the test validation layers to reduce code duplication and ease maintenance.
2. **Intelligent Synchronization:** Elimination of brittle, hardcoded sleep functions (`Thread.sleep`). Implementation of Playwright's native auto-waiting mechanisms and explicit conditional checks to mitigate flakiness.
3. **Data-Driven Testing (DDT):** Structural setup to decouple test scripts from raw inputs, allowing single test assertions to cycle through varying datasets seamlessly.

---

## Complete 12-Week Roadmap Outline

### Phase 1: Foundation & Core Concepts (Completed)
* **Weeks 1-2: Environment Setup & Git Basics**
  * Node.js and Playwright initialization.
  * Version control implementation using structured Git branching.
* **Weeks 3-4: Core Playwright Assertions & Locators**
  * Advanced CSS selectors and Relative XPath strategies.
  * UI actions (Inputs, Clicks, Dropdowns, States).
  * Web element evaluation via Playwright text assertions.

### Phase 2: Intermediate Framework Design (Completed / Current State)
* **Weeks 5-6: POM & Test Data Management**
  * Architecting Page Objects for the SauceDemo authentication and shopping cart modules.
  * Managing asynchronous content rendering.
  * Abstracting test data inputs for dynamic execution matrices.

### Phase 3: Advanced Integrations (In-Progress / Upcoming)
* **Weeks 7-8: Advanced Actions & APIs**
  * File handling, multi-context page tracking, and backend API validation.
  * Reusable authentication state caching (bypassing redundant UI login phases).
* **Weeks 9-10: Suite Organization & Execution Controls**
  * Parallel execution setups, custom test tagging, and reporting dashboards.
* **Weeks 11-12: DevOps & Enterprise Best Practices**
  * Robust error-handling and automated test re-run configurations.
  * **CI/CD pipeline construction via GitHub Actions.**

---

## Local Setup & Execution Instructions

Follow these steps to clone and execute the automation suite locally:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
   cd YOUR_REPO_NAME