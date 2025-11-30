# PM-AJAY (Adarsh Gram) Portal - Design Guidelines

## Design Approach

**Selected Approach:** Design System (Material Design-inspired) with government portal conventions
**Justification:** This is a data-intensive government administration portal requiring clarity, consistency, and accessibility over visual flair. The focus is on efficient data entry, clear hierarchy, and trustworthy presentation.

**Key Design Principles:**
- Professional & Trustworthy: Government-appropriate visual language
- Clarity Over Creativity: Prioritize readability and usability for form-heavy workflows
- Consistent Patterns: Reusable components across all modules
- Accessible: High contrast, clear labels, WCAG AA compliance

---

## Core Design Elements

### A. Typography
**Font Family:** Inter (primary), System-UI (fallback)
- **Headings:** 
  - Page titles: text-2xl (24px), font-semibold
  - Section headers: text-xl (20px), font-semibold
  - Card titles: text-lg (18px), font-medium
- **Body Text:**
  - Regular: text-base (16px), font-normal
  - Small: text-sm (14px) for labels, captions
  - Tiny: text-xs (12px) for metadata, tags
- **Forms:**
  - Labels: text-sm, font-medium
  - Input text: text-base
  - Helper text: text-xs, muted color

### B. Layout System
**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4 to p-6
- Section spacing: space-y-6 to space-y-8
- Card gaps: gap-4 to gap-6
- Page margins: Container with max-w-7xl, px-4 sm:px-6 lg:px-8

**Grid System:**
- Forms: Single column on mobile, 2-column (grid-cols-1 md:grid-cols-2) on desktop
- Data tables: Full width with horizontal scroll on mobile
- Dashboard cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 for stat cards
- Sidebar width: w-64 (expanded), w-16 (collapsed)

### C. Component Library

**1. Navigation Components**
- **Sidebar:** Fixed left, collapsible, grouped menu items with icons, active state highlighting
- **Top Navbar:** Sticky, contains logo, breadcrumbs, user profile dropdown, height h-16
- **Breadcrumbs:** text-sm with chevron separators, last item non-clickable

**2. Core UI Elements**
- **Buttons:**
  - Primary: Solid background, text-white, px-4 py-2, rounded-md
  - Secondary: Border, transparent background, px-4 py-2
  - Icon buttons: p-2, rounded-full for actions
  - Sizes: Small (text-sm py-1.5 px-3), Default (text-base py-2 px-4), Large (text-lg py-3 px-6)

- **Cards:**
  - Background: white with border, rounded-lg
  - Padding: p-6 for content
  - Shadow: shadow-sm on rest, shadow-md on hover
  - Header: border-b with title and optional action buttons

- **Stat Cards (Dashboard):**
  - Icon + Number + Label layout
  - Large numeric display (text-3xl font-bold)
  - Icon in top-right or left with circular background
  - Optional trend indicator (↑ green, ↓ red)

**3. Form Components**
- **Input Fields:**
  - Border: border rounded-md
  - Padding: px-3 py-2
  - Focus: ring-2 focus state
  - Labels above inputs with asterisk for required
  - Error state: red border with error message below (text-xs text-red-600)

- **Select/Dropdown:**
  - Cascading selectors for location hierarchy (State → District → Block → Village)
  - Full width with chevron icon
  - Same styling as text inputs

- **Checkboxes/Radio:**
  - Standard size with label to the right
  - Group spacing: space-y-2
  - Custom accent for checked state

- **Text Areas:**
  - Minimum height: rows-4
  - Resizable vertically
  - Character count indicator when needed

**4. Data Display**
- **Tables:**
  - Striped rows (alternate row background)
  - Sticky header on scroll
  - Hover state on rows
  - Action column (right-aligned) with icon buttons
  - Pagination at bottom center
  - Mobile: Card-based responsive view

- **Filters Bar:**
  - Sticky below navbar
  - Horizontal layout with dropdowns and search
  - "Apply Filters" and "Clear All" buttons
  - Collapsible on mobile

- **Status Badges:**
  - Pill-shaped (rounded-full px-3 py-1 text-xs font-medium)
  - Color-coded: Green (Completed), Yellow (In Progress), Red (Pending), Blue (Verified)

- **Progress Bars:**
  - Height: h-2, rounded-full
  - Percentage label above or beside
  - Smooth animated fill

**5. Data Visualization**
- **Charts (Dashboard):**
  - Simple bar/line charts with minimal styling
  - Clear axis labels and legends
  - Tooltips on hover
  - Max height: h-64 to h-80

**6. Modals/Overlays**
- **Modal:**
  - Centered, max-w-2xl
  - Backdrop: semi-transparent dark overlay
  - Header with title and close X button
  - Footer with action buttons (Cancel + Confirm)
  - Content padding: p-6

- **Toast Notifications:**
  - Top-right position
  - Auto-dismiss after 3-5 seconds
  - Color-coded: Green (success), Red (error), Blue (info), Yellow (warning)

**7. Empty States & Loading**
- **Empty State:**
  - Centered icon + message + optional CTA button
  - Friendly, helpful messaging

- **Loading Spinners:**
  - Small inline spinners for button actions
  - Page-level: centered spinner with "Loading..." text

---

## Page-Specific Layouts

### Dashboard
- **Top Section:** 4-column stat cards (villages, households, works, funds)
- **Middle Section:** 2-column layout - Bar chart (left) + Pie chart (right)
- **Bottom Section:** Full-width table "Recent Activities" with 5-10 rows

### Forms (Formats I-VIII)
- **Header:** Page title + breadcrumb + status badge
- **Content:** Single-column layout with grouped sections using Cards
- **Section Groups:** Collapsible accordions for long forms
- **Actions:** Sticky bottom bar with "Save Draft" + "Submit" buttons, right-aligned

### Data Tables (Village Verification, Agency List)
- **Top:** Filters bar with search + dropdowns
- **Middle:** Paginated table with sortable columns
- **Per Row:** Status dropdown, action icons (edit, delete)

### VDP Generation
- **Preview Layout:** 
  - Left sidebar: Table of contents (sticky)
  - Right content: Scrollable sections with all compiled data
  - Bottom: "Generate PDF" + "Submit VDP" buttons

---

## Images
**Government Portal = Minimal Imagery**
- **NO large hero images** - this is an admin portal, not a marketing site
- **Icons Only:** Use Heroicons throughout (outline style for nav, solid for stats)
- **Upload Placeholders:** Dashed border boxes for image/document uploads in progress tracking
- **Charts/Graphs:** Data visualizations are the primary "visuals"

---

## Accessibility & Interaction
- High contrast ratios (4.5:1 minimum)
- Keyboard navigation throughout
- Focus indicators on all interactive elements (ring-2 ring-offset-2)
- ARIA labels on icon-only buttons
- Form validation with clear error messaging
- Consistent tab order

---

## Visual Identity Notes
Government portals should feel **trustworthy, efficient, and accessible** rather than flashy. This design prioritizes information density with breathing room, consistent patterns for reduced cognitive load, and clear visual hierarchy to guide users through complex workflows.