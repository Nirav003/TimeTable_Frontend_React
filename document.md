# Time Table App Frontend Documentation

This document describes the structure, flow, and access control of the frontend application. It covers **Pages**, **Context**, **Components**, **Router**, and **Utility** modules.

---

## 1. Pages

### 1.1 Auth

- **Login (`Pages/Auth/Login.jsx`)**
  - **Description:** User login page. Authenticates users and sets their session and role.
  - **Data Required:** Email, password.
  - **Access:** Public (anyone can access).

---

### 1.2 Home

- **Home (`Pages/Home/Home.jsx`)**
  - **Description:** Dashboard/homepage after login. Shows basic user info.
  - **Data Required:** User context (id, name, role, batch, year).
  - **Access:** All authenticated roles (`admin`, `student`, `staff`, `management`).

---

### 1.3 Lecture

- **Lecture (`Pages/Lecture/Lecture.jsx`)**
  - **Description:** Displays the weekly timetable. Renders different views based on user role.
  - **Data Required:** User role, timetable data (fetched via API).
  - **Access:** `admin`, `student`, `staff`.
  - **Subpages:**
    - **Admin (`Pages/Lecture/Time Table/Admin.jsx`):** Full timetable management and view.
    - **Student (`Pages/Lecture/Time Table/Student.jsx`):** Student's timetable.
    - **Staff (`Pages/Lecture/Time Table/Staff.jsx`):** Staff's timetable (basic placeholder).

---

### 1.4 Admin

- **Master Data (`Pages/Admin/MasterData.jsx`)**
  - **Description:** Tabbed interface for managing master data entities.
  - **Data Required:** Depends on tab (rooms, streams, years, professors, subjects, divisions, timeslots, shifts, lectures, timetable schedule).
  - **Access:** `admin` only.
  - **Tabs/Components:**
    - Room, Stream, Year, Professor, Subject, Division, Timeslot, Shift, Lecture, Timetable Schedule.

- **Mapping (`Pages/Admin/Mapping/Mapping.jsx`)**
  - **Description:** Tabbed interface for mapping entities.
  - **Data Required:** Streams, subjects, professors, mappings.
  - **Access:** `admin` only.
  - **Tabs/Components:**
    - **Professor-Stream Mapping:** Assign professors to streams.
    - **Stream-Subject Mapping:** Assign subjects to streams.

- **Sign Up (`Pages/Admin/SignUp.jsx`)**
  - **Description:** Add new users (students, staff, management, admin).
  - **Data Required:** User details (name, email, batch, year, phone, password, role).
  - **Access:** `admin` only.

---

### 1.5 Management

- **Committee Members (`Pages/Management/CommitteeMembers.jsx`)**
  - **Description:** Displays a list of committee members (static/dummy data).
  - **Data Required:** Committee member details.
  - **Access:** `management` only.

---

### 1.6 No Data

- **No Data (`Pages/no data/noData.jsx`)**
  - **Description:** Simple component to show when no data is available.
  - **Access:** Used internally by other components.

---

## 2. Context

- **User Context (`Context/UserContext.jsx`)**
  - **Description:** Provides global user and role state throughout the app. Handles fetching user profile on app load and manages authentication state.
  - **Data Provided:** `user`, `role`, `setUser`, `setRole`, `loading`.
  - **Usage:** Used by most components/pages to determine access and personalize content.

---

## 3. Components

- **Navbar (`Components/Navbar.jsx`)**
  - **Description:** Top navigation bar. Shows menu items based on user role. Handles logout.
  - **Data Required:** User role (from context).
  - **Access:** All authenticated users.

- **ProtectRoute (`Components/ProtectRoute.jsx`)**
  - **Description:** Route guard. Only renders children if user has required role; otherwise redirects to login or unauthorized page.
  - **Data Required:** User, role, loading (from context).
  - **Access:** Used in router for protected routes.

- **Loader (`Components/Loader/Loader.jsx`)**
  - **Description:** Loading spinner for async operations.

- **DatePicker (`Components/DatePicker/DatePicker.jsx`)**
  - **Description:** Date selection component (used in timetable pages).

- **SelectFile (`Components/Select File/SelectFile.jsx`)**
  - **Description:** Placeholder for when no tab is selected in tabbed interfaces.

- **MasterData Components (`Components/MasterData/`)**
  - **Room, Stream, Year, Professor, Subject, Division, TimeSlot, Shift, Lecture, TimetableSchedule**
    - **Description:** CRUD forms and tables for each master data entity.
    - **Data Required:** Each fetches and manages its own data via API.
    - **Access:** Only rendered for `admin` via MasterData page.

- **UnAuthorized (`Components/UnAuthorized/`)**
  - **Description:** Shown when user tries to access a page without permission.

---

## 4. Router

- **Router (`Router/Router.jsx`)**
  - **Description:** Defines all routes and applies `ProtectRoute` for access control.
  - **Access Control:** 
    - `/home`, `/lecture`: `admin`, `student`, `staff`
    - `/master-data`, `/mapping`, `/signup`: `admin`
    - `/CommitteeMembers`: `management`
    - `/login`: Public
    - `/unauthorized`: Public

---

## 5. Utility

- **getMenu (`utility/getMenu.jsx`)**
  - **Description:** Returns menu items for the navbar based on the current user's role.
  - **Usage:** Used by Navbar to display role-appropriate navigation.

---

## 6. Data Flow & Access Summary

- **Authentication:** Managed via context and token in localStorage. User and role are fetched on app load.
- **Role-Based Access:** Enforced at both the router level (via `ProtectRoute`) and in the UI (via conditional rendering).
- **Data Fetching:** Each page/component fetches its own data from the backend API using axios, with credentials for authentication.
- **Admin:** Full access to all master data, mapping, user management, and timetable.
- **Student/Staff:** Can view their own timetable.
- **Management:** Can view committee members page.

---

## 7. Quick Reference: Page Access by Role

| Page/Component         | Admin | Student | Staff | Management |
|------------------------|:-----:|:-------:|:-----:|:----------:|
| Home                   |   ✔   |    ✔    |   ✔   |     ✔      |
| Lecture (Timetable)    |   ✔   |    ✔    |   ✔   |           |
| Master Data            |   ✔   |         |       |           |
| Mapping                |   ✔   |         |       |           |
| Sign Up                |   ✔   |         |       |           |
| Committee Members      |       |         |       |     ✔      |

---

## 8. Notes

- All API requests are made with credentials for authentication.
- Unauthorized access redirects to `/unauthorized`.
- The UI adapts based on the user's role, both in navigation and available actions.

---