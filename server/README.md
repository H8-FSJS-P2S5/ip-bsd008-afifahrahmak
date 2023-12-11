# FSJS-Food

This is a full stack JavaScript project about food.

# Main Feature

This project has a main feature which calculates user's healthiness level based on their data (which are age, gender, height, and weight), and uses that healthiness level to find the best recipe for them. For example, a rather obese person would be recommended a recipe with less calories, whereas an underweight human being would see a recipe with a lot of calories, carbohydrates, and protein popping up rather menacingly on their dashboard.

I will go into the details of the algorithm below. Feel free to skip this section if you want to, as the algorithm used in this project is rather..._sophisticated_ (that might or might not be sarcastic).

## Algorithm

To find user's healthiness level, I'm using what's called the _Body Mass Index_ (also known as BMI). It is basically a measure that estimates how fat you are. Here's the [proof](https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc.htm), if you don't believe me.

The calculation of BMI based on user data is done with the help of a 3rd-party API (there is a section on that at the very bottom). After finding the BMI, I classified it into four categories:

```
Underweight < 18.5
Normal  18.5–24.9
Overweight  25.0–29.9
Obesity > 30.0
```

And based on those classifications, here is the algorithm to find the ideal recipe:

```
for each recipe serving, find one with (randomise if more than one meets the criteria):

Underweight -> more than 750 calories, or highest calories
Normal -> any food is fine :)
Overweight -> less than 500 calories, or lowest calories
Obese -> match with as many of these criterias as possible:
    1) less than 500 calories,
    2) less than 20g carbs,
    3) less than 10g fat,
    4) more than 20g protein,
    in the scenario where none of the recipes match, find one with the highest calories
```

Here's the good news and the bad news: the good news is, I came up with that myself. Yay.
The bad news is, I came up with that myself -- so there really is no scientific evidence about the effectiveness of that algorithm.

# Endpoints

The server side will have these following endpoints:

1. `POST "/login"`
2. `PUT "/complete-profile"` <= need authentication
3. `GET "/user-info"` <= need authentication
4. `GET "/recipes"` <= need authentication
5. `GET "/recipes/:id"` <= need authentication
6. `GET "/recipes/api-search"` <= need authentication
7. `GET "/recipes/recommend"` <= need authentication
8. `POST "/recipes"` <= need authentication
9. `DELETE "/recipes/:id"` <= need authentication and authorisation

## 1. `POST "/login"`

Login with Google.

**Request**

```json
// headers
{
	token: <credential-token>
}
```

**Response (200 - OK)**

```json
{
	accessToken: <access-token>
}
```

## 2. `PUT "/complete-profile"`

Insert data such as age, height, etc. into user profile.

**Request**

```json
{
    "name": "string",
    "gender": "string",
    "age": "integer",
    "height": "integer",
    "weight": "integer"
}
```

**Response (200 - OK)**

```json
{
    "id": 2,
    "name": "Andrew",
    "email": "andrewdh18@gmail.com",
    "age": 22,
    "gender": "Male",
    "height": 180,
    "weight": 75,
    "createdAt": "2023-11-14T14:59:01.893Z",
    "updatedAt": "2023-11-14T14:59:01.893Z"
}
```

**Response (400 - Bad Request)**

```json
{
    "message": "invalid data type or input"
}
```

## 3. `GET "/user-info"`

Returns the information of currently logged in user.

**Response (200 - OK}**

```json
{
    "id": 2,
    "name": "Andrew",
    "email": "andrewdh18@gmail.com",
    "age": 22,
    "gender": "Male",
    "height": 180,
    "weight": 75,
    "createdAt": "2023-11-14T14:59:01.893Z",
    "updatedAt": "2023-11-14T14:59:01.893Z"
}
```

## 4. `GET "/recipes"`

Get all recipes from the database.

**Response (200 - OK)**

```json
[
	{
		"id": 1,
		"name": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
	    "summary": "...",
	    "instructions": null,
	    "imageUrl": "https://spoonacular.com/recipeImages/716429-556x370.jpg",
	    "ingredients": "...",
		"userId": 1,
		"createdAt": "2023-11-14T10:11:56.753Z",
	    "updatedAt": "2023-11-14T10:11:56.753Z",
		"Nutrient": {
			"id": 1,
			"calories": 543.36,
			"carbs": 83.7,
			"protein": 16.84,
			"fat": 16.2,
			"sugar": 5.32,
			"fiber": 6.73,
			"sodium": 413.23,
			"cholesterol": 20.47,
			"recipeId": 1,
			"createdAt": "2023-11-14T10:11:56.767Z",
			"updatedAt": "2023-11-14T10:11:56.767Z"
		}
	},
  ...,
]
```

## 5. `GET "/recipes/:id"`

Get a recipe's detail from the database. Notice the response data structure is flattened -- a little different from `GET "/recipes"`.

**Request**

```json
// params
{
    "id": 1
}
```

**Response (200 - OK)**

```json
{
    "name": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    "summary": "You can never have too many main course recipes, so give Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs a try. One serving contains <b>543 calories</b>, <b>17g of protein</b>, and <b>16g of fat</b>. For <b>$1.57 per serving</b>, this recipe <b>covers 22%</b> of your daily requirements of vitamins and minerals. This recipe serves 2. A mixture of butter, white wine, pasta, and a handful of other ingredients are all it takes to make this recipe so yummy. 209 people have tried and liked this recipe. It is brought to you by fullbellysisters.blogspot.com. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 83%</b>, which is tremendous. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1230187\">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, <a href=\"https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229807\">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, and <a href=\"https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229669\">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>.",
    "instructions": null,
    "imageUrl": "https://spoonacular.com/recipeImages/716429-556x370.jpg",
    "ingredients": "Milk, Eggs, Other Dairy, Produce, Cheese, Oil, Vinegar, Salad Dressing, Pasta and Rice, Spices and Seasonings, Alcoholic Beverages",
    "calories": 543.36,
    "carbs": 83.7,
    "protein": 16.84,
    "fat": 16.2,
    "sugar": 5.32,
    "fiber": 6.73,
    "sodium": 413.23,
    "cholesterol": 20.47
}
```

**Response (404 - Not Found)**

```json
{
    "message": "data not found"
}
```

## 6. `GET "/user-info"`

Obtains currently logged-in user info. This does not include BMI.

**Response**

```json
{
    "id": 2,
    "name": "anonymous",
    "email": "anon6@mail.com",
    "age": 59,
    "gender": "Male",
    "height": 170,
    "weight": 73,
    "createdAt": "2023-11-15T16:56:27.511Z",
    "updatedAt": "2023-11-15T16:56:27.511Z"
}
```

## 7. `GET "/recipes/recommend"`

Returns the result of a rather sophisticated analysis of _user_ and _recipes_ to recommend the ideal recipe to that user. The algorithm used is explained above.

**Response**

```json
{
    "user": {
        "id": 101,
        "bmi": 31.56,
        "classification": "Obese"
    },
    "idealRecipe": {
        "id": 3,
        "calories": 190.68,
        "carbs": 16.89,
        "protein": 18.46,
        "fat": 5.25,
        "sugar": 3.01,
        "fiber": 5.85,
        "sodium": 477.75,
        "cholesterol": 31.18,
        "recipeId": 3,
        "createdAt": "2023-11-15T16:56:31.822Z",
        "updatedAt": "2023-11-15T16:56:31.822Z"
    }
}
```

## 8. `POST "/recipes"`

Adds a new recipe to the database.

**Response (201 - Created)**

```json
{
    "name": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    "summary": "You can never have too many main course recipes, so give Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs a try. One serving contains <b>543 calories</b>, <b>17g of protein</b>, and <b>16g of fat</b>. For <b>$1.57 per serving</b>, this recipe <b>covers 22%</b> of your daily requirements of vitamins and minerals. This recipe serves 2. A mixture of butter, white wine, pasta, and a handful of other ingredients are all it takes to make this recipe so yummy. 209 people have tried and liked this recipe. It is brought to you by fullbellysisters.blogspot.com. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 83%</b>, which is tremendous. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1230187\">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, <a href=\"https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229807\">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, and <a href=\"https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229669\">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>.",
    "instructions": null,
    "imageUrl": "https://spoonacular.com/recipeImages/716429-556x370.jpg",
    "ingredients": "Milk, Eggs, Other Dairy, Produce, Cheese, Oil, Vinegar, Salad Dressing, Pasta and Rice, Spices and Seasonings, Alcoholic Beverages",
    "calories": 543.36,
    "carbs": 83.7,
    "protein": 16.84,
    "fat": 16.2,
    "sugar": 5.32,
    "fiber": 6.73,
    "sodium": 413.23,
    "cholesterol": 20.47
}
```

## 9. `DELETE "/recipes/:id"`

Deletes a recipe from the database.

**Request**

```json
// params
{
    "id": 1
}
```

**Response (200 - OK)**

```json
{
    "id": 1,
    "name": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    "instructions": "If you have 10 minutes to spare, try...",
    "imageUrl": "https://spoonacular.com/recipeImages/716429-556x370.jpg",
    "ingredients": "Milk, Eggs, Other Dairy, ...",
    "userId": 1,
    "createdAt": "2023-11-14T10:11:56.753Z",
    "updatedAt": "2023-11-14T10:11:56.753Z",
    "Nutrient": {
        "id": 1,
        "calories": 543.36,
        "carbs": 83.7,
        "protein": 16.84,
        "fat": 16.2,
        "sugar": 5.32,
        "fiber": 6.73,
        "sodium": 413.23,
        "cholesterol": 20.47,
        "recipeId": 1,
        "createdAt": "2023-11-14T10:11:56.767Z",
        "updatedAt": "2023-11-14T10:11:56.767Z"
    }
}
```

**Response (404 - Not Found)**

```json
{
    "message": "data not found"
}
```

## Global Requests

All requests require authentication (except login).

```json
{
	headers: { Authentication: <your-bearer-token-here> }
}
```

## Global Errors

**Response (401 - Unauthorized)**

```json
{
    "message": "you must login first"
}
```

```json
{
    "message": "invalid token"
}
```

**Response (403 - Forbidden)**

```json
{
    "message": "you are not authorised"
}
```

**Response (500 - Internal Server Error)**

```json
{
    "message": "internal server error"
}
```

# 3rd Party API

This project uses two 3rd-party APIs. Note they each has a (rather minuscule) quota limit, hence _please_ do not abuse my website or those APIs will be angry.

-   #### [Recipes](https://spoonacular.com/food-api)
-   #### [BMI](https://rapidapi.com/malaaddincelik/api/fitness-calculator/)
