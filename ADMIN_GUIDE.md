# 🏯 History Encyclopedia - Admin Guide

## 🛠️ Accessing your Publishing Office
1.  Run the project (`npm run dev`).
2.  Go to **[http://localhost:3000/admin](http://localhost:3000/admin)**.
3.  Log in with your Sanity account.
4.  You can now create, edit, and publish articles!

## ⚠️ Vital Step: Enable CORS
For the website to show your articles, you MUST allow it in Sanity:
1.  Go to [sanity.io/manage](https://www.sanity.io/manage).
2.  Select your project (**7xuozr6p**).
3.  Go to **API** -> **CORS Origins**.
4.  Click **"Add CORS Origin"**.
5.  Type: `http://localhost:3000`
6.  Check the "Allow credentials" box and Save.

## 📝 Schema Fields
*   **Title**: The main name of the historical topic.
*   **Slug**: Click "Generate" to create the web link.
*   **Main Image**: Upload a high-res professional photo.
*   **Content**: A rich text editor. Use "Heading" for sections and "Quote" for dramatic historical quotes.
*   **Category**: Select the era/topic (Warfare, Artifacts, etc.).
