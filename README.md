# Vinyl Record Collection

This is a personal project designed to showcase my private vinyl collection and wishlist. This project leverages modern web technologies to create an organized, interactive display of the records I own and those I hope to add to my collection in the future.

https://records.viky.at/

## Features

- **Current Collection**: Browse the records I currently own, complete with details like album covers, titles, and categories.
- **Wishlist**: A curated list of vinyls I plan to acquire, showcasing the albums I'm interested in.
- **Contentfu**: The content management of choice for this project is Contentful.
- **Discogs API Integration**: Fetches album details, including covers and metadata, from the [Discogs API](https://www.discogs.com/). The payload is saved to Contentful using [a custom app](https://github.com/fviktoria/cf-discogs-album-picker) to prevent running into Discog's API rate limit.

## Tech Stack

- **Next.js**: React-based framework for building the frontend.
- **Discogs API**: Used to retrieve record details dynamically.

## Project Status

This is a private project, created mainly for personal use and to represent my interest in vinyl collecting. No external contributions are currently being accepted.
