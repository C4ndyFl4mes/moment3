// Jag ville testa att göra en knapp med en cooldown. Denna fil är enbart knappens animation.
const powerfulBTN = document.getElementById("powerful-btn");
const cooldownDIV = document.getElementById("cooldown-div");
const messageSPAN = document.getElementById("message");
const cooldownTime = 2000; // Cooldown tid i ms.
let progress = 0; // Nuvarande progression för knappen, mellan 0% och 100%.
let activeCooldown = false; // Är knappen nedtryckt.
let initiationTime = 0; // Tiden då knappen började tryckas ned.
let heldTime = 0; // Den tid knappen är nedtryckt.
let animationFrameID = null; // Cooldown animationens id.

powerfulBTN.addEventListener("mousedown", toggleCooldown);

powerfulBTN.addEventListener("mouseup", toggleCooldown);
powerfulBTN.addEventListener("mouseleave", () => {
    if (activeCooldown) {
        toggleCooldown();
    }
});

function toggleCooldown() {
    activeCooldown = !activeCooldown;

    // Stoppar nuvarande knappens animation för att sedan starta en ny.
    if (animationFrameID) {
        cancelAnimationFrame(animationFrameID);
    }

    if (activeCooldown) {
        // Påbörja ellet fortsätta framåt animering för cooldown baren.
        initiationTime = Date.now() - (cooldownTime * (progress / 100)); // Börja från senaste progressionen.

        function updateCooldownForward() {
            let elapsed = Date.now() - initiationTime; // Beräknar tiden som gått sedan knappen började tryckas ned.
            progress = Math.min((elapsed / cooldownTime) * 100, 100); // Beräknar progressionen från 0% till 100%.
            if (elapsed > cooldownTime) {
                powerfulBTN.textContent = "Släpp";
            }
            // Uppdaterar själva cooldown baren. Tyvärr behövdes vanliga CSS variabel användas för att kunna applicera blur effekt utan att blura knappen.
            cooldownDIV.style.setProperty("--gradient", `conic-gradient(#0000FF ${progress}%, transparent ${progress}%)`);
            // Fortsätter framåt animationen sålänge progress är under 100.
            if (progress < 100) {
                animationFrameID = requestAnimationFrame(updateCooldownForward);
            }
        }

        // Påbörjar framåtanimation.
        animationFrameID = requestAnimationFrame(updateCooldownForward);

    } else {
        // När musknapen har släppts, beräknas tiden som knappen var nedtryckt.
        heldTime = (Date.now() - initiationTime);
        if (heldTime > cooldownTime) {
            heldTime = 0;
            alert("Knappen har aktiverats!");
            powerfulBTN.textContent = "Tryck ner";
        }
        // Tidpunkten då musknappen släpptes.
        let reverseStartTime = Date.now();

        function updateCooldownBackward() {
            let reverseElapsed = Date.now() - reverseStartTime; // Tiden sedan musknappen släpptes.
            let remaining = heldTime - reverseElapsed; // Beräkna neråt från tiden som knappen var nedtryckt.
            progress = Math.max((remaining / cooldownTime) * 100, 0); // Går bakåt.
            
            // Uppdaterar själva cooldown baren. Tyvärr behövdes vanliga CSS variabel användas för att kunna applicera blur effekt utan att blura knappen.
            cooldownDIV.style.setProperty("--gradient", `conic-gradient(#FF0000 ${progress}%, transparent ${progress}%)`);
            // Fortsätter bakåt animationen sålänge progress är över 0.
            if (progress > 0) {
                animationFrameID = requestAnimationFrame(updateCooldownBackward);
            }
        }

        // Påbörja bakåtanimation.
        animationFrameID = requestAnimationFrame(updateCooldownBackward);
    }
}