const numerator = 500.0;
let maleCoefficientArray = [-216.0475144, 16.2606339, -0.002388645, -0.00113732, 0.00000701836, -0.00000001291];
let femaleCoefficientArray = [594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 0.00004731582, -0.00000009054];
const kgsToPounds = 2.204623;
const bwMin = 25;
const bwMax = 250;
const totalMin = 25;
const totalMax = 1500;
const wilksOutput = document.querySelector("#wilksOutput");

// Calculate the Wilks Score based on user input
function calculateWilks() {
    let bodyweight = document.wilksForm.bodyweight.value;
    let total = document.wilksForm.total.value;
    let wilksScore = "";
    let validFormat = true;

    if (!isNaN(bodyweight) && !(bodyweight === "") && !isNaN(total) && !(total === "")) {
        // Convert weights to kilograms if given in pounds so they will work with the formula
        if (document.wilksForm.units.value === "lbs") {
            let weights = [bodyweight, total];
            weights.forEach((kgWeight, index, arr) => {
                arr[index] = toPounds(kgWeight);
            });

            bodyweight = weights[0];
            total = weights[1];
        }

        validFormat = bodyweight >= bwMin && bodyweight <= bwMax && total >= totalMin && total <= totalMax;

        // Only calculate for values that make sense
        if (validFormat) {
            // Set the coefficient array based on whether the user selected male or female
            let coeffArray = document.wilksForm.gender.value === "male" ? maleCoefficientArray : femaleCoefficientArray;

            wilksScore = total * (numerator /
                (coeffArray[0] +
                    (coeffArray[1] * bodyweight) +
                    (coeffArray[2] * (bodyweight ** 2)) +
                    (coeffArray[3] * (bodyweight ** 3)) +
                    (coeffArray[4] * (bodyweight ** 4)) +
                    (coeffArray[5] * (bodyweight ** 5))));

            wilksScore = +wilksScore.toFixed(2);            
            wilksOutput.classList.remove("error-text");
        } else {
            wilksScore = "Not able to calculate!";
            wilksOutput.classList.add("error-text");
        }
    }

    wilksOutput.textContent = wilksScore;
}

function toPounds(kgWeight) {
    return kgWeight / kgsToPounds;
}

// Callback for onchange event for the units selection to change labels between lbs and kgs
document.wilksForm.units.addEventListener("change", function() {
    let unit = document.wilksForm.units.value === "lbs" ? "pounds" : "kilograms";
    document.getElementById("legend").textContent = "Calculate Wilks Points in " + unit + " (" + document.wilksForm.units.value + ")";
    document.getElementById("bodyweight").children[0].textContent = "Bodyweight (" + document.wilksForm.units.value + "): ";
    document.getElementById("total").children[0].textContent = "Lifted Weight (" + document.wilksForm.units.value + "): ";
});