const numerator = 500.0;
let maleCoefficientArray = [-216.0475144, 16.2606339, -0.002388645, -0.00113732, 0.00000701836, -0.00000001291];
let femaleCoefficientArray = [594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 0.00004731582, -0.00000009054];
const kgsToPounds = 2.204623;

// Calculate the Wilks Score based on user input
function calculateWilks() {
    let bodyweight = document.wilksForm.bodyweight.value;
    let total = document.wilksForm.total.value;
    let wilksScore = "";

    if (!isNaN(bodyweight) && !(bodyweight === "") && !isNaN(total) && !(total === "")) {
        // Convert weights to kilograms if given in pounds so they will work with the formula
        if (document.wilksForm.units.value === "lbs") {
            let weights = [bodyweight, total];
            weights.forEach((kgWeight, index, arr) => {
                arr[index] = kgWeight / kgsToPounds;
            });

            bodyweight = weights[0];
            total = weights[1];
        }

        // Set the coefficient array based on whether the user selected male or female
        let coeffArray = document.wilksForm.gender.value === "male" ? maleCoefficientArray : femaleCoefficientArray;

        wilksScore = total * (numerator / (coeffArray[0] + (coeffArray[1] * bodyweight) + (coeffArray[2] * (bodyweight ** 2)) + (coeffArray[3] * (bodyweight ** 3)) + (coeffArray[4] * (bodyweight ** 4)) + (coeffArray[5] * (bodyweight ** 5)))).toFixed(2);
        wilksScore = +wilksScore.toFixed(2);
    }

    document.getElementById("wilksOutput").textContent = "Wilks Score: " + wilksScore;
}

// Callback for onchange event for the units selection to change labels between lbs and kgs
document.wilksForm.units.addEventListener("change", function() {
    let legend = document.getElementById("legend");
    let bodyweight = document.getElementById("bodyweight");
    let total = document.getElementById("total");

    if (document.wilksForm.units.value === "lbs") {
        legend.textContent = "Calculate Wilks Points in pounds (lbs)";
        bodyweight.childNodes[0].textContent = "Bodyweight (lbs): ";
        total.childNodes[0].textContent = "Lifted Weight (lbs): ";
    } else {
        legend.textContent = "Calculate Wilks Points in kilograms (kgs)";
        bodyweight.childNodes[0].textContent = "Bodyweight (kgs): ";
        total.childNodes[0].textContent = "Lifted Weight (kgs): ";
    }
});