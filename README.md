# DailyDash
---
# _Note: the news may not function due to GNews' free plan restrictions, not the code's._
---
## Overview
**DailyDash** is a dynamic Django web application that brings together essential daily tools—**Weather**, **News**, and a **World Clock**—into one unified dashboard. Designed for convenience and simplicity, the site allows users to stay informed about global conditions, time zones, and top headlines without switching between multiple websites.

The project also includes a **Feedback System**, allowing users to submit thoughts, bug reports, or suggestions directly through the site. This feedback feature helps make DailyDash interactive and community-driven.

DailyDash aims to be a clean, responsive, and fast web app that prioritizes usability. Most functionality is handled with a combination of Django’s backend structure and JavaScript’s asynchronous capabilities to create a smooth and modern user experience.

---

## Distinctiveness and Complexity

DailyDash satisfies the **distinctiveness** and **complexity** requirements in several ways:

- ### Distinctiveness:
  Unlike other CS50W sample projects such as Mail, Wiki, or Commerce, this project is not focused on user authentication or item listings. Instead, DailyDash unifies three completely different APIs and data sources (weather, news, and time zones) into a single, aesthetically cohesive dashboard. Each component interacts with real-world data dynamically, moving it to the next level from basic CRUD-based Django apps.  The unified interface allows users to see the day’s weather, top headlines, and world times all at a glance, giving a “daily overview” that is both practical and visually appealing. Unlike most student projects that render static pages, DailyDash leverages JavaScript with asynchronous fetch calls to update content dynamically without requiring full page reloads. The built-in feedback system further enhances its distinctiveness by allowing users to submit suggestions and comments directly through the site, which are stored securely in a Django database and can be accessed through the admin panel. Combined with a clean, minimalist design, responsive layout, and integration of multiple independent utilities, DailyDash demonstrates a level of real-world utility and interactivity that is rarely seen in simple coursework projects, making it both unique and functional for everyday use.

- ### Complexity
  The application integrates multiple independent systems:
  - A **Weather app** that fetches and displays real-time weather data (temperature, humidity, wind speed, etc.) based on user input or location.

  - A **News app** that pulls top headlines and world news stories from external APIs, updating dynamically without page reloads.

  - A **World Clock app** that uses JavaScript and Python to display accurate time across multiple global cities.

  - A **Feedback System** built using Django’s model-view-template architecture, complete with form validation and data persistence.

  - **Multi-App Architecture:**
        The project is composed of multiple Django apps (`weather`, `news`, `clock`, and `feedback`), each functioning independently but working together under one unified project. Each app has its own URLs, views, and templates, which shows understanding of Django’s modular design and scalability.

   - **Dynamic Front-End Behavior:**
        JavaScript is used to handle data updates and user interaction. For example, when users search for a new city’s weather, the page updates instantly via AJAX, improving user experience and reducing reloads. The **World Clock** dynamically updates the time every second using client-side JavaScript.

    - **Clean Code and Scalability:**
        The project is structured to allow future expansion—such as adding currency converters, stock tickers, or task reminders—without rewriting existing code. This demonstrates understanding of **scalable Django project design**.
---

## File Contents

- **/DailyAll/** – Main Django project folder containing settings, URLs, and configuration files.

- **/DailyAll/DailyAll/** - Folder containing all the project settings and project urls.

- **/weather.(js, css, html)/** – App responsible for fetching and displaying weather data from an external API.

- **/news.(js, css, html)/** – App that handles the retrieval and rendering of global news articles.

- **/clock.(js, css, html)/** – App that displays world clocks using JavaScript and time zone data.

- **/feedback_form.html/**,  **/feedback_list.html/**, **/feedback_thanks.html/** – App for the user feedback system, with a Django model, view, url, and form.

- **/layout.html/** - Base layout for all the templates.

- **models.py** – Contains Django models such as `Feedback` for storing user submissions.

- **admin.py** – Registers models (like Feedback) to the Django admin panel for management.

- **views.py** – Handles backend logic for rendering pages feedback submission.

- **index.html** – The main homepage template.

- **styles.css** – General stylesheet that provides the layout and color theme across all pages.

- **index.css** - Specific stylesheet for the homepage, refining visual design and responsiveness.

- **/static/** – Contains CSS, JavaScript, and images for styling and front-end functionality.

- **/templates/** – HTML templates shared among apps for consistent design.

- **_manage.py_** - This file contains all configs and components to make this project running and usable.

- **README.md** – This file, containing documentation for setup and explanation.


---

## How to Run the Application

**_Note_** - _All the integrated apps should be working right out of server run._

1. Run the server:
   ```bash
   python manage.py runserver
2. If you want to access any of the feedback on the Django site administration page. Use this login for the SuperUser.
```bash
Username: ubuntu
Password: testcs50daily
