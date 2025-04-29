document.addEventListener("DOMContentLoaded", () => {
    new FormHandler("form", "booking_submit.php");
});

class FormHandler {
    constructor(formSelector, submitUrl) {
        this.form = document.querySelector(formSelector);
        this.submitUrl = submitUrl;
        this.init();
    }

    init() {
        this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);

        try {
            const response = await fetch(this.submitUrl, {
                method: "POST",
                body: formData
            });

            const result = await response.text();

            if (result.trim() === "success") {
                alert("Reservation submitted successfully!");
                this.form.reset();
            } else {
                alert(result);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
}
