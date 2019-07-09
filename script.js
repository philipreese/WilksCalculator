const numerator = 500.0;
const constant = -216.0475144;
const coeff1 = 16.2606339;
const coeff2 = -0.002388645;
const coeff3 = -0.00113732;
const coeff4 = 0.00000701836;
const coeff5 = -0.00000001291;
const kgsToPounds = 2.204623;

function calculateWilks() {
    let bodyweight = document.wilksForm.bodyweight.value;
    let total = document.wilksForm.total.value;

    if (document.wilksForm.units.value === "lbs") {
        let weights = [bodyweight, total];
        weights.forEach((kgWeight, index, arr) => {
            arr[index] = kgWeight / kgsToPounds;
        });

        bodyweight = weights[0];
        total = weights[1];
    }

    let wilksScore = total * (numerator / (constant + (coeff1 * bodyweight) + (coeff2 * (bodyweight**2)) + (coeff3 *(bodyweight**3)) + (coeff4 * (bodyweight**4)) + (coeff5 * (bodyweight**5)))).toFixed(2);
    wilksScore = +wilksScore.toFixed(2);

    document.getElementById("wilksOutput").textContent = "Wilks Score: " + wilksScore;
}

document.wilksForm.units.addEventListener("change", function() {
    let legend = document.getElementById("legend");
    let bodyweight = document.getElementById("bodyweight");
    let total = document.getElementById("total");

    if(document.wilksForm.units.value === "lbs") {
        legend.textContent = "Calculate Wilks Points in pounds (lbs)";
        bodyweight.childNodes[0].textContent = "Bodyweight (lbs): ";
        total.childNodes[0].textContent = "Lifted Weight (lbs): ";
    } else {
        legend.textContent = "Calculate Wilks Points in kilograms (kgs)";
        bodyweight.childNodes[0].textContent = "Bodyweight (kgs): ";
        total.childNodes[0].textContent = "Lifted Weight (kgs): ";
    }
});

