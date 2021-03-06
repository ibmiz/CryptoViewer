# cryptoviewer

### Description
The landing page will initially display the top 10 cryptocurrency coins sorted by their rank.
The current list can be changed to either the top 11-20, 21-30, 31-40, 41-50 coins on the market. They can be sorted by their rank or by name.
Each coin will have a details page which will lead to the details page with more information for the chosen coin.
The Details page will list the current price, its % change in the past hour and the total amount of coins available. Below that there will be the next 3 coins depending on the current coins rank.
The random page will just display a random coin everytime you press "Random"

### Prerequisites 

 - NodeJs
 #### Dependencies used
 
 - Axios
 - Sitemap nuxt module
 - Bootstrap
 - Nuxt TypeScript
 - Vue Router

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

The web application should be running on http://localhost:8081/ for dev build

## Explanation of functions

### `mounted()`
##### Description
mounted() will use axios to get to top 100 coins from coinmarketcap.com. It will put the response from the GET request into the array `currencies`.
If there is no response, it will log an error on the console.


### `toggleOrder(name)`
##### Description
This function changes how the list of 10 coins are sorted by changing the variable `currentOrder`.
##### Parameters
`name` is assigned to the variable `currentOrder` which will affect how the list is ordered
##### Return
Nothing is returned as it only affects the a variable

### `orderedItems(items)`
##### Description
This function sorts the list depending on the variable currentOrder
##### Parameters
`item` is the list of cryptocurrencies pulled from the API
##### Return
Returns a sorted list depending on the variable `currentOrder`


### `toggleRange(range)`
##### Description
This function will change the variable Range
##### Parameters
`range` is the current value category selected from the menu bar
##### Return
Returns nothing

### `returnRange(currencies)`
##### Description
Will select a certain range from the whole list of currencies
##### Parameters
`currencies` is the list of cryptocurrencies pulled from the API
##### Return
Returns a sliced range of cryptocurrencies depending on the value of `Range`

### `goTodetail(rank)`
##### Description
This will load the details page using Vue Router
##### Parameters

 - `rank` is the index in the list of currency array of the coin chosen

### `pickRandom()`
##### Description
This uses Math.random to pick a random number which will allow the code to present a random cryptocurrency. 
##### Parameters
No parameters

### `selected()`
##### Description
This will return the next chosen value for the next currency
#### Returns
Will either return the `randomId` value or 1 incase `randomId` is null


## License 
This project is licensed under the terms of the MIT license


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
