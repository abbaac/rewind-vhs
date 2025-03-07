# Rewind-VHS Setup Guide

Rewind-VHS is a React application bootstrapped with Vite. It leverages the [OMDB API](https://www.omdbapi.com/) and [TMDB API](https://www.themoviedb.org/) to fetch movie details, allowing users to explore movie information dynamically.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/abbaac/rewind-vhs.git
cd rewind-vhs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_OMDB_API_KEY=your_omdb_api_key
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Modify the values as needed for your environment. The `VITE_OMDB_API_KEY` and `VITE_TMDB_API_KEY` are required to fetch movie data from the OMDB and TMDB APIs. You can obtain API keys by registering at [OMDB's website](https://www.omdbapi.com/apikey.aspx) and [TMDB's website](https://www.themoviedb.org/signup).

### 4. Start the Development Server

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

## How Rewind-VHS Uses OMDB and TMDB

Rewind-VHS integrates with both the OMDB API and TMDB API to enhance the movie browsing experience. By providing valid API keys, the application retrieves detailed movie data such as titles, release years, genres, posters, and additional metadata.

- **OMDB API**: Used primarily for retrieving basic movie details, including ratings and short descriptions.
- **TMDB API**: Provides high-quality images, trailers, cast information, and more in-depth metadata for an enriched user experience.

If the API keys are not set or invalid, certain features, like movie searches, fetching posters, and retrieving detailed metadata, may not function correctly.

## Building for Production

To create an optimized production build:

```bash
npm run build
```

The output will be in the `dist` directory.

## Additional Notes

- This project uses ESLint for linting. You can run `npm run lint` to check for code style issues.
- For more details on Vite, refer to the [Vite documentation](https://vitejs.dev/).
- For React-related information, consult the [React documentation](https://reactjs.org/).
- This project integrates with the [OMDB API](https://www.omdbapi.com/) and the [TMDB API](https://www.themoviedb.org/) to retrieve movie details. Ensure you have valid API keys configured in the `.env` file.

For any issues or contributions, please refer to the [Rewind-VHS GitHub repository](https://github.com/abbaac/rewind-vhs).
