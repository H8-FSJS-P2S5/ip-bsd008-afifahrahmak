if (process.env.NODE_ENV !== "production") require("dotenv").config();
const axios = require("axios");

// get BMI from users data, using the fitness-calculator API.
async function getBMI(user) {
    return await requestAPI(user);
}

async function requestAPI(user) {
    try {
        const options = {
            method: "GET",
            url: "https://fitness-calculator.p.rapidapi.com/bmi",
            params: {
                age: user.age,
                weight: user.weight,
                height: user.height,
            },
            headers: {
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
                "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
            },
        };
        const { data } = await axios.request(options);
        const classif = classifyBMI(data.data.bmi);
        return { id: user.id, bmi: data.data.bmi, classification: classif };
    } catch (error) {
        console.log(error);
    }
}

// classifications of BMI. We'll use this formula for this project:
/*
Underweight	< 18.5
Normal	18.5–24.9
Overweight	25.0–29.9
Obesity	> 30.0
*/
function classifyBMI(bmi) {
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 25) {
        return "Normal";
    } else if (bmi < 30) {
        return "Overweight";
    } else {
        return "Obese";
    }
}

// recommendations of recipes based on BMI. We'll use this formula for this project:
/*
for each recipe serving, find one with (randomise if more than one meets the criteria):
Underweight -> more than 750 calories, or highest calories
Normal -> any food is fine :)
Overweight -> less than 500 calories, or lowest calories
Obese -> match with as many of these criterias as possible: 
    1) less than 500 calories, 
    2) less than 20g carbs, 
    3) less than 10g fat, 
    4) more than 20g protein,
*/
function calcIdealRecipeFromBMI(userBMI, nutrients) {
    const BMI = classifyBMI(userBMI.bmi);
    let filtered, filtered2, filtered3, filtered4;

    if (BMI === "Normal") {
        return getRandom(nutrients);
        //
    } else if (BMI === "Underweight") {
        filtered = nutrients.filter((n) => n.calories > 750);
        if (filtered.length === 0) return getMax(nutrients);
        return getRandom(filtered);
        //
    } else if (BMI === "Overweight") {
        filtered = nutrients.filter((n) => n.calories < 500);
        if (filtered.length === 0) return getMin(nutrients);
        return getRandom(filtered);
        //
    } else {
        filtered = nutrients.filter((n) => n.calories < 500);
        if (filtered.length === 0) return getMin(nutrients);
        filtered2 = filtered.filter((n) => n.carbs < 20);
        if (filtered2.length === 0) return getRandom(filtered);
        filtered3 = filtered2.filter((n) => n.fat < 10);
        if (filtered3.length === 0) return getRandom(filtered2);
        filtered4 = filtered3.filter((n) => n.protein > 20);
        if (filtered4.length === 0) return getRandom(filtered3);
        return getRandom(filtered4);
    }
}

// you know what these helpers does
function getRandom(nutrients) {
    const i = Math.floor(Math.random() * (nutrients.length - 0) + 0); // The maximum is exclusive and the minimum is inclusive
    return nutrients[i];
}
function getMin(nutrients) {
    let min = nutrients[0].calories,
        minIdx = 0;
    for (let i = 1; i < nutrients.length; i++) {
        if (nutrients[i].calories < min) {
            min = nutrients[i].calories;
            minIdx = i;
        }
    }
    return nutrients[minIdx];
}
function getMax(nutrients) {
    let max = nutrients[0].calories,
        maxIdx = 0;
    for (let i = 1; i < nutrients.length; i++) {
        if (nutrients[i].calories > max) {
            max = nutrients[i].calories;
            maxIdx = i;
        }
    }
    return nutrients[maxIdx];
}

module.exports = { getBMI, calcIdealRecipeFromBMI };
