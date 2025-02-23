# OMN Technical Task: WordPress Articles with GraphQL & React

This repository contains my implementation for the **"WordPress Developer"** technical task for Open My Network (OMN). The project uses **WordPress** as the backend to register a custom post type ("Articles") and **WPGraphQL** to expose content via a GraphQL API. The front-end is built with **ReactJS** to fetch and display articles with pagination.

---

## Overview

This project demonstrates:
- A **custom post type** ("Articles") created in WordPress.
- **GraphQL integration** via the [WPGraphQL](https://www.wpgraphql.com/) plugin.
- A **ReactJS front-end** that fetches articles via GraphQL with pagination.
- Two main pages:
  - **Article Listing Page:** Displays articles with pagination.
  - **Single Article Page:** Displays full details of a selected article.

---

## Features

- **Custom Post Type:** "Articles" with title, content, excerpt, and slug.
- **GraphQL API:** Enables fetching of articles with pagination support.
- **React Front-End:** Built using Create React App; includes article listing, pagination, and single article view.
---

## Project Structure

```
/ (repository root)
├── wp-content/
│   └── themes/
│       └── twentytwentyfive/ 
├── article/  # React front-end project folder
│   ├── src/
│   │   ├── ArticleList.js
│   │   ├── ArticleList.css
│   │   ├── SingleArticle.js
│   │   ├── SingleArticle.css
│   │   ├── apolloClient.js  # Apollo Client configuration
│   │   └── ... (other React files)
│   └── package.json
├── .gitignore
└── README.md
```

> **Note:** The repository includes only custom code (e.g., custom post type registration, WPGraphQL settings, and the React front-end). WordPress core files are not included; please install them from [wordpress.org](https://wordpress.org/download/).

---

## Setup Instructions

### WordPress Setup

1. **Local Environment:**  
   Install a local server environment (e.g., XAMPP) and set up WordPress in the directory:

2. **WordPress Installation:**  
   Download and install WordPress following the standard setup process.

3. **Custom Post Type ("Articles"):**  
   Add the code that registers the "Articles" custom post type to your theme’s `functions.php` file or create a custom plugin. Ensure that:
   - `show_in_rest` is set to `true`.
   - `show_in_graphql` is set to `true`.

4. **WPGraphQL Plugin:**  
   - Install and activate the [WPGraphQL](https://www.wpgraphql.com/) plugin from the WordPress plugin repository.
   - Verify the GraphQL endpoint by visiting:
     ```
     http://localhost/TechnicalTask/Technical-task-for-OMN/index.php?graphql
     ```

5. **Permalink Settings:**  
   Go to **Settings → Permalinks** in your WordPress dashboard and click **“Save Changes”** to flush rewrite rules.

### React Front-End

1. **Navigate to the React Project:**  
   Open your terminal and change the directory to your React project

2. **Install Dependencies:**  
   Run the following command:
   ```bash
   npm install
   ```

3. **Configure Apollo Client:**  
   Ensure that Apollo Client in your React project is configured correctly. Example (`src/apolloClient.js`):
   ```javascript
   import { ApolloClient, InMemoryCache } from '@apollo/client';

   const client = new ApolloClient({
     uri: 'http://localhost/Technical%20Task/Technical-task-for-OMN/index.php?graphql',
     cache: new InMemoryCache(),
   });

   export default client;
   ```

4. **Run the React App:**  
   Start the development server:
   ```bash
   npm start
   ```

---

## Screenshots

Include the following images (update the paths as necessary):

- **WordPress Dashboard with Custom Post Type:** ![image](https://github.com/user-attachments/assets/b6d0e9bd-92a1-4a3a-8b99-f3ff9ed25382)
- **React Article Listing Page:** ![image](https://github.com/user-attachments/assets/67a93bdc-3f14-4614-a14b-d18d73ed64ce)
- **React Single Article Page** ![image](https://github.com/user-attachments/assets/fb9949c6-d856-4dfc-acb3-372107b23e12)



---

## Usage

### Article Listing

Open your browser and navigate to:
```bash
http://localhost:3000/
```
To view the list of articles with pagination.

### Single Article

Click on an article title to see the full article details.

### Pagination

Use the pagination buttons to navigate between pages of articles.

---

## Notes

### GitHub Repository

Only **custom files** (e.g., custom post type registration, WPGraphQL settings, and React front-end code) are included in this repository. WordPress core files are excluded.


## Contact

For any questions or clarifications, please contact:

**Himal Panta**  
Email: [himalpanta@gmail.com](mailto:himalpanta@gmail.com)  
LinkedIn: [Himal Panta](#)

---

