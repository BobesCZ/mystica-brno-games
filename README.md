# Mystica Brno Games

If you run some public place (e.g restaurant, community center) with board game collection, you can use this app for automatic management and presentation of your games.

## How does it work?

1. Export your collection (list of game names) from Excel to CSV file
2. Developer will run magic script that will find your games on BoardGameGeek.com and complete all information of these games automatically
3. Your collection is published, so your clients/visitors could see it
4. There is also advanced search and filtering by different parameters

You can see collection of board game pub [Mystica Brno](https://mystica-brno-hry.web.app/) (hosted by Firebase).

## Built With

- [React](https://reactjs.org/) + [Typescript](https://www.typescriptlang.org/)
- [Material-UI](https://material-ui.com/)
- [Vite](https://vitejs.dev/)

## Installing

Install packages

```
npm install
```

Run local server (localhost:5173 will open up in your default browser)

```
npm run dev
```

## Known issues

### Moving Loader outside of build

I didn't manage to instruct Vite to skip some folders for production build, so the Loader is moved outside the `src` folder. You have to run this project locally and navigate to [/src-outside-build/data-loader.html](http://localhost:5173/src-outside-build/data-loader.html/) to use the Loader.

## Deprecated

Development of this project continues in [this repository](https://github.com/BobesCZ/mystica-brno-games-nextjs/).
